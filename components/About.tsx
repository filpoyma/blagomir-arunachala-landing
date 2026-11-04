"use client";

import { Reveal, SectionHead } from "@/components/Reveal";
import { MEANING_TEXT, FOR_WHOM } from "@/data/content";

const About = () => (
  <section id="about" data-testid="about-section" className="bg-paper py-24 sm:py-36">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-14 lg:gap-10">
      <div className="lg:col-span-5">
        <SectionHead eyebrow="О ретрите" title="В чём смысл этого пути" />
        <Reveal delay={0.15}>
          <div className="mt-10 flex items-end gap-3 select-none">
            <span className="font-serif text-7xl sm:text-8xl leading-none text-outline-saffron">
              11
            </span>
            <div className="pb-2 font-mono text-[11px] tracking-[0.25em] uppercase text-jade-ink/60">
              дней
              <br />
              садханы
            </div>
          </div>
        </Reveal>
      </div>
      <div className="lg:col-span-7 lg:pt-16">
        <Reveal delay={0.1}>
          <p className="font-serif text-xl sm:text-2xl leading-relaxed text-jade-ink/90 first-letter:text-6xl first-letter:font-serif first-letter:text-saffron first-letter:mr-3 first-letter:float-left first-letter:leading-[0.85]">
            {MEANING_TEXT}
          </p>
        </Reveal>

        <div
          className="mt-16 grid sm:grid-cols-2 gap-px bg-saffron/20 border border-saffron/20"
          data-testid="for-whom-grid"
        >
          {FOR_WHOM.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * i} className="bg-paper">
              <div className="p-7 sm:p-8 h-full group hover:bg-paper-2 transition-colors duration-500">
                <div className="font-mono text-[10px] tracking-[0.3em] text-saffron">
                  0{i + 1}
                </div>
                <h3 className="mt-4 font-serif text-xl text-jade-ink group-hover:text-saffron transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-jade-ink/65">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
