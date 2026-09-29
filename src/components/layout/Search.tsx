"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { search, SUGGESTIONS } from "@/lib/search";
import { EXPO } from "@/lib/motion";
import { getLenis } from "@/components/motion/SmoothScroll";

export default function Search({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <Panel onClose={onClose} />}</AnimatePresence>;
}

function Panel({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => search(q), [q]);
  const list = q ? results.map((r) => ({ label: r.title, sub: r.sub, kind: r.kind, href: r.href })) : SUGGESTIONS.map((s) => ({ label: s.label, sub: "", kind: "", href: s.href }));

  useEffect(() => {
    getLenis()?.stop();
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      clearTimeout(t);
      getLenis()?.start();
    };
  }, []);

  const go = (href: string) => {
    onClose();
    if (href.startsWith("tel:")) window.location.href = href;
    else router.push(href);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, list.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && list[active]) {
      e.preventDefault();
      go(list[active].href);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex justify-center bg-ink/55 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Search BBSM"
    >
      <motion.div
        className="mt-[clamp(0px,10vh,120px)] h-fit max-h-[86vh] w-full max-w-[860px] overflow-hidden bg-paper"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.6, ease: EXPO }}
      >
        <div className="flex items-center gap-4 border-b hair px-[clamp(18px,3vw,34px)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#07518B" strokeWidth="1.6" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKey}
            placeholder="Search doctors, departments, or treatments in Raebareli…"
            className="h-[76px] w-full bg-transparent font-serif text-[clamp(20px,2.4vw,30px)] text-ink outline-none placeholder:text-ink/35"
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
          />
          <button onClick={onClose} className="meta shrink-0 border hair px-3 py-2 text-ink/60 hover:text-red" style={{ fontSize: 10.5 }}>
            Esc
          </button>
        </div>
        <div className="max-h-[62vh] overflow-y-auto overscroll-contain px-[clamp(18px,3vw,34px)] py-5" data-lenis-prevent>
          <div className="meta mb-3 text-ink/45" style={{ fontSize: 10.5 }}>
            {q ? (list.length ? `${list.length} results` : "No results — try “eye”, “knee”, “cancer” or “Sunday”") : "Popular searches"}
          </div>
          <ul id="search-results" role="listbox">
            {list.map((it, i) => (
              <li key={it.href + it.label} role="option" aria-selected={i === active}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(it.href)}
                  className={`group flex w-full items-baseline gap-4 border-b py-4 text-left transition-colors hair ${i === active ? "text-red" : "text-ink"}`}
                >
                  {it.kind && (
                    <span className="meta w-[86px] shrink-0 text-ink/40" style={{ fontSize: 10 }}>
                      {it.kind}
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block text-[17px] leading-snug">{it.label}</span>
                    {it.sub && <span className="mt-1 block truncate text-[13px] font-light text-ink/55">{it.sub}</span>}
                  </span>
                  <span className={`transition-transform duration-500 ${i === active ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}>→</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
