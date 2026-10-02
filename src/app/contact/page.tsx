import type { Metadata } from "next";
import PageIntro from "@/components/ui/PageIntro";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import JsonLd from "@/components/ui/JsonLd";
import MapEmbed from "@/components/ui/MapEmbed";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Contact BBSM | Hospital in Raebareli | +91 96166 06051" },
  description:
    "Contact BBSM Nursing Home — hospital in Raebareli. A 7/7, Jail Garden Road, Awas Vikas Colony, Indira Nagar, Raebareli UP 229001. Daily OPD 10 AM–4 PM. Super Speciality OPD last Sunday 9–12 PM.",
  keywords: ["hospital in Raebareli contact", "BBSM phone number", "nursing home Raebareli address", "book appointment Raebareli hospital"],
  alternates: { canonical: "/contact" },
};

const FAQ = [
  { q: "What are the OPD timings at BBSM Nursing Home?", a: "Daily OPD runs every day from 10:00 AM to 4:00 PM for orthopaedics and eye care. Visiting consultants see patients daily. The Super Speciality OPD runs on the last Sunday of every month, 9:00 AM to 12:00 PM." },
  { q: "How do I book an appointment?", a: `Call ${SITE.phone}. Our team will confirm the right doctor and timing for you. For the Super Speciality OPD, please call ahead to register.` },
  { q: "Is there an emergency service?", a: `Yes — for emergencies call ${SITE.emergency}, available 24 × 7.` },
  { q: "Which Delhi specialists visit BBSM?", a: "Every last Sunday, senior specialists including doctors from Rajiv Gandhi Cancer Institute & Research Centre, New Delhi consult at BBSM — oncology, gastro-onco surgery, urology, and IVF & gynaecology." },
  { q: "Where exactly is BBSM Nursing Home?", a: `${SITE.address.full}. It is on Jail Garden Road in Indira Nagar, Raebareli.` },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <PageIntro eyebrow="Find BBSM" title="Visit Raebareli's Most Trusted Hospital" crumbs={[{ href: "/contact", label: "Contact" }]} />

      <section className="bg-paper px-[clamp(20px,4vw,64px)] pb-[40px] md:pb-[clamp(70px,11vh,140px)]">
        <div className="wrap-inner grid items-stretch gap-[clamp(24px,4vw,64px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]">
          <Reveal className="min-h-[clamp(360px,58vh,620px)]">
            <MapEmbed />
          </Reveal>
          <div className="flex flex-col gap-[30px]">
            <Reveal className="border-b border-ink/13 pb-[26px]">
              <div className="text-[11.5px] font-medium uppercase tracking-[0.19em] text-red">Address</div>
              <address className="mt-3.5 not-italic font-light leading-[1.55]" style={{ fontSize: "clamp(17px,1.5vw,22px)" }}>
                {SITE.address.full}
              </address>
              <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                <a href={SITE.directionsUrl} target="_blank" rel="noopener" className="link-u">Get Directions <span className="arr">↗</span></a>
                <a href={SITE.mapsSearchUrl} target="_blank" rel="noopener" className="link-u !text-blue">Open in Google Maps <span className="arr">↗</span></a>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="border-b border-ink/13 pb-[26px]">
              <div className="text-[11.5px] font-medium uppercase tracking-[0.19em] text-red">Appointments</div>
              <a href={SITE.phoneHref} className="mt-3.5 inline-block font-serif text-blue hover:text-red" style={{ fontSize: "clamp(30px,3.4vw,48px)" }}>
                {SITE.phone}
              </a>
            </Reveal>
            <Reveal delay={0.12} className="border-b border-ink/13 pb-[26px]">
              <div className="flex items-center gap-2.5 text-[11.5px] font-medium uppercase tracking-[0.19em] text-red">
                <span className="relative flex h-2 w-2"><span className="pulse-dot absolute inset-0 rounded-full bg-red" /><span className="relative h-2 w-2 rounded-full bg-red" /></span>
                24 × 7 Emergency
              </div>
              <a href={SITE.emergencyHref} className="mt-3 inline-block font-serif text-ink hover:text-red" style={{ fontSize: "clamp(26px,2.8vw,40px)" }}>
                {SITE.emergency}
              </a>
            </Reveal>
            <Reveal delay={0.16} className="border-b border-ink/13 pb-[26px]">
              <div className="text-[11.5px] font-medium uppercase tracking-[0.19em] text-red">Daily OPD</div>
              <p className="mt-3 text-[18px] font-light leading-[1.6]">{SITE.hours.dailyOpd}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="text-[11.5px] font-medium uppercase tracking-[0.19em] text-red">Super Speciality OPD</div>
              <p className="mt-3 text-[18px] font-light leading-[1.6]">{SITE.hours.superOpd}</p>
              <p className="mt-2.5 text-[14.5px] font-light leading-[1.6] text-ink/65">Delhi specialists from Rajiv Gandhi Cancer Institute &amp; Research Centre. Call ahead to register.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-mist px-[clamp(20px,4vw,64px)] py-[40px] md:py-[clamp(70px,11vh,140px)]">
        <div className="wrap-inner grid gap-[clamp(28px,5vw,84px)] lg:grid-cols-[1fr_2fr]">
          <div>
            <SplitText parts={["Before you visit"]} className="t-h2 m-0" />
            <Reveal delay={0.2}>
              <a href={SITE.reviewsUrl} target="_blank" rel="noopener" className="link-u mt-8">
                Review us on Google <span className="arr">↗</span>
              </a>
            </Reveal>
          </div>
          <div>
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <details className="group border-t border-ink/13 py-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 font-serif leading-[1.2] text-ink transition-colors hover:text-blue" style={{ fontSize: "clamp(21px,2vw,28px)" }}>
                    {f.q}
                    <span className="shrink-0 font-sans text-[22px] font-light text-red transition-transform duration-500 group-open:rotate-45">+</span>
                  </summary>
                  <p className="body mt-4 max-w-[64ch] text-ink/78">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
