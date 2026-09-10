"use client";

import React from "react";

export const EditorialHero: React.FC = () => {
  const waPrefill = encodeURIComponent(
    "Hello SafarAtlas! I'm planning a trip to Morocco and would love your team to design a private managed itinerary for us."
  );

  return (
    <header className="relative min-h-[100svh] w-full overflow-hidden bg-[#080c10]">

      {/* Background image with Ken Burns drift */}
      <div className="absolute inset-0">
        <img
          src="/agafay_rocky_desert_hero.png"
          alt="Atmospheric dusk across Morocco's Agafay desert and High Atlas mountains"
          className="h-full w-full object-cover animate-kenburns"
          loading="eager"
        />
        {/* Hero gradient — matches Taghazout exactly */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,12,16,0.65)_100%)]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,12,16,0.15) 0%, rgba(8,12,16,0.5) 55%, #080c10 100%)",
          }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 container-editorial flex min-h-[100svh] flex-col justify-center pt-24">
        <div className="max-w-5xl">

          {/* Eyebrow */}
          <p className="animate-rise mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[#d6b78a]">
            <span className="h-px w-10 bg-[#d6b78a]" />
            Morocco · Private Managed Journeys
          </p>

          {/* Main headline */}
          <h1
            className="animate-rise anim-delay-100 font-serif font-medium leading-[0.95] tracking-tight text-[#f6f2ec] text-shadow-deep"
            style={{ fontSize: "clamp(2.5rem, 7.5vw, 6rem)" }}
          >
            Morocco, orchestrated
            <br />
            <span className="italic text-[#f6f2ec]/95">chapter by chapter.</span>
          </h1>

          {/* Sub */}
          <p
            className="animate-rise anim-delay-200 mt-8 max-w-xl font-sans text-base md:text-lg font-light text-[#f6f2ec]/70 tracking-wide"
            style={{ lineHeight: 1.6 }}
          >
            Forget chaotic group tours. We orchestrate private desert camps,
            High Atlas lodges, coastal retreats and door-to-door 4×4 drivers
            under one dedicated WhatsApp concierge.
          </p>

          {/* CTAs — exact Taghazout button DNA */}
          <div className="animate-rise anim-delay-300 mt-14 flex flex-wrap items-center gap-8">
            <a
              href={`https://wa.me/212698017323?text=${waPrefill}`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 bg-[#d6b78a] px-10 py-5 text-xs uppercase tracking-[0.3em] text-[#080c10] transition-all duration-300 hover:bg-[#e2c79d] hover:tracking-[0.35em]"
              style={{ boxShadow: "var(--shadow-gold)" }}
            >
              <span>Check Availability</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <a
              href="#destinations"
              className="link-sweep text-xs uppercase tracking-[0.3em] text-[#f6f2ec]/70 hover:text-[#f6f2ec]"
            >
              Explore Signature Escapes
            </a>
          </div>

          {/* Trust row */}
          <div className="animate-rise anim-delay-300 mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-[#f6f2ec]/40">
            <span>Private door-to-door transfers</span>
            <span className="hidden sm:inline">·</span>
            <span>Vetted boutique riads &amp; camps</span>
            <span className="hidden sm:inline">·</span>
            <span>24/7 local concierge</span>
          </div>
        </div>

        {/* Scroll indicator — Taghazout exact */}
        <div className="pointer-events-none absolute bottom-8 right-8 hidden flex-col items-center gap-3 md:flex">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#f6f2ec]/40 [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="block h-12 w-px overflow-hidden bg-[#f6f2ec]/15">
            <span className="block h-full w-full origin-top bg-[#d6b78a] animate-scrollline" />
          </span>
        </div>
      </div>
    </header>
  );
};
