"use client";

import Image from "next/image";
import { Reveal, SectionHead } from "@/components/Reveal";
import { HOTELS } from "@/data/content";

const Hotel = () => (
  <section id="hotel" data-testid="hotel-section" className="bg-paper py-24 sm:py-36">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <SectionHead eyebrow="Отели ретрита" title="Где живёт группа" />
        <Reveal delay={0.15}>
          <p className="max-w-sm text-sm leading-relaxed text-jade-ink/60">
            Завтраки включены в обоих отелях. Обеды и ужины оплачиваются отдельно.
            Check-out в обоих отелях — ориентировочно до 11:00 по их правилам.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid lg:grid-cols-2 gap-8" data-testid="hotels-grid">
        {HOTELS.map((h, i) => (
          <Reveal key={h.name} delay={0.1 * i}>
            <a
              href={h.href}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`hotel-card-${i}`}
              className="group block border border-saffron/25 bg-paper hover:border-saffron/50 transition-colors duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              <div className="overflow-hidden">
                <Image
                  src={h.img}
                  alt={`Отель ${h.name} (${h.city})`}
                  width={1200}
                  height={675}
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="w-full aspect-[16/9] object-cover sepia-[0.2] group-hover:sepia-0 group-hover:scale-[1.04] transition-all duration-[1300ms]"
                />
              </div>
              <div className="p-7 sm:p-9">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-saffron">
                  {h.city}
                </span>
                <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-jade-ink group-hover:text-saffron transition-colors duration-300">
                  {h.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-jade-ink/65">{h.desc}</p>
                <span className="mt-5 inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-2/80 group-hover:text-saffron-2">
                  Сайт отеля →
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Hotel;
