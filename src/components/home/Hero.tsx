import Image from "next/image";
import SplitText from "@/components/motion/SplitText";
import Parallax from "@/components/motion/Parallax";
import { SITE } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0B2E4E] lg:min-h-[calc(100svh-118px)]">
      <div className="absolute inset-0 -z-20" style={{ background: "linear-gradient(122deg,#07518B 0%,#063B68 44%,#0B2233 100%)" }} />
      <div className="texture-lines absolute inset-0 -z-10" />

      {/* Mobile: the building is the backdrop */}
      <div className="a-fade absolute inset-0 -z-10 lg:hidden" style={{ animationDuration: "1.4s" }}>
        <Image
          src="/images/exterior-hero.jpg"
          alt="BBSM Nursing Home — Brij Bhushan Singh Memorial Nursing Home on Jail Garden Road, Raebareli"
          fill
          preload
          sizes="(max-width: 1023px) 100vw, 1px"
          className="object-cover object-[50%_30%]"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(6,34,51,.25) 0%, rgba(6,40,70,.72) 42%, rgba(8,30,48,.96) 78%)" }} />
      </div>

      <div className="wrap relative grid min-h-[calc(100svh-118px)] items-end gap-[clamp(24px,4vw,64px)] pb-[clamp(40px,7vh,90px)] pt-[clamp(48px,9vh,130px)] lg:grid-cols-2 lg:min-h-0">
        <div className="flex flex-col justify-end gap-[clamp(20px,2.6vh,34px)] pt-[14vh] lg:pt-0">
          <div className="a-fade" style={{ animationDelay: "0.9s" }}>
            <div className="flex items-center gap-3.5">
              <span className="a-rule h-[2px] w-[34px] shrink-0 bg-red" style={{ animationDelay: "1s" }} />
              <span className="font-serif text-[clamp(20px,2vw,28px)] italic leading-none text-white">40+ years of trust</span>
            </div>
            <div className="meta mt-2 text-white/55" style={{ fontSize: 11, letterSpacing: ".16em" }}>
              Raebareli&apos;s First Nursing Home — Est. 1981
            </div>
          </div>

          <div className="a-fade text-[12px] font-medium uppercase tracking-[0.26em] text-white/72" style={{ animationDelay: "0.12s" }}>
            BBSM Nursing Home — Raebareli
          </div>

          <SplitText as="h1" trigger="mount" delay={0.26} stagger={0.09} parts={["Care You Can Trust."]} className="t-display m-0 max-w-[16ch] text-white" />

          <h2 className="a-rise m-0 max-w-[44ch] text-[clamp(17px,1.5vw,22px)] font-normal leading-[1.5] text-white/80" style={{ animationDelay: "0.55s" }}>
            Raebareli&apos;s Most Trusted Hospital — Since 1981. Experienced medical care with a human approach, for every family in Raebareli and beyond.
          </h2>

          <div className="a-rise flex flex-wrap items-center gap-4" style={{ animationDelay: "0.7s" }}>
            <a href={SITE.phoneHref} className="btn btn-red-dark">
              Book an Appointment <span className="arr">→</span>
            </a>
            <a href="#story" className="btn btn-ghost-dark">
              Explore BBSM
            </a>
          </div>

          <div
            className="a-fade flex flex-wrap gap-x-[26px] gap-y-2.5 border-t border-white/16 pt-[clamp(14px,2vh,26px)] text-[11.5px] font-medium uppercase tracking-[0.17em] text-white/60"
            style={{ animationDelay: "0.85s" }}
          >
            <span>Raebareli&apos;s First Nursing Home</span>
            <span className="text-white/30">/</span>
            <span>Est. 1981</span>
            <span className="text-white/30">/</span>
            <span>Best Hospital in Raebareli</span>
          </div>
        </div>

        {/* Desktop figure */}
        <figure className="a-clip r-img relative m-0 hidden min-h-[clamp(300px,58vh,680px)] self-stretch lg:block" style={{ animationDelay: "0.35s" }}>
          <Parallax amount={60} className="absolute inset-[-60px_0]">
            <div className="a-settle relative h-full w-full" style={{ animationDelay: "0.35s" }}>
              <Image
                src="/images/exterior-hero.jpg"
                alt="BBSM Nursing Home — Brij Bhushan Singh Memorial Nursing Home, Dr. Virendra Singh Advance Surgical Centre, Raebareli"
                fill
                preload
                sizes="(min-width: 1024px) 46vw, 1px"
                className="object-cover object-[50%_42%]"
              />
            </div>
          </Parallax>
          <figcaption
            className="absolute inset-x-0 bottom-0 px-[22px] py-5 text-[11px] font-medium uppercase tracking-[0.17em] text-white/88"
            style={{ background: "linear-gradient(to top, rgba(6,34,51,.85), rgba(6,34,51,0))" }}
          >
            BBSM Nursing Home · Jail Garden Road, Raebareli
          </figcaption>
        </figure>
      </div>

      {/* Scroll cue */}
      <div className="a-fade pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex" style={{ animationDelay: "1.4s" }}>
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/45">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/15">
          <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-white/70" />
        </span>
      </div>
    </section>
  );
}
