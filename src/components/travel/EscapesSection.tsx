"use client";

import React, { useState } from "react";
import { ESCAPES_PACKAGES, EscapePackage } from "../../data/mockData";

interface EscapesSectionProps {
  onInquireEscape?: (escapePkg: EscapePackage) => void;
  onSelectEscapeDetail?: (escapePkg: EscapePackage) => void;
}

export const EscapesSection: React.FC<EscapesSectionProps> = ({
  onInquireEscape,
  onSelectEscapeDetail,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Desert", "Coast", "Mountain"];

  const filteredEscapes =
    activeCategory === "All"
      ? ESCAPES_PACKAGES
      : ESCAPES_PACKAGES.filter((item) => item.category === activeCategory);

  return (
    <section
      id="escapes-section"
      className="py-20 bg-[#faf6f0] border-t border-[#e5dacb] relative overflow-hidden"
    >
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#f4c36b]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c95e3d]/10 border border-[#c95e3d]/20 text-[#c95e3d] text-xs font-extrabold uppercase tracking-widest">
              <span>🐪 Modular Trip Building</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#121a17] tracking-tight leading-tight">
              Choose Your Escapes
            </h2>
            <p className="text-sm sm:text-base text-[#4e5e57] leading-relaxed">
              Escapes are pre-packaged 1 to 3-day journey modules. Insert them
              into your custom Morocco itinerary or book them as standalone
              experiences.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 bg-white/80 p-1.5 rounded-2xl border border-[#e5dacb] shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#123b34] text-white shadow-md"
                    : "text-[#4e5e57] hover:text-[#121a17] hover:bg-[#faf6f0]"
                }`}
              >
                {cat} Escapes
              </button>
            ))}
          </div>
        </div>

        {/* 3-Tier Hierarchy Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-3xl bg-[#123b34] text-white shadow-xl border border-[#2a5b50]">
          <div className="flex items-start gap-3 p-2">
            <span className="w-8 h-8 rounded-xl bg-[#f4c36b]/20 text-[#f4c36b] flex items-center justify-center font-bold text-sm shrink-0">
              1
            </span>
            <div>
              <h4 className="text-sm font-serif font-bold text-[#f4c36b]">
                Select Destinations
              </h4>
              <p className="text-xs text-white/70 mt-0.5">
                Choose regions like Marrakech, Sahara, Taghazout or Fes.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-2 border-t md:border-t-0 md:border-l border-white/15 pt-4 md:pt-2">
            <span className="w-8 h-8 rounded-xl bg-[#c95e3d]/30 text-[#f4c36b] flex items-center justify-center font-bold text-sm shrink-0">
              2
            </span>
            <div>
              <h4 className="text-sm font-serif font-bold text-[#f4c36b]">
                Add Packaged Escapes
              </h4>
              <p className="text-xs text-white/70 mt-0.5">
                Plug 1–3 day Escapes (Sahara glamping, Surf camps) into your
                route.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-2 border-t md:border-t-0 md:border-l border-white/15 pt-4 md:pt-2">
            <span className="w-8 h-8 rounded-xl bg-[#059669]/30 text-[#f4c36b] flex items-center justify-center font-bold text-sm shrink-0">
              3
            </span>
            <div>
              <h4 className="text-sm font-serif font-bold text-[#f4c36b]">
                SafarAtlas Manages It All
              </h4>
              <p className="text-xs text-white/70 mt-0.5">
                One point of contact, seamless ground transfers & verified
                hosts.
              </p>
            </div>
          </div>
        </div>

        {/* Escapes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEscapes.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl border border-[#e5dacb] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Image — clicking opens detail view */}
              <div
                onClick={() => onSelectEscapeDetail?.(item)}
                className="relative h-60 overflow-hidden cursor-pointer shrink-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#123b34]/90 backdrop-blur-md text-[#f4c36b] text-[10px] font-extrabold uppercase tracking-wider border border-[#f4c36b]/30">
                  {item.badge}
                </span>

                {/* Duration Badge */}
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold">
                  ⏱️ {item.duration}
                </span>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold text-[#f4c36b] uppercase tracking-wider block">
                    📍 {item.location}
                  </span>
                  <h3 className="text-xl font-serif font-bold tracking-tight drop-shadow-md group-hover:text-[#f4c36b] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <p className="text-xs text-[#4e5e57] leading-relaxed line-clamp-2">
                  {item.summary}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#c95e3d] block">
                    Escape Highlights:
                  </span>
                  <ul className="space-y-1">
                    {item.highlights.slice(0, 3).map((hl, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-[#121a17] font-medium flex items-start gap-2"
                      >
                        <span className="text-[#059669] shrink-0">✓</span>
                        <span className="line-clamp-1">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What's Included chips */}
                <div className="flex flex-wrap gap-1.5">
                  {item.included.slice(0, 3).map((inc, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold bg-[#faf6f0] text-[#123b34] px-2 py-0.5 rounded-md border border-[#e5dacb]"
                    >
                      {inc}
                    </span>
                  ))}
                </div>

                {/* Spacer to push footer down */}
                <div className="flex-1" />

                {/* Card Footer */}
                <div className="pt-4 border-t border-[#e5dacb] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#4e5e57] block">
                        Managed Package
                      </span>
                      <span className="text-xl font-serif font-black text-[#123b34]">
                        €{item.priceFromEur}
                        <span className="text-xs font-normal text-[#4e5e57]">
                          {" "}
                          / person
                        </span>
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectEscapeDetail?.(item)}
                      className="cursor-pointer text-xs font-bold text-[#123b34] hover:text-[#c95e3d] underline transition-colors"
                    >
                      View Itinerary →
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        const { addEscapeToJourney } = require("../../lib/journeyStore");
                        addEscapeToJourney({
                          id: item.id,
                          slug: item.slug,
                          title: item.title,
                          duration: item.duration,
                          location: item.location,
                          priceFromEur: item.priceFromEur,
                          image: item.image,
                          badge: item.badge,
                        });
                        window.location.href = "/journey";
                      }
                      if (onInquireEscape) onInquireEscape(item);
                    }}
                    className="w-full cursor-pointer py-2.5 rounded-xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-xs font-black tracking-wide shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>+ Add to My Journey</span>
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Managed Guarantee Footer Box */}
        <div className="rounded-3xl border border-[#e5dacb] bg-white p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#123b34]">
              🛡️ The SafarAtlas Managed Guarantee
            </span>
            <h3 className="text-xl font-serif font-bold text-[#121a17]">
              Want a custom multi-destination itinerary combining several
              Escapes?
            </h3>
            <p className="text-sm text-[#4e5e57] max-w-xl">
              Tell us your travel dates and interests. We will design your
              personalized Morocco journey, coordinate all local transport,
              riads, and experiences under one transparent quote.
            </p>
          </div>

          <a
            href="#top"
            className="shrink-0 px-8 py-3.5 rounded-2xl bg-[#123b34] hover:bg-[#0b110f] text-[#f4c36b] text-xs font-black tracking-widest shadow-lg transition-all"
          >
            Build Custom Journey →
          </a>
        </div>
      </div>
    </section>
  );
};
