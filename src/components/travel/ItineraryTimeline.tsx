"use client";

import React, { useState } from "react";
import { TravelItinerary, BUSINESS_LISTINGS } from "../../data/mockData";

interface ItineraryTimelineProps {
  itinerary: TravelItinerary;
  onInquirePartner?: (businessId: string) => void;
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ itinerary, onInquirePartner }) => {
  const [activeDay, setActiveDay] = useState(1);

  const selectedDay = itinerary.days.find(d => d.dayNumber === activeDay) || itinerary.days[0];
  const linkedBusiness = selectedDay?.recommendedBusinessId 
    ? BUSINESS_LISTINGS.find(b => b.id === selectedDay.recommendedBusinessId)
    : null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-extrabold uppercase tracking-widest">
              {itinerary.durationDays} Days • {itinerary.pace} Pace
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Ideal for: {itinerary.suitableFor.join(", ")}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {itinerary.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {itinerary.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-xs text-slate-500 font-medium">Interactive Route:</span>
          <div className="flex -space-x-1">
            {itinerary.days.map((d) => (
              <button
                key={d.dayNumber}
                onClick={() => setActiveDay(d.dayNumber)}
                className={`w-9 h-9 rounded-full text-xs font-extrabold transition-all ${
                  activeDay === d.dayNumber
                    ? "bg-navy text-white ring-4 ring-navy/20 shadow-md scale-110 z-10"
                    : "bg-cream-dark text-slate-900 hover:bg-gold hover:text-white"
                }`}
              >
                D{d.dayNumber}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Split: Timeline Steps Left, Active Day Detail Right */}
      <div className="mt-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
        
        {/* Left Column: Vertical Timeline Steps */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-gold">
            Timeline Steps (Click Day to Preview)
          </h4>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {itinerary.days.map((day) => {
              const isActive = activeDay === day.dayNumber;
              return (
                <div
                  key={day.dayNumber}
                  onClick={() => setActiveDay(day.dayNumber)}
                  className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-200 border ${
                    isActive 
                      ? "bg-cream border-gold shadow-md -translate-x-1" 
                      : "bg-white border-slate-200 hover:border-navy/40"
                  }`}
                >
                  {/* Timeline Dot */}
                  <span className={`absolute -left-[31px] top-5 w-5 h-5 rounded-full border-2 transition-all ${
                    isActive 
                      ? "bg-gold border-white ring-4 ring-gold/20" 
                      : "bg-slate-200 border-white group-hover:bg-navy"
                  }`} />

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-gold">
                      Day 0{day.dayNumber} — {day.location}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-cream-dark px-2 py-0.5 rounded-full">
                      ~{day.durationHours} hrs
                    </span>
                  </div>

                  <h5 className="mt-1 text-base font-bold text-slate-900 group-hover:text-navy">
                    {day.title}
                  </h5>

                  <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {day.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Spotlight Card for Active Day */}
        <div className="sticky top-24 rounded-3xl bg-cream border border-slate-200 p-6 shadow-md">
          <div className="relative h-48 rounded-2xl overflow-hidden mb-5">
            <img 
              src={selectedDay.highlightImage} 
              alt={selectedDay.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-navy text-white text-xs font-bold shadow-sm">
              Day {selectedDay.dayNumber} Focus
            </span>
            <span className="absolute bottom-3 left-3 text-white font-black text-lg drop-shadow-md">
              {selectedDay.location}
            </span>
          </div>

          <h4 className="text-xl font-black text-slate-900 mb-3">
            {selectedDay.title}
          </h4>

          <p className="text-xs leading-relaxed text-slate-500 mb-5">
            {selectedDay.summary}
          </p>

          {/* Activities Checklist */}
          <div className="mb-5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-navy block mb-2">
              Planned Highlights
            </span>
            <ul className="space-y-2">
              {selectedDay.activities.map((act, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-900">
                  <span className="text-gold font-bold">✓</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Insider Tip Badge */}
          <div className="p-3.5 rounded-xl bg-accent/15 border border-accent/40 mb-5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#9a6713] mb-1">
              <span>💡 Local Insider Tip</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed italic">
              &ldquo;{selectedDay.insiderTip}&rdquo;
            </p>
          </div>

          {/* Linked Recommended Business */}
          {linkedBusiness && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <img 
                  src={linkedBusiness.image} 
                  alt={linkedBusiness.name} 
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#059669]">
                    ✓ Recommended Verified Host
                  </span>
                  <h6 className="text-xs font-bold text-slate-900">
                    {linkedBusiness.name}
                  </h6>
                  <span className="text-[11px] text-slate-500">★ {linkedBusiness.rating} ({linkedBusiness.reviewCount})</span>
                </div>
              </div>
              
              <button
                onClick={() => onInquirePartner && onInquirePartner(linkedBusiness.id)}
                className="px-3 py-1.5 rounded-lg bg-gold text-white text-[11px] font-bold hover:bg-gold-dark transition-colors"
              >
                Inquire
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
