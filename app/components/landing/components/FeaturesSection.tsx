"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  IconCreditCard, IconWifi, IconBell, IconSparkles,
  IconCoffee, IconShoppingBag, IconCar, IconMail,
  IconCheck, IconAlertTriangle, IconDownload,
  IconChevronRight, IconPlus, IconHome2, IconList,
  IconChartBar, IconUser,
} from "@tabler/icons-react";

// ── Shared ──────────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};
const headerStagger = { show: { transition: { staggerChildren: 0.13 } } };
const textStagger   = { show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

function FadeBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={headerStagger} initial="hidden" animate={inView ? "show" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

// ── iOS system color constants ───────────────────────────────────────────────

const sys = {
  label:      "#1c1c1e",
  label2:     "rgba(60,60,67,0.60)",
  label3:     "rgba(60,60,67,0.30)",
  separator:  "rgba(60,60,67,0.12)",
  bg:         "#fffaf9",
  bg2:        "#f2f2f7",
  card:       "#ffffff",
  tint:       "#fb9d9c",
};

// ── iOS Tab bar ───────────────────────────────────────────────────────────────

const tabItems = [
  { Icon: IconHome2,    label: "Home" },
  { Icon: IconList,     label: "Txns" },
  { Icon: IconCreditCard, label: "Cards" },
  { Icon: IconChartBar, label: "Budgets" },
  { Icon: IconUser,     label: "Profile" },
];

function TabBar({ active }: { active: number }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex justify-around items-end pb-5 pt-2 z-30"
      style={{ background: "rgba(249,249,251,0.85)", backdropFilter: "blur(16px)", borderTop: `0.5px solid ${sys.separator}` }}
    >
      {tabItems.map(({ Icon, label }, i) => (
        <div key={label} className="flex flex-col items-center gap-0.5">
          <Icon
            size={22}
            stroke={i === active ? 2.2 : 1.6}
            style={{ color: i === active ? sys.tint : sys.label3 }}
          />
          <span style={{ fontSize: 8, color: i === active ? sys.tint : sys.label3, fontWeight: i === active ? 600 : 400 }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── iPhone 15 Pro–style frame ─────────────────────────────────────────────────

function IPhoneFrame({ children, dark = false, inView = false }: {
  children: React.ReactNode;
  dark?: boolean;
  inView?: boolean;
}) {
  const fg    = dark ? "rgba(255,255,255,0.9)" : sys.label;
  const fgDim = dark ? "rgba(255,255,255,0.32)" : sys.label3;

  return (
    <div
      className="relative mx-auto select-none"
      style={{
        width: 226,
        height: 490,
        borderRadius: 52,
        background: "linear-gradient(160deg,#4a4a4c 0%,#2e2e30 35%,#1a1a1c 100%)",
        boxShadow: [
          "inset 0 0 0 1px rgba(255,255,255,0.13)",
          "inset 0 1.5px 0 rgba(255,255,255,0.22)",
          "0 60px 140px rgba(0,0,0,0.48)",
          "0 24px 60px rgba(0,0,0,0.30)",
          "0 6px 16px rgba(0,0,0,0.20)",
        ].join(", "),
      }}
    >
      {/* Volume buttons */}
      {[88, 130].map((top) => (
        <div key={top} className="absolute"
          style={{ left: -3, top, width: 3, height: 32, borderRadius: "2px 0 0 2px", background: "linear-gradient(to right,#222224,#3a3a3c)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}
        />
      ))}
      {/* Power button */}
      <div className="absolute"
        style={{ right: -3, top: 112, width: 3, height: 60, borderRadius: "0 2px 2px 0", background: "linear-gradient(to left,#222224,#3a3a3c)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}
      />

      {/* Screen glass */}
      <div className="absolute overflow-hidden"
        style={{ inset: 7, borderRadius: 45, background: dark ? "#0b0b0d" : sys.bg, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.30)" }}
      >
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between" style={{ padding: "11px 20px 0" }}>
          <span className="text-[9px] font-semibold" style={{ color: fg }}>9:41</span>
          <div className="flex items-center gap-2">
            <div className="flex items-end gap-0.5">
              {[4, 6, 8, 10].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, borderRadius: 1, background: i < 3 ? fg : fgDim }} />
              ))}
            </div>
            <IconWifi size={9} stroke={2.5} style={{ color: fg }} />
            <div className="flex items-center gap-px">
              <div style={{ width: 18, height: 9, borderRadius: 2, border: `1px solid ${fgDim}`, padding: 1.5 }}>
                <div style={{ width: "88%", height: "100%", borderRadius: 1, background: fg }} />
              </div>
              <div style={{ width: 2, height: 5, background: fgDim, borderRadius: "0 1px 1px 0" }} />
            </div>
          </div>
        </div>

        {/* Dynamic Island */}
        <div className="absolute z-40"
          style={{ top: 9, left: "50%", transform: "translateX(-50%)", width: 80, height: 24, background: "#000", borderRadius: 12 }}
        />

        {/* Content */}
        <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 45, paddingTop: 46 }}>
          {children}
        </div>

        {/* Glare */}
        <div className="absolute inset-0 pointer-events-none z-20"
          style={{ borderRadius: 45, background: "linear-gradient(135deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.01) 40%,transparent 55%)" }}
        />

        {/* Home indicator */}
        <div className="absolute z-30 pointer-events-none"
          style={{ bottom: 8, left: "50%", transform: "translateX(-50%)", width: 88, height: 5, borderRadius: 3, background: dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.15)" }}
        />

        {/* Screen wake */}
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 48, borderRadius: 45, background: dark ? "#000" : "#f5f5f7" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: inView ? 0 : 1 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// ── Shared iOS nav bar ────────────────────────────────────────────────────────

function NavBar({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 pt-1 pb-2">
      <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5, color: sys.label, lineHeight: 1 }}>{title}</span>
      {right}
    </div>
  );
}

// ── Mockup 1 — Card detail ───────────────────────────────────────────────────

function CardMockup() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <IPhoneFrame inView={inView}>
      <div ref={ref} className="flex flex-col h-full pb-14" style={{ background: sys.bg2 }}>
        {/* Nav */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7, duration: 0.4, ease }}>
          <NavBar title="Cards" right={
            <div style={{ width: 28, height: 28, borderRadius: 14, background: sys.tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconPlus size={14} stroke={2.5} style={{ color: "#fff" }} />
            </div>
          } />
        </motion.div>

        <div className="flex-1 overflow-hidden px-3 flex flex-col gap-3">
          {/* Bank card */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6, ease }}
            style={{
              borderRadius: 18,
              background: "linear-gradient(135deg,#fb9d9c 0%,#f7856e 40%,#ffe2cf 100%)",
              padding: "14px 16px",
              boxShadow: "0 8px 32px rgba(251,133,110,0.40), 0 2px 8px rgba(0,0,0,0.10)",
              position: "relative",
              overflow: "hidden",
              minHeight: 112,
            }}
          >
            {/* Holographic tint */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,rgba(255,255,255,0.15) 0%,transparent 40%,rgba(255,255,255,0.08) 100%)", borderRadius: 18 }} />
            <div className="flex items-start justify-between mb-4">
              {/* EMV chip */}
              <div style={{ width: 26, height: 19, borderRadius: 3, background: "linear-gradient(135deg,#e8c860,#c8a020,#f0d870,#c8a020)", position: "relative", overflow: "hidden", boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.20)" }}>
                <div style={{ position: "absolute", top: 3, left: 3, right: 3, bottom: 3, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 2 }}>
                  {[0,1,2,3].map(i => <div key={i} style={{ background: "rgba(0,0,0,0.18)", borderRadius: 1 }} />)}
                </div>
                {/* Center contact */}
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 8, height: 7, background: "rgba(200,160,32,0.6)", borderRadius: 1 }} />
              </div>
              {/* VISA wordmark */}
              <span style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.9)", letterSpacing: 1.5, fontStyle: "italic" }}>VISA</span>
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 11, fontWeight: 600, letterSpacing: 2.5, fontFamily: "monospace" }}>
                •••• •••• •••• 4821
              </p>
              <div className="flex items-center justify-between mt-1.5">
                <div>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 7, textTransform: "uppercase", letterSpacing: 0.8 }}>Card holder</p>
                  <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 9, fontWeight: 600, marginTop: 1 }}>MELISSA SOLORZANO</p>
                </div>
                <div className="text-right">
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 7, textTransform: "uppercase", letterSpacing: 0.8 }}>Expires</p>
                  <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 9, fontWeight: 600, marginTop: 1 }}>12/27</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats inset group */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.95, duration: 0.5, ease }}
            style={{ borderRadius: 12, background: sys.card, overflow: "hidden" }}
          >
            <div className="flex items-center px-3 py-2.5" style={{ borderBottom: `0.5px solid ${sys.separator}` }}>
              <div className="flex-1">
                <p style={{ fontSize: 9, color: sys.label2 }}>Balance used</p>
                <p style={{ fontSize: 16, fontWeight: 700, color: sys.label, lineHeight: 1.1 }}>$1,240</p>
              </div>
              <div className="flex-1 text-right">
                <p style={{ fontSize: 9, color: sys.label2 }}>Credit limit</p>
                <p style={{ fontSize: 16, fontWeight: 700, color: sys.label, lineHeight: 1.1 }}>$5,000</p>
              </div>
            </div>
            <div className="px-3 py-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <span style={{ fontSize: 9, color: sys.label2 }}>24% used</span>
                <span style={{ fontSize: 9, color: "#34c759", fontWeight: 600 }}>Healthy</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: sys.bg2, overflow: "hidden" }}>
                <motion.div
                  style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg,#fb9d9c,#f7856e)" }}
                  initial={{ width: 0 }} animate={inView ? { width: "24%" } : {}}
                  transition={{ duration: 1.2, delay: 1.1, ease }}
                />
              </div>
            </div>
          </motion.div>

          {/* Notifications group */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.5, ease }}
            style={{ borderRadius: 12, background: sys.card, overflow: "hidden" }}
          >
            <div className="flex items-center gap-2.5 px-3 py-2.5" style={{ borderBottom: `0.5px solid ${sys.separator}` }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "#fcefb6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <IconBell size={14} stroke={1.8} style={{ color: "#b8860b" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 11, fontWeight: 600, color: sys.label }}>Payment due Jun 15</p>
                <p style={{ fontSize: 9, color: sys.label2, marginTop: 1 }}>Min. $48 · Total $1,240</p>
              </div>
              <IconChevronRight size={12} stroke={2} style={{ color: sys.label3, flexShrink: 0 }} />
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2.5">
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(251,157,156,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <IconCheck size={14} stroke={2.2} style={{ color: sys.tint }} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 11, fontWeight: 600, color: sys.label }}>Reminder set</p>
                <p style={{ fontSize: 9, color: sys.label2, marginTop: 1 }}>Jun 12 · 3 days before</p>
              </div>
            </div>
          </motion.div>
        </div>

        <TabBar active={2} />
      </div>
    </IPhoneFrame>
  );
}

