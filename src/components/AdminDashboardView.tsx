import { AlertCircle, ArrowRight, BookCopy, CalendarClock, Receipt } from 'lucide-react';
import { AdminNavTab, Book, FineRecord, LoanRecord } from '../types/library';
import { formatDateId, formatRupiah } from '../utils/formatters';

interface AdminDashboardViewProps {
  books: Book[];
  loans: LoanRecord[];
  fines: FineRecord[];
  onNavigateTab: (tab: AdminNavTab) => void;
  onApproveLoan: (loanId: string) => void;
  onReturnLoan: (loanId: string) => void;
}

export function AdminDashboardView({
  books,
  loans,
  fines,
  onNavigateTab,
  onApproveLoan,
  onReturnLoan,
}: AdminDashboardViewProps) {
  const totalCopies = books.reduce((s, b) => s + b.stock, 0);
  const availableCopies = books.reduce((s, b) => s + b.availableStock, 0);
  const activeLoans = loans.filter(
    (l) => l.status === 'dipinjam' || l.status === 'terlambat'
  );
  const pendingLoans = loans.filter((l) => l.status === 'menunggu');
  const overdueLoans = loans.filter((l) => l.status === 'terlambat');
  const unpaidFines = fines.filter((f) => f.status === 'belum_lunas');
  const unpaidFineTotal = unpaidFines.reduce((s, f) => s + f.amount, 0);
  const collectedFineTotal = fines
    .filter((f) => f.status === 'lunas')
    .reduce((s, f) => s + f.amount, 0);

  const getBookTitle = (bookId: string) =>
    books.find((b) => b.id === bookId)?.title ?? bookId;

  return (
    <div className="space-y-8">
      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#8C767F]">Koleksi Buku</span>
            <BookCopy className="w-4 h-4 text-[#B5536E]" />
          </div>
          <p className="font-serif text-3xl font-semibold text-[#2D2226] tabular-nums">
            {books.length} Judul
          </p>
          <p className="text-xs text-[#6E5A62] mt-1 tabular-nums">
            {availableCopies} dari {totalCopies} eksemplar tersedia
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#8C767F]">Peminjaman Aktif</span>
            <CalendarClock className="w-4 h-4 text-[#B5536E]" />
          </div>
          <p className="font-serif text-3xl font-semibold text-[#2D2226] tabular-nums">
            {activeLoans.length} Transaksi
          </p>
          <p className="text-xs text-[#6E5A62] mt-1 tabular-nums">
            {pendingLoans.length} menunggu persetujuan
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#8C767F]">Keterlambatan</span>
            <AlertCircle className="w-4 h-4 text-[#A62639]" />
          </div>
          <p
            className={`font-serif text-3xl font-semibold tabular-nums ${
              overdueLoans.length > 0 ? 'text-[#A62639]' : 'text-[#1E6B45]'
            }`}
          >
            {overdueLoans.length} Pinjaman
          </p>
          <p className="text-xs text-[#6E5A62] mt-1">
            Perlu tindak lanjut pengembalian
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#8C767F]">Denda Belum Lunas</span>
            <Receipt className="w-4 h-4 text-[#B5536E]" />
          </div>
          <p className="font-serif text-3xl font-semibold text-[#2D2226] tabular-nums">
            {formatRupiah(unpaidFineTotal)}
          </p>
          <p className="text-xs text-[#6E5A62] mt-1 tabular-nums">
            Terkumpul: {formatRupiah(collectedFineTotal)}
          </p>
        </div>
      </div>

      {/* Action Queues */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Recent Loans Queue */}
        <section className="xl:col-span-7 bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EEDCE2] flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold text-[#2D2226]">
              Antrean & Peminjaman Terbaru
            </h2>
            <button
              type="button"
              onClick={() => onNavigateTab('peminjaman')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#B5536E] hover:underline cursor-pointer"
            >
              <span>Kelola Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-[#F4E6EB]">
            {loans.slice(0, 5).map((loan) => (
              <div
                key={loan.id}
                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-[#8C767F] mb-0.5">
                    <span className="font-mono tabular-nums">{loan.id}</span>
                    <span aria-hidden="true">·</span>
                    <span>{loan.memberName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      Jatuh tempo {formatDateId(loan.dueDate)}
                    </span>
                  </div>
                  <p className="font-medium text-sm text-[#2D2226] truncate">
                    {getBookTitle(loan.bookId)}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {loan.status === 'menunggu' && (
                    <button
                      type="button"
                      onClick={() => onApproveLoan(loan.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-lg cursor-pointer"
                    >
                      Setujui
                    </button>
                  )}
                  {(loan.status === 'dipinjam' || loan.status === 'terlambat') && (
                    <button
                      type="button"
                      onClick={() => onReturnLoan(loan.id)}
                      className="px-3 py-1.5 text-xs font-medium text-[#2D2226] bg-[#FAF2F4] hover:bg-[#F3E2E8] border border-[#EEDCE2] rounded-lg cursor-pointer"
                    >
                      Tandai Kembali
                    </button>
                  )}
                  {loan.status === 'dikembalikan' && (
                    <span className="text-xs text-[#6E5A62] px-2.5 py-1 bg-[#FAF2F4] rounded-md">
                      Selesai
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Unpaid Fines Queue */}
        <section className="xl:col-span-5 bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EEDCE2] flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold text-[#2D2226]">
              Tagihan Denda Aktif
            </h2>
            <button
              type="button"
              onClick={() => onNavigateTab('denda')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#B5536E] hover:underline cursor-pointer"
            >
              <span>Kelola Denda</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {unpaidFines.length === 0 ? (
            <div className="p-6 text-sm text-[#6E5A62]">
              Seluruh tagihan denda anggota sudah lunas.
            </div>
          ) : (
            <div className="divide-y divide-[#F4E6EB]">
              {unpaidFines.map((fine) => (
                <div
                  key={fine.id}
                  className="px-6 py-4 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#2D2226] truncate">
                      {fine.memberName}
                    </p>
                    <p className="text-xs text-[#6E5A62] truncate tabular-nums">
                      {getBookTitle(fine.bookId)} · {fine.daysLate} hari terlambat
                    </p>
                  </div>
                  <p className="font-mono text-sm font-semibold text-[#A62639] tabular-nums shrink-0">
                    {formatRupiah(fine.amount)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
