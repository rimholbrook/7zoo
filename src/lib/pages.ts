import pagesJson from '../data/pages.json';
import type { PageData, TextItem } from '../types';
import { plain } from './flow';

// Numerazione editoriale del PDF (angolo in alto a destra): "01"…"21". Non tocca i numeri dei testi (indici di Agenda e Progetti).
export const isPageNum = (t: TextItem) => /^\d{2}$/.test(plain(t).trim()) && t.x > 0.8 && t.y < 0.1 && t.size < 0.03;

export const pages: PageData[] = (pagesJson as unknown as PageData[]).map((p) => ({ ...p, texts: p.texts.filter((t) => !isPageNum(t)) }));

// Estensione verticale del contenuto di una pagina (frazione di altezza pagina): serve a eliminare i margini bianchi tra pagine consecutive.
export function bounds(n: number): [number, number] {
  const p = pages[n - 1]; const ys: number[] = [];
  p.photos.forEach((ph) => ys.push(ph.frame[1], ph.frame[3]));
  p.texts.forEach((t) => ys.push(t.y, t.y + t.h));
  p.rules.forEach((r) => ys.push(r.y, r.y + (r.h ?? 0)));
  return [Math.min(...ys), Math.max(...ys)];
}

// Ritaglio verticale di ogni pagina di una vista: toglie i margini bianchi di PDF tra pagine consecutive.
// Le pagine in FLUSH si agganciano senza spazio alcuno; altrimenti resta un respiro minimo.
export function crops(list: number[], flush: Set<number>): [number, number][] {
  return list.map((n, i) => {
    const [mn, mx] = bounds(n); const first = i === 0; const last = i === list.length - 1;
    const prevFlush = !first && flush.has(list[i - 1]); const nextFlush = !last && flush.has(n);
    const y0 = first ? (mn <= 0.001 ? 0 : mn - 0.04) : prevFlush ? mn + 0.0015 : mn - 0.02;
    const y1 = last ? mx + 0.03 : nextFlush ? mx - 0.0015 : mx + 0.02;
    return [y0, y1];
  });
}
