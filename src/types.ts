export type Run = [string, number]; // [testo, 1 = grassetto]
export interface TextItem { x: number; y: number; w: number; h: number; size: number; color: string; runs: Run[]; fx?: 'shadow'; align?: 'center' | 'right'; bx?: number; bw?: number; } // align + bx/bw (riquadro in frazioni di pagina) = testo allineato dentro un riquadro
export interface PhotoItem { src: string; frame: [number, number, number, number]; img: [number, number, number, number]; round?: boolean; } // round = ritaglio circolare forzato
export interface RuleItem { x: number; y: number; w?: number; h?: number; color: string; }
export interface PageData { page: number; bg: string; photos: PhotoItem[]; texts: TextItem[]; rules: RuleItem[]; }
export interface DecorItem { type: 'asterisk' | 'arrow'; cx: number; cy: number; s: number; color: string; }
export interface LinkItem { match: string; to: string; title?: boolean; } // title = il testo stesso (anche grande, in alto) diventa il link
export interface NavItem { label: string; href: string; children?: NavItem[]; } // children = sottosezioni (tendina)
export interface SectionItem { id: string; pages: number[]; parent?: string; } // parent = vista da cui si arriva (per il pulsante Indietro)