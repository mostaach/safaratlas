"use client";

import React from "react";

export const BespokeJourneyCta: React.FC = () => {
  const waPrefill = encodeURIComponent(
    "Hi SafarAtlas! We're planning a multi-day trip combining several regions in Morocco. Could your concierge help design our full itinerary?"
  );

  return (
    <section className="relative w-full bg-[#080c10] text-[#f6f2ec] py-28 md:py-40 border-t border-[#f6f2ec]/8">
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-x-8 gap-y-12">

          {/* Left header */}
          <header className="col-span-12 md:col-span-5">
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[#d6b78a]">
              <span className="h-px w-8 bg-[#d6b78a]" />
              Bespoke Multi-City Journeys
            </p>
            <h2
              className="mt-8 font-serif font-medium leading-[1.02] tracking-tight text-[#f6f2ec] text-balance"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
            >
              Combine escapes.{" "}
              <span className="italic text-[#f6f2ec]/70">
                We orchestrate your entire Morocco route.
              </span>
            </h2>
          </header>

          {/* Right content */}
          <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
            <div className="border-y border-[#f6f2ec]/15 py-10 md:py-12">
              <p className="font-sans text-base font-light leading-relaxed text-[#f6f2ec]/75 max-w-xl">
                From landing in Marrakech, crossing the High Atlas, sleeping
                under Sahara stars, to recovering on the Atlantic coast — tell
                us your preferred dates and rhythm. Our local team prepares a
                seamless door-to-door itinerary with verified private drivers
                and boutique riads.
              </p>

              {/* CTAs — exact Taghazout button DNA */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href={`https://wa.me/212698017323?text=${waPrefill}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-3 bg-[#d6b78a] px-10 py-5 text-xs uppercase tracking-[0.3em] text-[#080c10] transition-all duration-300 hover:bg-[#e2c79d] hover:tracking-[0.35em]"
                  style={{ boxShadow: "var(--shadow-gold)" }}
                >
                  <span>Request Custom Itinerary</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>

                <a
                  href="#destinations"
                  className="link-sweep text-xs uppercase tracking-[0.3em] text-[#f6f2ec]/55 hover:text-[#d6b78a]"
                >
                  Browse all escapes
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
