"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number; as?: "div" | "li" | "article" | "p" };

/** Fade + rise 30px over 1s when entering the viewport (the prototype's data-reveal). */
export default function Reveal({ delay = 0, y = 30, as = "div", children, ...rest }: Props) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
