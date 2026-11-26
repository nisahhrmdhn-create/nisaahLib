import { useEffect } from 'react';
import { Bookmark, BookOpen, X } from 'lucide-react';
import { Book, ReadingProgress } from '../types/library';
import { BookCover } from './BookCover';

interface BookDetailModalProps {
  book: Book | null;
  isBookmarked: boolean;
  progress?: ReadingProgress;
  onClose: () => void;
  onToggleBookmark: (bookId: string) => void;
  onReadChapter: (book: Book, chapterIndex: number) => void;
}

export function BookDetailModal({
  book,
  isBookmarked,
  progress,
  onClose,
  onToggleBookmark,
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1F2421]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-book-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FAF9F6]/95 backdrop-blur-xs border-b border-[#E5E1D8]">
          <p className="font-mono text-xs text-[#5E6862] tabular-nums">
            KATALOG {book.catalogNumber} · {book.category.toUpperCase()}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup rincian buku"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#4A524D] hover:text-[#1F2421] hover:bg-[#EFECE6] transition-colors cursor-pointer"
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
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-[#FAF9F6] bg-[#3D5A4F] hover:bg-[#2F473E] rounded-lg transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {progress
                      ? `Lanjutkan (${book.chapters[activeChapterIdx]?.number})`
                      : 'Baca Sekarang'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleBookmark(book.id)}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
                    isBookmarked
                      ? 'bg-[#EAE5DC] border-[#D5CEC2] text-[#1F2421]'
                      : 'bg-transparent border-[#DCD7CC] text-[#4A524D] hover:bg-[#F1EFE9]'
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isBookmarked ? 'fill-[#3D5A4F] text-[#3D5A4F]' : ''}`}
                  />
                  <span>{isBookmarked ? 'Tersimpan di Rak' : 'Simpan ke Rak'}</span>
                </button>
              </div>
            </div>

            {/* Right Metadata & Chapter List */}
            <div className="md:col-span-8">
              <h2
                id="detail-book-title"
                className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F2421] leading-tight editorial-balance"
              >
                {book.title}
              </h2>
              <p className="text-base text-[#4A524D] mt-1.5 mb-5">
                {book.subtitle}
              </p>

              <p className="text-sm sm:text-base text-[#343B37] leading-relaxed mb-6">
                {book.synopsis}
              </p>

              {/* Archival Accession Metadata Grid */}
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 py-5 border-y border-[#E5E1D8] text-sm mb-7">
                <div>
                  <dt className="text-xs text-[#646D67] mb-0.5">Penulis</dt>
                  <dd className="font-medium text-[#1F2421]">{book.author}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#646D67] mb-0.5">Penerbit</dt>
                  <dd className="font-medium text-[#1F2421]">{book.publisher}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#646D67] mb-0.5">Tahun Terbit</dt>
                  <dd className="font-medium text-[#1F2421] tabular-nums">{book.year}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#646D67] mb-0.5">Tebal Naskah</dt>
                  <dd className="font-medium text-[#1F2421] tabular-nums">
                    {book.pages} halaman
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#646D67] mb-0.5">Bahasa</dt>
                  <dd className="font-medium text-[#1F2421]">{book.language}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#646D67] mb-0.5">ISBN</dt>
                  <dd className="font-mono text-xs text-[#1F2421] tabular-nums pt-0.5">
                    {book.isbn}
                  </dd>
                </div>
              </dl>

              {/* Author Bio */}
              <div className="mb-7">
                <h3 className="text-xs font-medium tracking-wider uppercase text-[#646D67] mb-1.5">
                  Tentang Penulis
                </h3>
                <p className="text-sm text-[#4A524D] leading-relaxed">
                  {book.authorBio}
                </p>
              </div>

              {/* Clickable Chapter Index */}
              <div>
                <h3 className="text-xs font-medium tracking-wider uppercase text-[#646D67] mb-3">
                  Daftar Bab ({book.chapters.length} Bagian)
                </h3>
                <div className="divide-y divide-[#EAE6DD] border border-[#E5E1D8] rounded-lg bg-[#F8F7F4]">
                  {book.chapters.map((chapter, index) => {
                    const isCompleted =
                      progress?.completedChapters.includes(chapter.id) ?? false;
                    return (
                      <button
                        key={chapter.id}
                        type="button"
                        onClick={() => onReadChapter(book, index)}
                        className="w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left hover:bg-[#EFECE6] transition-colors cursor-pointer first:rounded-t-lg last:rounded-b-lg"
                      >
                        <div className="min-w-0">
                          <span className="font-mono text-xs text-[#5E6862] mr-3 tabular-nums">
                            {chapter.number}
                          </span>
                          <span className="text-sm font-medium text-[#1F2421]">
                            {chapter.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 text-xs text-[#5E6862] tabular-nums">
                          {isCompleted && (
                            <span className="text-[#3D5A4F] font-medium">
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
