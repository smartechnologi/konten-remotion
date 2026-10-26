import { useCurrentFrame } from 'remotion';
import { pop, fadeUp } from '../anim';
import { Scene } from '../types';
import { theme } from '../theme';
import { SceneFrame } from './SceneFrame';

export const HookScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const words = scene.headline.split(/\s+/);
  return (
    <SceneFrame>
      {scene.emoji ? (
        <div style={{ fontSize: 200, textAlign: 'center', transform: `scale(${pop(frame)})`, marginBottom: 40 }}>
          {scene.emoji}
        </div>
      ) : null}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 26px' }}>
        {words.map((w, i) => (
          <span
            key={i}
            style={{
              fontSize: 112,
              fontWeight: 900,
              lineHeight: 1.1,
              textAlign: 'center',
              color: i % 3 === 1 ? theme.accent : theme.text,
              display: 'inline-block',
              transform: `scale(${pop(frame, 4 + i * 3)})`,
            }}
          >
            {w}
          </span>
        ))}
      </div>
      {scene.sub ? (
        <div style={{ ...fadeUp(frame, 12 + words.length * 3), fontSize: 48, color: theme.muted, textAlign: 'center', marginTop: 40 }}>
          {scene.sub}
        </div>
      ) : null}
    </SceneFrame>
  );
};
