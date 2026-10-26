import { Composition } from 'remotion';
import { Konten } from './Konten';
import { FPS, KontenProps } from './types';
import { sampleProps } from './sample';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Konten"
    component={Konten}
    width={1080}
    height={1920}
    fps={FPS}
    durationInFrames={sampleProps.durationInFrames}
    defaultProps={sampleProps as KontenProps}
    calculateMetadata={({ props }) => ({ durationInFrames: props.durationInFrames })}
  />
);
