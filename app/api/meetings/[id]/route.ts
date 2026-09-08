import { NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

// GET /api/meetings/1
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const meeting = getMeetingById(id);

  if (!meeting) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(meeting);
}