'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav aria-label="Pagination" className="mt-6 flex items-center gap-4 text-sm">
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded border border-blue-800 px-3 py-1 text-blue-800 hover:bg-blue-50 transition"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded border border-gray-200 px-3 py-1 text-gray-400">
          Previous
        </span>
      )}

      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded border border-blue-800 px-3 py-1 text-blue-800 hover:bg-blue-50 transition"
        >
          Next
        </Link>
      ) : (
        <span className="rounded border border-gray-200 px-3 py-1 text-gray-400">
          Next
        </span>
      )}
    </nav>
  );
}