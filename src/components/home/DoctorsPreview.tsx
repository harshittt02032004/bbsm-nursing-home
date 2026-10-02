"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DOCTORS } from "@/lib/data";
import { EXPO } from "@/lib/motion";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import DoctorPortrait from "@/components/ui/DoctorPortrait";

const pad = (n: number) => String(n + 1).padStart(2, "0");

export default function DoctorsPreview() {
  const [active, setActive] = useState(0);
  const doc = DOCTORS[active];

  return (
    <section className="overflow-x-clip bg-paper px-[clamp(20px,4vw,64px)] py-[44px] md:py-[clamp(80px,13vh,170px)]">
      <div className="wrap-inner">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SplitText parts={["Meet Raebareli's most experienced medical team."]} className="t-h2 m-0 max-w-[18ch]" />
          <Reveal delay={0.2}>
            <Link href="/doctors" className="link-u">
              All 11 doctors <span className="arr">→</span>
            </Link>
          </Reveal>
        </div>

        {/* Desktop: list + sticky profile card (4:5 portrait beside the details, so the whole photo shows) */}
        <div className="mt-[24px] md:mt-[clamp(44px,7vh,84px)] hidden items-start gap-[clamp(24px,4vw,72px)] lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <ul>
            {DOCTORS.map((d, i) => {
              const on = i === active;
              const firstOfGroup = i === 0 || DOCTORS[i - 1].group !== d.group;
              return (
                <Reveal as="li" key={d.slug} delay={i * 0.03} y={14}>
                  {firstOfGroup && (
                    <div className={`meta pb-2 ${i ? "pt-8" : ""} ${d.group === "Super Speciality" ? "text-red" : d.group === "Daily OPD" ? "text-blue" : "text-ink/60"}`} style={{ fontSize: 10.5 }}>
                      {d.group === "Super Speciality" ? "Super Speciality OPD · Last Sunday" : d.group === "Daily OPD" ? "Daily OPD · 10 AM – 4 PM" : "Daily Visiting"}
                    </div>
                  )}
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`group flex w-full items-baseline gap-4 border-b border-ink/10 px-0.5 py-[15px] text-left transition-colors duration-500 ${on ? "text-red" : "text-ink hover:text-red"}`}
                  >
                    <span className="w-6 shrink-0 text-[10.5px] font-medium tracking-[0.14em] opacity-45">{pad(i)}</span>
                    <span className={`shrink-0 whitespace-nowrap text-[clamp(16px,1.5vw,22px)] leading-[1.25] transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)] ${on ? "translate-x-2" : ""}`}>{d.name}</span>
                    <span className="ml-auto text-right text-[10.5px] font-medium uppercase tracking-[0.13em] opacity-50">{d.title}</span>
                  </button>
                </Reveal>
              );
            })}
          </ul>

          <div className="sticky top-[84px] self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={doc.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="grid grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] items-start gap-[clamp(20px,2.4vw,40px)]"
              >
                <motion.div initial={{ clipPath: "inset(0 0 12% 0 round var(--radius-img))" }} animate={{ clipPath: "inset(0 0 0% 0 round var(--radius-img))" }} transition={{ duration: 0.9, ease: EXPO }}>
                  <DoctorPortrait doctor={doc} className="aspect-[4/5] w-full" sizes="(min-width: 1024px) 26vw, 74vw" />
                </motion.div>
                <div>
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: EXPO, delay: 0.05 }}
                    className="font-serif font-normal leading-[1.04] tracking-[-0.015em]"
                    style={{ fontSize: "clamp(27px,2.7vw,42px)" }}
                  >
                    {doc.name}
                  </motion.h3>
                  <div className="mt-3 text-[12.5px] font-medium uppercase tracking-[0.14em] text-red">{doc.role}</div>
                  <p className="body mt-5 opacity-82">{doc.expertise}</p>
                  <div className="mt-5 text-[13px] leading-relaxed tracking-[0.03em] opacity-62">{doc.availability} · Available at BBSM Nursing Home, Raebareli</div>
                  <Link href={`/doctors/${doc.slug}`} className="link-u mt-6">
                    View profile <span className="arr">→</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: swipeable portrait rail */}
        <div className="-mx-[clamp(20px,4vw,64px)] mt-12 lg:hidden">
          <div className="hscroll flex snap-x snap-mandatory scroll-px-[clamp(20px,4vw,64px)] gap-4 overflow-x-auto px-[clamp(20px,4vw,64px)] pb-5">
            {DOCTORS.map((d) => (
              <Link key={d.slug} href={`/doctors/${d.slug}`} className="w-[74vw] max-w-[320px] shrink-0 snap-start text-ink hover:text-ink">
                <DoctorPortrait doctor={d} className="aspect-[4/5]" sizes="74vw" />
                <div className={`meta mt-4 ${d.group === "Super Speciality" ? "text-red" : "text-blue"}`} style={{ fontSize: 10 }}>
                  {d.group === "Super Speciality" ? "Last Sunday · 9–12" : d.group === "Daily OPD" ? "Daily OPD · 10–4" : "Daily Visiting"}
                </div>
                <div className="mt-1.5 font-serif text-[26px] leading-[1.1]">{d.name}</div>
                <div className="mt-1 text-[13px] font-light text-ink/65">{d.title}</div>
              </Link>
            ))}
          </div>
          <div className="meta px-[clamp(20px,4vw,64px)] text-ink/40" style={{ fontSize: 10.5 }}>Swipe →</div>
        </div>
      </div>
    </section>
  );
}
