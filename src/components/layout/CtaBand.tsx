import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";

export default function CtaBand() {
  return (
    <section id="appointment" className="relative overflow-hidden bg-blue-deep px-[clamp(20px,4vw,64px)] py-[clamp(90px,16vh,200px)] text-white">
      <div
        aria-hidden
        className="drift absolute left-[-8vw] top-[-14vw] h-[44vw] w-[44vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(197,32,48,.55), rgba(197,32,48,0) 68%)" }}
      />
      <div
        aria-hidden
        className="drift absolute bottom-[-20vw] right-[-10vw] h-[36vw] w-[36vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(7,81,139,.7), rgba(7,81,139,0) 70%)", animationDelay: "-13s", animationDuration: "32s" }}
      />
      <div className="wrap-inner relative grid items-end gap-[clamp(28px,5vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr))]">
        <div>
          <SplitText parts={["Your health deserves the right care."]} className="t-h1 max-w-[15ch] !text-[clamp(38px,5.6vw,84px)]" />
          <Reveal delay={0.3}>
            <p className="mt-7 max-w-[46ch] font-light text-white/78" style={{ fontSize: "clamp(16px,1.35vw,20px)", lineHeight: 1.6 }}>
              Speak with our medical team and take the next step with confidence.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.4} className="flex flex-wrap gap-3.5">
          <a href={SITE.phoneHref} className="btn btn-red-dark">
            Book an Appointment <span className="arr">→</span>
          </a>
          <a href={SITE.phoneHref} className="btn btn-ghost-dark">
            Call BBSM · {SITE.phone}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
