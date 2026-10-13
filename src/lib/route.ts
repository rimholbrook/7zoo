import { useEffect, useState } from 'react';
import { SECTIONS, HOME_ID } from '../data/site';

const read = () => {
  const id = window.location.hash.replace(/^#/, '');
  return SECTIONS.some((s) => s.id === id) ? id : HOME_ID;
};

// Router minimale basato sull'hash: #agenda, #casa, ... Hash sconosciuto = Home.
export function useRoute() {
  const [id, setId] = useState(read);
  useEffect(() => {
    const f = () => { setId(read()); window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior }); };
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);
  return id;
}

// Catena di antenati (dalla Home alla vista corrente), per breadcrumb e voce attiva.
export function trail(id: string) {
  const out: string[] = []; let cur: string | undefined = id;
  while (cur) { out.unshift(cur); cur = SECTIONS.find((s) => s.id === cur)?.parent; }
  return out;
}