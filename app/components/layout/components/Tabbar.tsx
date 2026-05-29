"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHexagonPlus } from "@tabler/icons-react";
import { BOTTOM_TABS } from "@/app/components/layout/constants/navigation";

const LEFT_TABS = BOTTOM_TABS.slice(0, 2);
const RIGHT_TABS = BOTTOM_TABS.slice(2, 4);

export default function Tabbar() {
  const pathname = usePathname();

  return (
    <nav className="glass md:hidden fixed bottom-[calc(16px+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-105 shadow-float rounded-[32px] z-50">
      <div className="flex items-center px-2 py-2">
        {LEFT_TABS.map(({ href, Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex justify-center items-center py-1 active:opacity-60"
            >
              <span
                className={`flex items-center justify-center transition-[transform,color] duration-250 ease-in-out ${
                  isActive ? "scale-110 text-primary" : "text-text-muted"
                }`}
              >
                <Icon size={24} stroke={isActive ? 2.2 : 1.8} />
              </span>
            </Link>
          );
        })}

        {/* FAB */}
        <div className="flex-1 flex justify-center">
          <button className="w-12 h-12 rounded-full border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.35)_0%,rgba(251,157,156,1)_100%)] shadow-[inset_0_1.5px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(251,157,156,0.3),0_4px_16px_rgba(251,157,156,0.2)] flex items-center justify-center active:scale-95 transition-transform duration-150">
            <IconHexagonPlus size={26} className="text-white" stroke={1.5} />
          </button>
        </div>

        {RIGHT_TABS.map(({ href, Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex justify-center items-center py-1 active:opacity-60"
            >
              <span
                className={`flex items-center justify-center transition-[transform,color] duration-250 ease-in-out ${
                  isActive ? "scale-110 text-primary" : "text-text-muted"
                }`}
              >
                <Icon size={24} stroke={isActive ? 2.2 : 1.8} />
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
