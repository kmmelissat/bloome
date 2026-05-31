"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import FloatingNav from "./components/FloatingNav";
import Hero3D from "./components/Hero3D";
import ProblemSection from "./components/ProblemSection";
import FeaturesSection from "./components/FeaturesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";

// Mimics the Hero fade: long dissolve + gentle upward parallax.
// Each section fades in as it enters from below and fades out as it leaves the top.
function ScrollFade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // start = section top hits 95% down the viewport (just entering)
    // end   = section bottom hits 5% from top (almost fully gone)
    offset: ["start 0.95", "end 0.05"],
  });

  // Long fade: 20% of total range on each side → ~300–400px of scroll travel
  const rawOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rawY       = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [56, 0, 0, -56]);

  // Spring smoothing so the motion feels organic, not mechanical
  const opacity = useSpring(rawOpacity, { stiffness: 60, damping: 20, mass: 0.6 });
  const y       = useSpring(rawY,       { stiffness: 60, damping: 20, mass: 0.6 });

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-dvh bg-bg flex flex-col" style={{ overflowX: "clip" }}>
      {/* ── Ambient blobs ── */}
      <div className="pointer-events-none fixed top-0 -right-24 w-96 h-96 rounded-full bg-primary/15 blur-3xl -z-10" />
      <div className="pointer-events-none fixed top-24 -left-24 w-80 h-80 rounded-full bg-warm/40 blur-3xl -z-10" />
      <div className="pointer-events-none fixed bottom-32 right-1/3 w-64 h-64 rounded-full bg-accent/35 blur-3xl -z-10" />

      <FloatingNav />

      {/* Hero manages its own scroll fade internally */}
      <Hero3D />

      {/* Every section below gets the shared ScrollFade treatment */}
      <ScrollFade>
        <ProblemSection />
      </ScrollFade>

      <ScrollFade className="pt-16 md:pt-24">
        <FeaturesSection />
      </ScrollFade>

      <ScrollFade>
        <TestimonialsSection />
      </ScrollFade>

      <ScrollFade>
        <FAQSection />
      </ScrollFade>

      <ScrollFade>
        <Footer />
      </ScrollFade>
    </div>
  );
}
