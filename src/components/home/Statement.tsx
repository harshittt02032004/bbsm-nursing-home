import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import { STATS } from "@/lib/data";

export default function Statement() {
  return (
    <section className="bg-paper px-[clamp(20px,4vw,64px)] py-[clamp(90px,15vh,190px)]">
      <div className="wrap-inner">
        <SplitText
          as="p"
          stagger={0.045}
          className="t-statement m-0 max-w-[20ch] text-ink"
          parts={["Decades of experience. One commitment —", { t: "your wellbeing.", className: "text-red" }]}
        />
        <div className="mt-[clamp(56px,9vh,110px)] grid gap-px bg-ink/12 [grid-template-columns:repeat(auto-fit,minmax(190px,1fr))]">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="group relative overflow-hidden bg-paper px-[26px] pb-[30px] pt-[34px]">
              <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-red transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-x-100" />
              <div className="font-serif leading-none text-blue" style={{ fontSize: "clamp(48px,5vw,74px)" }}>
                <CountUp to={s.n} suffix={s.suffix} />
              </div>
              <div className="meta mt-3.5 text-ink/62" style={{ fontSize: 12, letterSpacing: ".16em" }}>{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
