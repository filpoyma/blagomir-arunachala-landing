"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal, SectionHead } from "@/components/Reveal";
import { InlineCountdown } from "@/components/Countdown";
import { TG_LINK } from "@/data/content";
import type {
  IBookingFormErrors,
  IBookingFormState,
  TBookingTariff,
} from "@/types/content";

const inputCls =
  "w-full bg-transparent border-b border-paper/25 focus:border-saffron-2 outline-none py-3.5 text-paper placeholder:text-paper/35 text-[15px] transition-colors duration-300";

interface ITariffOption {
  readonly id: TBookingTariff;
  readonly label: string;
  readonly sub: string;
}

const TARIFF_OPTIONS: readonly ITariffOption[] = [
  { id: "twin", label: "Twin — $1 800", sub: "место в двухместном номере" },
  { id: "single", label: "Single — $2 250", sub: "индивидуальный номер" },
];

const Booking = () => {
  const [form, setForm] = useState<IBookingFormState>({
    name: "",
    contact: "",
    tariff: "twin",
    kashi: false,
    visitedIndia: false,
    knowsMaster: false,
    comment: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<IBookingFormErrors>({});
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [sent, setSent] = useState(false);

  const set = <K extends keyof IBookingFormState>(
    k: K,
    v: IBookingFormState[K]
  ): void => {
    setForm((f) => ({ ...f, [k]: v }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const errs: IBookingFormErrors = {};
    if (!form.name.trim()) errs.name = "Укажите имя";
    if (!form.contact.trim()) errs.contact = "Укажите способ связи";
    if (!form.consent) errs.consent = "Нужно согласие на обработку данных";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    setServerError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          contact: form.contact.trim(),
          tariff: form.tariff,
          kashi: form.kashi,
          visitedIndia: form.visitedIndia,
          knowsMaster: form.knowsMaster,
          comment: form.comment.trim(),
          website: form.website,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
    } catch {
      setServerError(
        "Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в Telegram."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="booking"
      data-testid="booking-section"
      className="relative bg-jade py-24 sm:py-36 overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full border border-saffron/10 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[520px] h-[520px] rounded-full border border-saffron/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="Оставить заявку" title="Забронировать участие" dark />
          <Reveal delay={0.12}>
            <p className="mt-8 text-base font-light leading-relaxed text-paper/70">
              После подачи заявки мы лично подтвердим наличие мест, пришлём условия и реквизиты
              для предоплаты 50%. Депозит является невозвратным.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <a
              data-testid="booking-telegram-link"
              href={TG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 group"
            >
              <span className="w-12 h-12 rounded-full border border-saffron/50 flex items-center justify-center group-hover:bg-saffron transition-colors duration-300">
                <ArrowUpRight
                  size={18}
                  className="text-saffron-2 group-hover:text-jade-3 transition-colors duration-300"
                />
              </span>
              <span>
                <span className="block text-sm text-paper">Telegram организатора</span>
                <span className="block mt-0.5 font-mono text-[11px] text-paper/50">
                  @blagomir_dharma
                </span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-12 space-y-3 font-mono text-[11px] tracking-[0.2em] uppercase text-saffron-2">
              <p>2–12 января 2027 · Тируваннамалай</p>
              <p>13–16 января 2027 · Варанаси</p>
              <p className="pt-2 max-w-xs normal-case tracking-normal text-[15px] font-light leading-relaxed">
                За 3 недели до начала стоимость увеличится на $200
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <InlineCountdown />
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="thanks"
                data-testid="booking-success"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="border border-saffron/40 bg-jade-2/60 p-10 sm:p-14 text-center"
              >
                <span className="mx-auto w-14 h-14 rounded-full border border-saffron flex items-center justify-center">
                  <Check size={22} className="text-saffron-2" />
                </span>
                <h3 className="mt-8 font-serif text-3xl text-paper">Заявка принята</h3>
                <p className="mt-4 max-w-md mx-auto text-sm leading-relaxed text-paper/65">
                  Спасибо, {form.name.trim().split(" ")[0] || "друг"}. Заявка сохранена, и мы
                  свяжемся с вами лично: подтвердим наличие мест, условия и реквизиты предоплаты.
                  Это не автоматическое закрепление места.
                </p>
                <a
                  data-testid="booking-success-telegram-link"
                  href={TG_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block px-8 py-4 rounded-full bg-saffron text-jade-3 text-sm font-semibold tracking-wide hover:bg-terracotta transition-colors duration-300"
                >
                  Написать в Telegram
                </a>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                data-testid="booking-form"
                onSubmit={submit}
                exit={{ opacity: 0, y: -16 }}
                className="space-y-8"
                noValidate
              >
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                />
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="bk-name"
                      className="font-mono text-[10px] tracking-[0.3em] uppercase text-saffron-2"
                    >
                      Имя и фамилия *
                    </label>
                    <input
                      id="bk-name"
                      data-testid="booking-name-input"
                      className={inputCls}
                      placeholder="Как к вам обращаться"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                    />
                    {errors.name && (
                      <p data-testid="booking-name-error" className="mt-2 text-xs text-red-300">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="bk-contact"
                      className="font-mono text-[10px] tracking-[0.3em] uppercase text-saffron-2"
                    >
                      TG / WA / E-mail *
                    </label>
                    <input
                      id="bk-contact"
                      data-testid="booking-contact-input"
                      className={inputCls}
                      placeholder="Удобный способ связи"
                      value={form.contact}
                      onChange={(e) => set("contact", e.target.value)}
                    />
                    {errors.contact && (
                      <p data-testid="booking-contact-error" className="mt-2 text-xs text-red-300">
                        {errors.contact}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-saffron-2">
                    Размещение
                  </span>
                  <div className="mt-4 grid sm:grid-cols-2 gap-4">
                    {TARIFF_OPTIONS.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        data-testid={`booking-tariff-${t.id}`}
                        onClick={() => set("tariff", t.id)}
                        className={`text-left p-5 border transition-all duration-300 ${
                          form.tariff === t.id
                            ? "border-saffron bg-saffron/10"
                            : "border-paper/20 hover:border-paper/40"
                        }`}
                      >
                        <span
                          className={`block font-serif text-xl ${
                            form.tariff === t.id ? "text-saffron-2" : "text-paper"
                          }`}
                        >
                          {t.label}
                        </span>
                        <span className="block mt-1 text-xs text-paper/50">{t.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  {(
                    [
                      {
                        key: "kashi",
                        testId: "booking-kashi-toggle",
                        label:
                          "Интересует продолжение в Варанаси «Каши: за пределами времени» (13–16 января, +$1 100)",
                      },
                      {
                        key: "visitedIndia",
                        testId: "booking-visited-india-toggle",
                        label: "Я уже был(а) в Индии",
                      },
                      {
                        key: "knowsMaster",
                        testId: "booking-knows-master-toggle",
                        label: "Я знаком(а) с мастером",
                      },
                    ] as const
                  ).map((item) => (
                    <label
                      key={item.key}
                      data-testid={item.testId}
                      className="flex items-start gap-4 cursor-pointer group"
                    >
                      <span
                        role="checkbox"
                        aria-checked={form[item.key]}
                        tabIndex={0}
                        onClick={() => set(item.key, !form[item.key])}
                        onKeyDown={(e) => {
                          if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            set(item.key, !form[item.key]);
                          }
                        }}
                        className={`mt-0.5 w-5 h-5 shrink-0 border flex items-center justify-center transition-colors duration-300 ${
                          form[item.key]
                            ? "bg-saffron border-saffron"
                            : "border-paper/40 group-hover:border-saffron"
                        }`}
                      >
                        {form[item.key] && <Check size={12} className="text-jade-3" />}
                      </span>
                      <span
                        className="text-sm text-paper/75 leading-relaxed"
                        onClick={() => set(item.key, !form[item.key])}
                      >
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>

                <div>
                  <label
                    htmlFor="bk-comment"
                    className="font-mono text-[10px] tracking-[0.3em] uppercase text-saffron-2"
                  >
                    Комментарий
                  </label>
                  <textarea
                    id="bk-comment"
                    data-testid="booking-comment-input"
                    rows={3}
                    className={`${inputCls} resize-none`}
                    placeholder="Вопросы, пожелания, опыт практики"
                    value={form.comment}
                    onChange={(e) => set("comment", e.target.value)}
                  />
                </div>

                <div>
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <span
                      data-testid="booking-consent-checkbox"
                      role="checkbox"
                      aria-checked={form.consent}
                      tabIndex={0}
                      onClick={() => set("consent", !form.consent)}
                      onKeyDown={(e) => e.key === " " && set("consent", !form.consent)}
                      className={`mt-0.5 w-5 h-5 shrink-0 border flex items-center justify-center transition-colors duration-300 ${
                        form.consent
                          ? "bg-saffron border-saffron"
                          : "border-paper/40 group-hover:border-saffron"
                      }`}
                    >
                      {form.consent && <Check size={12} className="text-jade-3" />}
                    </span>
                    <span className="text-xs text-paper/55 leading-relaxed">
                      Даю согласие на обработку персональных данных в соответствии с{" "}
                      <a
                        data-testid="booking-privacy-link"
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-saffron-2 underline underline-offset-4 hover:text-paper transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        политикой обработки персональных данных
                      </a>
                      .
                    </span>
                  </label>
                  {errors.consent && (
                    <p data-testid="booking-consent-error" className="mt-2 text-xs text-red-300">
                      {errors.consent}
                    </p>
                  )}
                </div>

                {serverError && (
                  <p
                    data-testid="booking-server-error"
                    className="text-sm text-red-300 border border-red-300/30 bg-red-300/10 px-5 py-4"
                  >
                    {serverError}
                  </p>
                )}

                <button
                  data-testid="booking-submit-btn"
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto px-12 py-5 rounded-full bg-saffron text-jade-3 font-semibold text-sm tracking-wide hover:bg-terracotta transition-colors duration-300 disabled:opacity-50 disabled:cursor-wait"
                >
                  {sending ? "Отправляем…" : "Отправить заявку"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Booking;
