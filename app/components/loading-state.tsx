"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { LOADING_MESSAGES } from "@/lib/constants";

export function LoadingState() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % LOADING_MESSAGES.length);
    }, 1800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="document-panel rounded-md px-5 py-8 text-center"
    >
      <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-line">
        <span
          aria-hidden="true"
          className="h-5 w-5 animate-spin rounded-full border-2 border-line-strong border-t-accent motion-reduce:animate-none"
        />
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
        Processing request
      </p>
      <div className="mt-3 min-h-[3rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={LOADING_MESSAGES[index]}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-base text-ink sm:text-lg"
          >
            {LOADING_MESSAGES[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
