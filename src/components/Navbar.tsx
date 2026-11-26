import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenPrimaryReader: () => void;
  onOpenShelf: () => void;
  hasActiveProgress: boolean;
}

export function Navbar({
  onOpenPrimaryReader,
  onOpenShelf,
  hasActiveProgress,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#F8F7F4]/95 backdrop-blur-sm border-b border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#beranda"
          className="font-serif text-2xl font-semibold tracking-tight text-[#1F2421] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D5A4F] rounded-sm"
        >
          Pustaka Nirmala
        </a>

        {/* Zone 2: 4 Concise Single-Line Nav Links */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A524D]"
        >
          <a
            href="#koleksi"
            className="hover:text-[#1F2421] hover:underline underline-offset-4 decoration-[#3D5A4F]/50 transition-colors whitespace-nowrap shrink-0 py-2"
          >
            Koleksi
          </a>
          <a
            href="#kurasi"
            className="hover:text-[#1F2421] hover:underline underline-offset-4 decoration-[#3D5A4F]/50 transition-colors whitespace-nowrap shrink-0 py-2"
          >
            Kurasi
          </a>
          <button
            type="button"
            onClick={onOpenShelf}
            className="hover:text-[#1F2421] hover:underline underline-offset-4 decoration-[#3D5A4F]/50 transition-colors whitespace-nowrap shrink-0 py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D5A4F] rounded-sm"
          >
            Rak Saya
          </button>
          <a
            href="#tentang"
            className="hover:text-[#1F2421] hover:underline underline-offset-4 decoration-[#3D5A4F]/50 transition-colors whitespace-nowrap shrink-0 py-2"
          >
            Tentang
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenPrimaryReader}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-[#FAF9F6] bg-[#3D5A4F] hover:bg-[#2F473E] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D5A4F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F7F4]"
          >
            {hasActiveProgress ? 'Lanjutkan Baca' : 'Mulai Membaca'}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#1F2421] hover:bg-[#EFECE6] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5E1D8] bg-[#F8F7F4] px-4 py-4 space-y-2">
          <button
            type="button"
            onClick={() => handleNavClick('koleksi')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-[#1F2421] hover:bg-[#EFECE6] rounded-lg"
          >
            Koleksi
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('kurasi')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-[#1F2421] hover:bg-[#EFECE6] rounded-lg"
          >
            Kurasi
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenShelf();
            }}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-[#1F2421] hover:bg-[#EFECE6] rounded-lg"
          >
            Rak Saya
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('tentang')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-[#1F2421] hover:bg-[#EFECE6] rounded-lg"
          >
            Tentang
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPrimaryReader();
            }}
            className="w-full mt-2 px-4 py-2.5 text-sm font-medium text-[#FAF9F6] bg-[#3D5A4F] hover:bg-[#2F473E] rounded-lg"
          >
            {hasActiveProgress ? 'Lanjutkan Baca' : 'Mulai Membaca'}
          </button>
        </div>
      )}
    </header>
  );
}
