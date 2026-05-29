import {
  IconHome,
  IconArrowsLeftRight,
  IconCreditCard,
  IconChartPie,
  IconSparkles,
  IconChartBar,
  IconSettings,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";

export type NavTab = {
  href: string;
  label: string;
  Icon: TablerIcon;
};

export const NAV_TABS: NavTab[] = [
  { href: "/", label: "Inicio", Icon: IconHome },
  { href: "/transactions", label: "Movimientos", Icon: IconArrowsLeftRight },
  { href: "/cards", label: "Tarjetas", Icon: IconCreditCard },
  { href: "/budgets", label: "Presupuestos", Icon: IconChartPie },
  { href: "/insights", label: "Insights", Icon: IconSparkles },
];

export const BOTTOM_TABS: NavTab[] = [
  { href: "/", label: "Inicio", Icon: IconHome },
  { href: "/transactions", label: "Stats", Icon: IconChartBar },
  { href: "/budgets", label: "Budget", Icon: IconChartPie },
  { href: "/settings", label: "Settings", Icon: IconSettings },
];
