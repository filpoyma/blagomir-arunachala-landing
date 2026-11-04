"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { LogoFull } from "@/components/Logo";

export interface ILegalLayoutProps {
  readonly title: string;
  readonly updated: string;
  readonly children: ReactNode;
  readonly testId: string;
}

const LegalLayout = ({ title, updated, children, testId }: ILegalLayoutProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-jade-3 text-paper" data-testid={testId}>
      <header className="border-b border-saffron/20 bg-jade/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-5 h-[72px] flex items-center justify-between">
          <Link href="/" data-testid={`${testId}-logo-link`} aria-label="На главную">
            <LogoFull />
          </Link>
          <Link
            data-testid={`${testId}-back-link`}
            href="/"
            className="text-xs text-paper/50 hover:text-saffron-2 transition-colors"
          >
            ← На сайт ретрита
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-16 sm:py-20">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-saffron/60" />
          <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-saffron">
            Документ
          </span>
        </div>
        <h1 className="mt-5 font-serif text-3xl sm:text-4xl leading-tight">{title}</h1>
        <p className="mt-3 font-mono text-[11px] tracking-[0.2em] uppercase text-paper/40">
          Редакция от {updated} · утверждается организатором
        </p>
        <div className="mt-10 space-y-9 text-[15px] leading-relaxed text-paper/75 legal-doc">
          {children}
        </div>
      </main>

      <footer className="border-t border-saffron/15 py-8">
        <p className="max-w-3xl mx-auto px-5 text-[12px] text-paper/35">
          © 2026 Школа Дхарма108 · Шива Дева-Парампара. Документ размещён в ознакомительных целях и
          вступает в силу после утверждения организатором и внесения его реквизитов.
        </p>
      </footer>
    </div>
  );
};

export interface IChildrenProps {
  readonly children: ReactNode;
}

export const H = ({ children }: IChildrenProps) => (
  <h2 className="font-serif text-xl text-paper">{children}</h2>
);

export const Placeholder = ({ children }: IChildrenProps) => (
  <span className="text-saffron-2 border-b border-dashed border-saffron/50">{children}</span>
);

export default LegalLayout;
