"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FloatingNav() {
  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto relative flex items-center justify-between gap-8 px-5 py-3 rounded-full border border-white/50 bg-white/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]"
        style={{ minWidth: 280, maxWidth: 520, width: "100%" }}
      >
        <Image src="/logo.svg" alt="bloomé" width={96} height={18} priority />

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-[13px] font-medium text-text-muted hover:text-text transition-colors px-3 py-1.5"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-[13px] font-semibold text-text px-4 py-2 rounded-full bg-linear-to-r from-primary to-warm transition-opacity hover:opacity-85 active:opacity-70"
          >
            Get started
          </Link>
        </div>
      </motion.nav>
    </div>
  );
}