// ── Mockup 2 — Budgets ───────────────────────────────────────────────────────

const budgets = [
  { label: "Food & Drink", pct: 72, spent: "$640",  total: "$900",   warn: false, color: "#ff9f0a" },
  { label: "Shopping",     pct: 45, spent: "$270",  total: "$600",   warn: false, color: "#30d158" },
  { label: "Transport",    pct: 28, spent: "$84",   total: "$300",   warn: false, color: "#0a84ff" },
  { label: "Housing",      pct: 95, spent: "$950",  total: "$1,000", warn: true,  color: "#ff453a" },
];

function BudgetMockup() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <IPhoneFrame inView={inView}>
      <div ref={ref} className="flex flex-col h-full pb-14" style={{ background: sys.bg2 }}>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7, duration: 0.4, ease }}>
          <NavBar title="May Budgets" />
        </motion.div>

        <div className="flex-1 overflow-hidden px-3 flex flex-col gap-2">
          {/* Budget cells */}
          <motion.div
            style={{ borderRadius: 12, background: sys.card, overflow: "hidden" }}
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5, ease }}
          >
            {budgets.map(({ label, pct, spent, total, warn, color }, i) => (
              <div
                key={label}
                style={{ borderBottom: i < budgets.length - 1 ? `0.5px solid ${sys.separator}` : "none" }}
              >
                <div className="px-3 py-2.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {warn && <IconAlertTriangle size={10} stroke={2.2} style={{ color: "#ff453a" }} />}
                      <span style={{ fontSize: 11, fontWeight: 600, color: warn ? "#ff453a" : sys.label }}>{label}</span>
                    </div>
                    <span style={{ fontSize: 9, color: sys.label2 }}>
                      <span style={{ color: warn ? "#ff453a" : sys.label, fontWeight: warn ? 700 : 400 }}>{spent}</span>
                      {" / "}{total}
                    </span>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: sys.bg2, overflow: "hidden" }}>
                    <motion.div
                      style={{ height: "100%", borderRadius: 2, background: color }}
                      initial={{ width: 0 }} animate={inView ? { width: `${pct}%` } : {}}
                      transition={{ duration: 1.1, delay: 0.95 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* AI insight */}
          <motion.div
            style={{ borderRadius: 12, background: "rgba(251,157,156,0.12)", border: `0.5px solid rgba(251,157,156,0.25)`, padding: "10px 12px" }}
            initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.5, ease }}
            className="flex items-start gap-2"
          >
            <IconSparkles size={13} stroke={1.8} style={{ color: sys.tint, marginTop: 1, flexShrink: 0 }} />
            <p style={{ fontSize: 11, color: sys.label, lineHeight: 1.4 }}>
              At this pace you&apos;ll exceed <span style={{ fontWeight: 700, color: "#ff453a" }}>Housing</span> by $120 before month-end.
            </p>
          </motion.div>

          {/* Monthly summary */}
          <motion.div
            style={{ borderRadius: 12, background: sys.card, overflow: "hidden" }}
            initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.6, duration: 0.4, ease }}
          >
            <div className="px-3 py-2.5 flex items-center justify-between">
              <div>
                <p style={{ fontSize: 9, color: sys.label2 }}>Total spent</p>
                <p style={{ fontSize: 16, fontWeight: 700, color: sys.label }}>$1,944</p>
              </div>
              <div className="text-right">
                <p style={{ fontSize: 9, color: sys.label2 }}>Remaining</p>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#30d158" }}>$856</p>
              </div>
            </div>
          </motion.div>
        </div>

        <TabBar active={3} />
      </div>
    </IPhoneFrame>
  );
}

