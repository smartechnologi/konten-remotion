# konten-remotion

Pipeline konten: link TikTok/IG/YT di WhatsApp → script → voice note → video Remotion.
n8n (WAHA) mengatur alurnya; repo ini menjalankan pekerjaan berat di GitHub Actions.

## Workflows

| Workflow | Dipicu oleh | Fungsi |
| --- | --- | --- |
| `fetch-source.yml` | n8n "Konten Factory 1" | Download audio pakai yt-dlp, transkrip pakai faster-whisper (gratis, di CPU), kirim hasilnya ke webhook n8n `konten-transkrip` |

## Setting (opsional)

- `Settings → Secrets → Actions → CALLBACK_SECRET`: kalau diisi, dikirim sebagai header `X-Callback-Secret` ke n8n.
- `Settings → Variables → Actions → WHISPER_MODEL`: default `small`. Pakai `medium` kalau transkrip bahasa Indonesia kurang akurat (lebih lambat).
