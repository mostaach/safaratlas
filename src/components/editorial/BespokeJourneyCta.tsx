"use client";

import React from "react";
import Link from "next/link";
import { Compass, MessageCircle, ArrowRight } from "lucide-react";

export const BespokeJourneyCta: React.FC = () => {
  const waPrefill = encodeURIComponent(
    "Hi SafarAtlas! We're planning a multi-day trip combining several regions in Morocco. Could your concierge help design our full itinerary?"
  );

  return (
    <section className="relative w-full bg-[#080c10] text-[#f6f2ec] pb-24 sm:pb-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 border border-[#d6b78a]/30 bg-gradient-to-br from-[#0d1620] via-[#091017] to-[#080c10] shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          {/* Subtle gold glow accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d6b78a]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#d6b78a]/15 text-[#d6b78a] border border-[#d6b78a]/30">
              <Compass className="w-3.5 h-3.5" />
              <span>Multi-City Trip Architecture</span>
            </div>

            <h3
              className="font-serif font-normal leading-[1.05] tracking-tight text-white"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              Combining multiple regions? <br />
              <span className="italic text-[#d6b78a]">
                We orchestrate your entire Morocco route.
              </span>
            </h3>

            <p className="text-sm sm:text-base font-light text-[#f6f2ec]/80 leading-relaxed max-w-2xl">
              From landing in Marrakech, crossing the High Atlas, sleeping under the Sahara stars, to recovering on the Atlantic coast—tell us your preferred dates and rhythm. Our local team prepares a seamless, door-to-door itinerary with verified private drivers and boutique riads.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={`https://wa.me/212698017323?text=${waPrefill}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-[#080c10] bg-gradient-to-r from-[#d6b78a] to-[#c89a4e] hover:brightness-105 active:scale-98 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Request Custom Itinerary on WhatsApp</span>
              </a>

              <Link
                href="/journey"
                className="px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all flex items-center justify-center gap-2"
              >
                <span>Open Journey Planner</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#d6b78a]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
