import { Bookmark, BookOpen, Search, X } from 'lucide-react';
import { BOOK_CATEGORIES } from '../data/books';
import { Book, BookCategory, ReadingProgress, SortOption } from '../types/library';
import { BookCover } from './BookCover';

interface CatalogSectionProps {
  books: Book[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: BookCategory;
  onCategoryChange: (category: BookCategory) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onlyBookmarked: boolean;
  onToggleOnlyBookmarked: () => void;
  bookmarkedIds: string[];
  progressMap: Record<string, ReadingProgress>;
  onToggleBookmark: (bookId: string) => void;
  onSelectBook: (book: Book) => void;
  onReadBook: (book: Book) => void;
}

export function CatalogSection({
  books,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onlyBookmarked,
  onToggleOnlyBookmarked,
  bookmarkedIds,
  progressMap,
  onToggleBookmark,
  onSelectBook,
  onReadBook,
}: CatalogSectionProps) {
  const handleResetFilters = () => {
    onSearchChange('');
    onCategoryChange('Semua');
    if (onlyBookmarked) {
      onToggleOnlyBookmarked();
    }
  };

  return (
    <section id="koleksi" className="bg-[#F8F7F4] py-14 lg:py-20 border-b border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-[#5E6862] mb-2">
              Katalog Perpustakaan Daring
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F2421] editorial-balance">
              Jelajahi Koleksi Buku
            </h2>
          </div>

          <p className="text-sm text-[#5E6862] tabular-nums">
            Menampilkan <strong className="font-medium text-[#1F2421]">{books.length}</strong> judul tersedia
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="space-y-4 mb-10 pb-8 border-b border-[#E5E1D8]">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search
                aria-hidden="true"
                className="w-4 h-4 text-[#737A75] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari judul buku, nama penulis, atau topik..."
                aria-label="Cari koleksi buku"
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#FAF9F6] text-[#1F2421] placeholder:text-[#737A75] border border-[#DCD7CC] rounded-lg focus:outline-none focus:border-[#3D5A4F] focus:ring-1 focus:ring-[#3D5A4F] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Hapus pencarian"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-[#737A75] hover:text-[#1F2421] rounded-md cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort & Saved Filter */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onToggleOnlyBookmarked}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  onlyBookmarked
                    ? 'bg-[#3D5A4F] border-[#3D5A4F] text-[#FAF9F6]'
                    : 'bg-[#FAF9F6] border-[#DCD7CC] text-[#4A524D] hover:text-[#1F2421] hover:bg-[#F1EFE9]'
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${onlyBookmarked ? 'fill-current' : ''}`}
                />
                <span className="tabular-nums">
                  Rak Tersimpan ({bookmarkedIds.length})
                </span>
              </button>

              <div className="flex items-center gap-2">
                <label
                  htmlFor="sort-books"
                  className="text-xs font-medium text-[#5E6862] whitespace-nowrap"
                >
                  Urutkan:
                </label>
                <select
                  id="sort-books"
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value as SortOption)}
                  className="px-3.5 py-2.5 text-sm bg-[#FAF9F6] text-[#1F2421] border border-[#DCD7CC] rounded-lg focus:outline-none focus:border-[#3D5A4F] cursor-pointer"
                >
                  <option value="terbaru">Terbitan Terbaru</option>
                  <option value="judul">Judul A–Z</option>
                  <option value="populer">Paling Sering Dibaca</option>
                </select>
              </div>
            </div>
          </div>

          {/* Segmented Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter kategori buku"
            className="flex items-center gap-1.5 overflow-x-auto pb-1"
          >
            <div className="inline-flex items-center gap-1 p-1 bg-[#EFECE6] rounded-lg">
              {BOOK_CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => onCategoryChange(category)}
                    className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D5A4F] ${
                      active
                        ? 'bg-[#FAF9F6] text-[#1F2421] shadow-xs'
                        : 'text-[#5E6862] hover:text-[#1F2421]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Book Grid or Empty State */}
        {books.length === 0 ? (
          <div className="py-16 px-6 text-center bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl">
            <p className="font-serif text-2xl font-medium text-[#1F2421] mb-2">
              Tidak ada buku yang sesuai pencarian
            </p>
            <p className="text-sm text-[#5E6862] max-w-md mx-auto mb-6">
              Coba ubah kata kunci pencarian, pilih kategori lain, atau tampilkan seluruh koleksi perpustakaan.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 text-sm font-medium text-[#FAF9F6] bg-[#3D5A4F] hover:bg-[#2F473E] rounded-lg transition-colors cursor-pointer"
            >
              Tampilkan Semua Koleksi
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-11">
            {books.map((book) => {
              const isBookmarked = bookmarkedIds.includes(book.id);
              const progress = progressMap[book.id];
              const completedCount = progress?.completedChapters.length ?? 0;
              const progressPercent = Math.round(
                (completedCount / book.chapters.length) * 100
              );

              return (
                <article
                  key={book.id}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative mb-4">
                      <button
                        type="button"
                        onClick={() => onSelectBook(book)}
                        className="block w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D5A4F] rounded-lg"
                      >
                        <BookCover book={book} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onToggleBookmark(book.id)}
                        aria-label={
                          isBookmarked
                            ? `Hapus ${book.title} dari rak tersimpan`
                            : `Simpan ${book.title} ke rak`
                        }
                        className="absolute top-3 right-3 z-20 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#FAF9F6]/90 backdrop-blur-xs border border-[#E5E1D8] text-[#4A524D] hover:text-[#1F2421] hover:bg-[#FFFFFF] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D5A4F]"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            isBookmarked ? 'fill-[#3D5A4F] text-[#3D5A4F]' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Clean Unboxed Metadata */}
                    <div className="flex items-center gap-1.5 text-xs text-[#646D67] mb-1.5">
                      <span>{book.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{book.year}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{book.pages} hlm</span>
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-[#1F2421] leading-snug mb-1">
                      <button
                        type="button"
                        onClick={() => onSelectBook(book)}
                        className="text-left hover:text-[#3D5A4F] transition-colors cursor-pointer"
                      >
                        {book.title}
                      </button>
                    </h3>

                    <p className="text-sm text-[#4A524D] mb-3">{book.author}</p>
                  </div>

                  <div className="pt-3 border-t border-[#EAE6DD]">
                    {progress && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-[11px] text-[#5E6862] mb-1 tabular-nums">
                          <span>
                            {book.chapters[progress.chapterIndex]?.number ?? 'Bab 01'}
                          </span>
                          <span>{progressPercent}% selesai</span>
                        </div>
                        <div className="h-1 w-full bg-[#E5E1D8] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#3D5A4F] transition-all duration-300"
                            style={{ width: `${Math.max(progressPercent, 12)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onReadBook(book)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3D5A4F] hover:text-[#273B33] py-1.5 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{progress ? 'Lanjutkan Baca' : 'Baca Daring'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectBook(book)}
                        className="text-xs font-medium text-[#5E6862] hover:text-[#1F2421] py-1.5 cursor-pointer"
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
