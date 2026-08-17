"use client";

import React, { useState } from "react";
import { TravelCard } from "@/components/ui/card-7";
import { Hotel, Mountain, Coffee, Waves, Brush, MapPin } from "lucide-react";
import { toast } from "sonner";
import type { BusinessListing } from "@/data/mockData";

interface ListingsCarouselProps {
  listings: BusinessListing[];
  onInquire: (biz: BusinessListing) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Riad & Stay":           return <Hotel  className="h-5 w-5 text-white/90" />;
    case "Desert Expeditions":    return <Mountain className="h-5 w-5 text-white/90" />;
    case "Surf & Ocean":          return <Waves  className="h-5 w-5 text-white/90" />;
    case "Cultural & Crafts":     return <Brush  className="h-5 w-5 text-white/90" />;
    case "Food & Culinary":       return <Coffee className="h-5 w-5 text-white/90" />;
    default:                      return <MapPin className="h-5 w-5 text-white/90" />;
  }
};

export const ListingsCarousel: React.FC<ListingsCarouselProps> = ({
  listings,
  onInquire,
}) => {
  const [active, setActive] = useState(0);

  if (listings.length === 0) return null;

  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(listings.length - 1, i + 1));

  return (
    <div className="relative">
      {/* ── Fixed-height stage ── */}
      <div className="flex items-center gap-4 overflow-hidden h-[520px]">
        {listings.map((biz, index) => {
          const distance = index - active; // -1 = left, 0 = center, +1 = right

          // Only render the three visible cards (-1, 0, +1).
          // Cards further away are rendered but pushed off-screen via translate.
          const isCenter = distance === 0;
          const isAdjacent = Math.abs(distance) === 1;
          const isHidden = Math.abs(distance) > 1;

          return (
            <div
              key={biz.id}
              onClick={() => !isCenter && setActive(index)}
              style={{
                // Smoothly animate position, height, opacity, scale
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                // Translate so only the active + 1 neighbours are visible
                transform: isHidden
                  ? `translateX(${distance > 0 ? "120%" : "-120%"}) scale(0.88)`
                  : isCenter
                  ? "translateX(0) scale(1)"
                  : `translateX(${distance * 4}px) scale(0.91)`,
                height: isCenter ? "480px" : "370px",
                minWidth: isCenter ? "420px" : "320px",
                maxWidth: isCenter ? "420px" : "320px",
                opacity: isHidden ? 0 : isCenter ? 1 : 0.62,
                position: isHidden ? "absolute" : "relative",
                pointerEvents: isHidden ? "none" : "auto",
                cursor: isCenter ? "default" : "pointer",
                flexShrink: 0,
                zIndex: isCenter ? 10 : 5,
              }}
              aria-hidden={isHidden}
            >
              <TravelCard
                imageUrl={biz.image || biz.gallery?.[0] || "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=2000"}
                imageAlt={biz.name}
                logo={getCategoryIcon(biz.category)}
                title={biz.name}
                location={`${biz.location}, ${biz.region}`}
                overview={biz.shortDesc}
                price={biz.priceRange}
                pricePeriod="Avg/Night"
                category={biz.category}
                className="w-full h-full"
                onBookNow={() => {
                  toast.success("Inquiry Initiated", {
                    description: `Connecting you with ${biz.name}...`,
                  });
                  onInquire(biz);
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ── Navigation arrows ── */}
      <button
        onClick={prev}
        disabled={active === 0}
        aria-label="Previous listing"
        className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-xl border border-[#e5dacb] flex items-center justify-center text-[#121a17] hover:bg-[#faf6f0] hover:scale-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        disabled={active === listings.length - 1}
        aria-label="Next listing"
        className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-xl border border-[#e5dacb] flex items-center justify-center text-[#121a17] hover:bg-[#faf6f0] hover:scale-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ── Dot indicators ── */}
      <div className="flex justify-center gap-2 mt-6">
        {listings.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to listing ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === active ? "24px" : "8px",
              height: "8px",
              background: i === active ? "#c95e3d" : "#c9b99a",
            }}
          />
        ))}
      </div>
    </div>
  );
};
