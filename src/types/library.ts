export type BookCategory =
  | 'Semua'
  | 'Sastra & Puisi'
  | 'Filsafat'
  | 'Arsitektur'
  | 'Sejarah'
  | 'Esai & Budaya';

export type SortOption = 'terbaru' | 'judul' | 'populer';

export type ReaderTheme = 'hangat' | 'terang' | 'malam';
export type ReaderFontSize = 'kecil' | 'sedang' | 'besar';
export type ReaderFontFamily = 'serif' | 'sans';

export type AppRole = 'user' | 'admin';

export type UserNavTab =
  | 'katalog'
  | 'peminjaman'
  | 'denda'
  | 'rak'
  | 'profil'
  | 'pengaturan';

export type AdminNavTab =
  | 'ringkasan'
  | 'buku'
  | 'peminjaman'
  | 'denda'
  | 'anggota'
  | 'pengaturan';

export interface Chapter {
  id: string;
  number: string;
  title: string;
  readingTimeMinutes: number;
  paragraphs: string[];
  editorNote?: string;
}

export interface Book {
  id: string;
  catalogNumber: string;
  title: string;
  subtitle: string;
  author: string;
  authorBio: string;
  category: Exclude<BookCategory, 'Semua'>;
  year: number;
  pages: number;
  language: string;
  publisher: string;
  isbn: string;
  readCount: number;
  readingMinutes: number;
  stock: number;
  availableStock: number;
  coverImage?: string;
  clothColor: string;
  clothAccent: string;
  featuredQuote: string;
  synopsis: string;
  chapters: Chapter[];
}

export interface ReadingProgress {
  bookId: string;
  chapterIndex: number;
  lastReadAt: string;
  completedChapters: string[];
}

export interface ReaderSettings {
  theme: ReaderTheme;
  fontSize: ReaderFontSize;
  fontFamily: ReaderFontFamily;
}

export type LoanStatus = 'menunggu' | 'dipinjam' | 'terlambat' | 'dikembalikan';

export interface LoanRecord {
  id: string;
  bookId: string;
  memberId: string;
  memberName: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  durationDays: number;
  status: LoanStatus;
  notes?: string;
}

export type FineStatus = 'belum_lunas' | 'lunas' | 'dibebaskan';

export interface FineRecord {
  id: string;
  loanId: string;
  bookId: string;
  memberId: string;
  memberName: string;
  daysLate: number;
  dailyRate: number;
  amount: number;
  status: FineStatus;
  createdAt: string;
  paidAt?: string;
  paymentMethod?: string;
}

export interface UserProfile {
  id: string;
  memberCode: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinedAt: string;
  bio: string;
  status: 'aktif' | 'ditangguhkan';
}

export interface AdminProfile {
  name: string;
  email: string;
  roleTitle: string;
  department: string;
}

export interface MemberRecord {
  id: string;
  memberCode: string;
  name: string;
  email: string;
  joinedAt: string;
  status: 'aktif' | 'ditangguhkan';
  activeLoansCount: number;
}

export interface UserNotificationSettings {
  dueReminderH3: boolean;
  dueReminderH1: boolean;
  weeklyDigest: boolean;
  autoSaveProgress: boolean;
}

export interface LibraryPolicySettings {
  dailyFineRate: number;
  maxLoanDays: number;
  maxActiveLoansPerUser: number;
  autoApproveLoans: boolean;
  libraryName: string;
  supportEmail: string;
}
