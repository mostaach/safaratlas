"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { EscapePackage } from "../../data/mockData";

interface Props {
  escapes: EscapePackage[];
  onOpenEscapeModal: (pkg: EscapePackage) => void;
}

interface RegionTab {
  id: string;
  name: string;
  tagline: string;
  escapeIds: string[];
}

const REGIONS: RegionTab[] = [
  {
    id: "marrakech-atlas",
    name: "Marrakech & High Atlas",
    tagline: "Stone desert sunsets, green river canyons & high peak Amazigh villages",
    escapeIds: [
      "escape-agafay-1d",
      "escape-imlil-1d",
      "escape-ourika-1d",
      "escape-ouzoud-1d",
    ],
  },
  {
    id: "atlantic-coast",
    name: "Atlantic Coast",
    tagline: "Ocean resets, world-class point breaks, fresh seafood & ramparts",
    escapeIds: [
      "escape-taghazout-3d",
      "escape-essaouira-2d",
    ],
  },
  {
    id: "sahara-desert",
    name: "Sahara & Dunes",
    tagline: "150-meter golden sand dunes, starlit silence & private luxury camps",
    escapeIds: [
      "escape-sahara-3d",
    ],
  },
];

export const RegionalDestinationsMenu: React.FC<Props> = ({ escapes, onOpenEscapeModal }) => {
  const [activeRegionId, setActiveRegionId] = useState<string>("marrakech-atlas");

  const activeRegion = REGIONS.find((r) => r.id === activeRegionId) || REGIONS[0];

  const currentEscapes = activeRegion.escapeIds
    .map((id) => escapes.find((e) => e.id === id))
    .filter(Boolean) as EscapePackage[];

  return (
    <section id="destinations" className="relative w-full bg-[#080c10] text-[#f6f2ec] py-24 sm:py-36">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">

        {/* Section Header */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 text-[11px] font-black uppercase tracking-[0.35em] text-[#d6b78a]">
            <span className="h-px w-8 bg-[#d6b78a]" />
            <span>Curated Regional Escapes</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h2
                className="font-serif font-normal leading-[1.05] tracking-tight text-white"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
              >
                Choose your <span className="italic text-[#d6b78a]">Morocco chapter.</span>
              </h2>
              <p className="text-sm text-[#f6f2ec]/70 mt-2 max-w-lg">
                Every destination offers completely private transfers, local guides, and door-to-door concierge care.
              </p>
            </div>

            {/* Region selector pills */}
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-end">
              {REGIONS.map((r) => {
                const isActive = r.id === activeRegionId;
                return (
                  <button
                    key={r.id}
                    onClick={() => setActiveRegionId(r.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#d6b78a] text-[#080c10] shadow-[0_4px_20px_rgba(214,183,138,0.3)] scale-102"
                        : "bg-white/5 text-white/70 hover:text-white border border-white/10 hover:border-white/20"
                    }`}
                  >
                    {r.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Region Tagline Banner */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#d6b78a] italic font-serif">
            ✦ {activeRegion.tagline}
          </p>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/50 shrink-0 hidden sm:inline">
            {currentEscapes.length} Handpicked Experiences
          </span>
        </div>

        {/* Escapes List for Active Region */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {currentEscapes.map((item) => {
            const isDedicatedPage = item.id === "escape-agafay-1d" || item.id === "escape-taghazout-3d";
            const dedicatedUrl = item.id === "escape-agafay-1d" ? "/agafay" : "/taghazout";
            const waPrefill = encodeURIComponent(
              `Hi SafarAtlas! I'm interested in the ${item.title}. Can you share rates and availability for our dates?`
            );

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-[#0d141b]/90 hover:border-[#d6b78a]/40 transition-all duration-300 overflow-hidden flex flex-col group shadow-xl"
              >
                {/* Image Header */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d141b] via-[#0d141b]/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#080c10]/80 backdrop-blur-md text-[#d6b78a] border border-[#d6b78a]/30">
                      {item.duration} · Private
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold leading-tight group-hover:text-[#d6b78a] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm text-[#f6f2ec]/75 leading-relaxed font-light">
                      {item.summary}
                    </p>

                    {/* Highlights bullet list */}
                    <ul className="space-y-1.5 pt-2 border-t border-white/5">
                      {item.highlights.slice(0, 3).map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#f6f2ec]/70">
                          <span className="text-[#d6b78a] shrink-0 mt-0.5">▸</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#d6b78a] block">
                        Pricing
                      </span>
                      <span className="text-xs font-bold text-white">
                        Tailored on WhatsApp
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isDedicatedPage ? (
                        <Link
                          href={dedicatedUrl}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-1"
                        >
                          <span>Full Guide</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onOpenEscapeModal(item)}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                        >
                          View Details
                        </button>
                      )}

                      <a
                        href={`https://wa.me/212698017323?text=${waPrefill}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-[#080c10] bg-[#d6b78a] hover:bg-[#e2c79d] active:scale-95 transition-all shadow-md flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>Quote</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
