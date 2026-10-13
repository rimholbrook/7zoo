import { useEffect, useState } from 'react';
import pagesJson from '../data/pages.json';
import type { PageData } from '../types';
import { LINKS, DECOR, KEEP_CANVAS_ON_MOBILE, PAGE_W, PAGE_H } from '../data/site';
import { buildFlow, plain, isDonation } from '../lib/flow';
import Photo from './Photo';
import TextBlock, { Runs } from './TextBlock';
import Decor from './Decor';
import Donations from './Donations';

const pages = pagesJson as unknown as PageData[];

const useMobile = () => {
  const q = '(max-width: 760px)';
  const [m, setM] = useState(() => window.matchMedia(q).matches);
  useEffect(() => { const mq = window.matchMedia(q); const f = () => setM(mq.matches); mq.addEventListener('change', f); return () => mq.removeEventListener('change', f); }, []);
  return m;
};

function Canvas({ page, n }: { page: PageData; n: number }) {
  const donation = page.texts.filter(isDonation);
  const links = (LINKS[n] || []).map((l) => {
    const t = page.texts.find((t) => (l.title ? plain(t).includes(l.match) : t.size < 0.04 && t.y > 0.2 && plain(t).includes(l.match) && plain(t).length < 40));
    return t && { ...l, t };
  }).filter((l): l is NonNullable<typeof l> => Boolean(l));
  return (
    <div className="canvas" style={{ aspectRatio: `${PAGE_W} / ${PAGE_H}` }}>
      {page.rules.map((r, i) => (
        <i key={i} className="rule" style={{ left: `${r.x * 100}%`, top: `${r.y * 100}%`, background: r.color,
          ...(r.w ? { width: `${r.w * 100}%`, height: '1px' } : { height: `${(r.h ?? 0) * 100}%`, width: '1px' }) }} />
      ))}
      {page.photos.map((p, i) => <Photo key={i} photo={p} abs />)}
      {(DECOR[n] || []).map((d, i) => <Decor key={i} d={d} />)}
      {page.texts.filter((t) => !isDonation(t)).map((t, i) => <TextBlock key={i} t={t} />)}
      {donation.length > 0 && <Donations blocks={donation} abs />}
      {links.map(({ t, to, title }) => title ? (
        <a key={to} className="titlelink" href={`#${to}`} aria-label={`Vai a: ${plain(t)}`}
          style={{ left: `${(t.x - 0.012) * 100}%`, top: `${(t.y - 0.006) * 100}%`, width: `${(t.w + 0.07) * 100}%`, height: `${(t.h + 0.012) * 100}%` }}>
          <span className="titlelink__arrow" aria-hidden="true">→</span>
        </a>
      ) : (
        <a key={to} className="rowlink" href={`#${to}`} aria-label={`Vai a: ${plain(t)}`}
          style={{ top: `${(t.y - 0.016) * 100}%`, height: `${(t.h + 0.034) * 100}%` }}>
          <span className="rowlink__arrow" aria-hidden="true">→</span>
        </a>
      ))}
    </div>
  );
}

function Flow({ page }: { page: PageData }) {
  const items = buildFlow(page);
  return (
    <div className={`flow${page.texts.length === 0 ? ' flow--collage' : ''}`}>
      {items.map((e, i) => {
        if (e.kind === 'photo') return <Photo key={i} photo={e.photo} />;
        if (e.kind === 'people') return (
          <ul key={i} className="people">
            {e.list.map((p, j) => (
              <li key={j}><Photo photo={p.photo} alt={p.caps[0] ? plain(p.caps[0]).split('\n')[0] : undefined} />
                {p.caps.map((c, k) => <p key={k} className="people__cap" style={{ color: c.color }}><Runs t={c} /></p>)}</li>
            ))}
          </ul>
        );
        if (e.kind === 'donation') return <Donations key={i} blocks={e.blocks} />;
        const t = e.text; const txt = plain(t);
        const cls = /^\d{2}$/.test(txt) ? 'flow__num' : t.size >= 0.03 ? 'flow__h' : t.size < 0.016 ? 'flow__cap' : 'flow__p';
        return <p key={i} className={cls} style={{ color: t.color }}><Runs t={t} /></p>;
      })}
    </div>
  );
}

export default function Spread({ n }: { n: number }) {
  const page = pages[n - 1]; const mobile = useMobile();
  const canvas = !mobile || KEEP_CANVAS_ON_MOBILE.includes(n);
  return (
    <section className="spread" data-pdf-page={n} style={{ background: page.bg, ['--bg' as string]: page.bg }}>
      {canvas ? <Canvas page={page} n={n} /> : <Flow page={page} />}
    </section>
  );
}
