import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" }, robots: { index: false } };

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Use"
      slug="terms"
      sections={[
        { h: "Information only", p: "Content on this website — including the Health Journal — is general information about BBSM Nursing Home and common health topics. It is not medical advice and does not replace a consultation with a doctor." },
        { h: "Doctor availability", p: "OPD days and timings may change. Please call to confirm before visiting, especially for the monthly Super Speciality OPD." },
        { h: "Emergencies", p: `In an emergency, call ${SITE.emergency} or go to the nearest hospital immediately. Do not rely on this website for emergency care.` },
        { h: "Content", p: `All text, photographs and the BBSM logo belong to ${SITE.legalName}, Raebareli, and may not be reused without permission.` },
      ]}
    />
  );
}
