// Configurazione modificabile del sito: ordine delle sezioni, link, decorazioni, ritocchi.
// Testi, posizioni e riferimenti alle foto stanno in ./pages.json (una voce per pagina del PDF).
export const PAGE_W = 595.5; // dimensioni pagina PDF (pt), usate per le proporzioni
export const PAGE_H = 842.25;

// Ogni sezione è una "vista": si vede solo quando la si apre (hash #id). pages = numeri di pagina del PDF (1-26).
// La Home mostra solo la pagina nera "Associazione Seven Zoo" + le due pagine collage.
// parent = vista da cui si arriva: serve al pulsante "Indietro" e a evidenziare la voce attiva nella sidebar.
import type { DecorItem, LinkItem, NavItem, SectionItem } from '../types';

export const HOME_ID = 'home';

export const SECTIONS: SectionItem[] = [
  // Home: pagina nera + collage continuo + sezione conclusiva Contact Us / Grazie / donazioni (pagina 26)
  { id: 'home', pages: [1, 24, 25, 26] },
  { id: 'la-squadra', pages: [2], parent: 'home' },
  { id: 'agenda', pages: [3], parent: 'home' },
  { id: 'anima-delle-popolari', pages: [4, 5], parent: 'agenda' },
  { id: 'forza-della-seven', pages: [6, 7, 8], parent: 'agenda' }, // include "L'ispirazione"
  { id: 'progetti', pages: [9], parent: 'agenda' },
  { id: 'casa', pages: [10], parent: 'progetti' },
  { id: 'aiuto-allo-studio', pages: [11], parent: 'progetti' },
  { id: 'progetto-patenti', pages: [12], parent: 'progetti' },
  { id: 'musica-come-espressione', pages: [13, 14], parent: 'progetti' }, // Think Unlimited + Rap, una sotto l'altra
  { id: 'supporto-famiglie', pages: [15], parent: 'progetti' },
  { id: 'sport', pages: [16, 17, 18], parent: 'progetti' }, // sport + Inter/Nike/Milan + tornei
  { id: 'storie-degli-altri', pages: [19], parent: 'progetti' },
  { id: 'collaborazioni', pages: [20, 21, 22, 23], parent: 'progetti' },
];

// Nomi mostrati nel pulsante "Indietro" (e usati dalla sidebar).
export const LABELS: Record<string, string> = {
  home: 'Home', 'la-squadra': 'La squadra', agenda: 'La nostra agenda', 'anima-delle-popolari': 'L’anima delle popolari',
  'forza-della-seven': 'La forza della Seven', progetti: 'I nostri progetti', casa: 'La “casa”', 'aiuto-allo-studio': 'Aiuto allo studio',
  'progetto-patenti': 'Progetto patenti', 'musica-come-espressione': 'La musica come espressione',
  'supporto-famiglie': 'Supporto alle famiglie', sport: 'Crescere attraverso lo sport', 'storie-degli-altri': 'Le storie degli altri', collaborazioni: 'Collaborazioni',
};

// Sidebar: voci principali + tendina sotto "I nostri progetti".
const item = (id: string): NavItem => ({ label: LABELS[id], href: `#${id}` });
export const NAV: NavItem[] = [
  item('home'),
  item('la-squadra'),
  item('anima-delle-popolari'),
  item('forza-della-seven'),
  { ...item('progetti'), children: ['casa', 'aiuto-allo-studio', 'progetto-patenti', 'musica-come-espressione', 'supporto-famiglie', 'sport', 'storie-degli-altri', 'collaborazioni'].map(item) },
];

// Pagine che si agganciano senza alcuno spazio alla pagina successiva (collage unico e continuo).
export const FLUSH = new Set<number>([24]);

// Righe cliccabili di Agenda (pagina 3) e indice progetti (pagina 9).
// match = testo contenuto nel blocco della riga; to = id sezione.
export const LINKS: Record<number, LinkItem[]> = {
  3: [
    { match: 'ANIMA DELLE POPOLARI', to: 'anima-delle-popolari' },
    { match: 'FORZA DELLA SEVEN', to: 'forza-della-seven' },
    { match: 'I NOSTRI PROGETTI.', to: 'progetti' },
  ],
  9: [
    { match: 'CASA', to: 'casa' },
    { match: 'AIUTO ALLO STUDIO', to: 'aiuto-allo-studio' },
    { match: 'PROGETTO PATENTI', to: 'progetto-patenti' },
    { match: 'MUSICA COME ESPRESSIONE', to: 'musica-come-espressione' },
    { match: 'SUPPORTO ALLE FAMIGLIE', to: 'supporto-famiglie' },
    { match: 'CRESCERE ATTRAVERSO', to: 'sport' },
    { match: 'STORIE DEGLI ALTRI', to: 'storie-degli-altri' },
    { match: 'COLLABORAZIONI', to: 'collaborazioni' },
  ],
};

// Elementi vettoriali del PDF non presenti come immagini (coordinate: centro, in frazioni della larghezza pagina).
export const DECOR: Record<number, DecorItem[]> = {
  13: [
    { type: 'asterisk', cx: 0.398, cy: 0.057, s: 0.06, color: '#7a45f5' },
    { type: 'arrow', cx: 0.92, cy: 0.047, s: 0.043, color: '#7a45f5' },
  ],
};

// Ritocchi per singola immagine (chiave = nome file in public/assets).
export const TWEAKS: Record<string, { scale?: number }> = { 'p01_03.png': { scale: 1.12 } }; // logo Seven Zoo della Home, leggermente ingrandito

// Pagine che restano sempre composte come nel PDF anche su mobile (grandi titoli / solo foto).
export const KEEP_CANVAS_ON_MOBILE: number[] = [1, 3, 9, 13, 24, 25];
