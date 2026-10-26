export type SceneType = 'hook' | 'point' | 'workflow' | 'stat' | 'cta';

export type Scene = {
  type: SceneType;
  narasi: string;
  headline: string;
  sub?: string;
  emoji?: string;
  items?: string[];
  nodes?: string[];
  value?: string;
  // Filled in by scripts/prepare-props.mjs from the voice-note timestamps.
  startFrame: number;
  durationInFrames: number;
};

export type Word = { text: string; startFrame: number; endFrame: number };

export type KontenProps = {
  judul: string;
  jenis: string;
  handle: string;
  audioSrc: string;
  durationInFrames: number;
  scenes: Scene[];
  words: Word[];
};

export const FPS = 30;
