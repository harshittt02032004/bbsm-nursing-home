import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CtaBand from "@/components/layout/CtaBand";
import { MobileDock, ScrollProgress } from "@/components/layout/Chrome";
import SmoothScroll from "@/components/motion/SmoothScroll";
import MotionProvider from "@/components/motion/MotionProvider";
import JsonLd from "@/components/ui/JsonLd";
import { SITE, SITE_URL } from "@/lib/site";
import { hospitalSchema } from "@/lib/schema";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
const sans = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-archivo", display: "swap" });
const deva = Noto_Serif_Devanagari({ subsets: ["devanagari"], weight: ["400", "600"], variable: "--font-noto-deva", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BBSM Nursing Home | Best Hospital in Raebareli | Est. 1983 | Brij Bhushan Singh Memorial",
    template: "%s | BBSM Nursing Home Raebareli",
  },
  description:
    "BBSM Nursing Home — the most trusted hospital in Raebareli since 1983. Daily OPD for orthopaedics and eye care. Super Speciality OPD every last Sunday with oncologists, IVF specialists, and uro-surgeons from Rajiv Gandhi Cancer Institute, New Delhi. Call +91 96166 06051.",
  keywords: ["hospital in Raebareli", "best hospital Raebareli", "BBSM Nursing Home", "Brij Bhushan Singh Memorial Nursing Home", "nursing home Raebareli"],
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    url: "/",
    title: "BBSM Nursing Home — Care You Can Trust | Hospital in Raebareli since 1983",
    description: "Raebareli's first nursing home. 11 specialists, daily OPD and a monthly Super Speciality OPD with Delhi specialists.",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: true, address: true },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

export const viewport: Viewport = {
  themeColor: "#063B68",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${serif.variable} ${sans.variable} ${deva.variable}`}>
      <body>
        <a href="#main" className="sr-only z-[90] bg-red px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <JsonLd data={hospitalSchema()} />
        <MotionProvider>
          <SmoothScroll />
          <ScrollProgress />
          <Header />
          <main id="main" className="pt-[var(--header-h)]">
            {children}
          </main>
          <CtaBand />
          <Footer />
          <MobileDock />
        </MotionProvider>
      </body>
    </html>
  );
}
