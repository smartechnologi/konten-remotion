import { interpolate, useCurrentFrame } from 'remotion';
import { fadeUp, pop } from '../anim';
import { Scene } from '../types';
import { theme } from '../theme';
import { SceneFrame } from './SceneFrame';

// Counts the number up when value looks like "70%" or "1.2 juta"; otherwise just pops the text.
const CountUp: React.FC<{ value: string; frame: number }> = ({ value, frame }) => {
  const match = value.match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return <>{value}</>;
  const [, prefix, num, suffix] = match;
  const target = parseFloat(num.replace(',', '.'));
  const decimals = num.includes('.') || num.includes(',') ? 1 : 0;
  const current = interpolate(frame, [0, 25], [0, target], { extrapolateRight: 'clamp' });
  return (
    <>
      {prefix}
      {current.toFixed(decimals)}
      {suffix}
    </>
  );
};

export const StatScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  return (
    <SceneFrame>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: 260,
            fontWeight: 900,
            lineHeight: 1,
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            transform: `scale(${pop(frame)})`,
          }}
        >
          <CountUp value={scene.value ?? scene.headline} frame={frame} />
        </div>
        <div style={{ ...fadeUp(frame, 10), fontSize: 72, fontWeight: 800, marginTop: 40 }}>{scene.headline}</div>
        {scene.sub ? <div style={{ ...fadeUp(frame, 16), fontSize: 46, color: theme.muted, marginTop: 20 }}>{scene.sub}</div> : null}
      </div>
    </SceneFrame>
  );
};
