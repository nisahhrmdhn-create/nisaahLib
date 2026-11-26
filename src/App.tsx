import { useEffect, useMemo, useState } from 'react';
import { BookDetailModal } from './components/BookDetailModal';
import { BookReader } from './components/BookReader';
import { CatalogSection } from './components/CatalogSection';
import { FeaturedSpotlight } from './components/FeaturedSpotlight';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ReadingShelfDrawer } from './components/ReadingShelfDrawer';
import { BOOKS_CATALOG } from './data/books';
import {
  Book,
  BookCategory,
  ReaderSettings,
  ReadingProgress,
  SortOption,
} from './types/library';

const STORAGE_BOOKMARKS = 'pustaka_nirmala_bookmarks_v1';
const STORAGE_PROGRESS = 'pustaka_nirmala_progress_v1';
const STORAGE_SETTINGS = 'pustaka_nirmala_reader_settings_v1';

const DEFAULT_SETTINGS: ReaderSettings = {
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<BookCategory>('Semua');
  const [sortBy, setSortBy] = useState<SortOption>('terbaru');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_BOOKMARKS, ['catatan-kebun-sunyi'])
  );
  const [progressMap, setProgressMap] = useState<
    Record<string, ReadingProgress>
  >(() => readStorage<Record<string, ReadingProgress>>(STORAGE_PROGRESS, {}));
  const [readerSettings, setReaderSettings] = useState<ReaderSettings>(() =>
    readStorage<ReaderSettings>(STORAGE_SETTINGS, DEFAULT_SETTINGS)
  );

  const [detailBook, setDetailBook] = useState<Book | null>(null);
  const [readerState, setReaderState] = useState<{
    book: Book;
    chapterIndex: number;
  } | null>(null);
  const [shelfOpen, setShelfOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_BOOKMARKS,
        JSON.stringify(bookmarkedIds)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(progressMap));
    } catch {
      // Ignore storage quota errors
    }
  }, [progressMap]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_SETTINGS,
        JSON.stringify(readerSettings)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [readerSettings]);

  const mostRecentProgress = useMemo(() => {
    const entries = Object.values(progressMap);
    if (entries.length === 0) return undefined;
    return entries.sort((a, b) => b.lastReadAt.localeCompare(a.lastReadAt))[0];
  }, [progressMap]);

  const activeRecentBook = useMemo(() => {
    if (!mostRecentProgress) return undefined;
    return BOOKS_CATALOG.find((b) => b.id === mostRecentProgress.bookId);
  }, [mostRecentProgress]);

  const filteredBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = BOOKS_CATALOG.filter((book) => {
      if (selectedCategory !== 'Semua' && book.category !== selectedCategory) {
        return false;
      }
      if (onlyBookmarked && !bookmarkedIds.includes(book.id)) {
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
      if (sortBy === 'judul') {
        return a.title.localeCompare(b.title, 'id');
      }
      if (sortBy === 'populer') {
        return b.readCount - a.readCount;
      }
      return b.year - a.year;
    });
  }, [searchQuery, selectedCategory, sortBy, onlyBookmarked, bookmarkedIds]);

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
    setShelfOpen(false);
    setReaderState({ book, chapterIndex: targetIndex });

    setProgressMap((prev) => {
      const existing = prev[book.id];
      return {
        ...prev,
        [book.id]: {
          bookId: book.id,
          chapterIndex: targetIndex,
          lastReadAt: new Date().toISOString(),
          completedChapters: existing?.completedChapters ?? [],
        },
      };
    });
  };

  const handleChangeReaderChapter = (nextIndex: number) => {
    if (!readerState) return;
    const { book } = readerState;
    setReaderState({ book, chapterIndex: nextIndex });
    setProgressMap((prev) => {
      const existing = prev[book.id];
      return {
        ...prev,
        [book.id]: {
          bookId: book.id,
          chapterIndex: nextIndex,
          lastReadAt: new Date().toISOString(),
          completedChapters: existing?.completedChapters ?? [],
        },
      };
    });
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
      const alreadyDone = existing.completedChapters.includes(chapterId);
      return {
        ...prev,
        [bookId]: {
          ...existing,
          lastReadAt: new Date().toISOString(),
          completedChapters: alreadyDone
            ? existing.completedChapters
            : [...existing.completedChapters, chapterId],
        },
      };
    });
  };

  const handlePrimaryReadAction = () => {
    if (activeRecentBook && mostRecentProgress) {
      openBookInReader(activeRecentBook, mostRecentProgress.chapterIndex);
    } else {
      openBookInReader(BOOKS_CATALOG[0], 0);
    }
  };

  const featuredBook = BOOKS_CATALOG[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F4] text-[#1F2421]">
      <Navbar
        onOpenPrimaryReader={handlePrimaryReadAction}
        onOpenShelf={() => setShelfOpen(true)}
        hasActiveProgress={Boolean(activeRecentBook)}
      />

      <main className="flex-1">
        <HeroSection
          totalBooks={BOOKS_CATALOG.length}
          activeBook={activeRecentBook}
          activeChapterNumber={
            activeRecentBook && mostRecentProgress
              ? activeRecentBook.chapters[mostRecentProgress.chapterIndex]?.number
              : undefined
          }
          onContinueReading={handlePrimaryReadAction}
        />

        <FeaturedSpotlight
          book={featuredBook}
          isBookmarked={bookmarkedIds.includes(featuredBook.id)}
          onToggleBookmark={toggleBookmark}
          onReadBook={(book) => openBookInReader(book)}
          onSelectDetail={(book) => setDetailBook(book)}
        />

        <CatalogSection
          books={filteredBooks}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onlyBookmarked={onlyBookmarked}
          onToggleOnlyBookmarked={() => setOnlyBookmarked((prev) => !prev)}
          bookmarkedIds={bookmarkedIds}
          progressMap={progressMap}
          onToggleBookmark={toggleBookmark}
          onSelectBook={(book) => setDetailBook(book)}
          onReadBook={(book) => openBookInReader(book)}
        />
      </main>

      <Footer
        onSelectCategory={(cat) => {
          setOnlyBookmarked(false);
          setSelectedCategory(cat);
        }}
        onOpenShelf={() => setShelfOpen(true)}
      />

      <BookDetailModal
        book={detailBook}
        isBookmarked={
          detailBook ? bookmarkedIds.includes(detailBook.id) : false
        }
        progress={detailBook ? progressMap[detailBook.id] : undefined}
        onClose={() => setDetailBook(null)}
        onToggleBookmark={toggleBookmark}
        onReadChapter={openBookInReader}
      />

      <ReadingShelfDrawer
        open={shelfOpen}
        books={BOOKS_CATALOG}
        bookmarkedIds={bookmarkedIds}
        progressMap={progressMap}
        onClose={() => setShelfOpen(false)}
        onReadBook={openBookInReader}
        onRemoveBookmark={toggleBookmark}
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
    </div>
  );
}
