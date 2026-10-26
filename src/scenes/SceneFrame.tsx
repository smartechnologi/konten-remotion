import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

// Shared wrapper: keeps scene content above the caption area and fades it out at the end.
export const SceneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const out = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{ padding: '180px 80px 520px', justifyContent: 'center', opacity: out }}>
      {children}
    </AbsoluteFill>
  );
};
