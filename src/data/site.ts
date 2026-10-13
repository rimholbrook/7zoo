// Configurazione modificabile del sito: ordine delle sezioni, link, decorazioni, ritocchi.
// Testi, posizioni e riferimenti alle foto stanno in ./pages.json (una voce per pagina del PDF).
export const PAGE_W = 595.5; // dimensioni pagina PDF (pt), usate per le proporzioni
export const PAGE_H = 842.25;

// pages = numeri di pagina del PDF (1-26). Il primo elemento di ogni sezione riceve l'id per l'ancora.
import type { DecorItem, LinkItem, SectionItem } from '../types';

export const SECTIONS: SectionItem[] = [
  { id: 'home', pages: [1] },
  { id: 'collage', pages: [24, 25] },
  { id: 'chi-siamo', pages: [2] },
  { id: 'agenda', pages: [3] },
  { id: 'anima-delle-popolari', pages: [4, 5] },
  { id: 'forza-della-seven', pages: [6] },
  { id: 'ispirazione', pages: [7, 8] },
  { id: 'progetti', pages: [9] },
  { id: 'casa', pages: [10] },
  { id: 'aiuto-allo-studio', pages: [11] },
  { id: 'progetto-patenti', pages: [12] },
  { id: 'musica-come-espressione', pages: [13] },
  { id: 'rap', pages: [14] },
  { id: 'supporto-famiglie', pages: [15] },
  { id: 'sport', pages: [16, 17, 18] },
  { id: 'storie-degli-altri', pages: [19] },
  { id: 'cura-degli-spazi', pages: [20, 21, 22, 23] },
  { id: 'contact', pages: [26] },
];

export const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'Chi siamo', href: '#chi-siamo' },
  { label: 'Contact Us', href: '#contact' },
];

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
    { match: 'COLLABORAZIONI', to: 'cura-degli-spazi' },
  ],
};

// Elementi vettoriali del PDF non presenti come immagini (coordinate: centro, in frazioni della larghezza pagina).
export const DECOR: Record<number, DecorItem[]> = {
  1: [{ type: 'asterisk', cx: 0.114, cy: 0.09, s: 0.056, color: '#d9d9d6' }],
  13: [
    { type: 'asterisk', cx: 0.398, cy: 0.057, s: 0.06, color: '#7a45f5' },
    { type: 'arrow', cx: 0.92, cy: 0.047, s: 0.043, color: '#7a45f5' },
  ],
  26: [{ type: 'asterisk', cx: 0.128, cy: 0.321, s: 0.06, color: '#ffffff' }],
};

// Ritocchi per singola immagine (chiave = nome file in public/assets).
export const TWEAKS: Record<string, { scale?: number }> = { 'p01_03.png': { scale: 1.12 } }; // logo Seven Zoo della Home, leggermente ingrandito

// Pagine che restano sempre composte come nel PDF anche su mobile (grandi titoli / solo foto).
export const KEEP_CANVAS_ON_MOBILE: number[] = [1, 3, 9, 13, 24, 25];
