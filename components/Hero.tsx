"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { IMAGES } from "@/data/content";
import { scrollToId } from "@/lib/scroll";
import { HeroCountdown } from "@/components/Countdown";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface IMaskedLineProps {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly className?: string;
}

const MaskedLine = ({ children, delay = 0, className = "" }: IMaskedLineProps) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block"
      initial={{ y: "115%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

const Hero = () => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-[100svh] flex flex-col overflow-hidden bg-jade-3"
    >
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: EASE }}
        >
          <Image
            src={IMAGES.hero}
            alt="Священная гора Аруначала на рассвете — Тируваннамалай, Индия"
            width={1920}
            height={1280}
            preload
            sizes="100vw"
            className="w-full h-[120%] object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-jade-3/80 via-jade-3/45 to-jade-3" />
        <div className="absolute inset-0 bg-jade/25 mix-blend-multiply" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 flex-1 flex flex-col justify-end max-w-7xl mx-auto w-full px-5 sm:px-8 pb-16 pt-40"
      >
        <MaskedLine delay={0.25}>
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-saffron-2">
            Шива Дева-Парампара · Авторский дхарма-ретрит
          </span>
        </MaskedLine>

        <h1 className="mt-6 font-serif text-paper leading-[0.98] tracking-tight">
          <MaskedLine delay={0.4} className="text-[13vw] sm:text-7xl lg:text-[92px]">
            АРУНАЧАЛА.
          </MaskedLine>
          <MaskedLine delay={0.55} className="text-[13vw] sm:text-7xl lg:text-[92px]">
            <span className="italic text-saffron-2">Путь</span> к Источнику
          </MaskedLine>
        </h1>

        <MaskedLine delay={0.75} className="mt-7 max-w-2xl">
          <p className="text-paper/80 text-base sm:text-lg font-light leading-relaxed">
            2–12 января 2027 · Тируваннамалай, Индия. 11 дней глубокой садханы, сатсангов,
            самоисследования и посещения священных мест у подножия Аруначалы.
          </p>
        </MaskedLine>

        <motion.div
          className="mt-9"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: EASE }}
        >
          <HeroCountdown />
        </motion.div>

        <MaskedLine delay={1.05} className="mt-9">
          <div className="flex flex-wrap items-center gap-4">
            <button
              data-testid="hero-book-btn"
              onClick={() => scrollToId("#booking")}
              className="group px-8 py-4 rounded-full bg-saffron text-jade-3 font-semibold text-sm tracking-wide hover:bg-terracotta transition-colors duration-300 shadow-[0_0_24px_rgba(224,122,47,0.25)] hover:shadow-[0_0_32px_rgba(211,95,30,0.35)]"
            >
              Забронировать место
            </button>
            <button
              data-testid="hero-program-btn"
              onClick={() => scrollToId("#program")}
              className="px-8 py-4 rounded-full border border-paper/30 text-paper text-sm tracking-wide hover:border-saffron hover:text-saffron-2 transition-colors duration-300"
            >
              Смотреть программу
            </button>
          </div>
        </MaskedLine>

        <MaskedLine delay={1.2} className="mt-6">
          <p className="text-paper/45 text-xs tracking-wide">
            Ведущий — Свами Благомир Шиванатха Тапасви
          </p>
        </MaskedLine>
      </motion.div>

      <motion.button
        data-testid="hero-scroll-hint"
        onClick={() => scrollToId("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 right-6 sm:right-10 z-10 text-paper/50 hover:text-saffron-2 transition-colors"
        aria-label="Прокрутить вниз"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={22} strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
