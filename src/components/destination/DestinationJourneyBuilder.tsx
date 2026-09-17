"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EscapePackage } from "../../data/mockData";
import { addEscapeToJourney, assignEscapeToDay, setStayDurationDays, addExtraExperience } from "../../lib/journeyStore";
import { MARRAKECH_DESTINATION_DATA, DayScaffold, MarrakechExperienceExtra } from "../../data/marrakechDestinationData";
import { Plus, Check, Compass, Calendar, Clock, MapPin, ChevronRight, Sparkles, ArrowRight } from "lucide-react";

interface Props {
  escapes: EscapePackage[];
}

export const DestinationJourneyBuilder: React.FC<Props> = ({ escapes }) => {
  const [selectedDuration, setSelectedDuration] = useState<number>(3);
  const [activePlacementModal, setActivePlacementModal] = useState<EscapePackage | null>(null);
  const [recentlyAddedSlug, setRecentlyAddedSlug] = useState<string | null>(null);

  const scaffolds: DayScaffold[] = MARRAKECH_DESTINATION_DATA.scaffoldingByDuration[selectedDuration] || 
    MARRAKECH_DESTINATION_DATA.scaffoldingByDuration[3];

  const handleDurationChange = (days: number) => {
    setSelectedDuration(days);
    setStayDurationDays("Marrakech", days);
  };

  const handleOpenPlacement = (pkg: EscapePackage) => {
    setActivePlacementModal(pkg);
  };

  const handleConfirmPlacement = (dayNumber?: number) => {
    if (!activePlacementModal) return;

    addEscapeToJourney({
      id: activePlacementModal.id,
      slug: activePlacementModal.slug,
      title: activePlacementModal.title,
      duration: activePlacementModal.duration,
      location: activePlacementModal.location,
      priceFromEur: activePlacementModal.priceFromEur,
      image: activePlacementModal.image,
      badge: activePlacementModal.badge,
      assignedDay: dayNumber,
      destinationContext: "Marrakech",
    });

    setRecentlyAddedSlug(activePlacementModal.slug);
    setActivePlacementModal(null);

    setTimeout(() => {
      setRecentlyAddedSlug(null);
    }, 2500);
  };

  const handleAddExtra = (extra: MarrakechExperienceExtra) => {
    addExtraExperience({
      id: extra.id,
      title: extra.title,
      priceEur: extra.priceEur,
    });
  };

  return (
    <div className="space-y-12">
      {/* ── 1. DURATION SELECTOR (LEVEL 1 UX) ── */}
      <div className="bg-[#051324] border border-white/15 p-6 sm:p-8 rounded-none shadow-xl">
        <div className="max-w-2xl">
          <span className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase block mb-1">
            Step 1 · Choose Your Stay
          </span>
          <h2 className="text-xl sm:text-2xl font-serif text-[#f6f2ec] font-bold">
            How many days will you stay in Marrakech?
          </h2>
          <p className="text-xs text-[#f6f2ec]/70 mt-1">
            Select your stay duration to generate your custom day-by-day journey timeline.
          </p>
        </div>

        {/* Duration Pills */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6">
          {[1, 2, 3, 4, 5].map((days) => (
            <button
              key={days}
              onClick={() => handleDurationChange(days)}
              className={`px-5 py-3 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer rounded-none border ${
                selectedDuration === days
                  ? "bg-[#C4A258] text-[#07192d] font-bold border-[#C4A258] shadow-[0_0_20px_rgba(196,162,88,0.3)]"
                  : "bg-transparent text-[#f6f2ec]/80 border-white/20 hover:border-[#C4A258]/60 hover:text-[#f6f2ec]"
              }`}
            >
              {days} {days === 1 ? "Day" : "Days"}
            </button>
          ))}
        </div>
      </div>

      {/* ── 2. DYNAMIC DAY-BY-DAY WORKSPACE (LEVEL 2 UX) ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase block mb-0.5">
              Step 2 · Your Day-by-Day Workspace
            </span>
            <h3 className="text-lg sm:text-xl font-serif text-[#f6f2ec] font-bold">
              Your {selectedDuration}-Day Marrakech Itinerary Skeleton
            </h3>
          </div>
          <span className="text-xs text-[#f6f2ec]/50 font-mono hidden sm:inline-block">
            {scaffolds.length} Days Allocated
          </span>
        </div>

        {/* Day Slots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scaffolds.map((scaffold) => (
            <div
              key={scaffold.dayNumber}
              className="bg-[#07192d] border border-white/10 p-5 rounded-none hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <span className="text-xs font-mono text-[#C4A258] uppercase tracking-wider font-bold">
                    Day {scaffold.dayNumber}
                  </span>
                  <span className="text-base">{scaffold.icon}</span>
                </div>
                <h4 className="text-sm font-bold text-[#f6f2ec] mb-1">{scaffold.title}</h4>
                <p className="text-xs text-[#f6f2ec]/65 leading-relaxed">{scaffold.suggestedFocus}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5">
                <a
                  href="#curated-escapes"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-[#C4A258] hover:underline"
                >
                  <span>+ Place Escape Here</span>
                  <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. READY-MADE CURATED ESCAPES (1-CLICK ADD) ── */}
      <div id="curated-escapes" className="space-y-6 pt-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase block mb-0.5">
            Step 3 · Modular Building Blocks
          </span>
          <h3 className="text-xl sm:text-2xl font-serif text-[#f6f2ec] font-bold">
            Curated Marrakech Escapes
          </h3>
          <p className="text-xs text-[#f6f2ec]/70 mt-1 max-w-2xl">
            Each Escape includes private vehicle transport, dedicated local guides, and authentic hospitality. Select one to insert into your journey.
          </p>
        </div>

        {/* Escapes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {escapes.map((pkg) => {
            const isAdded = recentlyAddedSlug === pkg.slug;

            return (
              <div
                key={pkg.id}
                className="bg-[#051324] border border-white/15 rounded-none overflow-hidden flex flex-col justify-between group hover:border-[#C4A258]/50 transition-all shadow-lg"
              >
                {/* Visual Thumbnail */}
                <div className="relative h-48 w-full bg-[#07192d] overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#07192d]/90 backdrop-blur-md px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-[#C4A258] border border-white/10">
                    {pkg.duration}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#07192d]/90 backdrop-blur-md px-3 py-1 text-xs font-serif font-bold text-[#f6f2ec] border border-white/10">
                    From €{pkg.priceFromEur}/pp
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#f6f2ec] group-hover:text-[#C4A258] transition-colors">
                      {pkg.title}
                    </h4>
                    <p className="text-xs text-[#f6f2ec]/70 mt-2 line-clamp-2 leading-relaxed">
                      {pkg.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {pkg.highlights.slice(0, 2).map((h, i) => (
                        <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 text-[#f6f2ec]/70">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Add Action Button */}
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <button
                      onClick={() => handleOpenPlacement(pkg)}
                      className={`w-full py-3 px-4 text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer rounded-none border ${
                        isAdded
                          ? "bg-emerald-600 text-white border-emerald-500"
                          : "bg-[#C4A258] hover:bg-[#d8bb78] text-[#07192d] font-bold border-[#C4A258]"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Journey ✓</span>
                        </>
                      ) : (
                        <>
                          <span>Add to Journey</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 4. MODULAR INDIVIDUAL EXPERIENCES & EXTRAS ── */}
      <div className="space-y-4 pt-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase block mb-0.5">
            Step 4 · In-City Experiences
          </span>
          <h3 className="text-lg sm:text-xl font-serif text-[#f6f2ec] font-bold">
            Add Individual Marrakech Experiences
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MARRAKECH_DESTINATION_DATA.extras.map((extra) => (
            <div
              key={extra.id}
              className="bg-[#051324] border border-white/10 p-4 rounded-none flex flex-col justify-between hover:border-white/20 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">{extra.icon}</span>
                  <span className="text-xs font-mono text-[#C4A258] font-bold">€{extra.priceEur}/pp</span>
                </div>
                <h5 className="text-xs font-bold text-[#f6f2ec]">{extra.title}</h5>
                <p className="text-[11px] text-[#f6f2ec]/60 mt-1 leading-normal">{extra.shortDesc}</p>
              </div>

              <button
                onClick={() => handleAddExtra(extra)}
                className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-[#C4A258] hover:underline flex items-center justify-between w-full"
              >
                <span>+ Add to Plan</span>
                <span>{extra.duration}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. DAY PLACEMENT MODAL DIALOG ── */}
      {activePlacementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#07192d] border border-white/20 p-6 sm:p-8 max-w-md w-full rounded-none shadow-2xl space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C4A258] block mb-1">
                Assign to Day
              </span>
              <h4 className="text-lg font-serif font-bold text-[#f6f2ec]">
                Where would you like to place this Escape?
              </h4>
              <p className="text-xs text-[#f6f2ec]/70 mt-1">
                {activePlacementModal.title} ({activePlacementModal.duration}) · From €{activePlacementModal.priceFromEur}/pp
              </p>
            </div>

            {/* Selectable Days Grid */}
            <div className="grid grid-cols-2 gap-3">
              {scaffolds.map((scaffold) => (
                <button
                  key={scaffold.dayNumber}
                  onClick={() => handleConfirmPlacement(scaffold.dayNumber)}
                  className="p-3 bg-white/5 border border-white/15 hover:border-[#C4A258] hover:bg-[#C4A258]/10 text-left transition-all cursor-pointer rounded-none"
                >
                  <span className="text-xs font-mono font-bold text-[#C4A258] block">
                    Day {scaffold.dayNumber}
                  </span>
                  <span className="text-[11px] text-[#f6f2ec] truncate block mt-0.5">
                    {scaffold.title.replace(`Day ${scaffold.dayNumber} — `, "")}
                  </span>
                </button>
              ))}
            </div>

            {/* Fallback Option */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => handleConfirmPlacement(undefined)}
                className="text-xs text-[#f6f2ec]/70 hover:text-[#f6f2ec] underline font-mono"
              >
                Keep flexible / Decide later
              </button>
              <button
                onClick={() => setActivePlacementModal(null)}
                className="text-xs text-[#f6f2ec]/50 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};