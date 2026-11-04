"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface IRevealProps {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly y?: number;
  readonly className?: string;
}

export const Reveal = ({
  children,
  delay = 0,
  y = 32,
  className = "",
}: IRevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export type TSectionAlign = "left" | "center";

export interface ISectionHeadProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly dark?: boolean;
  readonly align?: TSectionAlign;
}

export const SectionHead = ({
  eyebrow,
  title,
  dark = false,
  align = "left",
}: ISectionHeadProps) => (
  <div className={align === "center" ? "text-center" : "text-left"}>
    <Reveal>
      <div
        className="flex items-center gap-4 justify-start"
        style={align === "center" ? { justifyContent: "center" } : {}}
      >
        <span className="h-px w-10 bg-saffron/60" />
        <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-saffron">
          {eyebrow}
        </span>
        {align === "center" && <span className="h-px w-10 bg-saffron/60" />}
      </div>
    </Reveal>
    <Reveal delay={0.08}>
      <h2
        className={`mt-5 font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight ${
          dark ? "text-paper" : "text-jade-ink"
        }`}
      >
        {title}
      </h2>
    </Reveal>
  </div>
);
