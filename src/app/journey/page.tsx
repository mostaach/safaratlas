"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredJourney, removeEscapeFromJourney, saveJourney, clearJourney, removeExtraExperience } from "../../lib/journeyStore";
import { JourneyState } from "../../lib/journeyTypes";
import { ESCAPES_PACKAGES } from "../../data/mockData";
import { calculateJourneyQuote } from "../../lib/pricingEngine";
import { trackEvent } from "../../lib/trackEvent";
import { Header } from "../../components/brand/Header";
import { Footer } from "../../components/brand/Footer";
import { Check, Plus, X, Compass, Sparkles } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const WHATSAPP_NUMBER = "212698017323";

export default function JourneyPage() {
  const [journey, setJourney] = useState<JourneyState>({
    items: [],
    destinations: ["Marrakech"],
    travelDates: "",
    groupSize: "2 travelers",
    notes: "",
    accommodations: [],
    extras: [],
    hasAirportTransfer: false,
    destinationStays: [],
  });

  const [groupSizeNum, setGroupSizeNum] = useState(2);

  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    travelDates: "",
    groupSize: "2 travelers",
    accommodationStyle: "Boutique Riad (Comfort & Charm)",
    transportPreference: "Private AC Chauffeur (Mercedes / 4x4)",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [leadRef, setLeadRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initial = getStoredJourney();
    setJourney(initial);

    const match = (initial.groupSize || "").match(/\d+/);
    if (match) {
      setGroupSizeNum(parseInt(match[0], 10));
    }

    setForm((prev) => ({
      ...prev,
      travelDates: initial.travelDates || "",
      groupSize: initial.groupSize || "2 travelers",
      notes: initial.notes || "",
    }));

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<JourneyState>;
      if (customEvent.detail) {
        setJourney(customEvent.detail);
      }
    };

    window.addEventListener("safaratlas_journey_update", handleUpdate);
    return () => window.removeEventListener("safaratlas_journey_update", handleUpdate);
  }, []);

  const quote = calculateJourneyQuote(journey, groupSizeNum);
  const totalDays = journey.items.reduce((sum, item) => sum + item.durationDays, 0);

  const handleGroupSizeChange = (n: number) => {
    setGroupSizeNum(n);
    const label = n === 1 ? "1 traveler (Solo)" : n === 2 ? "2 travelers (Couple)" : `${n} travelers`;
    setForm((prev) => ({ ...prev, groupSize: label }));
  };

  const handleRemoveItem = (slug: string) => {
    const updated = removeEscapeFromJourney(slug);
    setJourney(updated);
  };

  const handleAddDefaultEscape = (slug: string) => {
    const pkg = ESCAPES_PACKAGES.find((p) => p.slug === slug);
    if (!pkg) return;
    
    const exists = journey.items.some((i) => i.slug === slug);
    if (exists) return;

    let days = 1;
    let nights = 0;
    const matchDays = pkg.duration.match(/(\d+)\s*Day/i);
    const matchNights = pkg.duration.match(/(\d+)\s*Night/i);
    if (matchDays) days = parseInt(matchDays[1], 10);
    if (matchNights) nights = parseInt(matchNights[1], 10);

    const updated: JourneyState = {
      ...journey,
      items: [
        ...journey.items,
        {
          id: pkg.id,
          slug: pkg.slug,
          title: pkg.title,
          durationDays: days,
          durationNights: nights,
          location: pkg.location,
          priceFromEur: pkg.priceFromEur,
          image: pkg.image,
          badge: pkg.badge,
          addedAt: Date.now(),
        },
      ],
    };
    saveJourney(updated);
    setJourney(updated);
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const itemsSummary = journey.items.length > 0 
      ? journey.items.map((i) => `${i.title} (€${i.priceFromEur}/pp)`).join(" + ")
      : "Full Custom Morocco Route";

    const fullMessage = `Managed Journey Request (${journey.items.length} Escapes, Est. ~${totalDays || 5} Days, ${groupSizeNum} guests):
• Selected Escapes: ${itemsSummary}
• Est. Price From: €${quote.pricePerPersonEur}/person (Total: €${quote.totalPriceEur})
• Accommodation Style: ${form.accommodationStyle}
• Preferred Transport: ${form.transportPreference}

Traveler Notes & Special Requests:
${form.notes || "None provided."}`;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          partnerId: "journey_builder",
          partnerName: "Multi-Escape Journey Request",
          listingName: `Custom Journey (${journey.items.length} Escapes)`,
          travelerName: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          travelDates: form.travelDates,
          groupSize: form.groupSize,
          message: fullMessage,
          consent: true,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || "Failed to submit journey request. Please check your details.");
        return;
      }

      setLeadRef(data.id || "SA-" + Math.floor(Math.random() * 100000));
      setSubmitted(true);
      clearJourney();
      trackEvent("journey_request_submit", { leadId: data.id, count: journey.items.length });
    } catch {
      setLoading(false);
      setError("Network error. Please try again or reach us directly on WhatsApp.");
    }
  };

  const waMessage = encodeURIComponent(
    `Hi SafarAtlas! I am designing a custom Morocco journey for ${groupSizeNum} ${groupSizeNum === 1 ? "traveler" : "travelers"}.\n` +
    (form.travelDates ? `• Travel Dates: ${form.travelDates}\n` : "") +
    (journey.items.length > 0
      ? `• Selected Escapes: ${journey.items.map((i) => i.title).join(", ")}\n`
      : "") +
    (quote.pricePerPersonEur > 0
      ? `• Estimated Budget: from €${quote.pricePerPersonEur}/pp (Total: €${quote.totalPriceEur})\n`
      : "") +
    `• Accommodation: ${form.accommodationStyle}\n` +
    `• Transport: ${form.transportPreference}\n\n` +
    `Could your concierge help coordinate our full door-to-door itinerary?`
  );

  return (
    <main className="min-h-screen bg-[#07192d] text-[#f6f2ec]">
      <Header variant="dark" />

      {/* ── HERO BANNER ── */}
      <section className="relative pt-28 pb-12 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 border border-[#C4A258]/40 bg-[#C4A258]/10 px-3.5 py-1 text-[10px] font-mono uppercase tracking-widest text-[#C4A258]">
            <Sparkles className="w-3 h-3" />
            <span>Seamless Coordination · Dedicated Local Concierge</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium leading-tight text-[#f6f2ec]">
            Design Your Tailored <br className="hidden sm:block" />
            <span className="italic text-[#C4A258]">Morocco Journey</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-light text-[#f6f2ec]/75 leading-relaxed">
            Tell us what you want. We coordinate trusted local partners, private Mercedes transfers, boutique riad stays and verified desert camps — under one transparent itinerary.
          </p>

          {/* 3-Step Process Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8 text-left">
            {[
              { n: "01", title: "Tell us your plans", desc: "Share dates, party size and regions you wish to experience." },
              { n: "02", title: "We coordinate", desc: "SafarAtlas brings together vetted stays, transport and local guides." },
              { n: "03", title: "You travel", desc: "One itinerary, one dedicated WhatsApp concierge, zero hassles." },
            ].map((step) => (
              <div key={step.n} className="border-l-2 border-[#C4A258]/50 pl-4 py-1 bg-white/2">
                <span className="text-[10px] font-mono text-[#C4A258] block">{step.n}</span>
                <span className="text-xs font-bold text-[#f6f2ec] block mt-0.5">{step.title}</span>
                <span className="text-[11px] text-[#f6f2ec]/60 font-light leading-snug block mt-1">{step.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN WORKSPACE ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-10 lg:py-14">
        {submitted ? (
          /* Confirmation State */
          <div className="max-w-xl mx-auto bg-[#051324] border border-white/15 p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-[#C4A258]/15 border border-[#C4A258] flex items-center justify-center text-2xl text-[#C4A258] mx-auto">
              ✓
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C4A258] block">
              Journey Request Confirmed
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#f6f2ec]">
              Thank you, {form.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#f6f2ec]/70 leading-relaxed">
              Your custom Morocco journey request (Ref: <strong className="font-mono text-[#C4A258]">{leadRef}</strong>) has been logged in our Operations OS. Our local team will coordinate partner availability and send your transparent quote within 12 hours.
            </p>

            <div className="p-4 bg-[#07192d] border border-white/10 text-left text-xs space-y-2">
              <div className="flex justify-between"><span className="text-[#f6f2ec]/60">Travel Dates</span><strong className="text-[#f6f2ec]">{form.travelDates}</strong></div>
              <div className="flex justify-between"><span className="text-[#f6f2ec]/60">Group Size</span><strong className="text-[#f6f2ec]">{form.groupSize}</strong></div>
              <div className="flex justify-between"><span className="text-[#f6f2ec]/60">Accommodation</span><strong className="text-[#f6f2ec]">{form.accommodationStyle}</strong></div>
              <div className="flex justify-between"><span className="text-[#f6f2ec]/60">Status</span><strong className="text-[#25D366]">In Review by Operations</strong></div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi SafarAtlas! I submitted journey request ${leadRef} for ${form.name}. I'd like to chat on WhatsApp!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-medium uppercase tracking-[0.18em] transition-all cursor-pointer"
              >
                <SiWhatsapp className="w-4 h-4" />
                <span>Chat with Concierge on WhatsApp Now</span>
              </a>
              <Link
                href="/"
                className="block w-full py-3.5 border border-white/15 hover:border-[#C4A258] text-[#f6f2ec] text-xs uppercase tracking-[0.18em] text-center transition-all cursor-pointer"
              >
                Back to Discovery
              </Link>
            </div>
          </div>
        ) : (
          /* Main 2-Column Grid */
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            
            {/* ════════════════════════════
                LEFT COLUMN: BUILDER & TIMELINE
            ════════════════════════════ */}
            <div className="flex-1 min-w-0 space-y-8">

              {/* Header Strip */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#C4A258]" />
                  <h2 className="text-base font-serif font-bold text-[#f6f2ec]">Your Journey Itinerary</h2>
                </div>
                <span className="text-[10px] font-mono text-[#C4A258] bg-[#C4A258]/10 border border-[#C4A258]/30 px-2.5 py-1 uppercase tracking-widest">
                  {journey.items.length} {journey.items.length === 1 ? "Escape" : "Escapes"} Added
                </span>
              </div>

              {/* Items List or Empty State */}
              {journey.items.length === 0 ? (
                <div className="bg-[#051324] border border-white/12 p-8 sm:p-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-[#C4A258]/10 border border-[#C4A258]/30 text-[#C4A258] flex items-center justify-center text-xl mx-auto">
                    🐪
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#f6f2ec]">
                      Your journey timeline is currently open
                    </h3>
                    <p className="text-xs text-[#f6f2ec]/60 max-w-md mx-auto mt-1 font-light leading-relaxed">
                      Choose popular modular escapes below or fill out the right-hand panel to describe your dream Morocco route.
                    </p>
                  </div>

                  {/* Quick-add chips */}
                  <div className="pt-2">
                    <p className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase mb-3">Popular Escapes to Add</p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {ESCAPES_PACKAGES.map((pkg) => (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => handleAddDefaultEscape(pkg.slug)}
                          className="px-3 py-2 bg-white/4 border border-white/12 text-xs font-mono text-[#f6f2ec]/80 hover:border-[#C4A258] hover:text-[#C4A258] transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#C4A258]" />
                          <span>{pkg.title}</span>
                          <span className="text-[#C4A258]/60 text-[10px]">· €{pkg.priceFromEur}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {journey.items.map((item, index) => (
                    <div
                      key={item.slug}
                      className="bg-[#051324] border border-white/12 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all hover:border-white/20"
                    >
                      {/* Step index badge */}
                      <div className="w-8 h-8 bg-[#C4A258]/15 border border-[#C4A258]/40 flex items-center justify-center text-xs font-mono font-bold text-[#C4A258] shrink-0">
                        {item.assignedDay ? `D${item.assignedDay}` : index + 1}
                      </div>

                      {/* Thumbnail */}
                      <div className="w-20 h-20 sm:w-24 sm:h-20 bg-[#07192d] overflow-hidden shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {item.badge && (
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#C4A258] bg-[#C4A258]/10 border border-[#C4A258]/30 px-1.5 py-0.5">
                              {item.badge}
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-[#f6f2ec]/50">
                            {item.location}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-serif font-bold text-[#f6f2ec] leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#f6f2ec]/60 font-light">
                          Duration: {item.durationDays} Days / {item.durationNights} Nights
                        </p>
                      </div>

                      {/* Price & Remove */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                        <span className="text-sm font-serif font-bold text-[#C4A258]">
                          €{item.priceFromEur}<span className="text-[10px] font-mono text-[#C4A258]/70">/pp</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.slug)}
                          className="text-[11px] font-mono text-[#f6f2ec]/40 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Remove from journey"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add more escapes strip */}
                  <div className="bg-[#051324] border border-white/10 p-5 space-y-3">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#C4A258]">
                      Add More Curated Escapes to Your Route:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ESCAPES_PACKAGES.filter((p) => !journey.items.some((i) => i.slug === p.slug)).map((pkg) => (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => handleAddDefaultEscape(pkg.slug)}
                          className="px-3 py-1.5 bg-white/4 border border-white/10 text-xs font-mono text-[#f6f2ec]/70 hover:border-[#C4A258] hover:text-[#C4A258] transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Plus className="w-3 h-3 text-[#C4A258]" />
                          <span>{pkg.title}</span>
                          <span className="text-[#C4A258]/60 text-[10px]">· €{pkg.priceFromEur}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SafarAtlas Promise Box */}
              <div className="bg-[#051324] border border-[#C4A258]/30 p-6 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C4A258] block">
                  The SafarAtlas Promise
                </span>
                <h4 className="text-base font-serif font-medium text-[#f6f2ec]">
                  &ldquo;If you are coming to Morocco, you are our guest.&rdquo;
                </h4>
                <p className="text-xs text-[#f6f2ec]/70 font-light leading-relaxed">
                  No separate bookings, no conflicting chauffeurs, no hidden agency commissions. We coordinate your entire route under one dedicated WhatsApp concierge, verified local partners, and transparent pricing.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-white/10 text-[11px] font-light text-[#f6f2ec]/80">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#C4A258] shrink-0" />
                    <span>Private Mercedes Transfers</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#C4A258] shrink-0" />
                    <span>Vetted Stays & Camps</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#C4A258] shrink-0" />
                    <span>24/7 Human WhatsApp Help</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ════════════════════════════
                RIGHT COLUMN: SUMMARY & PREFERENCES
            ════════════════════════════ */}
            <div className="w-full lg:w-[380px] shrink-0 space-y-5 lg:sticky lg:top-28">
              
              {/* Trip Estimate Summary */}
              <div className="bg-[#051324] border border-white/15 p-6 space-y-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase block mb-1">
                    Your Trip Estimate
                  </span>
                  <h3 className="text-lg font-serif font-medium text-[#f6f2ec]">
                    Custom Route Summary
                  </h3>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#07192d] border border-white/10 p-3">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#f6f2ec]/40 block mb-1">Selected Escapes</span>
                    <span className="text-xl font-bold text-[#f6f2ec]">{journey.items.length}</span>
                  </div>
                  <div className="bg-[#07192d] border border-white/10 p-3">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#f6f2ec]/40 block mb-1">Est. Duration</span>
                    <span className="text-xl font-bold text-[#f6f2ec]">~{totalDays > 0 ? totalDays : 5} Days</span>
                  </div>
                </div>

                {/* Pricing Banner */}
                <div className="bg-[#07192d] border border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#f6f2ec]/40 block mb-1">Pricing Status</span>
                      <span className="text-lg font-serif font-bold text-[#C4A258]">
                        {quote.pricePerPersonEur > 0
                          ? `From €${quote.pricePerPersonEur}/pp`
                          : "Tailored Quote"}
                      </span>
                      <span className="block text-[10px] text-[#f6f2ec]/50 mt-0.5 font-light">
                        {quote.pricePerPersonEur > 0
                          ? `Est. Total: €${quote.totalPriceEur} for ${groupSizeNum} guests`
                          : "Seasonal & group rates via WhatsApp"}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#25D366] bg-[#25D366]/15 px-2 py-1 border border-[#25D366]/30 shrink-0">
                      Zero Fees
                    </span>
                  </div>
                </div>

                {/* Group Size Selector */}
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#f6f2ec]/50 block mb-2">
                    Party Size (Guests)
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => handleGroupSizeChange(n)}
                        className={`w-9 h-9 text-xs font-mono font-bold border transition-all cursor-pointer ${
                          groupSizeNum === n
                            ? "bg-[#C4A258] text-[#07192d] border-[#C4A258]"
                            : "bg-transparent text-[#f6f2ec]/60 border-white/15 hover:border-[#C4A258]/50"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Itemized list if any */}
                {journey.items.length > 0 && (
                  <div className="border-t border-white/10 pt-3 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#f6f2ec]/40 block mb-1">
                      Itinerary Breakdown:
                    </span>
                    {journey.items.map((it) => (
                      <div key={it.slug} className="flex justify-between text-xs text-[#f6f2ec]/70">
                        <span className="truncate pr-2">{it.title}</span>
                        <span className="font-mono text-[#C4A258] shrink-0">€{it.priceFromEur}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Traveler Form Card */}
              <div className="bg-[#051324] border border-white/15 p-6 space-y-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase block mb-1">
                    Traveler Preferences
                  </span>
                  <h4 className="text-base font-serif font-medium text-[#f6f2ec]">
                    Request Your Coordinated Proposal
                  </h4>
                </div>

                <form onSubmit={handleSubmitRequest} className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#f6f2ec]/70 mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-light text-[#f6f2ec] placeholder:text-white/30 outline-none focus:border-[#C4A258]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#f6f2ec]/70 mb-1">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="sarah@example.com"
                      className="w-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-light text-[#f6f2ec] placeholder:text-white/30 outline-none focus:border-[#C4A258]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#f6f2ec]/70 mb-1">
                        Travel Dates *
                      </label>
                      <input
                        required
                        value={form.travelDates}
                        onChange={(e) => setForm({ ...form, travelDates: e.target.value })}
                        placeholder="Oct 12 – Oct 20"
                        className="w-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-light text-[#f6f2ec] placeholder:text-white/30 outline-none focus:border-[#C4A258]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#f6f2ec]/70 mb-1">
                        WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={form.whatsapp}
                        onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                        placeholder="+1 / +44..."
                        className="w-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-light text-[#f6f2ec] placeholder:text-white/30 outline-none focus:border-[#C4A258]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#f6f2ec]/70 mb-1">
                      Accommodation Style
                    </label>
                    <select
                      value={form.accommodationStyle}
                      onChange={(e) => setForm({ ...form, accommodationStyle: e.target.value })}
                      className="w-full border border-white/15 bg-[#07192d] px-3 py-2 text-xs font-light text-[#f6f2ec] outline-none focus:border-[#C4A258]"
                    >
                      <option className="bg-[#07192d] text-[#f6f2ec]">Boutique Riad (Comfort & Charm)</option>
                      <option className="bg-[#07192d] text-[#f6f2ec]">Luxury Heritage Palace (5-Star)</option>
                      <option className="bg-[#07192d] text-[#f6f2ec]">Desert Glamping Camp (Ensuite)</option>
                      <option className="bg-[#07192d] text-[#f6f2ec]">Mix of Authentic & Premium</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#f6f2ec]/70 mb-1">
                      Transport Option
                    </label>
                    <select
                      value={form.transportPreference}
                      onChange={(e) => setForm({ ...form, transportPreference: e.target.value })}
                      className="w-full border border-white/15 bg-[#07192d] px-3 py-2 text-xs font-light text-[#f6f2ec] outline-none focus:border-[#C4A258]"
                    >
                      <option className="bg-[#07192d] text-[#f6f2ec]">Private AC Chauffeur (Mercedes / 4x4)</option>
                      <option className="bg-[#07192d] text-[#f6f2ec]">Point-to-Point Private Transfers</option>
                      <option className="bg-[#07192d] text-[#f6f2ec]">Self-Drive Recommendation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#f6f2ec]/70 mb-1">
                      Special Wishes & Notes
                    </label>
                    <textarea
                      rows={2}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="e.g. Sunset in Merzouga, dietary needs, anniversary..."
                      className="w-full resize-none border border-white/15 bg-white/5 px-3 py-2 text-xs font-light text-[#f6f2ec] placeholder:text-white/30 outline-none focus:border-[#C4A258]"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-950/50 border border-red-800/50 text-xs text-red-200">
                      {error}
                    </div>
                  )}

                  {/* Primary Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#C4A258] hover:bg-[#d8bb78] text-[#07192d] font-medium text-xs uppercase tracking-[0.18em] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? "Submitting to Operations OS..." : "REQUEST MY COORDINATED QUOTE →"}
                  </button>

                  {/* Instant WhatsApp Quick Link */}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2"
                  >
                    <SiWhatsapp className="w-3.5 h-3.5" />
                    <span>Instant Quote via WhatsApp</span>
                  </a>

                  {/* Trust Signals */}
                  <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-[#f6f2ec]/50 pt-1">
                    <span>12h Turnaround</span>
                    <span>•</span>
                    <span>Zero Upfront Fees</span>
                    <span>•</span>
                    <span>Verified Partners</span>
                  </div>
                </form>
              </div>

            </div>

          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
