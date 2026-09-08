import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

export default function CurrentMeetingPage() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const sundayIso = sunday.toISOString().split('T')[0];

  const matches = getMeetings(sundayIso);

  if (matches.length === 0) {
    redirect('/meetings');
  }

  redirect(`/meetings/${matches[0].id}`);
}