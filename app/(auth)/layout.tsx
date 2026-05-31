export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg flex items-center justify-center px-6 py-12">
      {children}
    </div>
  );
}
