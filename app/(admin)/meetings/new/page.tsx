import MeetingForm from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';

export default function NewMeetingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Create Meeting</h1>
      <div className="mt-6">
        <MeetingForm action={createMeeting} submitLabel="Create Meeting" />
      </div>
    </div>
  );
}