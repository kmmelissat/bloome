"use client";

import { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

type Props = {
  rangeStart: Date | null;
  rangeEnd: Date | null;
  onSelect: (d: Date) => void;
  compact?: boolean;
};

export default function RangeCalendar({ rangeStart, rangeEnd, onSelect, compact = false }: Props) {
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());

  const today = startOfDay(new Date());
  const firstDay = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startOffset = firstDay.getDay();

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthLabel = firstDay.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  }

  const cellSize   = compact ? "h-8 w-8"   : "h-9 w-9";
  const cellRow    = compact ? "h-8"        : "h-10";
  const dayFontSize  = compact ? "text-[12px]" : "text-[14px]";
  const labelFontSize = compact ? "text-[10px]" : "text-[11px]";

  return (
    <div className={`flex flex-col ${compact ? "gap-2" : "gap-3"}`}>
      {/* Selected range display */}
      <div className="flex items-center gap-2">
        <div
          className={`flex-1 flex flex-col items-center px-3 ${compact ? "py-1.5" : "py-2.5"}`}
          style={{ borderRadius: 12, background: "rgba(0,0,0,0.04)" }}
        >
          <span className="text-[9px] font-semibold text-text-muted uppercase tracking-wide mb-0.5">From</span>
          <span className={`${compact ? "text-[12px]" : "text-[14px]"} font-bold text-text`}>
            {rangeStart ? formatDate(rangeStart) : "—"}
          </span>
        </div>
        <div
          className={`flex-1 flex flex-col items-center px-3 ${compact ? "py-1.5" : "py-2.5"}`}
          style={{ borderRadius: 12, background: "rgba(0,0,0,0.04)" }}
        >
          <span className="text-[9px] font-semibold text-text-muted uppercase tracking-wide mb-0.5">To</span>
          <span
            className={`${compact ? "text-[12px]" : "text-[14px]"} font-bold`}
            style={{ color: rangeEnd ? "#1c1c1e" : "#d1d1d6" }}
          >
            {rangeEnd ? formatDate(rangeEnd) : "—"}
          </span>
        </div>
      </div>

      {/* Month nav */}
      <div className="flex items-center justify-between px-3 py-2">
        <button
          onClick={prevMonth}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/5 active:opacity-60"
        >
          <IconChevronLeft size={compact ? 14 : 18} stroke={2} className="text-text-muted" />
        </button>
        <span className={`${compact ? "text-[12px]" : "text-[14px]"} font-semibold text-text`}>
          {monthLabel}
        </span>
        <button
          onClick={nextMonth}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/5 active:opacity-60"
        >
          <IconChevronRight size={compact ? 14 : 18} stroke={2} className="text-text-muted" />
        </button>
      </div>

      {/* Day-of-week labels */}
      <div className="grid grid-cols-7">
        {WEEK_DAYS.map((d) => (
          <div key={d} className={`${labelFontSize} font-semibold text-text-muted text-center py-0.5`}>
            {d}
          </div>
        ))}
      </div>

      {/* Day grid — fixed height = 6 rows max */}
      <div className="grid grid-cols-7" style={{ height: compact ? 192 : 240 }}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;

          const date = startOfDay(new Date(viewYear, viewMonth, day));
          const isStart = rangeStart ? sameDay(date, rangeStart) : false;
          const isEnd = rangeEnd ? sameDay(date, rangeEnd) : false;
          const inRange =
            rangeStart && rangeEnd ? date > rangeStart && date < rangeEnd : false;
          const isToday = sameDay(date, today);
          const isEndOrStart = isStart || isEnd;

          const colInRow = i % 7;
          const isFirstCol = colInRow === 0;
          const isLastCol = colInRow === 6;

          return (
            <div key={day} className={`relative flex items-center justify-center ${cellRow}`}>
              {/* Range band */}
              {(inRange || isStart || isEnd) && rangeStart && rangeEnd && (
                <div
                  className="absolute inset-y-1"
                  style={{
                    background: "rgba(251,157,156,0.15)",
                    left: isStart ? "50%" : 0,
                    right: isEnd ? "50%" : 0,
                    borderTopLeftRadius: isStart || isFirstCol ? 99 : 0,
                    borderBottomLeftRadius: isStart || isFirstCol ? 99 : 0,
                    borderTopRightRadius: isEnd || isLastCol ? 99 : 0,
                    borderBottomRightRadius: isEnd || isLastCol ? 99 : 0,
                  }}
                />
              )}
              <button
                onClick={() => onSelect(date)}
                className={`relative z-10 ${cellSize} rounded-full flex items-center justify-center ${dayFontSize} font-medium transition-all duration-150 active:scale-90`}
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
