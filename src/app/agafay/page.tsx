"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "../../components/brand/Header";
import { Footer } from "../../components/brand/Footer";
import { InquiryModal } from "../../components/travel/InquiryModal";
import { ESCAPES_PACKAGES } from "../../data/mockData";
import { 
  Compass, 
  Sun, 
  Flame, 
  UtensilsCrossed, 
  Clock, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  MapPin, 
  Users, 
  ArrowRight,
  Phone
} from "lucide-react";

const WHATSAPP_NUMBER = "212698017323";
const DISPLAY_PHONE = "+212 698 017 323";

export default function AgafayPage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const waMessage = encodeURIComponent(
    "Hi SafarAtlas! I'd like to check rates for the Agafay Desert Full Experience.\n" +
      "Includes: Marrakech Transfer + Quad Biking + Camel Ride + Mint Tea + Sunset View + Tagine Dinner & Gnaoua Show.\n" +
      "Dates: [insert dates] | Group size: [number of people]. Could you send a quote?"
  );

  const agafayPackage = ESCAPES_PACKAGES.find((p) => p.id === "escape-agafay-1d") || null;

  return (
    <div className="min-h-screen flex flex-col bg-[#07192d] text-[#f6f2ec] selection:bg-[#C4A258] selection:text-[#07192d]">
      {/* Global Brand Header */}
      <Header variant="dark" onOpenInquiryModal={() => setInquiryOpen(true)} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20 space-y-20 sm:space-y-28">
        
        {/* ── 1. HERO ARCHITECTURAL SHOWCASE ── */}
        <section
          id="overview"
          className="relative rounded-none border border-white/15 shadow-2xl overflow-hidden min-h-[88vh] flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(7, 25, 45, 0.35) 0%, rgba(7, 25, 45, 0.78) 55%, rgba(7, 25, 45, 0.98) 100%), url('/destinations/agafay-hero.jpg')`,
          }}
        >
          {/* Top Info Bar inside Hero */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10 z-10">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-none text-[10px] font-normal uppercase tracking-[0.25em] bg-[#07192d]/80 border border-[#C4A258]/40 text-[#C4A258] backdrop-blur-md">
                Agafay Desert · 45 Min from Marrakech
              </span>
              <span className="hidden sm:inline-block text-[11px] font-normal uppercase tracking-[0.2em] text-[#f6f2ec]/60">
                100% Private Door-to-Door
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none text-[10px] font-normal uppercase tracking-[0.2em] border border-white/20 bg-white/5 text-white/80 hover:bg-white/15 hover:text-white transition-all"
              >
                <Phone className="w-3 h-3 text-[#C4A258]" />
                <span>{DISPLAY_PHONE}</span>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-none text-[10px] font-normal uppercase tracking-[0.2em] bg-[#25D366] text-white shadow-md hover:bg-[#1eb855] transition-all"
              >
                <span>WhatsApp Availability</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Hero Content & Pricing Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end my-auto py-10 z-10">
            {/* Left Col: Titles */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#C4A258] font-normal">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Exclusive Private Escape · Sunset & Starlight</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-white leading-[1.08] tracking-tight">
                Escape to the <br />
                <span className="text-[#C4A258] italic font-serif">Agafay Desert</span>
              </h1>
              
              <p className="text-sm sm:text-base text-[#f6f2ec]/85 max-w-xl leading-relaxed font-light">
                Desert adrenaline, authentic Berber hospitality, golden-hour camel trek across limestone ridges, and a candlelit campfire banquet — orchestrated seamlessly from your Marrakech riad doorstep.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-[10px] uppercase tracking-[0.22em] text-[#f6f2ec]/70 font-normal">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C4A258]" />
                  Private AC Chauffeur
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C4A258]" />
                  Pay on Arrival
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C4A258]" />
                  24h Free Cancellation
                </span>
              </div>
            </div>

            {/* Right Col: Price Card */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto lg:ml-auto">
              <div className="rounded-none p-6 sm:p-8 bg-[#07192d]/90 backdrop-blur-xl border border-white/15 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-[10px] font-normal uppercase tracking-[0.24em] text-[#C4A258]">
                    Private Signature Escape
                  </span>
                  <span className="px-2.5 py-0.5 rounded-none text-[9px] font-normal uppercase tracking-[0.18em] bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40">
                    Pay on Arrival
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="text-2xl sm:text-3xl font-serif font-normal text-white">
                    Custom Quote via WhatsApp
                  </div>
                  <p className="text-xs text-[#C4A258] font-normal tracking-wide">
                    Direct transparent rates based on season & party size
                  </p>
                  <p className="text-[11px] text-[#f6f2ec]/70 leading-relaxed pt-1">
                    Includes private roundtrip 4x4, quad biking safari, sunset camel trek, panoramic tea, and full 3-course Moroccan tagine dinner with Gnawa show.
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-3">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-5 rounded-none text-center font-normal text-xs uppercase tracking-[0.2em] bg-[#C4A258] hover:bg-[#d8bb78] text-[#07192d] shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Check WhatsApp Availability →</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setInquiryOpen(true)}
                    className="w-full py-3 px-5 rounded-none text-center font-normal text-xs uppercase tracking-[0.18em] text-[#f6f2ec]/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all cursor-pointer"
                  >
                    Send Booking Inquiry Form
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Highlights Strip inside Hero */}
          <div className="pt-6 border-t border-white/10 z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 text-left">
              <div className="p-4 rounded-none bg-[#07192d]/85 backdrop-blur-md border border-white/10">
                <div className="text-[10px] font-normal uppercase tracking-[0.24em] text-[#C4A258]">01 · Quad Safari</div>
                <div className="text-xs font-serif font-normal text-white mt-1">1h Guided Expedition</div>
                <div className="text-[10px] text-[#f6f2ec]/60 mt-0.5">Helmets, goggles & guide included</div>
              </div>

              <div className="p-4 rounded-none bg-[#07192d]/85 backdrop-blur-md border border-white/10">
                <div className="text-[10px] font-normal uppercase tracking-[0.24em] text-[#C4A258]">02 · Sunset Camel</div>
                <div className="text-xs font-serif font-normal text-white mt-1">20 Min Nomad Trek</div>
                <div className="text-[10px] text-[#f6f2ec]/60 mt-0.5">Traditional cheche & tea stop</div>
              </div>

              <div className="p-4 rounded-none bg-[#07192d]/85 backdrop-blur-md border border-white/10">
                <div className="text-[10px] font-normal uppercase tracking-[0.24em] text-[#C4A258]">03 · Camp Banquet</div>
                <div className="text-xs font-serif font-normal text-white mt-1">3-Course Tagine Feast</div>
                <div className="text-[10px] text-[#f6f2ec]/60 mt-0.5">Candlelit Berber pavilion</div>
              </div>

              <div className="p-4 rounded-none bg-[#07192d]/85 backdrop-blur-md border border-white/10">
                <div className="text-[10px] font-normal uppercase tracking-[0.24em] text-[#C4A258]">04 · Fire Spectacle</div>
                <div className="text-xs font-serif font-normal text-white mt-1">Live Gnawa & Bonfire</div>
                <div className="text-[10px] text-[#f6f2ec]/60 mt-0.5">Acoustic desert performance</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. WHAT MAKES AGAFAY UNFORGETTABLE ── */}
        <section id="activities" className="space-y-10">
          <div className="space-y-3">
            <span className="text-[10px] font-normal uppercase tracking-[0.28em] text-[#C4A258] block">
              The Curated Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
              What Makes Agafay Unforgettable
            </h2>
            <p className="text-xs sm:text-sm text-[#f6f2ec]/70 max-w-xl leading-relaxed font-light">
              From Marrakech hotel pickup to midnight bonfire return, every moment is managed with discreet private care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-7 rounded-none bg-[#0c223c]/40 backdrop-blur-xl border border-white/10 hover:border-[#C4A258]/50 transition-all space-y-4 group">
              <div className="w-10 h-10 rounded-none border border-[#C4A258]/30 flex items-center justify-center text-[#C4A258]">
                <Compass className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-normal uppercase tracking-[0.22em] text-[#C4A258] block">Expedition</span>
                <h3 className="text-lg font-serif font-normal text-white">Quad Biking Safari</h3>
              </div>
              <p className="text-xs text-[#f6f2ec]/75 leading-relaxed font-light">
                Pilot premium quad bikes through rolling stone dunes, hidden canyons, and dramatic panoramic crests with your dedicated guide.
              </p>
              <div className="text-[10px] font-normal uppercase tracking-[0.2em] text-[#f6f2ec]/50 pt-2 border-t border-white/10">
                1 Hour · Helmets & Briefing
              </div>
            </div>

            <div className="p-7 rounded-none bg-[#0c223c]/40 backdrop-blur-xl border border-white/10 hover:border-[#C4A258]/50 transition-all space-y-4 group">
              <div className="w-10 h-10 rounded-none border border-[#C4A258]/30 flex items-center justify-center text-[#C4A258]">
                <Sun className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-normal uppercase tracking-[0.22em] text-[#C4A258] block">Golden Hour</span>
                <h3 className="text-lg font-serif font-normal text-white">Sunset Camel Trek</h3>
              </div>
              <p className="text-xs text-[#f6f2ec]/75 leading-relaxed font-light">
                Climb aboard gentle camels wearing traditional cheche indigo robes just as the sun sinks behind the distant Atlas peaks.
              </p>
              <div className="text-[10px] font-normal uppercase tracking-[0.2em] text-[#f6f2ec]/50 pt-2 border-t border-white/10">
                20 Min · Traditional Attire
              </div>
            </div>

            <div className="p-7 rounded-none bg-[#0c223c]/40 backdrop-blur-xl border border-white/10 hover:border-[#C4A258]/50 transition-all space-y-4 group">
              <div className="w-10 h-10 rounded-none border border-[#C4A258]/30 flex items-center justify-center text-[#C4A258]">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-normal uppercase tracking-[0.22em] text-[#C4A258] block">Gastronomy</span>
                <h3 className="text-lg font-serif font-normal text-white">Candlelit Tagine Feast</h3>
              </div>
              <p className="text-xs text-[#f6f2ec]/75 leading-relaxed font-light">
                Savor artisanal Moroccan salads, slow-cooked savory tagines, and seasonal fruits within an authentic open-air nomad camp.
              </p>
              <div className="text-[10px] font-normal uppercase tracking-[0.2em] text-[#f6f2ec]/50 pt-2 border-t border-white/10">
                3 Courses · Camp Pavilion
              </div>
            </div>

            <div className="p-7 rounded-none bg-[#0c223c]/40 backdrop-blur-xl border border-white/10 hover:border-[#C4A258]/50 transition-all space-y-4 group">
              <div className="w-10 h-10 rounded-none border border-[#C4A258]/30 flex items-center justify-center text-[#C4A258]">
                <Flame className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-normal uppercase tracking-[0.22em] text-[#C4A258] block">Atmosphere</span>
                <h3 className="text-lg font-serif font-normal text-white">Gnawa & Fire Show</h3>
              </div>
              <p className="text-xs text-[#f6f2ec]/75 leading-relaxed font-light">
                Gather around the central bonfire for hypnotic Gnawa drum rhythms, authentic folk performance, and an acrobatic live fire spectacle.
              </p>
              <div className="text-[10px] font-normal uppercase tracking-[0.2em] text-[#f6f2ec]/50 pt-2 border-t border-white/10">
                Live Acoustic · Starlit Campfire
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. STEP-BY-STEP DESERT EVENING TIMELINE ── */}
        <section id="timeline" className="space-y-10">
          <div className="space-y-3">
            <span className="text-[10px] font-normal uppercase tracking-[0.28em] text-[#C4A258] block">
              The Evening Rhythm
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
              Step-by-Step Desert Itinerary
            </h2>
            <p className="text-xs sm:text-sm text-[#f6f2ec]/70 max-w-xl leading-relaxed font-light">
              Approximately 5 hours designed around optimal desert golden-hour lighting and dinner timing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-6 rounded-none bg-[#07192d]/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#C4A258] tracking-widest font-normal">16:30</span>
                <MapPin className="w-4 h-4 text-[#f6f2ec]/40" />
              </div>
              <h3 className="text-base font-serif font-normal text-white">Marrakech Doorstep Pickup</h3>
              <p className="text-xs text-[#f6f2ec]/75 leading-relaxed font-light">
                Private air-conditioned chauffeur pickup directly from your riad or hotel. Enjoy the ~45 minute scenic climb into the stone desert.
              </p>
            </div>

            <div className="p-6 rounded-none bg-[#07192d]/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#C4A258] tracking-widest font-normal">17:30</span>
                <Compass className="w-4 h-4 text-[#f6f2ec]/40" />
              </div>
              <h3 className="text-base font-serif font-normal text-white">1-Hour Guided Quad Safari</h3>
              <p className="text-xs text-[#f6f2ec]/75 leading-relaxed font-light">
                Safety briefing, gear fitting, and 60 minutes traversing moonlike ridges, dry riverbeds, and hidden viewpoint summits.
              </p>
            </div>

            <div className="p-6 rounded-none bg-[#07192d]/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#C4A258] tracking-widest font-normal">18:45</span>
                <Sun className="w-4 h-4 text-[#f6f2ec]/40" />
              </div>
              <h3 className="text-base font-serif font-normal text-white">Sunset Camel Caravan & Mint Tea</h3>
              <p className="text-xs text-[#f6f2ec]/75 leading-relaxed font-light">
                Sunset caravan in nomad attire followed by fresh Moroccan mint tea served overlooking the snow-dusted High Atlas peaks.
              </p>
            </div>

            <div className="p-6 rounded-none bg-[#07192d]/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#C4A258] tracking-widest font-normal">19:45</span>
                <UtensilsCrossed className="w-4 h-4 text-[#f6f2ec]/40" />
              </div>
              <h3 className="text-base font-serif font-normal text-white">Candlelit Camp Tagine Dinner</h3>
              <p className="text-xs text-[#f6f2ec]/75 leading-relaxed font-light">
                Sit down to a generous 3-course Moroccan banquet: traditional salads, slow-simmered chicken or vegetable tagine, and fresh dessert.
              </p>
            </div>

            <div className="p-6 rounded-none bg-[#07192d]/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#C4A258] tracking-widest font-normal">20:45</span>
                <Flame className="w-4 h-4 text-[#f6f2ec]/40" />
              </div>
              <h3 className="text-base font-serif font-normal text-white">Bonfire Gnawa & Fire Spectacle</h3>
              <p className="text-xs text-[#f6f2ec]/75 leading-relaxed font-light">
                Live Gnawa polyrhythms, drum circles, and an acrobatic fire performance under the luminous, unpolluted desert night sky.
              </p>
            </div>

            <div className="p-6 rounded-none bg-[#07192d]/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#C4A258] tracking-widest font-normal">21:30</span>
                <Clock className="w-4 h-4 text-[#f6f2ec]/40" />
              </div>
              <h3 className="text-base font-serif font-normal text-white">Chauffeured Return Transfer</h3>
              <p className="text-xs text-[#f6f2ec]/75 leading-relaxed font-light">
                Relax in your private vehicle for the peaceful drive back to Marrakech, arriving at your riad door by approximately 22:15.
              </p>
            </div>
          </div>
        </section>

        {/* ── 4. INCLUSIONS & GOOD TO KNOW ── */}
        <section id="reassurance">
          <div className="rounded-none p-8 sm:p-12 bg-[#07192d]/90 backdrop-blur-xl border border-white/15 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] font-normal uppercase tracking-[0.24em] text-[#C4A258] block">
                  Transparency
                </span>
                <h3 className="text-2xl font-serif font-normal text-white">
                  What&apos;s Included in Your Private Quote
                </h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#f6f2ec]/85 font-light">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C4A258] shrink-0 mt-0.5" />
                  <span>Private roundtrip hotel/riad pickup & drop-off in Marrakech (Mercedes van or 4x4)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C4A258] shrink-0 mt-0.5" />
                  <span>1-Hour guided quad biking safari + certified instructor & protective gear</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C4A258] shrink-0 mt-0.5" />
                  <span>20-Minute sunset camel trek with authentic nomad scarf (cheche)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C4A258] shrink-0 mt-0.5" />
                  <span>Traditional Moroccan mint tea & hospitality at panoramic sunset terrace</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C4A258] shrink-0 mt-0.5" />
                  <span>Full 3-course dinner in desert camp (Moroccan salads, savory tagine, seasonal fruit)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C4A258] shrink-0 mt-0.5" />
                  <span>Live Gnawa acoustic musicians & live fire-eater performance by the bonfire</span>
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] font-normal uppercase tracking-[0.24em] text-[#C4A258] block">
                  Practical Logistics
                </span>
                <h3 className="text-2xl font-serif font-normal text-white">
                  Good To Know Before You Go
                </h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#f6f2ec]/85 font-light">
                <li className="flex items-start gap-3">
                  <span className="text-[#C4A258] font-mono text-xs">·</span>
                  <span><strong className="text-white font-normal">Duration:</strong> Approximately 5 hours total (16:30 departure – 21:30 return).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C4A258] font-mono text-xs">·</span>
                  <span><strong className="text-white font-normal">Clothing:</strong> Comfortable trousers, closed shoes, and a light jacket for after sunset.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C4A258] font-mono text-xs">·</span>
                  <span><strong className="text-white font-normal">Cancellation:</strong> 100% Free cancellation up to 24 hours before pickup.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C4A258] font-mono text-xs">·</span>
                  <span><strong className="text-white font-normal">Payment:</strong> Pay securely on arrival in Morocco (Cash EUR/MAD or Card).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C4A258] font-mono text-xs">·</span>
                  <span><strong className="text-white font-normal">Privacy:</strong> 100% Private vehicle and personalized pacing for your party.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── 5. FINAL EDITORIAL CTA ── */}
        <section className="text-center">
          <div className="rounded-none p-10 sm:p-16 bg-gradient-to-b from-[#0c223c] to-[#07192d] border border-[#C4A258]/30 max-w-3xl mx-auto space-y-7 shadow-2xl">
            <span className="text-[10px] font-normal uppercase tracking-[0.28em] text-[#C4A258] block">
              Direct Local Coordination
            </span>
            
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight">
              Ready to Experience Agafay?
            </h2>
            
            <p className="text-xs sm:text-sm text-[#f6f2ec]/80 max-w-md mx-auto leading-relaxed font-light">
              Send your preferred travel dates and party size directly to our WhatsApp Concierge for an immediate quote and private reservation.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-none font-normal text-xs uppercase tracking-[0.22em] bg-[#C4A258] hover:bg-[#d8bb78] text-[#07192d] shadow-2xl transition-all cursor-pointer"
              >
                Instant WhatsApp Quote →
              </a>
              
              <button
                type="button"
                onClick={() => setInquiryOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-none font-normal text-xs uppercase tracking-[0.2em] bg-white/5 hover:bg-white/10 text-white border border-white/20 transition-all cursor-pointer"
              >
                Inquire via Web Form
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-[#f6f2ec]/60">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C4A258]" /> Instant Response
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C4A258]" /> Free Cancel 24h
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C4A258]" /> Pay on Arrival
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* ── STICKY MOBILE BOOKING BAR ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07192d]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <div className="text-xs font-serif font-normal text-white">
            Agafay Private Escape
          </div>
          <div className="text-[10px] text-[#C4A258] uppercase tracking-wider">Pay on arrival · Private 4x4</div>
        </div>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2.5 rounded-none text-[10px] font-normal uppercase tracking-[0.2em] bg-[#25D366] text-white shadow-lg active:scale-95 transition-all flex items-center gap-1.5"
        >
          <span>Get Quote</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* General / Agafay Inquiry Lead Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        selectedEscape={agafayPackage}
      />
    </div>
  );
}
