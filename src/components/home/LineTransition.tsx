"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

const WORDS = ["Care", "Expertise", "Technology"];

/** Two hands, abstracted: a red and a blue curve that reach, cross and meet — drawn by the scroll. */
export default function LineTransition() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 35%"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const red = useTransform(p, [0, 0.85], [0, 1]);
  const blue = useTransform(p, [0.08, 0.93], [0, 1]);
  const grey = useTransform(p, [0.16, 1], [0, 1]);

  return (
    <section ref={ref} className="overflow-hidden bg-paper py-[clamp(60px,10vh,120px)]" aria-label="Care, Expertise, Technology">
      <svg viewBox="0 0 1200 220" preserveAspectRatio="none" className="block h-[clamp(150px,22vh,240px)] w-full" aria-hidden>
        <motion.path d="M-20 170 C 180 170, 250 40, 430 40 S 700 170, 880 150 S 1120 40, 1220 60" fill="none" stroke="#C52030" strokeWidth="1.4" style={{ pathLength: reduce ? 1 : red }} />
        <motion.path d="M-20 60 C 200 60, 280 190, 470 180 S 760 50, 940 70 S 1140 190, 1220 160" fill="none" stroke="#07518B" strokeWidth="1.4" style={{ pathLength: reduce ? 1 : blue }} />
        <motion.path d="M-20 115 C 220 100, 300 130, 520 112 S 800 96, 1000 118 S 1160 108, 1220 110" fill="none" stroke="rgba(17,24,32,.16)" strokeWidth="1" style={{ pathLength: reduce ? 1 : grey }} />
      </svg>
      <div className="wrap flex flex-wrap gap-x-10 gap-y-3 text-[11.5px] font-medium uppercase tracking-[0.24em] text-ink">
        {WORDS.map((w, i) => (
          <span key={w} className="flex gap-10">
            <Word p={p} at={0.2 + i * 0.28} reduce={!!reduce}>{w}</Word>
            {i < WORDS.length - 1 && <span className="opacity-30">—</span>}
          </span>
        ))}
      </div>
    </section>
  );
}

function Word({ p, at, reduce, children }: { p: MotionValue<number>; at: number; reduce: boolean; children: React.ReactNode }) {
  const opacity = useTransform(p, [at - 0.12, at], [0.22, 1]);
  const color = useTransform(p, [at - 0.12, at, at + 0.25], ["#111820", "#C52030", "#111820"]);
  return <motion.span style={reduce ? { opacity: 0.6 } : { opacity, color }}>{children}</motion.span>;
}
