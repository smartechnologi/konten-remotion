import { useCurrentFrame } from 'remotion';
import { Word } from '../types';
import { theme } from '../theme';

const WORDS_PER_PAGE = 4;

// Groups words into short pages so only a few words are on screen, TikTok style.
const paginate = (words: Word[]) => {
  const pages: Word[][] = [];
  for (let i = 0; i < words.length; i += WORDS_PER_PAGE) pages.push(words.slice(i, i + WORDS_PER_PAGE));
  return pages;
};

export const Captions: React.FC<{ words: Word[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const pages = paginate(words);
  const page = pages.find((p, i) => {
    const end = pages[i + 1]?.[0].startFrame ?? p[p.length - 1].endFrame + 10;
    return frame >= p[0].startFrame && frame < end;
  });
  if (!page) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 60,
        right: 60,
        bottom: 260,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '6px 18px',
      }}
    >
      {page.map((w, i) => {
        const active = frame >= w.startFrame && frame < w.endFrame;
        const spoken = frame >= w.startFrame;
        return (
          <span
            key={i}
            style={{
              fontSize: 76,
              fontWeight: 900,
              textTransform: 'uppercase',
              color: active ? theme.bg : spoken ? theme.text : 'rgba(245,247,255,0.55)',
              background: active ? theme.accent2 : 'transparent',
              padding: '2px 14px',
              borderRadius: 14,
              WebkitTextStroke: active ? undefined : '3px rgba(0,0,0,0.6)',
              paintOrder: 'stroke fill',
              transform: active ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};
