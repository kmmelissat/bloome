import BottomTabBar from "@/app/components/layout/components/Tabbar";
import Sidebar from "@/app/components/layout/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      {/* Desktop sidebar — hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content — offset by sidebar width on desktop */}
      <main
        className="flex-1 scroll-touch md:ml-63"
        style={{
          paddingBottom: "calc(96px + env(safe-area-inset-bottom))",
        }}
      >
        {/* Content constrained width on large screens */}
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile floating tab bar — hidden on desktop */}
      <BottomTabBar />
    </div>
  );
}
