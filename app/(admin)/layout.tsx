export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-4 inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
        Admin Area
      </div>
      {children}
    </div>
  );
}