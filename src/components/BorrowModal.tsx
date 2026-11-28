import { useEffect, useState } from 'react';
import { Calendar, X } from 'lucide-react';
import { Book, LibraryPolicySettings } from '../types/library';
import { addDaysIso, formatDateId, formatRupiah, getTodayIso } from '../utils/formatters';
import { BookCover } from './BookCover';

interface BorrowModalProps {
  book: Book | null;
  policy: LibraryPolicySettings;
  onClose: () => void;
  onConfirmBorrow: (book: Book, durationDays: number, notes: string) => void;
}

export function BorrowModal({
  book,
  policy,
  onClose,
  onConfirmBorrow,
}: BorrowModalProps) {
  const [durationDays, setDurationDays] = useState(
    Math.min(7, policy.maxLoanDays)
  );
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!book) return;
    setDurationDays(Math.min(7, policy.maxLoanDays));
    setNotes('');
  }, [book, policy.maxLoanDays]);

  useEffect(() => {
    if (!book) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [book, onClose]);

  if (!book) return null;

  const todayIso = getTodayIso();
  const dueIso = addDaysIso(todayIso, durationDays);
  const durationChoices = [7, 14, 21].filter((d) => d <= policy.maxLoanDays);
  if (durationChoices.length === 0) {
    durationChoices.push(policy.maxLoanDays);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmBorrow(book, durationDays, notes.trim());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2226]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="borrow-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#EEDCE2] flex items-center justify-between">
          <h2
            id="borrow-modal-title"
            className="font-serif text-2xl font-semibold text-[#2D2226]"
          >
            Pinjam Koleksi Buku
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal peminjaman"
            className="p-2 rounded-xl text-[#6E5A62] hover:bg-[#FAF2F4] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="flex items-center gap-4 p-3.5 rounded-xl bg-[#FDF9FA] border border-[#EEDCE2]">
            <div className="w-16 shrink-0">
              <BookCover book={book} size="sm" />
            </div>
            <div className="min-w-0">
              <p className="font-serif text-lg font-semibold text-[#2D2226] truncate">
                {book.title}
              </p>
              <p className="text-xs text-[#6E5A62] mb-1">{book.author}</p>
              <p className="text-xs font-medium text-[#1E6B45] tabular-nums">
                {book.availableStock} dari {book.stock} eksemplar tersedia
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-[#6E5A62] mb-2">
              Durasi Peminjaman
            </label>
            <div className="grid grid-cols-3 gap-2">
              {durationChoices.map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setDurationDays(days)}
                  className={`py-2.5 px-3 text-sm font-medium rounded-xl border transition-colors cursor-pointer tabular-nums ${
                    durationDays === days
                      ? 'bg-[#B5536E] border-[#B5536E] text-[#FFFFFF]'
                      : 'bg-[#FFFFFF] border-[#EEDCE2] text-[#5A474E] hover:bg-[#FAF2F4]'
                  }`}
                >
                  {days} Hari
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF2F4] border border-[#EEDCE2] space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#6E5A62] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#B5536E]" />
                Tanggal Pinjam
              </span>
              <span className="font-medium text-[#2D2226] tabular-nums">
                {formatDateId(todayIso)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6E5A62]">Batas Pengembalian</span>
              <span className="font-semibold text-[#2D2226] tabular-nums">
                {formatDateId(dueIso)}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#EEDCE2] text-xs">
              <span className="text-[#6E5A62]">Ketentuan Denda Keterlambatan</span>
              <span className="font-mono font-medium text-[#783447] tabular-nums">
                {formatRupiah(policy.dailyFineRate)} / hari
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="borrow-notes"
              className="block text-xs font-semibold tracking-wider uppercase text-[#6E5A62] mb-2"
            >
              Catatan Peminjaman (Opsional)
            </label>
            <input
              id="borrow-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Untuk bahan riset atau bacaan akhir pekan"
              className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl text-[#2D2226] placeholder:text-[#9A848D] focus:outline-none focus:border-[#B5536E]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-[#6E5A62] hover:text-[#2D2226] hover:bg-[#FAF2F4] rounded-xl cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-xl transition-colors cursor-pointer"
            >
              {policy.autoApproveLoans
                ? 'Konfirmasi Pinjam'
                : 'Ajukan ke Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