// ── Mockup 3 — Auto-import ───────────────────────────────────────────────────

function AutoImportMockup() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const darkLabel  = "rgba(255,255,255,0.88)";
  const darkLabel2 = "rgba(255,255,255,0.45)";
  const darkSep    = "rgba(255,255,255,0.08)";
  const darkCell   = "rgba(255,255,255,0.07)";

  return (
    <IPhoneFrame dark inView={inView}>
      <div ref={ref} className="flex flex-col h-full pb-16" style={{ background: "#0b0b0d" }}>
        {/* Nav */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7, duration: 0.4, ease }}
          className="flex items-center justify-between px-4 pt-1 pb-2"
        >
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5, color: darkLabel }}>Transactions</span>
        </motion.div>

        <div className="flex-1 overflow-hidden px-3 flex flex-col gap-2.5">
          {/* Notification banner */}
          <motion.div
            style={{ borderRadius: 12, background: "rgba(251,157,156,0.14)", border: "0.5px solid rgba(251,157,156,0.25)", overflow: "hidden" }}
            initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.75, duration: 0.5, ease }}
          >
            <div className="flex items-center gap-2 px-3 py-2" style={{ borderBottom: "0.5px solid rgba(251,157,156,0.2)" }}>
              <IconMail size={11} stroke={2} style={{ color: sys.tint }} />
              <p style={{ fontSize: 10, fontWeight: 600, color: sys.tint }}>New email from HSBC</p>
            </div>
            <div className="px-3 py-2">
              <p style={{ fontSize: 9, color: darkLabel2, lineHeight: 1.5 }}>
                "Your card ••4821 was charged{" "}
                <span style={{ color: "rgba(255,255,255,0.72)", fontWeight: 600 }}>$89.00</span>
                {" "}at Zara on May 28."
              </p>
            </div>
          </motion.div>

          {/* Parse indicator */}
          <motion.div
            className="flex items-center gap-2 px-1"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.0, duration: 0.4, ease }}
          >
            <div style={{ height: 0.5, flex: 1, background: darkSep }} />
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "rgba(251,157,156,0.12)", border: "0.5px solid rgba(251,157,156,0.2)" }}>
              <IconSparkles size={8} stroke={1.8} style={{ color: sys.tint }} />
              <span style={{ fontSize: 8, fontWeight: 600, color: sys.tint }}>auto-parsed</span>
            </div>
            <div style={{ height: 0.5, flex: 1, background: darkSep }} />
          </motion.div>

          {/* Parsed transaction */}
          <motion.div
            style={{ borderRadius: 12, background: darkCell, overflow: "hidden" }}
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.5, ease }}
          >
            <div className="flex items-center gap-3 px-3 py-3">
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,226,207,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <IconShoppingBag size={16} stroke={1.8} style={{ color: "#ffe2cf" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 13, fontWeight: 600, color: darkLabel }}>Zara</p>
                <p style={{ fontSize: 9, color: darkLabel2, marginTop: 2 }}>Shopping · Card ••4821</p>
              </div>
              <div className="text-right">
                <p style={{ fontSize: 14, fontWeight: 700, color: sys.tint }}>-$89</p>
                <p style={{ fontSize: 8, color: darkLabel2, marginTop: 1 }}>May 28</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mx-3 mb-2.5 px-2.5 py-1.5 rounded-lg" style={{ background: "rgba(48,209,88,0.12)" }}>
              <IconCheck size={10} stroke={2.5} style={{ color: "#30d158" }} />
              <p style={{ fontSize: 9, fontWeight: 600, color: "#30d158" }}>Logged automatically</p>
            </div>
          </motion.div>

          {/* Recent list */}
          <motion.div
            style={{ borderRadius: 12, background: darkCell, overflow: "hidden" }}
            initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.4, ease }}
          >
            {[
              { Icon: IconCoffee, label: "Starbucks", sub: "Coffee · Card ••4821", amount: "-$6.50", amtColor: darkLabel },
              { Icon: IconCar,    label: "Uber",      sub: "Transport · Card ••4821", amount: "-$12.30", amtColor: darkLabel },
            ].map(({ Icon, label, sub, amount, amtColor }, i) => (
              <div key={label} className="flex items-center gap-2.5 px-3 py-2.5"
                style={{ borderTop: i > 0 ? `0.5px solid ${darkSep}` : "none" }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={14} stroke={1.8} style={{ color: darkLabel2 }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 11, fontWeight: 600, color: darkLabel }}>{label}</p>
                  <p style={{ fontSize: 8, color: darkLabel2, marginTop: 1 }}>{sub}</p>
                </div>
                <p style={{ fontSize: 11, fontWeight: 600, color: amtColor }}>{amount}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dark tab bar */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end pb-5 pt-2 z-30"
          style={{ background: "rgba(18,18,20,0.85)", backdropFilter: "blur(16px)", borderTop: "0.5px solid rgba(255,255,255,0.08)" }}
        >
          {tabItems.map(({ Icon, label }, i) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <Icon size={22} stroke={i === 1 ? 2.2 : 1.6} style={{ color: i === 1 ? sys.tint : "rgba(255,255,255,0.28)" }} />
              <span style={{ fontSize: 8, color: i === 1 ? sys.tint : "rgba(255,255,255,0.28)", fontWeight: i === 1 ? 600 : 400 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </IPhoneFrame>
  );
}

// ── Mockup 4 — PWA home screen ───────────────────────────────────────────────

const homeApps = [
  { label: "Messages", color: "bg-green-400" },
  { label: "Photos",   color: "bg-gradient-to-br from-yellow-300 to-pink-400" },
  { label: "Safari",   color: "bg-blue-400" },
  { label: "Maps",     color: "bg-green-500" },
  { label: "Mail",     color: "bg-blue-500" },
  { label: "Music",    color: "bg-gradient-to-br from-pink-500 to-red-400" },
  { label: "Wallet",   color: "bg-black" },
  { label: "Settings", color: "bg-gray-400" },
];

function PWAMockup() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <IPhoneFrame inView={inView}>
      <div ref={ref} className="flex flex-col h-full">
        <div className="absolute inset-0 opacity-25"
          style={{ background: "linear-gradient(160deg,#fb9d9c 0%,#fcefb6 50%,#ffe2cf 100%)" }}
        />
        <div className="relative z-10 px-5 pt-1 flex-1 flex flex-col gap-4">
          <motion.div className="text-center mt-1"
            initial={{ opacity: 0, y: -10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.75, ease }}
          >
            <p style={{ fontSize: 10, color: "rgba(28,28,30,0.55)", fontWeight: 500 }}>Friday, May 30</p>
            <p style={{ fontSize: 30, fontWeight: 700, color: "rgba(28,28,30,0.82)", lineHeight: 1 }}>9:41</p>
          </motion.div>

          <div className="grid grid-cols-4 gap-3">
            {homeApps.map(({ label, color }, i) => (
              <motion.div key={label} className="flex flex-col items-center gap-1"
                initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.82 + i * 0.04, ease }}
              >
                <div className={`w-11 h-11 rounded-[14px] ${color} shadow-sm`} />
                <p style={{ fontSize: 7, color: sys.label2, fontWeight: 500, textAlign: "center", lineHeight: 1 }}>{label}</p>
              </motion.div>
            ))}
            <motion.div className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, scale: 0.5 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.2, ease }}
            >
              <motion.div
                className="w-11 h-11 rounded-[14px] flex items-center justify-center shadow-lg"
                style={{ background: "linear-gradient(135deg,#fb9d9c,#ffe2cf)" }}
                animate={{ boxShadow: ["0 0 0 0px #fb9d9c44", "0 0 0 4px #fb9d9c22", "0 0 0 0px #fb9d9c44"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <span style={{ color: "#fff", fontWeight: 800, fontSize: 12 }}>b</span>
              </motion.div>
              <p style={{ fontSize: 7, fontWeight: 700, color: sys.tint, textAlign: "center", lineHeight: 1 }}>bloomé</p>
            </motion.div>
          </div>

          <motion.div
            className="rounded-2xl px-3 py-2.5 flex items-center gap-2.5 mt-auto mb-1"
            style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(16px)", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.3, ease }}
          >
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg,#fb9d9c,#ffe2cf)" }}
            >
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 11 }}>b</span>
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 11, fontWeight: 600, color: sys.label }}>Add bloomé to Home Screen</p>
              <p style={{ fontSize: 9, color: sys.label2, marginTop: 1 }}>bloome.app</p>
            </div>
            <div className="flex items-center gap-1 rounded-lg px-2 py-1" style={{ background: "rgba(251,157,156,0.18)" }}>
              <IconDownload size={9} stroke={2.5} style={{ color: sys.tint }} />
              <span style={{ fontSize: 9, fontWeight: 700, color: sys.tint }}>Add</span>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 mx-4 mb-6 rounded-[18px] px-3 py-2 flex justify-around"
          style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
          {["Phone","Safari","Mail","Music"].map((a) => (
            <div key={a} className="w-10 h-10 rounded-[13px]" style={{ background: "rgba(255,255,255,0.5)" }} />
          ))}
        </div>
      </div>
    </IPhoneFrame>
  );
}

