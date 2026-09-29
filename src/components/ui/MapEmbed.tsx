"use client";

import { useState } from "react";
import Image from "next/image";
import { SITE } from "@/lib/site";

/** Click-to-load Google Map — keeps the page fast (no third-party iframe until asked). */
export default function MapEmbed() {
  const [on, setOn] = useState(false);
  if (on) {
    return (
      <iframe
        title="BBSM Nursing Home — Hospital in Raebareli on Google Maps"
        src={SITE.mapEmbed}
        className="r-img h-full min-h-[clamp(360px,58vh,620px)] w-full border border-blue/15 grayscale-[.25]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }
  return (
    <button
      onClick={() => setOn(true)}
      className="r-img group relative block h-full min-h-[clamp(360px,58vh,620px)] w-full text-left"
      aria-label="Load Google Map for BBSM Nursing Home"
    >
      <Image src="/images/exterior-street.jpg" alt="" fill sizes="(min-width: 900px) 46vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.04]" />
      <span className="absolute inset-0 bg-gradient-to-t from-blue-deep/90 via-blue-deep/35 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 text-white">
        <span>
          <span className="block text-[11px] font-medium uppercase tracking-[0.17em] text-white/70">BBSM Nursing Home — Hospital in Raebareli</span>
          <span className="mt-2 block font-serif text-[28px] leading-tight">Jail Garden Road, Indira Nagar</span>
        </span>
        <span className="btn btn-red-dark !py-4">View Map <span className="arr">→</span></span>
      </span>
    </button>
  );
}
