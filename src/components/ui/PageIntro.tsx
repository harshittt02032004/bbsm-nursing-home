import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "./Breadcrumbs";

export default function PageIntro({
  eyebrow,
  title,
  sub,
  crumbs,
  bg = "bg-paper",
  maxCh = 16,
  children,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  crumbs: { href: string; label: string }[];
  bg?: string;
  maxCh?: number;
  children?: React.ReactNode;
}) {
  return (
    <section className={`${bg} gutter pb-[clamp(40px,6vh,70px)] pt-[clamp(56px,9vh,120px)]`}>
      <div className="wrap-inner">
        <Reveal y={12}>
          <Breadcrumbs items={crumbs} />
        </Reveal>
        <Reveal y={12} delay={0.1}>
          <div className="eyebrow mt-10">{eyebrow}</div>
        </Reveal>
        <SplitText as="h1" trigger="mount" delay={0.15} parts={[title]} className="t-h1 mt-6" style={{ maxWidth: `${maxCh}ch` }} />
        {sub && (
          <Reveal delay={0.5}>
            <p className="mt-7 max-w-[60ch] font-light text-ink/70" style={{ fontSize: "clamp(16px,1.3vw,20px)", lineHeight: 1.6 }}>
              {sub}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
