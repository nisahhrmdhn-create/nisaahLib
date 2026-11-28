import { useState } from 'react';
import { Check, Save } from 'lucide-react';
import { AdminProfile, LibraryPolicySettings } from '../types/library';

interface AdminSettingsViewProps {
  policy: LibraryPolicySettings;
  adminProfile: AdminProfile;
  onSavePolicy: (next: LibraryPolicySettings) => void;
  onSaveAdminProfile: (next: AdminProfile) => void;
}

export function AdminSettingsView({
  policy,
  adminProfile,
  onSavePolicy,
  onSaveAdminProfile,
}: AdminSettingsViewProps) {
  const [policyForm, setPolicyForm] = useState<LibraryPolicySettings>(policy);
  const [profileForm, setProfileForm] = useState<AdminProfile>(adminProfile);
  const [savedFlag, setSavedFlag] = useState(false);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePolicy(policyForm);
    onSaveAdminProfile(profileForm);
    setSavedFlag(true);
    setTimeout(() => setSavedFlag(false), 2500);
  };

  return (
    <form onSubmit={handleSaveAll} className="max-w-4xl space-y-6">
      {/* Library Circulation & Fine Policy */}
      <section className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between border-b border-[#F2E3E8] pb-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#2D2226]">
              Kebijakan Peminjaman & Denda
            </h2>
            <p className="text-xs text-[#6E5A62] mt-0.5">
              Perubahan aturan berlaku langsung pada seluruh transaksi peminjaman anggota.
            </p>
          </div>
          {savedFlag && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1E6B45]">
              <Check className="w-4 h-4" />
              Pengaturan Disimpan
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#6E5A62] mb-1.5">
              Tarif Denda per Hari (Rp)
            </label>
            <input
              type="number"
              min={0}
              step={500}
              required
              value={policyForm.dailyFineRate}
              onChange={(e) =>
                setPolicyForm({
                  ...policyForm,
                  dailyFineRate: Number(e.target.value),
                })
              }
              className="w-full px-3.5 py-2.5 text-sm font-mono bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl tabular-nums focus:outline-none focus:border-[#B5536E]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6E5A62] mb-1.5">
              Maksimal Durasi Pinjam (Hari)
            </label>
            <input
              type="number"
              min={3}
              max={60}
              required
              value={policyForm.maxLoanDays}
              onChange={(e) =>
                setPolicyForm({
                  ...policyForm,
                  maxLoanDays: Number(e.target.value),
                })
              }
              className="w-full px-3.5 py-2.5 text-sm font-mono bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl tabular-nums focus:outline-none focus:border-[#B5536E]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6E5A62] mb-1.5">
              Maksimal Buku per Anggota
            </label>
            <input
              type="number"
              min={1}
              max={15}
              required
              value={policyForm.maxActiveLoansPerUser}
              onChange={(e) =>
                setPolicyForm({
                  ...policyForm,
                  maxActiveLoansPerUser: Number(e.target.value),
                })
              }
              className="w-full px-3.5 py-2.5 text-sm font-mono bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl tabular-nums focus:outline-none focus:border-[#B5536E]"
            />
          </div>
        </div>

        <label className="flex items-center justify-between gap-4 pt-2 cursor-pointer">
          <div>
            <p className="text-sm font-medium text-[#2D2226]">
              Persetujuan Otomatis Peminjaman Daring
            </p>
            <p className="text-xs text-[#6E5A62]">
              Jika diaktifkan, permintaan peminjaman dari pengguna langsung aktif tanpa antre persetujuan manual.
            </p>
          </div>
          <input
            type="checkbox"
            checked={policyForm.autoApproveLoans}
            onChange={(e) =>
              setPolicyForm({
                ...policyForm,
                autoApproveLoans: e.target.checked,
              })
            }
            className="w-5 h-5 accent-[#B5536E] rounded cursor-pointer shrink-0"
          />
        </label>
      </section>

      {/* Admin Profile */}
      <section className="bg-[#FFFFFF] border border-[#EEDCE2] rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="border-b border-[#F2E3E8] pb-4">
          <h2 className="font-serif text-2xl font-semibold text-[#2D2226]">
            Profil Pengelola & Identitas Perpustakaan
          </h2>
          <p className="text-xs text-[#6E5A62] mt-0.5">
            Informasi akun admin dan kontak resmi layanan perpustakaan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#6E5A62] mb-1.5">
              Nama Admin
            </label>
            <input
              type="text"
              required
              value={profileForm.name}
              onChange={(e) =>
                setProfileForm({ ...profileForm, name: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl focus:outline-none focus:border-[#B5536E]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6E5A62] mb-1.5">
              Jabatan
            </label>
            <input
              type="text"
              value={profileForm.roleTitle}
              onChange={(e) =>
                setProfileForm({ ...profileForm, roleTitle: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl focus:outline-none focus:border-[#B5536E]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6E5A62] mb-1.5">
              Email Pengelola
            </label>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) =>
                setProfileForm({ ...profileForm, email: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl focus:outline-none focus:border-[#B5536E]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6E5A62] mb-1.5">
              Email Layanan Anggota
            </label>
            <input
              type="email"
              value={policyForm.supportEmail}
              onChange={(e) =>
                setPolicyForm({ ...policyForm, supportEmail: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9FA] border border-[#EEDCE2] rounded-xl focus:outline-none focus:border-[#B5536E]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#FFFFFF] bg-[#B5536E] hover:bg-[#9E435C] rounded-xl transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Pengaturan</span>
          </button>
        </div>
      </section>
    </form>
  );
}
