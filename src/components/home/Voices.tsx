"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ImageReveal from "@/components/motion/ImageReveal";
import Reveal from "@/components/motion/Reveal";
import { GOOGLE_RATING, REVIEWS } from "@/lib/data";
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
          <Reveal className="flex flex-wrap items-center justify-between gap-4">
            <div className="eyebrow">Patient Voices</div>
            <a
              href={SITE.reviewsUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2.5 rounded-full border border-ink/12 bg-white px-4 py-2 text-[13px] text-ink shadow-[0_4px_18px_rgba(6,59,104,.06)] hover:border-blue/40 hover:text-ink"
              aria-label={`Rated ${GOOGLE_RATING.rating} out of 5 on Google from ${GOOGLE_RATING.count} reviews`}
            >
              <GoogleG />
              <span className="font-semibold">{GOOGLE_RATING.rating.toFixed(1)}</span>
              <Stars n={Math.round(GOOGLE_RATING.rating)} />
              <span className="text-ink/55">{GOOGLE_RATING.count} Google reviews</span>
            </a>
          </Reveal>
          <div className="relative mt-[26px] min-h-[clamp(200px,26vh,300px)]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure key={i} className="m-0" aria-label={`${r.stars} star Google review`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.8, ease: EXPO }}>
                <Stars n={r.stars} className="mb-5" size={18} />
                <blockquote className="m-0 font-serif italic leading-[1.16] tracking-[-0.01em] text-ink" style={{ fontSize: "clamp(30px,3.8vw,56px)" }}>
                  <span className="text-red">&ldquo;</span>
                  {r.quote}
                  <span className="text-red">&rdquo;</span>
                </blockquote>
                <figcaption className="mt-[34px] text-[12.5px] uppercase tracking-[0.15em] text-ink/55">
                  {r.name} · <span className="text-blue">Google review · {r.year}</span>
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

function Stars({ n, size = 14, className = "" }: { n: number; size?: number; className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i < n ? "#F4B400" : "rgba(17,24,32,.15)"}>
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3.1-5.4 3.1 1.2-6L1.3 7.8l6.1-.7L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function GoogleG() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z" />
      <path fill="#FBBC05" d="M10.6 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.8-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.4 2.3-6.2 0-11.5-4.1-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z" />
    </svg>
  );
}
