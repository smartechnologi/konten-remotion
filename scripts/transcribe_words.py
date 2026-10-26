"""Word-level timestamps for the voice note, used for karaoke captions and scene timing."""
import json
import os
import sys

from faster_whisper import WhisperModel

audio_path, out_path = sys.argv[1], sys.argv[2]
model = WhisperModel(os.environ.get("WHISPER_MODEL", "small"), device="cpu", compute_type="int8")
segments, info = model.transcribe(audio_path, language="id", word_timestamps=True, vad_filter=True)

words = [{"word": w.word, "start": w.start, "end": w.end} for seg in segments for w in (seg.words or [])]
with open(out_path, "w", encoding="utf-8") as f:
    json.dump({"duration": info.duration, "words": words}, f, ensure_ascii=False)
print(f"{len(words)} words, {info.duration:.1f}s")
