import { BOOK_CATEGORIES } from '../data/books';
import { BookCategory } from '../types/library';

interface FooterProps {
  onSelectCategory: (category: BookCategory) => void;
  onOpenShelf: () => void;
}

export function Footer({ onSelectCategory, onOpenShelf }: FooterProps) {
  const handleCategoryJump = (category: BookCategory) => {
    onSelectCategory(category);
    const el = document.getElementById('koleksi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="tentang" className="bg-[#F1EFE9] text-[#4A524D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#DFDAD0]">
          <div className="md:col-span-5">
            <p className="font-serif text-2xl font-semibold text-[#1F2421] mb-3">
              Pustaka Nirmala
            </p>
            <p className="text-sm leading-relaxed max-w-sm">
              Perpustakaan digital terbuka yang dirancang untuk menghadirkan pengalaman membaca buku secara daring dengan tipografi nyaman, warna tenang, dan akses tanpa hambatan.
            </p>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-[#1F2421] mb-3">
              Bidang Koleksi
            </h3>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
              {BOOK_CATEGORIES.filter((c) => c !== 'Semua').map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => handleCategoryJump(cat)}
                    className="hover:text-[#1F2421] hover:underline underline-offset-4 cursor-pointer text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-[#1F2421] mb-3">
              Ruang Pembaca
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryJump('Semua')}
                  className="hover:text-[#1F2421] hover:underline underline-offset-4 cursor-pointer"
                >
                  Semua Koleksi Buku
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenShelf}
                  className="hover:text-[#1F2421] hover:underline underline-offset-4 cursor-pointer"
                >
                  Rak Baca Saya
                </button>
              </li>
              <li>
                <a
                  href="#kurasi"
                  className="hover:text-[#1F2421] hover:underline underline-offset-4"
                >
                  Pilihan Kurator
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#646D67]">
          <p>© 2026 Pustaka Nirmala. Akses literasi daring terbuka.</p>
          <p>Layanan ruang baca digital 24 jam</p>
        </div>
      </div>
    </footer>
  );
}
