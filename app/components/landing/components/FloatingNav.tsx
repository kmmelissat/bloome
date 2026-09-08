"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import GlassSurface from "@/app/components/ui/GlassSurface";

export default function FloatingNav() {
  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto"
        style={{ minWidth: 280, maxWidth: 520, width: "100%" }}
      >
        <GlassSurface
          width="100%"
          height={56}
          borderRadius={999}
          blur={10}
          borderWidth={0.05}
          brightness={55}
          opacity={0.9}
          backgroundOpacity={0.05}
          saturation={1.8}
          className="px-5"
        >
          <div className="flex items-center justify-between w-full">
            <Image src="/logo.svg" alt="bloomé" width={96} height={18} priority />
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-[13px] font-medium text-text/75 hover:text-text transition-colors px-3 py-1.5"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-[13px] font-semibold text-white px-4 py-2 rounded-full bg-linear-to-r from-primary to-warm transition-opacity hover:opacity-85 active:opacity-70"
              >
                Get started
              </Link>
            </div>
          </div>
        </GlassSurface>
      </motion.div>
    </div>
  );
}
