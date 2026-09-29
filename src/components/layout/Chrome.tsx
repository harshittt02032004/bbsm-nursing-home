"use client";

import { motion, useScroll, useSpring, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { EXPO } from "@/lib/motion";

/** Thin red reading-progress line along the very top edge. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-red" style={{ scaleX }} />;
}

/** Mobile-only action dock — call, emergency, directions — appears once the hero is passed. */
export function MobileDock() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 520));
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-3 overflow-hidden rounded-full bg-ink text-white shadow-[0_10px_40px_rgba(6,59,104,.35)] min-[1320px]:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.6, ease: EXPO }}
        >
          <a href={SITE.phoneHref} className="flex flex-col items-center gap-1 bg-red py-3 text-white hover:text-white">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">Book</span>
            <span className="text-[10px] text-white/80">Call OPD</span>
          </a>
          <a href={SITE.emergencyHref} className="flex flex-col items-center gap-1 py-3 text-white hover:text-white">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">Emergency</span>
            <span className="text-[10px] text-white/60">24 × 7</span>
          </a>
          <a href={SITE.directionsUrl} target="_blank" rel="noopener" className="flex flex-col items-center gap-1 border-l border-white/10 py-3 text-white hover:text-white">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">Directions</span>
            <span className="text-[10px] text-white/60">Jail Garden Rd</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
