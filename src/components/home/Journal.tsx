import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import ImageReveal from "@/components/motion/ImageReveal";
import SplitText from "@/components/motion/SplitText";
import { ARTICLES } from "@/lib/journal";

export default function Journal() {
  const [feat, ...rest] = ARTICLES;
  return (
    <section id="journal" className="scroll-mt-28 bg-paper px-[clamp(20px,4vw,64px)] pb-[44px] md:pb-[clamp(80px,13vh,170px)]">
      <div className="wrap-inner">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink/13 pb-[34px]">
          <SplitText parts={["Health Journal"]} className="t-h2 m-0 !text-[clamp(30px,3.6vw,52px)] !leading-none" />
          <span className="meta text-ink/50">From BBSM Nursing Home, Raebareli</span>
        </div>
        <div className="mt-11 grid gap-[clamp(24px,4vw,64px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]">
          <Link href={`/journal/${feat.slug}`} className="group block text-ink hover:text-ink">
            <ImageReveal src={feat.image} alt={feat.imageAlt} sizes="(min-width: 900px) 46vw, 100vw" className="h-[clamp(300px,46vh,460px)]" imgClassName="transition-transform duration-[1.4s] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.04]" />
            <Reveal delay={0.1}>
              <div className="mt-[22px] text-[11px] font-medium uppercase tracking-[0.17em] text-red">
                {feat.category} · {feat.minutes} min
              </div>
              <h3 className="mt-3.5 max-w-[24ch] font-serif font-normal leading-[1.15] transition-colors group-hover:text-blue" style={{ fontSize: "clamp(24px,2.6vw,38px)" }}>
                {feat.title}
              </h3>
            </Reveal>
          </Link>
          <div className="flex flex-col justify-end gap-[clamp(24px,4vh,48px)]">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={0.1 + i * 0.1}>
                <Link href={`/journal/${a.slug}`} className="group grid items-center gap-5 text-ink hover:text-ink [grid-template-columns:repeat(auto-fit,minmax(min(100%,190px),1fr))]">
                  <div className="r-card relative h-[clamp(130px,18vh,170px)]">
                    <Image src={a.image} alt={a.imageAlt} fill sizes="(min-width: 900px) 22vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.06]" />
                  </div>
                  <div>
                    <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-red">
                      {a.category} · {a.minutes} min
                    </div>
                    <h3 className="mt-2.5 font-serif font-normal leading-[1.2] transition-colors group-hover:text-blue" style={{ fontSize: "clamp(19px,1.9vw,27px)" }}>
                      {a.title}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
