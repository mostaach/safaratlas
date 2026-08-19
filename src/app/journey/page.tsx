"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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

    const itemsSummary = journey.items.map((i) => i.title).join(" + ");
    const fullMessage = `Managed Journey Request (${journey.items.length} Escapes, Total ~${totalDays} Days): ${itemsSummary}.\n\nTraveler Notes: ${form.notes || "None"}`;

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
        setError(data.error || "Failed to submit journey request.");
        return;
      }

      setLeadRef(data.id || "SA-" + Math.floor(Math.random() * 100000));
      setSubmitted(true);
      clearJourney();
      trackEvent("journey_request_submit", { leadId: data.id, count: journey.items.length });
    } catch (err) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#faf6f0] text-[#121a17]">
      {/* Header */}
      <header className="w-full bg-[#121a17] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <span className="text-xl">🌟</span>
          <span className="font-serif font-black tracking-tight text-xl">SafarAtlas</span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f4c36b] bg-[#123b34] px-2 py-0.5 rounded-full ml-2 hidden sm:inline-block">
            Journey Builder
          </span>
        </Link>
        <Link href="/" className="text-xs font-bold text-white/80 hover:text-white transition-colors flex items-center gap-1">
          ← Return to Discovery
        </Link>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        
        {/* Page Title */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full bg-[#c95e3d]/10 text-[#c95e3d] text-xs font-extrabold uppercase tracking-widest border border-[#c95e3d]/20 inline-block">
            One Trip · One Point of Contact · One Price
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-[#121a17] tracking-tight">
            Build Your Morocco Journey
          </h1>
          <p className="text-sm sm:text-base text-[#4e5e57] leading-relaxed">
            Combine modular Escapes and destinations into a single custom itinerary. SafarAtlas coordinates all local transport, stays, desert camps, and experiences for you.
          </p>
        </div>

        {submitted ? (
          /* Confirmation State */
          <div className="max-w-xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-[#e5dacb] shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 bg-[#ecfdf5] border-2 border-[#10b981] rounded-full flex items-center justify-center text-3xl font-black text-[#059669] mx-auto">
              ✓
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#059669] block">
              Journey Request Received
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#121a17]">
              Thank you, {form.name}!
            </h2>
            <p className="text-sm text-[#4e5e57] leading-relaxed">
              Your custom Morocco journey request (Ref: <strong className="font-mono text-[#123b34]">{leadRef}</strong>) has been logged in our Operations OS. Our local team will coordinate partner availability and send your transparent quote within 12 hours.
            </p>

            <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] text-left text-xs space-y-2">
              <div className="flex justify-between"><span className="text-[#4e5e57]">Travel Dates</span><strong>{form.travelDates}</strong></div>
              <div className="flex justify-between"><span className="text-[#4e5e57]">Group Size</span><strong>{form.groupSize}</strong></div>
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
              <Link href="/" className="block w-full py-3.5 rounded-xl bg-[#123b34] hover:bg-[#121a17] text-white text-xs font-bold text-center transition-all cursor-pointer">
                Back to Homepage
              </Link>
            </div>
          </div>
        ) : (
          /* Main Layout Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Timeline & Selected Escapes (8 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif font-bold text-[#121a17] flex items-center gap-2">
                  <span>🗺️</span> Your Journey Itinerary
                </h2>
                <span className="text-xs font-bold text-[#4e5e57]">
                  {journey.items.length} {journey.items.length === 1 ? "Escape" : "Escapes"} Selected
                </span>
              </div>

              {journey.items.length === 0 ? (
                /* Empty Builder State */
                <div className="p-8 sm:p-12 rounded-3xl border-2 border-dashed border-[#e5dacb] bg-white/80 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#c95e3d]/10 text-[#c95e3d] rounded-2xl flex items-center justify-center text-3xl mx-auto">
                    🐪
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#121a17]">
                    Your Journey is empty
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4e5e57] max-w-md mx-auto leading-relaxed">
                    Start by adding ready-made Escapes like the <strong>3-Day Sahara Escape</strong> or <strong>Taghazout Surf Escape</strong> to build your trip.
                  </p>
                  
                  <div className="pt-4 flex flex-wrap justify-center gap-2">
                    {ESCAPES_PACKAGES.map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => handleAddDefaultEscape(pkg.slug)}
                        className="px-3.5 py-2 rounded-xl bg-[#faf6f0] border border-[#e5dacb] text-xs font-bold text-[#123b34] hover:bg-[#123b34] hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>+ Add</span>
                        <span>{pkg.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Timeline Items List */
                <div className="space-y-6 relative border-l-2 border-[#c95e3d]/30 pl-6 ml-3">
                  {journey.items.map((item, index) => (
                    <div key={item.slug} className="relative group">
                      {/* Timeline Node Badge */}
                      <div className="absolute -left-[37px] top-4 w-7 h-7 rounded-full bg-[#123b34] text-white text-xs font-black flex items-center justify-center border-2 border-[#faf6f0] shadow-md">
                        {index + 1}
                      </div>

                      {/* Card Content */}
                      <div className="bg-white rounded-2xl p-5 border border-[#e5dacb] shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-5">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full sm:w-28 h-28 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <span className="text-[10px] font-extrabold uppercase text-[#c95e3d] bg-[#c95e3d]/10 px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                            <span className="text-xs font-bold text-[#4e5e57]">
                              📍 {item.location}
                            </span>
                          </div>
                          <h3 className="text-lg font-serif font-bold text-[#121a17]">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[#4e5e57]">
                            Duration: <strong>{item.durationDays} Days / {item.durationNights} Nights</strong>
                          </p>
                          <p className="text-xs font-black text-[#c95e3d] pt-1">
                            From €{item.priceFromEur} / person
                          </p>
                        </div>

                        {/* Remove Action */}
                        <button
                          onClick={() => handleRemoveItem(item.slug)}
                          className="self-end sm:self-center p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                          title="Remove from journey"
                        >
                          ✕ <span className="sm:hidden">Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add More Button */}
                  <div className="pt-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#4e5e57] mb-3">
                      Add more modular Escapes:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ESCAPES_PACKAGES.filter((p) => !journey.items.some((i) => i.slug === p.slug)).map((pkg) => (
                        <button
                          key={pkg.id}
                          onClick={() => handleAddDefaultEscape(pkg.slug)}
                          className="px-3.5 py-2 rounded-xl bg-white border border-[#e5dacb] text-xs font-bold text-[#123b34] hover:bg-[#123b34] hover:text-white transition-all cursor-pointer shadow-sm flex items-center gap-1"
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
              <div className="p-6 rounded-2xl bg-[#123b34] text-white space-y-3 shadow-md">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f4c36b]">
                  SafarAtlas Managed Guarantee
                </span>
                <h4 className="text-base font-serif font-bold text-white">
                  We coordinate all transport, hosts, and transfers between Escapes.
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  You don't need to book separate drivers or worry about connecting dates. SafarAtlas manages your full trip under one main point of contact and one transparent price.
                </p>
              </div>

            </div>

            {/* Right Column: Summary & Traveler Details Form (5 cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 bg-white p-6 sm:p-8 rounded-3xl border border-[#e5dacb] shadow-xl space-y-6">
                
                {/* Summary Header */}
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#c95e3d] block mb-1">
                    Journey Estimate
                  </span>
                  <h3 className="text-2xl font-serif font-black text-[#121a17]">
                    Trip Summary
                  </h3>
                </div>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#faf6f0] border border-[#e5dacb]">
                    <span className="text-[10px] font-bold text-[#4e5e57] uppercase tracking-wider block">Total Escapes</span>
                    <span className="text-xl font-serif font-black text-[#123b34]">{journey.items.length}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#faf6f0] border border-[#e5dacb]">
                    <span className="text-[10px] font-bold text-[#4e5e57] uppercase tracking-wider block">Est. Duration</span>
                    <span className="text-xl font-serif font-black text-[#123b34]">~{totalDays > 0 ? totalDays : 1} Days</span>
                  </div>
                </div>

                {/* Pricing Banner */}
                <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#4e5e57] block">Estimated Base Price</span>
                    <span className="text-2xl font-serif font-black text-[#c95e3d]">
                      {estimatedPriceEur > 0 ? `€${estimatedPriceEur}` : "€0"}
                    </span>
                    <span className="text-[10px] text-[#4e5e57] ml-1">/ person</span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase text-[#059669] bg-[#ecfdf5] px-2.5 py-1 rounded-full border border-[#a7f3d0]">
                    Zero Booking Fees
                  </span>
                </div>

                <hr className="border-[#e5dacb]" />

                {/* Request Form */}
                <form onSubmit={handleSubmitRequest} className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#123b34]">
                    Submit Journey Request
                  </h4>

                  <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                    Full Name *
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="mt-1 w-full rounded-xl border border-[#e5dacb] bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]"
                    />
                  </label>

                  <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                    Email Address *
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="mt-1 w-full rounded-xl border border-[#e5dacb] bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]"
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                      Travel Dates *
                      <input
                        required
                        value={form.travelDates}
                        onChange={(e) => setForm({ ...form, travelDates: e.target.value })}
                        placeholder="e.g. 15-25 Oct"
                        className="mt-1 w-full rounded-xl border border-[#e5dacb] bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]"
                      />
                    </label>
                    <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                      Group Size
                      <select
                        value={form.groupSize}
                        onChange={(e) => setForm({ ...form, groupSize: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#e5dacb] bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]"
                      >
                        <option>Solo traveler</option>
                        <option>2 travelers</option>
                        <option>3-5 travelers</option>
                        <option>6+ travelers</option>
                      </select>
                    </label>
                  </div>

                  <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                    WhatsApp Number (optional for fast quote)
                    <input
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                      placeholder="+1 / +44 / +212..."
                      className="mt-1 w-full rounded-xl border border-[#e5dacb] bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]"
                    />
                  </label>

                  <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                    Special Requests / Notes
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Specific accommodation level, dietary needs, private driver preferences..."
                      className="mt-1 w-full resize-none rounded-xl border border-[#e5dacb] bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]"
                    />
                  </label>

                  {error && <p className="text-xs font-bold text-red-600 text-center">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-xs font-black tracking-widest shadow-lg transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? "Submitting Request..." : "REQUEST MY MOROCCO JOURNEY →"}
                  </button>

                  <p className="text-center text-[10px] text-[#4e5e57]">
                    No immediate payment required. We verify availability and send a complete managed quote.
                  </p>
                </form>

              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
