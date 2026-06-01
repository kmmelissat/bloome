"use client";

import { useState } from "react";
import { IconTrendingUp, IconTrendingDown, IconChevronDown } from "@tabler/icons-react";
import DateFilterSheet, { type FilterResult } from "./DateFilterSheet";

type View = "spent" | "income" | "net";

const VIEWS: { id: View; label: string; color: string; bg: string }[] = [
  { id: "spent",  label: "Spent",  color: "#fb9d9c", bg: "rgba(251,157,156,0.12)" },
  { id: "income", label: "Income", color: "#5dbb8a", bg: "rgba(93,187,138,0.12)"  },
  { id: "net",    label: "Net",    color: "#7aaee8", bg: "rgba(122,174,232,0.12)" },
];

// Placeholder — replace with Supabase queries using filter.start / filter.end
const MOCK: Record<View, { amount: number; change: number }> = {
  spent:  { amount: 1284.00, change: 12  },
  income: { amount: 3500.00, change: 0   },
  net:    { amount: 2216.00, change: -5  },
};

function getDefaultFilter(): FilterResult {
  const now = new Date();
  return {
    label: "This month",
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end: new Date(),
    presetId: "month",
  };
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(Math.abs(value));
}

export default function FinanceSummaryCard() {
  const [view, setView] = useState<View>("spent");
  const [filter, setFilter] = useState<FilterResult>(getDefaultFilter);
  const [sheetOpen, setSheetOpen] = useState(false);

  const { amount, change } = MOCK[view];
  const active = VIEWS.find((v) => v.id === view)!;
  const isPositiveChange = change >= 0;

  return (
    <>
      <div
        className="rounded-[28px] overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #fff5f4 0%, #fff8f0 100%)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          {/* View tabs */}
          <div className="flex items-center gap-1">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className="text-[13px] font-semibold px-3 py-1 rounded-full transition-all duration-200"
                style={
                  view === v.id
                    ? { color: v.color, background: v.bg }
                    : { color: "#6e6e73" }
                }
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Period filter trigger */}
          <button
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/5 active:opacity-60 transition-opacity"
          >
            <span className="text-[12px] font-semibold text-text-muted">{filter.label}</span>
            <IconChevronDown size={13} stroke={2.5} className="text-text-muted" />
          </button>
        </div>

        {/* Amount */}
        <div className="px-5 pb-2">
          <div
            className="text-[48px] font-bold tracking-[-2px] leading-none transition-colors duration-300"
            style={{ color: active.color }}
          >
            {view === "net" && amount > 0 ? "+" : ""}
            {formatCurrency(amount)}
          </div>
        </div>

        {/* Trend */}
        <div className="px-5 pb-5 flex items-center gap-1.5">
          <span
            className="flex items-center gap-0.5 text-[12px] font-semibold rounded-full px-2 py-0.5"
            style={{
              color: isPositiveChange ? "#5dbb8a" : "#fb9d9c",
              background: isPositiveChange ? "rgba(93,187,138,0.12)" : "rgba(251,157,156,0.12)",
            }}
          >
            {isPositiveChange
              ? <IconTrendingUp size={13} stroke={2.5} />
              : <IconTrendingDown size={13} stroke={2.5} />}
            {Math.abs(change)}%
          </span>
          <span className="text-[12px] text-text-muted">vs previous period</span>
        </div>

        {/* Bottom: other two stats */}
        <div className="flex border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          {VIEWS.filter((v) => v.id !== view).map((v, i, arr) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className="flex-1 flex flex-col gap-0.5 px-5 py-3.5 active:opacity-60 transition-opacity text-left"
              style={i < arr.length - 1 ? { borderRight: "1px solid rgba(0,0,0,0.06)" } : {}}
            >
              <span className="text-[11px] font-medium text-text-muted">{v.label}</span>
              <span className="text-[15px] font-bold" style={{ color: v.color }}>
                {v.id === "net" ? "+" : ""}
                {formatCurrency(MOCK[v.id].amount)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <DateFilterSheet
        open={sheetOpen}
        current={filter}
        onClose={() => setSheetOpen(false)}
        onApply={(result) => setFilter(result)}
      />
    </>
  );
}
