import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
import ImageReveal from "@/components/motion/ImageReveal";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import CountUp from "@/components/motion/CountUp";
import FounderQuote from "@/components/about/FounderQuote";
import { STATS } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "About BBSM | Raebareli's First Hospital Since 1981 | Brij Bhushan Singh Memorial Nursing Home" },
  description:
    "BBSM Nursing Home — Raebareli's first nursing home and hospital, founded in 1981 by Late Dr. Virendra Singh. 49 years of service to Raebareli and surrounding districts. 9 family doctors carrying the legacy forward.",
  keywords: ["hospital in Raebareli history", "Raebareli first nursing home", "BBSM about", "Dr Virendra Singh founder"],
  alternates: { canonical: "/about" },
};

const CHAPTERS = [
  {
    k: "The Beginning — 1972",
    t: "In 1972, a young Civil Surgeon named Dr. Virendra Singh came to Raebareli. He found a city where families had no nursing home. In 1981, he established the city's first ever hospital — Brij Bhushan Singh Memorial Nursing Home — Raebareli's very first nursing home. He turned no one away.",
  },
  {
    k: "49 Years of Uninterrupted Service",
    t: "49 unbroken years. At 76 years of age, still performing surgeries. He believed “A Doctor Never Retires.” On 18th August 2021 he saw his last patient. On the evening of 19th August 2021, he left us.",
  },
  {
    k: "A Legacy of Nine",
    t: "Dr. Virendra Singh left behind 9 doctors from his own family — each carrying his values. Medicine was never just his career. It was his family's calling.",
  },
  {
    k: "Who We Are Today",
    t: "BBSM Nursing Home — now Dr. Virendra Singh Advance Surgical Centre. 11 specialists, daily OPD, monthly Super Speciality OPD with doctors from Rajiv Gandhi Cancer Institute, New Delhi.",
  },
];

const TIMELINE = [
  { y: "1972", t: "Dr. Virendra Singh arrives in Raebareli as Civil Surgeon." },
  { y: "1981", t: "Brij Bhushan Singh Memorial Nursing Home opens — the city's first." },
  { y: "2021", t: "18 August: his last patient. 19 August: he leaves us, still serving." },
  { y: "Today", t: "Dr. Virendra Singh Advance Surgical Centre — 11 specialists, one address." },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        bg="bg-mist"
        eyebrow="About BBSM"
        title="Healthcare Built Around People — Raebareli's First Nursing Home"
        maxCh={17}
        crumbs={[{ href: "/about", label: "About" }]}
      />
      <section className="bg-mist px-[clamp(20px,4vw,64px)]">
        <div className="wrap-inner">
          <ImageReveal
            src="/images/exterior-street.jpg"
            alt="BBSM Nursing Home — Brij Bhushan Singh Memorial Nursing Home building, Jail Garden Road, Raebareli"
            preload
            mount
            parallax={70}
            sizes="100vw"
            className="h-[clamp(300px,58vh,620px)]"
            objectPosition="50% 55%"
          />
        </div>
      </section>

      {/* Founder quote — written word by word on scroll */}
      <div className="bg-mist pt-[clamp(48px,8vh,96px)]">
        <section aria-label="Founder's quote" className="bg-blue-deep px-5 py-16 md:px-[clamp(64px,8.4vw,160px)] md:py-24">
          <noscript>
            <style>{`.fq-word,.fq-fade{opacity:1!important}.fq-line{width:120px!important}`}</style>
          </noscript>
          <FounderQuote />
        </section>
      </div>

      <section className="bg-mist px-[clamp(20px,4vw,64px)] py-[clamp(70px,11vh,140px)]">
        <div className="wrap-inner grid gap-[clamp(28px,4vw,72px)] [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          {CHAPTERS.map((c, i) => (
            <Reveal key={c.k} delay={i * 0.1}>
              <div className="border-b border-ink/14 pb-4 text-[11.5px] font-medium uppercase tracking-[0.2em] text-red">{c.k}</div>
              <p className="body mt-[22px] text-ink/86 !leading-[1.75]">{c.t}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline — the one new composition on this page */}
      <section className="bg-ink px-[clamp(20px,4vw,64px)] py-[clamp(80px,13vh,160px)] text-white">
        <div className="wrap-inner">
          <SplitText parts={["Four decades,", { t: "one address.", className: "text-red" }]} className="t-h2 m-0 max-w-[16ch]" />
          <ol className="mt-[clamp(44px,7vh,84px)] grid gap-px bg-white/10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
            {TIMELINE.map((t, i) => (
              <Reveal as="li" key={t.y} delay={i * 0.12} className="bg-ink px-[26px] pb-10 pt-8">
                <div className="font-serif leading-none text-white" style={{ fontSize: "clamp(44px,4.6vw,72px)" }}>{t.y}</div>
                <p className="mt-5 max-w-[30ch] text-[15px] font-light leading-relaxed text-white/68">{t.t}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper px-[clamp(20px,4vw,64px)] py-[clamp(60px,10vh,120px)]">
        <div className="wrap-inner grid gap-px bg-ink/12 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          <Reveal className="bg-paper px-[26px] py-8">
            <div className="font-serif leading-[1.05] text-red" style={{ fontSize: "clamp(30px,3vw,44px)" }}>
              Raebareli&apos;s First Hospital
            </div>
          </Reveal>
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={(i + 1) * 0.08} className="bg-paper px-[26px] py-8">
              <div className="font-serif leading-none text-blue" style={{ fontSize: "clamp(40px,4vw,64px)" }}>
                <CountUp to={s.n} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-[11.5px] font-medium uppercase tracking-[0.16em] text-ink/60">{s.label}</div>
            </Reveal>
          ))}
        </div>
        <div className="wrap-inner mt-16 flex flex-wrap gap-x-10 gap-y-5">
          <Link href="/founder" className="link-u">Read the Founder&apos;s Tribute <span className="arr">→</span></Link>
          <Link href="/doctors" className="link-u">Meet our 11 doctors <span className="arr">→</span></Link>
        </div>
      </section>
    </>
  );
}
