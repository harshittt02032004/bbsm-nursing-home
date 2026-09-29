import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageIntro from "@/components/ui/PageIntro";
import Reveal from "@/components/motion/Reveal";
import { SPECIALITIES } from "@/lib/data";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Medical Services | Hospital in Raebareli | BBSM Nursing Home" },
  description:
    "Complete medical and surgical services at BBSM Nursing Home, Raebareli. Orthopaedics, ophthalmology, oncology, IVF, urology, chest medicine, neurology, laparoscopic surgery, and general medicine.",
  keywords: ["hospital services Raebareli", "medical treatment Raebareli", "surgery Raebareli", "orthopaedics Raebareli", "eye care Raebareli"],
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Specialities"
        title="Complete Medical Care — Raebareli's Most Trusted Hospital"
        sub="Nine specialities, eleven doctors, one address on Jail Garden Road. Daily OPD, daily visiting consultants, and a monthly Super Speciality OPD with Delhi specialists."
        maxCh={18}
        crumbs={[{ href: "/services", label: "Specialities" }]}
      />
      <section className="bg-paper px-[clamp(20px,4vw,64px)] pb-[clamp(80px,13vh,160px)]">
        <ul className="wrap-inner m-0 list-none border-t border-ink/13 p-0">
          {SPECIALITIES.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 0.03} y={18}>
              <Link
                href={`/services/${s.slug}`}
                className="group relative grid items-center gap-x-[clamp(16px,3vw,48px)] gap-y-3 border-b border-ink/13 py-[clamp(22px,3.4vh,34px)] text-ink hover:text-ink md:grid-cols-[60px_1.3fr_1fr_140px_auto]"
              >
                <span className="text-[11px] font-medium tracking-[0.14em] text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif leading-[1.05] transition-colors duration-500 group-hover:text-red" style={{ fontSize: "clamp(28px,3vw,44px)" }}>
                  {s.name}
                </span>
                <span className="text-[14px] font-light leading-relaxed text-ink/65">{s.doctors.join(", ")}</span>
                <span className={`text-[11px] font-medium uppercase tracking-[0.14em] ${s.timing.startsWith("Last") ? "text-red" : "text-blue"}`}>{s.timing}</span>
                <span className="r-thumb relative hidden h-[84px] w-[120px] md:block">
                  {s.image && (
                    <Image src={s.image} alt="" fill sizes="120px" className="scale-110 object-cover opacity-0 transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-100 group-hover:opacity-100" />
                  )}
                  <span className="absolute inset-0 grid place-items-center text-[22px] text-ink/40 transition-opacity duration-500 group-hover:opacity-0">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
        <p className="wrap-inner mt-8 text-[13px] tracking-[0.04em] text-ink/55">Every speciality is available at BBSM Nursing Home, Raebareli — {SITE.phone}</p>
      </section>
    </>
  );
}
