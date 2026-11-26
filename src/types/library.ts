export type BookCategory =
  | 'Semua'
  | 'Sastra & Puisi'
  | 'Filsafat'
  | 'Arsitektur'
  | 'Sejarah'
  | 'Esai & Budaya';

export type SortOption = 'terbaru' | 'judul' | 'populer';

export type ReaderTheme = 'hangat' | 'terang' | 'malam';
export type ReaderFontSize = 'kecil' | 'sedang' | 'besar';
export type ReaderFontFamily = 'serif' | 'sans';

export interface Chapter {
  id: string;
  number: string;
  title: string;
  readingTimeMinutes: number;
  paragraphs: string[];
  editorNote?: string;
}

export interface Book {
  id: string;
  catalogNumber: string;
  title: string;
  subtitle: string;
  author: string;
  authorBio: string;
  category: Exclude<BookCategory, 'Semua'>;
  year: number;
  pages: number;
  language: string;
  publisher: string;
  isbn: string;
  readCount: number;
  readingMinutes: number;
  coverImage?: string;
  clothColor: string;
  clothAccent: string;
  featuredQuote: string;
  synopsis: string;
  chapters: Chapter[];
}

export interface ReadingProgress {
  bookId: string;
  chapterIndex: number;
  lastReadAt: string;
  completedChapters: string[];
}

export interface ReaderSettings {
  theme: ReaderTheme;
  fontSize: ReaderFontSize;
  fontFamily: ReaderFontFamily;
}
