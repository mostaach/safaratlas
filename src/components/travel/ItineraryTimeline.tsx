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
    <div className="bg-white rounded-2xl border border-[#e5dacb] p-6 sm:p-8 shadow-[0_24px_60px_-38px_rgba(18,26,23,0.55)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#e5dacb]">
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#121a17] tracking-tight">
            {itinerary.title}
          </h3>
          <p className="mt-2 text-sm text-[#4e5e57] leading-relaxed max-w-2xl">
            {itinerary.subtitle}
          </p>
          <p className="mt-3 text-sm font-semibold text-[#123b34]">
            {itinerary.durationDays} days · {itinerary.pace} pace · ideal for {itinerary.suitableFor.join(", ")}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex -space-x-1">
            {itinerary.days.map((d) => (
              <button
                key={d.dayNumber}
                onClick={() => setActiveDay(d.dayNumber)}
                className={`w-9 h-9 rounded-full text-xs font-extrabold transition-all ${
                  activeDay === d.dayNumber
                    ? "bg-[#123b34] text-white ring-4 ring-[#123b34]/20 shadow-md scale-110 z-10"
                    : "bg-[#f2e9dc] text-[#121a17] hover:bg-[#f4c36b] hover:text-[#121a17]"
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
          <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#e5dacb]">
            {itinerary.days.map((day) => {
              const isActive = activeDay === day.dayNumber;
              return (
                <div
                  key={day.dayNumber}
                  onClick={() => setActiveDay(day.dayNumber)}
                  className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                    isActive 
                      ? "bg-[#faf6f0] border-[#f4c36b] shadow-md -translate-x-1" 
                      : "bg-white border-[#e5dacb] hover:border-[#123b34]/40"
                  }`}
                >
                  {/* Timeline Dot */}
                  <span className={`absolute -left-[31px] top-5 w-5 h-5 rounded-full border-2 transition-all ${
                    isActive 
                      ? "bg-[#f4c36b] border-white ring-4 ring-[#f4c36b]/20" 
                      : "bg-[#e5dacb] border-white group-hover:bg-[#123b34]"
                  }`} />

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-black text-[#c95e3d]">
                      Day {day.dayNumber}
                    </span>
                    <span className="text-xs font-semibold text-[#4e5e57] bg-[#f2e9dc] px-2 py-0.5 rounded-full">
                      ~{day.durationHours} hrs
                    </span>
                  </div>

                  <h5 className="mt-1 text-lg font-bold text-[#121a17] group-hover:text-[#123b34]">
                    {day.title}
                  </h5>
                  <p className="mt-0.5 text-xs font-semibold text-[#c95e3d]">{day.location}</p>

                  <p className="mt-1.5 text-sm text-[#4e5e57] line-clamp-2 leading-relaxed">
                    {day.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Spotlight Card for Active Day */}
        <div className="sticky top-24 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] p-6 shadow-md">
          <div className="relative h-48 rounded-xl overflow-hidden mb-5">
            <Image 
              src={selectedDay.highlightImage} 
              alt={selectedDay.title}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#123b34] text-white text-xs font-bold shadow-sm">
              Day {selectedDay.dayNumber} Focus
            </span>
            <span className="absolute bottom-3 left-3 text-white font-black text-lg drop-shadow-md">
              {selectedDay.location}
            </span>
          </div>

          <h4 className="text-xl font-black text-[#121a17] mb-3">
            {selectedDay.title}
          </h4>

          <p className="text-sm leading-relaxed text-[#4e5e57] mb-5">
            {selectedDay.summary}
          </p>

          {/* Activities Checklist */}
          <div className="mb-5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#123b34] block mb-2">
              Planned Highlights
            </span>
            <ul className="space-y-2">
              {selectedDay.activities.map((act, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-semibold text-[#121a17]">
                  <span className="text-[#c95e3d] font-bold">✓</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Insider Tip Badge */}
          <div className="p-3.5 rounded-xl bg-[#c95e3d]/10 border border-[#c95e3d]/25 mb-5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#9a4a31] mb-1">
              <span>Local insight</span>
            </div>
            <p className="text-sm text-[#4e5e57] leading-relaxed italic">
              &ldquo;{selectedDay.insiderTip}&rdquo;
            </p>
          </div>

          {/* Linked Recommended Business */}
          {linkedBusiness && (
            <div className="p-4 rounded-xl bg-white border border-[#e5dacb] flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <Image 
                  src={linkedBusiness.image} 
                  alt={linkedBusiness.name} 
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <span className="text-xs font-bold uppercase text-[#059669]">
                    ✓ Recommended Verified Host
                  </span>
                  <h6 className="text-sm font-bold text-[#121a17]">
                    {linkedBusiness.name}
                  </h6>
                  <span className="text-xs text-[#4e5e57]">★ {linkedBusiness.rating} ({linkedBusiness.reviewCount})</span>
                </div>
              </div>
              
              <button
                onClick={() => onInquirePartner && onInquirePartner(linkedBusiness.id)}
                className="px-3 py-1.5 rounded-lg bg-[#c95e3d] text-white text-xs font-bold hover:bg-[#aa4a2c] transition-colors"
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
