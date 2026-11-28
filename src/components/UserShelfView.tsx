import { BookOpen, Trash2 } from 'lucide-react';
import { Book, ReadingProgress } from '../types/library';
import { BookCover } from './BookCover';

interface UserShelfViewProps {
  books: Book[];
  bookmarkedIds: string[];
  progressMap: Record<string, ReadingProgress>;
  onReadBook: (book: Book, chapterIndex?: number) => void;
  onRemoveBookmark: (bookId: string) => void;
  onBrowseCatalog: () => void;
}

export function UserShelfView({
  books,
  bookmarkedIds,
  progressMap,
  onReadBook,
  onRemoveBookmark,
  onBrowseCatalog,
}: UserShelfViewProps) {
  const savedBooks = books.filter((b) => bookmarkedIds.includes(b.id));
  const inProgressBooks = books
    .filter((b) => Boolean(progressMap[b.id]))
    .sort((a, b) =>
      (progressMap[b.id]?.lastReadAt ?? '').localeCompare(
        progressMap[a.id]?.lastReadAt ?? ''
      )
    );

  return (
    <div className="space-y-8">
      {/* Sedang Dibaca */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-semibold text-[#2D2226]">
          Sedang Dibaca
        </h2>

        {inProgressBooks.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-8 text-center">
            <p className="text-sm text-[#6E5A62] mb-4">
              Anda belum membuka buku apa pun di ruang baca daring.
            </p>
            <button
              type="button"
              onClick={onBrowseCatalog}
              className="px-4 py-2 text-sm font-medium text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-xl cursor-pointer"
            >
              Jelajahi Koleksi
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inProgressBooks.map((book) => {
              const prog = progressMap[book.id];
              const pct = Math.round(
                ((prog?.completedChapters.length ?? 0) / book.chapters.length) *
                  100
              );
              return (
                <div
                  key={book.id}
                  className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-4 flex items-center gap-4"
                >
                  <div className="w-16 shrink-0">
                    <BookCover book={book} size="sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-lg font-semibold text-[#2D2226] truncate">
                      {book.title}
                    </p>
                    <p className="text-xs text-[#6E5A62] mb-2 tabular-nums">
                      {book.chapters[prog.chapterIndex]?.number ?? 'Bab 01'} · {pct}% selesai
                    </p>
                    <div className="h-1.5 w-full bg-[#F4E4E9] rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-[#B5536E]"
                        style={{ width: `${Math.max(pct, 12)}%` }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => onReadBook(book, prog.chapterIndex)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B5536E] hover:underline cursor-pointer"
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
      </section>

      {/* Rak Simpan */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-semibold text-[#2D2226]">
          Daftar Buku Tersimpan ({savedBooks.length})
        </h2>

        {savedBooks.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-8 text-sm text-[#6E5A62]">
            Belum ada buku di daftar simpan. Klik ikon pembatas buku pada katalog untuk menyimpannya di sini.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedBooks.map((book) => (
              <div
                key={book.id}
                className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-4 flex items-start gap-4"
              >
                <div className="w-16 shrink-0">
                  <BookCover book={book} size="sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#8C767F] mb-0.5">{book.category}</p>
                  <h3 className="font-serif text-lg font-semibold text-[#2D2226] leading-snug mb-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-[#6E5A62] mb-3">{book.author}</p>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onReadBook(book, progressMap[book.id]?.chapterIndex ?? 0)
                      }
                      className="text-xs font-semibold text-[#B5536E] hover:underline cursor-pointer"
                    >
                      Baca Sekarang
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveBookmark(book.id)}
                      aria-label={`Hapus ${book.title} dari rak`}
                      className="p-1.5 text-[#8C767F] hover:text-[#A62639] rounded-lg hover:bg-[#FAF2F4] cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
