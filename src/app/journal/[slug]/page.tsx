import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/ui/JsonLd";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import { ARTICLES, articleBySlug } from "@/lib/journal";
import { specialityBySlug } from "@/lib/data";
import { SITE, SITE_URL } from "@/lib/site";
import { HOSPITAL_ID } from "@/lib/schema";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: `${a.excerpt} Health Journal from BBSM Nursing Home, hospital in Raebareli.`,
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: { type: "article", title: a.title, url: `/journal/${a.slug}`, images: [a.image] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();
  const spec = specialityBySlug(a.related);
  const others = ARTICLES.filter((x) => x.slug !== a.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          headline: a.title,
          description: a.excerpt,
          image: `${SITE_URL}${a.image}`,
          url: `${SITE_URL}/journal/${a.slug}`,
          publisher: { "@id": HOSPITAL_ID },
          audience: "https://schema.org/Patient",
          inLanguage: "en-IN",
        }}
      />
      <article>
        <header className="bg-paper px-[clamp(20px,4vw,64px)] pb-12 pt-[32px] md:pt-[clamp(56px,9vh,110px)]">
          <div className="mx-auto max-w-[980px]">
            <div className="a-fade">
              <Breadcrumbs items={[{ href: "/#journal", label: "Health Journal" }, { href: `/journal/${a.slug}`, label: a.category }]} />
            </div>
            <div className="a-fade mt-10 text-[11px] font-medium uppercase tracking-[0.17em] text-red" style={{ animationDelay: ".1s" }}>
              {a.category} · {a.minutes} min read
            </div>
            <SplitText as="h1" trigger="mount" delay={0.15} stagger={0.035} parts={[a.title]} className="m-0 mt-5 font-serif font-normal leading-[1.06] tracking-[-0.015em]" style={{ fontSize: "clamp(36px,5vw,72px)" }} />
            <p className="a-rise body-lg mt-7 max-w-[56ch] text-ink/70" style={{ animationDelay: ".5s" }}>{a.excerpt}</p>
          </div>
        </header>
        <div className="a-clip relative mx-auto h-[clamp(280px,56vh,600px)] max-w-[1560px] px-[clamp(20px,4vw,64px)]" style={{ animationDelay: ".3s" }}>
          <div className="r-img relative h-full w-full">
            <Image src={a.image} alt={a.imageAlt} fill preload sizes="100vw" className="a-settle object-cover" style={{ animationDelay: ".3s" }} />
          </div>
        </div>
        <div className="bg-paper px-[clamp(20px,4vw,64px)] py-[32px] md:py-[clamp(60px,10vh,120px)]">
          <div className="mx-auto max-w-[720px]">
            {a.sections.map((s, i) => (
              <Reveal key={i} className="mb-10">
                {s.heading && <h2 className="m-0 mb-5 font-serif font-normal leading-[1.15] text-ink" style={{ fontSize: "clamp(26px,2.6vw,36px)" }}>{s.heading}</h2>}
                {s.paras?.map((p) => (
                  <p key={p.slice(0, 20)} className="m-0 mb-5 text-[clamp(16.5px,1.2vw,19px)] font-light leading-[1.8] text-ink/86">{p}</p>
                ))}
                {s.list && (
                  <ul className="m-0 list-none p-0">
                    {s.list.map((l) => (
                      <li key={l} className="flex gap-4 border-t border-ink/10 py-3.5 text-[clamp(16px,1.15vw,18px)] font-light leading-relaxed text-ink/86">
                        <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-red" />
                        {l}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
            <Reveal>
              <div className="r-card mt-14 border-l-2 border-blue bg-mist px-6 py-6">
                <p className="m-0 text-[14.5px] leading-relaxed text-ink/75">
                  This article is general health information and not a substitute for a consultation. For advice about your own health, call BBSM Nursing Home on{" "}
                  <a href={SITE.phoneHref} className="font-semibold">{SITE.phone}</a>.
                </p>
                {spec && (
                  <Link href={`/services/${spec.slug}`} className="link-u mt-5">
                    {spec.name} at BBSM <span className="arr">→</span>
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </article>
      <section className="bg-mist px-[clamp(20px,4vw,64px)] py-[32px] md:py-[clamp(60px,9vh,110px)]">
        <div className="wrap-inner">
          <div className="eyebrow">Keep reading</div>
          <div className="mt-8 grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
            {others.map((o) => (
              <Link key={o.slug} href={`/journal/${o.slug}`} className="group grid items-center gap-5 text-ink hover:text-ink sm:grid-cols-[180px_1fr]">
                <div className="r-card relative h-[130px]">
                  <Image src={o.image} alt={o.imageAlt} fill sizes="180px" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.06]" />
                </div>
                <div>
                  <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-red">{o.category} · {o.minutes} min</div>
                  <div className="mt-2 font-serif text-[24px] leading-[1.2] transition-colors group-hover:text-blue">{o.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
