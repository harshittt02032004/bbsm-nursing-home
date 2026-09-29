import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { DOCTORS, SPECIALITIES } from "@/lib/data";
import { ARTICLES } from "@/lib/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("", 1, "weekly"),
    page("/doctors", 0.9, "weekly"),
    page("/services", 0.9),
    page("/contact", 0.9),
    page("/about", 0.8),
    page("/founder", 0.6, "yearly"),
    ...SPECIALITIES.map((s) => page(`/services/${s.slug}`, 0.8)),
    ...DOCTORS.map((d) => page(`/doctors/${d.slug}`, 0.7)),
    ...ARTICLES.map((a) => page(`/journal/${a.slug}`, 0.5, "yearly")),
  ];
}
