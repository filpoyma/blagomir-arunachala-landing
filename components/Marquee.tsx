"use client";

import { MARQUEE_ITEMS } from "@/data/content";

const Row = () => (
  <div className="flex shrink-0 items-center">
    {MARQUEE_ITEMS.map((item, i) => (
      <span key={i} className="flex items-center">
        <span className="font-serif text-2xl sm:text-3xl text-saffron-2/90 italic whitespace-nowrap px-8">
          {item}
        </span>
        <svg width="14" height="14" viewBox="0 0 14 14" className="text-saffron/60 shrink-0">
          <path
            d="M7 0 L8.6 5.4 L14 7 L8.6 8.6 L7 14 L5.4 8.6 L0 7 L5.4 5.4 Z"
            fill="currentColor"
          />
        </svg>
      </span>
    ))}
  </div>
);

const Marquee = () => (
  <div
    data-testid="editorial-marquee"
    className="relative overflow-hidden border-y border-saffron/20 bg-jade py-6"
  >
    <div className="flex w-max animate-marquee will-change-transform">
      <Row />
      <Row />
    </div>
  </div>
);

export default Marquee;
