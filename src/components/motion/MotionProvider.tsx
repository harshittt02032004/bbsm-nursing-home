"use client";

import { MotionConfig } from "framer-motion";
import { EASE } from "@/lib/motion";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: EASE }}>
      {children}
    </MotionConfig>
  );
}
