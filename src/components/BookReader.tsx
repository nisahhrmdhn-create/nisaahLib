import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  List,
  Type,
  X,
} from 'lucide-react';
import {
  Book,
  ReaderFontFamily,
  ReaderFontSize,
  ReaderSettings,
  ReaderTheme,
} from '../types/library';

interface BookReaderProps {
  book: Book;
  chapterIndex: number;
  isBookmarked: boolean;
  settings: ReaderSettings;
  completedChapters: string[];
  onClose: () => void;
  onChangeChapter: (index: number) => void;
  onMarkChapterComplete: (chapterId: string) => void;
  onToggleBookmark: () => void;
  onUpdateSettings: (next: ReaderSettings) => void;
}

const THEME_STYLES: Record<
  ReaderTheme,
  {
    bg: string;
    surface: string;
    border: string;
    text: string;
    muted: string;
    accentBtn: string;
    label: string;
    swatch: string;
  }
> = {
  hangat: {
    bg: 'bg-[#FAF8F3]',
    surface: 'bg-[#F2EFE7]',
    border: 'border-[#E4DFD3]',
    text: 'text-[#242825]',
    muted: 'text-[#626A64]',
    accentBtn: 'bg-[#3D5A4F] text-[#FAF9F6] hover:bg-[#2F473E]',
    label: 'Kertas Hangat',
    swatch: '#FAF8F3',
  },
  terang: {
    bg: 'bg-[#FFFFFF]',
    surface: 'bg-[#F5F6F5]',
    border: 'border-[#E6E8E6]',
    text: 'text-[#1D211E]',
    muted: 'text-[#636A65]',
    accentBtn: 'bg-[#3D5A4F] text-[#FFFFFF] hover:bg-[#2F473E]',
    label: 'Putih Tenang',
    swatch: '#FFFFFF',
  },
  malam: {
    bg: 'bg-[#1A1E1C]',
    surface: 'bg-[#232825]',
    border: 'border-[#313834]',
    text: 'text-[#E7E5DE]',
    muted: 'text-[#A2A8A3]',
    accentBtn: 'bg-[#5B7D6F] text-[#FAF9F6] hover:bg-[#4B6B5E]',
    label: 'Malam Teduh',
    swatch: '#1A1E1C',
  },
};

const FONT_SIZE_CLASS: Record<ReaderFontSize, string> = {
  kecil: 'text-[16px] leading-[1.8]',
  sedang: 'text-[18px] sm:text-[19px] leading-[1.85]',
  besar: 'text-[21px] sm:text-[22px] leading-[1.9]',
};

