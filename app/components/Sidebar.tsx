"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  ArrowLeftRight,
  CreditCard,
  PieChart,
  Sparkles,
} from "lucide-react";

const tabs = [
  { href: "/", label: "Inicio", Icon: Home },
  { href: "/transactions", label: "Movimientos", Icon: ArrowLeftRight },
  { href: "/cards", label: "Tarjetas", Icon: CreditCard },
  { href: "/budgets", label: "Presupuestos", Icon: PieChart },
  { href: "/insights", label: "Insights", Icon: Sparkles },
] as const;

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100dvh",
        width: "220px",
        background: "rgba(255, 250, 249, 0.7)",
        backdropFilter: "blur(28px) saturate(200%) brightness(1.05)",
        WebkitBackdropFilter: "blur(28px) saturate(200%) brightness(1.05)",
        borderRight: "0.5px solid rgba(0,0,0,0.08)",
        boxShadow: "2px 0 24px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        zIndex: 40,
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "28px 24px 32px" }}>
        <Image
          src="/logo.svg"
          alt="bloomé"
          width={100}
          height={19}
          priority
          style={{ display: "block" }}
        />
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: "0 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
        {tabs.map(({ href, label, Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "11px 14px",
                borderRadius: "14px",
                color: isActive ? "var(--color-primary)" : "var(--color-text-muted)",
                background: isActive ? "rgba(251,157,156,0.10)" : "transparent",
                fontWeight: isActive ? 600 : 500,
                fontSize: "15px",
                transition: "background 250ms ease, color 250ms ease",
                WebkitTapHighlightColor: "transparent",
                textDecoration: "none",
              }}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.2 : 1.8}
                style={{ flexShrink: 0 }}
              />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
