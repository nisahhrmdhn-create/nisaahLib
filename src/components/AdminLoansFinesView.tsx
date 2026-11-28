import { useState } from 'react';
import { Book, FineRecord, LoanRecord, LoanStatus, MemberRecord } from '../types/library';
import { formatDateId, formatRupiah } from '../utils/formatters';

interface AdminLoansViewProps {
  loans: LoanRecord[];
  books: Book[];
  onApproveLoan: (loanId: string) => void;
  onReturnLoan: (loanId: string) => void;
  onExtendLoan: (loanId: string) => void;
  onSimulateOverdue: (loanId: string) => void;
}

export function AdminLoansView({
  loans,
  books,
  onApproveLoan,
  onReturnLoan,
  onExtendLoan,
  onSimulateOverdue,
}: AdminLoansViewProps) {
  const [statusFilter, setStatusFilter] = useState<'semua' | LoanStatus>('semua');

  const filtered = loans.filter((l) =>
    statusFilter === 'semua' ? true : l.status === statusFilter
  );

  const getBookTitle = (bookId: string) =>
    books.find((b) => b.id === bookId)?.title ?? bookId;

  const filterTabs: { id: 'semua' | LoanStatus; label: string }[] = [
    { id: 'semua', label: 'Semua' },
    { id: 'menunggu', label: 'Menunggu' },
    { id: 'dipinjam', label: 'Dipinjam' },
    { id: 'terlambat', label: 'Terlambat' },
    { id: 'dikembalikan', label: 'Dikembalikan' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-1 p-1 bg-[#F4E4E9] rounded-xl overflow-x-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-[#FFFFFF] text-[#2D2226] shadow-xs'
                  : 'text-[#6E5A62] hover:text-[#2D2226]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-[#6E5A62] tabular-nums">
          Menampilkan <strong className="text-[#2D2226]">{filtered.length}</strong> transaksi
        </p>
      </div>

      <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-[#EEDCE2] text-xs font-medium text-[#8C767F]">
              <th className="py-3.5 px-5">Kode</th>
              <th className="py-3.5 px-5">Peminjam</th>
              <th className="py-3.5 px-5">Judul Buku</th>
              <th className="py-3.5 px-5">Jatuh Tempo</th>
              <th className="py-3.5 px-5">Status</th>
              <th className="py-3.5 px-5 text-right">Tindakan Admin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F4E6EB]">
            {filtered.map((loan) => (
              <tr key={loan.id} className="hover:bg-[#FDF9FA]">
                <td className="py-3.5 px-5 font-mono text-xs text-[#6E5A62] tabular-nums whitespace-nowrap">
                  {loan.id}
                </td>
                <td className="py-3.5 px-5 font-medium text-[#2D2226] whitespace-nowrap">
                  {loan.memberName}
                </td>
                <td className="py-3.5 px-5 text-[#2D2226]">
                  {getBookTitle(loan.bookId)}
                </td>
                <td className="py-3.5 px-5 text-[#6E5A62] tabular-nums whitespace-nowrap">
                  {formatDateId(loan.dueDate)}
                </td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-md ${
                      loan.status === 'dipinjam'
                        ? 'bg-[#E6F4EC] text-[#1E6B45]'
                        : loan.status === 'menunggu'
                          ? 'bg-[#FDF1E2] text-[#9A5513]'
                          : loan.status === 'terlambat'
                            ? 'bg-[#FDE8EA] text-[#A62639]'
                            : 'bg-[#FAF2F4] text-[#6E5A62]'
                    }`}
                  >
                    {loan.status === 'dipinjam'
                      ? 'Dipinjam'
                      : loan.status === 'menunggu'
                        ? 'Menunggu'
                        : loan.status === 'terlambat'
                          ? 'Terlambat'
                          : 'Dikembalikan'}
                  </span>
                </td>
                <td className="py-3.5 px-5 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-2">
                    {loan.status === 'menunggu' && (
                      <button
                        type="button"
                        onClick={() => onApproveLoan(loan.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-lg cursor-pointer"
                      >
                        Setujui
                      </button>
                    )}
                    {loan.status === 'dipinjam' && (
                      <>
                        <button
                          type="button"
                          onClick={() => onExtendLoan(loan.id)}
                          className="px-2.5 py-1.5 text-xs font-medium text-[#6E5A62] bg-[#FAF2F4] hover:bg-[#F3E2E8] rounded-lg cursor-pointer"
                        >
                          +7 Hari
                        </button>
                        <button
                          type="button"
                          onClick={() => onSimulateOverdue(loan.id)}
                          className="px-2.5 py-1.5 text-xs font-medium text-[#9A5513] bg-[#FDF1E2] hover:bg-[#FAE4C8] rounded-lg cursor-pointer"
                        >
                          Catat Telat
                        </button>
                      </>
                    )}
                    {(loan.status === 'dipinjam' || loan.status === 'terlambat') && (
                      <button
                        type="button"
                        onClick={() => onReturnLoan(loan.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-[#2D2226] border border-[#EEDCE2] hover:bg-[#FAF2F4] rounded-lg cursor-pointer"
                      >
                        Selesai Kembali
                      </button>
                    )}
                    {loan.status === 'dikembalikan' && (
                      <span className="text-xs text-[#8C767F]">Arsip</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface AdminFinesViewProps {
  fines: FineRecord[];
  books: Book[];
  onMarkFinePaid: (fineId: string) => void;
  onWaiveFine: (fineId: string) => void;
}

export function AdminFinesView({
  fines,
  books,
  onMarkFinePaid,
  onWaiveFine,
}: AdminFinesViewProps) {
  const unpaidTotal = fines
    .filter((f) => f.status === 'belum_lunas')
    .reduce((s, f) => s + f.amount, 0);
  const paidTotal = fines
    .filter((f) => f.status === 'lunas')
    .reduce((s, f) => s + f.amount, 0);

  const getBookTitle = (bookId: string) =>
    books.find((b) => b.id === bookId)?.title ?? bookId;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-5">
          <p className="text-xs text-[#8C767F]">Piutang Denda Belum Lunas</p>
          <p className="font-serif text-3xl font-semibold text-[#A62639] tabular-nums mt-1">
            {formatRupiah(unpaidTotal)}
          </p>
        </div>
        <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-5">
          <p className="text-xs text-[#8C767F]">Total Denda Terbayar</p>
          <p className="font-serif text-3xl font-semibold text-[#1E6B45] tabular-nums mt-1">
            {formatRupiah(paidTotal)}
          </p>
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-[#EEDCE2] text-xs font-medium text-[#8C767F]">
              <th className="py-3.5 px-5">No. Tagihan</th>
              <th className="py-3.5 px-5">Anggota</th>
              <th className="py-3.5 px-5">Buku</th>
              <th className="py-3.5 px-5 text-right">Terlambat</th>
              <th className="py-3.5 px-5 text-right">Nominal</th>
              <th className="py-3.5 px-5">Status</th>
              <th className="py-3.5 px-5 text-right">Aksi Admin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F4E6EB]">
            {fines.map((fine) => (
              <tr key={fine.id} className="hover:bg-[#FDF9FA]">
                <td className="py-3.5 px-5 font-mono text-xs text-[#6E5A62] tabular-nums whitespace-nowrap">
                  {fine.id}
                </td>
                <td className="py-3.5 px-5 font-medium text-[#2D2226] whitespace-nowrap">
                  {fine.memberName}
                </td>
                <td className="py-3.5 px-5 text-[#2D2226]">
                  {getBookTitle(fine.bookId)}
                </td>
                <td className="py-3.5 px-5 text-right text-[#6E5A62] tabular-nums whitespace-nowrap">
                  {fine.daysLate} hari
                </td>
                <td className="py-3.5 px-5 text-right font-mono font-semibold text-[#2D2226] tabular-nums whitespace-nowrap">
                  {formatRupiah(fine.amount)}
                </td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-md ${
                      fine.status === 'belum_lunas'
                        ? 'bg-[#FDE8EA] text-[#A62639]'
                        : fine.status === 'lunas'
                          ? 'bg-[#E6F4EC] text-[#1E6B45]'
                          : 'bg-[#FAF2F4] text-[#6E5A62]'
                    }`}
                  >
                    {fine.status === 'belum_lunas'
                      ? 'Belum Lunas'
                      : fine.status === 'lunas'
                        ? 'Lunas'
                        : 'Dibebaskan'}
                  </span>
                </td>
                <td className="py-3.5 px-5 text-right whitespace-nowrap">
                  {fine.status === 'belum_lunas' ? (
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onMarkFinePaid(fine.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-lg cursor-pointer"
                      >
                        Tandai Lunas
                      </button>
                      <button
                        type="button"
                        onClick={() => onWaiveFine(fine.id)}
                        className="px-2.5 py-1.5 text-xs font-medium text-[#6E5A62] bg-[#FAF2F4] hover:bg-[#F3E2E8] rounded-lg cursor-pointer"
                      >
                        Bebaskan
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-[#8C767F]">Selesai</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface AdminMembersViewProps {
  members: MemberRecord[];
  onToggleMemberStatus: (memberId: string) => void;
}

export function AdminMembersView({
  members,
  onToggleMemberStatus,
}: AdminMembersViewProps) {
  return (
    <div className="space-y-6">
      <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-[#EEDCE2] text-xs font-medium text-[#8C767F]">
              <th className="py-3.5 px-5">ID Anggota</th>
              <th className="py-3.5 px-5">Nama Lengkap</th>
              <th className="py-3.5 px-5">Email</th>
              <th className="py-3.5 px-5">Bergabung</th>
              <th className="py-3.5 px-5 text-right">Pinjaman Aktif</th>
              <th className="py-3.5 px-5">Status</th>
              <th className="py-3.5 px-5 text-right">Kelola</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F4E6EB]">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-[#FDF9FA]">
                <td className="py-3.5 px-5 font-mono text-xs text-[#6E5A62] tabular-nums whitespace-nowrap">
                  {member.memberCode}
                </td>
                <td className="py-3.5 px-5 font-medium text-[#2D2226] whitespace-nowrap">
                  {member.name}
                </td>
                <td className="py-3.5 px-5 text-[#6E5A62]">{member.email}</td>
                <td className="py-3.5 px-5 text-[#6E5A62] tabular-nums whitespace-nowrap">
                  {formatDateId(member.joinedAt)}
                </td>
                <td className="py-3.5 px-5 text-right font-mono tabular-nums">
                  {member.activeLoansCount}
                </td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-md ${
                      member.status === 'aktif'
                        ? 'bg-[#E6F4EC] text-[#1E6B45]'
                        : 'bg-[#FDE8EA] text-[#A62639]'
                    }`}
                  >
                    {member.status === 'aktif' ? 'Aktif' : 'Ditangguhkan'}
                  </span>
                </td>
                <td className="py-3.5 px-5 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => onToggleMemberStatus(member.id)}
                    className="px-3 py-1.5 text-xs font-medium text-[#5A474E] bg-[#FAF2F4] hover:bg-[#F3E2E8] border border-[#EEDCE2] rounded-lg cursor-pointer"
                  >
                    {member.status === 'aktif' ? 'Tangguhkan' : 'Aktifkan'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
