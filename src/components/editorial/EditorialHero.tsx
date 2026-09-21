"use client";

import React from "react";
import Image from "next/image";

export const EditorialHero: React.FC = () => {
  return (
    <header className="relative min-h-[100svh] w-full overflow-hidden bg-[#07192d]">

      {/* Background image with Ken Burns drift */}
      <div className="absolute inset-0">
        <Image
          src="/safaratlas_hero_typography.jpg"
          alt="Atmospheric dusk across Morocco's Agafay desert with monumental Safar Atlas typography"
          fill
          priority
          sizes="100vw"
          className="object-cover animate-kenburns"
        />
        {/* Refined gradient overlay — preserves middle horizon and AGAFAY typography */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07192d]/80 via-transparent to-[#07192d]/95 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(7,25,45,0.4)_0%,transparent_60%)] pointer-events-none" />
      </div>

      {/* Hero content — tailored so AGAFAY horizon typography is completely unobstructed */}
      <div className="relative z-10 container-editorial flex min-h-[100svh] flex-col justify-between pt-24 pb-8 sm:pb-12">
        {/* Top Eyebrow */}
        <div className="animate-rise">
          <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[#C4A258]">
            <span className="h-px w-10 bg-[#C4A258]" />
            Morocco · Signature Private Escapes
          </p>
        </div>

        {/* Clear center aperture for AGAFAY typography */}
        <div className="flex-1 min-h-[180px] sm:min-h-[240px] pointer-events-none" aria-hidden="true" />

        {/* Bottom Editorial Content & Actions — positioned below the AGAFAY typography */}
        <div className="max-w-2xl backdrop-blur-md bg-[#07192d]/70 p-6 sm:p-7 rounded-none border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          <h1
            className="animate-rise anim-delay-100 font-serif font-medium leading-[1.05] tracking-tight text-[#f6f2ec] text-shadow-deep text-2xl sm:text-3xl md:text-4xl"
          >
            Morocco, orchestrated{" "}
            <span className="italic text-[#f6f2ec]/95">chapter by chapter.</span>
          </h1>

          <p
            className="animate-rise anim-delay-200 mt-3 max-w-xl font-sans text-xs sm:text-sm font-light text-[#f6f2ec]/80 tracking-wide"
            style={{ lineHeight: 1.6 }}
          >
            Tell us how you want to experience Morocco — we coordinate trusted local partners, private transfers, stays and experiences into one seamless journey.
          </p>

          <div className="animate-rise anim-delay-300 mt-5 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="/journey"
              className="group inline-flex items-center gap-3 bg-[#C4A258] px-7 py-3.5 text-xs uppercase tracking-[0.3em] text-[#07192d] transition-all duration-300 hover:bg-[#d8bb78] hover:tracking-[0.35em] font-normal"
              style={{ boxShadow: "var(--shadow-gold)" }}
            >
              <span>Plan My Morocco Journey</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <a
              href="#destinations"
              className="link-sweep text-xs uppercase tracking-[0.3em] text-[#f6f2ec]/80 hover:text-[#f6f2ec]"
            >
              Explore Escapes
            </a>
          </div>

          {/* Trust row */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-[10px] uppercase tracking-[0.2em] text-[#f6f2ec]/50 pt-3 border-t border-white/10">
            <span>Private journeys</span>
            <span className="hidden sm:inline">·</span>
            <span>Trusted local partners</span>
            <span className="hidden sm:inline">·</span>
            <span>Human support in Morocco</span>
          </div>
        </div>

        {/* Scroll indicator — Taghazout exact */}
        <div className="pointer-events-none absolute bottom-8 right-8 hidden flex-col items-center gap-3 md:flex">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#f6f2ec]/40 [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="block h-12 w-px overflow-hidden bg-[#f6f2ec]/15">
            <span className="block h-full w-full origin-top bg-[#C4A258] animate-scrollline" />
          </span>
        </div>
      </div>
    </header>
  );
};
