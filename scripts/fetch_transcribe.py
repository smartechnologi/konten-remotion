"""Download the audio of a TikTok/IG/YT link, transcribe it, and POST the result to n8n.

Always calls back, including on failure, so the WhatsApp side can tell the user what happened.
"""
import json
import os
import sys
import tempfile
from pathlib import Path

import requests
import yt_dlp
from faster_whisper import WhisperModel

JOB_ID = os.environ["JOB_ID"]
SOURCE_URL = os.environ["SOURCE_URL"]
CALLBACK_URL = os.environ["CALLBACK_URL"]
WHISPER_MODEL = os.environ.get("WHISPER_MODEL", "small")
CALLBACK_SECRET = os.environ.get("CALLBACK_SECRET", "")


def annotate(level: str, message: str) -> None:
    # Shows up as an annotation on the run, so failures are visible without opening the raw log.
    print(f"::{level}::{message}".replace("\n", " "))


def callback(payload: dict) -> None:
    headers = {"X-Callback-Secret": CALLBACK_SECRET} if CALLBACK_SECRET else {}
    try:
        resp = requests.post(CALLBACK_URL, json={"job_id": JOB_ID, **payload}, headers=headers, timeout=30)
    except requests.RequestException as exc:
        annotate("warning", f"callback failed: {exc}")
        return
    level = "notice" if resp.ok else "warning"
    annotate(level, f"callback -> HTTP {resp.status_code}")


def download_audio(workdir: Path) -> dict:
    opts = {
        "format": "bestaudio/best",
        "outtmpl": str(workdir / "source.%(ext)s"),
        "noplaylist": True,
        "quiet": True,
        "postprocessors": [{"key": "FFmpegExtractAudio", "preferredcodec": "mp3"}],
    }
    with yt_dlp.YoutubeDL(opts) as ydl:
        info = ydl.extract_info(SOURCE_URL, download=True)
    return {
        "title": info.get("title") or "",
        "description": (info.get("description") or "")[:2000],
        "uploader": info.get("uploader") or "",
        "duration": info.get("duration") or 0,
        "audio_path": str(workdir / "source.mp3"),
    }


def transcribe(audio_path: str) -> dict:
    model = WhisperModel(WHISPER_MODEL, device="cpu", compute_type="int8")
    segments, info = model.transcribe(audio_path, vad_filter=True)
    text = " ".join(seg.text.strip() for seg in segments).strip()
    return {"transcript": text, "language": info.language}


def main() -> int:
    with tempfile.TemporaryDirectory() as tmp:
        try:
            meta = download_audio(Path(tmp))
        except Exception as exc:  # yt-dlp raises many different error types
            annotate("error", f"download failed: {exc}")
            callback({"ok": False, "error": f"Gagal download video: {exc}"})
            return 1
        try:
            result = transcribe(meta.pop("audio_path"))
        except Exception as exc:
            annotate("error", f"transcribe failed: {exc}")
            callback({"ok": False, "error": f"Gagal transkrip: {exc}", **meta})
            return 1

    # A video with only music has no speech; fall back to its caption so the script writer still has context.
    if not result["transcript"]:
        result["transcript"] = f"(Video tanpa narasi) Caption: {meta['description']}"

    callback({"ok": True, **meta, **result})
    annotate("notice", json.dumps({**meta, **result}, ensure_ascii=False)[:500])
    return 0


if __name__ == "__main__":
    sys.exit(main())
