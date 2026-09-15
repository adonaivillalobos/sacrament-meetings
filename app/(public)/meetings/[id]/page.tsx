import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import MeetingDetail from '@/components/MeetingDetail';

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    notFound();
  }

  const meeting = await getMeetingById(id);

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}