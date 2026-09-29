import { SITE, SITE_URL } from "./site";
import { DOCTORS, SPECIALITIES, type Doctor, type Speciality } from "./data";

const address = {
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.country,
};

export const HOSPITAL_ID = `${SITE_URL}/#hospital`;

export function hospitalSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Hospital", "MedicalOrganization"],
    "@id": HOSPITAL_ID,
    name: SITE.name,
    alternateName: [SITE.legalName, SITE.alsoKnownAs, "BBSM Hospital Raebareli", SITE.hindiName],
    description:
      "BBSM Nursing Home (Brij Bhushan Singh Memorial Nursing Home) is a hospital in Raebareli, Uttar Pradesh — established in 1981 as Raebareli's first nursing home by Late Dr. Virendra Singh.",
    url: SITE_URL,
    logo: `${SITE_URL}/images/bbsm-logo.png`,
    image: [`${SITE_URL}/images/exterior-hero.jpg`, `${SITE_URL}/images/exterior-street.jpg`, `${SITE_URL}/images/ward-main.jpg`],
    slogan: SITE.tagline,
    foundingDate: String(SITE.founded),
    founder: { "@type": "Person", name: "Dr. Virendra Singh", jobTitle: "Civil Surgeon" },
    telephone: SITE.phone,
    address,
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    hasMap: SITE.mapsUrl,
    areaServed: ["Raebareli", "Uttar Pradesh"],
    isAcceptingNewPatients: true,
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59", description: "24×7 emergency" },
    ],
    contactPoint: [
      { "@type": "ContactPoint", telephone: SITE.phone, contactType: "appointments", areaServed: "IN", availableLanguage: ["English", "Hindi"] },
      { "@type": "ContactPoint", telephone: SITE.emergency, contactType: "emergency", areaServed: "IN", availableLanguage: ["English", "Hindi"] },
    ],
    availableService: SPECIALITIES.map((s) => ({ "@type": "MedicalTherapy", name: s.name, url: `${SITE_URL}/services/${s.slug}` })),
    department: [
      {
        "@type": "MedicalClinic",
        name: "BBSM Daily OPD",
        telephone: SITE.phone,
        address,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "10:00",
          closes: "16:00",
        },
      },
    ],
    sameAs: [SITE.instagram],
  };
}

export function physicianSchema(d: Doctor) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/doctors/${d.slug}#physician`,
    name: d.name,
    description: d.expertise,
    medicalSpecialty: d.title,
    url: `${SITE_URL}/doctors/${d.slug}`,
    telephone: SITE.phone,
    address,
    ...(d.portrait ? { image: `${SITE_URL}${d.portrait}` } : {}),
    ...(d.institution ? { affiliation: { "@type": "Organization", name: d.institution } } : {}),
    hospitalAffiliation: { "@id": HOSPITAL_ID },
    availableService: d.forWhat.split(",").map((s) => ({ "@type": "MedicalProcedure", name: s.trim() })),
  };
}

export function specialitySchema(s: Speciality) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${s.name} in Raebareli — BBSM Nursing Home`,
    url: `${SITE_URL}/services/${s.slug}`,
    about: { "@type": "MedicalSpecialty", name: s.name },
    audience: "https://schema.org/Patient",
    mainEntity: {
      "@type": "MedicalClinic",
      name: `${s.name} — BBSM Nursing Home`,
      parentOrganization: { "@id": HOSPITAL_ID },
      telephone: SITE.phone,
      address,
      employee: s.doctors.map((n) => {
        const d = DOCTORS.find((x) => x.name === n);
        return { "@type": "Physician", name: n, url: d ? `${SITE_URL}/doctors/${d.slug}` : undefined };
      }),
    },
  };
}
