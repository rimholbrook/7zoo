import { createContext, useContext, useEffect, useRef, useState, useCallback, type ReactNode } from 'react';
const Ctx = createContext<(src: string, alt: string) => void>(() => {});
export const useLightbox = () => useContext(Ctx);
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [img, setImg] = useState<{ src: string; alt: string } | null>(null);
  const btn = useRef<HTMLButtonElement>(null); const opener = useRef<HTMLElement | null>(null);
  const open = useCallback((src: string, alt: string) => { opener.current = document.activeElement as HTMLElement; setImg({ src, alt }); }, []);
  const close = useCallback(() => { setImg(null); opener.current?.focus?.(); }, []);
  useEffect(() => {
    if (!img) return;
    const key = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', key); document.body.style.overflow = 'hidden'; btn.current?.focus();
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = ''; };
  }, [img, close]);
  return (
    <Ctx.Provider value={open}>
      {children}
      {img && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Immagine ingrandita" onClick={close}>
          <button ref={btn} className="lightbox__close" onClick={close} aria-label="Chiudi">×</button>
          <img src={img.src} alt={img.alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </Ctx.Provider>
  );
}
