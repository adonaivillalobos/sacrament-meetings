import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-08-16',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: August 20']
  },
  {
    id: 2,
    date: '2026-08-23',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Brother Miller',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: 'While of These Emblems We Partake' },
    speakers: [],
    closingHymn: { number: 89, title: 'Because I Have Been Given Much' },
    closingPrayer: 'Sister Garcia',
    announcements: ['Fast and Testimony Meeting today']
  },
  {
    id: 3,
    date: '2026-08-30',
    meetingType: 'stake',
    presiding: 'President Anderson',
    conducting: 'President Anderson',
    openingHymn: { number: 1, title: 'The Morning Breaks' },
    openingPrayer: 'Brother Lee',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 193, title: "God, Our Father, Hear Us Pray" },
    speakers: [
      { name: 'President Anderson', topic: 'Stake Conference Address', type: 'speaker' }
    ],
    closingHymn: { number: 249, title: 'Come, O Thou King of Kings' },
    closingPrayer: 'Sister Nguyen',
    announcements: []
  },
  {
    id: 4,
    date: '2026-09-06',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
    openingPrayer: 'Sister Patel',
    wardBusiness: [{ description: 'Release and sustaining of Sunday School president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 174, title: 'While of These Emblems We Partake' },
    speakers: [
      { name: 'Brother Kim', topic: 'Service in the Kingdom', type: 'speaker' },
      { name: 'Ward Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 219, title: 'Have I Done Any Good?' },
    closingPrayer: 'Brother Reyes',
    announcements: ['Primary Program next Sunday']
  },
  {
    id: 5,
    date: '2026-07-05',
    meetingType: 'general',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 27, title: 'Praise to the Man' },
    openingPrayer: 'Sister Chen',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: 'Reverently and Meekly Now' },
    speakers: [],
    closingHymn: { number: 2, title: 'The Spirit of God' },
    closingPrayer: 'Brother Alvarez',
    announcements: ['General Conference viewing schedule posted']
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}