"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ImageReveal from "@/components/motion/ImageReveal";
import Reveal from "@/components/motion/Reveal";
import { REVIEWS } from "@/lib/data";
import { SITE } from "@/lib/site";
import { EXPO } from "@/lib/motion";

/** One editorial quote at a time — real Google reviews only. */
export default function Voices() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const r = REVIEWS[i];

  useEffect(() => {
    if (paused || REVIEWS.length < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % REVIEWS.length), 7000);
    return () => clearTimeout(t);
  }, [i, paused]);

  return (
    <section className="bg-paper px-[clamp(20px,4vw,64px)] py-[clamp(80px,13vh,170px)]">
      <div className="wrap-inner grid items-center gap-[clamp(24px,4vw,72px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]">
        <ImageReveal
          src="/images/consult-eye.jpg"
          alt="A patient's eye examination at BBSM Nursing Home, Raebareli"
          from="left"
          parallax={30}
          sizes="(min-width: 900px) 46vw, 100vw"
          className="h-[clamp(320px,52vh,540px)]"
        />
        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <Reveal>
            <div className="eyebrow">Patient Voices</div>
          </Reveal>
          <div className="relative mt-[26px] min-h-[clamp(200px,26vh,300px)]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure key={i} className="m-0" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.8, ease: EXPO }}>
                <blockquote className="m-0 font-serif italic leading-[1.16] tracking-[-0.01em] text-ink" style={{ fontSize: "clamp(30px,3.8vw,56px)" }}>
                  <span className="text-red">&ldquo;</span>
                  {r.quote}
                  <span className="text-red">&rdquo;</span>
                </blockquote>
                <figcaption className="mt-[34px] text-[12.5px] uppercase tracking-[0.15em] text-ink/55">
                  {r.name} · <span className="text-blue">{r.source}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-[34px] flex flex-wrap items-center justify-between gap-6">
            <div className="flex gap-2.5" role="tablist" aria-label="Reviews">
              {REVIEWS.map((_, n) => (
                <button key={n} role="tab" aria-selected={n === i} aria-label={`Review ${n + 1}`} onClick={() => setI(n)} className="relative h-6 w-[34px]">
                  <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-ink/15" />
                  {n === i && (
                    <motion.span
                      key={`bar-${i}-${paused}`}
                      className="absolute left-0 top-1/2 h-[2px] w-full origin-left -translate-y-1/2 bg-red"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: paused ? 0.3 : 7, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
            <a href={SITE.reviewsUrl} target="_blank" rel="noopener" className="link-u">
              Read &amp; write reviews on Google <span className="arr">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
