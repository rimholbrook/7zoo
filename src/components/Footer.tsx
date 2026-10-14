import { NAV } from '../data/site';
export default function Footer() {
  return (
    <footer className="footer">
      <p>Associazione Seven Zoo x San Siro</p>
      <nav aria-label="Footer">{NAV.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}</nav>
    </footer>
  );
}

