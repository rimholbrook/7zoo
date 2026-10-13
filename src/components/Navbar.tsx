import { useEffect, useState } from 'react';
import { NAV } from '../data/site';
import { trail } from '../lib/route';

// Barra in alto con l'icona che apre la sidebar. La voce attiva è quella della vista corrente o di un suo antenato.
export default function Navbar({ current }: { current: string }) {
  const [open, setOpen] = useState(false);
  const active = trail(current);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);
  return (
    <>
      <header className="nav">
        <button className="nav__toggle" aria-expanded={open} aria-controls="sidebar" aria-label={open ? 'Chiudi menu' : 'Apri menu'} onClick={() => setOpen(!open)}><i /><i /><i /></button>
        <a className="nav__brand" href="#home">SEVEN ZOO <span>x San Siro</span></a>
      </header>
      <div className={`scrim${open ? ' is-open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside id="sidebar" className={`sidebar${open ? ' is-open' : ''}`} aria-label="Principale" aria-hidden={!open}>
        <nav>
          {NAV.map((l) => {
            const on = active.includes(l.href.slice(1));
            return <a key={l.href} href={l.href} tabIndex={open ? 0 : -1} aria-current={on ? 'page' : undefined} className={on ? 'is-active' : undefined} onClick={() => setOpen(false)}>{l.label}</a>;
          })}
        </nav>
      </aside>
    </>
  );
}
