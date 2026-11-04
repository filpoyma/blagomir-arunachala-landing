"use client";

export interface ILogoMarkProps {
  readonly className?: string;
}

export const LogoMark = ({ className = "w-9 h-9" }: ILogoMarkProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <path
      d="M8 42V25C8 13.4 15.2 5 24 5s16 8.4 16 20v17"
      stroke="#AE8650"
      strokeWidth="2"
    />
    <ellipse cx="24" cy="27" rx="4.4" ry="8.4" stroke="#C9A15F" strokeWidth="1.8" />
    <path d="M11 42h26" stroke="#AE8650" strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="10.5" r="1.6" fill="#C9A15F" />
  </svg>
);

export interface ILogoFullProps {
  readonly light?: boolean;
}

export const LogoFull = ({ light = true }: ILogoFullProps) => (
  <div className="flex items-center gap-3" data-testid="brand-logo">
    <LogoMark />
    <div className="leading-none">
      <div
        className={`font-mono text-[10px] tracking-[0.35em] uppercase ${
          light ? "text-saffron-2" : "text-saffron"
        }`}
      >
        Дхарма108
      </div>
      <div
        className={`font-serif text-lg mt-1 tracking-wide ${
          light ? "text-paper" : "text-jade-ink"
        }`}
      >
        Шива Дева-Парампара
      </div>
    </div>
  </div>
);
