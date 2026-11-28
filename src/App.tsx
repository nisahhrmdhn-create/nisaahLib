import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { AdminBooksView } from './components/AdminBooksView';
import { AdminDashboardView } from './components/AdminDashboardView';
import {
  AdminFinesView,
  AdminLoansView,
  AdminMembersView,
} from './components/AdminLoansFinesView';
import { AdminSettingsView } from './components/AdminSettingsView';
import { BookDetailModal } from './components/BookDetailModal';
import { BookReader } from './components/BookReader';
import { BorrowModal } from './components/BorrowModal';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { UserCatalogView } from './components/UserCatalogView';
import { UserFinesView } from './components/UserFinesView';
import { UserLoansView } from './components/UserLoansView';
import {
  UserProfileView,
  UserSettingsView,
} from './components/UserProfileSettingsView';
import { UserShelfView } from './components/UserShelfView';
import { BOOKS_CATALOG } from './data/books';
import {
  INITIAL_ADMIN_PROFILE,
  INITIAL_FINES,
  INITIAL_LIBRARY_POLICY,
  INITIAL_LOANS,
  INITIAL_MEMBERS,
  INITIAL_USER_NOTIFICATIONS,
  INITIAL_USER_PROFILE,
} from './data/seedState';
import {
  AdminNavTab,
  AdminProfile,
  AppRole,
  Book,
  BookCategory,
  FineRecord,
  LibraryPolicySettings,
  LoanRecord,
  MemberRecord,
  ReaderSettings,
  ReadingProgress,
  SortOption,
  UserNavTab,
  UserNotificationSettings,
  UserProfile,
} from './types/library';
import { addDaysIso, getDaysDifference, getTodayIso } from './utils/formatters';

const STORAGE_KEYS = {
  books: 'pn_books_v2',
  loans: 'pn_loans_v2',
  fines: 'pn_fines_v2',
  members: 'pn_members_v2',
  userProfile: 'pn_user_profile_v2',
  adminProfile: 'pn_admin_profile_v2',
  userNotif: 'pn_user_notif_v2',
  policy: 'pn_policy_v2',
  bookmarks: 'pn_bookmarks_v2',
  progress: 'pn_progress_v2',
  readerSettings: 'pn_reader_settings_v2',
};

