"use client";

// Ported from React Bits — TextType (typewriter animation)

import { useEffect, useRef, useState } from "react";

interface TextTypeProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
  cursorClassName?: string;
}

export default function TextType({
  texts,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseTime = 1800,
  className = "",
  cursorClassName = "",
}: TextTypeProps) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const [textIndex, setTextIndex] = useState(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = texts[textIndex];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timeout.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, typingSpeed);
      } else {
        timeout.current = setTimeout(() => setPhase("pausing"), pauseTime);
      }
    } else if (phase === "pausing") {
      timeout.current = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeout.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, deletingSpeed);
      } else {
        setTextIndex((i) => (i + 1) % texts.length);
        setPhase("typing");
      }
    }

    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [displayed, phase, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className}>
      {displayed}
      <span
        className={`inline-block w-[2px] ml-0.5 align-middle animate-blink ${cursorClassName}`}
        style={{ height: "0.85em", background: "currentColor", borderRadius: 1 }}
      />
    </span>
  );
}
