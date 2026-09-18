"use client";

import React from "react";
import Link from "next/link";

export const EditorialManifesto: React.FC = () => {
  return (
    <section id="manifesto" className="relative w-full overflow-hidden bg-[#F3F1EC] text-[#07192d] border-y border-[#07192d]/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Eyebrow / Category indicator */}
          <div className="md:col-span-3">
            <p className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.35em] text-[#9C7B38]">
              <span className="h-px w-8 bg-[#9C7B38]" />
              The SafarAtlas Difference
            </p>
          </div>

          {/* Core Statement */}
          <div className="md:col-span-9 md:pl-4 space-y-8">
            <h2
              className="font-serif font-normal leading-[1.05] tracking-tight text-[#07192d]"
              style={{ fontSize: "clamp(2rem, 5vw, 4.25rem)" }}
            >
              Not another tour marketplace.{" "}
              <br className="hidden sm:inline" />
              <span className="italic text-[#9C7B38]">
                Someone who manages Morocco for you.
              </span>
            </h2>

            <p
              className="font-serif italic leading-[1.1] tracking-tight text-[#07192d]/75 pt-2"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              Tell us what you want. We coordinate the rest.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-[#07192d]/15">
              <p className="text-sm sm:text-base font-light leading-relaxed text-[#07192d]/75">
                Most Morocco vacations are ruined by friction: unverified drivers, tourist-trap riads, and 18 hours inside crowded tour vans. We believe travel should leave you grounded, not exhausted.
              </p>
              <div className="space-y-4">
                <p className="text-sm sm:text-base font-light leading-relaxed text-[#07192d]/75">
                  SafarAtlas coordinates every transfer, desert lodge, and private guide into one seamless route — under one concierge contact, one transparent itinerary.
                </p>
                <Link
                  href="/journey"
                  className="group inline-flex items-center justify-center gap-2.5 bg-[#C4A258] px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-[#07192d] font-normal transition-all duration-300 hover:bg-[#d8bb78] hover:tracking-[0.22em] whitespace-nowrap shrink-0"
                  style={{ boxShadow: "var(--shadow-gold)" }}
                >
                  <span className="font-normal">Build My Journey</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 font-light">→</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
