import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import GrowLine from "@/components/motion/GrowLine";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/ui/JsonLd";
import { SITE_URL } from "@/lib/site";
import { HOSPITAL_ID } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Late Dr. Virendra Singh | Founder of Raebareli's First Hospital | BBSM Nursing Home" },
  description:
    "Tribute to Late Dr. Virendra Singh — Civil Surgeon who founded Raebareli's first nursing home in 1981. Served the people of Raebareli for 49 years. He believed: A Doctor Never Retires.",
  keywords: ["Dr Virendra Singh Raebareli", "BBSM founder", "Raebareli first hospital founder", "Dr Virendra Singh tribute 19 August"],
  alternates: { canonical: "/founder" },
};

const CHAPTERS = [
  {
    h: "The Man Behind the Mission",
    p: "Dr. Virendra Singh arrived in Raebareli when this city had no nursing home. In 1981, he built Brij Bhushan Singh Memorial Nursing Home — the city's first. Named in honour of his family. He turned no one away.",
  },
  {
    h: "A Doctor Who Never Slowed Down",
    p: "49 unbroken years of service. At 76 years of age, still performing surgeries, still seeing patients. He believed: “A Doctor Never Retires.”",
  },
  {
    h: "His Final Days",
    p: "On 15th August 2021 — Independence Day — he returned to his clinic. On 18th August, he saw his last patient. On the evening of 19th August 2021, Dr. Virendra Singh left us. He left as a doctor — still working, still serving.",
  },
  {
    h: "What He Left Behind",
    p: "9 doctors from his own family carrying his values forward. His daughter, Dr. Shailaja Singh (Eye Specialist & Surgeon), continues his work in these very walls. Medicine was his family's calling.",
  },
];

export default function FounderPage() {
  return (
    <div className="-mt-[var(--header-h)] bg-tribute pt-[var(--header-h)] text-tribute-text">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Dr. Virendra Singh",
          alternateName: "डॉ. वीरेन्द्र सिंह",
          jobTitle: "Civil Surgeon",
          deathDate: "2021-08-19",
          description: "Founder of BBSM Nursing Home (Brij Bhushan Singh Memorial Nursing Home) — Raebareli's first nursing home, established 1981.",
          url: `${SITE_URL}/founder`,
          image: `${SITE_URL}/images/founder-portrait.jpg`,
          founder: { "@id": HOSPITAL_ID },
          worksFor: { "@id": HOSPITAL_ID },
        }}
      />

      <section className="border-b border-gold/25 px-[clamp(20px,4vw,64px)] pb-[clamp(70px,12vh,150px)] pt-[clamp(56px,9vh,110px)]">
        <div className="wrap-inner">
          <div className="a-fade">
            <Breadcrumbs dark items={[{ href: "/founder", label: "Founder's Tribute" }]} />
          </div>
          <div className="mt-12 grid items-end gap-[clamp(28px,5vw,84px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]">
            <div className="a-fade relative rounded-[calc(var(--radius-img)+10px)] border border-gold/50 bg-[#12181F] p-2.5" style={{ animationDuration: "2s", animationDelay: ".2s" }}>
              <div className="r-img relative aspect-[4/5]">
                <Image
                  src="/images/founder-portrait.jpg"
                  alt="Late Dr. Virendra Singh — Civil Surgeon and founder of BBSM Nursing Home, Raebareli"
                  fill
                  preload
                  sizes="(min-width: 900px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <div className="a-fade font-deva leading-[1.4] text-gold" style={{ fontSize: "clamp(24px,2.6vw,38px)", animationDelay: ".5s", animationDuration: "1.6s" }} lang="hi">
                डॉ. वीरेन्द्र सिंह
              </div>
              <SplitText as="h1" trigger="mount" delay={0.7} stagger={0.12} parts={["Dr. Virendra Singh"]} className="m-0 mt-4 font-serif font-normal leading-[.98] tracking-[-0.02em] text-tribute-text" style={{ fontSize: "clamp(44px,6.6vw,100px)" }} />
              <div className="a-fade mt-[26px] text-[12.5px] uppercase leading-[2] tracking-[0.15em] text-tribute-text/60" style={{ animationDelay: "1.1s" }}>
                Civil Surgeon · Founder, BBSM Nursing Home
                <br />
                Raebareli&apos;s First Nursing Home · Est. 1981
                <br />
                Dr. Virendra Singh Advance Surgical Centre
              </div>
              <div className="a-fade mt-[30px] flex items-center gap-[18px]" style={{ animationDelay: "1.35s" }}>
                <span className="a-rule h-px w-[52px] bg-gold" style={{ animationDelay: "1.4s" }} />
                <span className="font-serif italic text-gold" style={{ fontSize: "clamp(20px,2vw,28px)" }}>
                  19 August — <span className="font-deva not-italic" lang="hi">स्मृति शेष</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[clamp(20px,4vw,64px)] py-[clamp(70px,12vh,150px)]">
        <div className="mx-auto max-w-[1100px]">
          <SplitText
            as="p"
            stagger={0.07}
            parts={["In 1972, a doctor came to Raebareli.", { t: "He never left.", className: "text-gold" }]}
            className="m-0 font-serif font-normal italic leading-[1.14] tracking-[-0.01em] text-tribute-text"
            style={{ fontSize: "clamp(30px,4.4vw,62px)" }}
          />
          <div className="mt-[clamp(50px,8vh,100px)] flex gap-[clamp(20px,3vw,40px)]">
            <GrowLine color="rgba(201,168,76,.45)" className="w-px shrink-0" />
            <div className="flex flex-col gap-[clamp(40px,6vh,72px)]">
              {CHAPTERS.map((c, i) => (
                <Reveal key={c.h} delay={0.05} y={36} transition={{ duration: 1.4, ease: [0.16, 0.8, 0.28, 1] }}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-[15px] italic text-gold/60">{["I", "II", "III", "IV"][i]}</span>
                    <h2 className="m-0 text-[12px] font-medium uppercase tracking-[0.22em] text-gold">{c.h}</h2>
                  </div>
                  <p className="mt-[18px] max-w-[60ch] font-light leading-[1.8] text-tribute-text/82" style={{ fontSize: "clamp(16px,1.25vw,19px)", textWrap: "pretty" }}>
                    {c.p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="mt-[clamp(60px,10vh,120px)]">
            <blockquote className="m-0 border-y border-gold/25 py-[clamp(40px,7vh,80px)] text-center font-serif italic leading-[1.1] text-tribute-text" style={{ fontSize: "clamp(40px,6vw,88px)" }}>
              &ldquo;A Doctor Never Retires.&rdquo;
            </blockquote>
          </Reveal>

          <Reveal className="mt-[clamp(50px,8vh,90px)] text-center">
            <div className="font-deva leading-[1.7] text-gold" style={{ fontSize: "clamp(18px,2vw,26px)" }} lang="hi">
              डॉ. वीरेन्द्र सिंह को हमारी विनम्र श्रद्धांजलि
            </div>
            <div className="mt-4 text-[12.5px] uppercase tracking-[0.18em] text-tribute-text/55">The Family &amp; Team of BBSM Nursing Home, Raebareli</div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
