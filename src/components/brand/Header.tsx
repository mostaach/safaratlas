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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080c10]/95 backdrop-blur-xl border-b border-white/8 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="container-editorial flex items-center justify-between">

        {/* Brand mark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-px w-8 bg-[#d6b78a] transition-all duration-500 group-hover:w-12" />
          <span
            className="font-serif italic tracking-wide text-[#f6f2ec]/90 transition-colors duration-300 group-hover:text-[#d6b78a]"
            style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)" }}
          >
            SafarAtlas
          </span>
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

        {/* Primary CTA — exact Taghazout gold flat button */}
        <div className="hidden md:block">
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 bg-[#d6b78a] px-8 py-3.5 text-[10px] uppercase tracking-[0.3em] text-[#080c10] font-semibold transition-all duration-300 hover:bg-[#e2c79d] hover:tracking-[0.35em]"
            style={{ boxShadow: "var(--shadow-gold)" }}
          >
            <span>Check Availability</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#f6f2ec]/70 hover:text-[#d6b78a] transition-colors"
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
      </nav>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080c10]/98 backdrop-blur-xl border-t border-white/10 px-6 py-8 space-y-6">
          <div className="flex flex-col gap-5 text-[11px] uppercase tracking-[0.3em] text-[#f6f2ec]/70">
            <a href="#manifesto" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d6b78a] transition-colors">Our Approach</a>
            <a href="#destinations" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d6b78a] transition-colors">Escapes</a>
            <a href="#compare" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d6b78a] transition-colors">Why SafarAtlas</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d6b78a] transition-colors">FAQ</a>
          </div>
          <div className="pt-4 border-t border-white/10">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 bg-[#d6b78a] px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-[#080c10] font-semibold"
              style={{ boxShadow: "var(--shadow-gold)" }}
            >
              <span>Check Availability</span>
              <span>→</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
