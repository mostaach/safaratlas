"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "../../components/brand/Header";
import { Footer } from "../../components/brand/Footer";
import { ESCAPES_PACKAGES } from "../../data/mockData";
import { MARRAKECH_DESTINATION_DATA } from "../../data/marrakechDestinationData";
import { addEscapeToJourney, setStayDurationDays, getStoredJourney, removeEscapeFromJourney, addExtraExperience } from "../../lib/journeyStore";
import { JourneyState } from "../../lib/journeyTypes";
import { Check, Plus, X, ChevronRight } from "lucide-react";

const MARRAKECH_ESCAPES_IDS = [
  "escape-agafay-1d",
  "escape-sahara-3d",
  "escape-atlas-2d",
  "escape-imlil-1d",
  "escape-ouzoud-1d",
  "escape-ourika-1d",
];

const WHATSAPP_NUMBER = "212698017323";

export default function MarrakechPage() {
  const [selectedDuration, setSelectedDuration] = useState(3);
  const [journey, setJourney] = useState<JourneyState>({
    items: [],
    destinations: ["Marrakech"],
    travelDates: "",
    groupSize: "2 travelers",
    notes: "",
    accommodations: [],
    extras: [],
    hasAirportTransfer: false,
    destinationStays: [{ destination: "Marrakech", daysCount: 3 }],
  });
  const [placingEscape, setPlacingEscape] = useState<typeof marrakechEscapes[0] | null>(null);
  const [addedSlugs, setAddedSlugs] = useState<Set<string>>(new Set());
  const [groupSize, setGroupSize] = useState(2);

  const marrakechEscapes = ESCAPES_PACKAGES.filter((p) => MARRAKECH_ESCAPES_IDS.includes(p.id));

  useEffect(() => {
    const stored = getStoredJourney();
    setJourney(stored);
    const slugs = new Set(stored.items.map((i) => i.slug));
    setAddedSlugs(slugs);

    const handleUpdate = (e: Event) => {
      const ce = e as CustomEvent<JourneyState>;
      if (ce.detail) {
        setJourney(ce.detail);
        setAddedSlugs(new Set(ce.detail.items.map((i) => i.slug)));
      }
    };
    window.addEventListener("safaratlas_journey_update", handleUpdate);
    return () => window.removeEventListener("safaratlas_journey_update", handleUpdate);
  }, []);

  const scaffolds = MARRAKECH_DESTINATION_DATA.scaffoldingByDuration[selectedDuration] ||
    MARRAKECH_DESTINATION_DATA.scaffoldingByDuration[3];

  const totalSelectedEscapes = journey.items.length;
  const estimatedDays = Math.max(selectedDuration, journey.items.reduce((s, i) => s + i.durationDays, 0));
  const estimatedPricePerPerson = journey.items.reduce((s, i) => s + i.priceFromEur, 0);

  const handleDuration = (d: number) => {
    setSelectedDuration(d);
    setStayDurationDays("Marrakech", d);
  };

  const handleOpenPlacement = (pkg: typeof marrakechEscapes[0]) => {
    if (addedSlugs.has(pkg.slug)) {
      const updated = removeEscapeFromJourney(pkg.slug);
      setJourney(updated);
      return;
    }
    setPlacingEscape(pkg);
  };

  const handleConfirmPlacement = (dayNumber?: number) => {
    if (!placingEscape) return;
    addEscapeToJourney({
      id: placingEscape.id,
      slug: placingEscape.slug,
      title: placingEscape.title,
      duration: placingEscape.duration,
      location: placingEscape.location,
      priceFromEur: placingEscape.priceFromEur,
      image: placingEscape.image,
      badge: placingEscape.badge,
      assignedDay: dayNumber,
      destinationContext: "Marrakech",
    });
    setPlacingEscape(null);
  };

  const waMessage = encodeURIComponent(
    `Hi SafarAtlas! I'm planning a ${selectedDuration}-day Marrakech stay for ${groupSize} ${groupSize === 1 ? "person" : "people"}.\n` +
    (journey.items.length > 0
      ? `Selected Escapes: ${journey.items.map((i) => i.title).join(", ")}\n`
      : "") +
    `Estimated budget: from €${estimatedPricePerPerson}/pp\n\nCan you help coordinate my full journey?`
  );

  return (
    <main className="min-h-screen bg-[#07192d] text-[#f6f2ec]">
      <Header variant="dark" />

      {/* ── HERO BANNER ── */}
      <section
        className="relative pt-28 pb-14 px-4 sm:px-8 border-b border-white/10 overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(7,25,45,0.55) 0%, rgba(7,25,45,0.96) 100%), url('/destinations/marrakech.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#C4A258] uppercase mb-5">
            <Link href="/" className="hover:underline opacity-70">Morocco</Link>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <span className="text-[#f6f2ec]/60">Destinations</span>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <span className="font-bold text-[#C4A258]">Marrakech</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium leading-tight text-[#f6f2ec]">
            Build Your Marrakech<br />
            <span className="italic text-[#C4A258]">Journey</span>
          </h1>

          <p className="mt-4 text-sm text-[#f6f2ec]/75 max-w-xl leading-relaxed">
            Choose how long you&apos;re staying, then assemble your days with curated Escapes. SafarAtlas coordinates your private transport, local partners, and 24/7 concierge.
          </p>

          {/* 3-Step Process */}
          <div className="grid grid-cols-3 gap-4 mt-10 max-w-2xl">
            {[
              { n: "01", title: "Choose your stay", desc: "Select 1 to 5+ days in Marrakech" },
              { n: "02", title: "Add Escapes", desc: "Place curated day trips onto your timeline" },
              { n: "03", title: "We coordinate", desc: "Private transport, guides & full concierge" },
            ].map((step) => (
              <div key={step.n} className="border-l-2 border-[#C4A258]/40 pl-4">
                <span className="text-[10px] font-mono text-[#C4A258]/70 block">{step.n}</span>
                <span className="text-xs font-bold text-[#f6f2ec] block mt-0.5">{step.title}</span>
                <span className="text-[11px] text-[#f6f2ec]/55 leading-snug block mt-1">{step.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN 2-COLUMN WORKSPACE ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

          {/* ════════════════════════════
              LEFT COLUMN — PLANNER
          ════════════════════════════ */}
          <div className="flex-1 min-w-0 space-y-8">

            {/* ── A. DURATION SELECTOR ── */}
            <div className="bg-[#051324] border border-white/12 p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase mb-0.5">Step 1</p>
                  <h2 className="text-base font-bold text-[#f6f2ec]">How long are you staying in Marrakech?</h2>
                </div>
                <span className="text-xs font-mono text-[#f6f2ec]/40 hidden sm:block">{selectedDuration} {selectedDuration === 1 ? "night" : "nights"} selected</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {[1, 2, 3, 4, 5].map((d) => (
                  <button
                    key={d}
                    onClick={() => handleDuration(d)}
                    className={`px-5 py-2.5 text-xs font-mono uppercase tracking-widest border transition-all cursor-pointer ${
                      selectedDuration === d
                        ? "bg-[#C4A258] text-[#07192d] font-bold border-[#C4A258]"
                        : "bg-transparent text-[#f6f2ec]/70 border-white/15 hover:border-[#C4A258]/50 hover:text-[#f6f2ec]"
                    }`}
                  >
                    {d} {d === 1 ? "Day" : "Days"}
                  </button>
                ))}
                <button
                  onClick={() => handleDuration(7)}
                  className={`px-5 py-2.5 text-xs font-mono uppercase tracking-widest border transition-all cursor-pointer ${
                    selectedDuration >= 6
                      ? "bg-[#C4A258] text-[#07192d] font-bold border-[#C4A258]"
                      : "bg-transparent text-[#f6f2ec]/70 border-white/15 hover:border-[#C4A258]/50 hover:text-[#f6f2ec]"
                  }`}
                >
                  6–7+ Days
                </button>
              </div>
            </div>

            {/* ── B. DAY-BY-DAY TIMELINE ── */}
            <div className="bg-[#051324] border border-white/12 p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase mb-0.5">Step 2</p>
                  <h2 className="text-base font-bold text-[#f6f2ec]">Your {selectedDuration}-Day Marrakech Timeline</h2>
                </div>
                {totalSelectedEscapes > 0 && (
                  <span className="text-[10px] font-mono font-bold bg-[#C4A258]/15 text-[#C4A258] border border-[#C4A258]/30 px-2.5 py-1 tracking-widest uppercase">
                    {totalSelectedEscapes} Escape{totalSelectedEscapes > 1 ? "s" : ""} Added
                  </span>
                )}
              </div>

              {journey.items.length === 0 ? (
                <div className="border border-dashed border-white/10 p-8 text-center">
                  <div className="text-3xl mb-3">🗺️</div>
                  <p className="text-sm font-bold text-[#f6f2ec]/70">Your journey timeline is currently empty</p>
                  <p className="text-xs text-[#f6f2ec]/45 mt-1">Select Escapes from the catalog below to populate your days</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {journey.items.map((item, i) => (
                    <div key={item.slug} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#C4A258]/15 border border-[#C4A258]/30 flex items-center justify-center">
                        <span className="text-[10px] font-mono font-bold text-[#C4A258]">
                          {item.assignedDay ? `D${item.assignedDay}` : `${i + 1}`}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#f6f2ec] truncate">{item.title}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-[10px] font-mono text-[#f6f2ec]/50">{item.location}</span>
                          <span className="text-[10px] text-[#C4A258] font-mono">€{item.priceFromEur}/pp</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          removeEscapeFromJourney(item.slug);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-[#f6f2ec]/40 hover:text-red-400 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Day Scaffold Reference */}
              <div className="mt-6 pt-5 border-t border-white/8">
                <p className="text-[10px] font-mono tracking-widest text-[#f6f2ec]/40 uppercase mb-3">Suggested Day Structure</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {scaffolds.map((s) => (
                    <div key={s.dayNumber} className="flex items-start gap-3 p-3 bg-white/3 border border-white/8">
                      <span className="text-base leading-none mt-0.5">{s.icon}</span>
                      <div>
                        <span className="text-[10px] font-mono text-[#C4A258]/70 uppercase block">Day {s.dayNumber}</span>
                        <span className="text-xs text-[#f6f2ec]/70 font-medium">
                          {s.title.replace(`Day ${s.dayNumber} — `, "")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── C. CURATED ESCAPE CATALOG ── */}
            <div className="bg-[#051324] border border-white/12 p-6">
              <div className="mb-5">
                <p className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase mb-0.5">Step 3 · Select Escapes</p>
                <h2 className="text-base font-bold text-[#f6f2ec]">Curated Marrakech Escapes</h2>
                <p className="text-xs text-[#f6f2ec]/55 mt-1">Each includes private transport, local guide, and authentic hospitality.</p>
              </div>

              <div className="space-y-3">
                {marrakechEscapes.map((pkg) => {
                  const isAdded = addedSlugs.has(pkg.slug);
                  return (
                    <div
                      key={pkg.id}
                      className={`flex items-center gap-4 p-4 border transition-all cursor-pointer group ${
                        isAdded
                          ? "border-[#C4A258]/40 bg-[#C4A258]/5"
                          : "border-white/10 bg-white/3 hover:border-white/20"
                      }`}
                      onClick={() => handleOpenPlacement(pkg)}
                    >
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 w-16 h-16 overflow-hidden bg-[#07192d] relative">
                        <Image src={pkg.image} alt={pkg.title} fill className="object-cover" sizes="64px" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                            <p className="text-sm font-bold text-[#f6f2ec] leading-snug">{pkg.title}</p>
                            <div className="flex items-center gap-3 mt-1 flex-wrap">
                              <span className="text-[10px] font-mono text-[#f6f2ec]/50">{pkg.duration}</span>
                              <span className="text-[10px] font-mono text-[#f6f2ec]/50">· {pkg.location}</span>
                              {pkg.badge && (
                                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#C4A258] border border-[#C4A258]/30 bg-[#C4A258]/10 px-1.5 py-0.5">
                                  {pkg.badge}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-sm font-serif font-bold text-[#C4A258] flex-shrink-0">
                            €{pkg.priceFromEur}<span className="text-xs font-mono text-[#C4A258]/70">/pp</span>
                          </span>
                        </div>
                      </div>

                      {/* Add/Remove Button */}
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 border flex items-center justify-center transition-all ${
                          isAdded
                            ? "border-[#C4A258] bg-[#C4A258] text-[#07192d]"
                            : "border-white/20 text-[#f6f2ec]/50 group-hover:border-[#C4A258]/60 group-hover:text-[#C4A258]"
                        }`}>
                          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── D. INDIVIDUAL EXPERIENCES ── */}
            <div className="bg-[#051324] border border-white/12 p-6">
              <div className="mb-5">
                <p className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase mb-0.5">Step 4 · In-City Extras</p>
                <h2 className="text-base font-bold text-[#f6f2ec]">Individual Marrakech Experiences</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MARRAKECH_DESTINATION_DATA.extras.map((extra) => (
                  <div
                    key={extra.id}
                    onClick={() => addExtraExperience({ id: extra.id, title: extra.title, priceEur: extra.priceEur })}
                    className="flex items-center gap-4 p-4 border border-white/10 bg-white/3 hover:border-white/20 cursor-pointer group transition-all"
                  >
                    <span className="text-2xl flex-shrink-0">{extra.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#f6f2ec]">{extra.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-mono text-[#f6f2ec]/50">{extra.duration}</span>
                        <span className="text-[10px] font-mono text-[#C4A258]">€{extra.priceEur}/pp</span>
                      </div>
                    </div>
                    <Plus className="w-4 h-4 text-[#f6f2ec]/30 group-hover:text-[#C4A258] flex-shrink-0 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ════════════════════════════
              RIGHT COLUMN — SUMMARY PANEL
          ════════════════════════════ */}
          <div className="w-full lg:w-[360px] flex-shrink-0 space-y-5 lg:sticky lg:top-28">

            {/* Trip Estimate Card */}
            <div className="bg-[#051324] border border-white/15 p-6 space-y-4">
              <div>
                <p className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase block mb-1">Your Trip Estimate</p>
                <h3 className="text-lg font-serif font-bold text-[#f6f2ec]">Marrakech Stay Summary</h3>
              </div>

              {/* Metric Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#07192d] border border-white/10 p-3">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-[#f6f2ec]/40 mb-1">Selected Escapes</p>
                  <p className="text-xl font-bold text-[#f6f2ec]">{totalSelectedEscapes}</p>
                </div>
                <div className="bg-[#07192d] border border-white/10 p-3">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-[#f6f2ec]/40 mb-1">Est. Duration</p>
                  <p className="text-xl font-bold text-[#f6f2ec]">~{estimatedDays} Days</p>
                </div>
              </div>

              <div className="bg-[#07192d] border border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-wider text-[#f6f2ec]/40 mb-1">Pricing Status</p>
                    <p className="text-base font-serif font-bold text-[#f6f2ec]">
                      {estimatedPricePerPerson > 0
                        ? `From €${estimatedPricePerPerson}/pp`
                        : "Tailored Quote"}
                    </p>
                    <p className="text-[10px] text-[#f6f2ec]/50 mt-0.5">Coordinated via WhatsApp · Zero booking fees</p>
                  </div>
                  {estimatedPricePerPerson > 0 && (
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1">
                      Live
                    </span>
                  )}
                </div>
              </div>

              {/* Group Size */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#f6f2ec]/50 block mb-2">
                  Group Size
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <button
                      key={n}
                      onClick={() => setGroupSize(n)}
                      className={`w-9 h-9 text-xs font-mono font-bold border transition-all cursor-pointer ${
                        groupSize === n
                          ? "bg-[#C4A258] text-[#07192d] border-[#C4A258]"
                          : "text-[#f6f2ec]/60 border-white/15 hover:border-[#C4A258]/40"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-[#f6f2ec]/40 font-mono mt-1.5">
                  {groupSize === 1 ? "Solo traveler" : groupSize <= 2 ? "Private couple" : groupSize <= 4 ? "Small group / Family" : "Group — best value"}
                </p>
              </div>

              {/* Items in Journey */}
              {journey.items.length > 0 && (
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#f6f2ec]/40">Selected Escapes</p>
                  {journey.items.map((item) => (
                    <div key={item.slug} className="flex items-center justify-between text-xs">
                      <span className="text-[#f6f2ec]/70 truncate flex-1 pr-2">{item.title}</span>
                      <span className="font-mono text-[#C4A258] flex-shrink-0">€{item.priceFromEur}</span>
                    </div>
                  ))}
                  {estimatedPricePerPerson > 0 && (
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-white/8">
                      <span className="text-[#f6f2ec]/50 font-mono">Est. Total ({groupSize} pax)</span>
                      <span className="font-bold text-[#C4A258] font-mono">€{estimatedPricePerPerson * groupSize}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* CTA Panel */}
            <div className="bg-[#051324] border border-white/15 p-6 space-y-4">
              <div>
                <p className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase mb-1">Next Step</p>
                <h3 className="text-base font-bold text-[#f6f2ec]">Request Your Coordinated Journey</h3>
                <p className="text-xs text-[#f6f2ec]/55 mt-1 leading-relaxed">
                  Our team reviews your Escape selections and builds a full, transparent itinerary with your accommodation, transfers, and local partners.
                </p>
              </div>

              {/* Primary CTA — WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-normal text-xs uppercase tracking-widest py-4 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Instant WhatsApp Quote</span>
              </a>

              {/* Secondary — Journey Review */}
              <Link
                href="/journey"
                className="w-full flex items-center justify-center gap-2 bg-[#C4A258] hover:bg-[#d8bb78] text-[#07192d] font-normal text-xs uppercase tracking-widest py-3.5 transition-all"
              >
                <span>Full Journey Builder →</span>
              </Link>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-5 pt-2 border-t border-white/8">
                <div className="flex items-center gap-1.5 text-[10px] text-[#f6f2ec]/40 font-mono">
                  <Check className="w-3 h-3 text-[#C4A258]" />
                  <span>Zero Booking Fees</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#f6f2ec]/40 font-mono">
                  <Check className="w-3 h-3 text-[#C4A258]" />
                  <span>Verified Partners</span>
                </div>
              </div>
            </div>

            {/* SafarAtlas Promise Panel */}
            <div className="border border-[#C4A258]/25 bg-[#C4A258]/5 p-5 space-y-3">
              <p className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase">The SafarAtlas Promise</p>
              <p className="text-sm font-serif font-bold text-[#f6f2ec] leading-snug">
                &quot;If you are coming to Morocco, you are our guest.&quot;
              </p>
              <div className="space-y-2">
                {[
                  "Private door-to-door Mercedes transfers",
                  "Direct vetted local partners — zero tourist traps",
                  "Dedicated 24/7 human WhatsApp concierge",
                  "Transparent pricing, zero hidden fees",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[11px] text-[#f6f2ec]/70">
                    <Check className="w-3 h-3 text-[#C4A258] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEIGHBOURHOOD GUIDE ── */}
      <section className="border-t border-white/10 bg-[#051324] py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="mb-8">
            <p className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase mb-1">Explore the Region</p>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f6f2ec]">Places Around Marrakech</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MARRAKECH_DESTINATION_DATA.places.map((place, i) => (
              <div key={i} className="bg-[#07192d] border border-white/10 p-6 hover:border-white/20 transition-all">
                <span className="text-[9px] font-mono tracking-widest text-[#C4A258] uppercase block mb-2">{place.tag}</span>
                <h3 className="font-serif font-bold text-base text-[#f6f2ec] leading-snug">{place.name}</h3>
                <p className="text-[11px] text-[#C4A258]/70 font-mono mt-0.5">{place.subtitle}</p>
                <p className="text-xs text-[#f6f2ec]/60 mt-3 leading-relaxed">{place.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 sm:py-20 max-w-3xl mx-auto px-4 sm:px-8">
        <div className="mb-8">
          <p className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase mb-1">Know Before You Go</p>
          <h2 className="text-2xl font-serif font-bold text-[#f6f2ec]">Common Questions</h2>
        </div>
        <div className="space-y-4">
          {MARRAKECH_DESTINATION_DATA.faq.map((item, i) => (
            <div key={i} className="border border-white/10 bg-[#051324] p-6">
              <h4 className="text-sm font-bold text-[#f6f2ec] mb-2">{item.q}</h4>
              <p className="text-xs text-[#f6f2ec]/65 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLACEMENT MODAL ── */}
      {placingEscape && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#07192d] border border-white/20 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#C4A258] block mb-1">Assign to Your Timeline</p>
              <h4 className="text-lg font-serif font-bold text-[#f6f2ec]">Place this Escape on which day?</h4>
              <p className="text-xs text-[#f6f2ec]/60 mt-1 leading-relaxed">
                {placingEscape.title} · {placingEscape.duration} · From €{placingEscape.priceFromEur}/pp
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {scaffolds.map((s) => (
                <button
                  key={s.dayNumber}
                  onClick={() => handleConfirmPlacement(s.dayNumber)}
                  className="p-3 bg-white/5 border border-white/12 hover:border-[#C4A258] hover:bg-[#C4A258]/8 text-left transition-all cursor-pointer"
                >
                  <span className="text-xs font-mono font-bold text-[#C4A258] block">Day {s.dayNumber}</span>
                  <span className="text-[11px] text-[#f6f2ec]/70 block mt-0.5 leading-tight">
                    {s.title.replace(`Day ${s.dayNumber} — `, "")}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <button onClick={() => handleConfirmPlacement(undefined)} className="text-xs text-[#f6f2ec]/60 hover:text-[#f6f2ec] underline font-mono">
                Keep flexible — decide later
              </button>
              <button onClick={() => setPlacingEscape(null)} className="text-xs text-[#f6f2ec]/40 hover:text-white">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
