"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { IconBell, IconUserCircle } from "@tabler/icons-react";
import { NAV_TABS } from "@/app/components/layout/constants/navigation";

function usePageTitle() {
  const pathname = usePathname();
  return NAV_TABS.find((tab) => tab.href === pathname)?.label ?? "";
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex items-center justify-center w-11 h-11 rounded-2xl text-text-muted hover:text-text hover:bg-black/5 transition-colors duration-250">
      {children}
    </button>
  );
}

export default function Header() {
  const title = usePageTitle();

  return (
    <header className="sticky top-0 z-30 px-5 pt-[env(safe-area-inset-top)]">
      {/* Mobile: usuario izquierda, iso centro, notificaciones derecha */}
      <div className="flex items-center md:hidden py-3">
        <div className="flex-1">
          <IconButton><IconUserCircle size={30} /></IconButton>
        </div>
        <Image src="/iso.svg" alt="bloomé" width={100} height={30} className="h-7 w-auto" priority />
        <div className="flex-1 flex justify-end">
          <IconButton><IconBell size={30} /></IconButton>
        </div>
      </div>

      {/* Desktop: título a la izquierda, iconos a la derecha */}
      <div className="hidden md:flex items-center justify-between py-5">
        <h1 className="text-[22px] font-bold text-text tracking-[-0.3px]">{title}</h1>
        <div className="flex items-center gap-1">
          <IconButton><IconBell size={26} /></IconButton>
          <IconButton><IconUserCircle size={26} /></IconButton>
        </div>
      </div>
    </header>
  );
}
