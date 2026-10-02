import Link from "next/link";
import Image from "next/image";
import { NAV, SITE } from "@/lib/site";
import { SPECIALITIES } from "@/lib/data";
import Reveal from "@/components/motion/Reveal";
import GrowLine from "@/components/motion/GrowLine";
import FooterMap from "./FooterMap";

type IconName = "phone" | "emergency" | "clock" | "calendar" | "instagram" | "star" | "pin";

const CONTACT: { label: string; value: string; href?: string; icon: IconName }[] = [
  { label: "Appointments", value: SITE.phone, href: SITE.phoneHref, icon: "phone" },
  { label: "24×7 Emergency", value: SITE.emergency, href: SITE.emergencyHref, icon: "emergency" },
  { label: "Daily OPD", value: "Every day, 10 AM – 4 PM", icon: "clock" },
  { label: "Super Speciality OPD", value: "Last Sunday, 9 AM – 12 PM", icon: "calendar" },
];

const TICKER = ["Care You Can Trust", "Raebareli's First Nursing Home", "Est. 1983", "11 Specialists", "24×7 Emergency", "Delhi Specialists Every Last Sunday"];

/**
 * Footer: a light contact capsule straddling the footer's top edge (echoing the header
 * capsule), four columns (brand, explore, specialities, find us), and a slow ticker.
 * Everything animates in on scroll; every button and link "pops" on hover (.pop / .f-link).
 */
