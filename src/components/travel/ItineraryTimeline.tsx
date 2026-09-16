"use client";

import React, { useState } from "react";
import Image from "next/image";
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
    <div className="bg-[#0d2239] rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl text-[#f6f2ec]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <h3 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
            {itinerary.title}
          </h3>
          <p className="mt-2 text-sm text-white/70 leading-relaxed max-w-2xl">
            {itinerary.subtitle}
          </p>
          <p className="mt-3 text-sm font-semibold text-[#C4A258]">
            {itinerary.durationDays} days · {itinerary.pace} pace · ideal for {itinerary.suitableFor.join(", ")}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex -space-x-1">
            {itinerary.days.map((d) => (
              <button
                key={d.dayNumber}
                onClick={() => setActiveDay(d.dayNumber)}
                className={`w-9 h-9 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  activeDay === d.dayNumber
                    ? "bg-[#C4A258] text-[#07192d] ring-4 ring-[#C4A258]/20 shadow-md scale-110 z-10"
                    : "bg-white/10 text-white hover:bg-[#C4A258] hover:text-[#07192d]"
                }`}
              >
                D{d.dayNumber}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Split: Timeline Steps Left, Active Day Detail Right */}
      <div className="mt-8 grid lg:grid-cols-[1fr_0.9fr] gap-8 items-start">
        
        {/* Left Column: Vertical Timeline Steps */}
        <div className="space-y-4">
          <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/15">
            {itinerary.days.map((day) => {
              const isActive = activeDay === day.dayNumber;
              return (
                <div
                  key={day.dayNumber}
                  onClick={() => setActiveDay(day.dayNumber)}
                  className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                    isActive 
                      ? "bg-[#07192d] border-[#C4A258] shadow-md -translate-x-1" 
                      : "bg-[#0a1c30] border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Timeline Dot */}
                  <span className={`absolute -left-[31px] top-5 w-5 h-5 rounded-full border-2 transition-all ${
                    isActive 
                      ? "bg-[#C4A258] border-[#07192d] ring-4 ring-[#C4A258]/20" 
                      : "bg-white/20 border-[#07192d] group-hover:bg-[#C4A258]"
                  }`} />

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-black text-[#C4A258]">
                      Day {day.dayNumber}
                    </span>
                    <span className="text-xs font-semibold text-white/70 bg-white/10 px-2 py-0.5 rounded-full">
                      ~{day.durationHours} hrs
                    </span>
                  </div>

                  <h5 className="mt-1 text-lg font-bold text-white group-hover:text-[#C4A258] transition-colors">
                    {day.title}
                  </h5>
                  <p className="mt-0.5 text-xs font-semibold text-[#C4A258]">{day.location}</p>

                  <p className="mt-1.5 text-sm text-white/70 line-clamp-2 leading-relaxed">
                    {day.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Spotlight Card for Active Day */}
        <div className="sticky top-24 rounded-2xl bg-[#07192d] border border-white/10 p-6 shadow-xl">
          <div className="relative h-48 rounded-xl overflow-hidden mb-5">
            <Image 
              src={selectedDay.highlightImage} 
              alt={selectedDay.title}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07192d] via-transparent to-transparent" />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#0d2239] border border-white/10 text-[#C4A258] text-xs font-bold shadow-sm">
              Day {selectedDay.dayNumber} Focus
            </span>
            <span className="absolute bottom-3 left-3 text-white font-serif font-black text-lg drop-shadow-md">
              {selectedDay.location}
            </span>
          </div>

          <h4 className="text-xl font-serif font-black text-white mb-3">
            {selectedDay.title}
          </h4>

          <p className="text-sm leading-relaxed text-white/70 mb-5">
            {selectedDay.summary}
          </p>

          {/* Activities Checklist */}
          <div className="mb-5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#C4A258] block mb-2">
              Planned Highlights
            </span>
            <ul className="space-y-2">
              {selectedDay.activities.map((act, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-semibold text-white/90">
                  <span className="text-[#C4A258] font-bold">✓</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Insider Tip Badge */}
          <div className="p-3.5 rounded-xl bg-[#C4A258]/10 border border-[#C4A258]/20 mb-5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#C4A258] mb-1">
              <span>Local insight</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed italic">
              &ldquo;{selectedDay.insiderTip}&rdquo;
            </p>
          </div>

          {/* Linked Recommended Business */}
          {linkedBusiness && (
            <div className="p-4 rounded-xl bg-[#051324] border border-white/10 flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <Image 
                  src={linkedBusiness.image} 
                  alt={linkedBusiness.name} 
                  width={48} 
                  height={48} 
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <span className="text-xs font-bold uppercase text-[#25D366]">
                    ✓ Recommended Verified Host
                  </span>
                  <h6 className="text-sm font-bold text-white">
                    {linkedBusiness.name}
                  </h6>
                  <span className="text-xs text-white/60">★ {linkedBusiness.rating} ({linkedBusiness.reviewCount})</span>
                </div>
              </div>
              
              <button
                onClick={() => onInquirePartner && onInquirePartner(linkedBusiness.id)}
                className="px-3 py-1.5 rounded-lg bg-[#C4A258] text-[#07192d] text-xs font-bold hover:bg-[#d8bb78] transition-colors cursor-pointer"
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
