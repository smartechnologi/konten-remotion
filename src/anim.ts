import { interpolate, spring } from 'remotion';
import { FPS } from './types';

export const pop = (frame: number, delay = 0) =>
  spring({ frame: frame - delay, fps: FPS, config: { damping: 12, stiffness: 140, mass: 0.6 } });

export const fadeUp = (frame: number, delay = 0, distance = 60) => {
  const p = spring({ frame: frame - delay, fps: FPS, config: { damping: 18, stiffness: 120 } });
  return { opacity: p, transform: `translateY(${interpolate(p, [0, 1], [distance, 0])}px)` };
};
