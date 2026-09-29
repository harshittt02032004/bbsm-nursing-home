import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DoctorPortrait from "@/components/ui/DoctorPortrait";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { DOCTORS, doctorBySlug, specialityBySlug } from "@/lib/data";
import { physicianSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return DOCTORS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = doctorBySlug(slug);
  if (!d) return {};
  const when = d.group === "Super Speciality" ? "last Sunday of every month, 9 AM–12 PM" : d.group === "Daily OPD" ? "every day, 10 AM–4 PM" : "every day (visiting)";
  return {
    title: `${d.name} — ${d.title} in Raebareli`,
    description: `${d.name}, ${d.title} at BBSM Nursing Home, Raebareli. Consult for ${d.forWhat.toLowerCase()}. Available ${when}. Call ${SITE.phone}.`,
    alternates: { canonical: `/doctors/${d.slug}` },
    openGraph: { title: `${d.name} — ${d.title} | BBSM Nursing Home Raebareli`, url: `/doctors/${d.slug}` },
  };
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = doctorBySlug(slug);
  if (!d) notFound();

  const idx = DOCTORS.indexOf(d);
  const next = DOCTORS[(idx + 1) % DOCTORS.length];
  const specs = d.specialities.map(specialityBySlug).filter(Boolean);
  const accent = d.group === "Super Speciality" ? "#C52030" : d.group === "Daily OPD" ? "#07518B" : "#111820";

  return (
    <>
      <JsonLd data={physicianSchema(d)} />
      <section className="bg-paper px-[clamp(20px,4vw,64px)] pb-[clamp(60px,10vh,120px)] pt-[clamp(56px,9vh,110px)]">
        <div className="wrap-inner">
          <div className="a-fade">
            <Breadcrumbs items={[{ href: "/doctors", label: "Doctors" }, { href: `/doctors/${d.slug}`, label: d.name }]} />
          </div>
          <div className="mt-12 grid items-end gap-[clamp(28px,5vw,84px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]">
            <div className="a-clip r-img" style={{ animationDelay: ".1s" }}>
              <DoctorPortrait doctor={d} preload className="h-[clamp(380px,66vh,720px)]" />
            </div>
            <div>
              <div className="a-fade text-[11.5px] font-medium uppercase tracking-[0.2em]" style={{ color: accent, animationDelay: ".2s" }}>
                {d.group === "Super Speciality" ? "Super Speciality OPD" : d.group === "Daily OPD" ? "Daily OPD" : "Daily Visiting Doctor"}
              </div>
              <SplitText as="h1" trigger="mount" delay={0.25} parts={[d.name]} className="t-h1 mt-5 !text-[clamp(42px,5.6vw,84px)]" />
              <p className="a-rise mt-5 text-[13px] font-medium uppercase tracking-[0.14em] text-red" style={{ animationDelay: ".5s" }}>{d.role}</p>
              <p className="a-rise body-lg mt-7 max-w-[54ch] text-ink/86" style={{ animationDelay: ".6s" }}>{d.expertise}</p>
              {d.legacy && (
                <p className="a-rise mt-6 border-l-2 border-blue pl-4 font-serif text-[20px] italic text-blue" style={{ animationDelay: ".7s" }}>
                  Daughter of Late Dr. Virendra Singh — continuing his legacy
                </p>
              )}
              <dl className="a-rise r-card mt-10 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2" style={{ animationDelay: ".75s" }}>
                {[
                  ["Availability", d.availability.replace(" | ", " · ")],
                  ["Where", "BBSM Nursing Home, Raebareli"],
                  ...(d.institution ? [["Institution", d.institution]] : []),
                  ["Appointments", SITE.phone],
                ].map(([k, v]) => (
                  <div key={k} className="bg-paper px-5 py-5">
                    <dt className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink/50">{k}</dt>
                    <dd className="m-0 mt-2 text-[15.5px] leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="a-rise mt-10 flex flex-wrap gap-3.5" style={{ animationDelay: ".85s" }}>
                <a href={SITE.phoneHref} className="btn btn-red">
                  Book an Appointment <span className="arr">→</span>
                </a>
                <a href={SITE.directionsUrl} target="_blank" rel="noopener" className="btn btn-ghost">
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist px-[clamp(20px,4vw,64px)] py-[clamp(70px,11vh,140px)]">
        <div className="wrap-inner grid gap-[clamp(28px,5vw,84px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]">
          <div>
            <SplitText parts={["Consult", d.name.split(" ").slice(0, 2).join(" "), "for"]} className="t-h2 m-0 max-w-[14ch]" />
          </div>
          <ul className="m-0 list-none p-0">
            {d.forWhat.split(",").map((f, i) => (
              <Reveal as="li" key={f} delay={i * 0.05} y={14} className="flex items-baseline gap-5 border-t border-ink/12 py-5 text-[clamp(18px,1.6vw,24px)] font-light">
                <span className="text-[11px] font-medium tracking-[0.14em] text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                <span className="first-letter:uppercase">{f.trim()}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper px-[clamp(20px,4vw,64px)] py-[clamp(60px,9vh,110px)]">
        <div className="wrap-inner flex flex-wrap items-end justify-between gap-10">
          {specs.length > 0 && (
            <Reveal>
              <div className="eyebrow">Speciality</div>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {specs.map((s) => (
                  <Link key={s!.slug} href={`/services/${s!.slug}`} className="link-u">
                    {s!.name} in Raebareli <span className="arr">→</span>
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
          <Reveal delay={0.1}>
            <Link href={`/doctors/${next.slug}`} className="group block text-right text-ink hover:text-ink">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/50">Next doctor</span>
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
