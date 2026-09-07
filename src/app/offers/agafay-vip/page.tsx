"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "../../../lib/trackEvent";

const WHATSAPP_NUMBER = "212698017323";
const WHATSAPP_PREFILLED_MSG = encodeURIComponent(
  "Hi SafarAtlas! I'm interested in the 1-Day Agafay VIP Escape. When is the next available date?"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_PREFILLED_MSG}`;

export default function AgafayVipOfferPage() {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    emailOrWhatsapp: "",
    travelDate: "",
    groupSize: "2 travelers",
    packageType: "The Slow Escape",
    message: "",
    consent: false,
  });
  const [formStep, setFormStep] = useState<"form" | "success">("form");
  const [leadRef, setLeadRef] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    trackEvent("page_view", { source: "agafay_vip_landing" });

    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setShowStickyBar(heroBottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    const isEmail = formData.emailOrWhatsapp.includes("@");
    const email = isEmail ? formData.emailOrWhatsapp.trim() : `${formData.name.toLowerCase().replace(/\s+/g, ".")}@whatsapp.contact`;
    const whatsapp = isEmail ? "" : formData.emailOrWhatsapp.trim();

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partnerId: "escape-agafay-1d",
          partnerName: "1-Day Agafay VIP Escape",
          listingName: "1-Day Agafay VIP Escape",
          travelerName: formData.name,
          email,
          whatsapp,
          travelDates: formData.travelDate,
          groupSize: formData.groupSize,
          message: `Package selected: ${formData.packageType}\n\n${formData.message || "Agafay VIP Escape inquiry via offer page."}`,
          consent: formData.consent,
          source: "agafay-vip-offer",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Failed to submit inquiry. Please try WhatsApp directly.");
        setSubmitting(false);
        return;
      }

      setLeadRef(data.id);
      setFormStep("success");
      trackEvent("lead_submit", { leadId: data.id, source: "agafay-vip-offer" });
    } catch {
      setFormError("Network error. Please try connecting via WhatsApp directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#07192d] font-sans selection:bg-[#c6a476]/40 relative">
      
      {/* DISCREET BRAND HEADER */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <Link 
          href="https://safaratlas.com" 
          className="group flex items-center gap-2.5 text-white/90 hover:text-white transition-opacity"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white rounded-full shadow-lg p-1 group-hover:scale-105 transition-transform overflow-hidden">
            <Image
              src="/safar-atlas-navbar.svg"
              alt="SafarAtlas Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#c6a476] transition-colors drop-shadow-md">
            SafarAtlas
          </span>
        </Link>
        
        <span className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-white/80 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          Marrakech Concierge Active
        </span>
      </header>

      {/* SECTION 1: HERO */}
      <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#07192d]">
        {/* Background Image — Agafay Desert Sunset */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/agafay-hero.jpg')`,
          }}
        />
        {/* Refined multi-layer overlay — preserves image visibility */}
        <div className="absolute inset-0" style={{background: 'linear-gradient(to bottom, rgba(7,25,45,0.55) 0%, rgba(7,25,45,0.35) 40%, rgba(7,25,45,0.75) 100%)'}} />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-32 pb-24 space-y-8">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase shadow-xl">
            <span className="text-[#c6a476]">⭐ 5.0</span>
            <span className="w-px h-3 bg-white/30" />
            <span>Trusted by 40+ Travelers in Morocco</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-black tracking-tight text-white leading-[1.0]">
            Your Private<br />
            Desert Escape.
          </h1>
          <p className="text-2xl sm:text-3xl font-serif italic" style={{color: '#c6a476'}}>One Day. Unforgettable.</p>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto font-normal leading-relaxed">
            Agafay Desert · Departing from your Marrakech hotel door.
            <br />Private 4×4 · Sunset camel trek · Dinner under the stars.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_cta", { type: "whatsapp_hero" })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#1eb855] text-white text-base font-extrabold shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 2c-5.514 0-9.999 4.486-9.999 10 0 1.763.459 3.483 1.332 5.006l-1.364 4.994 5.111-1.34c1.472.802 3.136 1.226 4.92 1.226 5.514 0 10-4.486 10-10 0-5.514-4.486-10-10-10zm5.992 14.17c-.252.712-1.467 1.358-2.038 1.417-.57.059-1.285.226-4.275-.97-3.601-1.442-5.908-5.117-6.088-5.358-.18-.24-1.464-1.951-1.464-3.722 0-1.771.927-2.643 1.258-3.003.33-.36.72-.45.96-.45.24 0 .48.003.69.012.222.009.52-.084.814.622.3.706 1.02 2.493 1.11 2.673.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.378.471-.54.63-.18.18-.369.375-.159.735.21.36.936 1.543 2.01 2.502 1.383 1.233 2.547 1.617 2.907 1.797.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.81-.18.33.12 2.1.99 2.46 1.17.36.18.6.27.69.42.09.15.09.87-.162 1.582z" />
              </svg>
              <span>Book My Spot on WhatsApp</span>
            </a>

            <a
              href="#includes"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 backdrop-blur-sm transition-all"
            >
              <span>↓ See what's included</span>
            </a>
          </div>

          <p className="text-xs text-white/60 pt-2">
            No credit card needed upfront · Instant response on WhatsApp
          </p>

        </div>
      </div>

      {/* SECTION 2: SOCIAL PROOF STRIP */}
      <div className="bg-[#0a233f] border-y border-[#2a5b50] text-white py-5 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-around gap-4 text-center text-xs font-bold tracking-wide">
          <div className="flex items-center gap-2 text-[#c6a476]">
            <span>🌍</span>
            <span>Local Team inside Marrakech</span>
          </div>
          <div className="hidden sm:block text-white/20">|</div>
          <div className="flex items-center gap-2 text-white/90">
            <span>🔒</span>
            <span>100% Private — Not a group tour</span>
          </div>
          <div className="hidden sm:block text-white/20">|</div>
          <div className="flex items-center gap-2 text-[#c6a476]">
            <span>⚡</span>
            <span>Confirmation within 2 hours</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: WHAT'S INCLUDED */}
      <section id="includes" className="py-20 bg-[#07192d] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#c6a476]">
              Complete All-Inclusive Package
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
              Everything Handled for You
            </h2>
            <p className="text-sm text-white/70">
              No taxi bargaining, no hidden costs. From your hotel doorway back to your bed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="rounded-3xl bg-[#1b2622] border border-[#2a5b50] overflow-hidden hover:border-[#c6a476]/40 transition-all flex flex-col group">
              <div className="h-48 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: "url('/agafay_card_pickup_1787668236070.png')"}} />
              <div className="p-7 space-y-3 flex-1 relative bg-[#1b2622] z-10">
                <div className="absolute -top-6 left-7 w-12 h-12 rounded-2xl bg-[#1b2622] text-[#c6a476] flex items-center justify-center text-2xl font-bold border border-[#c6a476]/40 shadow-xl">
                  🚐
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-serif font-bold text-white">Private Hotel Pick-up & Drop-off</h3>
                  <p className="text-xs text-white/70 leading-relaxed mt-2">
                    Air-conditioned private 4x4 or Mercedes van collecting you directly from your riad or hotel in Marrakech at 3:00 PM.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-[#1b2622] border border-[#2a5b50] overflow-hidden hover:border-[#c6a476]/40 transition-all flex flex-col group">
              <div className="h-48 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: "url('/agafay_card_camel_1787668246438.png')"}} />
              <div className="p-7 space-y-3 flex-1 relative bg-[#1b2622] z-10">
                <div className="absolute -top-6 left-7 w-12 h-12 rounded-2xl bg-[#1b2622] text-[#c6a476] flex items-center justify-center text-2xl font-bold border border-[#c6a476]/40 shadow-xl">
                  🐪
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-serif font-bold text-white">Private Sunset Camel Trek</h3>
                  <p className="text-xs text-white/70 leading-relaxed mt-2">
                    Guided camel walk across the moonlike Agafay hills during golden hour. Tagelmust desert scarf provided.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-[#1b2622] border border-[#2a5b50] overflow-hidden hover:border-[#c6a476]/40 transition-all flex flex-col group">
              <div className="h-48 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: "url('/agafay_card_dinner_1787668278573.png')"}} />
              <div className="p-7 space-y-3 flex-1 relative bg-[#1b2622] z-10">
                <div className="absolute -top-6 left-7 w-12 h-12 rounded-2xl bg-[#1b2622] text-[#10b981] flex items-center justify-center text-2xl font-bold border border-[#10b981]/40 shadow-xl">
                  🍽️
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-serif font-bold text-white">Dinner Under the Stars</h3>
                  <p className="text-xs text-white/70 leading-relaxed mt-2">
                    Candlelit 3-course Moroccan tagine feast at a boutique desert camp with acoustic live Berber music around the bonfire.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-[#1b2622] border border-[#2a5b50] overflow-hidden hover:border-[#c6a476]/40 transition-all flex flex-col group">
              <div className="h-48 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: "url('/agafay_card_guide_1787668305830.png')"}} />
              <div className="p-7 space-y-3 flex-1 relative bg-[#1b2622] z-10">
                <div className="absolute -top-6 left-7 w-12 h-12 rounded-2xl bg-[#1b2622] text-[#3b629b] flex items-center justify-center text-2xl font-bold border border-[#3b629b]/40 shadow-xl">
                  🧭
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-serif font-bold text-white">Private English-Speaking Guide</h3>
                  <p className="text-xs text-white/70 leading-relaxed mt-2">
                    Dedicated local host who manages all timing, photos, and comfort throughout your desert journey.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-[#1b2622] border border-[#2a5b50] overflow-hidden hover:border-[#c6a476]/40 transition-all flex flex-col group">
              <div className="h-48 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: "url('/agafay_card_viewpoint_1787668317830.png')"}} />
              <div className="p-7 space-y-3 flex-1 relative bg-[#1b2622] z-10">
                <div className="absolute -top-6 left-7 w-12 h-12 rounded-2xl bg-[#1b2622] text-[#c6a476] flex items-center justify-center text-2xl font-bold border border-[#c6a476]/40 shadow-xl">
                  🌅
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-serif font-bold text-white">Atlas Sunset Viewpoint</h3>
                  <p className="text-xs text-white/70 leading-relaxed mt-2">
                    Access to a private hilltop camp vantage point overlooking the Atlas Mountains as the sun dips below the horizon.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-[#1b2622] border border-[#2a5b50] overflow-hidden hover:border-[#c6a476]/40 transition-all flex flex-col group">
              <div className="h-48 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: "url('/agafay_card_tea_1787668328661.png')"}} />
              <div className="p-7 space-y-3 flex-1 relative bg-[#1b2622] z-10">
                <div className="absolute -top-6 left-7 w-12 h-12 rounded-2xl bg-[#1b2622] text-[#c6a476] flex items-center justify-center text-2xl font-bold border border-[#c6a476]/40 shadow-xl">
                  🍵
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-serif font-bold text-white">Welcome Tea & Bonfire</h3>
                  <p className="text-xs text-white/70 leading-relaxed mt-2">
                    Fresh Moroccan mint tea on arrival, fire pit lounge access, and star-gazing away from city light pollution.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      <section className="py-24" style={{background: '#faf6f0'}}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest" style={{color:'#c6a476'}}>
              The SafarAtlas Difference
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black" style={{color:'#0a233f'}}>
              Why Travelers Choose This Escape
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="relative rounded-3xl overflow-hidden group h-80 shadow-xl">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80')"}} />
              <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(7,25,45,0.95) 0%, rgba(7,25,45,0.3) 100%)'}} />
              <div className="absolute bottom-0 left-0 right-0 p-7 space-y-2">
                <span className="text-3xl">✨</span>
                <h3 className="text-xl font-serif font-bold text-white">Zero Coordination Stress</h3>
                <p className="text-xs text-white/75 leading-relaxed">One dedicated contact. No negotiating. No waiting. We manage every step from your hotel door.</p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden group h-80 shadow-xl">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{backgroundImage: "url('https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=600&q=80')"}} />
              <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(7,25,45,0.95) 0%, rgba(7,25,45,0.3) 100%)'}} />
              <div className="absolute bottom-0 left-0 right-0 p-7 space-y-2">
                <span className="text-3xl">🔑</span>
                <h3 className="text-xl font-serif font-bold text-white">Genuinely Private</h3>
                <p className="text-xs text-white/75 leading-relaxed">Your vehicle, your pace, your moments. Never shared with strangers from a group bus.</p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden group h-80 shadow-xl">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{backgroundImage: "url('https://images.unsplash.com/photo-1517821099606-cef63a9bcda6?auto=format&fit=crop&w=600&q=80')"}} />
              <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(7,25,45,0.95) 0%, rgba(7,25,45,0.3) 100%)'}} />
              <div className="absolute bottom-0 left-0 right-0 p-7 space-y-2">
                <span className="text-3xl">🇲🇦</span>
                <h3 className="text-xl font-serif font-bold text-white">Managed by On-Ground Team</h3>
                <p className="text-xs text-white/75 leading-relaxed">Based inside Marrakech. Real people, real local knowledge. Available on WhatsApp in minutes.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: ITINERARY TIMELINE */}
      <section className="py-20 bg-white border-y border-[#e5dacb]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#c6a476]">
              Step-by-Step Schedule
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#07192d]">
              Your Afternoon & Evening Flow
            </h2>
            <p className="text-xs text-[#4e5e57]">
              6 hours total duration · Perfectly timed for sunset & stargazing
            </p>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-[19px] sm:before:left-[140px] before:w-0.5 before:bg-[#e5dacb]">
            
            {[
              { time: "3:00 PM", title: "Private Hotel Pickup", desc: "Your driver meets you directly at your Marrakech riad or hotel entrance in an air-conditioned 4x4." },
              { time: "3:45 PM", title: "Scenic Drive across Haouz Plains", desc: "Pass ancient olive groves and Berber villages as the landscape transforms into stone desert." },
              { time: "4:30 PM", title: "Arrival & Mint Tea Welcome", desc: "Welcome drink at the desert camp, briefing with your private guide, and tagelmust wrap." },
              { time: "5:00 PM", title: "Sunset Camel Trek", desc: "1-hour peaceful camel walk across the rolling Agafay hills during optimal golden lighting." },
              { time: "6:00 PM", title: "Atlas Sunset Viewpoint", desc: "Watch the sun set over the snow-capped Atlas Mountains from a private hilltop viewpoint." },
              { time: "7:00 PM", title: "Candlelit 3-Course Tagine Dinner", desc: "Authentic Moroccan meal (pastilla/salads, tagine, dessert) accompanied by live acoustic Berber drumming." },
              { time: "8:30 PM", title: "Return Transfer", desc: "Board your private vehicle for the comfortable drive back to Marrakech." },
              { time: "9:15 PM", title: "Hotel Drop-off", desc: "Safe drop-off right back at your hotel door." },
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-8 group">
                <div className="shrink-0 w-10 sm:w-28 text-left sm:text-right font-mono text-xs font-extrabold text-[#c6a476] pt-1">
                  {step.time}
                </div>
                <div className="w-10 h-10 rounded-full bg-[#0a233f] text-white flex items-center justify-center text-xs font-black z-10 shrink-0 shadow-md">
                  0{idx + 1}
                </div>
                <div className="flex-1 bg-[#faf6f0] p-5 rounded-2xl border border-[#e5dacb] space-y-1">
                  <h3 className="text-base font-serif font-bold text-[#07192d]">{step.title}</h3>
                  <p className="text-xs text-[#4e5e57] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* SECTION 6: INCLUDED / NOT INCLUDED */}
      <section className="py-16 bg-[#faf6f0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#e5dacb] grid md:grid-cols-2 gap-8">
            
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-bold text-[#0a233f] flex items-center gap-2">
                <span className="text-[#10b981]">✓</span> What is Included
              </h3>
              <ul className="space-y-2.5 text-xs text-[#4e5e57]">
                <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Private 4x4 / Minivan transfer roundtrip</li>
                <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Dedicated English-speaking driver/guide</li>
                <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> 1-Hour private sunset camel trek</li>
                <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Traditional Berber tagelmust scarf</li>
                <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> 3-Course dinner at luxury desert camp</li>
                <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Welcome mint tea & bottled water</li>
                <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Live campfire music performance</li>
              </ul>
            </div>

            <div className="space-y-4 border-t md:border-t-0 md:border-l border-[#e5dacb] pt-6 md:pt-0 md:pl-8">
              <h3 className="text-lg font-serif font-bold text-[#c6a476] flex items-center gap-2">
                <span className="text-[#c6a476]">✕</span> What is Not Included
              </h3>
              <ul className="space-y-2.5 text-xs text-[#4e5e57]">
                <li className="flex items-center gap-2"><span className="text-[#c6a476]">✕</span> Alcoholic beverages (available for purchase at camp)</li>
                <li className="flex items-center gap-2"><span className="text-[#c6a476]">✕</span> Driver gratuities / tips (discretionary)</li>
                <li className="flex items-center gap-2"><span className="text-[#c6a476]">✕</span> Personal travel insurance</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: CHOOSE YOUR ESCAPE & INLINE FORM */}
      <section className="py-24 bg-[#0a233f] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
          
          <div className="text-center space-y-4">
            <span className="inline-block text-xs font-black uppercase tracking-widest text-[#c6a476] bg-[#07192d] px-4 py-1.5 rounded-full border border-[#c6a476]/30">
              ⚡ Limited to 2 Private Groups Per Day
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-black text-white">
              Choose Your Escape
            </h2>
            <p className="text-sm text-white/70">
              Both packages are 100% private. Select the experience that fits your travel style.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* The Slow Escape */}
            <div className="bg-[#07192d] border border-[#2a5b50] rounded-3xl p-8 flex flex-col hover:border-[#c6a476] transition-colors relative shadow-2xl">
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl font-serif font-bold text-white">The Slow Escape</h3>
                <p className="text-xs text-[#c6a476] font-bold uppercase tracking-widest">For Relaxation & Romance</p>
                <div className="pt-2 pb-4">
                  <span className="text-sm text-white/60">From</span>
                  <div className="text-5xl font-serif font-black text-white my-1">
                    €120 <span className="text-base font-sans font-normal text-white/60">/ person</span>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-white/80 pb-6">
                  <li className="flex items-start gap-2"><span className="text-[#10b981]">✓</span> Private SUV transfer</li>
                  <li className="flex items-start gap-2"><span className="text-[#10b981]">✓</span> Sunset camel trek</li>
                  <li className="flex items-start gap-2"><span className="text-[#10b981]">✓</span> 3-Course dinner under stars</li>
                  <li className="flex items-start gap-2"><span className="text-[#10b981]">✓</span> Welcome mint tea & bonfire</li>
                </ul>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi SafarAtlas! I'm interested in The Slow Escape (€120) for Agafay. When is the next available date?")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_cta", { type: "whatsapp_slow" })}
                className="w-full text-center py-4 rounded-xl border border-white/20 hover:bg-white/10 text-white text-sm font-extrabold transition-all"
              >
                Book The Slow Escape
              </a>
            </div>

            {/* The Active Escape */}
            <div className="bg-gradient-to-b from-[#1b2622] to-[#07192d] border-2 border-[#c6a476] rounded-3xl p-8 flex flex-col shadow-[0_0_40px_rgba(198,164,118,0.15)] relative transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c6a476] text-[#0a233f] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                Most Popular
              </div>
              <div className="space-y-4 flex-1 mt-2">
                <h3 className="text-2xl font-serif font-bold text-white">The Active Escape</h3>
                <p className="text-xs text-[#c6a476] font-bold uppercase tracking-widest">For Adrenaline & Views</p>
                <div className="pt-2 pb-4">
                  <span className="text-sm text-white/60">From</span>
                  <div className="text-5xl font-serif font-black text-white my-1">
                    €160 <span className="text-base font-sans font-normal text-white/60">/ person</span>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-white/80 pb-6">
                  <li className="flex items-start gap-2"><span className="text-[#10b981]">✓</span> Everything in The Slow Escape</li>
                  <li className="flex items-start gap-2 font-bold text-white"><span className="text-[#c6a476]">➕</span> 1-Hour Private ATV / Quad Ride</li>
                  <li className="flex items-start gap-2 text-xs text-white/60">Explore the deep rocky dunes and hidden canyons before your sunset dinner.</li>
                </ul>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi SafarAtlas! I'm interested in The Active Escape (€160) for Agafay. When is the next available date?")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_cta", { type: "whatsapp_active" })}
                className="w-full text-center py-4 rounded-xl bg-[#c6a476] hover:bg-[#aa4a2c] text-white text-sm font-extrabold shadow-lg transition-all"
              >
                Book The Active Escape
              </a>
            </div>

          </div>

          {/* Form Divider */}
          <div className="flex items-center gap-4 text-xs text-white/40 uppercase tracking-widest font-bold pt-8">
            <div className="flex-1 h-px bg-white/10" />
            <span>Or Request to Book Below</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Inline Form */}
          <div className="bg-[#faf6f0] text-[#07192d] p-8 sm:p-10 rounded-3xl border border-[#e5dacb] shadow-2xl">
            {formStep === "form" ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                <h3 className="text-xl font-serif font-bold text-[#07192d]">
                  Reserve Your Date
                </h3>
                <p className="text-xs text-[#4e5e57]">
                  Submit your details and our Marrakech concierge will reach out to confirm availability within 2 hours.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                    Full Name *
                    <input 
                      required 
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                      placeholder="e.g. Sarah Jenkins" 
                      className="mt-1.5 w-full rounded-xl border border-[#e5dacb] bg-white px-4 py-3 text-xs font-medium outline-none focus:border-[#c6a476]"
                    />
                  </label>

                  <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                    WhatsApp or Email *
                    <input 
                      required 
                      value={formData.emailOrWhatsapp} 
                      onChange={(e) => setFormData({ ...formData, emailOrWhatsapp: e.target.value })} 
                      placeholder="+212... or name@example.com" 
                      className="mt-1.5 w-full rounded-xl border border-[#e5dacb] bg-white px-4 py-3 text-xs font-medium outline-none focus:border-[#c6a476]"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                    Desired Date *
                    <input 
                      required 
                      value={formData.travelDate} 
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })} 
                      placeholder="e.g. Tomorrow, or Oct 14" 
                      className="mt-1.5 w-full rounded-xl border border-[#e5dacb] bg-white px-4 py-3 text-xs font-medium outline-none focus:border-[#c6a476]"
                    />
                  </label>

                  <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                    Package Selection
                    <select 
                      value={formData.packageType} 
                      onChange={(e) => setFormData({ ...formData, packageType: e.target.value })} 
                      className="mt-1.5 w-full rounded-xl border border-[#e5dacb] bg-white px-4 py-3 text-xs font-medium outline-none focus:border-[#c6a476]"
                    >
                      <option>The Slow Escape (€120/person)</option>
                      <option>The Active Escape (€160/person)</option>
                    </select>
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                    Group Size
                    <select 
                      value={formData.groupSize} 
                      onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })} 
                      className="mt-1.5 w-full rounded-xl border border-[#e5dacb] bg-white px-4 py-3 text-xs font-medium outline-none focus:border-[#c6a476]"
                    >
                      <option>2 travelers</option>
                      <option>3-4 travelers</option>
                      <option>5+ travelers</option>
                      <option>Solo traveler (Custom Pricing)</option>
                    </select>
                  </label>
                </div>

                <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">
                  Special Requests / Hotel Name (Optional)
                  <textarea 
                    rows={3} 
                    value={formData.message} 
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                    placeholder="Tell us your hotel name in Marrakech or any dietary requirements..." 
                    className="mt-1.5 w-full resize-none rounded-xl border border-[#e5dacb] bg-white px-4 py-3 text-xs font-medium outline-none focus:border-[#c6a476]"
                  />
                </label>

                <label className="flex cursor-pointer items-start gap-2.5 text-[11px] text-[#4e5e57] pt-1">
                  <input 
                    required 
                    checked={formData.consent} 
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })} 
                    type="checkbox" 
                    className="mt-0.5 accent-[#0a233f]" 
                  />
                  <span>I agree that SafarAtlas may process my request to organize my private Agafay escape.</span>
                </label>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full cursor-pointer rounded-xl bg-[#c6a476] hover:bg-[#aa4a2c] py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all disabled:opacity-50"
                >
                  {submitting ? "Sending Request..." : "Submit Reservation Request →"}
                </button>

                {formError && <p className="text-center text-xs font-bold text-red-600">{formError}</p>}

              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#ecfdf5] border-2 border-[#10b981] text-[#10b981] flex items-center justify-center text-2xl font-black mx-auto">
                  ✓
                </div>
                <h3 className="text-2xl font-serif font-black text-[#07192d]">
                  Request Received, {formData.name}!
                </h3>
                <p className="text-xs text-[#4e5e57] max-w-md mx-auto leading-relaxed">
                  Your reference code is <strong className="font-mono text-[#0a233f]">{leadRef}</strong>. Our Marrakech concierge has received your request for <strong>{formData.travelDate}</strong>.
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi SafarAtlas! I submitted request ${leadRef} for the Agafay VIP Escape on ${formData.travelDate}. Can we confirm?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white text-xs font-extrabold shadow-md hover:bg-[#1eb855] transition-all"
                  >
                    <span>💬 Chat Live with Concierge Now</span>
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* SECTION 8: FAQ ACCORDION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#c6a476]">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-serif font-black text-[#07192d]">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "When and how do I pay?",
                a: "No payment is required on this page. Once we confirm your date and pickup location via WhatsApp, we send a secure Stripe payment link or bank transfer instructions to lock in your private vehicle."
              },
              {
                q: "Can we adjust the departure time?",
                a: "Yes! Because your vehicle is 100% private, we can adjust pickup between 2:30 PM and 4:00 PM depending on sunset timing and your personal preference."
              },
              {
                q: "Is this suitable for couples and families?",
                a: "Absolutely. Couples love the romantic candlelit sunset atmosphere, and families appreciate having a private vehicle without sharing space with strangers."
              },
              {
                q: "What should I wear for the Agafay desert?",
                a: "Wear comfortable casual clothes. Desert evenings can get cool once the sun sets, so we recommend bringing a light jacket or sweater."
              },
              {
                q: "Can I add more Morocco experiences after Agafay?",
                a: "Yes! Agafay is often our guests' favorite introduction to SafarAtlas. After your escape, your concierge can arrange multi-day trips to the Sahara, Taghazout surf coast, or Atlas hiking."
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-[#e5dacb] rounded-2xl overflow-hidden bg-[#faf6f0] transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between font-serif font-bold text-base text-[#07192d] cursor-pointer hover:text-[#c6a476]"
                >
                  <span>{faq.q}</span>
                  <span className="text-xl font-mono">{activeFaq === idx ? "−" : "+"}</span>
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-[#4e5e57] leading-relaxed border-t border-[#e5dacb]/60 pt-3 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9: FINAL WHATSAPP CTA */}
      <section className="py-24 text-white text-center" style={{background: 'linear-gradient(135deg, #0a233f 0%, #07192d 60%, #1a3a28 100%)'}}>
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-5xl sm:text-6xl font-serif font-black tracking-tight text-white">
            Ready to Experience<br/><span style={{color:'#c6a476'}}>Agafay?</span>
          </h2>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl mx-auto">
            Reserve your private sunset escape for tomorrow, this weekend, or your upcoming Marrakech holiday.
          </p>
          
          <div className="pt-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_cta", { type: "whatsapp_final" })}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-[#07192d] text-base font-black shadow-2xl hover:bg-[#faf6f0] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <svg className="w-6 h-6 fill-[#25D366]" viewBox="0 0 24 24">
                <path d="M12.031 2c-5.514 0-9.999 4.486-9.999 10 0 1.763.459 3.483 1.332 5.006l-1.364 4.994 5.111-1.34c1.472.802 3.136 1.226 4.92 1.226 5.514 0 10-4.486 10-10 0-5.514-4.486-10-10-10zm5.992 14.17c-.252.712-1.467 1.358-2.038 1.417-.57.059-1.285.226-4.275-.97-3.601-1.442-5.908-5.117-6.088-5.358-.18-.24-1.464-1.951-1.464-3.722 0-1.771.927-2.643 1.258-3.003.33-.36.72-.45.96-.45.24 0 .48.003.69.012.222.009.52-.084.814.622.3.706 1.02 2.493 1.11 2.673.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.378.471-.54.63-.18.18-.369.375-.159.735.21.36.936 1.543 2.01 2.502 1.383 1.233 2.547 1.617 2.907 1.797.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.81-.18.33.12 2.1.99 2.46 1.17.36.18.6.27.69.42.09.15.09.87-.162 1.582z" />
              </svg>
              <span>Book My Spot on WhatsApp</span>
            </a>
          </div>

          <div className="pt-8 text-xs text-white/70">
            SafarAtlas Managed Journeys · Marrakech, Morocco · <Link href="https://safaratlas.com" className="underline hover:text-white">safaratlas.com</Link>
          </div>
        </div>
      </section>

      {/* STICKY BOTTOM BAR */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#0a233f] text-white border-t border-[#2a5b50] px-4 py-3 shadow-2xl transition-all duration-300 transform ${
          showStickyBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-white">1-Day Agafay VIP Escape</p>
            <p className="text-[11px] text-[#c6a476]">From €120/person · Fully Private</p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click_cta", { type: "whatsapp_sticky" })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1eb855] text-white text-xs font-extrabold shadow-md cursor-pointer shrink-0"
          >
            <span>💬 Book on WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  );
}
