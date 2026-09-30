import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { WHY } from "@/lib/data";

export default function Why() {
  return (
    <section className="bg-mist px-[clamp(20px,4vw,64px)] py-[clamp(80px,13vh,170px)]">
      <div className="wrap-inner grid gap-[clamp(24px,4vw,72px)] lg:grid-cols-3">
        <div className="self-start lg:sticky lg:top-[100px]">
          <SplitText parts={["Why BBSM"]} className="t-h2 m-0" />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[34ch] text-[15px] font-light leading-relaxed text-ink/60">
              Five reasons families across Raebareli have trusted one address for more than four decades.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-2">
          {WHY.map((w, i) => (
            <Reveal
              key={w.title}
              delay={i * 0.05}
              className="group grid items-baseline gap-[clamp(16px,3vw,48px)] border-t border-ink/13 py-[30px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]"
            >
              <div className="flex items-baseline gap-5">
                <span className="text-[11px] font-medium tracking-[0.14em] text-ink/35">0{i + 1}</span>
                <span className="font-serif leading-[1.1] text-blue transition-colors duration-500 group-hover:text-red" style={{ fontSize: "clamp(26px,2.6vw,38px)" }}>
                  {w.title}
                </span>
              </div>
              <p className="body m-0 text-ink/85 !text-[clamp(15.5px,1.2vw,18px)]">{w.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
