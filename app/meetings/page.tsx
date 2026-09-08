import type { SacramentMeeting } from '@/lib/types';
import MeetingCard from '@/components/MeetingCard';

async function getAllMeetings(): Promise<SacramentMeeting[]> {
  const res = await fetch('http://localhost:3000/api/meetings', {
    cache: 'no-store',
  });
  return res.json();
}

export default async function MeetingsPage() {
  const meetings = await getAllMeetings();

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