"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Pillars from "@/components/Pillars";
import Leader from "@/components/Leader";
import Program from "@/components/Program";
import Places from "@/components/Places";
import Hotel from "@/components/Hotel";
import Pricing from "@/components/Pricing";
import Kashi from "@/components/Kashi";
import Faq from "@/components/Faq";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";

export default function KashiArunachalaLanding() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.02 });
    window.__lenis = lenis;
    let rafId = 0;
    const raf = (time: number): void => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="grain bg-jade-3">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Pillars />
        <Leader />
        <Program />
        <Places />
        <Hotel />
        <Pricing />
        <Kashi />
        <Faq />
        <Booking />
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
