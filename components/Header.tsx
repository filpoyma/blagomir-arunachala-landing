"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LogoFull } from "@/components/Logo";
import { NAV_LINKS } from "@/data/content";
import { scrollToId } from "@/lib/scroll";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string): void => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <>
      <header
        data-testid="site-header"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-jade/85 backdrop-blur-xl border-b border-saffron/20"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
          <a
            href="#"
            data-testid="header-logo-btn"
            onClick={(e) => {
              e.preventDefault();
              window.__lenis?.scrollTo(0, { duration: 1.4 });
            }}
            className="shrink-0"
            aria-label="Наверх"
          >
            <LogoFull />
          </a>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Основная навигация">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`nav-link-${l.href.slice(1)}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
                className="text-[13px] tracking-wide text-paper/75 hover:text-saffron-2 transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#booking"
              data-testid="nav-book-btn"
              onClick={(e) => {
                e.preventDefault();
                go("#booking");
              }}
              className="ml-2 px-5 py-2.5 rounded-full bg-saffron text-jade-3 text-[13px] font-semibold tracking-wide hover:bg-terracotta transition-colors duration-300"
            >
              Бронь
            </a>
          </nav>

          <button
            data-testid="mobile-menu-btn"
            className="lg:hidden text-paper p-2"
            onClick={() => setOpen(true)}
            aria-label="Открыть меню"
          >
            <Menu size={26} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70] bg-jade-3/97 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 h-[72px]">
              <LogoFull />
              <button
                data-testid="mobile-menu-close-btn"
                className="text-paper p-2"
                onClick={() => setOpen(false)}
                aria-label="Закрыть меню"
              >
                <X size={26} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-1" aria-label="Мобильная навигация">
              {[...NAV_LINKS, { label: "Бронь", href: "#booking" }].map((l, i) => (
                <motion.a
                  key={l.href + l.label}
                  href={l.href}
                  data-testid={`mobile-nav-link-${l.href.slice(1)}`}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.5 }}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  className="text-left font-serif text-3xl text-paper/90 hover:text-saffron-2 py-3 border-b border-saffron/10 transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <p className="px-8 pb-10 font-mono text-[11px] tracking-[0.3em] uppercase text-saffron/70">
              2–12 января 2027 · Тируваннамалай
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
