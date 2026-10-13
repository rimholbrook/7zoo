import { useState, useRef, type CSSProperties } from 'react';
import type { TextItem } from '../types';
import { plain } from '../lib/flow';
// Sezione "PER DONAZIONI:" — testi e IBAN letti dal PDF (pages.json), nessun dato aggiunto.
export default function Donations({ blocks, abs }: { blocks: TextItem[]; abs?: boolean }) {
  const [copied, setCopied] = useState(false); const timer = useRef<ReturnType<typeof setTimeout>>();
  const [info, note] = blocks.length > 1 && /^SPECIFICANDO/.test(plain(blocks[0])) ? [blocks[1], blocks[0]] : blocks;
  const lines = plain(info).split('\n');
  const ibanLine = lines.find((l) => /^IBAN/.test(l)) || '';
  const iban = ibanLine.replace(/^IBAN:\s*/, '').trim();
  const copy = async () => {
    try { await navigator.clipboard.writeText(iban); }
    catch { const ta = document.createElement('textarea'); ta.value = iban; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
    setCopied(true); clearTimeout(timer.current); timer.current = setTimeout(() => setCopied(false), 2500);
  };
  const style: CSSProperties | undefined = abs ? { left: `${(info.x - 0.03) * 100}%`, top: `${(info.y - 0.01) * 100}%`, width: '45%' } : undefined;
  return (
    <div className={`donations${abs ? ' donations--abs' : ''}`} style={style}>
      {lines.map((l, i) => <p key={i} className={/^IBAN/.test(l) ? 'donations__iban' : 'donations__line'}>{l}</p>)}
      <button type="button" className="donations__copy" onClick={copy}>Copia IBAN</button>
      <span className="donations__status" role="status" aria-live="polite">{copied ? 'IBAN copiato negli appunti' : ''}</span>
      {note && <p className="donations__note">{plain(note)}</p>}
    </div>
  );
}
