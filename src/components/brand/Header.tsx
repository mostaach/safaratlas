"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface HeaderProps {
  onOpenInquiryModal?: () => void;
  /** kept for backward-compat with other pages — editorial header is always dark */
  variant?: "light" | "dark";
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiryModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const waUrl = `https://wa.me/212698017323?text=${encodeURIComponent(
    "Hello SafarAtlas, I would like to plan a private Morocco journey."
  )}`;

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-40 bg-transparent border-none py-6 sm:py-8">
        <nav className="container-editorial flex items-center justify-between">

          {/* Left: Brand mark */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo/safar-atlas-logo.svg"
              alt="SafarAtlas"
              className="w-8 h-8 object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span
                className="font-serif tracking-tight text-[#f6f2ec] text-lg sm:text-xl leading-none font-bold"
              >
                Safar<span className="text-[#C4A258] font-sans font-extrabold group-hover:text-[#d8bb78] transition-colors">Atlas</span>
              </span>
              <span className="text-[8px] uppercase tracking-[0.25em] text-[#f6f2ec]/50 font-sans mt-0.5">
                Morocco Travel
              </span>
            </div>
          </Link>

          {/* Right: Desktop nav links — open, breathable, Taghazout style with no lines */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 text-[11px] uppercase tracking-[0.28em] text-[#f6f2ec]/80 font-normal">
            <a href="/#manifesto" className="link-sweep hover:text-[#f6f2ec] transition-colors">
              The Why
            </a>
            <a href="/#destinations" className="link-sweep hover:text-[#f6f2ec] transition-colors">
              Escapes
            </a>
            <a href="/#availability" className="link-sweep hover:text-[#f6f2ec] transition-colors">
              Availability
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#f6f2ec]/80 hover:text-[#C4A258] transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#07192d]/98 backdrop-blur-xl border-t border-white/10 px-6 py-8 space-y-6">
            <div className="flex flex-col gap-5 text-[11px] uppercase tracking-[0.3em] text-[#f6f2ec]/70 font-normal">
              <a href="/#manifesto" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C4A258] transition-colors">The Why</a>
              <a href="/#destinations" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C4A258] transition-colors">Escapes</a>
              <a href="/#availability" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C4A258] transition-colors">Availability</a>
            </div>
            <div className="pt-4 border-t border-white/10">
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 bg-[#C4A258] px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-[#07192d] font-normal rounded-none"
                style={{ boxShadow: "var(--shadow-gold)" }}
              >
                <span className="font-normal">Check Availability</span>
                <span className="font-light">→</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Floating Sticky CTA — Taghazout luxury style */}
      <aside
        className={`hidden sm:block fixed bottom-8 right-8 z-40 transition-all duration-500 ease-out ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-95 hover:opacity-100 translate-y-0"
        }`}
        aria-label="Floating Booking Action"
      >
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3 bg-[#C4A258] px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] text-[#07192d] font-normal transition-all duration-300 hover:bg-[#d8bb78] hover:tracking-[0.26em] whitespace-nowrap rounded-none shadow-2xl"
          style={{
            boxShadow: "0 10px 30px -5px rgba(196, 162, 88, 0.45), 0 4px 16px rgba(0, 0, 0, 0.6)",
          }}
        >
          <span className="font-normal">Check Availability</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1 font-light">→</span>
        </a>
      </aside>
    </>
  );
};
