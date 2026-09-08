export default function MeetingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-4xl mx-auto">
      {children}
    </section>
  );
}