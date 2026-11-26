import { ArrowRight, BookOpen } from 'lucide-react';
import { HERO_LIBRARY_IMAGE } from '../data/books';
import { Book } from '../types/library';

interface HeroSectionProps {
  totalBooks: number;
  activeBook?: Book;
  activeChapterNumber?: string;
  onContinueReading: () => void;
}

export function HeroSection({
  totalBooks,
  activeBook,
  activeChapterNumber,
  onContinueReading,
}: HeroSectionProps) {
  const scrollToCatalog = () => {
    const el = document.getElementById('koleksi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="beranda" className="border-b border-[#E5E1D8] bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Introduction */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-[#5E6862] mb-4">
                Koleksi Terbuka · Akses Daring 24 Jam
              </p>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-medium text-[#1F2421] leading-[1.08] tracking-tight editorial-balance mb-6">
                Ruang Baca Digital untuk Pikiran yang Tenang
              </h1>

              <p className="text-base sm:text-[17px] text-[#4A524D] leading-relaxed max-w-xl mb-8">
                Jelajahi pilihan buku sastra, filsafat, arsitektur, sejarah, dan esai budaya dalam antarmuka membaca yang lembut di mata. Seluruh koleksi dapat dibaca utuh secara daring, kapan saja tanpa batas antrean.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={scrollToCatalog}
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium text-[#FAF9F6] bg-[#3D5A4F] hover:bg-[#2F473E] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D5A4F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F7F4]"
                >
                  <span>Jelajahi Koleksi</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onContinueReading}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#1F2421] bg-[#EFECE6] hover:bg-[#E5E1D8] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D5A4F]"
                >
                  <BookOpen className="w-4 h-4 text-[#3D5A4F]" />
                  <span>
                    {activeBook
                      ? `Lanjutkan: ${activeBook.title}`
                      : 'Buka Ruang Baca'}
                  </span>
                </button>
              </div>
            </div>

            {activeBook && activeChapterNumber && (
              <div className="mt-8 pt-6 border-t border-[#E5E1D8] flex items-center justify-between gap-4 text-xs text-[#5E6862]">
                <span>
                  Terakhir dibaca · <strong className="font-medium text-[#1F2421]">{activeBook.title}</strong> ({activeChapterNumber})
                </span>
                <button
                  type="button"
                  onClick={onContinueReading}
                  className="font-medium text-[#3D5A4F] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Buka kembali
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Serene Architectural Sanctuary Image */}
          <div className="lg:col-span-6">
            <div className="relative h-72 sm:h-96 lg:h-full min-h-[340px] w-full overflow-hidden rounded-xl border border-[#E5E1D8] bg-[#EFECE6]">
              <img
                src={HERO_LIBRARY_IMAGE}
                alt="Ruang baca perpustakaan yang tenang dengan rak kayu oak dan cahaya pagi alami"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Institutional Strip */}
        <div className="mt-10 pt-8 border-t border-[#E5E1D8] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F2421] tabular-nums">
              {totalBooks} Judul
            </p>
            <p className="text-xs text-[#5E6862] mt-1">
              Naskah terkurasi siap baca penuh
            </p>
          </div>
          <div>
            <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F2421] tabular-nums">
              5 Bidang
            </p>
            <p className="text-xs text-[#5E6862] mt-1">
              Sastra, filsafat, arsitektur, sejarah, esai
            </p>
          </div>
          <div>
            <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F2421] tabular-nums">
              3 Tema Kertas
            </p>
            <p className="text-xs text-[#5E6862] mt-1">
              Hangat, putih tenang, dan malam teduh
            </p>
          </div>
          <div>
            <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F2421]">
              Akses Bebas
            </p>
            <p className="text-xs text-[#5E6862] mt-1">
              Tanpa registrasi atau batas waktu pinjam
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
