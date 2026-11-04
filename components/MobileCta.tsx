"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToId } from "@/lib/scroll";

const MobileCta = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const booking = document.querySelector("#booking");
      const bookingTop = booking ? booking.getBoundingClientRect().top : Infinity;
      setVisible(window.scrollY > window.innerHeight * 0.7 && bookingTop > 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-testid="mobile-sticky-cta"
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-jade/90 backdrop-blur-xl border-t border-saffron/25 px-5 py-3 flex items-center justify-between gap-4"
        >
          <div className="leading-tight">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-2">
              2–12 янв 2027
            </div>
            <div className="text-xs text-paper/70 mt-0.5">от $1 800 · предоплата 50%</div>
          </div>
          <button
            data-testid="mobile-sticky-book-btn"
            onClick={() => scrollToId("#booking")}
            className="shrink-0 px-6 py-3 rounded-full bg-saffron text-jade-3 text-sm font-semibold hover:bg-terracotta transition-colors"
          >
            Забронировать
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileCta;
