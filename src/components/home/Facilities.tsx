"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { FACILITIES } from "@/lib/data";
import SplitText from "@/components/motion/SplitText";

export default function Facilities() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-paper py-[clamp(80px,13vh,150px)] lg:py-0">
      <div className="lg:hidden">
        <Header />
        <div className="hscroll mt-10 flex snap-x snap-mandatory items-end gap-5 overflow-x-auto px-[clamp(20px,4vw,64px)] pb-6">
          {FACILITIES.map((f) => (
            <figure key={f.caption} className="m-0 w-[78vw] max-w-[380px] shrink-0 snap-center">
              <div className="r-img relative h-[clamp(260px,52vh,420px)]">
                <Image src={f.src} alt={f.alt} fill sizes="78vw" className="object-cover" />
              </div>
              <figcaption className="meta mt-3.5 text-ink/62">{f.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="hidden lg:block">{reduce ? <Static /> : <Pinned />}</div>
    </section>
  );
}

function Header() {
  return (
    <div className="wrap flex w-full flex-wrap items-baseline justify-between gap-4">
      <SplitText parts={["Inside BBSM"]} className="t-h2 m-0 !leading-none" />
      <span className="meta text-ink/50">Clean wards · ICU · Private rooms · Accessible entry</span>
    </div>
  );
}

function Static() {
  return (
    <div className="py-[clamp(80px,13vh,150px)]">
      <Header />
      <div className="hscroll mt-14 flex items-end gap-[clamp(20px,3vw,54px)] overflow-x-auto px-[clamp(20px,4vw,64px)] pb-7">
        {FACILITIES.map((f) => (
          <figure key={f.caption} className="m-0 shrink-0" style={{ width: f.w }}>
            <div className="r-img relative" style={{ height: f.h }}>
              <Image src={f.src} alt={f.alt} fill sizes="40vw" className="object-cover" />
            </div>
            <figcaption className="meta mt-3.5 text-ink/62">{f.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function Pinned() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.35 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <div ref={section} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-[66px]">
        <Header />
        <motion.div ref={track} style={{ x }} className="mt-[clamp(28px,5vh,56px)] flex w-max items-end gap-[clamp(20px,3vw,54px)] px-[clamp(20px,4vw,64px)]">
          {FACILITIES.map((f, i) => (
            <Item key={f.caption} f={f} i={i} p={smooth} />
          ))}
          <div className="flex w-[clamp(260px,24vw,380px)] shrink-0 flex-col justify-end pb-10 pl-4">
            <p className="font-serif text-[clamp(26px,2.6vw,38px)] leading-[1.15] text-ink">Built in 1981. Cared for every day since.</p>
            <p className="mt-4 text-[14px] font-light leading-relaxed text-ink/60">A 7/7, Jail Garden Road, Indira Nagar — minutes from the heart of Raebareli.</p>
          </div>
        </motion.div>
        <div className="wrap mt-8 w-full">
          <div className="h-px w-full bg-ink/10">
            <motion.div className="h-px origin-left bg-blue" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Item({ f, i, p }: { f: (typeof FACILITIES)[number]; i: number; p: MotionValue<number> }) {
  const y = useTransform(p, [0, 1], i % 2 ? [30, -30] : [-24, 36]);
  const imgX = useTransform(p, [0, 1], ["-6%", "6%"]);
  return (
    <motion.figure className="m-0 shrink-0" style={{ width: f.w, y }}>
      <div className="r-img relative" style={{ height: f.h }}>
        <motion.div className="absolute inset-y-0 -left-[8%] -right-[8%]" style={{ x: imgX }}>
          <Image src={f.src} alt={f.alt} fill sizes="(min-width:1024px) 40vw, 80vw" className="object-cover" />
        </motion.div>
      </div>
      <figcaption className="meta mt-3.5 text-ink/62">{f.caption}</figcaption>
    </motion.figure>
  );
}
