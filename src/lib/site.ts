export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://bbsm-nursing-home.vercel.app").replace(/\/$/, "");

export const SITE = {
  name: "BBSM Nursing Home",
  legalName: "Brij Bhushan Singh Memorial Nursing Home",
  alsoKnownAs: "Dr. Virendra Singh Advance Surgical Centre",
  hindiName: "बृज भूषण सिंह मेमोरियल नर्सिंग होम",
  tagline: "Care You Can Trust",
  founded: 1983,
  phone: "+91 96166 06051",
  phoneHref: "tel:+919616606051",
  emergency: "+91 99364 60525",
  emergencyHref: "tel:+919936460525",
  address: {
    street: "A 7/7, Jail Garden Road, Awas Vikas Colony, Indira Nagar",
    city: "Raebareli",
    region: "Uttar Pradesh",
    postalCode: "229001",
    country: "IN",
    full: "A 7/7, Jail Garden Road, Awas Vikas Colony, Indira Nagar, Raebareli, Uttar Pradesh 229001",
  },
  geo: { lat: 26.215872, lng: 81.2413944 },
  mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJHcF_pDChmzkR-qqbfsHbNfE",
  mapsSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=Brij+Bhushan+Singh+Memorial+Nursing+Home+(BBSM)+Raebareli",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=26.215872,81.2413944&destination_place_id=ChIJHcF_pDChmzkR-qqbfsHbNfE",
  reviewsUrl:
    "https://www.google.com/maps/place/Brij+Bhushan+Singh+Memorial+Nursing+Home+(BBSM)/@26.215872,81.2413944,17z/data=!4m8!3m7!1s0x399ba130a47fc11d:0xf135dbc17e9baafa!8m2!3d26.215872!4d81.2413944!9m1!1b1!16s%2Fg%2F1tj3jgq2",
  mapEmbed:
    "https://maps.google.com/maps?q=Brij%20Bhushan%20Singh%20Memorial%20Nursing%20Home%20(BBSM)%20Raebareli&ll=26.215872,81.2413944&z=16&output=embed",
  instagram: "https://www.instagram.com/bbsm.raebareli/",
  facebook: "https://www.facebook.com/search/top?q=Brij%20Bhushan%20Singh%20Memorial%20Nursing",
  hours: {
    dailyOpd: "Every Day · 10:00 AM – 4:00 PM",
    superOpd: "Last Sunday of Month · 9:00 AM – 12:00 PM",
    emergency: "24 × 7",
  },
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Specialities" },
  { href: "/doctors", label: "Doctors" },
  { href: "/founder", label: "Founder's Tribute" },
  { href: "/contact", label: "Contact" },
] as const;
