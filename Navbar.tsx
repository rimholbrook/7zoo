import { useState } from 'react';
import { NAV } from '../data/site';
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <a className="nav__brand" href="#home">SEVEN ZOO <span>x San Siro</span></a>
      <button className="nav__toggle" aria-expanded={open} aria-controls="menu" aria-label="Menu" onClick={() => setOpen(!open)}><i /><i /><i /></button>
      <nav id="menu" className={`nav__menu${open ? ' is-open' : ''}`} aria-label="Principale">
        {NAV.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
      </nav>
    </header>
  );
}
