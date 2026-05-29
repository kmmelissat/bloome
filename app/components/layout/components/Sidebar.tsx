"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_TABS } from "@/app/components/layout/constants/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass fixed top-4 left-4 h-[calc(100dvh-32px)] w-55 shadow-float rounded-3xl flex flex-col z-40">
      <div className="flex justify-center pt-7 pb-8 px-6">
        <Image
          src="/logo.svg"
          alt="bloomé"
          width={130}
          height={25}
          priority
        />
      </div>

      <nav className="flex-1 px-3 flex flex-col gap-1">
        {NAV_TABS.map(({ href, label, Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3.5 py-2.75 rounded-[14px] text-[15px] no-underline transition-colors duration-250 ease-in-out ${
                isActive
                  ? "text-primary bg-primary/10 font-semibold"
                  : "text-text-muted font-medium"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} className="shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
