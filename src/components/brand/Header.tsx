"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { getStoredJourney } from "../../lib/journeyStore";

interface HeaderProps {
  onOpenInquiryModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiryModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [journeyCount, setJourneyCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Track journey count
    const updateCount = () => {
      const state = getStoredJourney();
      setJourneyCount(state.items.length);
    };
    updateCount();

    window.addEventListener("safaratlas_journey_update", updateCount);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("safaratlas_journey_update", updateCount);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? "bg-[#faf6f0]/95 backdrop-blur-xl shadow-md py-3.5 border-b border-[#e5dacb]" 
        : "bg-[#faf6f0]/60 backdrop-blur-md py-4 border-b border-[#e5dacb]/40"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/">
          <Logo size="md" showTagline={!scrolled} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-[#e5dacb] shadow-xs">
          <a 
            href="#escapes" 
            className="px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-[#121a17] hover:text-[#c95e3d] hover:bg-[#faf6f0] transition-all"
          >
            Escapes
          </a>
          <a 
            href="#destinations" 
            className="px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-[#121a17] hover:text-[#c95e3d] hover:bg-[#faf6f0] transition-all"
          >
            Destinations
          </a>
          <a 
            href="#map-explorer" 
            className="px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-[#121a17] hover:text-[#c95e3d] hover:bg-[#faf6f0] transition-all flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
            Atlas Map
          </a>
          <a 
            href="#how-it-works" 
            className="px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-[#121a17] hover:text-[#c95e3d] hover:bg-[#faf6f0] transition-all"
          >
            How it Works
          </a>
          <Link
            href="/journey"
            className="px-4 py-2 rounded-full text-xs font-bold tracking-wide text-[#123b34] bg-[#123b34]/10 hover:bg-[#123b34] hover:text-white transition-all flex items-center gap-1.5"
          >
            <span>My Journey</span>
            {journeyCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#c95e3d] text-white text-[10px] font-black flex items-center justify-center">
                {journeyCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href="https://wa.me/212698017323?text=Hello%20SafarAtlas!%20I'd%20like%20to%20plan%20a%20Morocco%20trip."
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2.5 rounded-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
            title="Chat with Concierge"
          >
            <span>💬 WhatsApp</span>
          </a>
          <Link
            href="/journey"
            className="px-6 py-2.5 rounded-full bg-[#c95e3d] text-white text-xs font-bold tracking-widest shadow-md hover:bg-[#aa4a2c] transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>Build My Journey</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none flex items-center gap-2"
          aria-label="Toggle menu"
        >
          {journeyCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#c95e3d] text-white text-[10px] font-black flex items-center justify-center">
              {journeyCount}
            </span>
          )}
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 font-bold text-sm">
            <a 
              href="#escapes" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-cream-dark text-slate-900"
            >
              Escapes
            </a>
            <a 
              href="#destinations" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-cream-dark text-slate-900"
            >
              Destinations
            </a>
            <a 
              href="#map-explorer" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-cream-dark text-slate-900 flex items-center justify-between"
            >
              <span>Atlas Map</span>
              <span className="text-xs bg-accent px-2 py-0.5 rounded-full text-slate-900 font-black">Live</span>
            </a>
            <Link
              href="/journey"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-[#123b34]/10 text-[#123b34] font-black flex items-center justify-between"
            >
              <span>My Morocco Journey</span>
              {journeyCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#c95e3d] text-white text-[10px] flex items-center justify-center">
                  {journeyCount}
                </span>
              )}
            </Link>
          </div>
          <div className="pt-4 border-t border-[#e5dacb] flex flex-col gap-2.5">
            <Link
              href="/journey"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-[#c95e3d] text-white text-xs font-bold tracking-widest text-center shadow-md block"
            >
              Build My Morocco Journey
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
