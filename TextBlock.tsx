import type { CSSProperties } from 'react';
import type { TextItem } from '../types';
import { plain } from '../lib/flow';
export const Runs = ({ t }: { t: TextItem }) => t.runs.map((r, i) => (r[1] ? <strong key={i}>{r[0]}</strong> : <span key={i}>{r[0]}</span>));
// Blocco di testo posizionato come nel PDF (desktop) — la dimensione scala con la pagina (cqw).
export default function TextBlock({ t }: { t: TextItem }) {
  const heading = t.size >= 0.03;
  const style = { left: `${t.x * 100}%`, top: `${t.y * 100}%`, width: `${Math.min(1 - t.x, t.w * (heading ? 1.15 : 1.05)) * 100}%`,
    color: t.color, '--fs': t.size } as CSSProperties;
  return <p className={`tb${heading ? ' tb--h' : ''}${t.fx === 'shadow' ? ' tb--shadow' : ''}`} style={style}><Runs t={t} /></p>;
}
export { plain };