const DEFAULT_READER_SETTINGS: ReaderSettings = {
  theme: 'hangat',
  fontSize: 'sedang',
  fontFamily: 'serif',
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [role, setRole] = useState<AppRole>('user');
  const [userTab, setUserTab] = useState<UserNavTab>('katalog');
  const [adminTab, setAdminTab] = useState<AdminNavTab>('ringkasan');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [books, setBooks] = useState<Book[]>(() =>
    readStorage<Book[]>(STORAGE_KEYS.books, BOOKS_CATALOG)
  );
  const [loans, setLoans] = useState<LoanRecord[]>(() =>
    readStorage<LoanRecord[]>(STORAGE_KEYS.loans, INITIAL_LOANS)
  );
  const [fines, setFines] = useState<FineRecord[]>(() =>
    readStorage<FineRecord[]>(STORAGE_KEYS.fines, INITIAL_FINES)
  );
  const [members, setMembers] = useState<MemberRecord[]>(() =>
    readStorage<MemberRecord[]>(STORAGE_KEYS.members, INITIAL_MEMBERS)
  );
  const [userProfile, setUserProfile] = useState<UserProfile>(() =>
    readStorage<UserProfile>(STORAGE_KEYS.userProfile, INITIAL_USER_PROFILE)
  );
  const [adminProfile, setAdminProfile] = useState<AdminProfile>(() =>
    readStorage<AdminProfile>(STORAGE_KEYS.adminProfile, INITIAL_ADMIN_PROFILE)
  );
  const [userNotifications, setUserNotifications] =
    useState<UserNotificationSettings>(() =>
      readStorage<UserNotificationSettings>(
        STORAGE_KEYS.userNotif,
        INITIAL_USER_NOTIFICATIONS
      )
    );
  const [libraryPolicy, setLibraryPolicy] = useState<LibraryPolicySettings>(
    () =>
      readStorage<LibraryPolicySettings>(
        STORAGE_KEYS.policy,
        INITIAL_LIBRARY_POLICY
      )
  );
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEYS.bookmarks, ['catatan-kebun-sunyi'])
  );
  const [progressMap, setProgressMap] = useState<
    Record<string, ReadingProgress>
  >(() => readStorage<Record<string, ReadingProgress>>(STORAGE_KEYS.progress, {}));
  const [readerSettings, setReaderSettings] = useState<ReaderSettings>(() =>
    readStorage<ReaderSettings>(
      STORAGE_KEYS.readerSettings,
      DEFAULT_READER_SETTINGS
    )
  );

  // Filters & Modals
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<BookCategory>('Semua');
  const [sortBy, setSortBy] = useState<SortOption>('terbaru');

  const [detailBook, setDetailBook] = useState<Book | null>(null);
  const [borrowBook, setBorrowBook] = useState<Book | null>(null);
  const [adminAddBookOpen, setAdminAddBookOpen] = useState(false);
  const [readerState, setReaderState] = useState<{
    book: Book;
    chapterIndex: number;
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Persist states
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.books, JSON.stringify(books));
      window.localStorage.setItem(STORAGE_KEYS.loans, JSON.stringify(loans));
      window.localStorage.setItem(STORAGE_KEYS.fines, JSON.stringify(fines));
      window.localStorage.setItem(STORAGE_KEYS.members, JSON.stringify(members));
      window.localStorage.setItem(
        STORAGE_KEYS.userProfile,
        JSON.stringify(userProfile)
      );
      window.localStorage.setItem(
        STORAGE_KEYS.adminProfile,
        JSON.stringify(adminProfile)
      );
      window.localStorage.setItem(
        STORAGE_KEYS.userNotif,
        JSON.stringify(userNotifications)
      );
      window.localStorage.setItem(
        STORAGE_KEYS.policy,
        JSON.stringify(libraryPolicy)
      );
      window.localStorage.setItem(
        STORAGE_KEYS.bookmarks,
        JSON.stringify(bookmarkedIds)
      );
      window.localStorage.setItem(
        STORAGE_KEYS.progress,
        JSON.stringify(progressMap)
      );
      window.localStorage.setItem(
        STORAGE_KEYS.readerSettings,
        JSON.stringify(readerSettings)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [
    books,
    loans,
    fines,
    members,
    userProfile,
    adminProfile,
    userNotifications,
    libraryPolicy,
    bookmarkedIds,
    progressMap,
    readerSettings,
  ]);

  // Derived data for current user
  const userLoans = useMemo(
    () => loans.filter((l) => l.memberId === userProfile.id),
    [loans, userProfile.id]
  );

  const userFines = useMemo(
    () => fines.filter((f) => f.memberId === userProfile.id),
    [fines, userProfile.id]
  );

  const unpaidUserFineTotal = useMemo(
    () =>
      userFines
        .filter((f) => f.status === 'belum_lunas')
        .reduce((sum, f) => sum + f.amount, 0),
    [userFines]
  );

  const mostRecentProgress = useMemo(() => {
    const entries = Object.values(progressMap);
    if (entries.length === 0) return undefined;
    return entries.sort((a, b) => b.lastReadAt.localeCompare(a.lastReadAt))[0];
  }, [progressMap]);

  const activeRecentBook = useMemo(() => {
    if (!mostRecentProgress) return undefined;
    return books.find((b) => b.id === mostRecentProgress.bookId);
  }, [mostRecentProgress, books]);

  const filteredBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = books.filter((book) => {
      if (selectedCategory !== 'Semua' && book.category !== selectedCategory) {
        return false;
      }
      if (!query) return true;
      return (
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query) ||
        book.synopsis.toLowerCase().includes(query)
      );
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'judul') return a.title.localeCompare(b.title, 'id');
      if (sortBy === 'populer') return b.readCount - a.readCount;
      return b.year - a.year;
    });
  }, [books, searchQuery, selectedCategory, sortBy]);

  // Handlers
  const toggleBookmark = (bookId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  const openBookInReader = (book: Book, chapterIndex?: number) => {
    const targetIndex =
      chapterIndex !== undefined
        ? chapterIndex
        : (progressMap[book.id]?.chapterIndex ?? 0);

    setDetailBook(null);
    setReaderState({ book, chapterIndex: targetIndex });

    if (userNotifications.autoSaveProgress) {
      setProgressMap((prev) => ({
        ...prev,
        [book.id]: {
          bookId: book.id,
          chapterIndex: targetIndex,
          lastReadAt: new Date().toISOString(),
          completedChapters: prev[book.id]?.completedChapters ?? [],
        },
      }));
    }
  };

  const handleChangeReaderChapter = (nextIndex: number) => {
    if (!readerState) return;
    const { book } = readerState;
    setReaderState({ book, chapterIndex: nextIndex });
    if (userNotifications.autoSaveProgress) {
      setProgressMap((prev) => ({
        ...prev,
        [book.id]: {
          bookId: book.id,
          chapterIndex: nextIndex,
          lastReadAt: new Date().toISOString(),
          completedChapters: prev[book.id]?.completedChapters ?? [],
        },
      }));
    }
  };

  const handleMarkChapterComplete = (chapterId: string) => {
    if (!readerState) return;
    const bookId = readerState.book.id;
    setProgressMap((prev) => {
      const existing = prev[bookId] ?? {
        bookId,
        chapterIndex: readerState.chapterIndex,
        lastReadAt: new Date().toISOString(),
        completedChapters: [],
      };
      const done = existing.completedChapters.includes(chapterId);
      return {
        ...prev,
        [bookId]: {
          ...existing,
          lastReadAt: new Date().toISOString(),
          completedChapters: done
            ? existing.completedChapters
            : [...existing.completedChapters, chapterId],
        },
      };
    });
  };

  const handleConfirmBorrow = (book: Book, durationDays: number, notes: string) => {
    const activeCount = userLoans.filter(
      (l) => l.status !== 'dikembalikan'
    ).length;

    if (userProfile.status === 'ditangguhkan') {
      showToast('Keanggotaan sedang ditangguhkan. Hubungi admin perpustakaan.');
      setBorrowBook(null);
      return;
    }

    if (activeCount >= libraryPolicy.maxActiveLoansPerUser) {
      showToast(
        `Batas maksimal peminjaman (${libraryPolicy.maxActiveLoansPerUser} buku) telah tercapai.`
      );
      setBorrowBook(null);
      return;
    }

    const today = getTodayIso();
    const dueDate = addDaysIso(today, durationDays);
    const newLoan: LoanRecord = {
      id: `LN-2026-${Math.floor(200 + Math.random() * 799)}`,
      bookId: book.id,
      memberId: userProfile.id,
      memberName: userProfile.name,
      borrowDate: today,
      dueDate,
      durationDays,
      status: libraryPolicy.autoApproveLoans ? 'dipinjam' : 'menunggu',
      notes: notes || undefined,
    };

    setLoans((prev) => [newLoan, ...prev]);
    setBooks((prev) =>
      prev.map((b) =>
        b.id === book.id
          ? { ...b, availableStock: Math.max(0, b.availableStock - 1) }
          : b
      )
    );
    setMembers((prev) =>
      prev.map((m) =>
        m.id === userProfile.id
          ? { ...m, activeLoansCount: m.activeLoansCount + 1 }
          : m
      )
    );
    setBorrowBook(null);
    showToast(
      libraryPolicy.autoApproveLoans
        ? `Berhasil meminjam "${book.title}" hingga ${dueDate}.`
        : `Permohonan pinjam "${book.title}" dikirim ke Admin.`
    );
  };

  const handleExtendLoan = (loanId: string) => {
    setLoans((prev) =>
      prev.map((l) =>
        l.id === loanId
          ? {
              ...l,
              dueDate: addDaysIso(l.dueDate, 7),
              durationDays: l.durationDays + 7,
            }
          : l
      )
    );
    showToast('Masa peminjaman diperpanjang 7 hari.');
  };

  const handleReturnLoan = (loanId: string) => {
    const target = loans.find((l) => l.id === loanId);
    if (!target || target.status === 'dikembalikan') return;

    const today = getTodayIso();
    setLoans((prev) =>
      prev.map((l) =>
        l.id === loanId
          ? { ...l, status: 'dikembalikan', returnDate: today }
          : l
      )
    );

    setBooks((prev) =>
      prev.map((b) =>
        b.id === target.bookId
          ? { ...b, availableStock: Math.min(b.stock, b.availableStock + 1) }
          : b
      )
    );

    setMembers((prev) =>
      prev.map((m) =>
        m.id === target.memberId
          ? { ...m, activeLoansCount: Math.max(0, m.activeLoansCount - 1) }
          : m
      )
    );

    showToast('Buku berhasil dikembalikan ke koleksi perpustakaan.');
  };

  const handleApproveLoan = (loanId: string) => {
    setLoans((prev) =>
      prev.map((l) => (l.id === loanId ? { ...l, status: 'dipinjam' } : l))
    );
    showToast('Peminjaman disetujui dan berstatus aktif.');
  };

  const handleSimulateOverdue = (loanId: string) => {
    const target = loans.find((l) => l.id === loanId);
    if (!target) return;

    const today = getTodayIso();
    const pastDue = addDaysIso(today, -3);
    const daysLate = Math.max(1, getDaysDifference(pastDue, today));
    const amount = daysLate * libraryPolicy.dailyFineRate;

    setLoans((prev) =>
      prev.map((l) =>
        l.id === loanId ? { ...l, status: 'terlambat', dueDate: pastDue } : l
      )
    );

    const alreadyHasFine = fines.some(
      (f) => f.loanId === loanId && f.status === 'belum_lunas'
    );
    if (!alreadyHasFine) {
      const newFine: FineRecord = {
        id: `FN-2026-${Math.floor(100 + Math.random() * 899)}`,
        loanId: target.id,
        bookId: target.bookId,
        memberId: target.memberId,
        memberName: target.memberName,
        daysLate,
        dailyRate: libraryPolicy.dailyFineRate,
        amount,
        status: 'belum_lunas',
        createdAt: today,
      };
      setFines((prev) => [newFine, ...prev]);
    }
    showToast('Status keterlambatan dicatat & tagihan denda diterbitkan.');
  };

  const handlePayFine = (fineId: string, paymentMethod: string) => {
    const today = getTodayIso();
    setFines((prev) =>
      prev.map((f) =>
        f.id === fineId
          ? { ...f, status: 'lunas', paidAt: today, paymentMethod }
          : f
      )
    );
    showToast(`Pembayaran denda melalui ${paymentMethod} berhasil.`);
  };

  const handleMarkFinePaidAdmin = (fineId: string) => {
    const today = getTodayIso();
    setFines((prev) =>
      prev.map((f) =>
        f.id === fineId
          ? {
              ...f,
              status: 'lunas',
              paidAt: today,
              paymentMethod: 'Loket Admin',
            }
          : f
      )
    );
    showToast('Tagihan denda ditandai lunas.');
  };

  const handleWaiveFineAdmin = (fineId: string) => {
    setFines((prev) =>
      prev.map((f) =>
        f.id === fineId
          ? { ...f, status: 'dibebaskan', paymentMethod: 'Dibebaskan Admin' }
          : f
      )
    );
    showToast('Tagihan denda dibebaskan.');
  };

  const handleResetAllData = () => {
    Object.values(STORAGE_KEYS).forEach((k) => window.localStorage.removeItem(k));
    setBooks(BOOKS_CATALOG);
    setLoans(INITIAL_LOANS);
    setFines(INITIAL_FINES);
    setMembers(INITIAL_MEMBERS);
    setUserProfile(INITIAL_USER_PROFILE);
    setAdminProfile(INITIAL_ADMIN_PROFILE);
    setUserNotifications(INITIAL_USER_NOTIFICATIONS);
    setLibraryPolicy(INITIAL_LIBRARY_POLICY);
    setBookmarkedIds(['catatan-kebun-sunyi']);
    setProgressMap({});
    setReaderSettings(DEFAULT_READER_SETTINGS);
    showToast('Seluruh data lokal dikembalikan ke kondisi awal.');
  };

  const handleTopPrimaryAction = () => {
    if (role === 'user') {
      if (activeRecentBook && mostRecentProgress) {
        openBookInReader(activeRecentBook, mostRecentProgress.chapterIndex);
      } else if (books[0]) {
        openBookInReader(books[0], 0);
      }
    } else {
      setAdminTab('buku');
      setAdminAddBookOpen(true);
    }
  };

  const activeBorrowedBookIds = userLoans
    .filter((l) => l.status !== 'dikembalikan')
    .map((l) => l.bookId);

  return (
    <div className="min-h-screen flex bg-[#FDF9FA] text-[#2D2226]">
      <Sidebar
        role={role}
        userTab={userTab}
        adminTab={adminTab}
        userProfile={userProfile}
        adminProfile={adminProfile}
        activeUserLoansCount={
          userLoans.filter((l) => l.status !== 'dikembalikan').length
        }
        unpaidUserFinesCount={
          userFines.filter((f) => f.status === 'belum_lunas').length
        }
        savedBooksCount={bookmarkedIds.length}
        pendingAdminLoansCount={
          loans.filter(
            (l) => l.status === 'menunggu' || l.status === 'terlambat'
          ).length
        }
        unpaidAdminFinesCount={
          fines.filter((f) => f.status === 'belum_lunas').length
        }
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        onChangeRole={setRole}
        onSelectUserTab={setUserTab}
        onSelectAdminTab={setAdminTab}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <TopHeader
          role={role}
          userTab={userTab}
          adminTab={adminTab}
          hasActiveReading={Boolean(activeRecentBook)}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          onPrimaryAction={handleTopPrimaryAction}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {role === 'user' ? (
            <>
              {userTab === 'katalog' && (
                <UserCatalogView
                  books={filteredBooks}
                  allBooksCount={books.length}
                  userProfile={userProfile}
                  activeLoans={userLoans}
                  unpaidFineTotal={unpaidUserFineTotal}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  bookmarkedIds={bookmarkedIds}
                  progressMap={progressMap}
                  onToggleBookmark={toggleBookmark}
                  onSelectDetail={(b) => setDetailBook(b)}
                  onReadBook={(b) => openBookInReader(b)}
                  onBorrowBook={(b) => setBorrowBook(b)}
                  onNavigateLoans={() => setUserTab('peminjaman')}
                  onNavigateFines={() => setUserTab('denda')}
                />
              )}

              {userTab === 'peminjaman' && (
                <UserLoansView
                  loans={userLoans}
                  books={books}
                  policy={libraryPolicy}
                  onExtendLoan={handleExtendLoan}
                  onReturnLoan={handleReturnLoan}
                  onReadBook={(b) => openBookInReader(b)}
                  onBrowseCatalog={() => setUserTab('katalog')}
                />
              )}

              {userTab === 'denda' && (
                <UserFinesView
                  fines={userFines}
                  books={books}
                  policy={libraryPolicy}
                  onPayFine={handlePayFine}
                />
              )}

              {userTab === 'rak' && (
                <UserShelfView
                  books={books}
                  bookmarkedIds={bookmarkedIds}
                  progressMap={progressMap}
                  onReadBook={openBookInReader}
                  onRemoveBookmark={toggleBookmark}
                  onBrowseCatalog={() => setUserTab('katalog')}
                />
              )}

              {userTab === 'profil' && (
                <UserProfileView
                  profile={userProfile}
                  totalLoansCount={userLoans.length}
                  booksReadCount={Object.keys(progressMap).length}
                  onSaveProfile={(next) => {
                    setUserProfile(next);
                    setMembers((prev) =>
                      prev.map((m) =>
                        m.id === next.id
                          ? { ...m, name: next.name, email: next.email }
                          : m
                      )
                    );
                    showToast('Profil anggota berhasil diperbarui.');
                  }}
                />
              )}

              {userTab === 'pengaturan' && (
                <UserSettingsView
                  readerSettings={readerSettings}
                  notifications={userNotifications}
                  onUpdateReaderSettings={setReaderSettings}
                  onUpdateNotifications={setUserNotifications}
                  onResetAllData={handleResetAllData}
                />
              )}
            </>
          ) : (
            <>
              {adminTab === 'ringkasan' && (
                <AdminDashboardView
                  books={books}
                  loans={loans}
                  fines={fines}
                  onNavigateTab={setAdminTab}
                  onApproveLoan={handleApproveLoan}
                  onReturnLoan={handleReturnLoan}
                />
              )}

              {adminTab === 'buku' && (
                <AdminBooksView
                  books={books}
                  addModalOpen={adminAddBookOpen}
                  onOpenAddModal={() => setAdminAddBookOpen(true)}
                  onCloseAddModal={() => setAdminAddBookOpen(false)}
                  onAddBook={(newBook) => {
                    setBooks((prev) => [newBook, ...prev]);
                    showToast(`Buku "${newBook.title}" ditambahkan ke katalog.`);
                  }}
                  onUpdateBook={(updated) => {
                    setBooks((prev) =>
                      prev.map((b) => (b.id === updated.id ? updated : b))
                    );
                    showToast(`Data "${updated.title}" berhasil diperbarui.`);
                  }}
                  onDeleteBook={(bookId) => {
                    setBooks((prev) => prev.filter((b) => b.id !== bookId));
                    showToast('Buku dihapus dari koleksi.');
                  }}
                />
              )}

              {adminTab === 'peminjaman' && (
                <AdminLoansView
                  loans={loans}
                  books={books}
                  onApproveLoan={handleApproveLoan}
                  onReturnLoan={handleReturnLoan}
                  onExtendLoan={handleExtendLoan}
                  onSimulateOverdue={handleSimulateOverdue}
                />
              )}

              {adminTab === 'denda' && (
                <AdminFinesView
                  fines={fines}
                  books={books}
                  onMarkFinePaid={handleMarkFinePaidAdmin}
                  onWaiveFine={handleWaiveFineAdmin}
                />
              )}

              {adminTab === 'anggota' && (
                <AdminMembersView
                  members={members}
                  onToggleMemberStatus={(memberId) => {
                    setMembers((prev) =>
                      prev.map((m) => {
                        if (m.id !== memberId) return m;
                        const nextStatus =
                          m.status === 'aktif' ? 'ditangguhkan' : 'aktif';
                        if (m.id === userProfile.id) {
                          setUserProfile((up) => ({
                            ...up,
                            status: nextStatus,
                          }));
                        }
                        return { ...m, status: nextStatus };
                      })
                    );
                    showToast('Status keanggotaan diperbarui.');
                  }}
                />
              )}

              {adminTab === 'pengaturan' && (
                <AdminSettingsView
                  policy={libraryPolicy}
                  adminProfile={adminProfile}
                  onSavePolicy={(next) => {
                    setLibraryPolicy(next);
                    showToast('Kebijakan perpustakaan disimpan.');
                  }}
                  onSaveAdminProfile={setAdminProfile}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Modals & Reader */}
      <BookDetailModal
        book={detailBook}
        isBookmarked={
          detailBook ? bookmarkedIds.includes(detailBook.id) : false
        }
        isBorrowedByUser={
          detailBook ? activeBorrowedBookIds.includes(detailBook.id) : false
        }
        progress={detailBook ? progressMap[detailBook.id] : undefined}
        onClose={() => setDetailBook(null)}
        onToggleBookmark={toggleBookmark}
        onBorrowBook={(b) => setBorrowBook(b)}
        onReadChapter={openBookInReader}
      />

      <BorrowModal
        book={borrowBook}
        policy={libraryPolicy}
        onClose={() => setBorrowBook(null)}
        onConfirmBorrow={handleConfirmBorrow}
      />

      {readerState && (
        <BookReader
          book={readerState.book}
          chapterIndex={readerState.chapterIndex}
          isBookmarked={bookmarkedIds.includes(readerState.book.id)}
          settings={readerSettings}
          completedChapters={
            progressMap[readerState.book.id]?.completedChapters ?? []
          }
          onClose={() => setReaderState(null)}
          onChangeChapter={handleChangeReaderChapter}
          onMarkChapterComplete={handleMarkChapterComplete}
          onToggleBookmark={() => toggleBookmark(readerState.book.id)}
          onUpdateSettings={setReaderSettings}
        />
      )}

      {/* Subtle Toast Confirmation */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#2D2226] text-[#FDF9FA] text-sm rounded-xl shadow-lg max-w-sm"
        >
          <CheckCircle2 className="w-4 h-4 text-[#F3B5C6] shrink-0" />
          <span className="flex-1">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            aria-label="Tutup notifikasi"
            className="p-1 text-[#D7BFC7] hover:text-[#FFFFFF] cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
