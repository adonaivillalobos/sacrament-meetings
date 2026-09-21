import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h2 className="text-xl font-semibold text-gray-900">
        Meeting not found
      </h2>
      <p className="mt-2 text-gray-600">
        We couldn&apos;t find a meeting with that ID. It may have been deleted
        or the link may be incorrect.
      </p>
      <div className="mt-6">
        <Link
          href="/meetings"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}