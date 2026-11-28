import { useState } from 'react';
import { Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { BOOK_CATEGORIES } from '../data/books';
import { Book, BookCategory } from '../types/library';

interface AdminBooksViewProps {
  books: Book[];
  addModalOpen: boolean;
  onOpenAddModal: () => void;
  onCloseAddModal: () => void;
  onAddBook: (book: Book) => void;
  onUpdateBook: (book: Book) => void;
  onDeleteBook: (bookId: string) => void;
}

const VALID_CATEGORIES = BOOK_CATEGORIES.filter(
  (c): c is Exclude<BookCategory, 'Semua'> => c !== 'Semua'
);

export function AdminBooksView({
  books,
  addModalOpen,
  onOpenAddModal,
  onCloseAddModal,
  onAddBook,
  onUpdateBook,
  onDeleteBook,
}: AdminBooksViewProps) {
  const [query, setQuery] = useState('');
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] =
    useState<Exclude<BookCategory, 'Semua'>>('Esai & Budaya');
  const [year, setYear] = useState(2026);
  const [pages, setPages] = useState(180);
  const [stock, setStock] = useState(4);
  const [isbn, setIsbn] = useState('978-623-8910-99-0');
  const [synopsis, setSynopsis] = useState('');
  const [chapterContent, setChapterContent] = useState('');

  const filtered = books.filter((b) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.catalogNumber.toLowerCase().includes(q)
    );
  });

  const openEditModal = (book: Book) => {
    setEditingBook(book);
    setTitle(book.title);
    setSubtitle(book.subtitle);
    setAuthor(book.author);
    setCategory(book.category);
    setYear(book.year);
    setPages(book.pages);
    setStock(book.stock);
    setIsbn(book.isbn);
    setSynopsis(book.synopsis);
  };

  const resetForm = () => {
    setTitle('');
    setSubtitle('');
    setAuthor('');
    setCategory('Esai & Budaya');
    setYear(2026);
    setPages(180);
    setStock(4);
    setIsbn('978-623-8910-99-0');
    setSynopsis('');
    setChapterContent('');
  };

  const handleSaveNewBook = (e: React.FormEvent) => {
    e.preventDefault();
    const idSlug = `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')}-${Date.now().toString().slice(-4)}`;

    const newBook: Book = {
      id: idSlug,
      catalogNumber: `PN-2026-${String(books.length + 1).padStart(2, '0')}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'Edisi Kurasi Perpustakaan Digital',
      author: author.trim(),
      authorBio: `Penulis karya ${title.trim()} dalam koleksi Pustaka Nirmala.`,
      category,
      year: Number(year) || 2026,
      pages: Number(pages) || 160,
      language: 'Bahasa Indonesia',
      publisher: 'Pustaka Nirmala Press',
      isbn: isbn.trim(),
      readCount: 1,
      readingMinutes: 10,
      stock: Number(stock) || 3,
      availableStock: Number(stock) || 3,
      clothColor: '#F5E4EA',
      clothAccent: '#B5536E',
      featuredQuote:
        synopsis.trim() ||
        'Setiap halaman yang dibuka adalah ruang baru untuk memahami dunia dengan lebih tenang.',
      synopsis:
        synopsis.trim() ||
        'Karya pilihan yang ditambahkan oleh pengelola koleksi Pustaka Nirmala.',
      chapters: [
        {
          id: `${idSlug}-1`,
          number: 'Bab 01',
          title: 'Pengantar Naskah',
          readingTimeMinutes: 4,
          paragraphs: [
            chapterContent.trim() ||
              'Naskah ini merupakan koleksi terbaru yang tersedia untuk dibaca secara daring dan dipinjam oleh anggota Pustaka Nirmala.',
          ],
        },
      ],
    };

    onAddBook(newBook);
    resetForm();
    onCloseAddModal();
  };

  const handleSaveEditBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook) return;
    const borrowedCount = Math.max(
      0,
      editingBook.stock - editingBook.availableStock
    );
    const nextStock = Math.max(borrowedCount, Number(stock) || 1);

    onUpdateBook({
      ...editingBook,
      title: title.trim(),
      subtitle: subtitle.trim(),
      author: author.trim(),
      category,
      year: Number(year),
      pages: Number(pages),
      stock: nextStock,
      availableStock: Math.max(0, nextStock - borrowedCount),
      isbn: isbn.trim(),
      synopsis: synopsis.trim(),
    });
    setEditingBook(null);
    resetForm();
  };

  const isModalVisible = addModalOpen || Boolean(editingBook);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            aria-hidden="true"
            className="w-4 h-4 text-[#8C767F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kode katalog, judul, atau penulis..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FFFFFF] border border-[#EEDCE2] rounded-xl text-[#2D2226] focus:outline-none focus:border-[#B5536E]"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            resetForm();
            onOpenAddModal();
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-xl cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Koleksi Baru</span>
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-[#EEDCE2] text-xs font-medium text-[#8C767F]">
              <th className="py-3.5 px-5">Katalog</th>
              <th className="py-3.5 px-5">Judul & Penulis</th>
              <th className="py-3.5 px-5">Kategori</th>
              <th className="py-3.5 px-5 text-right">Tahun</th>
              <th className="py-3.5 px-5 text-right">Stok Tersedia</th>
              <th className="py-3.5 px-5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F4E6EB]">
            {filtered.map((book) => (
              <tr key={book.id} className="hover:bg-[#FDF9FA]">
                <td className="py-3.5 px-5 font-mono text-xs text-[#6E5A62] tabular-nums whitespace-nowrap">
                  {book.catalogNumber}
                </td>
                <td className="py-3.5 px-5">
                  <p className="font-medium text-[#2D2226]">{book.title}</p>
                  <p className="text-xs text-[#6E5A62]">{book.author}</p>
                </td>
                <td className="py-3.5 px-5 text-[#6E5A62] whitespace-nowrap">
                  {book.category}
                </td>
                <td className="py-3.5 px-5 text-right text-[#6E5A62] tabular-nums">
                  {book.year}
                </td>
                <td className="py-3.5 px-5 text-right font-mono tabular-nums whitespace-nowrap">
                  <span
                    className={
                      book.availableStock === 0
                        ? 'text-[#A62639] font-semibold'
                        : 'text-[#1E6B45] font-medium'
                    }
                  >
                    {book.availableStock}
                  </span>
                  <span className="text-[#8C767F]"> / {book.stock}</span>
                </td>
                <td className="py-3.5 px-5 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openEditModal(book)}
                      aria-label={`Ubah ${book.title}`}
                      className="p-2 text-[#6E5A62] hover:text-[#2D2226] hover:bg-[#FAF2F4] rounded-lg cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteBook(book.id)}
                      aria-label={`Hapus ${book.title}`}
                      className="p-2 text-[#8C767F] hover:text-[#A62639] hover:bg-[#FDE8EA] rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Book Modal */}
      {isModalVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2226]/45 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          onClick={() => {
            onCloseAddModal();
            setEditingBook(null);
          }}
        >
          <div
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-[#EEDCE2] flex items-center justify-between sticky top-0 bg-[#FFFFFF] z-10">
              <h2 className="font-serif text-2xl font-semibold text-[#2D2226]">
                {editingBook ? 'Ubah Data Koleksi' : 'Tambah Buku Baru'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  onCloseAddModal();
                  setEditingBook(null);
                }}
                aria-label="Tutup"
                className="p-2 rounded-xl text-[#6E5A62] hover:bg-[#FAF2F4] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={editingBook ? handleSaveEditBook : handleSaveNewBook}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-xs font-medium text-[#6E5A62] mb-1">
                  Judul Buku
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Bunga Rampai Aksara Kota"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl focus:outline-none focus:border-[#B5536E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#6E5A62] mb-1">
                    Penulis
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Nama penulis"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl focus:outline-none focus:border-[#B5536E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6E5A62] mb-1">
                    Kategori
                  </label>
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(
                        e.target.value as Exclude<BookCategory, 'Semua'>
                      )
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl focus:outline-none focus:border-[#B5536E]"
                  >
                    {VALID_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#6E5A62] mb-1">
                    Tahun
                  </label>
                  <input
                    type="number"
                    required
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl tabular-nums focus:outline-none focus:border-[#B5536E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6E5A62] mb-1">
                    Halaman
                  </label>
                  <input
                    type="number"
                    required
                    value={pages}
                    onChange={(e) => setPages(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl tabular-nums focus:outline-none focus:border-[#B5536E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6E5A62] mb-1">
                    Stok
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl tabular-nums focus:outline-none focus:border-[#B5536E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#6E5A62] mb-1">
                  Sinopsis Singkat
                </label>
                <textarea
                  rows={2}
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  placeholder="Ringkasan singkat isi buku..."
                  className="w-full px-3.5 py-2 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl focus:outline-none focus:border-[#B5536E]"
                />
              </div>

              {!editingBook && (
                <div>
                  <label className="block text-xs font-medium text-[#6E5A62] mb-1">
                    Paragraf Pembuka (Untuk Pembaca Daring)
                  </label>
                  <textarea
                    rows={3}
                    value={chapterContent}
                    onChange={(e) => setChapterContent(e.target.value)}
                    placeholder="Tuliskan paragraf pembuka Bab 01..."
                    className="w-full px-3.5 py-2 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl focus:outline-none focus:border-[#B5536E]"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onCloseAddModal();
                    setEditingBook(null);
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-[#6E5A62] hover:bg-[#FAF2F4] rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-medium text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-xl cursor-pointer"
                >
                  {editingBook ? 'Simpan Perubahan' : 'Tambahkan Buku'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
