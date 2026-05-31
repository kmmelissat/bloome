"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const pains = [
  { text: "Where did $300 go this month?",         size: "text-[28px] md:text-[38px]", weight: "font-black",  align: "text-left",   delay: 0,    muted: false },
  { text: "I'll track it… tomorrow.",               size: "text-[22px] md:text-[30px]", weight: "font-light",  align: "text-right",  delay: 0.08, muted: true  },
  { text: "Did I already pay that card?",           size: "text-[26px] md:text-[36px]", weight: "font-bold",   align: "text-left",   delay: 0.16, muted: false },
  { text: "My 'budget' is basically vibes.",        size: "text-[20px] md:text-[28px]", weight: "font-medium", align: "text-center", delay: 0.22, muted: true  },
  { text: "I make good money. So why is there nothing left?", size: "text-[24px] md:text-[34px]", weight: "font-black", align: "text-right", delay: 0.3, muted: false },
  { text: "Another late fee. Cool.",                size: "text-[20px] md:text-[26px]", weight: "font-light",  align: "text-left",   delay: 0.36, muted: true  },
  { text: "I have 3 finance apps and use none of them.", size: "text-[22px] md:text-[32px]", weight: "font-bold", align: "text-right", delay: 0.44, muted: false },
];

function PainLine({ text, size, weight, align, delay, muted }: typeof pains[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: align === "text-right" ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`${align} w-full`}
    >
      <span
        className={`${size} ${weight} leading-tight tracking-tight inline`}
        style={{ color: muted ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.92)" }}
      >
        {text}
      </span>
    </motion.div>
  );
}

export default function ProblemSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-text rounded-[40px] mx-4 md:mx-8" />

      {/* Subtle blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-8 md:px-16 py-24 md:py-32">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-primary text-[12px] font-bold tracking-[0.2em] uppercase mb-12 md:mb-16"
        >
          Sound familiar?
        </motion.p>

        {/* Pain statements */}
        <div className="flex flex-col gap-6 md:gap-8 mb-16 md:mb-20">
          {pains.map((p) => (
            <PainLine key={p.text} {...p} />
          ))}
        </div>

        {/* The turn */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border-t border-white/10 pt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <p className="text-white/50 text-[15px] md:text-[17px] leading-relaxed max-w-sm">
            You&apos;re not bad with money.<br />
            You just never had the right tool.
          </p>
          <p className="font-handwritten text-primary text-[36px] md:text-[48px] leading-none">
            Until now.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
