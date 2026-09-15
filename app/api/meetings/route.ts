import { NextRequest, NextResponse } from 'next/server';
import { getMeetings, getMeetingByDate } from '@/lib/meetings-db';

// GET /api/meetings
// GET /api/meetings?date=2026-09-06
// GET /api/meetings?query=kim&page=1
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const query = searchParams.get('query');
  const page = Number(searchParams.get('page')) || 1;

  if (date) {
    const meeting = await getMeetingByDate(date);
    return NextResponse.json(meeting ? [meeting] : []);
  }

  const meetings = await getMeetings(query ?? '', page);
  return NextResponse.json(meetings);
}