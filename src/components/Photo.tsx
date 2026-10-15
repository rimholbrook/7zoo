import type { CSSProperties } from 'react';
import type { PhotoItem } from '../types';
import { PAGE_W, PAGE_H, TWEAKS } from '../data/site';
import { useLightbox } from './Lightbox';
export const assetUrl = (f: string) => `${import.meta.env.BASE_URL}assets/${f}`;
// Riproduce il ritaglio originale: "frame" = parte visibile, "img" = posizione reale dell'immagine (frazioni di pagina).
interface Props { photo: PhotoItem; abs?: boolean; alt?: string; }
export default function Photo({ photo, abs = false, alt = 'Fotografia Associazione Seven Zoo x San Siro' }: Props) {
  const open = useLightbox();
  const [fx0, fy0, fx1, fy1] = photo.frame; const [ix0, iy0, ix1, iy1] = photo.img;
  const fw = fx1 - fx0; const fh = fy1 - fy0;
  const round = photo.round ?? (fw < 0.3 && photo.src.endsWith(".jpg") && Math.abs((fw * PAGE_W) / (fh * PAGE_H) - 1) < 0.25);
  const tw = TWEAKS[photo.src] || {};
  const style: CSSProperties = abs
    ? { left: `${fx0 * 100}%`, top: `${fy0 * 100}%`, width: `${fw * 100}%`, height: `${fh * 100}%` }
    : { aspectRatio: `${fw * PAGE_W} / ${fh * PAGE_H}` };
  if (tw.scale) style.transform = `scale(${tw.scale})`;
  const inner = {
    left: `${((ix0 - fx0) / fw) * 100}%`, top: `${((iy0 - fy0) / fh) * 100}%`,
    width: `${((ix1 - ix0) / fw) * 100}%`, height: `${((iy1 - iy0) / fh) * 100}%`,
  };
  return (
    <button type="button" className={`photo${abs ? ' photo--abs' : ''}${round ? ' photo--round' : ''}${photo.src.endsWith('.png') ? ' photo--png' : ''}`} style={style}
      onClick={() => open(assetUrl(photo.src), alt)} aria-label={`Ingrandisci: ${alt}`}>
      <img src={assetUrl(photo.src)} alt={alt} loading="eager" decoding="async" style={inner} draggable="false" />
    </button>
  );
}
