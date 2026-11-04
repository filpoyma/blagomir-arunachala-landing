"use client";

import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { TG_LINK } from "@/data/content";

const Footer = () => (
  <footer data-testid="site-footer" className="bg-jade-3 border-t border-saffron/15 py-16">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <LogoMark />
            <div>
              <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-saffron-2">
                Шива Дева-Парампара
              </div>
              <div className="font-serif text-lg text-paper mt-1">Школа Дхарма108</div>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/50">
            Авторский дхарма-ретрит «Аруначала. Путь к Источнику» и продолжение
            «Каши: за пределами времени». Ведущий — Свами Благомир Шиванатха Тапасви.
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-mono text-[10px] tracking-[0.3em] uppercase text-saffron">
            Даты и место
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-paper/60">
            <li>2–12 января 2027 · Тируваннамалай</li>
            <li>12 января · трансферный день</li>
            <li>13–16 января 2027 · Варанаси</li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-mono text-[10px] tracking-[0.3em] uppercase text-saffron">
            Связь и документы
          </h4>
          <a
            data-testid="footer-telegram-link"
            href={TG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-sm text-paper/80 hover:text-saffron-2 transition-colors"
          >
            Telegram: @blagomir_dharma
          </a>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              data-testid="footer-privacy-link"
              href="/privacy"
              className="text-sm text-paper/50 hover:text-saffron-2 transition-colors"
            >
              Политика обработки персональных данных
            </Link>
            <Link
              data-testid="footer-offer-link"
              href="/oferta"
              className="text-sm text-paper/50 hover:text-saffron-2 transition-colors"
            >
              Публичная оферта и условия возврата
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-14 pt-8 border-t border-saffron/10 flex flex-col sm:flex-row justify-end">
        <p className="text-[12px] text-paper/35">
          © 2026 Школа Дхарма108 · Шива Дева-Парампара
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
