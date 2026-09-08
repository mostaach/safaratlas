"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "../../components/brand/Header";
import { Footer } from "../../components/brand/Footer";
import { InquiryModal } from "../../components/travel/InquiryModal";
import { ESCAPES_PACKAGES } from "../../data/mockData";
import { addEscapeToJourney } from "../../lib/journeyStore";
import { 
  Waves, 
  Wind, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Clock, 
  Compass, 
  Calendar, 
  ExternalLink,
  ChevronDown,
  ArrowRight,
  Coffee,
  HeartHandshake
} from "lucide-react";

const WHATSAPP_NUMBER = "212695959074";
const DISPLAY_PHONE = "+212 695 959 074";
const STANDALONE_URL = "https://taghazout-escapes.vercel.app";

export default function TaghazoutPage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedRhythm, setSelectedRhythm] = useState<"slow" | "active">("slow");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const escapePkg = ESCAPES_PACKAGES.find((p) => p.id === "escape-taghazout-3d") || null;

  const currentPrice = selectedRhythm === "slow" ? 349 : 399;
  const currentTitle = selectedRhythm === "slow" ? "Slow Escape" : "Active Escape";

  const waMessage = encodeURIComponent(
    `Hi Taghazout Escapes! I'm interested in booking the 3-Day ${currentTitle}.\n` +
    `Stay: Ocean-view private room · Agadir Airport Transfer · 2 Breakfasts · ${selectedRhythm === "slow" ? "Restorative Hammam & Yoga" : "Surf Guidance & Equipment"}.\n` +
    `Can you confirm pricing & availability for our travel dates?`
  );

  const handleAddToJourney = () => {
    if (typeof window !== "undefined" && escapePkg) {
      addEscapeToJourney({
        id: escapePkg.id,
        slug: escapePkg.slug,
        title: `Taghazout ${currentTitle} (72h)`,
        duration: "3 Days / 2 Nights",
        location: "Taghazout Coast",
        priceFromEur: currentPrice,
        image: "/escapes/taghazout-surf.jpg",
        badge: selectedRhythm === "slow" ? "Rest & Yoga" : "Surf & Movement",
      });
    }
  };

  const faqs = [
    {
      q: "Do I need to surf?",
      a: "Not at all. Choose Slow Escape if you want the ocean breeze, fresh seafood, restorative hammam, and yoga without any pressure to paddle out."
    },
    {
      q: "What is the key difference between Slow and Active?",
      a: "Slow Escape is built around deep recovery: sunset yoga shala, traditional hammam, quiet oceanfront hours. Active Escape adds ISA-certified surf coaching or coastal expeditions with premium equipment included."
    },
    {
      q: "How does booking work?",
      a: "Tap 'WhatsApp Concierge', send your dates, guest count, and rhythm. We reply directly within minutes with live availability and coordinate your arrival personally."
    },
    {
      q: "What is included in the price?",
      a: "Each 3-day escape includes boutique oceanfront accommodation (3D/2N), 2 wholesome coastal breakfasts, one-way Agadir private airport transfer, your core rhythm activity, and direct human concierge support. Prices are per person, based on 2 guests sharing in EUR."
    },
    {
      q: "Can I extend my stay or combine it with Agafay / Marrakech?",
      a: "Yes! Because Taghazout Escapes is part of the SafarAtlas ecosystem, we can seamlessly connect your 3-day Taghazout reset with a private transfer to our Agafay Desert camp or Marrakech riad."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#070e13] text-[#f6f2ec] selection:bg-[#d6b78a] selection:text-[#070e13]">
      {/* Global Brand Header */}
      <div className="relative z-50">
        <Header onOpenInquiryModal={() => setInquiryOpen(true)} />
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20 space-y-16 sm:space-y-24">
        
        {/* ── 1. HERO SHOWCASE ── */}
        <section
          id="overview"
          className="relative rounded-3xl border border-white/15 shadow-2xl overflow-hidden min-h-[85vh] flex flex-col justify-between p-5 sm:p-8 lg:p-12 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(7, 14, 19, 0.45) 0%, rgba(7, 14, 19, 0.92) 100%), url('/escapes/taghazout-surf.jpg')`,
          }}
        >
          {/* Top Info Bar inside Hero */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 z-10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-[#123b34]/70 border border-[#f4c36b]/30 text-[#f4c36b] backdrop-blur-md">
                Taghazout · Atlantic Surf Coast
              </span>
              <span className="hidden sm:inline-block text-xs font-semibold text-white/70">
                The 72-Hour Coastal Reset
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={STANDALONE_URL}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border border-white/20 bg-white/5 text-white/80 hover:bg-white/15 hover:text-white transition-all"
                title="Open standalone Taghazout Escapes portal"
              >
                <span>Standalone Site</span>
                <ExternalLink className="w-3 h-3 text-[#f4c36b]" />
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-[#25D366] text-white shadow-md hover:bg-[#20bd5a] transition-all"
              >
                <span>💬 WhatsApp Availability</span>
              </a>
            </div>
          </div>

          {/* Hero Content & Pricing Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto py-8 z-10">
            {/* Left Col: Titles */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-semibold text-[#f4c36b]">
                <Waves className="w-3.5 h-3.5" />
                <span>Two Curated Rhythms · Zero Logistics</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-white leading-tight drop-shadow-md">
                Escape for 3 days. <br />
                <span className="text-[#f4c36b]">Come back reset.</span>
              </h1>
              
              <p className="text-sm sm:text-base text-[#f6f2ec]/90 max-w-xl leading-relaxed drop-shadow">
                Stay right by the ocean in Taghazout. Choose a slower restorative pause or an active coastal rhythm — no surf camp pressure, no crowded dorms, no fixed group routine.
              </p>

              {/* Rhythm Toggle Pills */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedRhythm("slow")}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                    selectedRhythm === "slow"
                      ? "bg-[#123b34] text-[#f4c36b] border border-[#f4c36b]/40 shadow-lg scale-102"
                      : "bg-black/40 text-white/70 border border-white/10 hover:bg-black/60"
                  }`}
                >
                  <Wind className="w-3.5 h-3.5" />
                  <span>Slow Escape · Rest & Reset</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRhythm("active")}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                    selectedRhythm === "active"
                      ? "bg-[#123b34] text-[#f4c36b] border border-[#f4c36b]/40 shadow-lg scale-102"
                      : "bg-black/40 text-white/70 border border-white/10 hover:bg-black/60"
                  }`}
                >
                  <Waves className="w-3.5 h-3.5" />
                  <span>Active Escape · Surf & Move</span>
                </button>
              </div>
            </div>

            {/* Right Col: Interactive Price Box */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto lg:ml-auto">
              <div className="rounded-2xl p-6 bg-[#0a151d]/90 backdrop-blur-xl border border-white/20 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#f4c36b]">
                    {currentTitle} · 3D / 2N
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30">
                    Human WhatsApp Booking
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-[#25D366]">Pricing on WhatsApp</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#f4c36b]/15 text-[#f4c36b] border border-[#f4c36b]/30">3D / 2N</span>
                  </div>
                  <p className="text-xs text-white/60 mt-1">
                    Message us to get a personalised quote · Oceanfront private room included
                  </p>
                </div>

                {/* Inclusions summary */}
                <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                  <div className="flex items-center gap-2 text-white/90">
                    <Check className="w-4 h-4 text-[#f4c36b] shrink-0" />
                    <span>3 Days / 2 Nights in ocean-view private room</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <Check className="w-4 h-4 text-[#f4c36b] shrink-0" />
                    <span>One-way VIP Agadir airport arrival transfer</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <Check className="w-4 h-4 text-[#f4c36b] shrink-0" />
                    <span>2 Wholesome ocean-terrace breakfasts</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <Check className="w-4 h-4 text-[#f4c36b] shrink-0" />
                    <span>
                      {selectedRhythm === "slow"
                        ? "Restorative hammam session & sunset yoga shala"
                        : "Private surf coach, board & wetsuit guidance"}
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 space-y-2.5">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-black tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Check Dates on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      handleAddToJourney();
                      setInquiryOpen(true);
                    }}
                    className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Add to Managed SafarAtlas Route</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom badge row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 z-10 text-[11px] text-white/75">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#f4c36b]" />
              <span>72-Hour Weekend Rhythm</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#f4c36b]" />
              <span>Private Guidance & Certified Care</span>
            </div>
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-[#f4c36b]" />
              <span>Oceanfront Breakfasts</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#f4c36b]" />
              <span>Direct WhatsApp Concierge</span>
            </div>
          </div>
        </section>

        {/* ── 2. THE REALITY / MANIFESTO ── */}
        <section className="rounded-3xl bg-[#0d1c25] border border-white/10 p-6 sm:p-10 lg:p-14 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c95e3d]/20 border border-[#c95e3d]/30 text-[#c95e3d] text-xs font-bold uppercase tracking-wider">
              <span>The Reality</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white leading-tight">
              Not everyone wants a <span className="text-[#f4c36b]">surf camp.</span> <br />
              Some people just need three days to breathe.
            </h2>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Taghazout is filled with week-long camps, shared bunkhouses, and mandatory group dinners. That works for some travelers. But if you’re a time-poor professional or couple seeking calm, ocean horizon, and thoughtful comfort — it can feel like high school camp all over again.
            </p>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              We built a focused 3-day escape with two crisp rhythms: **slow and restorative**, or **active and ocean-led**. You get the oceanfront room, the private guidance, and total freedom to move at your own pace.
            </p>

            <div className="pt-2">
              <span className="text-sm font-black text-[#f4c36b] tracking-wider uppercase">
                ✦ Two rhythms. One clean escape. Zero logistical friction.
              </span>
            </div>
          </div>
        </section>

        {/* ── 3. CHOOSE YOUR RHYTHM (TWO TIERS) ── */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#f4c36b]">
              Curated Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
              Choose your rhythm
            </h2>
            <p className="text-sm text-white/70">
              Both rhythms include 3 Days / 2 Nights in a boutique ocean-view private room, 2 fresh breakfasts, and one-way Agadir airport transfer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* TIER 1: SLOW ESCAPE */}
            <div
              onClick={() => setSelectedRhythm("slow")}
              className={`rounded-3xl p-6 sm:p-8 bg-[#0d1c25] border transition-all cursor-pointer flex flex-col justify-between relative ${
                selectedRhythm === "slow"
                  ? "border-[#f4c36b] shadow-[0_12px_40px_rgba(244,195,107,0.15)] ring-1 ring-[#f4c36b]"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#123b34] text-[#f4c36b] text-[11px] font-extrabold uppercase tracking-wider border border-[#f4c36b]/30">
                    Recommended Reset
                  </span>
                  <span className="text-xs font-semibold text-white/60">3 Days / 2 Nights</span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">Slow Escape</h3>
                  <p className="text-xs sm:text-sm text-[#f4c36b] font-medium mt-1">Relax, disconnect, reset.</p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-lg font-black text-[#25D366]">Pricing via WhatsApp</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30">Ask us</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-white/10 text-xs sm:text-sm text-white/85">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#f4c36b] shrink-0 mt-0.5" />
                    <span>Ocean-view boutique private room</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#f4c36b] shrink-0 mt-0.5" />
                    <span>2 Wholesome ocean-terrace breakfasts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#f4c36b] shrink-0 mt-0.5" />
                    <span>One-way private Agadir airport transfer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#f4c36b] shrink-0 mt-0.5" />
                    <span>Traditional cleansing hammam ritual</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#f4c36b] shrink-0 mt-0.5" />
                    <span>Sunset yoga shala overlooking Anchor Point</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#f4c36b] shrink-0 mt-0.5" />
                    <span>Direct WhatsApp concierge support throughout</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hi Taghazout Escapes! I'd like to check availability for the Slow Escape (Rest & Reset). Preferred Dates: [Dates] · Guests: [Count]."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-xs font-black tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>Book Slow Escape via WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* TIER 2: ACTIVE ESCAPE */}
            <div
              onClick={() => setSelectedRhythm("active")}
              className={`rounded-3xl p-6 sm:p-8 bg-[#0d1c25] border transition-all cursor-pointer flex flex-col justify-between relative ${
                selectedRhythm === "active"
                  ? "border-[#f4c36b] shadow-[0_12px_40px_rgba(244,195,107,0.15)] ring-1 ring-[#f4c36b]"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#123b34] text-[#f4c36b] text-[11px] font-extrabold uppercase tracking-wider border border-[#f4c36b]/30">
                    Ocean & Movement
                  </span>
                  <span className="text-xs font-semibold text-white/60">3 Days / 2 Nights</span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">Active Escape</h3>
                  <p className="text-xs sm:text-sm text-[#f4c36b] font-medium mt-1">Surf, explore, move.</p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-lg font-black text-[#25D366]">Pricing via WhatsApp</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30">Ask us</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-white/10 text-xs sm:text-sm text-white/85">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#f4c36b] shrink-0 mt-0.5" />
                    <span>Ocean-view boutique private room</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#f4c36b] shrink-0 mt-0.5" />
                    <span>2 Wholesome ocean-terrace breakfasts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#f4c36b] shrink-0 mt-0.5" />
                    <span>One-way private Agadir airport transfer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#f4c36b] shrink-0 mt-0.5" />
                    <span>Private surf coaching session with ISA coach</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#f4c36b] shrink-0 mt-0.5" />
                    <span>Full premium surfboard & wetsuit quiver access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#f4c36b] shrink-0 mt-0.5" />
                    <span>Direct WhatsApp concierge support throughout</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hi Taghazout Escapes! I'd like to check availability for the Active Escape (Surf & Move). Preferred Dates: [Dates] · Guests: [Count]."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-xs font-black tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>Book Active Escape via WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ── 4. THE ALTERNATIVE (COMPARISON TABLE) ── */}
        <section className="rounded-3xl bg-[#0a151d] border border-white/10 p-6 sm:p-10 lg:p-12 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#f4c36b]">
              The Alternative
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-white">
              Same coast. Better way to experience it.
            </h2>
            <p className="text-xs sm:text-sm text-white/70 max-w-xl">
              Comparing Taghazout Escapes boutique short-stay to typical weekly surf camps.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[540px]">
              <thead>
                <tr className="border-b border-white/15 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 text-white/60">Dimension</th>
                  <th className="py-3 px-4 text-[#f4c36b] font-bold">Taghazout Escapes (Us)</th>
                  <th className="py-3 px-4 text-white/50">Typical Surf Camp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs sm:text-sm">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white/80">Trip Focus</td>
                  <td className="py-3.5 px-4 text-[#f4c36b] font-semibold">The Escape & Reset (3 Days)</td>
                  <td className="py-3.5 px-4 text-white/60">Rigid 7-day sport schedule</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white/80">Daily Rhythm</td>
                  <td className="py-3.5 px-4 text-[#f4c36b] font-semibold">Slow or Active. You decide.</td>
                  <td className="py-3.5 px-4 text-white/60">Group timetable first</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white/80">Accommodation</td>
                  <td className="py-3.5 px-4 text-[#f4c36b] font-semibold">Boutique ocean-view privacy</td>
                  <td className="py-3.5 px-4 text-white/60">Crowded dorms or shared bathrooms</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white/80">Booking Experience</td>
                  <td className="py-3.5 px-4 text-[#f4c36b] font-semibold">Human, direct on WhatsApp</td>
                  <td className="py-3.5 px-4 text-white/60">Complicated forms, delays, fixed dates</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white/80">Logistics & Transfers</td>
                  <td className="py-3.5 px-4 text-[#f4c36b] font-semibold">Private driver waiting at Agadir arrivals</td>
                  <td className="py-3.5 px-4 text-white/60">Self-funded shuttle or shared bus</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 5. THE 72-HOUR DAY-BY-DAY JOURNEY ── */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#f4c36b]">
              Itinerary Breakdown
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
              72 Hours along the Atlantic
            </h2>
            <p className="text-sm text-white/70 max-w-xl">
              Designed so you can touch down Friday evening, fully disconnect, and return refreshed without losing work days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* DAY 1 */}
            <div className="rounded-2xl p-6 bg-[#0d1c25] border border-white/10 space-y-4">
              <span className="px-2.5 py-1 rounded-md bg-[#123b34] text-[#f4c36b] text-[11px] font-black uppercase">
                Day 1 · Arrival & Horizon
              </span>
              <h3 className="text-lg font-serif font-bold text-white">
                Agadir Touchdown & Ocean Check-in
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                Your private driver meets you directly outside Agadir arrivals. Enjoy the scenic 45-minute coastal drive to Taghazout. Settle into your boutique oceanfront room, sip fresh mint tea on the terrace, and watch the sun dip below Anchor Point.
              </p>
            </div>

            {/* DAY 2 */}
            <div className="rounded-2xl p-6 bg-[#0d1c25] border border-[#f4c36b]/30 space-y-4 relative">
              <div className="absolute top-4 right-4">
                <Sparkles className="w-4 h-4 text-[#f4c36b]" />
              </div>
              <span className="px-2.5 py-1 rounded-md bg-[#c95e3d]/30 text-[#c95e3d] text-[11px] font-black uppercase border border-[#c95e3d]/40">
                Day 2 · Core Rhythm
              </span>
              <h3 className="text-lg font-serif font-bold text-white">
                Slow Yoga & Hammam OR Active Surf
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                Wake to Atlantic waves and fresh breakfast. If you chose **Slow**, enjoy private hammam rituals followed by restorative rooftop yoga. If you chose **Active**, paddle out with your private coach to score uncrowded point breaks.
              </p>
            </div>

            {/* DAY 3 */}
            <div className="rounded-2xl p-6 bg-[#0d1c25] border border-white/10 space-y-4">
              <span className="px-2.5 py-1 rounded-md bg-[#123b34] text-[#f4c36b] text-[11px] font-black uppercase">
                Day 3 · Calm & Departure
              </span>
              <h3 className="text-lg font-serif font-bold text-white">
                Sunrise Swim, Local Harbor & Transfer
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                One last dawn ocean dip or beach walk. Wholesome breakfast on the terrace. Optional excursion to Paradise Valley palm pools or local fish stalls before your private transfer back to the airport or on to your next Morocco stop.
              </p>
            </div>
          </div>
        </section>

        {/* ── 6. PRAISE FROM GUESTS (TESTIMONIALS) ── */}
        <section className="rounded-3xl bg-[#0a151d] border border-white/10 p-6 sm:p-10 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#f4c36b]">
              Guestbook
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
              Quiet praise from people who came back
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl p-5 bg-[#0d1c25] border border-white/10 space-y-3">
              <p className="text-xs sm:text-sm text-white/85 italic leading-relaxed">
                &ldquo;Flew in Friday night, surfed two perfect dawns, was back at my desk Monday. The first trip in years that did not feel like a logistics project.&rdquo;
              </p>
              <div className="pt-2 border-t border-white/10">
                <span className="text-xs font-bold text-white block">Lea M.</span>
                <span className="text-[11px] text-[#f4c36b]">Paris · Weekend Warrior</span>
              </div>
            </div>

            <div className="rounded-2xl p-5 bg-[#0d1c25] border border-white/10 space-y-3">
              <p className="text-xs sm:text-sm text-white/85 italic leading-relaxed">
                &ldquo;The private guide read the swell better than any forecast. We scored an empty point break while the camp groups were still queueing for breakfast.&rdquo;
              </p>
              <div className="pt-2 border-t border-white/10">
                <span className="text-xs font-bold text-white block">Tomas R.</span>
                <span className="text-[11px] text-[#f4c36b]">Lisbon · Active Escape</span>
              </div>
            </div>

            <div className="rounded-2xl p-5 bg-[#0d1c25] border border-white/10 space-y-3">
              <p className="text-xs sm:text-sm text-white/85 italic leading-relaxed">
                &ldquo;I wanted quiet, good food, and the ocean without a forced group schedule. Slow Escape was exactly the reset I needed.&rdquo;
              </p>
              <div className="pt-2 border-t border-white/10">
                <span className="text-xs font-bold text-white block">Anais D.</span>
                <span className="text-[11px] text-[#f4c36b]">Geneva · Slow Escape</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. FAQ ACCORDION ── */}
        <section className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#f4c36b]">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
              Common Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0d1c25] border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-bold text-white">{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#f4c36b] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-white/75 leading-relaxed border-t border-white/5 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 8. BOTTOM CTA STRIP ── */}
        <section className="rounded-3xl bg-gradient-to-r from-[#123b34] to-[#0a1f1b] border border-[#f4c36b]/30 p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#f4c36b]">
              Direct Human Booking
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
              Claim your dates in the DMs
            </h2>
            <p className="text-xs sm:text-sm text-white/80">
              No endless forms. Send your dates, your guest count, and your rhythm (Slow or Active). We confirm availability directly on WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-black tracking-widest shadow-xl flex items-center gap-2 transition-all cursor-pointer hover:scale-102"
            >
              <span>WhatsApp Direct ({DISPLAY_PHONE})</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={STANDALONE_URL}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-bold tracking-wider flex items-center gap-2 transition-all"
            >
              <span>Visit TaghazoutEscapes.com</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#f4c36b]" />
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* General Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        selectedEscape={escapePkg}
      />
    </div>
  );
}
