import Link from "next/link";
import Image from "next/image";
import { NAV, SITE } from "@/lib/site";
import { SPECIALITIES } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/[.14] bg-blue-deep px-[clamp(20px,4vw,64px)] pb-[46px] pt-[clamp(70px,12vh,140px)] text-white">
      <div className="wrap-inner">
        <div className="grid items-end gap-[clamp(30px,5vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
          <div>
            <span className="inline-flex rounded-[var(--radius-img)] bg-paper px-[22px] py-[18px]">
              <Image src="/images/bbsm-logo.png" alt="BBSM Nursing Home — Care You Can Trust" width={100} height={130} className="h-[130px] w-auto" />
            </span>
            <div className="mt-[26px] font-serif leading-none" style={{ fontSize: "clamp(30px,3.4vw,50px)" }}>
              Care You Can Trust.
            </div>
          </div>
          <div className="flex flex-col gap-5 text-[15.5px] font-light leading-[1.65] text-white/80">
            <address className="not-italic">
              A 7/7, Jail Garden Road, Awas Vikas Colony,
              <br />
              Indira Nagar, Raebareli, Uttar Pradesh 229001
            </address>
            <div className="flex flex-wrap gap-x-10 gap-y-3">
              <a href={SITE.phoneHref} className="text-[19px] tracking-[0.02em] text-white hover:text-white/70">
                {SITE.phone}
              </a>
              <a href={SITE.emergencyHref} className="text-[15px] text-white/80 hover:text-white">
                <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-red">24×7 Emergency</span>
                {SITE.emergency}
              </a>
            </div>
            <div className="text-[14px] text-white/62">Daily OPD 10:00 AM – 4:00 PM · Super Speciality OPD last Sunday 9:00 AM – 12:00 PM</div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[13px] uppercase tracking-[0.14em]">
              <a href={SITE.directionsUrl} target="_blank" rel="noopener" className="text-white/80 hover:text-white">Directions ↗</a>
              <a href={SITE.instagram} target="_blank" rel="noopener" className="text-white/80 hover:text-white">Instagram ↗</a>
              <a href={SITE.reviewsUrl} target="_blank" rel="noopener" className="text-white/80 hover:text-white">Google Reviews ↗</a>
            </div>
          </div>
        </div>

        <div className="mt-[clamp(50px,8vh,90px)] grid gap-10 border-t border-white/[.16] pt-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
          <div>
            <div className="meta mb-4 text-white/45" style={{ fontSize: 11 }}>Explore</div>
            <ul className="grid gap-2.5 text-[14.5px] font-light">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-white/75 hover:text-white">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2">
            <div className="meta mb-4 text-white/45" style={{ fontSize: 11 }}>Specialities in Raebareli</div>
            <ul className="grid gap-x-8 gap-y-2.5 text-[14.5px] font-light sm:grid-cols-2">
              {SPECIALITIES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-white/75 hover:text-white">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-x-8 gap-y-3 border-t border-white/[.16] pt-[26px] text-[12.5px] tracking-[0.05em] text-white/62">
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
