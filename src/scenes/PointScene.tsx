import { useCurrentFrame } from 'remotion';
import { pop, fadeUp } from '../anim';
import { Scene } from '../types';
import { theme } from '../theme';
import { SceneFrame } from './SceneFrame';

export const PointScene: React.FC<{ scene: Scene; index: number }> = ({ scene, index }) => {
  const frame = useCurrentFrame();
  return (
    <SceneFrame>
      <div style={{ display: 'flex', alignItems: 'center', gap: 30, marginBottom: 40 }}>
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: 40,
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent3})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 90,
            fontWeight: 900,
            transform: `scale(${pop(frame)}) rotate(${(1 - pop(frame)) * -20}deg)`,
          }}
        >
          {index}
        </div>
        {scene.emoji ? <div style={{ fontSize: 120, transform: `scale(${pop(frame, 6)})` }}>{scene.emoji}</div> : null}
      </div>
      <div style={{ ...fadeUp(frame, 4), fontSize: 88, fontWeight: 900, lineHeight: 1.1 }}>{scene.headline}</div>
      {scene.sub ? (
        <div style={{ ...fadeUp(frame, 10), fontSize: 46, color: theme.muted, marginTop: 24 }}>{scene.sub}</div>
      ) : null}
      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 22 }}>
        {(scene.items ?? []).slice(0, 4).map((item, i) => (
          <div
            key={i}
            style={{
              ...fadeUp(frame, 16 + i * 8, 40),
              fontSize: 48,
              padding: '22px 30px',
              borderRadius: 24,
              background: 'rgba(255,255,255,0.07)',
              borderLeft: `10px solid ${theme.accent2}`,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </SceneFrame>
  );
};
