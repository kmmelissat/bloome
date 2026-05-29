"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Tabbar from "./Tabbar";
import Header from "./Header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-full">
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      </div>

      <main
        className={`flex-1 scroll-touch transition-[margin-left] duration-250 ease-in-out ${
          collapsed ? "md:ml-24" : "md:ml-63"
        }`}
        style={{ paddingBottom: "calc(96px + env(safe-area-inset-bottom))" }}
      >
        <div className="max-w-3xl mx-auto px-5 md:px-0">
          <Header />
          {children}
        </div>
      </main>

      <Tabbar />
    </div>
  );
}
