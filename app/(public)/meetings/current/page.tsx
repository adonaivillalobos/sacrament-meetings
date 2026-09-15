import { redirect } from 'next/navigation';
import { getMeetingByDate } from '@/lib/meetings-db';

export default async function CurrentMeetingPage() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const sundayIso = sunday.toISOString().split('T')[0];

  const meeting = await getMeetingByDate(sundayIso);

  if (!meeting) {
    redirect('/meetings');
  }

  redirect(`/meetings/${meeting.id}`);
}