import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import { deleteMeeting } from '@/lib/actions';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(meeting.date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex items-start justify-between gap-4 p-4 border-l-4 border-blue-800 bg-gray-50 rounded hover:bg-gray-100 transition">
      <Link href={`/meetings/${meeting.id}`} className="flex-1 block">
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          {meeting.meetingType}
        </p>
        <h3 className="text-xl font-bold text-gray-900">{formattedDate}</h3>
        <p className="text-sm text-gray-600 mt-1">
          Presiding: {meeting.presiding}
        </p>
      </Link>

      <form action={deleteMeeting.bind(null, meeting.id)}>
        <button
          type="submit"
          aria-label={`Delete meeting for ${formattedDate}`}
          className="text-sm text-red-600 hover:text-red-800 hover:underline"
        >
          Delete
        </button>
      </form>
    </div>
  );
}