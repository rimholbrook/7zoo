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
  { id: 'home', pages: [1, 24, 25] },
  { id: 'chi-siamo', pages: [2], parent: 'home' }, // la squadra
  { id: 'agenda', pages: [3], parent: 'home' },
  { id: 'anima-delle-popolari', pages: [4, 5], parent: 'agenda' },
  { id: 'forza-della-seven', pages: [6, 7, 8], parent: 'agenda' }, // include "L'ispirazione"
  { id: 'progetti', pages: [9], parent: 'agenda' },
  { id: 'casa', pages: [10], parent: 'progetti' },
  { id: 'aiuto-allo-studio', pages: [11], parent: 'progetti' },
  { id: 'progetto-patenti', pages: [12], parent: 'progetti' },
  { id: 'musica-come-espressione', pages: [13], parent: 'progetti' }, // Think Unlimited
  { id: 'rap', pages: [14], parent: 'musica-come-espressione' },
  { id: 'supporto-famiglie', pages: [15], parent: 'progetti' },
  { id: 'sport', pages: [16, 17, 18], parent: 'progetti' }, // sport + Inter/Nike/Milan + tornei
  { id: 'storie-degli-altri', pages: [19], parent: 'progetti' },
  { id: 'collaborazioni', pages: [20, 21, 22, 23], parent: 'progetti' },
  { id: 'contact', pages: [26], parent: 'home' }, // pagina "Grazie"
];

// Voci della sidebar (icona in alto a sinistra).
export const NAV: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Chi siamo', href: '#chi-siamo' },
  { label: 'La nostra agenda', href: '#agenda' },
  { label: 'Contact Us', href: '#contact' },
];

// Righe cliccabili di Agenda (pagina 3), indice progetti (pagina 9) e titolo Think Unlimited (pagina 13).
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
  13: [{ match: 'THINK UNLIMITED', to: 'rap', title: true }],
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
