"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// 12 Dec 2026, 00:00 MSK — надбавка +$200 к размещению (см. lib/telegram-booking.ts)
const PRICE_INCREASE_AT = Date.parse("2026-12-12T00:00:00+03:00");

interface ICountdownValue {
  readonly done: boolean;
  readonly d: number;
  readonly h: number;
  readonly m: number;
  readonly s: number;
}

const INITIAL_COUNTDOWN: ICountdownValue = {
  done: false,
  d: 0,
  h: 0,
  m: 0,
  s: 0,
};

const calc = (now: number): ICountdownValue => {
  const diff = Math.max(0, PRICE_INCREASE_AT - now);
  return {
    done: diff === 0,
    d: Math.floor(diff / 86400000),
    h: Math.floor(diff / 3600000) % 24,
    m: Math.floor(diff / 60000) % 60,
    s: Math.floor(diff / 1000) % 60,
  };
};

const useCountdown = (): ICountdownValue => {
  const [t, setT] = useState<ICountdownValue>(INITIAL_COUNTDOWN);

  useEffect(() => {
    const update = () => setT(calc(Date.now()));
    const rafId = requestAnimationFrame(update);
    const intervalId = setInterval(update, 1000);
    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(intervalId);
    };
  }, []);

  return t;
};

interface IStartedProps {
  readonly testId: string;
  readonly className?: string;
}

const AfterPriceIncrease = ({ testId, className = "" }: IStartedProps) => (
  <p data-testid={testId} className={`font-serif italic text-saffron-2 ${className}`}>
    С 12 декабря размещение дороже на $200 · успейте по текущему тарифу
  </p>
);

interface IDigitProps {
  readonly value: number;
  readonly label: string;
  readonly testId: string;
}

const Digit = ({ value, label, testId }: IDigitProps) => {
  const v = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center min-w-0 flex-1">
      <div className="relative h-[1.15em] overflow-hidden font-serif text-saffron-2 text-[9vw] sm:text-5xl leading-none tabular-nums [text-shadow:0_0_18px_rgba(242,169,59,0.45)]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={v}
            data-testid={testId}
            className="block"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {v}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-paper/55">
        {label}
      </span>
    </div>
  );
};

type TUnitTuple = readonly [number, string, string];

export const HeroCountdown = () => {
  const t = useCountdown();
  if (t.done) return <AfterPriceIncrease testId="hero-countdown-started" className="text-2xl" />;
  const units: readonly TUnitTuple[] = [
    [t.d, "дней", "d"],
    [t.h, "часов", "h"],
    [t.m, "минут", "m"],
    [t.s, "секунд", "s"],
  ];
  return (
    <div data-testid="hero-countdown" className="w-full max-w-md">
      <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-paper/60 mb-4">
        До повышения цены
      </p>
      <div className="flex items-start">
        {units.map(([val, label, k], i) => (
          <div key={k} className="flex items-start flex-1 min-w-0">
            <Digit value={val} label={label} testId={`hero-countdown-${k}`} />
            {i < units.length - 1 && (
              <span className="self-stretch w-px bg-saffron/25 mx-1 sm:mx-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const InlineCountdown = () => {
  const t = useCountdown();
  if (t.done) return <AfterPriceIncrease testId="booking-countdown-started" className="text-lg mb-8" />;
  return (
    <div
      data-testid="booking-countdown"
      className="mb-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-saffron/25 pb-4"
    >
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-paper/55">
        До повышения —
      </span>
      <span className="font-serif text-xl text-saffron-2 tabular-nums [text-shadow:0_0_14px_rgba(242,169,59,0.35)]">
        {t.d} дней {t.h} ч {String(t.m).padStart(2, "0")} мин
      </span>
    </div>
  );
};
