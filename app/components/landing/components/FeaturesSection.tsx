"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  IconCreditCard, IconWifi, IconBell, IconSparkles,
  IconCoffee, IconShoppingBag, IconCar, IconMail,
  IconCheck, IconAlertTriangle, IconDownload,
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
    <motion.div
      ref={ref}
      variants={headerStagger}
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
        style={{ width: 80, height: 24, background: "#1c1c1e", borderRadius: "0 0 18px 18px" }}
      />
      <div className="absolute top-3 left-5 right-5 flex items-center justify-between z-10 px-1">
        <span className="text-[9px] font-semibold" style={{ color: dark ? "#fff" : "#1c1c1e" }}>9:41</span>
        <div className="flex items-center gap-1">
          <IconWifi size={10} stroke={2} style={{ color: dark ? "#fff" : "#1c1c1e" }} />
          <span className="text-[9px] font-semibold" style={{ color: dark ? "#fff" : "#1c1c1e" }}>100%</span>
        </div>
      </div>
      <div className="absolute inset-0 pt-8 overflow-hidden" style={{ borderRadius: 36, background: dark ? "#1c1c1e" : "#fffaf9" }}>
        {children}
      </div>
    </div>
  );
}

// ── Mockup 1 — Card detail ───────────────────────────────────────────────────

function CardMockup() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <IPhoneFrame>
      <div ref={ref} className="px-4 pt-3 flex flex-col gap-3">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease }}
          className="text-[11px] font-semibold text-text-muted"
        >
          My Cards
        </motion.p>

        {/* Card visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="rounded-2xl p-4 flex flex-col gap-6"
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
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.22, ease }}
          className="grid grid-cols-2 gap-2"
        >
          {[
            { label: "Balance used", value: "$1,240" },
            { label: "Limit",        value: "$5,000" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-xl p-2.5">
              <p className="text-[8px] text-text-muted">{label}</p>
              <p className="text-[13px] font-bold text-text">{value}</p>
            </div>
          ))}
        </motion.div>

        {/* Limit bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.32, ease }}
        >
          <div className="flex justify-between mb-1">
            <span className="text-[9px] text-text-muted">Used 24%</span>
            <span className="text-[9px] text-primary font-semibold">Healthy</span>
          </div>
          <div className="h-1.5 rounded-full bg-black/8 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={inView ? { width: "24%" } : {}}
              transition={{ duration: 1, delay: 0.5, ease }}
            />
          </div>
        </motion.div>

        {/* Due date + badge */}
        {[
          <div key="due" className="bg-accent/40 rounded-xl px-3 py-2 flex items-center gap-2">
            <IconBell size={12} stroke={2} className="text-text-muted shrink-0" />
            <div>
              <p className="text-[9px] text-text font-semibold">Payment due Jun 15</p>
              <p className="text-[8px] text-text-muted">Min. $48 · Total $1,240</p>
            </div>
          </div>,
          <div key="badge" className="flex items-center gap-1.5 bg-primary/10 rounded-xl px-3 py-2">
            <IconCheck size={11} stroke={2.5} className="text-primary" />
            <p className="text-[9px] font-semibold text-primary">Reminder set for Jun 12</p>
          </div>,
        ].map((el, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.42 + i * 0.12, ease }}
          >
            {el}
          </motion.div>
        ))}
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <IPhoneFrame>
      <div ref={ref} className="px-4 pt-3 flex flex-col gap-3">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease }}
          className="text-[11px] font-semibold text-text-muted"
        >
          May Budgets
        </motion.p>

        <div className="flex flex-col gap-2.5">
          {budgets.map(({ label, pct, spent, total, warn }, i) => (
            <motion.div
              key={label}
              className="bg-white rounded-xl p-3"
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold text-text">{label}</span>
                <span className="text-[9px] text-text-muted">
                  <span className={warn ? "text-primary font-bold" : ""}>{spent}</span>
                  {" / "}{total}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-black/8 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${warn ? "bg-primary" : "bg-text/25"}`}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${pct}%` } : {}}
                  transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              {warn && (
                <motion.div
                  className="flex items-center gap-1 mt-1.5"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.7, ease }}
                >
                  <IconAlertTriangle size={10} stroke={2} className="text-primary" />
                  <p className="text-[8px] text-primary font-semibold">95% used. Almost there.</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="rounded-xl bg-primary/10 px-3 py-2 flex items-start gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.65, ease }}
        >
          <IconSparkles size={11} stroke={1.8} className="text-primary mt-0.5 shrink-0" />
          <p className="text-[8px] text-text leading-relaxed">
            At this pace you&apos;ll exceed Housing by <span className="font-bold text-primary">$120</span> before month-end.
          </p>
        </motion.div>
      </div>
    </IPhoneFrame>
  );
}

// ── Mockup 3 — Auto-import ───────────────────────────────────────────────────

