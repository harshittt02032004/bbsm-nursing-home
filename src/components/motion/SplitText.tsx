"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { EXPO, viewportOnce } from "@/lib/motion";

type Part = string | { t: string; className?: string };

type Props = {
  as?: "h1" | "h2" | "h3" | "p" | "div";
  parts: Part[];
  className?: string;
  delay?: number;
  stagger?: number;
  /** "mount" animates immediately (hero), "view" waits for the viewport */
  trigger?: "mount" | "view";
  id?: string;
  style?: React.CSSProperties;
};

/** Words rise out of a mask one after another — the signature headline motion. */
export default function SplitText({ as = "h2", parts, className, delay = 0, stagger = 0.055, trigger = "view", id, style }: Props) {
  const Tag = motion[as];
  const words: { w: string; c?: string }[] = [];
  parts.forEach((p) => {
    const text = typeof p === "string" ? p : p.t;
    const c = typeof p === "string" ? undefined : p.className;
    text.split(/\s+/).filter(Boolean).forEach((w) => words.push({ w, c }));
  });

  if (trigger === "mount") {
    const Plain = as;
    return (
      <Plain id={id} className={className} style={style}>
        {words.map(({ w, c }, i) => (
          <Fragment key={i}>
            <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
              <span className={`a-word ${c ?? ""}`} style={{ animationDelay: `${delay + i * stagger}s` }}>
                {w}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </Plain>
    );
  }

  const anim = { whileInView: "show", viewport: viewportOnce };

  return (
    <Tag id={id} className={className} style={style} initial="hidden" {...anim} transition={{ staggerChildren: stagger, delayChildren: delay }}>
      {words.map(({ w, c }, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
            <motion.span
              className={`inline-block will-change-transform ${c ?? ""}`}
              variants={{ hidden: { y: "108%", opacity: 0 }, show: { y: "0%", opacity: 1 } }}
              transition={{ duration: 1.1, ease: EXPO }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
