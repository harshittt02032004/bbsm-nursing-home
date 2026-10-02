"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import SplitText from "@/components/motion/SplitText";

type Milestone = { y: string; t: string };

const RED = "#C8202D";
const NAVY = "#063B68";
const RULE = "#DCE3EB";

// ECG geometry, in viewBox units. Columns are 288 wide with a 32 gap (the grid below uses the same proportions).
const W = 1248;
const H = 160;
const BASE = 104;
const COLUMN = (W + 32) / 4;
const BEAT = 66;

/** One heartbeat starting at x: small up, big down, up to the peak, small settle. */
const beat = (x: number, peak: number, dip: number): [number, number][] => [
  [x, BASE],
  [x + 10, BASE - 16],
  [x + 22, dip],
  [x + 38, peak],
  [x + 50, BASE + 12],
  [x + 58, BASE - 6],
  [x + BEAT, BASE],
];

const STARTS = [0, 1, 2, 3].map((i) => i * COLUMN + 14);
const POINTS: [number, number][] = [[0, BASE], ...STARTS.flatMap((x, i) => (i === 3 ? beat(x, 14, 150) : beat(x, 46, 136))), [W, BASE]];
const PATH = POINTS.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
const TODAY_PEAK = { x: STARTS[3] + 38, y: 14 };

// How far along the line (0–1) each heartbeat starts and ends — a milestone fades up across its own beat.
const RUN = POINTS.reduce<number[]>((acc, [x, y], i) => {
  if (i === 0) return [0];
  const [px, py] = POINTS[i - 1];
  return [...acc, acc[i - 1] + Math.hypot(x - px, y - py)];
}, []);
const TOTAL = RUN[RUN.length - 1];
const WINDOWS: [number, number][] = STARTS.map((_, i) => [RUN[1 + i * 7] / TOTAL, RUN[7 + i * 7] / TOTAL]);

function Item({ item, i, progress, last }: { item: Milestone; i: number; progress: MotionValue<number>; last: boolean }) {
  const opacity = useTransform(progress, WINDOWS[i], [0, 1]);
  const y = useTransform(progress, WINDOWS[i], [24, 0]);
  const isYear = /^\d{4}$/.test(item.y);
  return (
    <motion.li className="ll-item relative pl-9 md:border-t md:border-[#DCE3EB] md:pl-0 md:pt-5" style={{ opacity, y }}>
      <span aria-hidden className="absolute left-0 top-[23px] h-[11px] w-[11px] rounded-full ring-4 ring-white md:hidden" style={{ background: RED }}>
        {last && <span className="ll-ring absolute inset-0 rounded-full" style={{ background: RED }} />}
      </span>
      <div className="font-serif text-[56px] leading-none" style={{ color: item.y === "1983" ? RED : NAVY }}>
        {isYear ? <time dateTime={item.y}>{item.y}</time> : item.y}
      </div>
      <p className="mt-4 font-sans text-[16px] leading-[1.6] text-[#3E4C5B]">{item.t}</p>
    </motion.li>
  );
}

/**
 * "Lifeline" timeline: a red ECG line draws itself with the scroll and each milestone fades up as
 * the line passes its heartbeat. The scroll range is anchored to the milestone row, so the text is
 * on screen while it appears. Progress only moves forward, and if the visitor stops scrolling
 * part-way the line finishes drawing on its own, so text is never left hidden. Below md the line
 * turns into a vertical rail with a dot per milestone. Reduced motion / no JS: .ll-* are shown in
 * full (globals.css).
 */
export default function Lifeline({ items }: { items: Milestone[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const mobile = useRef(false);
  const finishing = useRef(false);
  const idle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      mobile.current = mq.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      if (idle.current) clearTimeout(idle.current);
    };
  }, []);

  // Desktop: the milestone row travels from the bottom of the viewport to a little above the middle.
  // Mobile: the stacked list scrolls past the 85% line, top to bottom.
  const wide = useScroll({ target: stage, offset: ["start 0.95", "start 0.42"] }).scrollYProgress;
  const tall = useScroll({ target: stage, offset: ["start 0.85", "end 0.85"] }).scrollYProgress;
  const scrolled = useTransform([wide, tall], ([w, t]: number[]) => (mobile.current ? t : w));
  const progress = useMotionValue(0);
  useMotionValueEvent(scrolled, "change", (v) => {
    if (finishing.current) return;
    if (v > progress.get()) progress.set(v);
    // Stopped scrolling part-way: finish the drawing rather than leave milestones hidden.
    if (idle.current) clearTimeout(idle.current);
    idle.current = setTimeout(() => {
      const p = progress.get();
      if (p <= 0.02 || p >= 1) return;
      finishing.current = true;
      animate(progress, 1, { duration: 0.6 + (1 - p) * 1.8, ease: "easeInOut" });
    }, 900);
  });
  useMotionValueEvent(progress, "change", (v) => {
    if (v >= 0.999) setDone(true);
  });

  const dashOffset = useTransform(progress, (p) => 1 - p);
  const lineOpacity = useTransform(progress, [0, 0.01], [0, 1]);
  const dotOpacity = useTransform(progress, [0.97, 1], [0, 1]);

  return (
    <div data-done={done} className="mx-auto max-w-[1248px]">
      <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-5">
        <SplitText
          parts={["Four decades,", { t: "one address.", className: "text-[#C8202D]" }]}
          className="m-0 max-w-[16ch] font-serif font-normal tracking-[-0.015em] text-blue-deep"
          style={{ fontSize: "clamp(40px,5vw,64px)", lineHeight: 1 }}
        />
        <div className="pt-2 font-sans text-[14px] font-bold uppercase tracking-[0.14em]" style={{ color: RED }}>
          1972 — Today
        </div>
      </div>

      <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} fill="none" className="mt-10 hidden h-auto w-full overflow-visible md:block">
        <line x1="0" y1={BASE} x2={W} y2={BASE} stroke={RULE} className="[stroke-width:2.5] lg:[stroke-width:2] xl:[stroke-width:1.5]" />
        <motion.path
          d={PATH}
          pathLength={1}
          stroke={RED}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray="1 1"
          className="ll-line [stroke-width:5] lg:[stroke-width:4] xl:[stroke-width:3]"
          style={{ strokeDashoffset: dashOffset, opacity: lineOpacity }}
        />
        <circle className="ll-ring" cx={TODAY_PEAK.x} cy={TODAY_PEAK.y} r="6" fill={RED} />
        <motion.circle className="ll-dot" cx={TODAY_PEAK.x} cy={TODAY_PEAK.y} r="5" fill={RED} style={{ opacity: dotOpacity }} />
      </svg>

      <div ref={stage} className="relative mt-10 md:mt-3">
        <span aria-hidden className="absolute bottom-2 left-[5px] top-6 w-px md:hidden" style={{ background: RULE }} />
        <motion.span aria-hidden className="ll-rail absolute bottom-2 left-[4px] top-6 w-[3px] origin-top rounded-full md:hidden" style={{ background: RED, scaleY: progress }} />
        <ol className="grid gap-y-9 md:grid-cols-4 md:gap-x-[2.5641%]">
          {items.map((item, i) => (
            <Item key={item.y} item={item} i={i} progress={progress} last={i === items.length - 1} />
          ))}
        </ol>
      </div>
    </div>
  );
}
