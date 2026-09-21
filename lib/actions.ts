'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingInDb,
} from './meetings-db';
import { MeetingFormSchema, type MeetingFormState } from './definitions';

const FORM_FIELDS = [
  'date', 'meetingType', 'presiding', 'conducting',
  'openingHymnNumber', 'openingHymnTitle', 'openingPrayer',
  'sacramentHymnNumber', 'sacramentHymnTitle',
  'closingHymnNumber', 'closingHymnTitle', 'closingPrayer',
  'stakeBusiness', 'announcements', 'wardBusiness', 'speakers',
] as const;

function snapshotValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of FORM_FIELDS) {
    const raw = formData.get(field);
    if (typeof raw === 'string') values[field] = raw;
  }
  return values;
}

// Neon/Postgres errors carry a numeric SQL state `code`.
// 23505 = unique_violation (see https://www.postgresql.org/docs/current/errcodes-appendix.html)
function isUniqueDateViolation(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code?: string }).code === '23505' &&
    'constraint' in error &&
    (error as { constraint?: string }).constraint === 'meetings_date_key'
  );
}

export async function createMeeting(
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const values = snapshotValues(formData);

  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
    stakeBusiness: formData.get('stakeBusiness'),
    announcements: formData.get('announcements'),
    wardBusiness: formData.get('wardBusiness'),
    speakers: formData.get('speakers'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Please fix the errors below.',
      errors: z.flattenError(validatedFields.error).fieldErrors,
      values,
    };
  }

  const data = validatedFields.data;

  try {
    await addMeeting({
      date: data.date,
      meetingType: data.meetingType,
      presiding: data.presiding,
      conducting: data.conducting,
      announcements: data.announcements,
      openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
      openingPrayer: data.openingPrayer,
      wardBusiness: data.wardBusiness,
      stakeBusiness: data.stakeBusiness,
      sacramentHymn: { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle },
      speakers: data.speakers,
      closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
      closingPrayer: data.closingPrayer,
    });
  } catch (error) {
    if (isUniqueDateViolation(error)) {
      return {
        message: 'Please fix the errors below.',
        errors: { date: ['A meeting already exists for this date.'] },
        values,
      };
    }
    console.error('Failed to create meeting:', error);
    throw new Error('Something went wrong while saving the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const values = snapshotValues(formData);

  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
    stakeBusiness: formData.get('stakeBusiness'),
    announcements: formData.get('announcements'),
    wardBusiness: formData.get('wardBusiness'),
    speakers: formData.get('speakers'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Please fix the errors below.',
      errors: z.flattenError(validatedFields.error).fieldErrors,
      values,
    };
  }

  const data = validatedFields.data;

  try {
    await updateMeetingInDb(id, {
      date: data.date,
      meetingType: data.meetingType,
      presiding: data.presiding,
      conducting: data.conducting,
      announcements: data.announcements,
      openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
      openingPrayer: data.openingPrayer,
      wardBusiness: data.wardBusiness,
      stakeBusiness: data.stakeBusiness,
      sacramentHymn: { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle },
      speakers: data.speakers,
      closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
      closingPrayer: data.closingPrayer,
    });
  } catch (error) {
    if (isUniqueDateViolation(error)) {
      return {
        message: 'Please fix the errors below.',
        errors: { date: ['Another meeting already exists for this date.'] },
        values,
      };
    }
    console.error('Failed to update meeting:', error);
    throw new Error('Something went wrong while updating the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
  try {
    await deleteMeetingInDb(id);
  } catch (error) {
    console.error('Failed to delete meeting:', error);
    throw new Error('Something went wrong while deleting the meeting. Please try again.');
  }

  revalidatePath('/meetings');
}