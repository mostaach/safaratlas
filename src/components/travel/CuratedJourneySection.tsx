"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Tent, 
  Plane, 
  Sparkles, 
  Waves, 
  Car, 
  ShieldCheck, 
  Check
} from "lucide-react";

interface Milestone {
  id: string;
  stepNumber: string;
  category: "City" | "Desert" | "Transit" | "Coast";
  name: string;
  durationLabel: string;
  nightsLabel: string;
  isFeatured?: boolean;
  featuredBadge?: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  themeColor: "amber" | "terracotta" | "emerald" | "slate" | "teal";
  image: string;
  location: string;
  transferToNext?: {
    label: string;
    duration: string;
    vehicle: string;
  };
  highlights: string[];
  signatureExperience: string;
}

interface RoutePreset {
  id: string;
  label: string;
  durationDays: number;
  priceEur: number;
  subtitle: string;
  milestones: Milestone[];
}

const ROUTE_PRESETS: RoutePreset[] = [
  {
    id: "grand-loop",
    label: "10-Day Grand Circuit",
    durationDays: 10,
    priceEur: 890,
    subtitle: "The complete Moroccan odyssey: Imperial Medina, Sahara Dunes, Atlas Crossing & Atlantic Surf.",
    milestones: [
      {
        id: "marrakech",
        stepNumber: "01",
        category: "City",
        name: "Marrakech",
        durationLabel: "Days 1–3",
        nightsLabel: "2 Nights · Riad Stay",
        icon: Building2,
        themeColor: "amber",
        image: "/destinations/marrakech.jpg",
        location: "Historic Medina",
        transferToNext: {
          label: "Atlas Mountain Pass",
          duration: "4.5h",
          vehicle: "Private 4x4 AC Chauffeur",
        },
        highlights: [
          "Private courtyard suite in authentic Medina riad",
          "VIP airport greeting and baggage handling",
          "Secret artisan souks & Bahia Palace walk",
        ],
        signatureExperience: "Sunset rooftop mint tea overlooking the snow-capped High Atlas peaks.",
      },
      {
        id: "sahara",
        stepNumber: "02",
        category: "Desert",
        name: "Sahara Escape",
        durationLabel: "Days 3–6",
        nightsLabel: "3 Days · Glamping",
        isFeatured: true,
        featuredBadge: "Featured Escape",
        icon: Tent,
        themeColor: "terracotta",
        image: "/escapes/sahara-3d.jpg",
        location: "Erg Chebbi Dunes",
        transferToNext: {
          label: "Camel Trek & 4x4",
          duration: "1.5h",
          vehicle: "Dune Traverse & Chauffeur",
        },
        highlights: [
          "Luxury Bedouin camp with private ensuite bathroom",
          "Golden hour camel trek over 150m towering dunes",
          "Fireside acoustic Berber Gnawa music under the Milky Way",
        ],
        signatureExperience: "Uninterrupted desert stargazing with zero light pollution and gourmet campfire dining.",
      },
      {
        id: "transit",
        stepNumber: "03",
        category: "Transit",
        name: "High Atlas Pass",
        durationLabel: "Days 6–7",
        nightsLabel: "1 Night Transit",
        icon: Plane,
        themeColor: "slate",
        image: "/escapes/atlas-mountains.jpg",
        location: "Tizi n'Tichka & Valleys",
        transferToNext: {
          label: "Coastal Valley Route",
          duration: "3.5h",
          vehicle: "Scenic Chauffeur Transfer",
        },
        highlights: [
          "Rest at historic Berber valley lodge with panoramic terrace",
          "UNESCO Ait Ben Haddou fortress stopover",
          "Seamless logistics with zero transfer friction",
        ],
        signatureExperience: "Crossing the dramatic 2,260m Tizi n'Tichka pass with private photo stops at hidden gorges.",
      },
      {
        id: "taghazout",
        stepNumber: "04",
        category: "Coast",
        name: "Taghazout",
        durationLabel: "Days 7–9",
        nightsLabel: "3 Days · Surf Camp",
        isFeatured: true,
        featuredBadge: "Featured Escape",
        icon: Sparkles,
        themeColor: "emerald",
        image: "/destinations/taghazout.jpg",
        location: "Atlantic Surf Coast",
        transferToNext: {
          label: "Coastal Highway",
          duration: "2.5h",
          vehicle: "Ocean Highway Transfer",
        },
        highlights: [
          "Oceanfront villa accommodation overlooking Anchor Point",
          "ISA-certified daily surf coaching with all board rentals",
          "Rooftop sunset yoga session overlooking the Atlantic swell",
        ],
        signatureExperience: "Catching Atlantic waves at sunrise followed by fresh pomegranate breakfast bowls on the terrace.",
      },
      {
        id: "essaouira",
        stepNumber: "05",
        category: "Coast",
        name: "Essaouira",
        durationLabel: "Days 9–10",
        nightsLabel: "2 Nights · Medina",
        icon: Waves,
        themeColor: "teal",
        image: "/destinations/essaouira.jpg",
        location: "Atlantic Ramparts",
        highlights: [
          "18th-century Portuguese ramparts and blue boat harbor",
          "Fresh harbor seafood grilled directly at fishermen stalls",
          "Art galleries, argan cooperatives & live Gnaoua music",
        ],
        signatureExperience: "Walking the breezy stone sea ramparts with fresh Atlantic sea spray at golden hour.",
      },
    ],
  },
  {
    id: "desert-oasis",
    label: "4-Day Desert Highlights",
    durationDays: 4,
    priceEur: 390,
    subtitle: "A concentrated desert escape linking Marrakech Medina, Agafay Moonscape & Sahara Dunes.",
    milestones: [
      {
        id: "marrakech-d",
        stepNumber: "01",
        category: "City",
        name: "Marrakech",
        durationLabel: "Day 1",
        nightsLabel: "1 Night · Riad",
        icon: Building2,
        themeColor: "amber",
        image: "/destinations/marrakech.jpg",
        location: "Historic Medina",
        transferToNext: {
          label: "Desert 4x4",
          duration: "40m",
          vehicle: "Private Mercedes Chauffeur",
        },
        highlights: ["Medina check-in", "Jemaa el-Fnaa evening", "Private departure logistics"],
        signatureExperience: "Riad courtyard breakfast with fresh orange blossom pastries.",
      },
      {
        id: "agafay-d",
        stepNumber: "02",
        category: "Desert",
        name: "Agafay Desert",
        durationLabel: "Day 2",
        nightsLabel: "Sunset & Camp",
        isFeatured: true,
        featuredBadge: "Top Pick",
        icon: Sparkles,
        themeColor: "terracotta",
        image: "/escapes/agafay-1d.jpg",
        location: "Agafay Rocky Desert",
        transferToNext: {
          label: "Atlas Express",
          duration: "4h",
          vehicle: "Private 4x4",
        },
        highlights: ["1-hour guided quad adventure", "Sunset camel walk", "Bonfire tagine dinner"],
        signatureExperience: "Candlelit dinner under desert sky with Berber acoustic music.",
      },
      {
        id: "sahara-d",
        stepNumber: "03",
        category: "Desert",
        name: "Sahara Dunes",
        durationLabel: "Days 3–4",
        nightsLabel: "2 Days · Glamping",
        isFeatured: true,
        featuredBadge: "Milky Way Camp",
        icon: Tent,
        themeColor: "terracotta",
        image: "/escapes/sahara-3d.jpg",
        location: "Erg Chebbi",
        highlights: ["Luxury tent with ensuite", "Sunrise sandboarding", "Draa Valley return drive"],
        signatureExperience: "Witnessing the sun crest over 150-meter golden Sahara dunes.",
      },
    ],
  },
  {
    id: "atlantic-surf",
    label: "6-Day Coast & Medina",
    durationDays: 6,
    priceEur: 560,
    subtitle: "Relaxed coastal immersion: Marrakech spices to Taghazout surf swells and Essaouira ramparts.",
    milestones: [
      {
        id: "marrakech-c",
        stepNumber: "01",
        category: "City",
        name: "Marrakech",
        durationLabel: "Days 1–2",
        nightsLabel: "1 Night · Riad",
        icon: Building2,
        themeColor: "amber",
        image: "/destinations/marrakech.jpg",
        location: "Historic Medina",
        transferToNext: {
          label: "Highway to Coast",
          duration: "3h",
          vehicle: "Private AC Van",
        },
        highlights: ["Medina exploration", "Souk shopping concierge", "Welcome dinner"],
        signatureExperience: "Private medina scout tour navigating hidden riad alleyways.",
      },
      {
        id: "taghazout-c",
        stepNumber: "02",
        category: "Coast",
        name: "Taghazout",
        durationLabel: "Days 2–4",
        nightsLabel: "2 Nights · Surf Camp",
        isFeatured: true,
        featuredBadge: "Surf & Yoga",
        icon: Sparkles,
        themeColor: "emerald",
        image: "/destinations/taghazout.jpg",
        location: "Atlantic Waves",
        transferToNext: {
          label: "Coastal Drive",
          duration: "2.5h",
          vehicle: "Private Transfer",
        },
        highlights: ["Daily surf coaching", "Rooftop ocean yoga", "Paradise Valley day trip"],
        signatureExperience: "Sunset rooftop yoga overlooking Anchor Point swells.",
      },
      {
        id: "essaouira-c",
        stepNumber: "03",
        category: "Coast",
        name: "Essaouira",
        durationLabel: "Days 4–6",
        nightsLabel: "2 Nights · Medina",
        icon: Waves,
        themeColor: "teal",
        image: "/destinations/essaouira.jpg",
        location: "Atlantic Ramparts",
        highlights: ["Sea ramparts walk", "Port seafood feast", "Return transfer to Marrakech"],
        signatureExperience: "Watching blue wooden fishing skiffs bring in the daily catch at the port.",
      },
    ],
  },
];

