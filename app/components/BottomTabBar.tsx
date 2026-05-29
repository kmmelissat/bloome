"use client";

import Link from "next/link";
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

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden"
      style={{
        position: "fixed",
        bottom: "calc(16px + env(safe-area-inset-bottom))",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 40px)",
        maxWidth: "420px",
        background: "rgba(255, 250, 249, 0.65)",
        backdropFilter: "blur(28px) saturate(200%) brightness(1.05)",
        WebkitBackdropFilter: "blur(28px) saturate(200%) brightness(1.05)",
        border: "0.5px solid rgba(255,255,255,0.7)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.10), 0 1.5px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85)",
        borderRadius: "28px",
        zIndex: 50,
      }}
    >
      <div className="flex items-center justify-around px-3 pt-2 pb-2">
        {tabs.map(({ href, label, Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 min-w-14 active:opacity-60"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                  transition: "transform 250ms ease, color 250ms ease",
                  color: isActive
                    ? "var(--color-primary)"
                    : "var(--color-text-muted)",
                }}
              >
                <Icon size={24} strokeWidth={isActive ? 2.2 : 1.8} />
              </span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 500,
                  lineHeight: 1,
                  color: isActive
                    ? "var(--color-primary)"
                    : "var(--color-text-muted)",
                  transition: "color 250ms ease",
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