// ── Feature block ─────────────────────────────────────────────────────────────

interface Feature {
  badge: string;
  title: string;
  description: string;
  mockup: React.ReactNode;
  flip?: boolean;
  floatDelay?: number;
}

function FeatureBlock({ badge, title, description, mockup, flip = false, floatDelay = 0 }: Feature) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mockupParallax = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={ref} className={`relative flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 ${flip ? "lg:flex-row-reverse" : ""}`}>
      <motion.div
        className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
        variants={textStagger} initial="hidden" animate={inView ? "show" : "hidden"}
      >
        <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 text-text text-[12px] font-bold mb-5">
          {badge}
        </motion.span>
        <motion.h3 variants={fadeUp} className="text-[28px] md:text-[34px] font-bold text-text tracking-[-0.04em] leading-[1.1] mb-4">
          {title}
        </motion.h3>
        <motion.p variants={fadeUp} className="text-text/70 text-[16px] leading-relaxed max-w-md">
          {description}
        </motion.p>
      </motion.div>

      <div className="flex-1 flex items-center justify-center">
        <motion.div style={{ y: mockupParallax }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 48, rotateY: flip ? 12 : -12 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, ease, delay: 0.1 }}
            style={{ transformPerspective: 900 }}
          >
            <motion.div
              animate={{ y: [0, -14, 0], rotateZ: [0, 0.6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
            >
              <div className="relative">
                <div className="absolute pointer-events-none -z-10"
                  style={{ inset: "-20px -30px", background: "radial-gradient(ellipse 70% 50% at 50% 60%,rgba(251,157,156,0.45) 0%,transparent 70%)", filter: "blur(24px)" }}
                />
                {mockup}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

const features: Feature[] = [
  {
    badge: "Never miss a payment",
    title: "Smart card management.",
    description: "Add your credit and debit cards once. bloomé tracks limits, balances, and due dates so you never get caught off guard.",
    mockup: <CardMockup />,
    flip: false,
    floatDelay: 0,
  },
  {
    badge: "Know before you blow it",
    title: "Budgets that stick.",
    description: "Set monthly limits by category. A live progress bar shows exactly where you stand, and bloomé warns you before you overspend.",
    mockup: <BudgetMockup />,
    flip: true,
    floatDelay: 0.6,
  },
  {
    badge: "Zero effort logging",
    title: "Auto-import from your bank.",
    description: "Forward your bank's notification emails to bloomé. We read them and log the transaction instantly. No manual entry needed.",
    mockup: <AutoImportMockup />,
    flip: false,
    floatDelay: 1.2,
  },
  {
    badge: "Feels native. Is web.",
    title: "Built for your phone, no download needed.",
    description: "bloomé installs from your browser like a native app. It works offline, loads fast, and feels like it belongs on your home screen.",
    mockup: <PWAMockup />,
    flip: true,
    floatDelay: 0.3,
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 md:px-8 pb-32">
      <FadeBlock className="text-center mb-24">
        <motion.h2 variants={fadeUp} className="text-[40px] md:text-[52px] font-bold text-text tracking-[-1.5px] leading-[1.05] mb-4">
          One app for all your<br />
          <span className="font-handwritten text-primary text-[52px] md:text-[64px] tracking-normal">money things</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-text/70 text-[17px] max-w-md mx-auto leading-relaxed">
          Remove all the friction that stands in the way of your financial goals.
        </motion.p>
      </FadeBlock>

      <div className="flex flex-col gap-32 md:gap-40">
        {features.map((f) => (
          <FeatureBlock key={f.badge} {...f} />
        ))}
      </div>
    </section>
  );
}
