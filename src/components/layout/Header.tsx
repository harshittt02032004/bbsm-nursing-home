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

const SPRING = "duration-[450ms] ease-[cubic-bezier(.23,1,.32,1)]";

/**
 * Fixed header. At the top of the page it is a slim full-width bar under the
 * emergency strip (total height = --header-h in globals.css); once the visitor
 * scrolls it shrinks into a floating glass capsule with a smaller logo and
 * tighter padding (same behaviour as the Patle and Mannat sites).
 */
export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const tribute = pathname === "/founder";
  const dark = tribute && !scrolled;

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

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

  const iconBtn = `grid h-10 w-10 place-items-center rounded-full border transition-[color,border-color,transform] duration-300 ease-[cubic-bezier(.23,1,.32,1)] hover:-translate-y-0.5 hover:border-red hover:text-red active:scale-95 ${
    dark ? "border-white/25 text-tribute-text" : "border-ink/20 text-ink"
  }`;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60]">
        {/* Emergency strip — folds away once the page is scrolled */}
        <motion.div
          className="pointer-events-auto overflow-hidden bg-blue-deep text-white"
          animate={{ height: scrolled ? 0 : 28 }}
          initial={false}
          transition={{ duration: 0.5, ease: EXPO }}
        >
          <div className="wrap flex h-7 items-center justify-between gap-6 text-[10.5px] tracking-[0.08em] sm:text-[11px]">
            <a href={SITE.emergencyHref} className="flex items-center gap-2 text-white hover:text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="pulse-dot absolute inset-0 rounded-full bg-red" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-red" />
              </span>
              <span className="font-semibold uppercase tracking-[0.14em]">24×7 Emergency</span>
              <span className="text-white/80">{SITE.emergency}</span>
            </a>
            <span className="hidden text-white/60 md:block">
              Daily OPD 10 AM – 4 PM <span className="mx-2 text-white/30">/</span> Super Speciality OPD · Last Sunday 9 AM – 12 PM
            </span>
          </div>
        </motion.div>

        <div className={`transition-[padding] ${SPRING} ${scrolled ? "px-3 sm:px-4" : "px-0"}`}>
          <div
            className={`pointer-events-auto mx-auto border transition-[height,max-width,margin,border-radius,background-color,box-shadow,border-color] ${SPRING} ${
              scrolled
                ? "mt-2.5 h-[52px] max-w-[84rem] rounded-full border-ink/10 bg-paper/85 shadow-[0_8px_32px_rgba(6,59,104,0.14)] backdrop-blur-[20px] backdrop-saturate-[1.3]"
                : dark
                  ? "mt-0 h-[60px] max-w-[100vw] rounded-none border-transparent border-b-white/10 bg-tribute/80 backdrop-blur-[14px] md:h-[66px]"
                  : "mt-0 h-[60px] max-w-[100vw] rounded-none border-transparent border-b-ink/[.09] bg-paper/[.88] backdrop-blur-[14px] md:h-[66px]"
            }`}
            style={{ willChange: "height, max-width, border-radius" }}
          >
            <div
              className={`mx-auto flex h-full max-w-[1560px] items-center gap-6 transition-[padding] ${SPRING} ${
                scrolled ? "pl-4 pr-1.5 sm:pl-5" : "px-[clamp(20px,4vw,64px)]"
              }`}
            >
              <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="BBSM Nursing Home — Home">
                <span className={`flex items-center ${dark ? "rounded-lg bg-paper px-1.5 py-[2px]" : ""}`}>
                  {/* Logo height scales with the screen (clamp), and shrinks inside the capsule */}
                  <Image
                    src="/images/bbsm-logo.png"
                    alt="BBSM Nursing Home logo"
                    width={36}
                    height={46}
                    preload
                    className={`w-auto transition-[height,transform] ${SPRING} group-hover:scale-[1.04] ${
                      scrolled ? "h-[clamp(30px,2.5vw,34px)]" : "h-[clamp(34px,3.1vw,42px)]"
                    }`}
                  />
                </span>
                <span className="hidden leading-[1.15] sm:block lg:max-[1179px]:hidden">
                  <span className={`block text-[14px] font-semibold tracking-[0.02em] md:text-[15px] ${dark ? "text-tribute-text" : "text-ink"}`}>BBSM Nursing Home</span>
                  <span
                    className={`block overflow-hidden text-[10px] uppercase tracking-[0.16em] transition-[max-height,opacity,margin] md:text-[10.5px] lg:max-[1479px]:hidden ${SPRING} ${
                      scrolled ? "mt-0 max-h-0 opacity-0" : "mt-[2px] max-h-4 opacity-100"
                    } ${dark ? "text-gold" : "text-blue"}`}
                  >
                    Hospital in Raebareli · Est. 1981
                  </span>
                </span>
              </Link>

              <nav className="ml-auto hidden items-center gap-[clamp(2px,0.4vw,8px)] whitespace-nowrap lg:flex" aria-label="Main">
                {NAV.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={`nav-link ${dark && !isActive(n.href) ? "!text-tribute-text/90" : ""}`}
                  >
                    {n.label}
                  </Link>
                ))}
                <button onClick={() => setSearchOpen(true)} aria-label="Search (Ctrl+K)" className={`${iconBtn} ml-1.5 shrink-0`}>
                  <SearchIcon />
                </button>
                <a href={SITE.phoneHref} className="btn-nav ml-1.5 shrink-0" aria-label="Book an appointment — call BBSM">
                  <span className="min-[1200px]:hidden">Book Now</span>
                  <span className="hidden min-[1200px]:inline">Book an Appointment</span>
                  <span className="arr" aria-hidden>→</span>
                </a>
              </nav>

              <div className="ml-auto flex items-center gap-2 lg:hidden">
                <button onClick={() => setSearchOpen(true)} aria-label="Search" className={iconBtn}>
                  <SearchIcon />
                </button>
                <a href={SITE.phoneHref} className="btn-nav !px-4 sm:!px-5">
                  Call
                </a>
                <button
                  onClick={() => setMenu((m) => !m)}
                  aria-expanded={menu}
                  aria-controls="mobile-menu"
                  className={`meta h-10 rounded-full border px-4 !text-[11.5px] !font-semibold transition-[color,border-color,transform] duration-300 ease-[cubic-bezier(.23,1,.32,1)] hover:-translate-y-0.5 active:scale-95 sm:px-5 ${
                    dark && !menu ? "border-white/25 text-tribute-text" : "border-ink/20 text-ink"
                  }`}
                >
                  {menu ? "Close" : "Menu"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-paper pt-[calc(var(--header-h)+8px)]"
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
