import Link from "next/link";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="bg-paper px-[clamp(20px,4vw,64px)] py-[clamp(90px,16vh,200px)]">
      <div className="wrap-inner">
        <div className="eyebrow">404</div>
        <h1 className="t-h1 a-rise mt-6 max-w-[14ch]">This page has moved on.</h1>
        <p className="body mt-6 max-w-[48ch] text-ink/70">The care hasn&apos;t. Head back home, find a doctor, or call us on {SITE.phone}.</p>
        <div className="mt-10 flex flex-wrap gap-3.5">
          <Link href="/" className="btn btn-red">Back to Home <span className="arr">→</span></Link>
          <Link href="/doctors" className="btn btn-ghost">Find a Doctor</Link>
        </div>
      </div>
    </section>
  );
}
