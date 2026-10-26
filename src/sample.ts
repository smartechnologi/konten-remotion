import { KontenProps } from './types';

// Used by `npm run studio` when no props are passed, so templates can be previewed without a voice note.
export const sampleProps: KontenProps = {
  judul: 'Contoh',
  jenis: 'listicle',
  handle: '@irfanno',
  audioSrc: '',
  durationInFrames: 450,
  scenes: [
    { type: 'hook', narasi: '', headline: 'Stop kerja manual!', sub: '3 automasi n8n paling hemat waktu', emoji: '⚡', startFrame: 0, durationInFrames: 75 },
    { type: 'point', narasi: '', headline: 'Auto balas WhatsApp', sub: 'Pakai AI Agent + WAHA', emoji: '💬', items: ['Jawab 24 jam', 'Bisa baca katalog'], startFrame: 75, durationInFrames: 90 },
    { type: 'workflow', narasi: '', headline: 'Alurnya simpel', nodes: ['WhatsApp Trigger', 'AI Agent', 'Google Sheets', 'Balas WA'], startFrame: 165, durationInFrames: 105 },
    { type: 'stat', narasi: '', headline: 'waktu admin terpangkas', value: '70%', startFrame: 270, durationInFrames: 90 },
    { type: 'cta', narasi: '', headline: 'Mau template-nya?', sub: 'Komen "N8N"', emoji: '🎁', startFrame: 360, durationInFrames: 90 },
  ],
  words: [],
};
