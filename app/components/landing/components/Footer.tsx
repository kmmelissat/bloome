"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconBrandTwitter, IconBrandInstagram, IconBrandGithub } from "@tabler/icons-react";

const links = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Changelog", href: "/changelog" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
  ],
};

const socials = [
  { icon: IconBrandTwitter, href: "https://twitter.com/bloomeapp", label: "Twitter" },
  { icon: IconBrandInstagram, href: "https://instagram.com/bloomeapp", label: "Instagram" },
  { icon: IconBrandGithub, href: "https://github.com/bloomeapp", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-black/5 bg-bg">
      {/* ── CTA banner ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[32px] overflow-hidden relative mb-20"
          style={{
            background: "linear-gradient(135deg,#fb9d9c 0%,#ffe2cf 55%,#fcefb6 100%)",
            boxShadow: "0 20px 70px rgba(251,157,156,0.3)",
          }}
        >
          <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-primary/20 blur-2xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-8 md:px-14 py-12 md:py-14">
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
              <h2
                className="font-bold text-text tracking-tight leading-none"
                style={{ fontSize: "clamp(26px, 4vw, 42px)" }}
              >
                Your finances,{" "}
                <span className="font-handwritten" style={{ fontSize: "clamp(30px, 4.5vw, 48px)" }}>
                  finally clear
                </span>
              </h2>
              <p className="text-text/60 text-[15px] leading-relaxed max-w-xs">
                Free forever. No credit card. Works on any device.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/signup"
                className="px-7 py-3.5 rounded-full bg-text text-white font-semibold text-[15px] text-center transition-opacity hover:opacity-80 active:opacity-70 whitespace-nowrap"
              >
                Get started free
              </Link>
              <Link
                href="/login"
                className="px-7 py-3.5 rounded-full bg-black/10 text-text font-medium text-[15px] text-center transition-opacity hover:bg-black/15 active:opacity-70 whitespace-nowrap"
              >
                Log in
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Footer grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Image src="/logo.svg" alt="bloomé" width={100} height={20} />
            <p className="text-text-muted text-[14px] leading-relaxed max-w-[200px]">
              Personal finance that feels like it belongs on your phone.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-text-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Icon size={15} stroke={1.8} />
                </Link>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-3">
            <p className="text-[12px] font-bold tracking-[0.08em] uppercase text-text/50 mb-1">Product</p>
            {links.product.map(({ label, href }) => (
              <Link key={label} href={href} className="text-[14px] text-text-muted hover:text-text transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <p className="text-[12px] font-bold tracking-[0.08em] uppercase text-text/50 mb-1">Company</p>
            {links.company.map(({ label, href }) => (
              <Link key={label} href={href} className="text-[14px] text-text-muted hover:text-text transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <p className="text-[12px] font-bold tracking-[0.08em] uppercase text-text/50 mb-1">Legal</p>
            {links.legal.map(({ label, href }) => (
              <Link key={label} href={href} className="text-[14px] text-text-muted hover:text-text transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-black/5">
          <p className="text-[13px] text-text-muted">
            © 2025 bloomé. All rights reserved.
          </p>
          <p className="text-[13px] text-text-muted">
            Made with{" "}
            <span className="text-primary">♥</span>
            {" "}for people who want to be good with money.
          </p>
        </div>
      </div>
    </footer>
  );
}
