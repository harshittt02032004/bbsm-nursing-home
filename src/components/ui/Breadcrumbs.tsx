import Link from "next/link";
import JsonLd from "./JsonLd";
import { SITE_URL } from "@/lib/site";

export default function Breadcrumbs({ items, dark = false }: { items: { href: string; label: string }[]; dark?: boolean }) {
  const all = [{ href: "/", label: "Home" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={`meta flex flex-wrap items-center gap-x-3 gap-y-1 ${dark ? "text-white/50" : "text-ink/50"}`} style={{ fontSize: 11 }}>
        {all.map((it, i) => (
          <span key={it.href} className="flex items-center gap-3">
            {i < all.length - 1 ? (
              <Link href={it.href} className={dark ? "text-white/60 hover:text-white" : "text-ink/55 hover:text-red"}>
                {it.label}
              </Link>
            ) : (
              <span aria-current="page">{it.label}</span>
            )}
            {i < all.length - 1 && <span aria-hidden>/</span>}
          </span>
        ))}
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.label, item: `${SITE_URL}${it.href === "/" ? "" : it.href}` })),
        }}
      />
    </>
  );
}
