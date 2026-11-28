import { useState } from 'react';
import { Book } from '../types/library';

interface BookCoverProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg';
}

export function BookCover({ book, size = 'md' }: BookCoverProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(book.coverImage) && !imgError;

  const titleSizeClass =
    size === 'sm'
      ? 'text-sm leading-snug'
      : size === 'lg'
        ? 'text-2xl leading-tight'
        : 'text-lg leading-snug';

  return (
    <div
      className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-[#EEDCE2] shadow-[0_6px_22px_-8px_rgba(120,62,82,0.14)]"
      style={{ backgroundColor: book.clothColor }}
    >
      {/* Subtle left book spine crease */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-3 z-10 bg-gradient-to-r from-black/15 via-black/5 to-transparent"
      />

      {showImage ? (
        <img
          src={book.coverImage}
          alt={`Sampul buku ${book.title} karya ${book.author}`}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full w-full flex-col justify-between p-5 sm:p-6 text-[#2D2226]">
          <div className="flex items-center justify-between border-b border-[#2D2226]/12 pb-2.5">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#6E5A62] tabular-nums">
              {book.catalogNumber}
            </span>
            <span className="text-[10px] font-medium tracking-wider uppercase text-[#6E5A62] tabular-nums">
              {book.year}
            </span>
          </div>

          <div className="my-auto py-4">
            <p className="text-[11px] font-medium tracking-wider uppercase text-[#6E5A62] mb-2">
              {book.category}
            </p>
            <h4 className={`font-serif font-semibold editorial-balance ${titleSizeClass}`}>
              {book.title}
            </h4>
          </div>

          <div className="border-t border-[#2D2226]/12 pt-3 flex items-center justify-between">
            <span className="text-xs font-medium text-[#4D3D43] truncate">
              {book.author}
            </span>
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: book.clothAccent }}
              aria-hidden="true"
            />
          </div>
        </div>
      )}
    </div>
  );
}
