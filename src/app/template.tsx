"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

let firstLoad = true;

/** Route changes: content settles in with a soft fade-rise. Skipped on the very first load so the hero paints immediately. */
export default function Template({ children }: { children: React.ReactNode }) {
  const [skip] = useState(firstLoad);
  useEffect(() => {
    firstLoad = false;
  }, []);
  return (
    <motion.div initial={skip ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
      {children}
    </motion.div>
  );
}
