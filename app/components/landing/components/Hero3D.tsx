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
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY       = useTransform(scrollY, [0, 400], [0, -60]);

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
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16 pt-28 pb-16">

        {/* LEFT — staggered text entrance */}
        <motion.div
          className="flex-1 flex flex-col items-start"
          variants={container}
          initial="hidden"
          animate="show"

        >
          {/* Avatars + social proof */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <div className="flex -space-x-2">
              {avatarColors.map((c, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-bg`} />
              ))}
            </div>
            <p className="text-[13px] text-text-muted">
              <span className="font-semibold text-text">2,000+</span> people tracking their finances
            </p>
          </motion.div>

          {/* Badge */}
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[13px] font-semibold mb-8"
          >
            ✦ Personal finance, reimagined
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="leading-none mb-6"
          >
            <span className="block font-bold text-text tracking-[-0.06em]" style={{ fontSize: "clamp(40px,5vw,66px)" }}>
              Your finances,
            </span>
            <span className="block font-handwritten text-primary" style={{ fontSize: "clamp(42px,5.5vw,72px)" }}>
              <TextType
                texts={["beautifully", "effortlessly", "mindfully", "clearly"]}
                cursorClassName="bg-primary"
              />
            </span>
            <span className="block font-bold text-text tracking-[-0.06em]" style={{ fontSize: "clamp(40px,5vw,66px)" }}>
              simple.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-text-muted text-[17px] max-w-sm leading-relaxed mb-10"
          >
            Track expenses, manage cards, and get AI-powered insights — all in one elegant app.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-12">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-full bg-linear-to-r from-primary to-warm font-semibold text-[16px] text-center text-text transition-opacity hover:opacity-85 active:opacity-70"
            >
              Get started — it&apos;s free
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 rounded-full glass text-text font-medium text-[16px] text-center transition-opacity hover:opacity-75 active:opacity-60"
            >
              Log in
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="flex items-center gap-8 flex-wrap">
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
          {/* Coral coin — top right, floats up */}
          <motion.div
            className="absolute top-8 right-8 z-10"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ translateZ: 60 }}
          >
            <Image
              src="/coral_coin.svg"
              alt=""
              width={90}
              height={90}
              style={{ filter: "drop-shadow(0 12px 24px rgba(251,157,156,0.5))", width: 90, height: "auto" }}
            />
          </motion.div>

          {/* Yellow coin — bottom left, floats down offset */}
          <motion.div
            className="absolute bottom-8 left-8 z-10"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            style={{ translateZ: 40 }}
          >
            <Image
              src="/yellow_coin.svg"
              alt=""
              width={72}
              height={72}
              style={{ filter: "drop-shadow(0 10px 20px rgba(252,239,182,0.6))", width: 72, height: "auto" }}
            />
          </motion.div>

          <Image
            src="/hero_cards.svg"
            alt="bloomé app preview"
            width={900}
            height={900}
            className="w-full max-w-3xl h-auto"
            style={{ filter: "drop-shadow(0 60px 100px rgba(251,157,156,0.5))" }}
            priority
          />
        </motion.div>

      </div>
    </motion.div>
  );
}