export default function Footer() {
  return (
    <footer className="relative flow-root bg-blue-deep px-[clamp(20px,4vw,64px)] pb-24 text-white lg:pb-7">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="texture-lines absolute inset-0 opacity-60" />
        <div
          className="drift absolute -left-[12%] -top-[30%] h-[520px] w-[640px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(7,81,139,.8), rgba(7,81,139,0) 68%)" }}
        />
        <div
          className="drift absolute -bottom-[40%] right-[-8%] h-[460px] w-[560px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(197,32,48,.22), rgba(197,32,48,0) 66%)", animationDelay: "-12s", animationDuration: "34s" }}
        />
      </div>

      <div className="wrap-inner relative">
        {/* Contact capsule */}
        <Reveal
          y={46}
          className="-mt-10 grid overflow-hidden rounded-[26px] border border-white/70 bg-paper text-ink shadow-[0_18px_50px_rgba(3,20,38,0.35)] sm:grid-cols-2 lg:-mt-[38px] lg:grid-cols-4 lg:rounded-full min-[1560px]:grid-cols-[repeat(4,minmax(0,1fr))_auto]"
        >
          {CONTACT.map((c) => {
            const inner = (
              <>
                <span
                  className={`seg-ico grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full lg:max-[1139px]:hidden ${
                    c.icon === "emergency" ? "bg-red/10 text-red" : "bg-mist text-blue"
                  }`}
                >
                  <Icon name={c.icon} />
                </span>
                <span className="seg-text min-w-0">
                  <span className="block text-[10.5px] font-medium uppercase leading-none tracking-[0.16em] text-ink/55">{c.label}</span>
                  <span className="seg-value mt-[7px] block whitespace-nowrap text-[clamp(13.5px,1.12vw,15px)] font-semibold leading-none tracking-[0.01em] text-ink">
                    {c.value}
                  </span>
                </span>
              </>
            );
            const cls =
              "seg flex items-center gap-3.5 border-ink/10 px-5 py-3.5 border-t first:border-t-0 sm:even:border-l sm:[&:nth-child(2)]:border-t-0 lg:border-l lg:border-t-0 lg:px-[clamp(16px,1.7vw,26px)] lg:py-[18px] lg:first:border-l-0 lg:first:pl-8";
            return c.href ? (
              <a key={c.label} href={c.href} className={`${cls} text-ink hover:text-ink`}>
                {inner}
              </a>
            ) : (
              <div key={c.label} className={cls}>
                {inner}
              </div>
            );
          })}
          <div className="hidden items-center border-l border-ink/10 pl-4 pr-3 min-[1560px]:flex">
            <a href={SITE.directionsUrl} target="_blank" rel="noopener" className="btn-nav">
              Get Directions <span className="arr" aria-hidden>↗</span>
            </a>
          </div>
        </Reveal>

        {/* Columns */}
        <div className="grid gap-x-[clamp(28px,3.2vw,56px)] gap-y-10 pt-[clamp(36px,5vh,52px)] sm:grid-cols-2 lg:grid-cols-[1.3fr_0.62fr_1.45fr_1.4fr]">
          <Reveal className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group/b inline-flex items-center gap-4 text-white hover:text-white" aria-label="BBSM Nursing Home — Home">
              <span className="pop-tilt inline-flex shrink-0 rounded-[var(--radius-card)] bg-paper px-3 py-2.5">
                <Image src="/images/bbsm-logo.png" alt="BBSM Nursing Home — Care You Can Trust" width={50} height={64} className="h-16 w-auto" />
              </span>
              <span>
                <span className="block font-serif text-[26px] leading-none">BBSM Nursing Home</span>
                <span className="mt-2 block text-[10.5px] uppercase tracking-[0.18em] text-white/55">Hospital in Raebareli · Est. 1983</span>
              </span>
            </Link>
            <p className="mt-6 font-serif leading-none" style={{ fontSize: "clamp(28px,2.6vw,38px)" }}>
              Care You Can Trust.
            </p>
            <p className="mt-3 max-w-[36ch] text-[13.5px] font-light leading-relaxed text-white/65">
              Raebareli&apos;s first nursing home, founded in 1983 by Late Dr. Virendra Singh. Eleven specialists, one address.
            </p>
            <div className="mt-5 flex gap-2.5">
              <Social href={SITE.instagram} label="BBSM on Instagram" icon="instagram" />
              <Social href={SITE.reviewsUrl} label="BBSM reviews on Google" icon="star" />
              <Social href={SITE.directionsUrl} label="Directions to BBSM on Google Maps" icon="pin" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <nav aria-label="Footer">
              <Heading>Explore</Heading>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[14px] font-light sm:grid-cols-1">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="f-link">{n.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal delay={0.16}>
            <Heading>Specialities in Raebareli</Heading>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[14px] font-light">
              {SPECIALITIES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="f-link" title={`${s.name} at BBSM Nursing Home, Raebareli`}>
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.24} className="sm:col-span-2 lg:col-span-1">
            <Heading>Find Us</Heading>
            <FooterMap />
            <address className="mt-3.5 text-[13.5px] font-light not-italic leading-relaxed text-white/72">
              A 7/7, Jail Garden Road, Awas Vikas Colony, Indira Nagar, Raebareli, Uttar Pradesh 229001
            </address>
          </Reveal>
        </div>
      </div>

      {/* Ticker — full-bleed, pauses on hover */}
      <div aria-hidden className="ticker-mask relative -mx-[clamp(20px,4vw,64px)] mt-[clamp(28px,4vh,40px)] overflow-hidden border-y border-white/10 py-3">
        <div className="footer-ticker flex w-max whitespace-nowrap font-serif italic leading-none text-white/30" style={{ fontSize: "clamp(19px,1.9vw,26px)" }}>
          {[0, 1].map((k) => (
            <span key={k} className="flex shrink-0">
              {TICKER.map((t) => (
                <span key={t} className="flex items-center">
                  <span className="px-[clamp(16px,2vw,30px)]">{t}</span>
                  <span className="text-[0.55em] not-italic text-red">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <Reveal y={12} viewport={{ once: true }} className="wrap-inner relative mt-5 flex flex-wrap justify-between gap-x-8 gap-y-2 text-[12px] tracking-[0.05em] text-white/62">
        <span>BBSM Nursing Home — Brij Bhushan Singh Memorial Nursing Home, Raebareli&apos;s First Hospital, Est. 1983 · Hospital in Raebareli</span>
        <span className="flex gap-6">
          <Link href="/privacy" className="f-link !text-white/62 hover:!text-white">Privacy</Link>
          <Link href="/terms" className="f-link !text-white/62 hover:!text-white">Terms</Link>
          <span>© {new Date().getFullYear()} All rights reserved</span>
        </span>
      </Reveal>
    </footer>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">{children}</div>
      <GrowLine axis="x" delay={0.3} className="mt-2 h-px w-7 bg-red" />
    </div>
  );
}

function Social({ href, label, icon }: { href: string; label: string; icon: IconName }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      title={label}
      className="pop grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white hover:border-white hover:bg-white hover:text-blue-deep"
    >
      <Icon name={icon} />
    </a>
  );
}

function Icon({ name }: { name: IconName }) {
  const p = { width: 17, height: 17, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (name) {
    case "phone":
      return (
        <svg {...p}>
          <path d="M5 4h3.5l1.6 4.3-2.2 1.5a12 12 0 0 0 6.3 6.3l1.5-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />
        </svg>
      );
    case "emergency":
      return (
        <svg {...p}>
          <path d="M3 12h4l2-5 4 10 2-5h6" />
        </svg>
      );
    case "clock":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...p}>
          <rect x="4" y="5.5" width="16" height="14.5" rx="2.5" />
          <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...p}>
          <rect x="4" y="4" width="16" height="16" rx="4.5" />
          <circle cx="12" cy="12" r="3.6" />
          <circle cx="16.6" cy="7.4" r="0.6" fill="currentColor" />
        </svg>
      );
    case "star":
      return (
        <svg {...p}>
          <path d="m12 4 2.4 5 5.4.7-4 3.8 1 5.4-4.8-2.7-4.8 2.7 1-5.4-4-3.8 5.4-.7L12 4Z" />
        </svg>
      );
    case "pin":
      return (
        <svg {...p}>
          <path d="M12 21s6.5-6.3 6.5-11a6.5 6.5 0 0 0-13 0c0 4.700 6.500 11 6.500 11Z" />
          <circle cx="12" cy="10" r="2.3" />
        </svg>
      );
  }
}
