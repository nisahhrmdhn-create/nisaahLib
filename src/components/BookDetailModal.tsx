import { useEffect } from 'react';
import { Bookmark, BookMarked, BookOpen, X } from 'lucide-react';
import { Book, ReadingProgress } from '../types/library';
import { BookCover } from './BookCover';

interface BookDetailModalProps {
  book: Book | null;
  isBookmarked: boolean;
  isBorrowedByUser: boolean;
  progress?: ReadingProgress;
  onClose: () => void;
  onToggleBookmark: (bookId: string) => void;
  onBorrowBook: (book: Book) => void;
  onReadChapter: (book: Book, chapterIndex: number) => void;
}

export function BookDetailModal({
  book,
  isBookmarked,
  isBorrowedByUser,
  progress,
  onClose,
  onToggleBookmark,
  onBorrowBook,
  onReadChapter,
}: BookDetailModalProps) {
  useEffect(() => {
    if (!book) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, onClose]);

  if (!book) return null;

  const activeChapterIdx = progress?.chapterIndex ?? 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2D2226]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-book-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FFFFFF]/95 backdrop-blur-xs border-b border-[#EEDCE2]">
          <p className="font-mono text-xs text-[#6E5A62] tabular-nums">
            KATALOG {book.catalogNumber} · {book.category.toUpperCase()}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup rincian buku"
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#6E5A62] hover:text-[#2D2226] hover:bg-[#FAF2F4] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Cover & Primary Actions */}
            <div className="md:col-span-4 max-w-[240px] mx-auto md:mx-0 w-full">
              <BookCover book={book} size="lg" />

              <div className="mt-5 space-y-2.5">
                <button
                  type="button"
                  onClick={() => onReadChapter(book, activeChapterIdx)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-xl transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {progress
                      ? `Lanjutkan (${book.chapters[activeChapterIdx]?.number})`
                      : 'Baca Daring'}
                  </span>
                </button>

                <button
                  type="button"
                  disabled={book.availableStock <= 0 || isBorrowedByUser}
                  onClick={() => {
                    onClose();
                    onBorrowBook(book);
                  }}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-colors ${
                    isBorrowedByUser
                      ? 'bg-[#E6F4EC] border-[#C5E4D2] text-[#1E6B45] cursor-default'
                      : book.availableStock <= 0
                        ? 'bg-[#FAF2F4] border-[#EEDCE2] text-[#8C767F] cursor-not-allowed'
                        : 'bg-[#FAF2F4] border-[#E5C9D3] text-[#783447] hover:bg-[#F4E1E7] cursor-pointer'
                  }`}
                >
                  <BookMarked className="w-4 h-4" />
                  <span>
                    {isBorrowedByUser
                      ? 'Sedang Anda Pinjam'
                      : book.availableStock <= 0
                        ? 'Stok Eksemplar Habis'
                        : `Pinjam Buku (${book.availableStock}/${book.stock})`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleBookmark(book.id)}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-colors cursor-pointer ${
                    isBookmarked
                      ? 'bg-[#F9E4EB] border-[#E5C2CE] text-[#6E2C40]'
                      : 'bg-transparent border-[#EEDCE2] text-[#6E5A62] hover:bg-[#FAF2F4]'
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isBookmarked ? 'fill-[#B5536E] text-[#B5536E]' : ''}`}
                  />
                  <span>{isBookmarked ? 'Tersimpan di Rak' : 'Simpan ke Rak'}</span>
                </button>
              </div>
            </div>

            {/* Right Metadata & Chapter List */}
            <div className="md:col-span-8">
              <h2
                id="detail-book-title"
                className="font-serif text-3xl sm:text-4xl font-semibold text-[#2D2226] leading-tight editorial-balance"
              >
                {book.title}
              </h2>
              <p className="text-base text-[#6E5A62] mt-1.5 mb-5">
                {book.subtitle}
              </p>

              <p className="text-sm sm:text-base text-[#46373D] leading-relaxed mb-6">
                {book.synopsis}
              </p>

              {/* Archival Accession Metadata Grid */}
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 py-5 border-y border-[#EEDCE2] text-sm mb-7">
                <div>
                  <dt className="text-xs text-[#8C767F] mb-0.5">Penulis</dt>
                  <dd className="font-medium text-[#2D2226]">{book.author}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#8C767F] mb-0.5">Penerbit</dt>
                  <dd className="font-medium text-[#2D2226]">{book.publisher}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#8C767F] mb-0.5">Tahun Terbit</dt>
                  <dd className="font-medium text-[#2D2226] tabular-nums">{book.year}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#8C767F] mb-0.5">Ketersediaan</dt>
                  <dd className="font-medium text-[#2D2226] tabular-nums">
                    {book.availableStock} dari {book.stock} eksemplar
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#8C767F] mb-0.5">Tebal Naskah</dt>
                  <dd className="font-medium text-[#2D2226] tabular-nums">
                    {book.pages} halaman
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#8C767F] mb-0.5">ISBN</dt>
                  <dd className="font-mono text-xs text-[#2D2226] tabular-nums pt-0.5">
                    {book.isbn}
                  </dd>
                </div>
              </dl>

              {/* Author Bio */}
              <div className="mb-7">
                <h3 className="text-xs font-medium tracking-wider uppercase text-[#8C767F] mb-1.5">
                  Tentang Penulis
                </h3>
                <p className="text-sm text-[#6E5A62] leading-relaxed">
                  {book.authorBio}
                </p>
              </div>

              {/* Clickable Chapter Index */}
              <div>
                <h3 className="text-xs font-medium tracking-wider uppercase text-[#8C767F] mb-3">
                  Daftar Bab ({book.chapters.length} Bagian)
                </h3>
                <div className="divide-y divide-[#F2E3E8] border border-[#EEDCE2] rounded-xl bg-[#FDF9FA]">
                  {book.chapters.map((chapter, index) => {
                    const isCompleted =
                      progress?.completedChapters.includes(chapter.id) ?? false;
                    return (
                      <button
                        key={chapter.id}
                        type="button"
                        onClick={() => onReadChapter(book, index)}
                        className="w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left hover:bg-[#F9ECEF] transition-colors cursor-pointer first:rounded-t-xl last:rounded-b-xl"
                      >
                        <div className="min-w-0">
                          <span className="font-mono text-xs text-[#8C767F] mr-3 tabular-nums">
                            {chapter.number}
                          </span>
                          <span className="text-sm font-medium text-[#2D2226]">
                            {chapter.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 text-xs text-[#8C767F] tabular-nums">
                          {isCompleted && (
                            <span className="text-[#1E6B45] font-medium">
                              Selesai
                            </span>
                          )}
                          <span>{chapter.readingTimeMinutes} mnt</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
