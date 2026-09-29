import Image from "next/image";
import type { Doctor } from "@/lib/data";

const initials = (name: string) =>
  name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

/** Portrait if supplied, otherwise an editorial monogram slot (placeholder until photos arrive). */
export default function DoctorPortrait({ doctor, className = "", sizes = "(min-width: 1024px) 40vw, 100vw", preload }: { doctor: Doctor; className?: string; sizes?: string; preload?: boolean }) {
  if (doctor.portrait) {
    return (
      <div className={`relative overflow-hidden bg-mist ${className}`}>
        <Image src={doctor.portrait} alt={`${doctor.name}, ${doctor.title} at BBSM Nursing Home, Raebareli`} fill sizes={sizes} preload={preload} className="object-cover object-top" />
      </div>
    );
  }
  const accent = doctor.group === "Super Speciality" ? "#C52030" : doctor.group === "Daily OPD" ? "#07518B" : "#111820";
  return (
    <div className={`ph relative flex items-end overflow-hidden p-6 ${className}`} role="img" aria-label={`Portrait of ${doctor.name} — to be supplied`}>
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[0.06em] -top-[0.18em] select-none font-serif leading-none"
        style={{ fontSize: "clamp(160px, 22vw, 300px)", color: accent, opacity: 0.1 }}
      >
        {initials(doctor.name)}
      </span>
      <div className="meta relative leading-[1.7] text-blue" style={{ fontSize: 10.5 }}>
        <span className="block text-red">■</span>
        Portrait — {doctor.name}
        <br />
        Client to supply
      </div>
    </div>
  );
}
