import Link from "next/link";
import Image from "next/image";
import { NAV, SITE } from "@/lib/site";
import { SPECIALITIES } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/[.14] bg-blue-deep px-[clamp(20px,4vw,64px)] pb-24 pt-[clamp(40px,6vh,64px)] text-white min-[1320px]:pb-7">
      <div className="wrap-inner">
        <div className="grid items-center gap-x-[clamp(30px,5vw,80px)] gap-y-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
          <div className="flex items-center gap-5">
            <span className="inline-flex shrink-0 rounded-[var(--radius-card)] bg-paper px-3.5 py-3">
              <Image src="/images/bbsm-logo.png" alt="BBSM Nursing Home — Care You Can Trust" width={62} height={80} className="h-[80px] w-auto" />
            </span>
            <div className="font-serif leading-[1.02]" style={{ fontSize: "clamp(26px,2.6vw,38px)" }}>
              Care You Can Trust.
            </div>
          </div>
          <div className="flex flex-col gap-3 text-[14.5px] font-light leading-[1.6] text-white/80">
            <address className="not-italic">
              A 7/7, Jail Garden Road, Awas Vikas Colony, Indira Nagar, Raebareli, Uttar Pradesh 229001
            </address>
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
              <a href={SITE.phoneHref} className="text-[18px] tracking-[0.02em] text-white hover:text-white/70">
                {SITE.phone}
              </a>
              <a href={SITE.emergencyHref} className="text-[14.5px] text-white/80 hover:text-white">
                <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-red">24×7 Emergency</span>
                {SITE.emergency}
              </a>
            </div>
            <div className="text-[13.5px] text-white/62">Daily OPD 10:00 AM – 4:00 PM · Super Speciality OPD last Sunday 9:00 AM – 12:00 PM</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] uppercase tracking-[0.14em]">
              <a href={SITE.directionsUrl} target="_blank" rel="noopener" className="text-white/80 hover:text-white">Directions ↗</a>
              <a href={SITE.instagram} target="_blank" rel="noopener" className="text-white/80 hover:text-white">Instagram ↗</a>
              <a href={SITE.reviewsUrl} target="_blank" rel="noopener" className="text-white/80 hover:text-white">Google Reviews ↗</a>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-x-10 gap-y-7 border-t border-white/[.16] pt-7 lg:grid-cols-[1fr_2fr]">
          <div>
            <div className="meta mb-3 text-white/45" style={{ fontSize: 11 }}>Explore</div>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-[14px] font-light">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-white/75 hover:text-white">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="meta mb-3 text-white/45" style={{ fontSize: 11 }}>Specialities in Raebareli</div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-[14px] font-light xl:grid-cols-3">
              {SPECIALITIES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-white/75 hover:text-white">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-white/[.16] pt-5 text-[12px] tracking-[0.05em] text-white/62">
          <span>BBSM Nursing Home — Brij Bhushan Singh Memorial Nursing Home, Raebareli&apos;s First Hospital, Est. 1981 · Hospital in Raebareli</span>
          <span className="flex gap-6">
            <Link href="/privacy" className="text-white/62 hover:text-white">Privacy</Link>
            <Link href="/terms" className="text-white/62 hover:text-white">Terms</Link>
            <span>© {new Date().getFullYear()} All rights reserved</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
