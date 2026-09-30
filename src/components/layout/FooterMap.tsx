import { SITE } from "@/lib/site";

/**
 * Small street map for the footer of every page. It is a static vector map
 * (public/images/bbsm-map.svg, rendered from OpenStreetMap data with the
 * hospital at its exact centre) so no third-party map script loads on each page;
 * clicking it opens Google Maps directions.
 */
export default function FooterMap() {
  return (
    <div className="group r-card relative h-[170px] w-full border border-white/15 bg-[#0B4679] lg:h-[138px]">
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, nothing for the image optimiser to do */}
      <img
        src="/images/bbsm-map.svg"
        alt="Street map showing BBSM Nursing Home on Jail Garden Road, Indira Nagar, Raebareli"
        width={800}
        height={320}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.06]"
      />

      {/* Pin — tip sits on the centre of the map, which is the hospital */}
      <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2">
        <span className="map-pulse absolute -left-[9px] -top-[9px] h-[18px] w-[18px] rounded-full bg-red/50" />
        <svg width="26" height="34" viewBox="0 0 26 34" className="absolute -left-[13px] -top-[33px] drop-shadow-[0_3px_5px_rgba(0,0,0,.35)]">
          <path d="M13 33C13 33 25 20.6 25 12.6 25 6 19.6 1 13 1S1 6 1 12.6C1 20.6 13 33 13 33Z" fill="#C52030" stroke="#fff" strokeWidth="1.6" />
          <path d="M13 7.4v10.4M7.8 12.6h10.4" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        <span className="absolute left-[18px] -top-[30px] whitespace-nowrap rounded-full bg-white px-2.5 py-[5px] text-[10.5px] font-semibold leading-none tracking-[0.02em] text-ink shadow-[0_3px_10px_rgba(0,0,0,.25)]">
          BBSM Nursing Home
        </span>
      </span>

      <a
        href={SITE.directionsUrl}
        target="_blank"
        rel="noopener"
        aria-label="Get directions to BBSM Nursing Home on Google Maps"
        className="absolute inset-0 flex items-end justify-end p-2.5 text-white hover:text-white"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-deep/85 px-3 py-[7px] text-[10.5px] font-semibold uppercase leading-none tracking-[0.12em] backdrop-blur-sm transition-colors duration-300 group-hover:bg-red">
          Get Directions <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
        </span>
      </a>
      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noopener"
        className="absolute left-2 top-1.5 z-10 text-[9px] leading-none text-white/55 hover:text-white"
      >
        © OpenStreetMap
      </a>
    </div>
  );
}
