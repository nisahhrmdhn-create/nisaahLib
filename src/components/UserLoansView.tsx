import { AlertCircle, BookOpen, CalendarPlus, CheckCircle2, Clock, RotateCcw } from 'lucide-react';
import { Book, LibraryPolicySettings, LoanRecord, LoanStatus } from '../types/library';
import { formatDateId, getDaysDifference, getTodayIso } from '../utils/formatters';
import { BookCover } from './BookCover';

interface UserLoansViewProps {
  loans: LoanRecord[];
  books: Book[];
  policy: LibraryPolicySettings;
  onExtendLoan: (loanId: string) => void;
  onReturnLoan: (loanId: string) => void;
  onReadBook: (book: Book) => void;
  onBrowseCatalog: () => void;
}

function StatusTag({ status }: { status: LoanStatus }) {
  if (status === 'dipinjam') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-[#E6F4EC] text-[#1E6B45]">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Sedang Dipinjam
      </span>
    );
  }
  if (status === 'menunggu') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-[#FDF1E2] text-[#9A5513]">
        <Clock className="w-3.5 h-3.5" />
        Menunggu Persetujuan
      </span>
    );
  }
  if (status === 'terlambat') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-[#FDE8EA] text-[#A62639]">
        <AlertCircle className="w-3.5 h-3.5" />
        Terlambat
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-[#F4E9ED] text-[#6E5A62]">
      Dikembalikan
    </span>
  );
}

