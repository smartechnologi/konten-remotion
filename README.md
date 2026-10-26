# konten-remotion

Pipeline konten: link TikTok/IG/YT di WhatsApp → script → voice note → video Remotion.
n8n (WAHA) mengatur alurnya; repo ini menjalankan pekerjaan berat di GitHub Actions.

## Workflows

| Workflow | Dipicu oleh | Fungsi |
| --- | --- | --- |
| `render.yml` | n8n setelah voice note masuk | Download VN dari WAHA, ambil timestamp per kata (faster-whisper), susun props, render Remotion 1080x1920, upload `video.mp4` ke Release `job-<id>`, lalu panggil webhook n8n `konten-video` |
| `fetch-source.yml` | cadangan (tidak dipakai) | Download + transkrip pakai yt-dlp. YouTube memblokir IP GitHub, jadi transkrip sekarang lewat Supadata di n8n |

## Template video (`src/`)

Satu komposisi `Konten` dengan jenis scene: `hook`, `point`, `workflow` (node n8n menyala berurutan), `stat` (angka count-up), `cta`.
Subtitle karaoke diambil dari timestamp suara asli. Preview: `npm run studio`.

## Setting (opsional)

- `Settings → Secrets → Actions → CALLBACK_SECRET`: kalau diisi, dikirim sebagai header `X-Callback-Secret` ke n8n.
- `Settings → Secrets → Actions → WAHA_API_KEY`: API key WAHA, supaya render bisa download voice note.
- `Settings → Variables → Actions → HANDLE`: username yang muncul di scene CTA, misal `@irfanno`.
- `Settings → Variables → Actions → WHISPER_MODEL`: default `small`. Pakai `medium` kalau transkrip bahasa Indonesia kurang akurat (lebih lambat).
