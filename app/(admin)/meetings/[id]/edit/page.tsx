import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { getMeetingById } from '@/lib/meetings-db';
import { updateMeeting } from '@/lib/actions';

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meetingId = Number(id);

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  const defaultValues = {
    date: meeting.date,
    meetingType: meeting.meetingType,
    presiding: meeting.presiding,
    conducting: meeting.conducting,
    openingHymnNumber: meeting.openingHymn.number,
    openingHymnTitle: meeting.openingHymn.title,
    openingPrayer: meeting.openingPrayer,
    sacramentHymnNumber: meeting.sacramentHymn.number,
    sacramentHymnTitle: meeting.sacramentHymn.title,
    closingHymnNumber: meeting.closingHymn.number,
    closingHymnTitle: meeting.closingHymn.title,
    closingPrayer: meeting.closingPrayer,
    stakeBusiness: meeting.stakeBusiness,
    announcements: (meeting.announcements ?? []).join('\n'),
    wardBusiness: (meeting.wardBusiness ?? [])
      .map((item) => item.description)
      .join('\n'),
    speakers: (meeting.speakers ?? [])
      .map((s) => (s.topic ? `${s.name} | ${s.topic}` : s.name))
      .join('\n'),
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Edit Meeting</h1>
      <div className="mt-6">
        <MeetingForm
          action={updateMeeting.bind(null, meetingId)}
          submitLabel="Save Changes"
          defaultValues={defaultValues}
        />
      </div>
    </div>
  );
}