import { Bookmark, BookOpen } from 'lucide-react';
import { Book } from '../types/library';
import { BookCover } from './BookCover';

interface FeaturedSpotlightProps {
  book: Book;
  isBookmarked: boolean;
  onToggleBookmark: (bookId: string) => void;
  onReadBook: (book: Book) => void;
  onSelectDetail: (book: Book) => void;
}

export function FeaturedSpotlight({
  book,
  isBookmarked,
  onToggleBookmark,
  onReadBook,
  onSelectDetail,
}: FeaturedSpotlightProps) {
  return (
    <section id="kurasi" className="border-b border-[#E5E1D8] bg-[#F1EFE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-[#5E6862] mb-2">
              Pilihan Kurator Bulan Ini
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F2421] editorial-balance">
              Bacaan Utama di Ruang Sunyi
            </h2>
          </div>
          <p className="font-mono text-xs text-[#5E6862] tabular-nums">
            NO. KATALOG {book.catalogNumber}
          </p>
        </div>

        <div className="bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="md:col-span-4 lg:col-span-3 max-w-[260px] mx-auto md:mx-0 w-full">
              <button
                type="button"
                onClick={() => onSelectDetail(book)}
                className="group block w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D5A4F] rounded-lg"
              >
                <BookCover book={book} size="lg" />
              </button>
            </div>

            <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-between">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#5E6862] mb-3">
                <span>{book.category}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{book.year}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{book.pages} halaman</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{book.readingMinutes} menit baca</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F2421] leading-tight editorial-balance">
                {book.title}
              </h3>
              <p className="text-sm sm:text-base text-[#4A524D] mt-1.5">
                Oleh <span className="font-medium text-[#1F2421]">{book.author}</span> — {book.subtitle}
              </p>

              {/* Editorial Pull Quote with top/bottom hairline rules */}
              <blockquote className="my-6 py-5 border-y border-[#E5E1D8] font-serif italic text-xl sm:text-2xl text-[#2C332F] leading-relaxed">
                “{book.featuredQuote}”
              </blockquote>

              <p className="text-sm sm:text-base text-[#4A524D] leading-relaxed max-w-2xl mb-7">
                {book.synopsis}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onReadBook(book)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#FAF9F6] bg-[#3D5A4F] hover:bg-[#2F473E] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D5A4F]"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Baca Daring</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleBookmark(book.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D5A4F] ${
                    isBookmarked
                      ? 'bg-[#EAE5DC] border-[#D5CEC2] text-[#1F2421]'
                      : 'bg-transparent border-[#DCD7CC] text-[#4A524D] hover:bg-[#F1EFE9] hover:text-[#1F2421]'
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isBookmarked ? 'fill-[#3D5A4F] text-[#3D5A4F]' : ''}`}
                  />
                  <span>{isBookmarked ? 'Tersimpan di Rak' : 'Simpan ke Rak'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectDetail(book)}
                  className="px-4 py-2.5 text-sm font-medium text-[#4A524D] hover:text-[#1F2421] hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Lihat Daftar Bab
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
