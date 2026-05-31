"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  IconCreditCard, IconWifi, IconBell, IconSparkles,
  IconCoffee, IconShoppingBag, IconCar, IconMail,
  IconCheck, IconAlertTriangle, IconDownload,
} from "@tabler/icons-react";

// ── Shared ──────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = { show: { transition: { staggerChildren: 0.12 } } };

function FadeBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── iPhone frame ─────────────────────────────────────────────────────────────

function IPhoneFrame({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className="relative mx-auto"
      style={{
        width: 220,
        height: 440,
        borderRadius: 36,
        background: dark ? "#1c1c1e" : "#f2f2f7",
        boxShadow: "0 0 0 8px #1c1c1e, 0 30px 80px rgba(0,0,0,0.22), 0 8px 20px rgba(0,0,0,0.14)",
        overflow: "hidden",
      }}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
        style={{ width: 80, height: 24, background: "#1c1c1e", borderRadius: "0 0 18px 18px" }}
      />
      {/* Status bar */}
      <div className="absolute top-3 left-5 right-5 flex items-center justify-between z-10 px-1">
        <span className="text-[9px] font-semibold" style={{ color: dark ? "#fff" : "#1c1c1e" }}>9:41</span>
        <div className="flex items-center gap-1">
          <IconWifi size={10} stroke={2} style={{ color: dark ? "#fff" : "#1c1c1e" }} />
          <span className="text-[9px] font-semibold" style={{ color: dark ? "#fff" : "#1c1c1e" }}>100%</span>
        </div>
      </div>
      {/* Screen */}
      <div className="absolute inset-0 pt-8 overflow-hidden" style={{ borderRadius: 36, background: dark ? "#1c1c1e" : "#fffaf9" }}>
        {children}
      </div>
    </div>
  );
}

// ── Mockup 1 — Card detail ───────────────────────────────────────────────────

