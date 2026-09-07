"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ESCAPES_PACKAGES, EscapePackage } from "../../data/mockData";
import { addEscapeToJourney } from "../../lib/journeyStore";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface EscapesSectionProps {
  onInquireEscape?: (escapePkg: EscapePackage) => void;
  onSelectEscapeDetail?: (escapePkg: EscapePackage) => void;
}

export const EscapesSection: React.FC<EscapesSectionProps> = ({
  onInquireEscape,
  onSelectEscapeDetail,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Desert", "Coast", "Mountain"];

  const filteredEscapes =
    activeCategory === "All"
      ? ESCAPES_PACKAGES
      : ESCAPES_PACKAGES.filter((item) => item.category === activeCategory);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="escapes"
      className="py-14 lg:py-18 bg-[#faf6f0] border-t border-[#e5dacb] relative overflow-hidden"
    >
      {/* Background Decorative Radial Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(#f4c36b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-[#c95e3d]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7 relative z-10">

        {/* Section Header & Compact Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123b34]/10 border border-[#123b34]/20 text-[#123b34] text-[11px] font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#c95e3d]" />
              Modular 1–3 Day Add-ons
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#121a17] tracking-tight leading-tight">
              Add experiences to your managed journey
            </h2>
            <p className="text-sm sm:text-base text-[#4e5e57] leading-relaxed">
              Start with a desert, coast or mountain escape. SafarAtlas turns the pieces you like into one coordinated Morocco route.
            </p>
          </div>

          {/* Right: Filters & Carousel Nav Arrows */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-white/90 p-1.5 rounded-2xl border border-[#e5dacb] shadow-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#123b34] text-white shadow-xs"
                      : "text-[#4e5e57] hover:text-[#121a17] hover:bg-[#faf6f0]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Carousel Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                aria-label="Previous escape"
                className="w-10 h-10 rounded-xl bg-white border border-[#e5dacb] text-[#121a17] hover:text-[#c95e3d] hover:border-[#c95e3d]/40 shadow-xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Next escape"
                className="w-10 h-10 rounded-xl bg-white border border-[#e5dacb] text-[#121a17] hover:text-[#c95e3d] hover:border-[#c95e3d]/40 shadow-xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Space-Saving Horizontal Parallax Carousel Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredEscapes.map((item) => (
            <div
              key={item.id}
              className="snap-start shrink-0 w-[300px] sm:w-[350px] lg:w-[365px] group bg-white rounded-2xl border border-[#e5dacb] overflow-hidden shadow-[0_12px_32px_-16px_rgba(18,59,52,0.12)] hover:shadow-[0_24px_48px_-12px_rgba(18,59,52,0.2)] hover:border-[#c95e3d]/35 transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
            >
              {/* Image with Parallax & Hover Depth */}
              {item.id === "escape-agafay-1d" ? (
                <Link
                  href="/agafay"
                  className="relative h-52 sm:h-56 overflow-hidden block cursor-pointer shrink-0"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 365px, (min-width: 640px) 350px, 300px"
                    loading="lazy"
                    className="object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Badge */}
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-lg bg-[#123b34]/90 backdrop-blur-md text-[#f4c36b] text-[11px] font-extrabold uppercase tracking-wider border border-[#f4c36b]/30 shadow-xs">
                    {item.badge}
                  </span>

                  {/* Location & Title */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                    <span className="text-[11px] font-black text-[#f4c36b] uppercase tracking-widest block drop-shadow-sm">
                      {item.location}
                    </span>
                    <h3 className="text-lg font-serif font-black tracking-tight drop-shadow-md text-white group-hover:text-[#f4c36b] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ) : (
                <div
                  onClick={() => onSelectEscapeDetail?.(item)}
                  className="relative h-52 sm:h-56 overflow-hidden cursor-pointer shrink-0"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 365px, (min-width: 640px) 350px, 300px"
                    loading="lazy"
                    className="object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Badge */}
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-lg bg-[#123b34]/90 backdrop-blur-md text-[#f4c36b] text-[11px] font-extrabold uppercase tracking-wider border border-[#f4c36b]/30 shadow-xs">
                    {item.badge}
                  </span>

                  {/* Location & Title */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                    <span className="text-[11px] font-black text-[#f4c36b] uppercase tracking-widest block drop-shadow-sm">
                      {item.location}
                    </span>
                    <h3 className="text-lg font-serif font-black tracking-tight drop-shadow-md text-white group-hover:text-[#f4c36b] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 gap-4 bg-white">
                <p className="text-xs sm:text-sm text-[#4e5e57] leading-relaxed line-clamp-2">
                  {item.summary}
                </p>

                {/* Footer Section */}
                <div className="pt-3.5 border-t border-[#e5dacb] space-y-3.5 mt-auto">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-serif font-black text-[#123b34]">
                        €{item.priceFromEur}
                        <span className="text-xs font-normal text-[#4e5e57]"> / person</span>
                      </span>
                      <span className="block text-[11px] font-bold text-[#4e5e57] tracking-tight">
                        {item.duration}
                      </span>
                    </div>

                    {item.id === "escape-agafay-1d" ? (
                      <Link
                        href="/agafay"
                        className="cursor-pointer text-xs font-extrabold text-[#123b34] hover:text-[#c95e3d] underline underline-offset-4 transition-colors"
                      >
                        View details →
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelectEscapeDetail?.(item)}
                        className="cursor-pointer text-xs font-extrabold text-[#123b34] hover:text-[#c95e3d] underline underline-offset-4 transition-colors"
                      >
                        View details →
                      </button>
                    )}
                  </div>

                  {item.id === "escape-agafay-1d" ? (
                    <Link
                      href="/agafay"
                      className="w-full cursor-pointer py-2.5 rounded-xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-xs font-black tracking-wider shadow-[0_6px_20px_rgba(201,94,61,0.35)] hover:shadow-[0_8px_25px_rgba(201,94,61,0.5)] transition-all flex items-center justify-center gap-1.5 active:scale-98"
                    >
                      <span>Explore Agafay Escape</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (typeof window !== "undefined") {
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
                        }
                        if (onInquireEscape) onInquireEscape(item);
                      }}
                      className="w-full cursor-pointer py-2.5 rounded-xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-xs font-black tracking-wider shadow-[0_6px_20px_rgba(201,94,61,0.35)] hover:shadow-[0_8px_25px_rgba(201,94,61,0.5)] transition-all flex items-center justify-center gap-1.5 active:scale-98"
                    >
                      <span>Plan with this escape</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Managed Guarantee Footer Strip — Compact layout */}
        <div className="rounded-2xl border border-[#e5dacb] bg-white/90 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="space-y-0.5 text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#123b34] block">
              The SafarAtlas Promise
            </span>
            <h3 className="text-base sm:text-lg font-serif font-bold text-[#121a17]">
              Want multiple escapes? We seamlessly weave them into one route.
            </h3>
            <p className="text-xs sm:text-sm text-[#4e5e57] max-w-xl">
              We coordinate verified local drivers, riad courtyards, and desert guides under one contact and transparent quote.
            </p>
          </div>

          <a
            href="#itineraries"
            className="shrink-0 px-6 py-3 rounded-xl bg-[#123b34] hover:bg-[#0b110f] text-[#f4c36b] text-xs font-black tracking-widest shadow-md transition-all hover:-translate-y-0.5"
          >
            Explore Coordinated Route →
          </a>
        </div>

      </div>
    </section>
  );
};
