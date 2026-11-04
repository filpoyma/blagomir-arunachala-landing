"use client";

import { Check, Minus } from "lucide-react";
import { Reveal, SectionHead } from "@/components/Reveal";
import { PRICING, TG_LINK } from "@/data/content";
import { scrollToId } from "@/lib/scroll";

const Pricing = () => (
  <section id="pricing" data-testid="pricing-section" className="bg-paper-2 py-24 sm:py-36">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <SectionHead eyebrow="Тарифы и бронирование" title="Стоимость участия" align="center" />

      <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto" data-testid="pricing-cards">
        {PRICING.tariffs.map((t, i) => (
          <Reveal key={t.id} delay={0.1 * i}>
            <article
              data-testid={`pricing-card-${t.id}`}
              className="relative h-full bg-jade p-8 sm:p-10 flex flex-col group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 border border-saffron/15 translate-x-10 -translate-y-10 rotate-45 group-hover:border-saffron/35 transition-colors duration-700" />
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-saffron-2">
                {t.type}
              </span>
              <h3 className="mt-4 font-serif text-2xl text-paper">{t.title}</h3>
              <div className="mt-6 flex items-end gap-3">
                <span className="font-serif text-5xl sm:text-6xl text-paper leading-none">
                  {t.price}
                </span>
                <span className="pb-1 font-mono text-[10px] tracking-[0.2em] uppercase text-paper/45">
                  USD / чел
                </span>
              </div>
              <p className="mt-4 text-sm text-paper/60 leading-relaxed flex-1">{t.desc}</p>
              <p className="mt-5 pt-5 border-t border-saffron/20 font-mono text-[11px] tracking-[0.15em] uppercase text-saffron-2">
                {t.prepay}
              </p>
              <button
                data-testid={`pricing-book-btn-${t.id}`}
                onClick={() => scrollToId("#booking")}
                className="mt-7 w-full py-4 rounded-full border border-saffron/50 text-saffron-2 text-sm font-semibold tracking-wide hover:bg-saffron hover:text-jade-3 transition-colors duration-300"
              >
                Выбрать тариф
              </button>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <p
          className="mt-8 text-center font-mono text-[11px] tracking-[0.2em] uppercase text-jade-ink/55"
          data-testid="pricing-package-note"
        >
          {PRICING.packages}
        </p>
      </Reveal>

      <div className="mt-16 grid sm:grid-cols-2 gap-px bg-saffron/20 border border-saffron/20 max-w-4xl mx-auto">
        <Reveal className="bg-paper-2">
          <div className="p-8 sm:p-10">
            <h4 className="font-serif text-xl text-jade-ink">Включено в стоимость</h4>
            <ul className="mt-6 space-y-4">
              {PRICING.included.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-jade-ink/70 leading-relaxed">
                  <Check size={15} className="text-saffron mt-[3px] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="bg-paper-2">
          <div className="p-8 sm:p-10">
            <h4 className="font-serif text-xl text-jade-ink">Оплачивается отдельно</h4>
            <ul className="mt-6 space-y-4">
              {PRICING.excluded.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-jade-ink/70 leading-relaxed">
                  <Minus size={15} className="text-jade-ink/35 mt-[3px] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-3xl mx-auto text-center text-[13px] leading-relaxed text-jade-ink/55">
          Бронирование — после подтверждения наличия мест и предоплаты 50%. Реквизиты — через{" "}
          <a
            data-testid="pricing-telegram-link"
            href={TG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-saffron underline underline-offset-4 hover:text-jade-ink transition-colors"
          >
            Telegram
          </a>
          . Сроки доплаты и условия отмены сообщаются до платежа.
        </p>
      </Reveal>
    </div>
  </section>
);

export default Pricing;
