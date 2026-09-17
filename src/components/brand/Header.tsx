"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface HeaderProps {
  onOpenInquiryModal?: () => void;
  /** kept for backward-compat with other pages — editorial header is always dark */
  variant?: "light" | "dark";
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiryModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waUrl = `https://wa.me/212698017323?text=${encodeURIComponent(
    "Hello SafarAtlas, I would like to plan a private Morocco journey."
  )}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#07192d]/95 backdrop-blur-xl border-b border-white/10 py-3 sm:py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-[#07192d]/85 backdrop-blur-md border-b border-white/8 py-4 sm:py-4.5"
      }`}
    >
      <nav className="container-editorial flex items-center justify-between">

        {/* Brand mark */}
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

        {/* Desktop nav links — bare, Taghazout style */}
        <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.28em] text-[#f6f2ec]/65">
          <a href="#manifesto" className="link-sweep hover:text-[#f6f2ec]">
            Our Approach
          </a>
          <a href="#destinations" className="link-sweep hover:text-[#f6f2ec]">
            Escapes
          </a>
          <a href="#compare" className="link-sweep hover:text-[#f6f2ec]">
            Why Us
          </a>
          <a href="#faq" className="link-sweep hover:text-[#f6f2ec]">
            FAQ
          </a>
        </div>

        {/* Primary CTA — desktop */}
        <div className="hidden md:block">
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 bg-[#C4A258] px-7 py-3 text-[10px] uppercase tracking-[0.22em] text-[#07192d] font-normal transition-all duration-300 hover:bg-[#d8bb78] hover:tracking-[0.26em] whitespace-nowrap"
            style={{ boxShadow: "var(--shadow-gold)" }}
          >
            <span className="font-normal">Check Availability</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1 font-light">→</span>
          </a>
        </div>

        {/* Mobile controls: Sticky CTA + Hamburger */}
        <div className="flex items-center gap-2.5 md:hidden">
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#C4A258] px-3.5 py-2 text-[9px] uppercase tracking-[0.18em] text-[#07192d] font-normal"
          >
            <span>Book</span>
            <span className="font-light">→</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#f6f2ec]/70 hover:text-[#C4A258] transition-colors"
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
          <div className="flex flex-col gap-5 text-[11px] uppercase tracking-[0.3em] text-[#f6f2ec]/70">
            <a href="#manifesto" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C4A258] transition-colors">Our Approach</a>
            <a href="#destinations" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C4A258] transition-colors">Escapes</a>
            <a href="#compare" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C4A258] transition-colors">Why SafarAtlas</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C4A258] transition-colors">FAQ</a>
          </div>
          <div className="pt-4 border-t border-white/10">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 bg-[#C4A258] px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-[#07192d] font-normal"
              style={{ boxShadow: "var(--shadow-gold)" }}
            >
              <span className="font-normal">Check Availability</span>
              <span className="font-light">→</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
