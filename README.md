# 7zoo
# Associazione Seven Zoo x San Siro — sito React

## Avvio
```
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/ (poi: npm run preview)
```
Richiede Node 18+. Linguaggio: React + TypeScript (Vite). `npm run build` esegue prima il controllo dei tipi.

## Struttura
- `public/assets/` — 144 immagini originali estratte dal PDF (nome `pNN_MM`: pagina PDF NN, immagine MM). Mappa in `ASSET_MAP.md`.
- `src/data/pages.json` — dati per pagina del PDF: testi (con grassetti, posizione, colore), foto (file + ritaglio), righe. Qui si correggono testi, si sostituiscono foto (cambia `src`), si modificano posizioni/dimensioni.
- `src/data/site.js` — ordine sezioni, menu, righe cliccabili di Agenda e indice progetti, decorazioni vettoriali, ritocchi (es. logo Home ingrandito).
- `src/components/` — Navbar, Footer, Spread (pagina), Photo, TextBlock, Decor, Donations, Lightbox.

## Figma Make
Non verificato. Se la tua versione accetta l'importazione di un progetto React/Vite o di file, carica l'intera cartella (incluso `public/assets`); altrimenti incolla `src/` e carica le immagini come asset.
