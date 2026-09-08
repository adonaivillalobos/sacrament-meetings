import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="rounded-lg overflow-hidden shadow-md">
        <Image
          src="/lds.jpg"
          alt="Riverside Ward meetinghouse chapel exterior"
          width={1920}
          height={1080}
          priority
          className="w-full h-auto"
        />
      </div>

      <h1 className="mt-8 text-3xl font-bold text-gray-900">
        Sacrament Meeting Planner
      </h1>
      <p className="mt-2 text-gray-600">
        Plan, manage, and review sacrament meeting agendas for Riverside Ward.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          href="/meetings"
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
        >
          View All Meetings
        </Link>
        <Link
          href="/meetings/current"
          className="border border-blue-800 text-blue-800 px-4 py-2 rounded hover:bg-blue-50 transition"
        >
          This Week&apos;s Program
        </Link>
      </div>
    </div>
  );
}