"use client";

import React from "react";
import { addEscapeToJourney } from "../../lib/journeyStore";
import { EscapePackage } from "../../data/mockData";

interface AddEscapeToJourneyButtonProps {
  escapePkg: EscapePackage;
}

export const AddEscapeToJourneyButton: React.FC<AddEscapeToJourneyButtonProps> = ({ escapePkg }) => {
  const handleAdd = () => {
    addEscapeToJourney({
      id: escapePkg.id,
      slug: escapePkg.slug,
      title: escapePkg.title,
      duration: escapePkg.duration,
      location: escapePkg.location,
      priceFromEur: escapePkg.priceFromEur,
      image: escapePkg.image,
      badge: escapePkg.badge,
    });
    window.location.href = "/journey";
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleAdd}
        className="w-full py-4 rounded-xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-xs font-black tracking-widest shadow-lg transition-all transform hover:-translate-y-0.5 flex flex-col items-center justify-center gap-1 text-center cursor-pointer"
      >
        <span>+ Add to My Morocco Journey →</span>
        <span className="text-[10px] font-medium text-white/70 normal-case tracking-normal">
          Build multi-destination trip with SafarAtlas
        </span>
      </button>

      <a
        href={`/?inquire=${escapePkg.slug}`}
        className="block text-center text-xs font-bold text-[#123b34] hover:underline pt-1"
      >
        Or Book Standalone Quote
      </a>
    </div>
  );
};