export function BookReader({
  book,
  chapterIndex,
  isBookmarked,
  settings,
  completedChapters,
  onClose,
  onChangeChapter,
  onMarkChapterComplete,
  onToggleBookmark,
  onUpdateSettings,
}: BookReaderProps) {
  const [tocOpen, setTocOpen] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const chapter = book.chapters[chapterIndex] ?? book.chapters[0];
  const theme = THEME_STYLES[settings.theme];
  const isLastChapter = chapterIndex >= book.chapters.length - 1;
  const isFirstChapter = chapterIndex <= 0;
  const isCurrentCompleted = completedChapters.includes(chapter.id);

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [chapterIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (tocOpen) setTocOpen(false);
        else if (appearanceOpen) setAppearanceOpen(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tocOpen, appearanceOpen, onClose]);

  const progressPercent = Math.round(
    ((chapterIndex + 1) / book.chapters.length) * 100
  );

  const handleNextChapter = () => {
    onMarkChapterComplete(chapter.id);
    if (!isLastChapter) {
      onChangeChapter(chapterIndex + 1);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col ${theme.bg} ${theme.text} transition-colors duration-200`}
      role="dialog"
      aria-modal="true"
      aria-label={`Ruang Baca: ${book.title}`}
    >
      {/* Top Reader Bar */}
      <header
        className={`shrink-0 border-b ${theme.border} ${theme.bg} relative z-30`}
      >
        {/* Reading Progress Hairline */}
        <div className="h-0.5 w-full bg-black/5">
          <div
            className="h-full bg-[#3D5A4F] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg ${theme.muted} hover:opacity-100 hover:bg-black/5 transition-colors cursor-pointer whitespace-nowrap shrink-0`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali ke Koleksi</span>
            <span className="sm:hidden">Kembali</span>
          </button>

          <div className="text-center min-w-0 px-2">
            <p className="font-serif text-base sm:text-lg font-semibold truncate">
              {book.title}
            </p>
            <p className={`text-xs truncate ${theme.muted}`}>
              {chapter.number} · {chapter.title}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setAppearanceOpen((prev) => !prev);
                setTocOpen(false);
              }}
              aria-label="Pengaturan tampilan baca"
              aria-expanded={appearanceOpen}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border ${theme.border} hover:bg-black/5 transition-colors cursor-pointer`}
            >
              <Type className="w-4 h-4" />
              <span className="hidden sm:inline">Tampilan</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setTocOpen((prev) => !prev);
                setAppearanceOpen(false);
              }}
              aria-label="Buka daftar isi"
              aria-expanded={tocOpen}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border ${theme.border} hover:bg-black/5 transition-colors cursor-pointer`}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Daftar Isi</span>
            </button>

            <button
              type="button"
              onClick={onToggleBookmark}
              aria-label={isBookmarked ? 'Hapus dari rak' : 'Simpan ke rak'}
              className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border ${theme.border} hover:bg-black/5 transition-colors cursor-pointer`}
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isBookmarked ? 'fill-[#3D5A4F] text-[#3D5A4F]' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Appearance Settings Popover */}
        {appearanceOpen && (
          <div
            className={`absolute right-4 sm:right-6 top-full mt-2 w-72 sm:w-80 p-5 rounded-xl border ${theme.border} ${theme.bg} shadow-xl z-40`}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold tracking-wider uppercase">
                Kenyamanan Membaca
              </p>
              <button
                type="button"
                onClick={() => setAppearanceOpen(false)}
                aria-label="Tutup pengaturan tampilan"
                className="p-1 rounded-md hover:bg-black/5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Paper Tone */}
            <div className="mb-4">
              <p className={`text-xs mb-2 ${theme.muted}`}>Tema Kertas</p>
              <div className="grid grid-cols-3 gap-2">
                {(['hangat', 'terang', 'malam'] as ReaderTheme[]).map((t) => {
                  const active = settings.theme === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() =>
                        onUpdateSettings({ ...settings, theme: t })
                      }
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border text-[11px] font-medium cursor-pointer transition-colors ${
                        active
                          ? 'border-[#3D5A4F] ring-1 ring-[#3D5A4F]'
                          : `${theme.border}`
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-black/15"
                        style={{ backgroundColor: THEME_STYLES[t].swatch }}
                      />
                      <span className="truncate w-full text-center">
                        {THEME_STYLES[t].label.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Font Size */}
            <div className="mb-4">
              <p className={`text-xs mb-2 ${theme.muted}`}>Ukuran Huruf</p>
              <div className={`grid grid-cols-3 gap-1 p-1 rounded-lg ${theme.surface}`}>
                {(
                  [
                    { id: 'kecil', label: 'Kecil' },
                    { id: 'sedang', label: 'Sedang' },
                    { id: 'besar', label: 'Besar' },
                  ] as { id: ReaderFontSize; label: string }[]
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      onUpdateSettings({ ...settings, fontSize: item.id })
                    }
                    className={`py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors ${
                      settings.fontSize === item.id
                        ? 'bg-[#3D5A4F] text-[#FAF9F6]'
                        : ''
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Family */}
            <div>
              <p className={`text-xs mb-2 ${theme.muted}`}>Jenis Huruf</p>
              <div className={`grid grid-cols-2 gap-1 p-1 rounded-lg ${theme.surface}`}>
                {(
                  [
                    { id: 'serif', label: 'Serif Klasik' },
                    { id: 'sans', label: 'Sans Bersih' },
                  ] as { id: ReaderFontFamily; label: string }[]
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      onUpdateSettings({ ...settings, fontFamily: item.id })
                    }
                    className={`py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors ${
                      settings.fontFamily === item.id
                        ? 'bg-[#3D5A4F] text-[#FAF9F6]'
                        : ''
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Reader Body */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Table of Contents Slide-Over */}
        {tocOpen && (
          <aside
            className={`w-80 max-w-full shrink-0 border-r ${theme.border} ${theme.surface} overflow-y-auto p-6 z-20`}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-xl font-semibold">Daftar Isi</h2>
              <button
                type="button"
                onClick={() => setTocOpen(false)}
                aria-label="Tutup daftar isi"
                className="p-1.5 rounded-lg hover:bg-black/5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              {book.chapters.map((item, idx) => {
                const active = idx === chapterIndex;
                const done = completedChapters.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onChangeChapter(idx);
                      setTocOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#3D5A4F] text-[#FAF9F6]'
                        : 'hover:bg-black/5'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] opacity-80 mb-0.5 tabular-nums">
                      <span>{item.number}</span>
                      <span>
                        {done ? 'Selesai' : `${item.readingTimeMinutes} mnt`}
                      </span>
                    </div>
                    <p className="text-sm font-medium leading-snug">
                      {item.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* Main Reading Canvas */}
        <main
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-5 sm:px-8 py-12 sm:py-16"
        >
          <article className="max-w-2xl mx-auto">
            <header className={`pb-8 mb-8 border-b ${theme.border}`}>
              <p className={`font-mono text-xs tracking-widest uppercase mb-3 tabular-nums ${theme.muted}`}>
                {chapter.number} · Estimasi {chapter.readingTimeMinutes} menit baca
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-medium leading-tight editorial-balance">
                {chapter.title}
              </h1>
              <p className={`text-sm mt-3 ${theme.muted}`}>
                {book.title} — {book.author}
              </p>
            </header>

            <div
              className={`space-y-6 ${FONT_SIZE_CLASS[settings.fontSize]} ${
                settings.fontFamily === 'serif' ? 'font-serif' : 'font-sans'
              }`}
            >
              {chapter.paragraphs.map((paragraph, pIdx) => (
                <p
                  key={pIdx}
                  className={
                    pIdx === 0
                      ? 'first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none'
                      : ''
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {chapter.editorNote && (
              <aside
                className={`mt-10 pt-5 border-t ${theme.border} text-xs italic ${theme.muted}`}
              >
                {chapter.editorNote}
              </aside>
            )}

            {/* Chapter Navigation Footer */}
            <footer
              className={`mt-14 pt-8 border-t ${theme.border} flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4`}
            >
              <button
                type="button"
                disabled={isFirstChapter}
                onClick={() => onChangeChapter(chapterIndex - 1)}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border ${theme.border} transition-colors ${
                  isFirstChapter
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-black/5 cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Bab Sebelumnya</span>
              </button>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onMarkChapterComplete(chapter.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium rounded-lg border ${theme.border} transition-colors cursor-pointer ${
                    isCurrentCompleted ? 'opacity-80' : 'hover:bg-black/5'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 text-[#3D5A4F]" />
                  <span>
                    {isCurrentCompleted ? 'Bab Ditandai Selesai' : 'Tandai Selesai'}
                  </span>
                </button>

                {!isLastChapter ? (
                  <button
                    type="button"
                    onClick={handleNextChapter}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${theme.accentBtn}`}
                  >
                    <span>Bab Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onMarkChapterComplete(chapter.id);
                      onClose();
                    }}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${theme.accentBtn}`}
                  >
                    <span>Selesai Membaca Buku</span>
                  </button>
                )}
              </div>
            </footer>
          </article>
        </main>
      </div>
    </div>
  );
}
