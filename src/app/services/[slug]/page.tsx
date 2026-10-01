import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DoctorPortrait from "@/components/ui/DoctorPortrait";
import JsonLd from "@/components/ui/JsonLd";
import ImageReveal from "@/components/motion/ImageReveal";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import GrowLine from "@/components/motion/GrowLine";
import { SPECIALITIES, doctorByName, specialityBySlug } from "@/lib/data";
import { specialitySchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return SPECIALITIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = specialityBySlug(slug);
  if (!s) return {};
  return {
    title: `${s.keyword} — ${s.name}`,
    description: `${s.name} at BBSM Nursing Home, hospital in Raebareli: ${s.conditions.slice(0, 4).join(", ").toLowerCase()}. ${s.doctors.join(", ")} · ${s.timing}. Call ${SITE.phone}.`,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.name} in Raebareli | BBSM Nursing Home`, url: `/services/${s.slug}`, images: s.image ? [s.image] : undefined },
  };
}

export default async function SpecialityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = specialityBySlug(slug);
  if (!s) notFound();
  const docs = s.doctors.map(doctorByName).filter((d) => !!d);
  const idx = SPECIALITIES.indexOf(s);
  const next = SPECIALITIES[(idx + 1) % SPECIALITIES.length];
  const monthly = s.timing.startsWith("Last");

  return (
    <>
      <JsonLd data={specialitySchema(s)} />
      <section className="bg-ink px-[clamp(20px,4vw,64px)] pb-[clamp(60px,9vh,110px)] pt-[clamp(56px,9vh,110px)] text-white">
        <div className="wrap-inner">
          <div className="a-fade">
            <Breadcrumbs dark items={[{ href: "/services", label: "Specialities" }, { href: `/services/${s.slug}`, label: s.name }]} />
          </div>
          <div className="mt-12 grid items-end gap-[clamp(28px,5vw,84px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
            <div>
              <div className="a-fade eyebrow" style={{ animationDelay: ".15s" }}>{s.keyword}</div>
              <SplitText as="h1" trigger="mount" delay={0.2} parts={[s.name]} className="t-h1 mt-6 max-w-[14ch]" />
              <p className="a-rise body-lg mt-8 max-w-[52ch] text-white/78" style={{ animationDelay: ".55s" }}>{s.intro}</p>
              <div className="a-rise mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11.5px] font-medium uppercase tracking-[0.15em]" style={{ animationDelay: ".7s" }}>
                <span className={monthly ? "text-red" : "text-white"}>{monthly ? "Super Speciality OPD · Last Sunday · 9 AM – 12 PM" : s.timing.includes("Visiting") ? "Daily visiting consultant" : "Daily OPD · 10 AM – 4 PM"}</span>
                <span className="text-white/55">{s.doctors.join(", ")}</span>
              </div>
              <div className="a-rise mt-10 flex flex-wrap gap-3.5" style={{ animationDelay: ".8s" }}>
                <a href={SITE.phoneHref} className="btn btn-red-dark">
                  Book an Appointment <span className="arr">→</span>
                </a>
                <a href={SITE.phoneHref} className="btn btn-ghost-dark">{SITE.phone}</a>
              </div>
            </div>
            {s.image && (
              <ImageReveal src={s.image} alt={s.imageAlt} mount preload parallax={40} sizes="(min-width: 900px) 46vw, 100vw" className="h-[clamp(300px,56vh,600px)]" delay={0.2} objectPosition={s.imagePosition} />
            )}
          </div>
        </div>
      </section>

      <section className="bg-paper px-[clamp(20px,4vw,64px)] py-[clamp(70px,11vh,140px)]">
        <div className="wrap-inner grid gap-[clamp(40px,6vw,100px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]">
          <div>
            <SplitText parts={["What we treat"]} className="t-h2 m-0" />
            <ul className="m-0 mt-10 list-none p-0">
              {s.conditions.map((c, i) => (
                <Reveal as="li" key={c} delay={i * 0.05} y={12} className="flex items-baseline gap-5 border-t border-ink/12 py-[18px] text-[clamp(17px,1.4vw,21px)] font-light">
                  <span className="h-1.5 w-1.5 shrink-0 translate-y-[-3px] bg-red" />
                  {c}
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <SplitText parts={["When to see a specialist"]} className="t-h2 m-0 max-w-[14ch]" />
            <div className="mt-10 flex gap-[26px]">
              <GrowLine className="w-[2px] shrink-0 bg-blue" />
              <ol className="m-0 flex list-none flex-col gap-6 p-0">
                {s.whenToVisit.map((w, i) => (
                  <Reveal as="li" key={w} delay={0.1 + i * 0.08} className="body text-ink/86">
                    <span className="mr-3 font-serif text-[22px] text-blue">{i + 1}.</span>
                    {w}
                  </Reveal>
                ))}
              </ol>
            </div>
            <Reveal delay={0.4}>
              <p className="r-card mt-10 border border-red/25 bg-red/[.04] px-5 py-4 text-[14px] leading-relaxed text-ink/75">
                For sudden severe pain, heavy bleeding, breathlessness or loss of consciousness, call our 24×7 emergency line{" "}
                <a href={SITE.emergencyHref} className="font-semibold text-red">{SITE.emergency}</a>.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-mist px-[clamp(20px,4vw,64px)] py-[clamp(70px,11vh,140px)]">
        <div className="wrap-inner">
          <SplitText parts={[docs.length > 1 ? "Your specialists" : "Your specialist"]} className="t-h2 m-0" />
          <div className="mt-12 grid gap-[clamp(20px,3vw,48px)] [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]">
            {docs.map((d, i) => (
              <Reveal key={d!.slug} delay={i * 0.1}>
                <Link href={`/doctors/${d!.slug}`} className="group block text-ink hover:text-ink">
                  <div className="r-img">
                    <div className="transition-transform duration-[1.2s] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.03]">
                      <DoctorPortrait doctor={d!} className="aspect-[4/5]" sizes="(min-width: 900px) 30vw, 100vw" />
                    </div>
                  </div>
                  <div className="mt-5 font-serif text-[30px] leading-[1.05] transition-colors group-hover:text-red">{d!.name}</div>
                  <div className="mt-2 text-[12px] font-medium uppercase tracking-[0.14em] text-red">{d!.title}</div>
                  <div className="mt-2 text-[13.5px] font-light text-ink/65">{d!.availability.replace(" | ", " · ")}</div>
                  {d!.institution && <div className="mt-1 text-[13px] font-light text-ink/55">{d!.institution}</div>}
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="mt-14 text-[13px] tracking-[0.04em] text-ink/60">
            Available at BBSM Nursing Home, Raebareli — {SITE.phone}
          </p>
        </div>
      </section>

      <section className="bg-paper px-[clamp(20px,4vw,64px)] py-[clamp(60px,9vh,110px)]">
        <div className="wrap-inner flex flex-wrap items-end justify-between gap-10">
          <Reveal>
            <Link href="/services" className="link-u">All specialities <span className="arr">→</span></Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href={`/services/${next.slug}`} className="group block text-right text-ink hover:text-ink">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/50">Next speciality</span>
              <span className="mt-2 block font-serif leading-none transition-colors group-hover:text-red" style={{ fontSize: "clamp(30px,3.6vw,52px)" }}>
                {next.name} <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">→</span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
