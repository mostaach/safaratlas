"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { getStoredJourney } from "../../lib/journeyStore";
import { WhatsAppButton } from "../ui/WhatsAppButton";

interface HeaderProps {
  onOpenInquiryModal?: () => void;
  variant?: "light" | "dark";
}

export const Header: React.FC<HeaderProps> = ({ variant = "light" }) => {
  const isDark = variant === "dark";
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

  const headerBg = isDark
    ? scrolled
      ? "bg-[#080c10]/95 backdrop-blur-xl shadow-2xl py-3.5 border-b border-white/10"
      : "bg-[#080c10]/75 backdrop-blur-md py-4 border-b border-white/10"
    : scrolled
      ? "bg-[#faf6f0]/95 backdrop-blur-xl shadow-md py-3.5 border-b border-[#e5dacb]"
      : "bg-[#faf6f0]/60 backdrop-blur-md py-4 border-b border-[#e5dacb]/40";

  const navContainerBg = isDark
    ? "bg-white/10 backdrop-blur-md border-white/15 text-white/90"
    : "bg-white/90 backdrop-blur-md border-[#e5dacb] text-[#121a17]";

  const navLinkClass = isDark
    ? "px-4 py-2.5 rounded-full text-sm font-semibold tracking-wide text-white/80 hover:text-[#f4c36b] hover:bg-white/10 transition-all"
    : "px-4 py-2.5 rounded-full text-sm font-semibold tracking-wide text-[#121a17] hover:text-[#c95e3d] hover:bg-[#faf6f0] transition-all";

  const myJourneyClass = isDark
    ? "px-4 py-2.5 rounded-full text-sm font-bold tracking-wide text-[#f4c36b] bg-[#f4c36b]/15 hover:bg-[#f4c36b] hover:text-[#080c10] transition-all flex items-center gap-1.5"
    : "px-4 py-2.5 rounded-full text-sm font-bold tracking-wide text-[#123b34] bg-[#123b34]/10 hover:bg-[#123b34] hover:text-white transition-all flex items-center gap-1.5";

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/">
          <Logo variant={isDark ? "light" : "dark"} size="md" showTagline={!scrolled} />
        </Link>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center gap-1.5 p-1.5 rounded-full border shadow-xs ${navContainerBg}`}>
          <Link 
            href="/#itineraries" 
            className={navLinkClass}
          >
            Sample Route
          </Link>
          <Link 
            href="/#escapes" 
            className={navLinkClass}
          >
            Escapes
          </Link>
          <Link 
            href="/#destinations" 
            className={navLinkClass}
          >
            Destinations
          </Link>
          <Link 
            href="/#how-it-works" 
            className={navLinkClass}
          >
            How it Works
          </Link>
          <Link
            href="/journey"
            className={myJourneyClass}
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
          <WhatsAppButton />
          <Link
            href="/journey"
            className="px-6 py-3 rounded-full bg-[#c95e3d] text-white text-sm font-bold tracking-wide shadow-md hover:bg-[#aa4a2c] transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>Plan My Trip</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-xl border focus:outline-none flex items-center gap-2 ${
            isDark ? "bg-white/10 border-white/20 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}
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
        <div className={`md:hidden px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-200 ${
          isDark ? "bg-[#080c10] border-b border-white/15 text-white" : "bg-[#faf6f0] border-b border-[#e5dacb] text-[#121a17]"
        }`}>
          <div className="flex flex-col space-y-3 font-bold text-sm">
            <Link 
              href="/#itineraries" 
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg ${isDark ? "hover:bg-white/10 text-white" : "hover:bg-[#ebdccb] text-[#121a17]"}`}
            >
              Sample Route
            </Link>
            <Link 
              href="/#escapes" 
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg ${isDark ? "hover:bg-white/10 text-white" : "hover:bg-[#ebdccb] text-[#121a17]"}`}
            >
              Escapes
            </Link>
            <Link 
              href="/#destinations" 
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg ${isDark ? "hover:bg-white/10 text-white" : "hover:bg-[#ebdccb] text-[#121a17]"}`}
            >
              Destinations
            </Link>
            <Link
              href="/journey"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg font-black flex items-center justify-between ${
                isDark ? "bg-[#f4c36b]/15 text-[#f4c36b]" : "bg-[#123b34]/10 text-[#123b34]"
              }`}
            >
              <span>My Morocco Journey</span>
              {journeyCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#c95e3d] text-white text-[10px] flex items-center justify-center">
                  {journeyCount}
                </span>
              )}
            </Link>
          </div>
          <div className={`pt-4 border-t ${isDark ? "border-white/10" : "border-[#e5dacb]"} flex flex-col gap-2.5`}>
            <div className="flex items-center justify-center">
              <WhatsAppButton />
            </div>
            <Link
              href="/journey"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-[#c95e3d] text-white text-xs font-bold tracking-widest text-center shadow-md block"
            >
              Plan My Morocco Trip
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
