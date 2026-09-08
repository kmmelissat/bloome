"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useMotionTemplate,
} from "framer-motion";
import { IconStar, IconShieldCheck, IconTrendingUp } from "@tabler/icons-react";
import TextType from "@/app/components/ui/TextType";

// ── Animation variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const stats = [
  { icon: IconStar,        value: "4.9",   label: "Rating"  },
  { icon: IconTrendingUp,  value: "$2.4M", label: "Tracked" },
  { icon: IconShieldCheck, value: "100%",  label: "Private" },
];

const avatarColors = ["bg-primary", "bg-warm", "bg-accent", "bg-primary/60", "bg-warm/80"];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for scene tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 14 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 14 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [18, -18]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-22, 22]);


  // Scroll fade-out for hero
  const { scrollY } = useScroll();
  const scrollEnd = typeof window !== "undefined" ? window.innerHeight * 0.75 : 600;
  const heroOpacity = useTransform(scrollY, [0, scrollEnd], [1, 0]);
  const heroY       = useTransform(scrollY, [0, scrollEnd], [0, -60]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Animated gradient blob positions
  const blob1X = useMotionTemplate`${useTransform(springX, [-0.5,0.5], [-20,20])}px`;
  const blob2X = useMotionTemplate`${useTransform(springX, [-0.5,0.5], [20,-20])}px`;

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-dvh flex items-center overflow-hidden bg-bg"
      style={{ opacity: heroOpacity, y: heroY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Ambient blobs that react to mouse ── */}
      <motion.div
        className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[80px]"
        style={{ x: blob1X }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-warm/30 blur-[80px]"
        style={{ x: blob2X }}
      />
      <div className="pointer-events-none absolute top-1/3 left-1/2 w-72 h-72 rounded-full bg-accent/20 blur-[60px]" />

      {/* ── Two-column layout ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-16 pt-24 md:pt-28 pb-10 md:pb-16">

        {/* LEFT — staggered text entrance */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[12px] md:text-[13px] font-semibold mb-4 md:mb-8"
          >
            ✦ Personal finance, reimagined
          </motion.span>

          {/* Headline — compact on mobile */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="leading-none mb-4 md:mb-6"
          >
            {/* Mobile: one tight block. Desktop: three lines */}
            <span className="block md:hidden font-bold text-text leading-[1.05]" style={{ fontSize: "clamp(28px,8vw,40px)", letterSpacing: "-0.03em" }}>
              Your finances,{" "}
              <span className="font-handwritten text-primary" style={{ fontSize: "clamp(32px,9vw,46px)" }}>
                <TextType
                  texts={["beautifully", "effortlessly", "mindfully", "clearly"]}
                  cursorClassName="bg-primary"
                />
              </span>{" "}
              simple.
            </span>
            <span className="hidden md:block">
              <span className="block font-bold text-text" style={{ fontSize: "clamp(40px,5vw,66px)", letterSpacing: "-0.04em" }}>
                Your finances,
              </span>
              <span className="block font-handwritten text-primary" style={{ fontSize: "clamp(42px,5.5vw,72px)" }}>
                <TextType
                  texts={["beautifully", "effortlessly", "mindfully", "clearly"]}
                  cursorClassName="bg-primary"
                />
              </span>
              <span className="block font-bold text-text" style={{ fontSize: "clamp(40px,5vw,66px)", letterSpacing: "-0.04em" }}>
                simple.
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-text/70 text-[15px] md:text-[17px] max-w-sm leading-relaxed mb-6 md:mb-10"
          >
            Track expenses, manage cards, and get AI-powered insights. All in one elegant app.
          </motion.p>

          {/* CTA — only "Get started" on mobile, Log in is in the nav */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-12 w-full sm:w-auto">
            <Link
              href="/signup"
              className="px-8 py-3.5 md:py-4 rounded-full bg-linear-to-r from-primary to-warm font-semibold text-[15px] md:text-[16px] text-center text-white transition-opacity hover:opacity-85 active:opacity-70"
            >
              Get started, it&apos;s free
            </Link>
            <Link
              href="/login"
              className="hidden md:block px-8 py-4 rounded-full glass text-text font-medium text-[16px] text-center transition-opacity hover:opacity-75 active:opacity-60"
            >
              Log in
            </Link>
          </motion.div>

          {/* Avatars + social proof — below CTA on mobile, below stats on desktop */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6 md:mb-8 order-last md:order-0">
            <div className="flex -space-x-2">
              {avatarColors.map((c, i) => (
                <div key={i} className={`w-7 h-7 md:w-8 md:h-8 rounded-full ${c} border-2 border-bg`} />
              ))}
            </div>
            <p className="text-[12px] md:text-[13px] text-text/70">
              <span className="font-semibold text-text">2,000+</span> tracking their finances
            </p>
          </motion.div>

          {/* Stats — hidden on mobile */}
          <motion.div variants={fadeUp} className="hidden md:flex items-center gap-8 flex-wrap">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon size={15} stroke={2} className="text-primary" />
                </span>
                <div>
                  <p className="text-[15px] font-bold text-text leading-none">{value}</p>
                  <p className="text-[12px] text-text-muted mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — 3D scene with spring tilt */}
        <motion.div
          className="flex-1 w-full flex items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ rotateX, rotateY, transformPerspective: 600, transformStyle: "preserve-3d" }}
        >
          {/* ── Snake ribbon — SVG textPath on a sine wave ── */}
          <div
            className="absolute pointer-events-none"
            style={{
              zIndex: 0,
              inset: "0 -60px",
              maskImage: "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 400"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <path
                  id="snake-path"
                  d="M -600,440 C -450,300 -300,460 -150,320 C 0,180 150,340 300,200 C 450,40 600,180 750,40 C 900,-100 1050,60 1200,-80 C 1350,-220 1500,-60 1650,-200"
                  fill="none"
                />
              </defs>

              <g>
                {/* Pink ribbon band */}
                <path
                  d="M -600,440 C -450,300 -300,460 -150,320 C 0,180 150,340 300,200 C 450,40 600,180 750,40 C 900,-100 1050,60 1200,-80 C 1350,-220 1500,-60 1650,-200"
                  fill="none"
                  stroke="rgba(251,157,156,0.8)"
                  strokeWidth="30"
                  strokeLinecap="round"
                />
                {/* White text */}
                <text
                  fontFamily="inherit"
                  fontSize="11"
                  fontWeight="700"
                  letterSpacing="1"
                  textAnchor="start"
                  fill="white"
                  dominantBaseline="middle"
                >
                  <textPath href="#snake-path" startOffset="0%" method="align" spacing="auto">
                    <animate attributeName="startOffset" from="0%" to="-50%" dur="20s" repeatCount="indefinite" />
                    {Array.from({ length: 8 }).map(() => `TRACK · BUDGET · SAVE · INSIGHTS · CARDS · GOALS · MANAGE · CASHFLOW · GROW · `).join("")}
                  </textPath>
                </text>
              </g>
            </svg>
          </div>

          {/* Coral coin — top right, floats up */}
          <motion.div
            className="absolute top-4 right-4 md:top-8 md:right-8 z-10"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ translateZ: 60 }}
          >
            <Image
              src="/coral_coin.svg"
              alt=""
              width={90}
              height={90}
              style={{ filter: "drop-shadow(0 12px 24px rgba(251,157,156,0.5))", width: "clamp(52px,8vw,90px)", height: "auto" }}
            />
          </motion.div>

          {/* Yellow coin — bottom left, floats down offset */}
          <motion.div
            className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-10"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            style={{ translateZ: 40 }}
          >
            <Image
              src="/yellow_coin.svg"
              alt=""
              width={72}
              height={72}
              style={{ filter: "drop-shadow(0 10px 20px rgba(252,239,182,0.6))", width: "clamp(42px,6vw,72px)", height: "auto" }}
            />
          </motion.div>

          <Image
            src="/hero_cards.svg"
            alt="bloomé app preview"
            width={900}
            height={900}
            className="w-full max-w-xs sm:max-w-sm md:max-w-3xl h-auto"
            style={{ filter: "drop-shadow(0 60px 100px rgba(251,157,156,0.5))" }}
            priority
          />
        </motion.div>

      </div>
    </motion.div>
  );
}
