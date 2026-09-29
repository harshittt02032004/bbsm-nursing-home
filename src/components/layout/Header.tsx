"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { NAV, SITE } from "@/lib/site";
import { EXPO } from "@/lib/motion";
import Search from "./Search";
import { getLenis } from "@/components/motion/SmoothScroll";

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const tribute = pathname === "/founder";

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 420 && y > prev + 2 && !menu);
    if (y < prev - 2) setHidden(false);
  });

  // Close the menu on navigation (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenu(false);
  }
  useEffect(() => {
    if (menu) getLenis()?.stop();
    else getLenis()?.start();
    document.documentElement.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA")) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[60]"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: EXPO }}
      >
        {/* Emergency strip */}
        <motion.div
          className="overflow-hidden bg-blue-deep text-white"
          animate={{ height: scrolled ? 0 : 36 }}
          initial={false}
          transition={{ duration: 0.5, ease: EXPO }}
        >
          <div className="wrap flex h-9 items-center justify-between gap-6 text-[11.5px] tracking-[0.08em]">
            <a href={SITE.emergencyHref} className="flex items-center gap-2.5 text-white hover:text-white">
              <span className="relative flex h-2 w-2">
                <span className="pulse-dot absolute inset-0 rounded-full bg-red" />
                <span className="relative h-2 w-2 rounded-full bg-red" />
              </span>
              <span className="font-semibold uppercase tracking-[0.14em]">24×7 Emergency</span>
              <span className="text-white/80">{SITE.emergency}</span>
            </a>
            <span className="hidden text-white/60 md:block">
              Daily OPD 10 AM – 4 PM <span className="mx-2 text-white/30">/</span> Super Speciality OPD · Last Sunday 9 AM – 12 PM
            </span>
          </div>
        </motion.div>

        <div
          className={`border-b backdrop-blur-[14px] transition-colors duration-500 ${
            tribute && !scrolled ? "border-white/10 bg-tribute/80" : "border-ink/[.09] bg-paper/[.88]"
          }`}
        >
          <div className="wrap flex h-[82px] items-center gap-8">
            <Link href="/" className="flex shrink-0 items-center gap-3.5" aria-label="BBSM Nursing Home — Home">
              <span className={`flex h-[52px] items-center ${tribute && !scrolled ? "rounded-xl bg-paper px-1.5" : ""}`}>
                <Image src="/images/bbsm-logo.png" alt="BBSM Nursing Home logo" width={36} height={46} className="h-[46px] w-auto" preload />
              </span>
              <span className="hidden leading-[1.15] sm:block">
                <span className={`block text-[15px] font-semibold tracking-[0.02em] ${tribute && !scrolled ? "text-tribute-text" : "text-ink"}`}>BBSM Nursing Home</span>
                <span className={`mt-[3px] block text-[11px] uppercase tracking-[0.16em] ${tribute && !scrolled ? "text-gold" : "text-blue"}`}>
                  Hospital in Raebareli · Est. 1981
                </span>
              </span>
            </Link>

            <nav className="ml-auto hidden items-center gap-[clamp(14px,1.5vw,28px)] whitespace-nowrap min-[1320px]:flex" aria-label="Main">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`nav-link ${tribute && !scrolled && !isActive(n.href) ? "!text-tribute-text/85" : ""}`}
                >
                  {n.label}
                </Link>
              ))}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search (Ctrl+K)"
                className={`grid h-11 w-11 place-items-center rounded-full border transition-colors hover:border-red hover:text-red ${
                  tribute && !scrolled ? "border-white/25 text-tribute-text" : "border-ink/20 text-ink"
                }`}
              >
                <SearchIcon />
              </button>
              <a href={SITE.phoneHref} className="btn btn-red !px-5 !py-[15px] !text-[12.5px] !tracking-[0.08em]">
                Book an Appointment
              </a>
            </nav>

            <div className="ml-auto flex items-center gap-2 sm:gap-2.5 min-[1320px]:hidden">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className={`grid h-[44px] w-[44px] place-items-center rounded-full border ${tribute && !scrolled ? "border-white/25 text-tribute-text" : "border-ink/20 text-ink"}`}
              >
                <SearchIcon />
              </button>
              <a href={SITE.phoneHref} className="btn btn-red !px-3.5 !py-[15px] !text-[12px] sm:!px-4">
                Call
              </a>
              <button
                onClick={() => setMenu((m) => !m)}
                aria-expanded={menu}
                aria-controls="mobile-menu"
                className={`meta relative h-[44px] rounded-full border px-4 !text-[12px] sm:px-5 !font-semibold ${tribute && !scrolled && !menu ? "border-white/25 text-tribute-text" : "border-ink/20 text-ink"}`}
              >
                {menu ? "Close" : "Menu"}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-paper pt-[118px]"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EXPO }}
            data-lenis-prevent
          >
            <nav className="wrap flex flex-1 flex-col" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: EXPO, delay: 0.15 + i * 0.06 }}
                  className="border-b hair"
                >
                  <Link
                    href={n.href}
                    className={`flex items-baseline gap-5 py-[clamp(12px,2.2vh,20px)] font-serif text-[clamp(34px,8vw,56px)] leading-none ${isActive(n.href) ? "text-red" : "text-ink"}`}
                  >
                    <span className="font-sans text-[11px] tracking-[0.14em] text-ink/40">0{i + 1}</span>
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="mt-auto grid gap-3 pb-8 pt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.6 }}
              >
                <a href={SITE.phoneHref} className="btn btn-red w-full">
                  Book an Appointment <span className="arr">→</span>
                </a>
                <a href={SITE.emergencyHref} className="btn btn-ghost w-full">
                  24×7 Emergency · {SITE.emergency}
                </a>
                <p className="mt-3 text-[13px] font-light leading-relaxed text-ink/60">{SITE.address.full}</p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <Search open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
