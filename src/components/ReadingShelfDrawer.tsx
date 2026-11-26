import { useEffect } from 'react';
import { BookOpen, Trash2, X } from 'lucide-react';
import { Book, ReadingProgress } from '../types/library';
import { BookCover } from './BookCover';

interface ReadingShelfDrawerProps {
  open: boolean;
  books: Book[];
  bookmarkedIds: string[];
  progressMap: Record<string, ReadingProgress>;
  onClose: () => void;
  onReadBook: (book: Book, chapterIndex?: number) => void;
  onRemoveBookmark: (bookId: string) => void;
}

export function ReadingShelfDrawer({
  open,
  books,
  bookmarkedIds,
  progressMap,
  onClose,
  onReadBook,
  onRemoveBookmark,
}: ReadingShelfDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const inProgressBooks = books
    .filter((b) => Boolean(progressMap[b.id]))
    .sort((a, b) => {
      const timeA = progressMap[a.id]?.lastReadAt ?? '';
      const timeB = progressMap[b.id]?.lastReadAt ?? '';
      return timeB.localeCompare(timeA);
    });

  const savedBooks = books.filter((b) => bookmarkedIds.includes(b.id));

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1F2421]/40 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Rak Baca Saya"
      onClick={onClose}
    >
      <aside
        className="w-full max-w-md h-full bg-[#FAF9F6] border-l border-[#E5E1D8] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-[#E5E1D8] flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#1F2421]">
              Rak Baca Saya
            </h2>
            <p className="text-xs text-[#5E6862] mt-0.5 tabular-nums">
              {savedBooks.length} tersimpan · {inProgressBooks.length} sedang dibaca
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup rak baca"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#4A524D] hover:text-[#1F2421] hover:bg-[#EFECE6] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* In Progress Section */}
          <div>
            <h3 className="text-xs font-medium tracking-wider uppercase text-[#5E6862] mb-3">
              Sedang Dibaca
            </h3>

            {inProgressBooks.length === 0 ? (
              <p className="text-sm text-[#646D67] py-4 border-y border-[#EAE6DD]">
                Belum ada riwayat bacaan aktif. Pilih buku apa saja untuk mulai membaca daring.
              </p>
            ) : (
              <div className="space-y-3">
                {inProgressBooks.map((book) => {
                  const prog = progressMap[book.id];
                  const pct = Math.round(
                    ((prog?.completedChapters.length ?? 0) /
                      book.chapters.length) *
                      100
                  );
                  return (
                    <div
                      key={book.id}
                      className="flex items-center gap-4 p-3 rounded-lg bg-[#F1EFE9] border border-[#E5E1D8]"
                    >
                      <div className="w-14 shrink-0">
                        <BookCover book={book} size="sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-base font-semibold text-[#1F2421] truncate">
                          {book.title}
                        </p>
                        <p className="text-xs text-[#5E6862] truncate">
                          {book.chapters[prog.chapterIndex]?.number} · {pct}% selesai
                        </p>
                        <button
                          type="button"
                          onClick={() => onReadBook(book, prog.chapterIndex)}
                          className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#3D5A4F] hover:underline cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Lanjutkan Membaca</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Saved Bookmarks Section */}
          <div>
            <h3 className="text-xs font-medium tracking-wider uppercase text-[#5E6862] mb-3">
              Daftar Simpan ({savedBooks.length})
            </h3>

            {savedBooks.length === 0 ? (
              <p className="text-sm text-[#646D67] py-4 border-y border-[#EAE6DD]">
                Rak simpan masih kosong. Ketuk ikon pembatas buku pada katalog untuk menyimpan bacaan.
              </p>
            ) : (
              <div className="divide-y divide-[#EAE6DD] border-y border-[#EAE6DD]">
                {savedBooks.map((book) => (
                  <div
                    key={book.id}
                    className="py-3.5 flex items-center justify-between gap-3"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        onReadBook(book, progressMap[book.id]?.chapterIndex ?? 0)
                      }
                      className="text-left min-w-0 flex-1 cursor-pointer group"
                    >
                      <p className="font-serif text-lg font-medium text-[#1F2421] group-hover:text-[#3D5A4F] truncate transition-colors">
                        {book.title}
                      </p>
                      <p className="text-xs text-[#5E6862] truncate">
                        {book.author} · {book.category}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemoveBookmark(book.id)}
                      aria-label={`Hapus ${book.title} dari rak`}
                      className="p-2 text-[#646D67] hover:text-[#1F2421] hover:bg-[#EFECE6] rounded-lg cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
