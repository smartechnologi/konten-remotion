import { useCurrentFrame } from 'remotion';
import { fadeUp, pop } from '../anim';
import { Scene } from '../types';
import { theme } from '../theme';
import { SceneFrame } from './SceneFrame';

export const CtaScene: React.FC<{ scene: Scene; handle: string }> = ({ scene, handle }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame / 5) * 0.04;
  return (
    <SceneFrame>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 160, transform: `scale(${pop(frame)})` }}>{scene.emoji ?? '🚀'}</div>
        <div style={{ ...fadeUp(frame, 4), fontSize: 84, fontWeight: 900, lineHeight: 1.1, marginTop: 30 }}>{scene.headline}</div>
        <div
          style={{
            display: 'inline-block',
            marginTop: 60,
            padding: '30px 70px',
            borderRadius: 999,
            fontSize: 56,
            fontWeight: 900,
            background: theme.accent,
            transform: `scale(${pop(frame, 10) * pulse})`,
            boxShadow: `0 0 60px ${theme.accent}88`,
          }}
        >
          {scene.sub || 'Follow untuk tips n8n & AI'}
        </div>
        {handle ? <div style={{ ...fadeUp(frame, 16), fontSize: 48, color: theme.muted, marginTop: 30 }}>{handle}</div> : null}
      </div>
    </SceneFrame>
  );
};
