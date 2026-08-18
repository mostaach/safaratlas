"use client";

import React, { useState } from "react";
import { EscapePackage } from "../../data/mockData";

interface EscapeDetailModalProps {
  escapePkg: EscapePackage | null;
  isOpen: boolean;
  onClose: () => void;
  onInquire: (escapePkg: EscapePackage) => void;
}

export const EscapeDetailModal: React.FC<EscapeDetailModalProps> = ({
  escapePkg,
  isOpen,
  onClose,
  onInquire,
}) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [travelersCount, setTravelersCount] = useState<number>(2);

  if (!isOpen || !escapePkg) return null;

  // Price estimate multiplier for group size
  const calculatedPricePerPerson = travelersCount === 1 
    ? Math.round(escapePkg.priceFromEur * 1.3)
    : travelersCount >= 4 
    ? Math.round(escapePkg.priceFromEur * 0.85)
    : escapePkg.priceFromEur;

  const totalEstimate = calculatedPricePerPerson * travelersCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#faf6f0] rounded-3xl border border-[#e5dacb] shadow-2xl overflow-y-auto flex flex-col my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
          aria-label="Close details"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* HERO IMAGE HEADER */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden shrink-0">
          <img
            src={escapePkg.image}
            alt={escapePkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121a17] via-[#121a17]/40 to-transparent" />
          
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#123b34]/90 backdrop-blur-md text-[#f4c36b] text-xs font-extrabold uppercase tracking-wider border border-[#f4c36b]/30">
              {escapePkg.badge}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold">
              ⏱️ {escapePkg.duration}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#f4c36b]">
              📍 {escapePkg.location} · Modular Journey Package
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight drop-shadow-md">
              {escapePkg.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-medium">
              {escapePkg.subtitle}
            </p>
          </div>
        </div>

        {/* CONTENT BODY */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          
          {/* Overview & Description */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#c95e3d]">
              Escape Overview
            </h3>
            <p className="text-sm sm:text-base text-[#4e5e57] leading-relaxed">
              {escapePkg.fullDescription || escapePkg.summary}
            </p>
          </div>

          {/* DAY-BY-DAY ITINERARY TIMELINE */}
          {escapePkg.itineraryDays && escapePkg.itineraryDays.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#123b34]">
                  📅 Day-by-Day Itinerary Breakdown
                </h3>
                <span className="text-xs text-[#4e5e57] font-semibold">
                  {escapePkg.itineraryDays.length} Days
                </span>
              </div>

              {/* Day Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-[#e5dacb] pb-2">
                {escapePkg.itineraryDays.map((day, idx) => (
                  <button
                    key={day.dayNumber}
                    onClick={() => setActiveDayIndex(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeDayIndex === idx
                        ? "bg-[#123b34] text-white shadow-md"
                        : "bg-white text-[#4e5e57] hover:text-[#121a17] border border-[#e5dacb]"
                    }`}
                  >
                    Day {day.dayNumber}
                  </button>
                ))}
              </div>

              {/* Active Day Card */}
              {escapePkg.itineraryDays[activeDayIndex] && (
                <div className="bg-white rounded-2xl p-5 border border-[#e5dacb] space-y-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <img
                      src={escapePkg.itineraryDays[activeDayIndex].image}
                      alt=""
                      className="w-full sm:w-48 h-32 rounded-xl object-cover shrink-0"
                    />
                    <div className="space-y-2 flex-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#c95e3d]">
                        Day {escapePkg.itineraryDays[activeDayIndex].dayNumber} Schedule
                      </span>
                      <h4 className="text-lg font-serif font-bold text-[#121a17]">
                        {escapePkg.itineraryDays[activeDayIndex].title}
                      </h4>
                      <p className="text-xs text-[#4e5e57] leading-relaxed">
                        {escapePkg.itineraryDays[activeDayIndex].description}
                      </p>

                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {escapePkg.itineraryDays[activeDayIndex].highlights.map((hl, i) => (
                          <span key={i} className="text-[10px] font-bold bg-[#faf6f0] text-[#123b34] px-2.5 py-1 rounded-md border border-[#e5dacb]">
                            ✨ {hl}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* INCLUDED vs NOT INCLUDED GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What's Included */}
            <div className="bg-white p-5 rounded-2xl border border-[#e5dacb] space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#059669] flex items-center gap-1.5">
                <span>✓</span> What SafarAtlas Coordinates:
              </h4>
              <ul className="space-y-2">
                {escapePkg.included.map((inc, i) => (
                  <li key={i} className="text-xs font-medium text-[#121a17] flex items-start gap-2">
                    <span className="text-[#059669] font-bold">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What's Not Included */}
            <div className="bg-white p-5 rounded-2xl border border-[#e5dacb] space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#4e5e57] flex items-center gap-1.5">
                <span>ℹ️</span> Not Included:
              </h4>
              <ul className="space-y-2">
                {(escapePkg.notIncluded || ["Personal expenses & tips", "International flights"]).map((exc, i) => (
                  <li key={i} className="text-xs text-[#4e5e57] flex items-start gap-2">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CALCULATOR & CTA BAR */}
          <div className="bg-[#123b34] text-white p-6 rounded-3xl border border-[#2a5b50] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f4c36b]">
                Transparent Managed Pricing
              </span>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-2xl font-serif font-black text-white">
                    €{calculatedPricePerPerson}
                  </span>
                  <span className="text-xs text-white/70"> / person</span>
                </div>
                <div className="h-6 w-px bg-white/20" />
                <div className="text-xs text-white/80">
                  Total Estimate: <strong className="text-[#f4c36b]">€{totalEstimate}</strong> for {travelersCount} traveler{travelersCount > 1 ? 's' : ''}
                </div>
              </div>

              {/* Group Size Selector */}
              <div className="pt-1 flex items-center gap-2 text-xs text-white/80">
                <span>Group Size:</span>
                {[1, 2, 4, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setTravelersCount(num)}
                    className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      travelersCount === num
                        ? "bg-[#c95e3d] text-white"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {num} {num === 1 ? "solo" : num === 6 ? "6+" : `pax`}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                onClose();
                onInquire(escapePkg);
              }}
              className="w-full md:w-auto px-8 py-4 rounded-2xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-xs font-black tracking-widest shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Add to My Morocco Journey →</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
