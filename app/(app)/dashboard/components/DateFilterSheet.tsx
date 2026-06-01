"use client";

import { useState, useEffect } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

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

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isBetween(d: Date, s: Date, e: Date) {
  return d > s && d < e;
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

function Calendar({
  rangeStart,
  rangeEnd,
  onSelect,
}: {
  rangeStart: Date | null;
  rangeEnd: Date | null;
  onSelect: (d: Date) => void;
}) {
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());

  const today = startOfDay(new Date());
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startOffset = firstDayOfMonth.getDay();

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthLabel = firstDayOfMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Month nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 active:opacity-60 transition-opacity"
        >
          <IconChevronLeft size={18} stroke={2} className="text-text-muted" />
        </button>
        <span className="text-[14px] font-semibold text-text">{monthLabel}</span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 active:opacity-60 transition-opacity"
        >
          <IconChevronRight size={18} stroke={2} className="text-text-muted" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7">
        {DAYS.map((d) => (
          <div key={d} className="text-[11px] font-semibold text-text-muted text-center py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;

          const date = startOfDay(new Date(viewYear, viewMonth, day));
          const isStart = rangeStart ? sameDay(date, rangeStart) : false;
          const isEnd = rangeEnd ? sameDay(date, rangeEnd) : false;
          const isEndOrStart = isStart || isEnd;
          const inRange =
            rangeStart && rangeEnd ? isBetween(date, rangeStart, rangeEnd) : false;
          const isToday = sameDay(date, today);

          const colInRow = i % 7;
          const isFirstCol = colInRow === 0;
          const isLastCol = colInRow === 6;

          return (
            <div key={day} className="relative flex items-center justify-center h-10">
              {/* Range band */}
              {(inRange || isStart || isEnd) && rangeStart && rangeEnd && (
                <div
                  className="absolute inset-y-1"
                  style={{
                    background: "rgba(251,157,156,0.15)",
                    left: isStart || isFirstCol ? "50%" : 0,
                    right: isEnd || isLastCol ? "50%" : 0,
                  }}
                />
              )}

              <button
                onClick={() => onSelect(date)}
                className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-medium transition-all duration-150 active:scale-90"
                style={
                  isEndOrStart
                    ? { background: "#fb9d9c", color: "#fff", fontWeight: 700 }
                    : isToday
                    ? { color: "#fb9d9c", fontWeight: 700 }
                    : { color: "#1c1c1e" }
                }
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DateFilterSheet({ open, current, onClose, onApply }: Props) {
  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(current.presetId);
  const [rangeStart, setRangeStart] = useState<Date | null>(current.start);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(current.end);
  const [pickingEnd, setPickingEnd] = useState(false);

  // Sync when sheet opens
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

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-60 transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.25)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      />

      {/* Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-70 transition-transform duration-350 ease-out"
        style={{
          transform: open ? "translateY(0)" : "translateY(110%)",
          willChange: "transform",
        }}
      >
        <div className="bg-surface rounded-t-[28px] shadow-[0_-4px_40px_rgba(0,0,0,0.12)] pb-[calc(24px+env(safe-area-inset-bottom))]">
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-9 h-1 rounded-full bg-black/10" />
          </div>

          <div className="px-5 pt-2 pb-4 flex flex-col gap-5">
            {/* Title */}
            <h2 className="text-[17px] font-bold text-text">Select period</h2>

            {/* Presets grid */}
            <div className="grid grid-cols-3 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePreset(p.id)}
                  className="py-2 px-3 rounded-[14px] text-[13px] font-semibold text-center transition-all duration-200 active:scale-95"
                  style={
                    selectedPreset === p.id
                      ? { background: "#fb9d9c", color: "#fff" }
                      : { background: "rgba(0,0,0,0.05)", color: "#6e6e73" }
                  }
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-black/[0.06]" />
              <span className="text-[12px] text-text-muted font-medium">or pick a range</span>
              <div className="flex-1 h-px bg-black/[0.06]" />
            </div>

            {/* Range hint */}
            {pickingEnd && rangeStart && (
              <div className="text-[12px] text-text-muted text-center -mt-2">
                From <span className="font-semibold text-primary">{rangeStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span> — tap an end date
              </div>
            )}

            {/* Calendar */}
            <Calendar
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              onSelect={handleDaySelect}
            />

            {/* Apply */}
            <button
              onClick={handleApply}
              disabled={!canApply}
              className="w-full py-3.5 rounded-[16px] text-[15px] font-bold transition-all duration-200 active:scale-[0.98]"
              style={{
                background: canApply ? "#fb9d9c" : "rgba(0,0,0,0.06)",
                color: canApply ? "#fff" : "#6e6e73",
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
