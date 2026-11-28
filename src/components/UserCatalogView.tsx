import { Bookmark, BookMarked, BookOpen, Search, X } from 'lucide-react';
import { BOOK_CATEGORIES, HERO_LIBRARY_IMAGE } from '../data/books';
import {
  Book,
  BookCategory,
  LoanRecord,
  ReadingProgress,
  SortOption,
  UserProfile,
} from '../types/library';
import { formatRupiah } from '../utils/formatters';
import { BookCover } from './BookCover';

interface UserCatalogViewProps {
  books: Book[];
  allBooksCount: number;
  userProfile: UserProfile;
  activeLoans: LoanRecord[];
  unpaidFineTotal: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: BookCategory;
  onCategoryChange: (cat: BookCategory) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  bookmarkedIds: string[];
  progressMap: Record<string, ReadingProgress>;
  onToggleBookmark: (bookId: string) => void;
  onSelectDetail: (book: Book) => void;
  onReadBook: (book: Book) => void;
  onBorrowBook: (book: Book) => void;
  onNavigateLoans: () => void;
  onNavigateFines: () => void;
}

export function UserCatalogView({
  books,
  allBooksCount,
  userProfile,
  activeLoans,
  unpaidFineTotal,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  bookmarkedIds,
  progressMap,
  onToggleBookmark,
  onSelectDetail,
  onReadBook,
  onBorrowBook,
  onNavigateLoans,
  onNavigateFines,
}: UserCatalogViewProps) {
  const activeBookIds = new Set(
    activeLoans
      .filter((l) => l.status !== 'dikembalikan')
      .map((l) => l.bookId)
  );

  return (
    <div className="space-y-8">
      {/* Modern Pastel Pink Editorial Hero Banner */}
      <section className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-[#9A5268] mb-3">
                Selamat Datang, {userProfile.name}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#2D2226] leading-[1.12] editorial-balance mb-4">
                Ruang Baca & Peminjaman Buku Daring
              </h2>
              <p className="text-sm sm:text-base text-[#6E5A62] leading-relaxed max-w-xl mb-6">
                Nikmati koleksi buku pilihan dalam suasana pastel yang lembut dan nyaman. Anda dapat membaca langsung secara daring atau meminjam eksemplar digital ke daftar pinjaman Anda.
              </p>
            </div>

            {/* Quick Personal Status Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-[#F2E3E8]">
              <div>
                <p className="text-xs text-[#8C767F]">Koleksi Tersedia</p>
                <p className="font-serif text-2xl font-semibold text-[#2D2226] tabular-nums mt-0.5">
                  {allBooksCount} Judul
                </p>
              </div>
              <button
                type="button"
                onClick={onNavigateLoans}
                className="text-left group cursor-pointer"
              >
                <p className="text-xs text-[#8C767F] group-hover:text-[#B5536E] transition-colors">
                  Pinjaman Aktif
                </p>
                <p className="font-serif text-2xl font-semibold text-[#2D2226] tabular-nums mt-0.5">
                  {activeLoans.filter((l) => l.status !== 'dikembalikan').length} Buku
                </p>
              </button>
              <button
                type="button"
                onClick={onNavigateFines}
                className="text-left group cursor-pointer"
              >
                <p className="text-xs text-[#8C767F] group-hover:text-[#B5536E] transition-colors">
                  Tagihan Denda
                </p>
                <p
                  className={`font-serif text-2xl font-semibold tabular-nums mt-0.5 ${
                    unpaidFineTotal > 0 ? 'text-[#A62639]' : 'text-[#1E6B45]'
                  }`}
                >
                  {unpaidFineTotal > 0 ? formatRupiah(unpaidFineTotal) : 'Lunas'}
                </p>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 min-h-[240px] lg:min-h-[320px] bg-[#F6E9ED] relative overflow-hidden">
            <img
              src={HERO_LIBRARY_IMAGE}
              alt="Sudut baca perpustakaan yang tenang dan bercahaya lembut"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-[#B5536E]/15 via-transparent to-transparent pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* Search & Category Filter Bar */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-xl">
            <Search
              aria-hidden="true"
              className="w-4 h-4 text-[#8C767F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari judul buku, penulis, atau topik..."
              aria-label="Cari koleksi buku"
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#FFFFFF] text-[#2D2226] placeholder:text-[#9A848D] border border-[#EEDCE2] rounded-xl focus:outline-none focus:border-[#B5536E] focus:ring-1 focus:ring-[#B5536E] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Hapus pencarian"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-[#8C767F] hover:text-[#2D2226] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-xs text-[#6E5A62] tabular-nums">
              <strong className="text-[#2D2226]">{books.length}</strong> buku ditemukan
            </span>

            <select
              aria-label="Urutkan buku"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="px-3.5 py-2.5 text-sm bg-[#FFFFFF] text-[#2D2226] border border-[#EEDCE2] rounded-xl focus:outline-none focus:border-[#B5536E] cursor-pointer"
            >
              <option value="terbaru">Terbitan Terbaru</option>
              <option value="judul">Judul A–Z</option>
              <option value="populer">Paling Populer</option>
            </select>
          </div>
        </div>

        {/* Category Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <div className="inline-flex items-center gap-1 p-1 bg-[#F4E4E9] rounded-xl">
            {BOOK_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#FFFFFF] text-[#2D2226] shadow-xs'
                      : 'text-[#6E5A62] hover:text-[#2D2226]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      {books.length === 0 ? (
        <div className="py-16 px-6 text-center bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl">
          <p className="font-serif text-2xl font-medium text-[#2D2226] mb-2">
            Tidak ada buku yang sesuai
          </p>
          <p className="text-sm text-[#6E5A62] max-w-md mx-auto mb-6">
            Ubah kata kunci pencarian atau pilih kategori lain untuk melihat seluruh koleksi.
          </p>
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              onCategoryChange('Semua');
            }}
            className="px-5 py-2.5 text-sm font-medium text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-xl cursor-pointer"
          >
            Tampilkan Semua Buku
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {books.map((book) => {
            const isBookmarked = bookmarkedIds.includes(book.id);
            const isBorrowed = activeBookIds.has(book.id);
            const progress = progressMap[book.id];
            const pct = progress
              ? Math.round(
                  (progress.completedChapters.length / book.chapters.length) * 100
                )
              : 0;

            return (
              <article
                key={book.id}
                className="group bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-4 flex flex-col justify-between transition-shadow hover:shadow-[0_10px_28px_-10px_rgba(140,68,92,0.16)]"
              >
                <div>
                  <div className="relative mb-4">
                    <button
                      type="button"
                      onClick={() => onSelectDetail(book)}
                      className="block w-full text-left cursor-pointer rounded-xl"
                    >
                      <BookCover book={book} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleBookmark(book.id)}
                      aria-label={
                        isBookmarked
                          ? `Hapus ${book.title} dari rak`
                          : `Simpan ${book.title} ke rak`
                      }
                      className="absolute top-3 right-3 z-20 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#FFFFFF]/92 backdrop-blur-xs border border-[#EEDCE2] text-[#6E5A62] hover:text-[#B5536E] transition-colors cursor-pointer"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          isBookmarked ? 'fill-[#B5536E] text-[#B5536E]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Unboxed Metadata */}
                  <div className="flex items-center gap-1.5 text-xs text-[#8C767F] mb-1">
                    <span>{book.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{book.year}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      Stok {book.availableStock}/{book.stock}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-[#2D2226] leading-snug mb-1">
                    <button
                      type="button"
                      onClick={() => onSelectDetail(book)}
                      className="text-left hover:text-[#B5536E] transition-colors cursor-pointer"
                    >
                      {book.title}
                    </button>
                  </h3>
                  <p className="text-sm text-[#6E5A62] mb-3">{book.author}</p>
                </div>

                <div className="pt-3 border-t border-[#F4E6EB] space-y-2.5">
                  {progress && (
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#6E5A62] mb-1 tabular-nums">
                        <span>
                          {book.chapters[progress.chapterIndex]?.number ?? 'Bab 01'}
                        </span>
                        <span>{pct}% selesai</span>
                      </div>
                      <div className="h-1 w-full bg-[#F4E4E9] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#B5536E]"
                          style={{ width: `${Math.max(pct, 12)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onReadBook(book)}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Baca</span>
                    </button>

                    <button
                      type="button"
                      disabled={isBorrowed || book.availableStock <= 0}
                      onClick={() => onBorrowBook(book)}
                      className={`inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap ${
                        isBorrowed
                          ? 'bg-[#E6F4EC] border-[#C5E4D2] text-[#1E6B45] cursor-default'
                          : book.availableStock <= 0
                            ? 'bg-[#FAF2F4] border-[#EEDCE2] text-[#9A848D] cursor-not-allowed'
                            : 'bg-[#FAF2F4] border-[#E8CFD8] text-[#783447] hover:bg-[#F3DFE6] cursor-pointer'
                      }`}
                    >
                      <BookMarked className="w-3.5 h-3.5" />
                      <span>
                        {isBorrowed
                          ? 'Dipinjam'
                          : book.availableStock <= 0
                            ? 'Habis'
                            : 'Pinjam'}
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
