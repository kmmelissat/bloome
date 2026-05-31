"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { IconPlus } from "@tabler/icons-react";

const faqs = [
  {
    q: "Is bloomé really free?",
    a: "Yes — bloomé is completely free to use. No credit card required, no hidden fees. We may introduce optional premium features in the future, but the core experience will always be free.",
  },
  {
    q: "How does the email auto-import work?",
    a: "You connect your email account directly from the app — no forwarding needed. bloomé automatically reads your bank's transaction notification emails, extracts the merchant, amount, date, and card, and logs each one as a transaction instantly. Your emails are never stored beyond what's needed to create the transaction.",
  },
  {
    q: "Is my financial data safe?",
    a: "Absolutely. bloomé never stores full card numbers — only the last 4 digits. All data is encrypted at rest and in transit. We don't sell your data, ever. You can export or delete everything from Settings at any time.",
  },
  {
    q: "Do I need to download an app?",
    a: "No. bloomé is a Progressive Web App (PWA). Open it in your browser, tap 'Add to Home Screen', and it installs like a native app — with offline support, fast load times, and no App Store involved.",
  },
  {
    q: "Which banks are supported for auto-import?",
    a: "Any bank that sends email notifications for transactions. Since we read the email text with AI, it works with most major banks worldwide — HSBC, Banamex, BBVA, Chase, and more — without needing official integrations.",
  },
  {
    q: "Can I use bloomé for multiple cards and currencies?",
    a: "Yes. You can add as many credit and debit cards as you want. Each transaction supports a currency field, so you can track spending in USD, MXN, EUR, or any other currency side by side.",
  },
  {
    q: "What AI model powers the Insights feature?",
    a: "bloomé uses Claude by Anthropic — one of the most capable and privacy-focused AI models available. Your financial context is sent securely to generate insights and is never used to train AI models.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-black/6 last:border-0"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-[16px] font-semibold text-text group-hover:text-primary transition-colors leading-snug">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <IconPlus size={14} stroke={2.5} className="text-primary" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-text-muted text-[15px] leading-relaxed pb-5 max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [40, 0, 0, -40]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y }}
      className="w-full max-w-3xl mx-auto px-8 pb-32"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-primary mb-3 block">
          FAQ
        </span>
        <h2 className="text-[36px] md:text-[48px] font-bold text-text tracking-[-1.5px] leading-[1.05]">
          Got questions?{" "}
          <span className="font-handwritten text-primary text-[44px] md:text-[56px] tracking-normal">
            we've got answers
          </span>
        </h2>
      </div>

      {/* Accordion */}
      <div className="rounded-3xl bg-white border border-black/5 px-6 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
        {faqs.map((faq, i) => (
          <FAQItem key={faq.q} {...faq} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
