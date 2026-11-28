import { BookOpen, Menu, Plus } from 'lucide-react';
import { AdminNavTab, AppRole, UserNavTab } from '../types/library';

interface TopHeaderProps {
  role: AppRole;
  userTab: UserNavTab;
  adminTab: AdminNavTab;
  hasActiveReading: boolean;
  onOpenMobileMenu: () => void;
  onPrimaryAction: () => void;
}

const USER_LABELS: Record<UserNavTab, string> = {
  katalog: 'Katalog Koleksi Buku',
  peminjaman: 'Peminjaman Saya',
  denda: 'Denda & Pembayaran',
  rak: 'Rak Tersimpan',
  profil: 'Profil Anggota',
  pengaturan: 'Pengaturan Akun',
};

const ADMIN_LABELS: Record<AdminNavTab, string> = {
  ringkasan: 'Ringkasan Operasional',
  buku: 'Kelola Koleksi Buku',
  peminjaman: 'Kelola Peminjaman',
  denda: 'Kelola Denda Anggota',
  anggota: 'Data Anggota',
  pengaturan: 'Pengaturan Perpustakaan',
};

export function TopHeader({
  role,
  userTab,
  adminTab,
  hasActiveReading,
  onOpenMobileMenu,
  onPrimaryAction,
}: TopHeaderProps) {
  const sectionLabel =
    role === 'user' ? USER_LABELS[userTab] : ADMIN_LABELS[adminTab];

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#FDF9FA]/95 backdrop-blur-sm border-b border-[#EEDCE2] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Buka menu samping"
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#2D2226] hover:bg-[#F6E9ED] transition-colors cursor-pointer shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sm min-w-0">
          <span className="text-[#8C767F] hidden sm:inline whitespace-nowrap">
            {role === 'user' ? 'Portal Pengguna' : 'Panel Admin'}
          </span>
          <span aria-hidden="true" className="text-[#C9B3BC] hidden sm:inline">
            /
          </span>
          <h1 className="font-semibold text-[#2D2226] truncate">
            {sectionLabel}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {role === 'user' ? (
          <button
            type="button"
            onClick={onPrimaryAction}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>{hasActiveReading ? 'Lanjutkan Baca' : 'Mulai Membaca'}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onPrimaryAction}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Buku</span>
          </button>
        )}
      </div>
    </header>
  );
}
