import { getMeetings } from '@/lib/meetings-db';
import MeetingCard from '@/components/MeetingCard';

export default async function MeetingsPage() {
  const meetings = getMeetings();

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">All Meetings</h1>
      <div className="mt-4 space-y-3">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}