"use client";

import { useState, useEffect } from "react";
import { Drawer } from "vaul";
import RangeCalendar from "@/app/components/ui/RangeCalendar";
import Modal from "@/app/components/ui/Modal";

export type FilterResult = {
  label: string;
  start: Date;
  end: Date;
  presetId?: string;
};

type Props = {
  open: boolean;
  current: FilterResult;
  onClose: () => void;
  onApply: (result: FilterResult) => void;
};

const PRESETS: { id: string; label: string }[] = [
  { id: "today",      label: "Today" },
  { id: "week",       label: "This week" },
  { id: "month",      label: "This month" },
  { id: "last_month", label: "Last month" },
  { id: "3months",    label: "Last 3 months" },
  { id: "year",       label: "This year" },
];

function getPresetRange(id: string): { start: Date; end: Date } {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  switch (id) {
    case "today":
      return { start: today, end: today };
    case "week": {
      const s = new Date(today);
      s.setDate(today.getDate() - today.getDay());
      return { start: s, end: today };
    }
    case "month":
      return { start: new Date(now.getFullYear(), now.getMonth(), 1), end: today };
    case "last_month": {
      const s = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const e = new Date(now.getFullYear(), now.getMonth(), 0);
      return { start: s, end: e };
    }
    case "3months": {
      const s = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      return { start: s, end: today };
    }
    case "year":
      return { start: new Date(now.getFullYear(), 0, 1), end: today };
    default:
      return { start: today, end: today };
  }
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatLabel(start: Date, end: Date): string {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  if (sameDay(start, end)) return fmt(start);
  if (start.getFullYear() !== end.getFullYear())
    return `${fmt(start)}, ${start.getFullYear()} – ${fmt(end)}, ${end.getFullYear()}`;
  return `${fmt(start)} – ${fmt(end)}`;
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

// ─── Shared inner content ────────────────────────────────────────────────────

type ContentProps = {
  selectedPreset: string | undefined;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  canApply: boolean;
  compact?: boolean;
  onPreset: (id: string) => void;
  onDaySelect: (d: Date) => void;
  onApply: () => void;
};

function FilterContent({
  selectedPreset,
  rangeStart,
  rangeEnd,
  canApply,
  compact = false,
  onPreset,
  onDaySelect,
  onApply,
}: ContentProps) {
  return (
    <div className={`flex flex-col ${compact ? "gap-3" : "gap-5"}`}>
      {/* Calendar */}
      <RangeCalendar
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        onSelect={onDaySelect}
        compact={compact}
      />

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-black/6" />
        <span className={`${compact ? "text-[11px]" : "text-[12px]"} text-text-muted font-medium`}>or quick select</span>
        <div className="flex-1 h-px bg-black/6" />
      </div>

      {/* Presets */}
      <div className="grid grid-cols-3 gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => onPreset(p.id)}
            className={`${compact ? "py-1.5 text-[12px]" : "py-2 text-[13px]"} px-3 font-semibold text-center transition-all duration-200 active:scale-95`}
            style={{
              borderRadius: 12,
              ...(selectedPreset === p.id
                ? { background: "#fb9d9c", color: "#fff" }
                : { background: "rgba(0,0,0,0.05)", color: "#6e6e73" }),
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Apply */}
      <button
        onClick={onApply}
        disabled={!canApply}
        className={`w-full ${compact ? "py-2.5 text-[13px]" : "py-3.5 text-[15px]"} font-bold transition-all duration-200 active:scale-[0.98]`}
        style={{
          borderRadius: 14,
          background: canApply ? "#fb9d9c" : "rgba(0,0,0,0.06)",
          color: canApply ? "#fff" : "#6e6e73",
        }}
      >
        Apply
      </button>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function DateFilterSheet({ open, current, onClose, onApply }: Props) {
  const isDesktop = useIsDesktop();

  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(current.presetId);
  const [rangeStart, setRangeStart] = useState<Date | null>(current.start);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(current.end);
  const [pickingEnd, setPickingEnd] = useState(false);

  useEffect(() => {
    if (open) {
      setSelectedPreset(current.presetId);
      setRangeStart(current.start);
      setRangeEnd(current.end);
      setPickingEnd(false);
    }
  }, [open]);

  function handlePreset(id: string) {
    const { start, end } = getPresetRange(id);
    setSelectedPreset(id);
    setRangeStart(start);
    setRangeEnd(end);
    setPickingEnd(false);
  }

  function handleDaySelect(date: Date) {
    if (!pickingEnd || !rangeStart) {
      setRangeStart(date);
      setRangeEnd(null);
      setSelectedPreset(undefined);
      setPickingEnd(true);
    } else {
      if (date < rangeStart) {
        setRangeStart(date);
        setRangeEnd(null);
        setPickingEnd(true);
      } else {
        setRangeEnd(date);
        setSelectedPreset(undefined);
        setPickingEnd(false);
      }
    }
  }

  function handleApply() {
    if (!rangeStart) return;
    const end = rangeEnd ?? rangeStart;
    const preset = PRESETS.find((p) => p.id === selectedPreset);
    onApply({
      label: preset?.label ?? formatLabel(rangeStart, end),
      start: rangeStart,
      end,
      presetId: selectedPreset,
    });
    onClose();
  }

  const canApply = !!rangeStart && (!!rangeEnd || !pickingEnd);

  const contentProps: ContentProps = {
    selectedPreset,
    rangeStart,
    rangeEnd,
    canApply,
    compact: isDesktop,
    onPreset: handlePreset,
    onDaySelect: handleDaySelect,
    onApply: handleApply,
  };

  // ── Desktop modal ──────────────────────────────────────────────────────────
  if (isDesktop) {
    return (
      <Modal open={open} onClose={onClose} title="Select period">
        <FilterContent {...contentProps} />
      </Modal>
    );
  }

  // ── Mobile drawer ──────────────────────────────────────────────────────────
  return (
    <Drawer.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-60 bg-black/30" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-70 outline-none">
          <div className="bg-surface rounded-t-[28px] shadow-[0_-4px_40px_rgba(0,0,0,0.10)] pb-[calc(24px+env(safe-area-inset-bottom))]">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-9 h-1 rounded-full bg-black/10" />
            </div>
            <div className="px-5 pt-1 pb-4 flex flex-col gap-5">
              <Drawer.Title className="text-[17px] font-bold text-text">
                Select period
              </Drawer.Title>
              <FilterContent {...contentProps} />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
