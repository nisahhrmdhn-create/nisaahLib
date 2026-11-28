import {
  BookCopy,
  Bookmark,
  BookOpen,
  CalendarClock,
  LayoutDashboard,
  Receipt,
  Settings,
  ShieldCheck,
  User,
  Users,
  X,
} from 'lucide-react';
import {
  AdminNavTab,
  AdminProfile,
  AppRole,
  UserNavTab,
  UserProfile,
} from '../types/library';

interface SidebarProps {
  role: AppRole;
  userTab: UserNavTab;
  adminTab: AdminNavTab;
  userProfile: UserProfile;
  adminProfile: AdminProfile;
  activeUserLoansCount: number;
  unpaidUserFinesCount: number;
  savedBooksCount: number;
  pendingAdminLoansCount: number;
  unpaidAdminFinesCount: number;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onChangeRole: (role: AppRole) => void;
  onSelectUserTab: (tab: UserNavTab) => void;
  onSelectAdminTab: (tab: AdminNavTab) => void;
}

export function Sidebar({
  role,
  userTab,
  adminTab,
  userProfile,
  adminProfile,
  activeUserLoansCount,
  unpaidUserFinesCount,
  savedBooksCount,
  pendingAdminLoansCount,
  unpaidAdminFinesCount,
  mobileOpen,
  onCloseMobile,
  onChangeRole,
  onSelectUserTab,
  onSelectAdminTab,
}: SidebarProps) {
  const userItems: {
    id: UserNavTab;
    label: string;
    icon: typeof BookOpen;
    count?: number;
  }[] = [
    { id: 'katalog', label: 'Katalog Buku', icon: BookOpen },
    {
      id: 'peminjaman',
      label: 'Peminjaman Saya',
      icon: CalendarClock,
      count: activeUserLoansCount || undefined,
    },
    {
      id: 'denda',
      label: 'Denda & Tagihan',
      icon: Receipt,
      count: unpaidUserFinesCount || undefined,
    },
    {
      id: 'rak',
      label: 'Rak Tersimpan',
      icon: Bookmark,
      count: savedBooksCount || undefined,
    },
    { id: 'profil', label: 'Profil Anggota', icon: User },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
  ];

  const adminItems: {
    id: AdminNavTab;
    label: string;
    icon: typeof LayoutDashboard;
    count?: number;
  }[] = [
    { id: 'ringkasan', label: 'Ringkasan Admin', icon: LayoutDashboard },
    { id: 'buku', label: 'Kelola Buku', icon: BookCopy },
    {
      id: 'peminjaman',
      label: 'Kelola Peminjaman',
      icon: CalendarClock,
      count: pendingAdminLoansCount || undefined,
    },
    {
      id: 'denda',
      label: 'Kelola Denda',
      icon: Receipt,
      count: unpaidAdminFinesCount || undefined,
    },
    { id: 'anggota', label: 'Data Anggota', icon: Users },
    { id: 'pengaturan', label: 'Pengaturan Sistem', icon: Settings },
  ];

  const content = (
    <div className="flex flex-col h-full bg-[#FAF2F4] border-r border-[#EEDCE2] w-[264px]">
      {/* Brand Wordmark */}
      <div className="h-16 px-5 border-b border-[#EEDCE2] flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={() => {
            onChangeRole('user');
            onSelectUserTab('katalog');
            onCloseMobile();
          }}
          className="font-serif text-2xl font-semibold tracking-tight text-[#2D2226] whitespace-nowrap shrink-0 cursor-pointer text-left"
        >
          Pustaka Nirmala
        </button>

        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Tutup navigasi"
          className="lg:hidden p-2 rounded-lg text-[#6E5A62] hover:bg-[#F3E2E8] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Role Switcher */}
      <div className="px-4 pt-5 pb-3">
        <p className="text-[11px] font-medium tracking-wider uppercase text-[#8C767F] px-1 mb-2">
          Mode Akses
        </p>
        <div
          role="tablist"
          aria-label="Pilih mode akses"
          className="grid grid-cols-2 gap-1 p-1 bg-[#F1DFE5] rounded-xl"
        >
          <button
            type="button"
            role="tab"
            aria-selected={role === 'user'}
            onClick={() => {
              onChangeRole('user');
              onCloseMobile();
            }}
            className={`inline-flex items-center justify-center gap-1.5 py-2 px-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              role === 'user'
                ? 'bg-[#FFFFFF] text-[#2D2226] shadow-xs'
                : 'text-[#6E5A62] hover:text-[#2D2226]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Pengguna</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={role === 'admin'}
            onClick={() => {
              onChangeRole('admin');
              onCloseMobile();
            }}
            className={`inline-flex items-center justify-center gap-1.5 py-2 px-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              role === 'admin'
                ? 'bg-[#FFFFFF] text-[#2D2226] shadow-xs'
                : 'text-[#6E5A62] hover:text-[#2D2226]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Navigation List */}
      <nav
        aria-label={role === 'user' ? 'Menu Pengguna' : 'Menu Admin'}
        className="flex-1 overflow-y-auto px-3 py-2 space-y-1"
      >
        {role === 'user'
          ? userItems.map((item) => {
              const Icon = item.icon;
              const active = userTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectUserTab(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#B5536E] text-[#FFFFFF]'
                      : 'text-[#5A474E] hover:bg-[#F3E2E8] hover:text-[#2D2226]'
                  }`}
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.count !== undefined && (
                    <span
                      className={`text-xs font-mono tabular-nums ${
                        active ? 'text-[#FFFFFF]/90' : 'text-[#8C767F]'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })
          : adminItems.map((item) => {
              const Icon = item.icon;
              const active = adminTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectAdminTab(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#B5536E] text-[#FFFFFF]'
                      : 'text-[#5A474E] hover:bg-[#F3E2E8] hover:text-[#2D2226]'
                  }`}
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.count !== undefined && (
                    <span
                      className={`text-xs font-mono tabular-nums ${
                        active ? 'text-[#FFFFFF]/90' : 'text-[#8C767F]'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
      </nav>

      {/* Account Footer */}
      <div className="p-4 border-t border-[#EEDCE2] shrink-0">
        <button
          type="button"
          onClick={() => {
            if (role === 'user') {
              onSelectUserTab('profil');
            } else {
              onSelectAdminTab('pengaturan');
            }
            onCloseMobile();
          }}
          className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-[#FFFFFF] border border-[#EEDCE2] hover:border-[#DFC2CC] transition-colors text-left cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-[#F5DCE4] text-[#7D3148] font-serif font-semibold text-base flex items-center justify-center shrink-0">
            {(role === 'user' ? userProfile.name : adminProfile.name)
              .charAt(0)
              .toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[#2D2226] truncate">
              {role === 'user' ? userProfile.name : adminProfile.name}
            </p>
            <p className="text-xs text-[#6E5A62] truncate">
              {role === 'user' ? userProfile.memberCode : adminProfile.roleTitle}
            </p>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Static Sidebar */}
      <aside className="hidden lg:block shrink-0 h-screen sticky top-0">
        {content}
      </aside>

      {/* Mobile Slide-Over Sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex bg-[#2D2226]/40 backdrop-blur-xs"
          onClick={onCloseMobile}
        >
          <div className="h-full" onClick={(e) => e.stopPropagation()}>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
