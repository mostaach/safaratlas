"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getStoredJourney, removeEscapeFromJourney, saveJourney, clearJourney } from "../../lib/journeyStore";
import { JourneyState } from "../../lib/journeyTypes";
import { ESCAPES_PACKAGES } from "../../data/mockData";
import { trackEvent } from "../../lib/trackEvent";

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
    <main className="min-h-screen bg-[#faf6f0] text-[#121a17]">
      {/* Header */}
      <header className="w-full bg-[#121a17] text-white px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
          <Image
            src="/safar-atlas-logo-white.svg"
            alt="SafarAtlas"
            width={28}
            height={28}
            className="shrink-0 object-contain transition-transform group-hover:scale-105"
          />
          <div className="font-serif font-black tracking-tight text-xl text-white">
            Safar<span className="text-[#C4A258] font-sans font-extrabold group-hover:text-[#f4c36b] transition-colors">Atlas</span>
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C4A258] bg-[#16375A] border border-[#C4A258]/30 px-2 py-0.5 rounded-full ml-2 hidden sm:inline-block">
            Journey Planner
          </span>
        </Link>
        <Link href="/" className="text-xs font-bold text-white/80 hover:text-white transition-colors flex items-center gap-1">
          ← Return to Discovery
        </Link>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Page Title */}
        <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-[#c95e3d]/10 text-[#c95e3d] text-xs font-extrabold uppercase tracking-widest border border-[#c95e3d]/20 inline-block">
            Seamless Coordination · Dedicated Local Concierge
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#121a17] tracking-tight">
            Design Your Tailored Morocco Journey
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#4e5e57] leading-relaxed max-w-2xl mx-auto">
            Assemble your dream escapes. SafarAtlas coordinates door-to-door private transport, handpicked riads, luxury camps, and certified guides under one transparent itinerary.
          </p>
        </div>

        {submitted ? (
          /* Confirmation State */
          <div className="max-w-xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border border-[#e5dacb] shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ecfdf5] border-2 border-[#10b981] rounded-full flex items-center justify-center text-3xl font-black text-[#059669] mx-auto">
              ✓
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#059669] block">
              Journey Request Confirmed & Saved
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#121a17]">
              Thank you, {form.name}!
            </h2>
            <p className="text-xs sm:text-sm text-[#4e5e57] leading-relaxed">
              Your custom Morocco journey request (Ref: <strong className="font-mono text-[#123b34]">{leadRef}</strong>) has been logged in our Operations OS. Our local team will coordinate partner availability and send your transparent quote within 12 hours.
            </p>

            <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] text-left text-xs space-y-2">
              <div className="flex justify-between"><span className="text-[#4e5e57]">Travel Dates</span><strong>{form.travelDates}</strong></div>
              <div className="flex justify-between"><span className="text-[#4e5e57]">Group Size</span><strong>{form.groupSize}</strong></div>
              <div className="flex justify-between"><span className="text-[#4e5e57]">Accommodation</span><strong>{form.accommodationStyle}</strong></div>
              <div className="flex justify-between"><span className="text-[#4e5e57]">Status</span><strong className="text-[#059669]">In Review by Operations</strong></div>
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
              <Link href="/" className="block w-full py-3 rounded-xl bg-[#123b34] hover:bg-[#121a17] text-white text-xs font-bold text-center transition-all cursor-pointer">
                Back to Discovery
              </Link>
            </div>
          </div>
        ) : (
          /* Main Layout Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Column: Timeline & Selected Escapes (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center justify-between pb-2 border-b border-[#e5dacb]">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-[#121a17] flex items-center gap-2">
                  <span>🗺️</span> Your Journey Itinerary
                </h2>
                <span className="text-xs font-bold text-[#c95e3d] bg-[#c95e3d]/10 px-2.5 py-1 rounded-full">
                  {journey.items.length} {journey.items.length === 1 ? "Escape" : "Escapes"} Added
                </span>
              </div>

              {journey.items.length === 0 ? (
                /* Empty Builder State */
                <div className="p-6 sm:p-10 rounded-3xl border-2 border-dashed border-[#e5dacb] bg-white/80 text-center space-y-4">
                  <div className="w-14 h-14 bg-[#c95e3d]/10 text-[#c95e3d] rounded-2xl flex items-center justify-center text-3xl mx-auto">
                    🐪
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-serif font-bold text-[#121a17]">
                      Your journey timeline is currently open
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4e5e57] max-w-sm mx-auto">
                      Choose popular modular escapes below or fill out the right-hand form to tell us your dream Morocco route.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    {ESCAPES_PACKAGES.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => handleAddDefaultEscape(pkg.slug)}
                        className="px-3 py-1.5 rounded-xl bg-[#faf6f0] border border-[#e5dacb] text-xs font-bold text-[#123b34] hover:bg-[#123b34] hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>+ Add</span>
                        <span>{pkg.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Timeline Items List */
                <div className="space-y-4 relative border-l-2 border-[#c95e3d]/30 pl-5 sm:pl-7 ml-2 sm:ml-3">
                  {journey.items.map((item, index) => (
                    <div key={item.slug} className="relative group">
                      {/* Timeline Node Badge */}
                      <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#123b34] text-white text-[11px] sm:text-xs font-black flex items-center justify-center border-2 border-[#faf6f0] shadow-md">
                        {index + 1}
                      </div>

                      {/* Card Content */}
                      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e5dacb] shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full sm:w-24 h-24 sm:h-24 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            {item.badge && (
                              <span className="text-[10px] font-extrabold uppercase text-[#c95e3d] bg-[#c95e3d]/10 px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                            <span className="text-xs font-bold text-[#4e5e57]">
                              📍 {item.location}
                            </span>
                          </div>
                          <h3 className="text-base font-serif font-bold text-[#121a17]">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[#4e5e57]">
                            Duration: <strong>{item.durationDays} Days / {item.durationNights} Nights</strong>
                          </p>
                          <p className="text-xs font-black text-[#c95e3d] pt-0.5">
                            From €{item.priceFromEur} / person
                          </p>
                        </div>

                        {/* Remove Action */}
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.slug)}
                          className="self-end sm:self-center px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                          title="Remove from journey"
                        >
                          ✕ <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add More Button */}
                  <div className="pt-3">
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#4e5e57] mb-2">
                      Add more modular Escapes:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ESCAPES_PACKAGES.filter((p) => !journey.items.some((i) => i.slug === p.slug)).map((pkg) => (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => handleAddDefaultEscape(pkg.slug)}
                          className="px-3 py-1.5 rounded-xl bg-white border border-[#e5dacb] text-xs font-bold text-[#123b34] hover:bg-[#123b34] hover:text-white transition-all cursor-pointer shadow-2xs flex items-center gap-1"
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
              <div className="p-5 sm:p-6 rounded-2xl bg-[#123b34] text-white space-y-2.5 shadow-md">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f4c36b] block">
                  The SafarAtlas Promise
                </span>
                <h4 className="text-sm sm:text-base font-serif font-bold text-white">
                  Seamless transfers, vetted desert camps & local guidance
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  No separate bookings or schedule headaches. We coordinate your entire route under one concierge contact and one transparent price.
                </p>
              </div>

            </div>

            {/* Right Column: Summary & Enhanced Traveler Form (5 cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-20 bg-white p-5 sm:p-7 rounded-3xl border border-[#e5dacb] shadow-xl space-y-5">
                
                {/* Summary Header */}
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#c95e3d] block mb-0.5">
                    Your Trip Estimate
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-[#121a17]">
                    Custom Route Summary
                  </h3>
                </div>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-2xl bg-[#faf6f0] border border-[#e5dacb]">
                    <span className="text-[10px] font-bold text-[#4e5e57] uppercase tracking-wider block">Selected Escapes</span>
                    <span className="text-lg font-serif font-black text-[#123b34]">{journey.items.length}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#faf6f0] border border-[#e5dacb]">
                    <span className="text-[10px] font-bold text-[#4e5e57] uppercase tracking-wider block">Est. Duration</span>
                    <span className="text-lg font-serif font-black text-[#123b34]">~{totalDays > 0 ? totalDays : 5} Days</span>
                  </div>
                </div>

                {/* Pricing Banner */}
                <div className="p-3.5 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#4e5e57] block">Estimated Base Price</span>
                    <span className="text-xl sm:text-2xl font-serif font-black text-[#c95e3d]">
                      {estimatedPriceEur > 0 ? `€${estimatedPriceEur}` : "Tailored Quote"}
                    </span>
                    {estimatedPriceEur > 0 && <span className="text-[10px] text-[#4e5e57] ml-1">/ person</span>}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase text-[#059669] bg-[#ecfdf5] px-2.5 py-1 rounded-full border border-[#a7f3d0]">
                    Zero Booking Fees
                  </span>
                </div>

                <hr className="border-[#e5dacb]" />

                {/* Request Form */}
                <form onSubmit={handleSubmitRequest} className="space-y-3.5">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#123b34]">
                    Traveler & Trip Preferences
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                      Full Name *
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="mt-1 w-full rounded-xl border border-[#e5dacb] bg-white px-3 py-2 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]"
                      />
                    </label>

                    <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                      Email Address *
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="sarah@example.com"
                        className="mt-1 w-full rounded-xl border border-[#e5dacb] bg-white px-3 py-2 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                      Travel Dates *
                      <input
                        required
                        value={form.travelDates}
                        onChange={(e) => setForm({ ...form, travelDates: e.target.value })}
                        placeholder="e.g. Oct 12 – Oct 20"
                        className="mt-1 w-full rounded-xl border border-[#e5dacb] bg-white px-3 py-2 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]"
                      />
                    </label>

                    <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                      Group Size
                      <select
                        value={form.groupSize}
                        onChange={(e) => setForm({ ...form, groupSize: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#e5dacb] bg-white px-3 py-2 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]"
                      >
                        <option>Solo traveler</option>
                        <option>2 travelers (Couple)</option>
                        <option>3-5 travelers (Friends/Family)</option>
                        <option>6+ travelers (Private Group)</option>
                      </select>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                      Accommodation Style
                      <select
                        value={form.accommodationStyle}
                        onChange={(e) => setForm({ ...form, accommodationStyle: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#e5dacb] bg-white px-3 py-2 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]"
                      >
                        <option>Boutique Riad (Comfort & Charm)</option>
                        <option>Luxury Heritage Palace (5-Star)</option>
                        <option>Desert Glamping Camp (Ensuite)</option>
                        <option>Mix of Authentic & Premium</option>
                      </select>
                    </label>

                    <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                      Transport Option
                      <select
                        value={form.transportPreference}
                        onChange={(e) => setForm({ ...form, transportPreference: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#e5dacb] bg-white px-3 py-2 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]"
                      >
                        <option>Private AC Chauffeur (Mercedes / 4x4)</option>
                        <option>Point-to-Point Private Transfers</option>
                        <option>Self-Drive Recommendation</option>
                      </select>
                    </label>
                  </div>

                  <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                    WhatsApp Number (recommended for fast quote)
                    <input
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                      placeholder="+1 / +44 / +33 / +212..."
                      className="mt-1 w-full rounded-xl border border-[#e5dacb] bg-white px-3 py-2 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]"
                    />
                  </label>

                  <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                    Special Wishes or Specific Cities to Include
                    <textarea
                      rows={2}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="e.g. Sunset in Merzouga, surf lesson in Taghazout, photography focus, vegetarian dietary..."
                      className="mt-1 w-full resize-none rounded-xl border border-[#e5dacb] bg-white px-3 py-2 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]"
                    />
                  </label>

                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700 space-y-2">
                      <p className="font-bold text-red-800 text-center">{error}</p>
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
                    className="w-full py-3.5 rounded-xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-xs font-black tracking-widest shadow-lg transition-all cursor-pointer disabled:opacity-50 active:scale-98"
                  >
                    {loading ? "Submitting to Operations OS..." : "REQUEST MY COORDINATED QUOTE →"}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[10px] text-[#4e5e57] pt-1">
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
    </main>
  );
}