interface CuratedJourneySectionProps {
  onOpenInquiry?: () => void;
}

export const CuratedJourneySection: React.FC<CuratedJourneySectionProps> = ({ onOpenInquiry }) => {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>("sahara");

  const currentPreset = ROUTE_PRESETS[activePresetIndex];
  
  // Find current active milestone or default to first
  const activeMilestone = 
    currentPreset.milestones.find((m) => m.id === activeMilestoneId) || 
    currentPreset.milestones[0];

  const handleSelectPreset = (idx: number) => {
    setActivePresetIndex(idx);
    const newPreset = ROUTE_PRESETS[idx];
    const defaultFeatured = newPreset.milestones.find((m) => m.isFeatured) || newPreset.milestones[0];
    setActiveMilestoneId(defaultFeatured.id);
  };

  return (
    <section 
      id="itineraries" 
      className="relative py-20 lg:py-28 bg-[#0c221c] text-white overflow-hidden border-t border-[#1d463c] zellige-pattern-dark"
    >
      {/* Ambient Vignette & Golden Glow Lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c221c] via-[#0c221c]/92 to-[#0c221c] pointer-events-none" />
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[360px] bg-[#f4c36b]/10 rounded-full blur-[120px] pointer-events-none" 
      />
      <div 
        className="absolute bottom-10 left-1/4 w-[500px] h-[300px] bg-[#c95e3d]/10 rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          {/* Eyebrow badge with pulse */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16375A]/80 border border-[#C4A258]/30 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#f4c36b] animate-ping" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#f4c36b]">
              One Coordinated Route · Zero Friction
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white leading-tight">
            Morocco Journey
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-white/75 font-medium leading-relaxed max-w-2xl mx-auto">
            Mix destinations and experiences. SafarAtlas turns them into one coordinated route with transport, riads, guides and transfers.
          </p>

          {/* ROUTE PRESET SWITCHER PILLS */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {ROUTE_PRESETS.map((preset, idx) => {
              const isSelected = idx === activePresetIndex;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-[#C4A258] text-[#121a17] shadow-[0_4px_20px_rgba(196,162,88,0.35)] scale-105"
                      : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
                  }`}
                >
                  <span>{preset.label}</span>
                  <span className={`ml-2 text-[10px] ${isSelected ? "text-[#121a17]/80" : "text-[#f4c36b]"}`}>
                    ~€{preset.priceEur}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* STEPPER CARDS FLOW WITH CONNECTING RAIL */}
        <div className="relative max-w-5xl mx-auto pt-6">
          
          {/* Desktop Connecting Glowing Rail */}
          <div 
            className="absolute top-[64px] left-[8%] right-[8%] h-[2px] hidden md:block pointer-events-none z-0"
            style={{
              background: "linear-gradient(to right, rgba(196,162,88,0.2) 0%, rgba(201,94,61,0.6) 30%, rgba(5,150,105,0.6) 70%, rgba(196,162,88,0.2) 100%)",
            }}
          />

          {/* Stepper Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-3 lg:gap-4 relative z-10">
            {currentPreset.milestones.map((m, idx) => {
              const isActive = m.id === activeMilestone.id;
              const IconComponent = m.icon;

              // Card theme styling
              const isTerracotta = m.themeColor === "terracotta";
              const isEmerald = m.themeColor === "emerald";
              const isSlate = m.themeColor === "slate";

              return (
                <div
                  key={m.id}
                  onClick={() => setActiveMilestoneId(m.id)}
                  className="flex flex-col items-center gap-3 group cursor-pointer select-none"
                >
                  {/* Step Card */}
                  <div
                    className={`relative w-full aspect-square max-w-[136px] rounded-2xl flex flex-col items-center justify-center gap-1.5 p-3 transition-all duration-300 ${
                      isActive
                        ? "ring-2 ring-[#f4c36b] ring-offset-4 ring-offset-[#0c221c] -translate-y-2 shadow-[0_16px_36px_rgba(244,195,107,0.25)]"
                        : "hover:-translate-y-1 hover:shadow-lg"
                    } ${
                      isTerracotta
                        ? "bg-gradient-to-br from-[#c95e3d] via-[#ba5232] to-[#993b1f] border-2 border-[#c95e3d]/80 text-white shadow-[0_10px_30px_rgba(201,94,61,0.35)]"
                        : isEmerald
                        ? "bg-gradient-to-br from-[#0d6e4a] via-[#0b5c3e] to-[#064e3b] border-2 border-[#059669]/80 text-white shadow-[0_10px_30px_rgba(5,150,105,0.3)]"
                        : isSlate
                        ? "bg-[#142c24]/90 border-2 border-dashed border-white/20 text-white/80 opacity-85 hover:opacity-100"
                        : "bg-[#132c25] border-2 border-[#245246] hover:border-[#f4c36b]/60 text-white shadow-md"
                    }`}
                  >
                    {/* Featured Top Badge */}
                    {m.isFeatured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-widest bg-[#f4c36b] text-[#121a17] px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap z-20">
                        {m.featuredBadge || "Featured"}
                      </span>
                    )}

                    {/* Step Number Tag (e.g. 01, 02) */}
                    <span className="absolute top-2 left-2 text-[9px] font-mono font-bold text-white/50">
                      {m.stepNumber}
                    </span>

                    {/* Category Icon */}
                    <div className="relative">
                      <IconComponent 
                        className={`h-7 w-7 transition-transform duration-300 group-hover:scale-110 ${
                          isTerracotta || isEmerald ? "text-white" : "text-[#f4c36b]"
                        }`} 
                        strokeWidth={1.9} 
                      />
                    </div>

                    {/* Category Label */}
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest ${
                      isTerracotta || isEmerald ? "text-white/95" : "text-[#f4c36b]"
                    }`}>
                      {m.category}
                    </span>
                  </div>

                  {/* Text Details Below Card */}
                  <div className="text-center space-y-0.5">
                    <p className={`text-sm font-bold tracking-tight transition-colors ${
                      isActive ? "text-[#f4c36b]" : "text-white group-hover:text-white"
                    }`}>
                      {m.name}
                    </p>
                    <p className="text-[11px] text-white/60 font-medium">
                      {m.nightsLabel}
                    </p>
                  </div>

                  {/* Transfer pill indicator between steps */}
                  {m.transferToNext && idx < currentPreset.milestones.length - 1 && (
                    <div className="hidden lg:flex items-center gap-1 text-[9px] font-bold text-[#f4c36b]/70 bg-black/20 px-2 py-0.5 rounded-full border border-white/5 mt-1">
                      <Car className="w-2.5 h-2.5" />
                      <span>{m.transferToNext.duration}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* INTERACTIVE STAGE SPOTLIGHT CARD */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#0f2921]/90 border border-[#245246] p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all duration-500">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Visual Thumbnail Frame (5 cols) */}
            <div className="md:col-span-5 relative h-52 sm:h-60 rounded-2xl overflow-hidden border border-white/10 group shadow-lg">
              <img
                src={activeMilestone.image}
                alt={activeMilestone.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c221c] via-transparent to-black/30" />
              
              {/* Top Location Pill */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white border border-white/10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f4c36b]" />
                <span>{activeMilestone.location}</span>
              </div>

              {/* Bottom Step Indicator */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                <span className="font-mono font-bold text-[#f4c36b]">
                  Milestone {activeMilestone.stepNumber} of 0{currentPreset.milestones.length}
                </span>
                <span className="font-bold text-white/90">
                  {activeMilestone.durationLabel}
                </span>
              </div>
            </div>

            {/* Stage Content & Inclusions (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f4c36b] bg-[#f4c36b]/15 px-2.5 py-0.5 rounded-full border border-[#f4c36b]/30">
                    {activeMilestone.category} Milestone
                  </span>
                  <span className="text-xs font-bold text-white/60">
                    {activeMilestone.nightsLabel}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
                  {activeMilestone.name}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-medium">
                {activeMilestone.signatureExperience}
              </p>

              {/* What SafarAtlas Coordinates */}
              <div className="space-y-2 pt-1 border-t border-white/10">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-white/50">
                  Included Logistics & Experiences
                </p>
                <div className="space-y-1.5">
                  {activeMilestone.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-white/90">
                      <Check className="w-3.5 h-3.5 text-[#f4c36b] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transfer link note if present */}
              {activeMilestone.transferToNext && (
                <div className="pt-2 flex items-center gap-2 text-[11px] font-semibold text-[#f4c36b] bg-[#16375A]/60 p-2.5 rounded-xl border border-[#C4A258]/20">
                  <Car className="w-4 h-4 shrink-0 text-[#C4A258]" />
                  <span>
                    <strong>Next Leg:</strong> {activeMilestone.transferToNext.vehicle} ({activeMilestone.transferToNext.duration}) · Seamless Luggage Transfer
                  </span>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* BOTTOM MILESTONE SUMMARY CONSOLE BAR */}
        <div className="mx-auto max-w-4xl bg-[#091e18]/95 border border-[#245246] rounded-2xl p-4 sm:p-5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-5">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 text-center sm:text-left">
            
            {/* Metric 1: Duration */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#f4c36b] mb-0.5">
                Duration
              </p>
              <p className="text-base sm:text-lg font-black text-white tracking-tight">
                {currentPreset.durationDays} Days
              </p>
            </div>

            <div className="w-px h-8 bg-white/10 hidden sm:block" />

            {/* Metric 2: Estimated Price */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#f4c36b] mb-0.5">
                From
              </p>
              <p className="text-base sm:text-lg font-black text-white tracking-tight">
                €{currentPreset.priceEur} <span className="text-xs font-normal text-white/50">/ person</span>
              </p>
            </div>

            <div className="w-px h-8 bg-white/10 hidden sm:block" />

            {/* Metric 3: Operations Guarantee */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#f4c36b] mb-0.5">
                Managed By
              </p>
              <p className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0" />
                <span>SafarAtlas Concierge</span>
              </p>
            </div>

          </div>

          {/* Primary CTA */}
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            {onOpenInquiry ? (
              <button
                type="button"
                onClick={onOpenInquiry}
                className="w-full sm:w-auto relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#c95e3d] to-[#b34f31] text-white text-xs font-black tracking-widest shadow-[0_6px_30px_rgba(201,94,61,0.5)] hover:shadow-[0_8px_40px_rgba(201,94,61,0.7)] transition-all duration-300 hover:-translate-y-0.5 group/btn cursor-pointer"
              >
                <span className="absolute inset-0 bg-white/15 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                <svg className="w-4 h-4 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span className="relative z-10">Plan My Morocco Trip</span>
              </button>
            ) : (
              <Link
                href="/journey"
                className="w-full sm:w-auto relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#c95e3d] to-[#b34f31] text-white text-xs font-black tracking-widest shadow-[0_6px_30px_rgba(201,94,61,0.5)] hover:shadow-[0_8px_40px_rgba(201,94,61,0.7)] transition-all duration-300 hover:-translate-y-0.5 group/btn cursor-pointer"
              >
                <span className="absolute inset-0 bg-white/15 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                <svg className="w-4 h-4 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span className="relative z-10">Plan My Morocco Trip</span>
              </Link>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
