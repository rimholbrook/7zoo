import type { DecorItem } from '../types';
export default function Decor({ d }: { d: DecorItem }) {
  const style = { left: `${(d.cx - d.s / 2) * 100}%`, top: `${d.cy * 100}%`, width: `${d.s * 100}%`, color: d.color };
  return (
    <svg className="decor" style={{ ...style, transform: 'translateY(-50%)' }} viewBox="-10 -10 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round">
      {d.type === 'asterisk'
        ? [0, 60, 120].map((a) => <line key={a} x1="0" y1="-8.5" x2="0" y2="8.5" strokeWidth="2.4" transform={`rotate(${a})`} />)
        : <path d="M-7 -7 L7 7 M7 -3 V7 H-3 M-7 -7 H-1" strokeWidth="1.6" />}
    </svg>
  );
}
