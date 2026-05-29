"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { NAV_TABS } from "@/app/components/layout/constants/navigation";

type Props = {
  collapsed: boolean;
  onToggle: () => void;
};

export default function Sidebar({ collapsed, onToggle }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className={`glass fixed top-4 left-4 h-[calc(100dvh-32px)] shadow-float rounded-3xl flex flex-col z-40 transition-[width] duration-250 ease-in-out overflow-hidden ${
        collapsed ? "w-16" : "w-55"
      }`}
    >
      <div className="flex justify-center pt-7 pb-8 px-3">
        {collapsed ? (
          <Image src="/iso.svg" alt="bloomé" width={24} height={24} priority />
        ) : (
          <Image src="/logo.svg" alt="bloomé" width={130} height={25} priority />
        )}
      </div>

      <nav className="flex-1 px-2 flex flex-col gap-1">
        {NAV_TABS.map(({ href, label, Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center py-2.75 rounded-[14px] text-[15px] no-underline transition-colors duration-250 ease-in-out ${
                collapsed ? "justify-center px-2" : "gap-3 px-3.5"
              } ${
                isActive
                  ? "text-primary bg-primary/10 font-semibold"
                  : "text-text-muted font-medium"
              }`}
            >
              <Icon size={20} stroke={isActive ? 2.2 : 1.8} className="shrink-0" />
              {!collapsed && label}
            </Link>
          );
        })}
      </nav>

      <div className={`p-3 flex ${collapsed ? "justify-center" : "justify-end"}`}>
        <button
          onClick={onToggle}
          className="flex items-center justify-center w-8 h-8 rounded-xl text-text-muted hover:text-text hover:bg-black/5 transition-colors duration-250"
        >
          {collapsed ? <IconChevronRight size={16} /> : <IconChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
