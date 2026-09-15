"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getStoredJourney, removeEscapeFromJourney, saveJourney, clearJourney } from "../../lib/journeyStore";
import { JourneyState } from "../../lib/journeyTypes";
import { ESCAPES_PACKAGES } from "../../data/mockData";
import { trackEvent } from "../../lib/trackEvent";
import { Header } from "../../components/brand/Header";
import { Footer } from "../../components/brand/Footer";

export default function JourneyPage() {
  const [journey, setJourney] = useState<JourneyState>({
    items: [],
    destinations: ["Marrakech"],
    travelDates: "",
    groupSize: "2 travelers",
    notes: "",
  });

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

  const totalDays = journey.items.reduce((sum, item) => sum + item.durationDays, 0);
  const estimatedPriceEur = journey.items.reduce((sum, item) => sum + item.priceFromEur, 0);

  const handleRemoveItem = (slug: string) => {
    const updated = removeEscapeFromJourney(slug);
    setJourney(updated);
  };

  const handleAddDefaultEscape = (slug: string) => {
    const pkg = ESCAPES_PACKAGES.find((p) => p.slug === slug);
    if (!pkg) return;
    
    // Add item directly
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
      ? journey.items.map((i) => i.title).join(" + ")
      : "Full Custom Morocco Trip (Flexible Escapes)";

    const fullMessage = `Managed Journey Request (${journey.items.length} Selected Escapes, Est. ~${totalDays || 5} Days):
• Selected Escapes: ${itemsSummary}
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

  return (
    <main className="min-h-screen bg-[#07192d] text-[#f6f2ec]">
      {/* Global Brand Header */}
      <Header variant="dark" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Page Title */}
        <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-[#C4A258]/15 text-[#C4A258] text-xs font-extrabold uppercase tracking-widest border border-[#C4A258]/30 inline-block">
            Seamless Coordination · Dedicated Local Concierge
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#f6f2ec] tracking-tight">
            Design Your Tailored Morocco Journey
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#f6f2ec]/70 leading-relaxed max-w-2xl mx-auto">
            Assemble your dream escapes. SafarAtlas coordinates door-to-door private transport, handpicked riads, luxury camps, and certified guides under one transparent itinerary.
          </p>
        </div>

        {submitted ? (
          /* Confirmation State */
          <div className="max-w-xl mx-auto bg-[#0d2239]/80 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#C4A258]/20 border-2 border-[#C4A258] rounded-full flex items-center justify-center text-3xl font-black text-[#C4A258] mx-auto">
              ✓
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4A258] block">
              Journey Request Confirmed & Saved
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f6f2ec]">
              Thank you, {form.name}!
            </h2>
            <p className="text-xs sm:text-sm text-[#f6f2ec]/70 leading-relaxed">
              Your custom Morocco journey request (Ref: <strong className="font-mono text-[#C4A258]">{leadRef}</strong>) has been logged in our Operations OS. Our local team will coordinate partner availability and send your transparent quote within 12 hours.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left text-xs space-y-2">
              <div className="flex justify-between"><span className="text-[#f6f2ec]/60">Travel Dates</span><strong className="text-[#f6f2ec]">{form.travelDates}</strong></div>
              <div className="flex justify-between"><span className="text-[#f6f2ec]/60">Group Size</span><strong className="text-[#f6f2ec]">{form.groupSize}</strong></div>
              <div className="flex justify-between"><span className="text-[#f6f2ec]/60">Accommodation</span><strong className="text-[#f6f2ec]">{form.accommodationStyle}</strong></div>
              <div className="flex justify-between"><span className="text-[#f6f2ec]/60">Status</span><strong className="text-[#25D366]">In Review by Operations</strong></div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/212698017323?text=${encodeURIComponent(`Hi SafarAtlas! I submitted journey request ${leadRef} for ${form.name}. I'd like to chat on WhatsApp!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1eb855] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                💬 Chat with Journey Concierge on WhatsApp Now
              </a>
              <Link href="/" className="block w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-[#f6f2ec] text-xs font-bold text-center transition-all cursor-pointer border border-white/10">
                Back to Discovery
              </Link>
            </div>
          </div>
        ) : (
          /* Main Layout Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Column: Timeline & Selected Escapes (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-[#f6f2ec] flex items-center gap-2">
                  <span>🗺️</span> Your Journey Itinerary
                </h2>
                <span className="text-xs font-bold text-[#C4A258] bg-[#C4A258]/15 px-2.5 py-1 rounded-full border border-[#C4A258]/30">
                  {journey.items.length} {journey.items.length === 1 ? "Escape" : "Escapes"} Added
                </span>
              </div>

              {journey.items.length === 0 ? (
                /* Empty Builder State */
                <div className="p-6 sm:p-10 rounded-3xl border-2 border-dashed border-white/15 bg-[#0d2239]/60 text-center space-y-4">
                  <div className="w-14 h-14 bg-[#C4A258]/15 text-[#C4A258] rounded-2xl flex items-center justify-center text-3xl mx-auto">
                    🐪
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-serif font-bold text-[#f6f2ec]">
                      Your journey timeline is currently open
                    </h3>
                    <p className="text-xs sm:text-sm text-[#f6f2ec]/70 max-w-sm mx-auto">
                      Choose popular modular escapes below or fill out the right-hand form to tell us your dream Morocco route.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    {ESCAPES_PACKAGES.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => handleAddDefaultEscape(pkg.slug)}
                        className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-[#C4A258] hover:bg-[#C4A258] hover:text-[#07192d] transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <span>+ Add</span>
                        <span>{pkg.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Timeline Items List */
                <div className="space-y-4 relative border-l-2 border-[#C4A258]/30 pl-5 sm:pl-7 ml-2 sm:ml-3">
                  {journey.items.map((item, index) => (
                    <div key={item.slug} className="relative group">
                      {/* Timeline Node Badge */}
                      <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#C4A258] text-[#07192d] text-[11px] sm:text-xs font-black flex items-center justify-center border-2 border-[#07192d] shadow-md">
                        {index + 1}
                      </div>

                      {/* Card Content */}
                      <div className="bg-[#0d2239]/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full sm:w-24 h-24 sm:h-24 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            {item.badge && (
                              <span className="text-[10px] font-extrabold uppercase text-[#C4A258] bg-[#C4A258]/15 px-2 py-0.5 rounded-full border border-[#C4A258]/30">
                                {item.badge}
                              </span>
                            )}
                            <span className="text-xs font-bold text-[#f6f2ec]/60">
                              📍 {item.location}
                            </span>
                          </div>
                          <h3 className="text-base font-serif font-bold text-[#f6f2ec]">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[#f6f2ec]/70">
                            Duration: <strong>{item.durationDays} Days / {item.durationNights} Nights</strong>
                          </p>
                          <p className="text-xs font-black text-[#C4A258] pt-0.5">
                            Pricing via WhatsApp · Seasonal rates
                          </p>
                        </div>

                        {/* Remove Action */}
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.slug)}
                          className="self-end sm:self-center px-2.5 py-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                          title="Remove from journey"
                        >
                          ✕ <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add More Button */}
                  <div className="pt-3">
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#f6f2ec]/60 mb-2">
                      Add more modular Escapes:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ESCAPES_PACKAGES.filter((p) => !journey.items.some((i) => i.slug === p.slug)).map((pkg) => (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => handleAddDefaultEscape(pkg.slug)}
                          className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-[#C4A258] hover:bg-[#C4A258] hover:text-[#07192d] transition-all cursor-pointer shadow-sm flex items-center gap-1"
                        >
                          <span>+ Add</span>
                          <span>{pkg.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step By Step Coordination Banner */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0d2239] to-[#16375A] border border-white/10 text-white space-y-2.5 shadow-md">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C4A258] block">
                  The SafarAtlas Promise
                </span>
                <h4 className="text-sm sm:text-base font-serif font-bold text-[#f6f2ec]">
                  Seamless transfers, vetted desert camps & local guidance
                </h4>
                <p className="text-xs text-[#f6f2ec]/80 leading-relaxed">
                  No separate bookings or schedule headaches. We coordinate your entire route under one concierge contact and one transparent price.
                </p>
              </div>

            </div>

            {/* Right Column: Summary & Enhanced Traveler Form (5 cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-20 bg-[#0d2239]/80 backdrop-blur-xl p-5 sm:p-7 rounded-3xl border border-white/10 shadow-2xl space-y-5">
                
                {/* Summary Header */}
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C4A258] block mb-0.5">
                    Your Trip Estimate
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-[#f6f2ec]">
                    Custom Route Summary
                  </h3>
                </div>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold text-[#f6f2ec]/60 uppercase tracking-wider block">Selected Escapes</span>
                    <span className="text-lg font-serif font-black text-[#C4A258]">{journey.items.length}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold text-[#f6f2ec]/60 uppercase tracking-wider block">Est. Duration</span>
                    <span className="text-lg font-serif font-black text-[#C4A258]">~{totalDays > 0 ? totalDays : 5} Days</span>
                  </div>
                </div>

                {/* Pricing Banner */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#f6f2ec]/60 block">Pricing Status</span>
                    <span className="text-xl sm:text-2xl font-serif font-black text-[#C4A258]">
                      Tailored Quote
                    </span>
                    <span className="block text-[10px] text-[#f6f2ec]/60 mt-0.5">Seasonal & group rates via WhatsApp</span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase text-[#25D366] bg-[#25D366]/15 px-2.5 py-1 rounded-full border border-[#25D366]/30">
                    Zero Booking Fees
                  </span>
                </div>

                <hr className="border-white/10" />

                {/* Request Form */}
                <form onSubmit={handleSubmitRequest} className="space-y-3.5">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#C4A258]">
                    Traveler & Trip Preferences
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="block text-[11px] font-extrabold uppercase text-[#f6f2ec]/80">
                      Full Name *
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-[#f6f2ec] placeholder:text-white/30 normal-case outline-none focus:border-[#C4A258]"
                      />
                    </label>

                    <label className="block text-[11px] font-extrabold uppercase text-[#f6f2ec]/80">
                      Email Address *
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="sarah@example.com"
                        className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-[#f6f2ec] placeholder:text-white/30 normal-case outline-none focus:border-[#C4A258]"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="block text-[11px] font-extrabold uppercase text-[#f6f2ec]/80">
                      Travel Dates *
                      <input
                        required
                        value={form.travelDates}
                        onChange={(e) => setForm({ ...form, travelDates: e.target.value })}
                        placeholder="e.g. Oct 12 – Oct 20"
                        className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-[#f6f2ec] placeholder:text-white/30 normal-case outline-none focus:border-[#C4A258]"
                      />
                    </label>

                    <label className="block text-[11px] font-extrabold uppercase text-[#f6f2ec]/80">
                      Group Size
                      <select
                        value={form.groupSize}
                        onChange={(e) => setForm({ ...form, groupSize: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-white/15 bg-[#07192d] px-3 py-2 text-xs font-medium text-[#f6f2ec] normal-case outline-none focus:border-[#C4A258]"
                      >
                        <option className="bg-[#07192d] text-[#f6f2ec]">Solo traveler</option>
                        <option className="bg-[#07192d] text-[#f6f2ec]">2 travelers (Couple)</option>
                        <option className="bg-[#07192d] text-[#f6f2ec]">3-5 travelers (Friends/Family)</option>
                        <option className="bg-[#07192d] text-[#f6f2ec]">6+ travelers (Private Group)</option>
                      </select>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="block text-[11px] font-extrabold uppercase text-[#f6f2ec]/80">
                      Accommodation Style
                      <select
                        value={form.accommodationStyle}
                        onChange={(e) => setForm({ ...form, accommodationStyle: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-white/15 bg-[#07192d] px-3 py-2 text-xs font-medium text-[#f6f2ec] normal-case outline-none focus:border-[#C4A258]"
                      >
                        <option className="bg-[#07192d] text-[#f6f2ec]">Boutique Riad (Comfort & Charm)</option>
                        <option className="bg-[#07192d] text-[#f6f2ec]">Luxury Heritage Palace (5-Star)</option>
                        <option className="bg-[#07192d] text-[#f6f2ec]">Desert Glamping Camp (Ensuite)</option>
                        <option className="bg-[#07192d] text-[#f6f2ec]">Mix of Authentic & Premium</option>
                      </select>
                    </label>

                    <label className="block text-[11px] font-extrabold uppercase text-[#f6f2ec]/80">
                      Transport Option
                      <select
                        value={form.transportPreference}
                        onChange={(e) => setForm({ ...form, transportPreference: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-white/15 bg-[#07192d] px-3 py-2 text-xs font-medium text-[#f6f2ec] normal-case outline-none focus:border-[#C4A258]"
                      >
                        <option className="bg-[#07192d] text-[#f6f2ec]">Private AC Chauffeur (Mercedes / 4x4)</option>
                        <option className="bg-[#07192d] text-[#f6f2ec]">Point-to-Point Private Transfers</option>
                        <option className="bg-[#07192d] text-[#f6f2ec]">Self-Drive Recommendation</option>
                      </select>
                    </label>
                  </div>

                  <label className="block text-[11px] font-extrabold uppercase text-[#f6f2ec]/80">
                    WhatsApp Number (recommended for fast quote)
                    <input
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                      placeholder="+1 / +44 / +33 / +212..."
                      className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-[#f6f2ec] placeholder:text-white/30 normal-case outline-none focus:border-[#C4A258]"
                    />
                  </label>

                  <label className="block text-[11px] font-extrabold uppercase text-[#f6f2ec]/80">
                    Special Wishes or Specific Cities to Include
                    <textarea
                      rows={2}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="e.g. Sunset in Merzouga, surf lesson in Taghazout, photography focus, vegetarian dietary..."
                      className="mt-1 w-full resize-none rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-[#f6f2ec] placeholder:text-white/30 normal-case outline-none focus:border-[#C4A258]"
                    />
                  </label>

                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/40 text-xs font-medium text-red-300 space-y-2">
                      <p className="font-bold text-red-200 text-center">{error}</p>
                      <a
                        href={`https://wa.me/212698017323?text=${encodeURIComponent(
                          `Hi SafarAtlas! I wanted to request a quote for my Morocco trip:\n` +
                          `• Name: ${form.name}\n` +
                          `• Email: ${form.email}\n` +
                          `• Travel Dates: ${form.travelDates}\n` +
                          `• Group Size: ${form.groupSize}\n` +
                          `• Style: ${form.accommodationStyle}\n` +
                          `• Transport: ${form.transportPreference}\n` +
                          `• Notes: ${form.notes || "None"}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 px-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-center block shadow-sm transition-all"
                      >
                        <span>💬 Tap here to send via WhatsApp instead</span>
                      </a>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-[#C4A258] hover:bg-[#d8bb78] text-[#07192d] font-black text-xs uppercase tracking-[0.3em] shadow-lg transition-all cursor-pointer disabled:opacity-50 active:scale-98"
                  >
                    {loading ? "Submitting to Operations OS..." : "REQUEST MY COORDINATED QUOTE →"}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[10px] text-[#f6f2ec]/60 pt-1">
                    <span>⚡ 12h Quote Turnaround</span>
                    <span>•</span>
                    <span>💳 Zero Upfront Fees</span>
                    <span>•</span>
                    <span>🛡️ Verified Partners</span>
                  </div>
                </form>

              </div>
            </div>

          </div>
        )}

      </div>

      {/* Global Brand Footer */}
      <Footer />
    </main>
  );
}
