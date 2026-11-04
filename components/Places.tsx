"use client";

import { Reveal, SectionHead } from "@/components/Reveal";
import { PLACES } from "@/data/content";

const Places = () => (
  <section data-testid="places-section" className="bg-jade py-24 sm:py-36">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <SectionHead eyebrow="Места силы и паломничества" title="Святыни Тируваннамалая" dark />

      <div className="mt-16 grid sm:grid-cols-2 gap-6 sm:gap-8" data-testid="places-grid">
        {PLACES.map((p, i) => (
          <Reveal key={p.name} delay={0.08 * i} className={i % 2 === 1 ? "sm:mt-14" : ""}>
            <figure className="group relative overflow-hidden">
              <div className="overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover sepia-[0.3] saturate-[0.85] group-hover:sepia-0 group-hover:saturate-100 group-hover:scale-[1.05] transition-all duration-[1400ms] ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-jade-3/85 via-jade-3/10 to-transparent pointer-events-none" />
              <figcaption className="absolute bottom-0 inset-x-0 p-6 sm:p-8">
                <span className="font-mono text-[10px] tracking-[0.3em] text-saffron-2">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-serif text-2xl sm:text-3xl text-paper">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/70 max-w-md opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {p.desc}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-12 max-w-2xl text-[13px] leading-relaxed text-paper/45">
          В публичных храмах и ашрамах группа следует их внутреннему распорядку: без громких
          собственных церемоний и без съёмки там, где она запрещена. Доступ к объектам зависит от
          местных правил и погоды.
        </p>
      </Reveal>
    </div>
  </section>
);

export default Places;