function AutoImportMockup() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const steps = [
    { delay: 0.05, content: (
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
    )},
    { delay: 0.3, content: (
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[8px] text-primary font-semibold">Auto-parsed by bloomé ✦</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>
    )},
    { delay: 0.52, content: (
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
    )},
    { delay: 0.7, content: (
      <div className="flex items-center gap-1.5 rounded-xl px-3 py-2 bg-primary/15">
        <IconCheck size={11} stroke={2.5} className="text-primary" />
        <p className="text-[9px] font-semibold text-primary">Transaction logged automatically</p>
      </div>
    )},
  ];

  return (
    <IPhoneFrame dark>
      <div ref={ref} className="px-4 pt-3 flex flex-col gap-3">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease }}
          className="text-[11px] font-semibold text-white/50"
        >
          Transactions
        </motion.p>

        {steps.map(({ delay, content }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay, ease }}
          >
            {content}
          </motion.div>
        ))}

        <div className="flex flex-col gap-2">
          {[
            { Icon: IconCoffee, label: "Starbucks", amount: "$6.50", color: "bg-primary/20", textColor: "text-primary" },
            { Icon: IconCar,    label: "Uber",      amount: "$12.30", color: "bg-accent/20",  textColor: "text-text-muted" },
          ].map(({ Icon, label, amount, color, textColor }, i) => (
            <motion.div
              key={label}
              className="rounded-xl p-2.5 flex items-center gap-2.5"
              style={{ background: "rgba(255,255,255,0.05)" }}
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.85 + i * 0.1, ease }}
            >
              <span className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center shrink-0`}>
                <Icon size={12} stroke={1.8} className={textColor} />
              </span>
              <p className="text-white/60 text-[10px] flex-1">{label}</p>
              <p className="text-white/60 text-[10px] font-semibold">-{amount}</p>
            </motion.div>
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
    <IPhoneFrame>
      <div ref={ref} className="flex flex-col h-full">
        <div className="absolute inset-0 opacity-30"
          style={{ background: "linear-gradient(160deg,#fb9d9c 0%,#fcefb6 50%,#ffe2cf 100%)" }}
        />
        <div className="relative z-10 px-5 pt-3 flex-1 flex flex-col gap-4">
          <motion.div
            className="text-center mt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
          >
            <p className="text-[10px] font-medium text-text/60">Friday, May 30</p>
            <p className="text-[28px] font-bold text-text/80 leading-none">9:41</p>
          </motion.div>

          <div className="grid grid-cols-4 gap-3">
            {homeApps.map(({ label, color }, i) => (
              <motion.div
                key={label}
                className="flex flex-col items-center gap-1"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.04, ease }}
              >
                <div className={`w-10 h-10 rounded-xl ${color} shadow-sm`} />
                <p className="text-[7px] text-text/60 font-medium text-center leading-none">{label}</p>
              </motion.div>
            ))}

            {/* bloomé icon */}
            <motion.div
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5, ease }}
            >
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                style={{ background: "linear-gradient(135deg,#fb9d9c,#ffe2cf)", boxShadow: "0 0 0 3px #fb9d9c55, 0 4px 12px #fb9d9c44" }}
                animate={{ boxShadow: ["0 0 0 3px #fb9d9c55, 0 4px 12px #fb9d9c44", "0 0 0 6px #fb9d9c33, 0 4px 20px #fb9d9c66", "0 0 0 3px #fb9d9c55, 0 4px 12px #fb9d9c44"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              >
                <span className="text-white font-bold text-[11px]">b</span>
              </motion.div>
              <p className="text-[7px] font-bold text-primary text-center leading-none">bloomé</p>
            </motion.div>
          </div>

          <motion.div
            className="rounded-2xl px-3 py-2.5 flex items-center gap-2.5 mt-auto mb-2"
            style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease }}
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
          </motion.div>
        </div>

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

  // Subtle parallax scroll on the mockup for depth
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mockupParallax = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 ${flip ? "lg:flex-row-reverse" : ""}`}
    >
      {/* Decorative section number */}
      <motion.span
        className="absolute -top-6 left-0 text-[96px] font-black leading-none select-none pointer-events-none hidden lg:block"
        style={{ color: "rgba(28,28,30,0.035)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease }}
      />

      {/* ── Text side — staggered entrance ── */}
      <motion.div
        className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
        variants={textStagger}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 text-text text-[12px] font-bold mb-5 tracking-wide"
        >
          {badge}
        </motion.span>
        <motion.h3
          variants={fadeUp}
          className="text-[28px] md:text-[34px] font-bold text-text tracking-[-0.04em] leading-[1.1] mb-4"
        >
          {title}
        </motion.h3>
        <motion.p
          variants={fadeUp}
          className="text-text-muted text-[16px] leading-relaxed max-w-md"
        >
          {description}
        </motion.p>
      </motion.div>

      {/* ── Mockup side — 3D entrance + parallax scroll + float ── */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div style={{ y: mockupParallax }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 48, rotateY: flip ? 12 : -12 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, ease, delay: 0.1 }}
            style={{ transformPerspective: 800 }}
          >
            {/* Continuous float after entrance */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
            >
              {/* Glow behind mockup */}
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-[40px] blur-3xl opacity-40 -z-10 scale-90"
                  style={{ background: "radial-gradient(ellipse,#fb9d9c 0%,transparent 70%)", transform: "translateY(20px) scale(0.85)" }}
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
      {/* ── Header ── */}
      <FadeBlock className="text-center mb-24">
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

      {/* ── Feature blocks ── */}
      <div className="flex flex-col gap-32 md:gap-40">
        {features.map((f) => (
          <FeatureBlock key={f.badge} {...f} />
        ))}
      </div>
    </section>
  );
}
