import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Date(meeting.date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="max-w-2xl mx-auto px-4 py-8">
      <p className="text-sm text-gray-500 uppercase tracking-wide">
        {meeting.meetingType} meeting
      </p>
      <h1 className="text-3xl font-bold text-gray-900">{formattedDate}</h1>

      <dl className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-700">
        <dt className="font-semibold">Presiding</dt>
        <dd>{meeting.presiding}</dd>
        <dt className="font-semibold">Conducting</dt>
        <dd>{meeting.conducting}</dd>
        <dt className="font-semibold">Stake Business</dt>
        <dd>{meeting.stakeBusiness ? 'Yes' : 'No'}</dd>
      </dl>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-bold text-gray-900">Announcements</h2>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            {meeting.announcements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-6">
        <h2 className="text-xl font-bold text-gray-900">Opening</h2>
        <p className="mt-2 text-gray-700">
          Hymn #{meeting.openingHymn.number}: {meeting.openingHymn.title}
        </p>
        <p className="text-gray-700">Prayer: {meeting.openingPrayer}</p>
      </section>

      {meeting.wardBusiness.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-bold text-gray-900">Ward Business</h2>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-6">
        <h2 className="text-xl font-bold text-gray-900">Sacrament Hymn</h2>
        <p className="mt-2 text-gray-700">
          Hymn #{meeting.sacramentHymn.number}: {meeting.sacramentHymn.title}
        </p>
      </section>

      {meeting.speakers.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-bold text-gray-900">Program</h2>
          <ul className="mt-2 space-y-2 text-gray-700">
            {meeting.speakers.map((item, index) => (
              <li key={index}>
                {item.type === 'musical-number' ? (
                  <span>Musical Number: {item.name}</span>
                ) : (
                  <span>
                    Speaker: {item.name}
                    {item.topic && ` — ${item.topic}`}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-6">
        <h2 className="text-xl font-bold text-gray-900">Closing</h2>
        <p className="mt-2 text-gray-700">
          Hymn #{meeting.closingHymn.number}: {meeting.closingHymn.title}
        </p>
        <p className="text-gray-700">Prayer: {meeting.closingPrayer}</p>
      </section>
    </article>
  );
}