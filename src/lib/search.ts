import { DOCTORS, SPECIALITIES } from "./data";
import { ARTICLES } from "./journal";
import { SITE } from "./site";

export type SearchItem = { title: string; sub: string; href: string; kind: string; terms: string };

const PAGES: SearchItem[] = [
  { title: "Home", sub: "BBSM Nursing Home — hospital in Raebareli since 1983", href: "/", kind: "Page", terms: "hospital raebareli nursing home best bbsm brij bhushan" },
  { title: "About BBSM", sub: "Raebareli's first nursing home — our story", href: "/about", kind: "Page", terms: "hospital about history 1983 1972 first legacy" },
  { title: "All Doctors", sub: "11 specialists — Daily OPD, Super Speciality, Visiting", href: "/doctors", kind: "Page", terms: "doctor doctors specialist team list" },
  { title: "OPD Timings", sub: "Daily 10 AM–4 PM · Last Sunday 9 AM–12 PM", href: "/doctors#timings", kind: "Timings", terms: "timing timings opd hours schedule time when open sunday" },
  { title: "Super Speciality OPD", sub: "Delhi specialists every last Sunday, 9 AM–12 PM", href: "/doctors#super-speciality", kind: "Timings", terms: "sunday last sunday delhi rajiv gandhi cancer institute super speciality monthly" },
  { title: "Specialities", sub: "Orthopaedics, eye, oncology, IVF and more", href: "/services", kind: "Page", terms: "services departments treatments speciality specialities" },
  { title: "Founder's Tribute", sub: "Late Dr. Virendra Singh", href: "/founder", kind: "Page", terms: "virendra singh founder tribute 19 august civil surgeon" },
  { title: "Contact & Directions", sub: SITE.address.full, href: "/contact", kind: "Page", terms: "contact address directions map location jail garden road indira nagar hospital phone" },
  { title: "Book an Appointment", sub: `Call ${SITE.phone}`, href: SITE.phoneHref, kind: "Call", terms: "appointment book booking call phone number" },
  { title: "24×7 Emergency", sub: `Call ${SITE.emergency}`, href: SITE.emergencyHref, kind: "Call", terms: "emergency urgent 24 hours ambulance night" },
];

export const SEARCH_INDEX: SearchItem[] = [
  ...PAGES,
  ...SPECIALITIES.map((s) => ({
    title: s.name,
    sub: `${s.doctors.join(", ")} · ${s.timing}`,
    href: `/services/${s.slug}`,
    kind: "Speciality",
    terms: `${s.name} ${s.short} ${s.conditions.join(" ")} ${s.keyword}`.toLowerCase(),
  })),
  ...DOCTORS.map((d) => ({
    title: d.name,
    sub: `${d.title} · ${d.days} ${d.time}`,
    href: `/doctors/${d.slug}`,
    kind: "Doctor",
    terms: `${d.name} ${d.role} ${d.forWhat} ${d.expertise} ${d.institution ?? ""}`.toLowerCase(),
  })),
  ...ARTICLES.map((a) => ({ title: a.title, sub: `${a.category} · ${a.minutes} min read`, href: `/journal/${a.slug}`, kind: "Journal", terms: `${a.title} ${a.category} ${a.excerpt}`.toLowerCase() })),
];

// Plain-language synonyms patients actually type.
const SYN: Record<string, string> = {
  bone: "orthopaedic", knee: "orthopaedic", joint: "orthopaedic", back: "spine", haddi: "orthopaedic", ortho: "orthopaedic",
  aankh: "eye", aankhon: "eye", vision: "eye", cataract: "eye", motiyabind: "eye", chashma: "eye", spectacles: "eye",
  cancer: "oncology", tumour: "oncology", tumor: "oncology", chemo: "chemotherapy",
  pregnancy: "gynaecolog", fertility: "ivf", baby: "ivf", women: "gynaecolog", gynae: "gynaecolog", gynecolog: "gynaecolog",
  kidney: "urolog", stone: "urolog", prostate: "urolog", urine: "urolog",
  breathing: "chest", asthma: "chest", tb: "tuberculosis", saans: "chest", lungs: "chest",
  mental: "psychiatr", depression: "psychiatr", anxiety: "psychiatr", neuro: "neuro", sleep: "sleep", mirgi: "epilepsy",
  gall: "gallbladder", pathri: "stone", hernia: "hernia", thyroid: "thyroid",
  fever: "fever", bukhar: "fever", sugar: "diabetes", bp: "blood pressure", physician: "physician", general: "physician",
  time: "timing", hours: "timing", number: "phone", call: "appointment",
};

export function search(q: string): SearchItem[] {
  const words = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const scored = SEARCH_INDEX.map((it) => {
    const hay = `${it.title} ${it.sub} ${it.terms}`.toLowerCase();
    let score = 0;
    for (const w of words) {
      const alt = SYN[w];
      if (it.title.toLowerCase().includes(w)) score += 5;
      if (hay.includes(w)) score += 2;
      else if (alt && hay.includes(alt)) score += 2;
      else if (w.length > 3 && hay.includes(w.slice(0, -1))) score += 1;
      else return { it, score: 0 };
    }
    if (it.kind === "Speciality") score += 0.5;
    return { it, score };
  });
  return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, 8).map((s) => s.it);
}

export const SUGGESTIONS: { label: string; href: string }[] = [
  { label: "Hospital in Raebareli", href: "/about" },
  { label: "Orthopaedic doctor — Dr. Omkar Singh Bhadoria", href: "/doctors/dr-omkar-singh-bhadoria" },
  { label: "Eye specialist — Dr. Shailaja Singh", href: "/doctors/dr-shailaja-singh" },
  { label: "Cancer consultation — Super Speciality OPD", href: "/services/oncology" },
  { label: "IVF specialist — Dr. Preeti Singh", href: "/doctors/dr-preeti-singh" },
  { label: `Book appointment — ${SITE.phone}`, href: SITE.phoneHref },
  { label: "OPD timings", href: "/doctors#timings" },
  { label: "Directions to BBSM", href: "/contact" },
];
