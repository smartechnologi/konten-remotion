// Builds out/props.json for Remotion from the n8n scene plan and the voice-note word timestamps.
//
// Inputs:  out/scenes.json  { judul, jenis, scenes: [{ type, narasi, headline, ... }] }
//          out/words.json   { duration, words: [{ word, start, end }] }   (from transcribe_words.py)
// Scenes are aligned to the voice by word count: each scene gets the share of spoken words
// proportional to the length of its narration, so no exact text match is needed.
import fs from 'node:fs';

const FPS = 30;
const TAIL_SECONDS = 0.8;
const VALID_TYPES = new Set(['hook', 'point', 'workflow', 'stat', 'cta']);

const plan = JSON.parse(fs.readFileSync('out/scenes.json', 'utf8'));
const { duration, words: rawWords } = JSON.parse(fs.readFileSync('out/words.json', 'utf8'));

const toFrame = (s) => Math.round(s * FPS);
const words = rawWords
  .map((w) => ({ text: w.word.trim(), startFrame: toFrame(w.start), endFrame: Math.max(toFrame(w.end), toFrame(w.start) + 2) }))
  .filter((w) => w.text);

const durationInFrames = toFrame(duration + TAIL_SECONDS);
const scenes = (plan.scenes ?? []).filter((s) => s && s.headline);
const counts = scenes.map((s) => Math.max(1, (s.narasi ?? s.headline).split(/\s+/).filter(Boolean).length));
const totalCount = counts.reduce((a, b) => a + b, 0);

let cumulative = 0;
const starts = scenes.map((_, i) => {
  if (i === 0) return 0;
  cumulative += counts[i - 1];
  const wordIndex = Math.min(words.length - 1, Math.round((cumulative / totalCount) * words.length));
  return words.length ? words[wordIndex].startFrame : Math.round((cumulative / totalCount) * durationInFrames);
});

const props = {
  judul: plan.judul ?? '',
  jenis: plan.jenis ?? '',
  handle: plan.handle ?? process.env.HANDLE ?? '',
  audioSrc: 'voice.mp3',
  durationInFrames,
  words,
  scenes: scenes.map((s, i) => {
    const startFrame = starts[i];
    const end = i + 1 < scenes.length ? starts[i + 1] : durationInFrames;
    return {
      ...s,
      type: VALID_TYPES.has(s.type) ? s.type : 'point',
      startFrame,
      durationInFrames: Math.max(15, end - startFrame),
    };
  }),
};

fs.writeFileSync('out/props.json', JSON.stringify(props, null, 2));
console.log(`props: ${props.scenes.length} scenes, ${words.length} words, ${durationInFrames} frames`);
