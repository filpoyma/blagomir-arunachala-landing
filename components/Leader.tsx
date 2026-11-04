"use client";

import { Check } from "lucide-react";
import { Reveal, SectionHead } from "@/components/Reveal";
import { LEADER, IMAGES } from "@/data/content";

const Leader = () => (
  <section data-testid="leader-section" className="bg-paper-2 py-24 sm:py-36 overflow-hidden">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-14 items-center">
      <Reveal className="lg:col-span-5 relative">
        <div className="relative max-w-md">
          <div className="relative">
            <div
              data-testid="leader-photo-frame"
              className="absolute -inset-3 sm:-inset-5 border border-saffron/40 pointer-events-none"
            />
            <div className="relative overflow-hidden">
              <img
                src={IMAGES.leader}
                alt={LEADER.name}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover hover:scale-[1.03] transition-all duration-[1200ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-jade-3/50 via-transparent to-transparent" />
            </div>
          </div>
          <div className="mt-8 sm:mt-10 font-mono text-[10px] tracking-[0.3em] uppercase text-jade-ink/50">
            Свами Благомир Шиванатха Тапасви
          </div>
        </div>
      </Reveal>

      <div className="lg:col-span-7">
        <SectionHead eyebrow="Хранитель традиции" title="О ведущем ретрита" />
        <Reveal delay={0.1}>
          <h3 className="mt-8 font-serif text-2xl sm:text-3xl text-jade-ink">{LEADER.name}</h3>
          <p className="mt-2 font-mono text-[11px] tracking-[0.25em] uppercase text-saffron">
            {LEADER.role}
          </p>
          <p className="mt-6 text-base leading-relaxed text-jade-ink/75 max-w-xl">{LEADER.bio}</p>
        </Reveal>
        <div className="mt-10 space-y-4">
          {LEADER.principles.map((p, i) => (
            <Reveal key={i} delay={0.08 * i}>
              <div className="flex items-start gap-4 border-b border-jade/10 pb-4">
                <span className="mt-1 shrink-0 w-5 h-5 rounded-full border border-saffron flex items-center justify-center">
                  <Check size={11} className="text-saffron" />
                </span>
                <p className="text-sm leading-relaxed text-jade-ink/70">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Leader;
