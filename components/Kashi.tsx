"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SectionHead } from "@/components/Reveal";
import { DayAccordion } from "@/components/DayAccordion";
import { KASHI, IMAGES } from "@/data/content";
import { scrollToId } from "@/lib/scroll";

const Kashi = () => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="kashi"
      ref={ref}
      data-testid="kashi-section"
      className="relative bg-jade-3 py-24 sm:py-36 overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={IMAGES.varanasi}
          alt="Гаты Варанаси на рассвете"
          loading="lazy"
          className="w-full h-[116%] object-cover opacity-25 sepia-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-jade-3 via-jade-3/70 to-jade-3" />
      </motion.div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-saffron/[0.05] blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <SectionHead eyebrow={KASHI.badge} title={KASHI.title} dark />
          <Reveal delay={0.15}>
            <div className="flex items-end gap-4">
              <span className="font-serif text-6xl sm:text-7xl text-saffron-2 leading-none">
                {KASHI.price}
              </span>
              <span className="pb-2 font-mono text-[10px] tracking-[0.25em] uppercase text-paper/50">
                к основному
                <br />
                тарифу
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-3xl text-base sm:text-lg font-light leading-relaxed text-paper/75">
            {KASHI.intro}
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-paper/50">{KASHI.transfer}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 max-w-5xl">
          <div className="flex items-end justify-between gap-4 border-b border-paper/10 pb-4">
            <span className="font-serif text-2xl text-paper">Программа по дням</span>
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-paper/50">
              Варанаси
            </span>
          </div>
          <DayAccordion days={KASHI.days} prefix="kashi" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-4xl">
            <p className="text-[13px] leading-relaxed text-paper/55 border-l-2 border-saffron/50 pl-5">
              {KASHI.included}
            </p>
            <p className="text-[13px] leading-relaxed text-paper/55 border-l-2 border-paper/20 pl-5">
              {KASHI.excluded}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <button
              data-testid="kashi-book-btn"
              onClick={() => scrollToId("#booking")}
              className="px-8 py-4 rounded-full bg-saffron text-jade-3 font-semibold text-sm tracking-wide hover:bg-terracotta transition-colors duration-300 shadow-[0_0_24px_rgba(224,122,47,0.25)]"
            >
              Продолжить путь в Каши
            </button>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-paper/40">
              Проживание: Shree Ganesha Palace · завтраки включены
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Kashi;
