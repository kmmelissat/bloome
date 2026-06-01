"use client";

import { useEffect } from "react";
import { IconX } from "@tabler/icons-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: number;
};

export default function Modal({ open, onClose, title, children, maxWidth = 400 }: Props) {
  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-60 bg-black/30 transition-opacity duration-200"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-70 flex items-center justify-center px-4 pointer-events-none">
        <div
          className="bg-surface w-full pointer-events-auto transition-all duration-250"
          style={{
            maxWidth,
            borderRadius: 24,
            boxShadow: "0 8px 48px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.06)",
            opacity: open ? 1 : 0,
            transform: open ? "scale(1) translateY(0)" : "scale(0.96) translateY(8px)",
            pointerEvents: open ? "auto" : "none",
          }}
        >
          <div className="px-6 pt-6 pb-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              {title
                ? <h2 className="text-[17px] font-bold text-text">{title}</h2>
                : <span />
              }
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors active:scale-90"
              >
                <IconX size={16} stroke={2.5} className="text-text-muted" />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
