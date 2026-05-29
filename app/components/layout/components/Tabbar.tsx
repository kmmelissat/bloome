"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_TABS } from "@/app/components/layout/constants/navigation";

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="glass md:hidden fixed bottom-[calc(16px+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-105 shadow-float rounded-[28px] z-50">
      <div className="flex items-center justify-around px-3 py-4">
        {NAV_TABS.map(({ href, Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-center min-w-14 active:opacity-60"
            >
              <span
                className={`flex items-center justify-center transition-[transform,color] duration-250 ease-in-out ${
                  isActive ? "scale-110 text-primary" : "text-text-muted"
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.2 : 1.8} />
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
