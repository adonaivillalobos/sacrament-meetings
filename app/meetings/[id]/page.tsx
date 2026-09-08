import { notFound } from 'next/navigation';
import type { SacramentMeeting } from '@/lib/types';
import MeetingDetail from '@/components/MeetingDetail';

async function getMeeting(id: string): Promise<SacramentMeeting | null> {
  const res = await fetch(`http://localhost:3000/api/meetings/${id}`, {
    cache: 'no-store',
  });

  if (res.status === 400 || res.status === 404) {
    return null;
  }

  return res.json();
}

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meeting = await getMeeting(id);

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}