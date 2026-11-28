import { useState } from 'react';
import { Check, RotateCcw, Save } from 'lucide-react';
import {
  ReaderFontFamily,
  ReaderFontSize,
  ReaderSettings,
  ReaderTheme,
  UserNotificationSettings,
  UserProfile,
} from '../types/library';
import { formatDateId } from '../utils/formatters';

interface UserProfileViewProps {
  profile: UserProfile;
  totalLoansCount: number;
  booksReadCount: number;
  onSaveProfile: (next: UserProfile) => void;
}

export function UserProfileView({
  profile,
  totalLoansCount,
  booksReadCount,
  onSaveProfile,
}: UserProfileViewProps) {
  const [form, setForm] = useState<UserProfile>(profile);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(form);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Digital Member Card */}
      <div className="lg:col-span-5 space-y-5">
        <div className="bg-gradient-to-br from-[#F9E3EA] via-[#FDF5F7] to-[#F3D7E1] border border-[#E7C6D1] rounded-2xl p-6 text-[#2D2226] shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <span className="font-serif text-xl font-semibold">
              Pustaka Nirmala
            </span>
            <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[#FFFFFF]/80 text-[#783447] tabular-nums">
              {profile.memberCode}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#B5536E] text-[#FFFFFF] font-serif text-2xl font-semibold flex items-center justify-center shrink-0">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-serif text-2xl font-semibold truncate">
                {profile.name}
              </p>
              <p className="text-xs text-[#6E5A62] truncate">{profile.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E5C5D0] text-xs">
            <div>
              <p className="text-[#7E656E]">Status</p>
              <p className="font-semibold text-[#1E6B45] mt-0.5 capitalize">
                {profile.status}
              </p>
            </div>
            <div>
              <p className="text-[#7E656E]">Pinjaman</p>
              <p className="font-semibold tabular-nums mt-0.5">
                {totalLoansCount} kali
              </p>
            </div>
            <div>
              <p className="text-[#7E656E]">Bergabung</p>
              <p className="font-semibold tabular-nums mt-0.5">
                {formatDateId(profile.joinedAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-5 space-y-2">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#8C767F]">
            Ringkasan Aktivitas Literasi
          </p>
          <p className="text-sm text-[#4A3A40] tabular-nums">
            Anda telah membaca <strong className="text-[#2D2226]">{booksReadCount} buku</strong> di ruang baca daring dan menyelesaikan total{' '}
            <strong className="text-[#2D2226]">{totalLoansCount} transaksi</strong> peminjaman.
          </p>
        </div>
      </div>

      {/* Edit Profile Form */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-7 bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-6 sm:p-8 space-y-5"
      >
        <div className="flex items-center justify-between border-b border-[#F2E3E8] pb-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#2D2226]">
              Informasi Profil Anggota
            </h2>
            <p className="text-xs text-[#6E5A62] mt-0.5">
              Perbarui data kontak dan preferensi biodata anggota Anda.
            </p>
          </div>
          {savedNotice && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1E6B45]">
              <Check className="w-4 h-4" />
              Tersimpan
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#6E5A62] mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl text-[#2D2226] focus:outline-none focus:border-[#B5536E]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6E5A62] mb-1.5">
              Alamat Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl text-[#2D2226] focus:outline-none focus:border-[#B5536E]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6E5A62] mb-1.5">
              Nomor Telepon
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl text-[#2D2226] focus:outline-none focus:border-[#B5536E]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6E5A62] mb-1.5">
              Kode Anggota
            </label>
            <input
              type="text"
              disabled
              value={form.memberCode}
              className="w-full px-3.5 py-2.5 text-sm font-mono bg-[#FAF2F4] border border-[#EEDCE2] rounded-xl text-[#8C767F]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#6E5A62] mb-1.5">
            Alamat Domisili
          </label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl text-[#2D2226] focus:outline-none focus:border-[#B5536E]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#6E5A62] mb-1.5">
            Minat Bacaan
          </label>
          <textarea
            rows={3}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl text-[#2D2226] focus:outline-none focus:border-[#B5536E]"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-xl transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </form>
    </div>
  );
}

interface UserSettingsViewProps {
  readerSettings: ReaderSettings;
  notifications: UserNotificationSettings;
  onUpdateReaderSettings: (next: ReaderSettings) => void;
  onUpdateNotifications: (next: UserNotificationSettings) => void;
  onResetAllData: () => void;
}

export function UserSettingsView({
  readerSettings,
  notifications,
  onUpdateReaderSettings,
  onUpdateNotifications,
  onResetAllData,
}: UserSettingsViewProps) {
  return (
    <div className="max-w-3xl space-y-6">
      {/* Reader Appearance */}
      <section className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-6 space-y-5">
        <div className="border-b border-[#F2E3E8] pb-4">
          <h2 className="font-serif text-2xl font-semibold text-[#2D2226]">
            Preferensi Ruang Baca
          </h2>
          <p className="text-xs text-[#6E5A62] mt-0.5">
            Atur tema warna kertas dan tipografi bawaan saat membaca buku secara daring.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs font-medium text-[#6E5A62] mb-2">Tema Kertas</p>
            <div className="space-y-1.5">
              {(
                [
                  { id: 'hangat', label: 'Blush Hangat' },
                  { id: 'terang', label: 'Putih Tenang' },
                  { id: 'malam', label: 'Malam Teduh' },
                ] as { id: ReaderTheme; label: string }[]
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    onUpdateReaderSettings({ ...readerSettings, theme: item.id })
                  }
                  className={`w-full text-left px-3.5 py-2 text-sm rounded-xl border transition-colors cursor-pointer ${
                    readerSettings.theme === item.id
                      ? 'bg-[#FAF2F4] border-[#B5536E] font-medium text-[#2D2226]'
                      : 'border-[#EEDCE2] text-[#6E5A62] hover:bg-[#FDF9FA]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-[#6E5A62] mb-2">Ukuran Huruf</p>
            <div className="space-y-1.5">
              {(
                [
                  { id: 'kecil', label: 'Kecil (16px)' },
                  { id: 'sedang', label: 'Sedang (18px)' },
                  { id: 'besar', label: 'Besar (21px)' },
                ] as { id: ReaderFontSize; label: string }[]
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    onUpdateReaderSettings({
                      ...readerSettings,
                      fontSize: item.id,
                    })
                  }
                  className={`w-full text-left px-3.5 py-2 text-sm rounded-xl border transition-colors cursor-pointer ${
                    readerSettings.fontSize === item.id
                      ? 'bg-[#FAF2F4] border-[#B5536E] font-medium text-[#2D2226]'
                      : 'border-[#EEDCE2] text-[#6E5A62] hover:bg-[#FDF9FA]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-[#6E5A62] mb-2">Jenis Huruf</p>
            <div className="space-y-1.5">
              {(
                [
                  { id: 'serif', label: 'Serif Klasik' },
                  { id: 'sans', label: 'Sans Bersih' },
                ] as { id: ReaderFontFamily; label: string }[]
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    onUpdateReaderSettings({
                      ...readerSettings,
                      fontFamily: item.id,
                    })
                  }
                  className={`w-full text-left px-3.5 py-2 text-sm rounded-xl border transition-colors cursor-pointer ${
                    readerSettings.fontFamily === item.id
                      ? 'bg-[#FAF2F4] border-[#B5536E] font-medium text-[#2D2226]'
                      : 'border-[#EEDCE2] text-[#6E5A62] hover:bg-[#FDF9FA]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-6 space-y-4">
        <div className="border-b border-[#F2E3E8] pb-4">
          <h2 className="font-serif text-2xl font-semibold text-[#2D2226]">
            Pengingat & Notifikasi
          </h2>
          <p className="text-xs text-[#6E5A62] mt-0.5">
            Kelola pengingat pengembalian buku agar terhindar dari keterlambatan.
          </p>
        </div>

        {(
          [
            {
              key: 'dueReminderH3',
              title: 'Pengingat H-3 Jatuh Tempo',
              desc: 'Tampilkan pengingat tiga hari sebelum batas pengembalian buku.',
            },
            {
              key: 'dueReminderH1',
              title: 'Pengingat H-1 Jatuh Tempo',
              desc: 'Notifikasi prioritas sehari sebelum masa pinjam berakhir.',
            },
            {
              key: 'weeklyDigest',
              title: 'Rekomendasi Bacaan Mingguan',
              desc: 'Terima kurasi judul baru setiap akhir pekan.',
            },
            {
              key: 'autoSaveProgress',
              title: 'Simpan Progres Bab Otomatis',
              desc: 'Catat bab terakhir yang Anda baca di browser ini.',
            },
          ] as {
            key: keyof UserNotificationSettings;
            title: string;
            desc: string;
          }[]
        ).map((item) => {
          const checked = notifications[item.key];
          return (
            <label
              key={item.key}
              className="flex items-center justify-between gap-4 py-2 cursor-pointer"
            >
              <div>
                <p className="text-sm font-medium text-[#2D2226]">{item.title}</p>
                <p className="text-xs text-[#6E5A62]">{item.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) =>
                  onUpdateNotifications({
                    ...notifications,
                    [item.key]: e.target.checked,
                  })
                }
                className="w-5 h-5 accent-[#B5536E] rounded cursor-pointer shrink-0"
              />
            </label>
          );
        })}
      </section>

      {/* Reset Local Data */}
      <section className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-[#2D2226]">
            Pulihkan Data Awal Perpustakaan
          </h3>
          <p className="text-xs text-[#6E5A62] mt-0.5">
            Mengembalikan data pinjaman, denda, dan koleksi ke kondisi awal bawaan.
          </p>
        </div>
        <button
          type="button"
          onClick={onResetAllData}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#A62639] bg-[#FDE8EA] hover:bg-[#FAD6DA] rounded-xl cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Data Lokal</span>
        </button>
      </section>
    </div>
  );
}
