import Image from "next/image";
import Parallax from "@/components/motion/Parallax";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";

export default function PatientExperience() {
  return (
    <section className="relative isolate overflow-hidden px-[clamp(20px,4vw,64px)] py-[60px] md:py-[clamp(110px,22vh,260px)] text-white">
      <Parallax amount={90} className="absolute inset-[-90px_0] -z-20">
        <Image
          src="/images/care-patient-experience.jpg"
          alt="Representative image: a doctor holding an elderly patient's hand and listening, her daughter beside her"
          fill
          sizes="100vw"
          className="object-cover object-[78%_35%]"
        />
      </Parallax>
      <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(100deg, rgba(6,40,70,.94) 0%, rgba(6,59,104,.82) 45%, rgba(11,34,51,.45) 100%)" }} />
      <div className="texture-lines absolute inset-0 -z-10 opacity-60" />
      <div className="wrap-inner relative">
        <Reveal className="eyebrow !text-white/70">Patient Experience</Reveal>
        <SplitText parts={["Where Medicine Meets Humanity."]} className="t-h1 mt-6 max-w-[15ch] !text-[clamp(40px,6.4vw,96px)]" stagger={0.08} />
        <Reveal delay={0.35}>
          <p className="mt-10 max-w-[50ch] font-light text-white/85" style={{ fontSize: "clamp(17px,1.5vw,23px)", lineHeight: 1.6 }}>
            Every patient deserves to be heard, understood and cared for.
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <p className="body mt-[26px] max-w-[56ch] text-white/65">
            At BBSM Nursing Home, medicine is never just a procedure — it is a relationship. From your first consultation to your recovery, our doctors make time to listen.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
