"use client";

import { Reveal, SectionHead } from "@/components/Reveal";
import { PILLARS } from "@/data/content";

const Pillars = () => (
  <section data-testid="pillars-section" className="bg-jade py-24 sm:py-36">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <SectionHead eyebrow="Фундамент практики" title="Пять опор ретрита" dark />
        <Reveal delay={0.15}>
          <p className="max-w-sm text-sm leading-relaxed text-paper/55">
            Каждый день держится на понятном ритме: утренняя садхана, главный выезд или обучение,
            восстановление, вечерний сатсанг и дневник.
          </p>
        </Reveal>
      </div>

      <div
        className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-saffron/15"
        data-testid="pillars-grid"
      >
        {PILLARS.map((p, i) => (
          <Reveal key={p.num} delay={0.07 * i} className="border-b border-r border-saffron/15">
            <div className="group p-7 sm:p-8 h-full min-h-[260px] flex flex-col justify-between hover:bg-jade-2 transition-colors duration-500">
              <span
                className="font-serif text-5xl text-outline-saffron group-hover:text-saffron-2 transition-colors duration-500"
                style={{ WebkitTextStroke: undefined }}
              >
                {p.num}
              </span>
              <div className="mt-10">
                <h3 className="font-serif text-2xl text-paper">{p.name}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-paper/55">{p.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Pillars;
