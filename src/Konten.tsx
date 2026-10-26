import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Background } from './components/Background';
import { Captions } from './components/Captions';
import { ProgressBar } from './components/ProgressBar';
import { HookScene } from './scenes/HookScene';
import { PointScene } from './scenes/PointScene';
import { WorkflowScene } from './scenes/WorkflowScene';
import { StatScene } from './scenes/StatScene';
import { CtaScene } from './scenes/CtaScene';
import { KontenProps, Scene } from './types';
import { theme } from './theme';

const SceneView: React.FC<{ scene: Scene; index: number; handle: string }> = ({ scene, index, handle }) => {
  switch (scene.type) {
    case 'hook':
      return <HookScene scene={scene} />;
    case 'workflow':
      return <WorkflowScene scene={scene} />;
    case 'stat':
      return <StatScene scene={scene} />;
    case 'cta':
      return <CtaScene scene={scene} handle={handle} />;
    default:
      return <PointScene scene={scene} index={index} />;
  }
};

export const Konten: React.FC<KontenProps> = ({ scenes, words, audioSrc, handle }) => {
  // Numbering only counts the "point" scenes, so the list reads 1, 2, 3 even with a hook in front.
  let pointNo = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg, fontFamily: theme.font, color: theme.text }}>
      <Background />
      {scenes.map((scene, i) => {
        if (scene.type === 'point') pointNo += 1;
        return (
          <Sequence key={i} from={scene.startFrame} durationInFrames={scene.durationInFrames} premountFor={15}>
            <SceneView scene={scene} index={pointNo} handle={handle} />
          </Sequence>
        );
      })}
      <Captions words={words} />
      <ProgressBar />
      {audioSrc ? <Audio src={audioSrc.startsWith('http') ? audioSrc : staticFile(audioSrc)} /> : null}
    </AbsoluteFill>
  );
};
