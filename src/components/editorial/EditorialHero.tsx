"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export const EditorialHero: React.FC = () => {
  const waPrefill = encodeURIComponent(
    "Hi SafarAtlas! I'm planning a trip to Morocco and would love your team to design a private managed itinerary for us."
  );

  return (
    <header className="relative min-h-[95svh] sm:min-h-[100svh] w-full overflow-hidden bg-[#080c10] text-[#f6f2ec] flex flex-col justify-between">
      {/* Background Hero Image with atmospheric vignette */}
      <div className="absolute inset-0">
        <img
          src="/agafay_rocky_desert_hero.png"
          alt="Atmospheric dusk across Morocco's High Atlas and desert horizon"
          className="h-full w-full object-cover object-center brightness-85 contrast-105"
        />
        {/* Radial vignette & gradient fade to dark base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c10]/40 via-[#080c10]/50 to-[#080c10]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(8,12,16,0.7)_100%)]" />
      </div>

      {/* Top spacing placeholder for global Header */}
      <div className="pt-28 sm:pt-32" />

      {/* Hero content container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-12 flex flex-col justify-center flex-1">
        <div className="max-w-4xl space-y-6">
          {/* Kicker hairline */}
          <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.35em] text-[#d6b78a]">
            <span className="h-px w-8 sm:w-12 bg-[#d6b78a]" />
            <span>Curated Morocco Journeys · 100% Private</span>
          </div>

          {/* Main Serif Headline */}
          <h1
            className="font-serif font-normal leading-[0.95] tracking-tight text-white drop-shadow-xl"
            style={{ fontSize: "clamp(2.5rem, 7.5vw, 5.75rem)" }}
          >
            Morocco, orchestrated <br />
            <span className="italic text-[#d6b78a]">without the noise.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="mt-6 max-w-2xl text-base sm:text-lg font-light text-[#f6f2ec]/85 leading-relaxed tracking-wide"
            style={{ lineHeight: 1.65 }}
          >
            Forget chaotic group tours and stressful logistics. We orchestrate private desert camps, High Atlas mountain lodges, coastal retreats, and door-to-door private 4x4 drivers under one dedicated WhatsApp concierge.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={`https://wa.me/212698017323?text=${waPrefill}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-[#080c10] bg-gradient-to-r from-[#d6b78a] via-[#e2c79d] to-[#c89a4e] hover:brightness-105 active:scale-98 transition-all shadow-[0_10px_35px_rgba(214,183,138,0.3)]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Design My Journey on WhatsApp</span>
            </a>

            <a
              href="#destinations"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
            >
              <span>Explore Signature Escapes</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#d6b78a]" />
            </a>
          </div>

          {/* Trust micro-row */}
          <div className="pt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#d6b78a]/90 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="text-[#25D366]">✦</span> Private door-to-door transfers
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#25D366]">✦</span> Vetted boutique riads & camps
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#25D366]">✦</span> 24/7 on-the-ground support
            </span>
          </div>
        </div>
      </div>

      {/* Subtle bottom fade transition */}
      <div className="h-12 w-full bg-gradient-to-b from-transparent to-[#faf6f0]" />
    </header>
  );
};
