"use client";

import React, { useState } from "react";
import { addEscapeToJourney } from "../../lib/journeyStore";
import { EscapePackage } from "../../data/mockData";

interface AddEscapeToJourneyButtonProps {
  escapePkg: EscapePackage;
}

export const AddEscapeToJourneyButton: React.FC<AddEscapeToJourneyButtonProps> = ({ escapePkg }) => {
  const [added, setAdded] = useState(false);

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
    setAdded(true);
    setTimeout(() => {
      window.location.href = "/journey";
    }, 600);
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleAdd}
        disabled={added}
        className="w-full py-4 rounded-xl bg-[#C4A258] hover:bg-[#d8bb78] text-[#07192d] text-xs font-black tracking-widest shadow-lg transition-all transform hover:-translate-y-0.5 flex flex-col items-center justify-center gap-1 text-center cursor-pointer disabled:opacity-70"
      >
        <span>{added ? "✓ Added — Opening Journey Builder…" : "Add to My Journey →"}</span>
        <span className="text-[10px] font-medium text-[#07192d]/60 normal-case tracking-normal">
          Build your full Morocco itinerary with SafarAtlas
        </span>
      </button>

      <a
        href={`https://wa.me/212698017323?text=${encodeURIComponent(`Hi SafarAtlas! I'd like a standalone quote for: ${escapePkg.title}`)}`}
        target="_blank"
        rel="noreferrer"
        className="block text-center text-xs font-bold text-[#C4A258] hover:underline pt-1"
      >
        Or get an instant quote on WhatsApp
      </a>
    </div>
  );
};

