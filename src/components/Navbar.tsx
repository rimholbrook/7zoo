import { useEffect, useState } from 'react';
import { NAV, SECTIONS, LABELS } from '../data/site';
import { trail } from '../lib/route';

// Barra in alto + sidebar. "I nostri progetti" ha una tendina: su desktop (mouse) compare al passaggio del cursore,
// su touch si apre/chiude con il pulsante freccia. La voce attiva è quella della vista corrente o di un suo antenato.
export default function Navbar({ current }: { current: string }) {
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState<string | null>(null);
  const active = trail(current);
  const parent = SECTIONS.find((s) => s.id === current)?.parent;

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);
  // Aprendo la sidebar, la tendina della sezione in cui ci si trova parte già aperta.
  useEffect(() => { if (open) setGroup(NAV.find((n) => n.children && active.includes(n.href.slice(1)))?.href ?? null); }, [open]);

  const close = () => { setOpen(false); setGroup(null); };
  const cls = (href: string) => (active.includes(href.slice(1)) ? 'is-active' : undefined);

  return (
    <>
      <header className="nav">
        <button className="nav__toggle" aria-expanded={open} aria-controls="sidebar" aria-label={open ? 'Chiudi menu' : 'Apri menu'} onClick={() => (open ? close() : setOpen(true))}><i /><i /><i /></button>
        <a className="nav__brand" href="#home">SEVEN ZOO <span>x San Siro</span></a>
        {parent && <a className="nav__back" href={`#${parent}`}>← {LABELS[parent]}</a>}
      </header>
      <div className={`scrim${open ? ' is-open' : ''}`} onClick={close} aria-hidden="true" />
      <aside id="sidebar" className={`sidebar${open ? ' is-open' : ''}`} aria-label="Principale" aria-hidden={!open}>
        <nav>
          <ul>
            {NAV.map((l) => {
              const tab = open ? 0 : -1;
              if (!l.children) return <li key={l.href}><a href={l.href} tabIndex={tab} aria-current={active.includes(l.href.slice(1)) ? 'page' : undefined} className={cls(l.href)} onClick={close}>{l.label}</a></li>;
              const g = group === l.href;
              return (
                <li key={l.href} className={`has-sub${g ? ' is-open' : ''}`}>
                  <div className="grp">
                    <a href={l.href} tabIndex={tab} aria-current={active.includes(l.href.slice(1)) ? 'page' : undefined} className={cls(l.href)} onClick={close}>{l.label}</a>
                    <button type="button" tabIndex={tab} aria-expanded={g} aria-label={`${g ? 'Chiudi' : 'Apri'} le sottosezioni di ${l.label}`} onClick={() => setGroup(g ? null : l.href)}><span aria-hidden="true">⌄</span></button>
                  </div>
                  <div className="subwrap">
                    <ul className="sub">
                      {l.children.map((c) => <li key={c.href}><a href={c.href} tabIndex={tab} aria-current={current === c.href.slice(1) ? 'page' : undefined} className={current === c.href.slice(1) || active.includes(c.href.slice(1)) ? 'is-active' : undefined} onClick={close}>{c.label}</a></li>)}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}