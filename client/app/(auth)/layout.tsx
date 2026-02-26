export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {children}
    </div>
  );
}