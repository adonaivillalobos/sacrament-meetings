import type { Metadata } from 'next';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import MeetingCard from '@/components/MeetingCard';
import { MeetingSearch } from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';

export const metadata: Metadata = {
  title: 'All Meetings',
  description: 'Browse and search sacrament meeting agendas by date, presiding officer, and meeting type.',
};

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">All Meetings</h1>

      <div className="mt-4">
        <MeetingSearch />
      </div>

      <div className="mt-4 space-y-3">
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))
        ) : (
          <p className="text-gray-500">No meetings found.</p>
        )}
      </div>

      <Pagination totalPages={totalPages} />
    </div>
  );
}