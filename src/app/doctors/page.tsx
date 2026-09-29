import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
import DoctorPortrait from "@/components/ui/DoctorPortrait";
import Reveal from "@/components/motion/Reveal";
import GrowLine from "@/components/motion/GrowLine";
import SplitText from "@/components/motion/SplitText";
import JsonLd from "@/components/ui/JsonLd";
import { DOCTORS, GROUPS, TIMINGS } from "@/lib/data";
import { SITE } from "@/lib/site";
import { physicianSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Our Doctors | Best Specialists in Raebareli | BBSM Hospital" },
  description:
    "11 specialist doctors at BBSM Nursing Home — Raebareli's most experienced hospital team. Daily OPD for orthopaedics and eye care. Monthly Super Speciality OPD with oncologists and IVF specialists from New Delhi.",
  keywords: ["doctors in Raebareli", "specialist hospital Raebareli", "orthopaedic Raebareli", "eye doctor Raebareli", "cancer doctor Raebareli"],
  alternates: { canonical: "/doctors" },
};

const groupId = (k: string) => (k === "Daily OPD" ? "daily-opd" : k === "Super Speciality" ? "super-speciality" : "visiting");

export default function DoctorsPage() {
  return (
    <>
      <JsonLd data={DOCTORS.map(physicianSchema)} />
      <PageIntro
        eyebrow="Our Doctors"
        title="Meet Raebareli's Most Experienced Medical Team"
        sub="11 experienced doctors. Every speciality. Every day."
        crumbs={[{ href: "/doctors", label: "Doctors" }]}
      >
        <Reveal delay={0.6} className="mt-10 flex flex-wrap gap-3">
          {GROUPS.map((g) => (
            <a key={g.key} href={`#${groupId(g.key)}`} className="btn btn-ghost !px-5 !py-3.5 !text-[11.5px]">
              {g.title}
            </a>
          ))}
          <a href="#timings" className="btn btn-ghost !px-5 !py-3.5 !text-[11.5px]">
            OPD Timings
          </a>
        </Reveal>
      </PageIntro>

      <section className="bg-paper px-[clamp(20px,4vw,64px)] pb-[clamp(60px,9vh,110px)]">
        <div className="wrap-inner">
          {GROUPS.map((g) => (
            <div key={g.key} id={groupId(g.key)} className="scroll-mt-28 pt-[clamp(40px,6vh,80px)]">
              <div className="relative flex flex-wrap items-baseline gap-x-7 gap-y-3 pb-[22px]">
                <SplitText parts={[g.title]} className="m-0 font-serif font-normal leading-none" style={{ fontSize: "clamp(26px,3vw,42px)" }} />
                <span className="text-[11.5px] font-medium uppercase tracking-[0.18em]" style={{ color: g.accent }}>{g.timing}</span>
                <GrowLine axis="x" color={g.accent} className="absolute inset-x-0 bottom-0 h-[2px]" />
              </div>
              <Reveal>
                <p className="mt-[18px] max-w-[70ch] text-[15.5px] font-light leading-[1.7] text-ink/70">{g.note}</p>
              </Reveal>
              {DOCTORS.filter((d) => d.group === g.key).map((d) => (
                <article key={d.slug} className="grid gap-[clamp(20px,3vw,56px)] border-b border-ink/11 py-[clamp(30px,5vh,56px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
                  <Reveal>
                    <Link href={`/doctors/${d.slug}`} aria-label={`${d.name} — profile`} className="group block overflow-hidden">
                      <div className="transition-transform duration-[1.2s] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.03]">
                        <DoctorPortrait doctor={d} className="h-[clamp(240px,38vh,400px)]" />
                      </div>
                    </Link>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h3 className="m-0 font-serif font-normal leading-[1.05] tracking-[-0.015em]" style={{ fontSize: "clamp(28px,3.2vw,46px)" }}>
                      <Link href={`/doctors/${d.slug}`} className="text-ink hover:text-blue">{d.name}</Link>
                    </h3>
                    <div className="mt-3 text-[12.5px] font-medium uppercase tracking-[0.14em] text-red">{d.role}</div>
                    <div className="mt-5 flex flex-wrap gap-x-[26px] gap-y-2 text-[13px] tracking-[0.03em] text-ink/68">
                      <span>{d.availability}</span>
                      {d.institution && <span>{d.institution}</span>}
                    </div>
                    <p className="body mt-5 max-w-[62ch] text-ink/86">{d.expertise}</p>
                    <div className="mt-5 max-w-[62ch] text-[14px] leading-[1.65] text-ink/72">
                      <span className="font-semibold">Consult for: </span>
                      {d.forWhat}
                    </div>
                    <div className="mt-4 text-[12.5px] tracking-[0.04em] text-ink/50">Available at BBSM Nursing Home, Raebareli — {SITE.phone}</div>
                    {d.legacy && (
                      <div className="mt-[18px] border-l-2 border-blue pl-4 font-serif text-[19px] italic text-blue">Daughter of Late Dr. Virendra Singh — continuing his legacy</div>
                    )}
                    <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
                      <Link href={`/doctors/${d.slug}`} className="link-u">Full profile <span className="arr">→</span></Link>
                      <a href={SITE.phoneHref} className="link-u !text-blue">Book appointment <span className="arr">→</span></a>
                    </div>
                  </Reveal>
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="timings" className="scroll-mt-24 bg-mist px-[clamp(20px,4vw,64px)] py-[clamp(60px,10vh,120px)]">
        <div className="wrap-inner">
          <SplitText parts={["OPD Timings"]} className="m-0 mb-[30px] font-serif font-normal leading-none" style={{ fontSize: "clamp(26px,3vw,42px)" }} />
          <div role="table" aria-label="OPD timings at BBSM Nursing Home">
            <div role="row" className="hidden grid-cols-4 gap-2.5 border-b border-ink/18 pb-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/55 sm:grid">
              <span role="columnheader">Doctor</span>
              <span role="columnheader">Speciality</span>
              <span role="columnheader">Days</span>
              <span role="columnheader">Timing</span>
            </div>
            {TIMINGS.map(([name, spec, days, time, sup], i) => (
              <Reveal
                key={name}
                delay={i * 0.03}
                y={10}
                role="row"
                className={`grid grid-cols-2 items-baseline gap-2.5 border-b border-ink/9 py-4 text-[clamp(13.5px,1vw,15.5px)] sm:grid-cols-4 ${sup ? "text-red" : "text-ink"}`}
              >
                <span role="cell" className="col-span-2 font-medium sm:col-span-1">{name}</span>
                <span role="cell" className="col-span-2 opacity-78 sm:col-span-1">{spec}</span>
                <span role="cell" className="opacity-78">{days}</span>
                <span role="cell" className="opacity-78">{time}</span>
              </Reveal>
            ))}
          </div>
          <p className="mt-[22px] text-[12.5px] tracking-[0.05em] text-ink/55">Red rows — Super Speciality OPD, last Sunday of the month only. Call {SITE.phone} to register.</p>
        </div>
      </section>
    </>
  );
}
