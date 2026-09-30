"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SPECIALITIES, type Speciality } from "@/lib/data";
import { EXPO } from "@/lib/motion";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { SITE } from "@/lib/site";

const pad = (n: number) => String(n + 1).padStart(2, "0");

export default function Expertise() {
  const [active, setActive] = useState(0);
  const spec = SPECIALITIES[active];

  return (
    <section className="bg-ink px-[clamp(20px,4vw,64px)] py-[clamp(80px,13vh,160px)] text-white">
      <div className="wrap-inner">
        <div className="flex flex-wrap items-baseline gap-x-10 gap-y-4 border-b border-white/14 pb-11">
          <SplitText parts={["Medical Expertise"]} className="t-h2 m-0 !leading-none" />
          <Reveal delay={0.2} className="meta text-white/50" style={{ fontSize: 12, letterSpacing: ".2em" }}>
            10+ specialities · 11 specialists · Raebareli
          </Reveal>
        </div>

        <div className="grid gap-[clamp(24px,4vw,72px)] pt-11 lg:grid-cols-2">
          <ul className="flex flex-col" role="tablist" aria-label="Specialities">
            {SPECIALITIES.map((sp, i) => {
              const on = i === active;
              return (
                <Reveal as="li" key={sp.slug} delay={i * 0.04} y={16} className="border-b border-white/10">
                  <button
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(i)}
                    className={`group flex w-full items-baseline gap-[18px] px-1 py-5 text-left transition-colors duration-500 ${on ? "text-white" : "text-white/50 hover:text-white"}`}
                  >
                    <span className="w-[26px] shrink-0 text-[11px] font-medium tracking-[0.14em] opacity-50">{pad(i)}</span>
                    <span className="relative text-[clamp(19px,2vw,30px)] font-normal leading-[1.2] tracking-[-0.01em]">
                      {sp.name}
                      <span className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-red transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)] ${on ? "scale-x-100" : "scale-x-0"}`} />
                    </span>
                    <span className="ml-auto hidden text-right text-[10.5px] font-medium uppercase tracking-[0.14em] opacity-55 sm:block">{sp.timing}</span>
                  </button>
                  {/* Mobile: detail opens inline */}
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        className="overflow-hidden lg:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.7, ease: EXPO }}
                      >
                        <div className="pb-8 pt-1">
                          <Panel spec={sp} compact />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </ul>

          <div className="sticky top-[84px] hidden self-start lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={spec.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.42, ease: EXPO }}
              >
                <Panel spec={spec} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ spec, compact = false }: { spec: Speciality; compact?: boolean }) {
  return (
    <>
      <div className={`ph-dark r-img relative ${compact ? "h-[240px]" : "h-[clamp(220px,calc(100svh-440px),480px)]"}`}>
        {spec.image && (
          <motion.div className="absolute inset-0" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: EXPO }}>
            <Image src={spec.image} alt={spec.imageAlt} fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover opacity-90" />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      </div>
      <h3 className={`${compact ? "mt-6" : "mt-8"} font-serif font-normal leading-[1.1]`} style={{ fontSize: compact ? 28 : "clamp(28px,3.2vw,44px)" }}>
        {spec.name}
      </h3>
      <p className="body mt-[18px] max-w-[52ch] text-white/76">{spec.desc}</p>
      <div className="mt-[26px] flex flex-wrap gap-x-7 gap-y-2.5 text-[11.5px] font-medium uppercase tracking-[0.14em]">
        <span className="text-red">{spec.timing}</span>
        <span className="text-white/62">{spec.doctors.join(", ")}</span>
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link href={`/services/${spec.slug}`} className="link-u !text-white">
          Explore {spec.short} <span className="arr">→</span>
        </Link>
        <span className="text-[12.5px] tracking-[0.04em] text-white/45">Available at BBSM Nursing Home, Raebareli — {SITE.phone}</span>
      </div>
    </>
  );
}
