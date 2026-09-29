"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { EXPO, viewportOnce } from "@/lib/motion";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  preload?: boolean;
  /** parallax travel in px (0 = none) */
  parallax?: number;
  /** reveal direction of the clip mask */
  from?: "bottom" | "left" | "right" | "top";
  delay?: number;
  objectPosition?: string;
  children?: React.ReactNode;
  mount?: boolean;
};

const CLIP = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/** Image unmasks with a clip-path wipe while settling from a slight zoom; optional scroll parallax. */
export default function ImageReveal({
  src, alt, className = "", imgClassName = "", sizes = "100vw", preload, parallax = 0, from = "bottom", delay = 0, objectPosition, children, mount,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-parallax, parallax]);

  const anim = mount ? { animate: "show" } : { whileInView: "show", viewport: viewportOnce };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={reduce ? false : "hidden"}
      {...anim}
      variants={{ hidden: { clipPath: CLIP[from] }, show: { clipPath: "inset(0% 0% 0% 0%)" } }}
      transition={{ duration: 1.4, ease: EXPO, delay }}
    >
      <motion.div
        className="absolute"
        style={{ y: parallax && !reduce ? y : 0, inset: parallax ? `-${parallax}px 0` : 0 }}
      >
        <motion.div
          className="relative h-full w-full"
          variants={{ hidden: { scale: 1.18 }, show: { scale: 1 } }}
          transition={{ duration: 1.8, ease: EXPO, delay }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            preload={preload}
            className={`object-cover ${imgClassName}`}
            style={objectPosition ? { objectPosition } : undefined}
          />
        </motion.div>
      </motion.div>
      {children}
    </motion.div>
  );
}