function CardMockup() {
  return (
    <IPhoneFrame>
      <div className="px-4 pt-3 flex flex-col gap-3">
        <p className="text-[11px] font-semibold text-text-muted">My Cards</p>
        {/* Card visual */}
        <div className="rounded-2xl p-4 flex flex-col gap-6"
          style={{ background: "linear-gradient(135deg,#fb9d9c,#ffe2cf)", minHeight: 110 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-white/80 tracking-widest">VISA</span>
            <IconCreditCard size={16} stroke={1.8} className="text-white/70" />
          </div>
          <div>
            <p className="text-white text-[13px] font-bold tracking-[0.12em]">•••• •••• •••• 4821</p>
            <p className="text-white/70 text-[9px] mt-0.5">Melissa Solorzano</p>
          </div>
        </div>
        {/* Stats row */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Balance used", value: "$1,240" },
            { label: "Limit",        value: "$5,000" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-xl p-2.5">
              <p className="text-[8px] text-text-muted">{label}</p>
              <p className="text-[13px] font-bold text-text">{value}</p>
            </div>
          ))}
        </div>
        {/* Limit bar */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-[9px] text-text-muted">Used 24%</span>
            <span className="text-[9px] text-primary font-semibold">Healthy</span>
          </div>
          <div className="h-1.5 rounded-full bg-black/8">
            <div className="h-full rounded-full bg-primary" style={{ width: "24%" }} />
          </div>
        </div>
        {/* Due date */}
        <div className="bg-accent/40 rounded-xl px-3 py-2 flex items-center gap-2">
          <IconBell size={12} stroke={2} className="text-text-muted shrink-0" />
          <div>
            <p className="text-[9px] text-text font-semibold">Payment due Jun 15</p>
            <p className="text-[8px] text-text-muted">Min. $48 · Total $1,240</p>
          </div>
        </div>
        {/* Badge */}
        <div className="flex items-center gap-1.5 bg-primary/10 rounded-xl px-3 py-2">
          <IconCheck size={11} stroke={2.5} className="text-primary" />
          <p className="text-[9px] font-semibold text-primary">Reminder set for Jun 12</p>
        </div>
      </div>
    </IPhoneFrame>
  );
}

// ── Mockup 2 — Budgets ───────────────────────────────────────────────────────

const budgets = [
  { label: "Food & Drink", pct: 72, spent: "$640", total: "$900",  warn: false },
  { label: "Shopping",     pct: 45, spent: "$270", total: "$600",  warn: false },
  { label: "Transport",    pct: 28, spent: "$84",  total: "$300",  warn: false },
  { label: "Housing",      pct: 95, spent: "$950", total: "$1,000", warn: true  },
];

function BudgetMockup() {
  return (
    <IPhoneFrame>
      <div className="px-4 pt-3 flex flex-col gap-3">
        <p className="text-[11px] font-semibold text-text-muted">May Budgets</p>
        <div className="flex flex-col gap-2.5">
          {budgets.map(({ label, pct, spent, total, warn }) => (
            <div key={label} className="bg-white rounded-xl p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold text-text">{label}</span>
                <span className="text-[9px] text-text-muted">
                  <span className={warn ? "text-primary font-bold" : ""}>{spent}</span>
                  {" / "}{total}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-black/8 overflow-hidden">
                <div
                  className={`h-full rounded-full ${warn ? "bg-primary" : "bg-text/25"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              {warn && (
                <div className="flex items-center gap-1 mt-1.5">
                  <IconAlertTriangle size={10} stroke={2} className="text-primary" />
                  <p className="text-[8px] text-primary font-semibold">95% used — almost there</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* AI chip */}
        <div className="rounded-xl bg-primary/10 px-3 py-2 flex items-start gap-2">
          <IconSparkles size={11} stroke={1.8} className="text-primary mt-0.5 shrink-0" />
          <p className="text-[8px] text-text leading-relaxed">
            At this pace you&apos;ll exceed Housing by <span className="font-bold text-primary">$120</span> before month-end.
          </p>
        </div>
      </div>
    </IPhoneFrame>
  );
}

// ── Mockup 3 — Auto-import ───────────────────────────────────────────────────

function AutoImportMockup() {
  return (
    <IPhoneFrame dark>
      <div className="px-4 pt-3 flex flex-col gap-3">
        <p className="text-[11px] font-semibold text-white/50">Transactions</p>
        {/* Incoming email banner */}
        <div className="rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
            <IconMail size={11} stroke={2} className="text-primary" />
            <p className="text-[9px] font-semibold text-white/80">Email received from HSBC</p>
          </div>
          <div className="px-3 py-2">
            <p className="text-[8px] text-white/40 leading-relaxed">
              "Your card ending in 4821 was charged <span className="text-white/70 font-semibold">$89.00</span> at Zara on May 28."
            </p>
          </div>
        </div>
        {/* Arrow */}
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[8px] text-primary font-semibold">Auto-parsed by bloomé ✦</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        {/* Created transaction */}
        <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.07)" }}>
          <span className="w-9 h-9 rounded-xl bg-warm/30 flex items-center justify-center shrink-0">
            <IconShoppingBag size={15} stroke={1.8} className="text-warm" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[11px] font-semibold leading-none">Zara</p>
            <p className="text-white/40 text-[9px] mt-0.5">Shopping · Card ••4821</p>
          </div>
          <p className="text-primary text-[13px] font-bold">-$89</p>
        </div>
        {/* Status */}
        <div className="flex items-center gap-1.5 rounded-xl px-3 py-2 bg-primary/15">
          <IconCheck size={11} stroke={2.5} className="text-primary" />
          <p className="text-[9px] font-semibold text-primary">Transaction logged automatically</p>
        </div>
        {/* Recent list */}
        <div className="flex flex-col gap-2">
          {[
            { Icon: IconCoffee, label: "Starbucks", amount: "$6.50", color: "bg-primary/20", textColor: "text-primary" },
            { Icon: IconCar,    label: "Uber",      amount: "$12.30", color: "bg-accent/20",  textColor: "text-text-muted" },
          ].map(({ Icon, label, amount, color, textColor }) => (
            <div key={label} className="rounded-xl p-2.5 flex items-center gap-2.5" style={{ background: "rgba(255,255,255,0.05)" }}>
              <span className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center shrink-0`}>
                <Icon size={12} stroke={1.8} className={textColor} />
              </span>
              <p className="text-white/60 text-[10px] flex-1">{label}</p>
              <p className="text-white/60 text-[10px] font-semibold">-{amount}</p>
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
  return (
    <IPhoneFrame>
      <div className="flex flex-col h-full">
        {/* Wallpaper */}
        <div className="absolute inset-0 opacity-30"
          style={{ background: "linear-gradient(160deg,#fb9d9c 0%,#fcefb6 50%,#ffe2cf 100%)" }}
        />
        <div className="relative z-10 px-5 pt-3 flex-1 flex flex-col gap-4">
          {/* Date */}
          <div className="text-center mt-2">
            <p className="text-[10px] font-medium text-text/60">Friday, May 30</p>
            <p className="text-[28px] font-bold text-text/80 leading-none">9:41</p>
          </div>
          {/* App grid */}
          <div className="grid grid-cols-4 gap-3">
            {homeApps.map(({ label, color }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 rounded-xl ${color} shadow-sm`} />
                <p className="text-[7px] text-text/60 font-medium text-center leading-none">{label}</p>
              </div>
            ))}
            {/* bloomé icon highlighted */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                style={{ background: "linear-gradient(135deg,#fb9d9c,#ffe2cf)", boxShadow: "0 0 0 3px #fb9d9c55, 0 4px 12px #fb9d9c44" }}
              >
                <span className="text-white font-bold text-[11px]">b</span>
              </div>
              <p className="text-[7px] font-bold text-primary text-center leading-none">bloomé</p>
            </div>
          </div>
          {/* Install banner */}
          <div className="rounded-2xl px-3 py-2.5 flex items-center gap-2.5 mt-auto mb-2"
            style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)" }}
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg,#fb9d9c,#ffe2cf)" }}
            >
              <span className="text-white font-bold text-[9px]">b</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-semibold text-text leading-none">Add bloomé to Home Screen</p>
              <p className="text-[8px] text-text-muted mt-0.5">bloome.app</p>
            </div>
            <div className="flex items-center gap-1 bg-primary/15 rounded-lg px-2 py-1">
              <IconDownload size={9} stroke={2.5} className="text-primary" />
              <span className="text-[8px] font-bold text-primary">Add</span>
            </div>
          </div>
        </div>
        {/* Dock */}
        <div className="relative z-10 mx-4 mb-4 rounded-2xl px-4 py-2 flex justify-around"
          style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(12px)" }}
        >
          {["Phone","Safari","Mail","Music"].map((a) => (
            <div key={a} className="w-9 h-9 rounded-xl bg-white/40" />
          ))}
        </div>
      </div>
    </IPhoneFrame>
  );
}

// ── Feature block ───

interface Feature {
  badge: string;
  title: string;
  description: string;
  mockup: React.ReactNode;
  flip?: boolean;
}

function FeatureBlock({ badge, title, description, mockup, flip = false }: Feature) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0]);
  const y      = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [40, 0, 0, -40]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 ${flip ? "lg:flex-row-reverse" : ""}`}
    >
      {/* Text side */}
      <div className="flex-1 flex flex-col items-start">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[12px] font-bold mb-5 tracking-wide">
          {badge}
        </span>
        <h3 className="text-[28px] md:text-[34px] font-bold text-text tracking-[-0.04em] leading-[1.1] mb-4">
          {title}
        </h3>
        <p className="text-text-muted text-[16px] leading-relaxed max-w-md">
          {description}
        </p>
      </div>

      {/* Mockup side */}
      <div className="flex-1 flex items-center justify-center">
        {mockup}
      </div>
    </motion.div>
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
  },
  {
    badge: "Know before you blow it",
    title: "Budgets that stick.",
    description: "Set monthly limits by category. A live progress bar shows exactly where you stand — and bloomé warns you before you overspend.",
    mockup: <BudgetMockup />,
    flip: true,
  },
  {
    badge: "Zero effort logging",
    title: "Auto-import from your bank.",
    description: "Forward your bank's notification emails to bloomé. We read them and log the transaction instantly — no manual entry needed.",
    mockup: <AutoImportMockup />,
    flip: false,
  },
  {
    badge: "Feels native. Is web.",
    title: "Built for your phone, no download needed.",
    description: "bloomé installs from your browser like a native app. It works offline, loads fast, and feels like it belongs on your home screen.",
    mockup: <PWAMockup />,
    flip: true,
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-8 pb-32">
      {/* Header */}
      <FadeBlock className="text-center mb-20">
        <motion.span variants={fadeUp} className="text-[12px] font-bold tracking-[0.15em] uppercase text-primary mb-3 block">
          Everything you need
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="text-[40px] md:text-[52px] font-bold text-text tracking-[-1.5px] leading-[1.05] mb-4"
        >
          One app for all your<br />
          <span className="font-handwritten text-primary text-[52px] md:text-[64px] tracking-normal">money things</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-text-muted text-[17px] max-w-md mx-auto leading-relaxed">
          Remove all the friction that stands in the way of your financial goals.
        </motion.p>
      </FadeBlock>

      {/* Feature blocks */}
      <div className="flex flex-col gap-28">
        {features.map((f) => (
          <FeatureBlock key={f.badge} {...f} />
        ))}
      </div>
    </section>
  );
}
