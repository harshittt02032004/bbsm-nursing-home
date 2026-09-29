"use client";

import { motion } from "framer-motion";
import { EXPO, viewportOnce } from "@/lib/motion";

/** A vertical (or horizontal) accent rule that draws itself when seen. */
export default function GrowLine({ className = "", axis = "y", delay = 0.1, color }: { className?: string; axis?: "x" | "y"; delay?: number; color?: string }) {
  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ transformOrigin: axis === "y" ? "top" : "left", ...(color ? { background: color } : {}) }}
      initial={axis === "y" ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={axis === "y" ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 1.3, ease: EXPO, delay }}
    />
  );
}
