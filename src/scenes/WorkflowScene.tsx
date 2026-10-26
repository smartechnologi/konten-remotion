import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { fadeUp, pop } from '../anim';
import { Scene } from '../types';
import { theme } from '../theme';
import { SceneFrame } from './SceneFrame';

// n8n-style chain: nodes appear one by one and the connector "lights up" as data flows through.
export const WorkflowScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const nodes = (scene.nodes?.length ? scene.nodes : scene.items ?? []).slice(0, 5);
  const step = Math.max(8, Math.floor((durationInFrames * 0.7) / Math.max(nodes.length, 1)));
  return (
    <SceneFrame>
      <div style={{ ...fadeUp(frame), fontSize: 80, fontWeight: 900, lineHeight: 1.1, marginBottom: 60 }}>{scene.headline}</div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {nodes.map((label, i) => {
          const appear = pop(frame, i * step);
          const lit = frame >= i * step + 6;
          const flow = interpolate(frame, [i * step + 6, (i + 1) * step], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  transform: `scale(${appear})`,
                  minWidth: 560,
                  padding: '30px 40px',
                  borderRadius: 28,
                  fontSize: 50,
                  fontWeight: 800,
                  textAlign: 'center',
                  background: lit ? theme.bgSoft : 'rgba(255,255,255,0.04)',
                  border: `4px solid ${lit ? theme.accent : 'rgba(255,255,255,0.15)'}`,
                  boxShadow: lit ? `0 0 50px ${theme.accent}66` : 'none',
                }}
              >
                {label}
              </div>
              {i < nodes.length - 1 ? (
                <div style={{ width: 8, height: 70, background: 'rgba(255,255,255,0.12)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: `${flow * 100}%`, background: theme.accent2 }} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </SceneFrame>
  );
};
