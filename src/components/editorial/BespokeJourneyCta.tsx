"use client";

import React from "react";

export const BespokeJourneyCta: React.FC = () => {
  const waPrefill = encodeURIComponent(
    "Hi SafarAtlas! We're planning a multi-day trip combining several regions in Morocco. Could your concierge help design our full itinerary?"
  );

  return (
    <section className="relative w-full bg-[#07192d] text-[#f6f2ec] py-28 md:py-40 border-t border-[#C4A258]/15">
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-x-8 gap-y-12">

          {/* Left header */}
          <header className="col-span-12 md:col-span-5">
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[#C4A258]">
              <span className="h-px w-8 bg-[#C4A258]" />
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
            <div className="border-y border-[#C4A258]/20 py-10 md:py-12">
              <p className="font-sans text-base font-light leading-relaxed text-[#f6f2ec]/75 max-w-xl">
                From landing in Marrakech, crossing the High Atlas, sleeping
                under Sahara stars, to recovering on the Atlantic coast — tell
                us your preferred dates and rhythm. Our local team prepares a
                seamless door-to-door itinerary with verified private drivers
                and boutique riads.
              </p>

              {/* CTAs — refined editorial button styling matching Taghazout */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3.5">
                <a
                  href="/journey"
                  className="group inline-flex items-center justify-center gap-2.5 bg-[#C4A258] px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-[#07192d] font-normal transition-all duration-300 hover:bg-[#d8bb78] hover:tracking-[0.22em] whitespace-nowrap shrink-0"
                  style={{ boxShadow: "var(--shadow-gold)" }}
                >
                  <span className="font-normal">Plan Your Custom Journey</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 font-light">→</span>
                </a>

                <a
                  href={`https://wa.me/212698017323?text=${waPrefill}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 border border-[#f6f2ec]/20 px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-[#f6f2ec] font-normal transition-all duration-300 hover:border-[#C4A258] hover:text-[#C4A258] whitespace-nowrap shrink-0"
                >
                  <span>Chat on WhatsApp</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
