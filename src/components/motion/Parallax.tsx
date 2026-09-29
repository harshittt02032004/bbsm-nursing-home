"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Moves its content against the scroll by ±amount px while its box crosses the viewport. */
export default function Parallax({ amount = 40, className = "", children, style }: { amount?: number; className?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y: reduce ? 0 : y }}>
      {children}
    </motion.div>
  );
}
