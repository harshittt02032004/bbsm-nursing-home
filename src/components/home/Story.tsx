import Link from "next/link";
import ImageReveal from "@/components/motion/ImageReveal";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import GrowLine from "@/components/motion/GrowLine";
import Placeholder from "@/components/ui/Placeholder";

export default function Story() {
  return (
    <section id="story" className="overflow-hidden bg-mist px-[clamp(20px,4vw,64px)] py-[clamp(80px,13vh,170px)]">
      <div className="wrap-inner grid items-start gap-[clamp(28px,5vw,86px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
        <div className="relative pb-14">
          <ImageReveal
            src="/images/exterior-front.jpg"
            alt="The BBSM Nursing Home building on Jail Garden Road, Raebareli — Raebareli's first nursing home, est. 1981"
            parallax={50}
            sizes="(min-width: 900px) 46vw, 100vw"
            className="h-[clamp(420px,72vh,760px)] ml-[clamp(-64px,-4vw,0px)]"
          />
          <Reveal delay={0.35} className="absolute bottom-0 right-[clamp(-40px,-3vw,0px)] w-[clamp(170px,30%,270px)] bg-paper p-2 shadow-[0_18px_46px_rgba(6,59,104,.16)]">
            <Placeholder label="Founder portrait" note="Late Dr. Virendra Singh" className="aspect-[4/5] !p-3" />
            <div className="px-0.5 pb-0.5 pt-2.5 text-[9.5px] font-medium uppercase tracking-[0.14em] text-blue">Late Dr. Virendra Singh · Founder</div>
          </Reveal>
        </div>

        <div className="pb-[70px] pt-[clamp(0px,4vh,60px)]">
          <Reveal>
            <div className="eyebrow">Our Story</div>
          </Reveal>
          <SplitText parts={["Healthcare built around people."]} className="t-h2 mt-[22px] text-ink" />
          <div className="mt-[34px] flex gap-[26px]">
            <GrowLine className="w-[2px] shrink-0 bg-red" />
            <Reveal delay={0.15} className="body-lg flex max-w-[56ch] flex-col gap-[22px] text-ink/88">
              <p className="m-0">
                In 1972, Late Dr. Virendra Singh arrived in Raebareli as a Civil Surgeon. He saw a city with no nursing home. In 1981, he changed that forever — building Raebareli&apos;s first and most trusted nursing home.
              </p>
              <p className="m-0">
                He served 49 years. He operated at 76 years of age. He saw his last patient on 18th August 2021 and left us that evening on 19th August. He believed: &ldquo;A Doctor Never Retires.&rdquo;
              </p>
              <p className="m-0">Today BBSM carries that legacy forward. He left behind 9 doctors from his own family continuing his mission.</p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <blockquote className="mt-11 border-l-2 border-blue/20 pl-[26px] font-serif italic leading-[1.2] text-blue" style={{ fontSize: "clamp(26px,3vw,40px)" }}>
              &ldquo;A Doctor Never Retires.&rdquo;
              <span className="mt-4 block font-sans text-[12px] not-italic uppercase tracking-[0.17em] text-ink/55">— Late Dr. Virendra Singh</span>
            </blockquote>
          </Reveal>
          <Reveal delay={0.25}>
            <Link href="/founder" className="link-u mt-10">
              Discover Our Story <span className="arr">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
