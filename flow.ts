import { PAGE_W, PAGE_H } from '../data/site';
import type { PageData, PhotoItem, TextItem } from '../types';

export type FlowEntry =
  | { kind: 'photo'; photo: PhotoItem; y: number; x: number }
  | { kind: 'person'; photo: PhotoItem; caps: TextItem[]; y: number; x: number }
  | { kind: 'text'; text: TextItem; y: number; x: number }
  | { kind: 'donation'; blocks: TextItem[]; y: number; x: number };
export type FlowItem = Exclude<FlowEntry, { kind: 'person' }> | { kind: 'people'; list: Extract<FlowEntry, { kind: 'person' }>[] };
export const plain = (t: TextItem) => t.runs.map((r) => r[0]).join('');
const isAvatar = (p: PhotoItem) => {
  const [x0, y0, x1, y1] = p.frame; const w = x1 - x0; const a = (w * PAGE_W) / ((y1 - y0) * PAGE_H);
  return w < 0.3 && a > 0.8 && a < 1.25 && p.src.endsWith('.jpg');
};
export const isDonation = (t: TextItem) => /^(PER DONAZIONI|SPECIFICANDO)/.test(plain(t));

// Ordine di lettura per il layout mobile: foto con didascalia diventano "persone", il resto segue l'asse verticale.
export function buildFlow(page: PageData): FlowItem[] {
  const texts = page.texts.map((t, i) => ({ ...t, i }));
  const used = new Set<number>(); const entries: FlowEntry[] = [];
  const donation = texts.filter(isDonation); donation.forEach((t) => used.add(t.i));
  page.photos.forEach((p) => {
    if (isAvatar(p)) {
      const cx = (p.frame[0] + p.frame[2]) / 2; let ref = p.frame[3]; const caps: TextItem[] = [];
      [...texts].sort((a, b) => a.y - b.y).forEach((t) => {
        if (!used.has(t.i) && Math.abs(t.x + t.w / 2 - cx) < 0.13 && t.y >= ref - 0.01 && t.y - ref < 0.05) { caps.push(t); used.add(t.i); ref = t.y + t.h; }
      });
      entries.push({ kind: 'person', photo: p, caps, y: p.frame[1], x: p.frame[0] });
    } else entries.push({ kind: 'photo', photo: p, y: p.frame[1], x: p.frame[0] });
  });
  texts.filter((t) => !used.has(t.i)).forEach((t) => entries.push({ kind: 'text', text: t, y: t.y, x: t.x }));
  if (donation.length) entries.push({ kind: 'donation', blocks: donation, y: donation[0].y, x: donation[0].x });
  entries.sort((a, b) => (Math.abs(a.y - b.y) > 0.012 ? a.y - b.y : a.x - b.x));
  const out: FlowItem[] = [];
  entries.forEach((e) => {
    const last = out[out.length - 1];
    if (e.kind === 'person' && last && last.kind === 'people') last.list.push(e);
    else if (e.kind === 'person') out.push({ kind: 'people', list: [e] });
    else out.push(e as FlowItem);
  });
  return out;
}
