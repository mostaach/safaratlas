"use client";

import React from "react";

export const EditorialManifesto: React.FC = () => {
  return (
    <section id="manifesto" className="relative w-full overflow-hidden bg-[#07192d] text-[#f6f2ec]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Eyebrow / Category indicator */}
          <div className="md:col-span-3">
            <p className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.35em] text-[#C4A258]">
              <span className="h-px w-8 bg-[#C4A258]/50" />
              The SafarAtlas Difference
            </p>
          </div>

          {/* Core Statement */}
          <div className="md:col-span-9 md:pl-4 space-y-8">
            <h2
              className="font-serif font-normal leading-[1.05] tracking-tight text-[#f6f2ec]"
              style={{ fontSize: "clamp(2rem, 5vw, 4.25rem)" }}
            >
              Not another tour marketplace.{" "}
              <br className="hidden sm:inline" />
              <span className="italic text-[#C4A258]">
                Someone who manages Morocco for you.
              </span>
            </h2>

            <p
              className="font-serif italic leading-[1.1] tracking-tight text-[#f6f2ec]/70 pt-2"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              Tell us what you want. We coordinate the rest.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-white/10">
              <p className="text-sm sm:text-base font-light leading-relaxed text-[#f6f2ec]/70">
                Most Morocco vacations are ruined by friction: unverified drivers, tourist-trap riads, and 18 hours inside crowded tour vans. We believe travel should leave you grounded, not exhausted.
              </p>
              <div className="space-y-4">
                <p className="text-sm sm:text-base font-light leading-relaxed text-[#f6f2ec]/70">
                  SafarAtlas coordinates every transfer, desert lodge, and private guide into one seamless route — under one concierge contact, one transparent itinerary.
                </p>
                <a
                  href="/journey"
                  className="inline-block text-xs font-bold uppercase tracking-widest text-[#07192d] bg-[#C4A258] hover:bg-[#d8bb78] px-5 py-2.5 transition-all"
                >
                  Build My Journey →
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Hairline bottom transition */}
      <div className="h-px w-full bg-white/10" />
    </section>
  );
};
