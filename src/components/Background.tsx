import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { theme } from '../theme';

const Blob: React.FC<{ color: string; x: number; y: number; size: number; speed: number }> = ({ color, x, y, size, speed }) => {
  const frame = useCurrentFrame();
  const dx = Math.sin(frame * speed) * 80;
  const dy = Math.cos(frame * speed * 0.8) * 60;
  return (
    <div
      style={{
        position: 'absolute',
        left: x + dx,
        top: y + dy,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        filter: 'blur(140px)',
        opacity: 0.35,
      }}
    />
  );
};

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const gridShift = (frame * 0.6) % 80;
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <Blob color={theme.accent} x={-200} y={200} size={700} speed={0.02} />
      <Blob color={theme.accent2} x={600} y={1100} size={650} speed={0.017} />
      <Blob color={theme.accent3} x={300} y={-200} size={500} speed={0.023} />
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          backgroundPosition: `0 ${gridShift}px`,
        }}
      />
    </AbsoluteFill>
  );
};
