"use client";

import { useState, useEffect } from "react";
import type { DateRange } from "react-day-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";

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

function formatLabel(start: Date, end: Date): string {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  if (start.toDateString() === end.toDateString()) return fmt(start);
  if (start.getFullYear() !== end.getFullYear())
    return `${fmt(start)}, ${start.getFullYear()} – ${fmt(end)}, ${end.getFullYear()}`;
  return `${fmt(start)} – ${fmt(end)}`;
}

export default function DateFilterModal({ open, current, onClose, onApply }: Props) {
  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(current.presetId);
  const [range, setRange] = useState<DateRange | undefined>({
    from: current.start,
    to: current.end,
  });

  useEffect(() => {
    if (open) {
      setSelectedPreset(current.presetId);
      setRange({ from: current.start, to: current.end });
    }
  }, [open]);

  function handlePreset(id: string) {
    const { start, end } = getPresetRange(id);
    setSelectedPreset(id);
    setRange({ from: start, to: end });
  }

  function handleRangeSelect(r: DateRange | undefined) {
    setRange(r);
    setSelectedPreset(undefined);
  }

  function handleApply() {
    if (!range?.from) return;
    const end = range.to ?? range.from;
    const preset = PRESETS.find((p) => p.id === selectedPreset);
    onApply({
      label: preset?.label ?? formatLabel(range.from, end),
      start: range.from,
      end,
      presetId: selectedPreset,
    });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-32px)] max-w-sm rounded-[28px] border-0 bg-bg p-0 shadow-[0_8px_40px_rgba(0,0,0,0.14)] gap-0 z-80"
      >
        <DialogHeader className="px-5 pt-5 pb-0">
          <DialogTitle className="text-[17px] font-bold text-text text-left">
            Select period
          </DialogTitle>
        </DialogHeader>

        <div className="px-5 pt-4 pb-5 flex flex-col gap-4">
          {/* Presets */}
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
            <div className="flex-1 h-px bg-black/6" />
            <span className="text-[11px] text-text-muted font-medium">or pick a range</span>
            <div className="flex-1 h-px bg-black/6" />
          </div>

          {/* Calendar */}
          <Calendar
            mode="range"
            selected={range}
            onSelect={handleRangeSelect}
            numberOfMonths={1}
            disabled={{ after: new Date() }}
            classNames={{
              root: "w-full",
              month: "w-full",
              month_grid: "w-full",
              weekdays: "flex justify-around",
              weekday: "text-text-muted text-[11px] font-medium w-9 text-center",
              week: "flex justify-around mt-1",
              day: "relative",
              range_start: "bg-transparent",
              range_middle: "bg-transparent",
              range_end: "bg-transparent",
              today: "bg-transparent",
            }}
            components={{
              DayButton: ({ day, modifiers, ...props }) => {
                const isStart = modifiers.range_start;
                const isEnd = modifiers.range_end;
                const isMid = modifiers.range_middle;
                const isToday = modifiers.today;
                const isDisabled = modifiers.disabled;

                return (
                  <div className="relative flex items-center justify-center w-full h-9">
                    {(isMid || isStart || isEnd) && (
                      <div
                        className="absolute inset-y-0.5"
                        style={{
                          background: "rgba(251,157,156,0.18)",
                          left: isStart ? "50%" : 0,
                          right: isEnd ? "50%" : 0,
                        }}
                      />
                    )}
                    <button
                      {...props}
                      disabled={isDisabled}
                      className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-[14px] transition-all duration-150 active:scale-90 disabled:opacity-30"
                      style={
                        isStart || isEnd
                          ? { background: "#fb9d9c", color: "#fff", fontWeight: 700 }
                          : isToday
                          ? { color: "#fb9d9c", fontWeight: 700 }
                          : { color: "#1c1c1e" }
                      }
                    >
                      {day.date.getDate()}
                    </button>
                  </div>
                );
              },
            }}
          />

          {/* Apply */}
          <button
            onClick={handleApply}
            disabled={!range?.from}
            className="w-full py-3.5 rounded-[16px] text-[15px] font-bold transition-all duration-200 active:scale-[0.98] disabled:opacity-40"
            style={{ background: "#fb9d9c", color: "#fff" }}
          >
            Apply
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
