import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" }, robots: { index: false } };

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      slug="privacy"
      sections={[
        { h: "What this website collects", p: "This website does not ask you to create an account or fill in forms. Appointments are made by phone. We do not collect personal or medical information through this website." },
        { h: "Third-party services", p: "If you choose to open the map, Google Maps loads and may set its own cookies under Google's privacy policy. Fonts and images are served from this website." },
        { h: "Your medical information", p: "Information you share with our doctors and staff at BBSM Nursing Home is kept confidential and handled according to applicable Indian medical and data-protection law." },
        { h: "Contact", p: `For any privacy question, call BBSM Nursing Home on ${SITE.phone} or visit us at ${SITE.address.full}.` },
      ]}
    />
  );
}
