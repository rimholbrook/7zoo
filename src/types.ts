export type Run = [string, number]; // [testo, 1 = grassetto]
export interface TextItem { x: number; y: number; w: number; h: number; size: number; color: string; runs: Run[]; fx?: 'shadow'; }
export interface PhotoItem { src: string; frame: [number, number, number, number]; img: [number, number, number, number]; }
export interface RuleItem { x: number; y: number; w?: number; h?: number; color: string; }
export interface PageData { page: number; bg: string; photos: PhotoItem[]; texts: TextItem[]; rules: RuleItem[]; }
export interface DecorItem { type: 'asterisk' | 'arrow'; cx: number; cy: number; s: number; color: string; }
export interface LinkItem { match: string; to: string; }
export interface SectionItem { id: string; pages: number[]; }
