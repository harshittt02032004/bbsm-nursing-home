"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

export default function CountUp({ to, suffix = "", duration = 2.2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  // Years (e.g. 1981) count up from a nearby value so they don't spin through thousands.
  const start = to > 1000 ? to - 60 : 0;
  const [val, setVal] = useState(start);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(start, to, { duration, ease: [0.16, 0.8, 0.28, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, start, to, duration]);

  return (
    <span ref={ref} aria-label={`${to}${suffix}`}>
      <span aria-hidden>
        {reduce ? to : val}
        {suffix}
      </span>
    </span>
  );
}
