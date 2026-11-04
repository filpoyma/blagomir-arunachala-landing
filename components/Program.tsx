"use client";

import { Reveal, SectionHead } from "@/components/Reveal";
import { DayAccordion } from "@/components/DayAccordion";
import { DAYS } from "@/data/content";

const Program = () => (
  <section
    id="program"
    data-testid="program-section"
    className="relative bg-jade py-24 sm:py-36 overflow-hidden"
  >
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-saffron/[0.04] blur-[100px] pointer-events-none" />
    <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <SectionHead eyebrow="2–12 января 2027" title="Программа ретрита — 11 дней" dark />
        <Reveal delay={0.15}>
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-paper/50">
            Тируваннамалай
          </span>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-14">
        <DayAccordion days={DAYS} prefix="program" />
      </Reveal>
    </div>
  </section>
);

export default Program;
