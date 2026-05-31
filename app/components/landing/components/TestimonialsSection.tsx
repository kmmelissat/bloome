"use client";

import { motion } from "framer-motion";
import { IconStar, IconQuote } from "@tabler/icons-react";

const testimonials = [
  {
    name: "Sofia R.",
    handle: "@sofiar",
    avatar: "bg-primary",
    initials: "SR",
    stars: 5,
    text: "I finally know where my money goes. The budget alerts saved me from overdoing it on shopping twice already this month.",
  },
  {
    name: "Carlos M.",
    handle: "@carlm",
    avatar: "bg-accent",
    initials: "CM",
    stars: 5,
    text: "The email auto-import is magic. My HSBC notifications just show up as transactions. Zero effort, exactly as promised.",
  },
  {
    name: "Valentina G.",
    handle: "@vgomez",
    avatar: "bg-warm",
    initials: "VG",
    stars: 5,
    text: "It feels like a real iOS app but I didn't download anything. Installed from Safari in 5 seconds and it's on my home screen.",
  },
  {
    name: "Diego F.",
    handle: "@diegof",
    avatar: "bg-primary/60",
    initials: "DF",
    stars: 5,
    text: "The card due date reminders are a lifesaver. I haven't paid a late fee since I started using bloomé.",
  },
  {
    name: "Ana L.",
    handle: "@analuna",
    avatar: "bg-warm/80",
    initials: "AL",
    stars: 5,
    text: "Beautiful app. I actually enjoy opening it every day — and I used to dread checking my finances.",
  },
  {
    name: "Martín P.",
    handle: "@martinp",
    avatar: "bg-primary/40",
    initials: "MP",
    stars: 5,
    text: "The AI insights caught that I was spending 40% more on food delivery than the previous month. Crazy useful.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <IconStar key={i} size={12} className="text-primary fill-primary" />
      ))}
    </div>
  );
}

function TestimonialCard({ name, handle, avatar, initials, stars, text }: typeof testimonials[0]) {
  return (
    <div className="flex-shrink-0 w-72 rounded-3xl bg-white border border-black/5 p-6 flex flex-col gap-4 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
      <IconQuote size={20} className="text-primary/30" />
      <p className="text-text text-[14px] leading-relaxed flex-1">{text}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full ${avatar} flex items-center justify-center shrink-0`}>
            <span className="text-[11px] font-bold text-white">{initials}</span>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-text leading-none">{name}</p>
            <p className="text-[11px] text-text-muted mt-0.5">{handle}</p>
          </div>
        </div>
        <StarRating count={stars} />
      </div>
    </div>
  );
}

function ScrollingRow({ items, reverse = false }: { items: typeof testimonials; reverse?: boolean }) {
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-4"
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ width: "max-content" }}
      >
        {/* Duplicate for seamless loop */}
        {[...items, ...items].map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialsSection() {
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3, 6);

  return (
    <section className="w-full pb-32 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-14 px-8">
        <h2 className="text-[36px] md:text-[48px] font-bold text-text tracking-[-1.5px] leading-[1.05] mb-4">
          Real people,{" "}
          <span className="font-handwritten text-primary text-[44px] md:text-[58px] tracking-normal">
            real results
          </span>
        </h2>
        <p className="text-text-muted text-[17px] max-w-sm mx-auto leading-relaxed">
          Join thousands already on top of their finances.
        </p>
      </div>

      {/* Two scrolling rows */}
      <div className="flex flex-col gap-4">
        <ScrollingRow items={row1} />
        <ScrollingRow items={row2} reverse />
      </div>
    </section>
  );
}
