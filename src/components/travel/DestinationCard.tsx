"use client";

import React, { useState } from "react";
import { Destination } from "../../data/mockData";

interface DestinationCardProps {
  destination: Destination;
  onSelect?: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onSelect }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div 
      onClick={() => onSelect && onSelect(destination)}
      className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between h-[400px] border border-[#e5dacb]/40 bg-[#121a17] cursor-pointer"
    >
      {/* Background Image with Zoom & Dark Gradient Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out opacity-85"
        />
        {/* Layered Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121a17] via-[#121a17]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      </div>

      {/* Top Bar: Arabic Script Accent + Region + Bookmark */}
      <div className="relative z-10 p-6 flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-extrabold text-white tracking-wide border border-white/30 w-fit">
            {destination.region}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Arabic Typography Accent */}
          <span className="text-xl font-serif text-[#f4c36b] drop-shadow-md font-bold px-2.5 py-0.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
            {destination.arabicName}
          </span>
          {/* Favorite Bookmark Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            aria-label="Save destination"
            className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
              isSaved 
                ? 'bg-[#c95e3d] text-white border-[#c95e3d] shadow-md scale-110' 
                : 'bg-black/40 text-white border-white/30 hover:bg-white/30'
            }`}
          >
            <svg className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 p-6 flex flex-col justify-end gap-3 text-white">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-3xl font-serif font-black tracking-tight drop-shadow-md group-hover:text-[#f4c36b] transition-colors">
              {destination.name}
            </h3>
            <span className="text-xs font-bold text-[#f4c36b] bg-[#123b34]/90 px-3 py-1 rounded-full border border-[#f4c36b]/30">
              Best: {destination.bestTime}
            </span>
          </div>
          <p className="text-xs font-medium text-white/90 line-clamp-1 italic">
            "{destination.tagline}"
          </p>
        </div>

        {/* Highlights Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {destination.highlights.slice(0, 3).map((item, idx) => (
            <span key={idx} className="text-[10px] font-semibold bg-black/50 text-white/90 px-2.5 py-1 rounded-lg border border-white/15 backdrop-blur-xs">
              ✦ {item}
            </span>
          ))}
        </div>

        {/* Action button */}
        <div className="pt-3 flex items-center justify-between border-t border-white/20">
          <span className="text-[11px] text-white/70 font-medium">
            Best Season: <strong className="text-white font-bold">{destination.bestTime}</strong>
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#f4c36b] group-hover:translate-x-1 transition-transform">
            <span>Explore Guide</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};
