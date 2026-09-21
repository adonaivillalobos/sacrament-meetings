import { z } from 'zod';

export const MeetingFormSchema = z.object({
  date: z
    .string()
    .min(1, 'Date is required')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),

  meetingType: z.enum(['testimony', 'regular', 'stake', 'general'], {
    error: 'Please select a valid meeting type',
  }),

  presiding: z.string().min(1, 'Presiding officer is required'),
  conducting: z.string().min(1, 'Conducting officer is required'),

  openingHymnNumber: z.coerce
    .number({ error: 'Hymn number must be a number' })
    .int()
    .positive('Hymn number must be positive'),
  openingHymnTitle: z.string().min(1, 'Opening hymn title is required'),
  openingPrayer: z.string().min(1, 'Opening prayer name is required'),

  sacramentHymnNumber: z.coerce
    .number({ error: 'Hymn number must be a number' })
    .int()
    .positive('Hymn number must be positive'),
  sacramentHymnTitle: z.string().min(1, 'Sacrament hymn title is required'),

  closingHymnNumber: z.coerce
    .number({ error: 'Hymn number must be a number' })
    .int()
    .positive('Hymn number must be positive'),
  closingHymnTitle: z.string().min(1, 'Closing hymn title is required'),
  closingPrayer: z.string().min(1, 'Closing prayer name is required'),

  stakeBusiness: z.coerce.boolean().default(false),

  announcements: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val.split('\n').map((s) => s.trim()).filter(Boolean)
        : []
    ),

  wardBusiness: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean)
            .map((description) => ({ description }))
        : []
    ),

  speakers: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean)
            .map((line) => {
              const [name, topic] = line.split('|').map((s) => s.trim());
              return { name, topic: topic ?? '', type: 'speaker' as const };
            })
        : []
    ),
});

export type MeetingFormState = {
  message?: string;
  errors?: Record<string, string[]>;
  values?: Record<string, string>;
};