export function UserLoansView({
  loans,
  books,
  policy,
  onExtendLoan,
  onReturnLoan,
  onReadBook,
  onBrowseCatalog,
}: UserLoansViewProps) {
  const todayIso = getTodayIso();
  const activeLoans = loans.filter((l) => l.status !== 'dikembalikan');
  const historyLoans = loans.filter((l) => l.status === 'dikembalikan');

  const getBook = (bookId: string) => books.find((b) => b.id === bookId);

  return (
    <div className="space-y-8">
      {/* Summary Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-5">
          <p className="text-xs text-[#8C767F]">Pinjaman Aktif</p>
          <p className="font-serif text-3xl font-semibold text-[#2D2226] tabular-nums mt-1">
            {activeLoans.length} / {policy.maxActiveLoansPerUser}
          </p>
          <p className="text-xs text-[#6E5A62] mt-1">Batas maksimal pinjaman anggota</p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-5">
          <p className="text-xs text-[#8C767F]">Melewati Jatuh Tempo</p>
          <p
            className={`font-serif text-3xl font-semibold tabular-nums mt-1 ${
              activeLoans.some((l) => l.status === 'terlambat')
                ? 'text-[#A62639]'
                : 'text-[#1E6B45]'
            }`}
          >
            {activeLoans.filter((l) => l.status === 'terlambat').length} Buku
          </p>
          <p className="text-xs text-[#6E5A62] mt-1">Segera kembalikan agar denda berhenti</p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-5">
          <p className="text-xs text-[#8C767F]">Total Riwayat Selesai</p>
          <p className="font-serif text-3xl font-semibold text-[#2D2226] tabular-nums mt-1">
            {historyLoans.length} Buku
          </p>
          <p className="text-xs text-[#6E5A62] mt-1">Dikembalikan ke koleksi</p>
        </div>
      </div>

      {/* Active Loans List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold text-[#2D2226]">
            Pinjaman Berjalan
          </h2>
          <button
            type="button"
            onClick={onBrowseCatalog}
            className="text-sm font-medium text-[#B5536E] hover:underline cursor-pointer"
          >
            + Pinjam Buku Lainnya
          </button>
        </div>

        {activeLoans.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-10 text-center">
            <p className="font-serif text-xl font-medium text-[#2D2226] mb-1.5">
              Belum ada buku yang sedang dipinjam
            </p>
            <p className="text-sm text-[#6E5A62] mb-5">
              Jelajahi katalog buku dan pilih tombol Pinjam untuk meminjam koleksi ke rak pinjaman Anda.
            </p>
            <button
              type="button"
              onClick={onBrowseCatalog}
              className="px-5 py-2.5 text-sm font-medium text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-xl cursor-pointer"
            >
              Jelajahi Katalog
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {activeLoans.map((loan) => {
              const book = getBook(loan.bookId);
              if (!book) return null;
              const daysRemaining = getDaysDifference(todayIso, loan.dueDate);

              return (
                <div
                  key={loan.id}
                  className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-5"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-16 shrink-0">
                      <BookCover book={book} size="sm" />
                    </div>
                    <div className="min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusTag status={loan.status} />
                        <span className="font-mono text-xs text-[#8C767F] tabular-nums">
                          {loan.id}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-semibold text-[#2D2226] leading-snug">
                        {book.title}
                      </h3>
                      <p className="text-xs text-[#6E5A62]">
                        {book.author} · Dipinjam {formatDateId(loan.borrowDate)} · Jatuh tempo{' '}
                        <strong className="text-[#2D2226]">
                          {formatDateId(loan.dueDate)}
                        </strong>
                      </p>

                      {loan.status === 'terlambat' ? (
                        <p className="text-xs font-medium text-[#A62639] tabular-nums">
                          Terlambat {Math.abs(daysRemaining)} hari dari batas pengembalian.
                        </p>
                      ) : loan.status === 'dipinjam' ? (
                        <p className="text-xs text-[#6E5A62] tabular-nums">
                          Sisa waktu peminjaman: {daysRemaining} hari lagi.
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onReadBook(book)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-xl cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Baca Daring</span>
                    </button>

                    {loan.status === 'dipinjam' && (
                      <button
                        type="button"
                        onClick={() => onExtendLoan(loan.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#5A474E] bg-[#FAF2F4] hover:bg-[#F3E2E8] border border-[#EEDCE2] rounded-xl cursor-pointer"
                      >
                        <CalendarPlus className="w-3.5 h-3.5" />
                        <span>Perpanjang +7 Hari</span>
                      </button>
                    )}

                    {loan.status !== 'menunggu' && (
                      <button
                        type="button"
                        onClick={() => onReturnLoan(loan.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#2D2226] bg-[#FFFFFF] hover:bg-[#FAF2F4] border border-[#EEDCE2] rounded-xl cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Kembalikan</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Loan History Table */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-semibold text-[#2D2226]">
          Riwayat Peminjaman
        </h2>

        {historyLoans.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-6 text-sm text-[#6E5A62]">
            Belum ada riwayat peminjaman yang selesai.
          </div>
        ) : (
          <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#EEDCE2] text-xs font-medium text-[#8C767F]">
                  <th className="py-3.5 px-5">Kode</th>
                  <th className="py-3.5 px-5">Judul Buku</th>
                  <th className="py-3.5 px-5">Tanggal Pinjam</th>
                  <th className="py-3.5 px-5">Tanggal Kembali</th>
                  <th className="py-3.5 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4E6EB]">
                {historyLoans.map((loan) => {
                  const book = getBook(loan.bookId);
                  return (
                    <tr key={loan.id} className="hover:bg-[#FDF9FA]">
                      <td className="py-3.5 px-5 font-mono text-xs text-[#6E5A62] tabular-nums whitespace-nowrap">
                        {loan.id}
                      </td>
                      <td className="py-3.5 px-5 font-medium text-[#2D2226]">
                        {book?.title ?? loan.bookId}
                      </td>
                      <td className="py-3.5 px-5 text-[#6E5A62] tabular-nums whitespace-nowrap">
                        {formatDateId(loan.borrowDate)}
                      </td>
                      <td className="py-3.5 px-5 text-[#6E5A62] tabular-nums whitespace-nowrap">
                        {formatDateId(loan.returnDate ?? '')}
                      </td>
                      <td className="py-3.5 px-5 whitespace-nowrap">
                        <StatusTag status={loan.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
