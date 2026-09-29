import PageIntro from "./PageIntro";

export default function LegalPage({ title, slug, sections }: { title: string; slug: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageIntro eyebrow="BBSM Nursing Home" title={title} crumbs={[{ href: `/${slug}`, label: title }]} />
      <section className="bg-paper px-[clamp(20px,4vw,64px)] pb-[clamp(70px,11vh,140px)]">
        <div className="wrap-inner max-w-[760px]">
          {sections.map((s) => (
            <div key={s.h} className="border-t border-ink/12 py-8">
              <h2 className="m-0 font-serif text-[28px] font-normal">{s.h}</h2>
              <p className="body mt-4 text-ink/80">{s.p}</p>
            </div>
          ))}
          <p className="mt-6 text-[13px] text-ink/50">Last updated: September 2026</p>
        </div>
      </section>
    </>
  );
}
