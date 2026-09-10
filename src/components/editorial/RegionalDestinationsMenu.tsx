"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EscapePackage } from "../../data/mockData";

interface Props {
  escapes: EscapePackage[];
  onOpenEscapeModal: (pkg: EscapePackage) => void;
}

interface RegionTab {
  id: string;
  name: string;
  escapeIds: string[];
}

const REGIONS: RegionTab[] = [
  {
    id: "marrakech-atlas",
    name: "Marrakech & High Atlas",
    escapeIds: [
      "escape-agafay-1d",
      "escape-imlil-1d",
      "escape-ourika-1d",
      "escape-ouzoud-1d",
    ],
  },
  {
    id: "atlantic",
    name: "Atlantic Coast",
    escapeIds: ["escape-taghazout-3d", "escape-essaouira-2d"],
  },
  {
    id: "sahara",
    name: "Sahara & South",
    escapeIds: ["escape-sahara-3d", "escape-atlas-2d"],
  },
];

export const RegionalDestinationsMenu: React.FC<Props> = ({
  escapes,
  onOpenEscapeModal,
}) => {
  const [activeRegionId, setActiveRegionId] = useState(REGIONS[0].id);
  const activeRegion = REGIONS.find((r) => r.id === activeRegionId) || REGIONS[0];

  const currentEscapes = activeRegion.escapeIds
    .map((id) => escapes.find((e) => e.id === id))
    .filter(Boolean) as EscapePackage[];

  return (
    <section
      id="destinations"
      className="relative w-full overflow-hidden bg-[#080c10] py-28 md:py-40"
    >
      <div className="container-editorial">

        {/* Section header */}
        <div className="grid grid-cols-12 gap-x-8 gap-y-10 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-5">
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[#d6b78a]">
              <span className="h-px w-8 bg-[#d6b78a]" />
              Choose Your Morocco Chapter
            </p>
            <h2
              className="mt-8 font-serif font-medium leading-[1.02] tracking-tight text-[#f6f2ec] text-balance"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
            >
              Every escape,{" "}
              <span className="italic text-[#d6b78a]">private & managed.</span>
            </h2>
          </div>

          {/* Region tab switcher */}
          <div className="col-span-12 md:col-span-7 flex flex-col justify-end">
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegionId(region.id)}
                  className={`text-[10px] uppercase tracking-[0.3em] px-5 py-3 transition-all duration-300 cursor-pointer ${
                    activeRegionId === region.id
                      ? "bg-[#d6b78a] text-[#080c10]"
                      : "border border-[#f6f2ec]/15 text-[#f6f2ec]/50 hover:border-[#d6b78a]/50 hover:text-[#d6b78a]"
                  }`}
                  style={
                    activeRegionId === region.id
                      ? { boxShadow: "var(--shadow-gold)" }
                      : undefined
                  }
                >
                  {region.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Photo-first escape cards ── */}
        {/* Each card is full-bleed image. Default: title + gold hairline at bottom. */}
        {/* On hover: overlay slides up revealing summary + highlights + CTAs.       */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {currentEscapes.map((item, i) => {
            const isDedicatedPage =
              item.id === "escape-agafay-1d" || item.id === "escape-taghazout-3d";
            const dedicatedUrl =
              item.id === "escape-agafay-1d"
                ? "/agafay"
                : item.id === "escape-taghazout-3d"
                ? "/taghazout"
                : `/escapes/${item.slug}`;
            const waPrefill = encodeURIComponent(
              `Hi SafarAtlas! I'm interested in the ${item.title}. Can you share availability and rates for our group?`
            );

            return (
              <div
                key={item.id}
                className="group relative overflow-hidden bg-[#0d141b]"
                style={{
                  aspectRatio: i % 3 === 0 ? "16/10" : "4/5",
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                {/* Photo */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Permanent dark gradient from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c10]/90 via-[#080c10]/25 to-transparent" />

                {/* Default bottom caption — slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transition-all duration-500 ease-out group-hover:-translate-y-[9rem]">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[#d6b78a]">
                    {item.category} · {item.duration}
                  </span>
                  <h3 className="mt-3 font-serif font-medium leading-tight text-[#f6f2ec] text-balance"
                    style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                  >
                    {item.title}
                  </h3>
                  <div className="mt-4 h-px w-8 bg-[#d6b78a] transition-all duration-500 group-hover:w-16" />
                </div>

                {/* Hover reveal panel — slides up from bottom */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-all duration-500 ease-out group-hover:translate-y-0 bg-gradient-to-t from-[#080c10] via-[#080c10]/98 to-transparent pt-8 px-6 md:px-8 pb-6 md:pb-8">
                  <p className="font-sans text-sm font-light leading-relaxed text-[#f6f2ec]/80 line-clamp-2">
                    {item.summary}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {item.highlights.slice(0, 3).map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="mt-[0.3rem] h-px w-3 flex-shrink-0 bg-[#d6b78a]" />
                        <span className="text-xs font-light text-[#f6f2ec]/70 leading-snug">{hl}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Actions — exact Taghazout button style */}
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <a
                      href={`https://wa.me/212698017323?text=${waPrefill}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center gap-3 bg-[#d6b78a] px-6 py-3 text-[10px] uppercase tracking-[0.3em] text-[#080c10] transition-all duration-300 hover:bg-[#e2c79d] hover:tracking-[0.35em]"
                      style={{ boxShadow: "var(--shadow-gold)" }}
                    >
                      <span>Check Availability</span>
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </a>

                    {isDedicatedPage ? (
                      <Link
                        href={dedicatedUrl}
                        className="link-sweep text-[10px] uppercase tracking-[0.3em] text-[#f6f2ec]/60 hover:text-[#d6b78a]"
                      >
                        Full Guide
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onOpenEscapeModal(item)}
                        className="link-sweep text-[10px] uppercase tracking-[0.3em] text-[#f6f2ec]/60 hover:text-[#d6b78a] cursor-pointer"
                      >
                        View Details
                      </button>
                    )}
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
