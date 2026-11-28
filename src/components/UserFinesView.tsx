import { useState } from 'react';
import { AlertTriangle, CheckCircle2, CreditCard, Receipt, X } from 'lucide-react';
import { Book, FineRecord, LibraryPolicySettings } from '../types/library';
import { formatDateId, formatRupiah } from '../utils/formatters';

interface UserFinesViewProps {
  fines: FineRecord[];
  books: Book[];
  policy: LibraryPolicySettings;
  onPayFine: (fineId: string, paymentMethod: string) => void;
}

export function UserFinesView({
  fines,
  books,
  policy,
  onPayFine,
}: UserFinesViewProps) {
  const [payingFine, setPayingFine] = useState<FineRecord | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('QRIS Pustaka');

  const unpaidFines = fines.filter((f) => f.status === 'belum_lunas');
  const settledFines = fines.filter((f) => f.status !== 'belum_lunas');
  const totalUnpaid = unpaidFines.reduce((sum, f) => sum + f.amount, 0);
  const totalPaid = fines
    .filter((f) => f.status === 'lunas')
    .reduce((sum, f) => sum + f.amount, 0);

  const getBookTitle = (bookId: string) =>
    books.find((b) => b.id === bookId)?.title ?? bookId;

  return (
    <div className="space-y-8">
      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-5">
          <p className="text-xs text-[#8C767F]">Total Tagihan Aktif</p>
          <p
            className={`font-serif text-3xl font-semibold tabular-nums mt-1 ${
              totalUnpaid > 0 ? 'text-[#A62639]' : 'text-[#1E6B45]'
            }`}
          >
            {formatRupiah(totalUnpaid)}
          </p>
          <p className="text-xs text-[#6E5A62] mt-1 tabular-nums">
            {unpaidFines.length} tagihan belum dilunasi
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-5">
          <p className="text-xs text-[#8C767F]">Tarif Denda Berlaku</p>
          <p className="font-serif text-3xl font-semibold text-[#2D2226] tabular-nums mt-1">
            {formatRupiah(policy.dailyFineRate)}
          </p>
          <p className="text-xs text-[#6E5A62] mt-1">Per hari keterlambatan per buku</p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-5">
          <p className="text-xs text-[#8C767F]">Total Denda Terbayar</p>
          <p className="font-serif text-3xl font-semibold text-[#2D2226] tabular-nums mt-1">
            {formatRupiah(totalPaid)}
          </p>
          <p className="text-xs text-[#6E5A62] mt-1">Riwayat pembayaran lunas</p>
        </div>
      </div>

      {/* Unpaid Fines */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-semibold text-[#2D2226]">
          Tagihan Belum Lunas
        </h2>

        {unpaidFines.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-8 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#E6F4EC] text-[#1E6B45] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-[#2D2226]">
                Tidak ada denda aktif saat ini
              </p>
              <p className="text-sm text-[#6E5A62]">
                Semua pengembalian buku Anda berada dalam kondisi tepat waktu atau sudah lunas.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {unpaidFines.map((fine) => (
              <div
                key={fine.id}
                className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FDE8EA] text-[#A62639] flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#8C767F] mb-1">
                      <span className="font-mono tabular-nums">{fine.id}</span>
                      <span aria-hidden="true">·</span>
                      <span>Pinjaman {fine.loanId}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        Diterbitkan {formatDateId(fine.createdAt)}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#2D2226]">
                      {getBookTitle(fine.bookId)}
                    </h3>
                    <p className="text-sm text-[#6E5A62] mt-0.5 tabular-nums">
                      Terlambat {fine.daysLate} hari × {formatRupiah(fine.dailyRate)} / hari
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-[#8C767F]">Nominal</p>
                    <p className="font-mono text-lg font-semibold text-[#A62639] tabular-nums">
                      {formatRupiah(fine.amount)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPayingFine(fine)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-xl cursor-pointer whitespace-nowrap"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Bayar Denda</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Settled Fine History */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-semibold text-[#2D2226]">
          Riwayat Penyelesaian Denda
        </h2>

        {settledFines.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-6 text-sm text-[#6E5A62]">
            Belum ada riwayat pembayaran denda.
          </div>
        ) : (
          <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#EEDCE2] text-xs font-medium text-[#8C767F]">
                  <th className="py-3.5 px-5">No. Tagihan</th>
                  <th className="py-3.5 px-5">Buku</th>
                  <th className="py-3.5 px-5">Keterlambatan</th>
                  <th className="py-3.5 px-5 text-right">Nominal</th>
                  <th className="py-3.5 px-5">Metode</th>
                  <th className="py-3.5 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4E6EB]">
                {settledFines.map((fine) => (
                  <tr key={fine.id} className="hover:bg-[#FDF9FA]">
                    <td className="py-3.5 px-5 font-mono text-xs text-[#6E5A62] tabular-nums whitespace-nowrap">
                      {fine.id}
                    </td>
                    <td className="py-3.5 px-5 font-medium text-[#2D2226]">
                      {getBookTitle(fine.bookId)}
                    </td>
                    <td className="py-3.5 px-5 text-[#6E5A62] tabular-nums whitespace-nowrap">
                      {fine.daysLate} hari
                    </td>
                    <td className="py-3.5 px-5 font-mono text-right text-[#2D2226] tabular-nums whitespace-nowrap">
                      {formatRupiah(fine.amount)}
                    </td>
                    <td className="py-3.5 px-5 text-[#6E5A62] whitespace-nowrap">
                      {fine.paymentMethod ?? 'Kebijakan Admin'}
                    </td>
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-md ${
                          fine.status === 'lunas'
                            ? 'bg-[#E6F4EC] text-[#1E6B45]'
                            : 'bg-[#FAF2F4] text-[#6E5A62]'
                        }`}
                      >
                        {fine.status === 'lunas' ? 'Lunas' : 'Dibebaskan'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Payment Modal */}
      {payingFine && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2226]/45 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          onClick={() => setPayingFine(null)}
        >
          <div
            className="w-full max-w-md bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-[#EEDCE2] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#B5536E]" />
                <h3 className="font-serif text-xl font-semibold text-[#2D2226]">
                  Pembayaran Denda
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPayingFine(null)}
                aria-label="Tutup"
                className="p-1.5 rounded-lg text-[#6E5A62] hover:bg-[#FAF2F4] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="p-4 rounded-xl bg-[#FDF9FA] border border-[#EEDCE2] space-y-1.5">
                <p className="text-xs text-[#8C767F] font-mono tabular-nums">
                  {payingFine.id} · {getBookTitle(payingFine.bookId)}
                </p>
                <p className="font-serif text-3xl font-semibold text-[#2D2226] tabular-nums">
                  {formatRupiah(payingFine.amount)}
                </p>
                <p className="text-xs text-[#6E5A62] tabular-nums">
                  Keterlambatan {payingFine.daysLate} hari
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-[#6E5A62] mb-2">
                  Pilih Metode Pembayaran
                </p>
                <div className="space-y-2">
                  {['QRIS Pustaka', 'Virtual Account BCA', 'Saldo Dompet Digital'].map(
                    (method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl border transition-colors cursor-pointer ${
                          paymentMethod === method
                            ? 'bg-[#FAF2F4] border-[#B5536E] text-[#2D2226]'
                            : 'bg-[#FFFFFF] border-[#EEDCE2] text-[#6E5A62] hover:bg-[#FDF9FA]'
                        }`}
                      >
                        {method}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPayingFine(null)}
                  className="px-4 py-2.5 text-sm font-medium text-[#6E5A62] hover:bg-[#FAF2F4] rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onPayFine(payingFine.id, paymentMethod);
                    setPayingFine(null);
                  }}
                  className="px-5 py-2.5 text-sm font-medium text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-xl cursor-pointer"
                >
                  Konfirmasi Bayar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
