import {
  Home,
  ArrowLeftRight,
  CreditCard,
  PieChart,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavTab = {
  href: string;
  label: string;
  Icon: LucideIcon;
};

export const NAV_TABS: NavTab[] = [
  { href: "/", label: "Inicio", Icon: Home },
  { href: "/transactions", label: "Movimientos", Icon: ArrowLeftRight },
  { href: "/cards", label: "Tarjetas", Icon: CreditCard },
  { href: "/budgets", label: "Presupuestos", Icon: PieChart },
  { href: "/insights", label: "Insights", Icon: Sparkles },
];
