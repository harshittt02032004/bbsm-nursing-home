"use client";

import { Fragment, useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

const QUOTE: { w: string; className?: string }[] = [
  { w: "“A" },
  { w: "doctor" },
  { w: "never" },
  { w: "retires.”", className: "italic text-[#F3A6AC]" },
];
const SUPPORT = "He operated at 76. He saw his last patient on 18 August 2021, and left us the next evening.".split(" ");

// Share of the scroll range each part takes: line → quote → supporting line → attribution.
const LINE: [number, number] = [0, 0.12];
const QUOTE_RANGE: [number, number] = [0.08, 0.4];
const SUPPORT_RANGE: [number, number] = [0.4, 0.88];
const CAPTION: [number, number] = [0.88, 1];

/** Word i of n lights up during its own slice of [from, to]. */
const slot = ([from, to]: [number, number], i: number, n: number): [number, number] => {
  const step = (to - from) / n;
  return [from + i * step, from + (i + 1) * step];
};

function Word({ progress, range, className = "", children }: { progress: MotionValue<number>; range: [number, number]; className?: string; children: string }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span className={`fq-word ${className}`} style={{ opacity }}>
      {children}
    </motion.span>
  );
}

/**
 * The founder's quote, written word by word as the visitor scrolls: progress runs from the
 * figure's top reaching 80% of the viewport to it reaching 30%, and only ever moves forward,
 * so the text stays revealed. Every word is real text in the server-rendered HTML.
 * Reduced motion (and no JS) is handled in globals.css: .fq-* are shown in full.
 */
export default function FounderQuote() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "start 0.3"] });
  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > progress.get()) progress.set(v);
  });

  const lineWidth = useTransform(progress, LINE, [0, 120]);
  const captionOpacity = useTransform(progress, CAPTION, [0, 1]);

  return (
    <figure ref={ref} className="m-0 flex max-w-[1120px] flex-col gap-9">
      <motion.span aria-hidden className="fq-line block h-[3px] bg-[#E2434F]" style={{ width: reduce ? 120 : lineWidth }} />
      <blockquote className="m-0 font-serif text-white" style={{ fontSize: "clamp(48px,7vw,104px)", lineHeight: 1 }}>
        <p>
          {QUOTE.map(({ w, className }, i) => (
            <Fragment key={i}>
              <Word progress={progress} range={slot(QUOTE_RANGE, i, QUOTE.length)} className={className}>
                {w}
              </Word>
              {i < QUOTE.length - 1 ? " " : null}
            </Fragment>
          ))}
        </p>
      </blockquote>
      <p className="max-w-[900px] font-serif text-[#DCE7F2]" style={{ fontSize: "clamp(22px,2.4vw,34px)", lineHeight: 1.35 }}>
        {SUPPORT.map((w, i) => (
          <Fragment key={i}>
            <Word progress={progress} range={slot(SUPPORT_RANGE, i, SUPPORT.length)}>
              {w}
            </Word>
            {i < SUPPORT.length - 1 ? " " : null}
          </Fragment>
        ))}
      </p>
      <motion.figcaption className="fq-fade font-sans text-[14px] uppercase tracking-[0.14em] text-[#A9C2DA]" style={{ opacity: captionOpacity }}>
        Late Dr. Virendra Singh · Founder, 1983
      </motion.figcaption>
    </figure>
  );
}
