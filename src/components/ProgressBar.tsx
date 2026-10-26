import { useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: 'rgba(255,255,255,0.08)' }}>
      <div
        style={{
          width: `${(frame / durationInFrames) * 100}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})`,
        }}
      />
    </div>
  );
};
