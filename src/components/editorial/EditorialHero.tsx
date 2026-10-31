"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export const EditorialHero: React.FC = () => {
  return (
    <header className="relative min-h-[100dvh] w-full overflow-hidden bg-[#07192d] flex flex-col justify-between">
      {/* ── 1. CINEMATIC BACKGROUND CANVAS ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/agafay_hero_editorial.jpg"
          alt="Sunset dusk over Morocco's Agafay desert with mountain backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center animate-kenburns"
        />

        {/* Multi-stop cinematic atmospheric gradients */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#07192d]/90 via-[#07192d]/30 to-[#07192d]/95 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(7,25,45,0.4)_0%,transparent_70%)] pointer-events-none"
          aria-hidden="true"
        />
        {/* Subtle warm desert dusk vignette */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#07192d] via-transparent to-transparent pointer-events-none opacity-80"
          aria-hidden="true"
        />
      </div>

      {/* ── 2. TOP EYEBROW ZONE (Padded below transparent header) ── */}
      <div className="relative z-10 container-editorial pt-28 sm:pt-36">
        <div className="animate-rise inline-flex items-center gap-3">
          <span className="h-px w-8 sm:w-12 bg-[#C4A258]" />
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#C4A258] font-mono">
            Morocco · Signature Private Escapes
          </p>
        </div>
      </div>

      {/* ── 3. BOTTOM EDITORIAL NARRATIVE & LUXURY CTAs ── */}
      <div className="relative z-10 container-editorial pb-12 sm:pb-16 pt-8">
        <div className="max-w-3xl">
          {/* Main Headline — Fluid luxury serif */}
          <h1 className="animate-rise anim-delay-100 font-serif font-normal leading-[1.08] tracking-tight text-[#f6f2ec] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-shadow-deep">
            Private Morocco Journeys,{" "}
            <span className="italic font-normal text-[#f6f2ec]/90 block sm:inline">
              orchestrated chapter by chapter.
            </span>
          </h1>

          {/* Editorial Subtitle */}
          <p
            className="animate-rise anim-delay-200 mt-4 sm:mt-6 max-w-xl font-sans text-sm sm:text-base font-light text-[#f6f2ec]/85 tracking-wide leading-relaxed"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
          >
            Tell us how you want to experience Morocco — we coordinate trusted local scouts, private desert camps, riad stays, and seamless transfers into one bespoke journey.
          </p>

          {/* Luxury CTA Button Pair — Mobile-first wrapped & touch-friendly */}
          <div className="animate-rise anim-delay-300 mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-6">
            <Link
              href="/journey"
              className="group inline-flex items-center justify-center gap-3 bg-[#C4A258] px-8 py-4 text-xs uppercase tracking-[0.25em] text-[#07192d] font-semibold transition-all duration-300 hover:bg-[#d8bb78] hover:tracking-[0.3em] shadow-xl hover:shadow-[#C4A258]/20"
              style={{ boxShadow: "0 10px 30px -5px rgba(196, 162, 88, 0.4), 0 4px 16px rgba(0, 0, 0, 0.5)" }}
            >
              <span>Plan Your Journey</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 font-light">→</span>
            </Link>

            <a
              href="#destinations"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 text-xs uppercase tracking-[0.25em] text-[#f6f2ec]/80 hover:text-[#C4A258] transition-colors border border-white/15 sm:border-none hover:border-[#C4A258]/30 rounded-none text-center font-normal"
            >
              <span>Explore Escapes</span>
              <span className="text-[#C4A258] text-sm">↓</span>
            </a>
          </div>

          {/* Micro Trust Proof Row */}
          <div className="animate-rise anim-delay-400 mt-8 sm:mt-10 flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-2 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#f6f2ec]/55 pt-4 sm:pt-5 border-t border-white/10 font-mono">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4A258]" />
              100% Private Door-to-Door
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4A258]" />
              Dedicated Concierge
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4A258]" />
              Curated Local Scouts
            </span>
          </div>
        </div>
      </div>

      {/* ── 4. SCROLL TICKER (Desktop only, positioned subtly on bottom-right) ── */}
      <div className="pointer-events-none absolute bottom-8 right-8 hidden flex-col items-center gap-3 md:flex z-10">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#f6f2ec]/40 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="block h-10 w-px overflow-hidden bg-[#f6f2ec]/15">
          <span className="block h-full w-full origin-top bg-[#C4A258] animate-scrollline" />
        </span>
      </div>
    </header>
  );
};
