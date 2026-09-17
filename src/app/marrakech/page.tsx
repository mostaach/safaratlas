import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../../components/brand/Header";
import { Footer } from "../../components/brand/Footer";
import { ESCAPES_PACKAGES } from "../../data/mockData";
import { DestinationJourneyBuilder } from "../../components/destination/DestinationJourneyBuilder";
import { MARRAKECH_DESTINATION_DATA } from "../../data/marrakechDestinationData";
import { MapPin, Compass, Shield, Phone, Sparkles, ChevronRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Marrakech Journey Builder & Escapes | SafarAtlas",
  description: "Build your custom Marrakech stay. Modular Escapes including Agafay Desert Sunset, High Atlas Treks, and Sahara Expeditions with private transport and 24/7 concierge.",
  alternates: {
    canonical: "https://safaratlas.com/marrakech",
  },
};

export default function MarrakechPage() {
  // Filter escapes associated with the Marrakech hub
  const marrakechEscapes = ESCAPES_PACKAGES.filter((pkg) => 
    ["escape-agafay-1d", "escape-sahara-3d", "escape-atlas-2d", "escape-imlil-1d", "escape-ouzoud-1d", "escape-ourika-1d"].includes(pkg.id)
  );

  return (
    <main className="min-h-screen bg-[#07192d] text-[#f6f2ec] selection:bg-[#d6b78a] selection:text-[#07192d]">
      {/* Global Navigation Header */}
      <Header variant="dark" />

      {/* ── 1. EDITORIAL HERO SECTION ── */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] w-full flex items-end pb-12 sm:pb-16 pt-32 px-4 sm:px-8 border-b border-white/10 bg-[#07192d] overflow-hidden">
        {/* Background Image with Dark Vignette */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(7, 25, 45, 0.4) 0%, rgba(7, 25, 45, 0.92) 100%), url('${MARRAKECH_DESTINATION_DATA.heroImage}')`,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Breadcrumb / Tag */}
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#C4A258] uppercase mb-3">
            <Link href="/" className="hover:underline">Morocco</Link>
            <span>/</span>
            <span>Destination Hub</span>
            <span>/</span>
            <span className="text-[#f6f2ec] font-bold">Marrakech</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-medium leading-[1.05] tracking-tight text-[#f6f2ec]">
            Marrakech
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#C4A258] mt-1">
            {MARRAKECH_DESTINATION_DATA.arabicName} · {MARRAKECH_DESTINATION_DATA.tagline}
          </p>

          <p className="mt-4 max-w-2xl text-xs sm:text-sm text-[#f6f2ec]/80 leading-relaxed font-sans">
            {MARRAKECH_DESTINATION_DATA.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ── 2. JOURNEY BUILDER (FIRST 50% OF THE PAGE) ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <DestinationJourneyBuilder escapes={marrakechEscapes} />
      </section>

      {/* ── 3. EXPLORE MARRAKECH & NEIGHBOURHOODS (DEEPER CONTENT) ── */}
      <section className="bg-[#051324] border-t border-b border-white/10 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase block mb-1">
              Explore The Region
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#f6f2ec] font-bold">
              Places & Territories Around Marrakech
            </h2>
            <p className="text-xs text-[#f6f2ec]/70 mt-1 max-w-2xl">
              From the bustling UNESCO Medina to peaceful mountain gorges and desert plateaus within two hours of the city.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MARRAKECH_DESTINATION_DATA.places.map((place, idx) => (
              <div
                key={idx}
                className="bg-[#07192d] border border-white/10 p-6 rounded-none flex flex-col justify-between hover:border-[#C4A258]/40 transition-all"
              >
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#C4A258] uppercase block mb-2">
                    {place.tag}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#f6f2ec]">{place.name}</h3>
                  <div className="text-[11px] text-[#C4A258]/80 font-mono mt-0.5">{place.subtitle}</div>
                  <p className="text-xs text-[#f6f2ec]/65 mt-3 leading-relaxed">{place.desc}</p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/5">
                  <span className="text-[10px] text-[#f6f2ec]/50 font-mono">Private Chauffeur Available</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHY BUILD WITH SAFARATLAS (EDITORIAL PROMISE) ── */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-8">
        <div className="bg-[#051324] border border-[#C4A258]/30 p-8 sm:p-12 rounded-none space-y-6">
          <div className="flex items-center gap-3">
            <Compass className="w-6 h-6 text-[#C4A258]" />
            <span className="text-xs font-mono tracking-widest text-[#C4A258] uppercase font-bold">
              The SafarAtlas Promise
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif text-[#f6f2ec] font-bold">
            If you are coming to Morocco, you are our guest.
          </h3>

          <p className="text-xs sm:text-sm text-[#f6f2ec]/75 leading-relaxed max-w-3xl">
            We don't sell random isolated bus tours. Whether you book a single evening in Agafay or assemble a multi-day journey with riads and mountain lodges, you receive a single coordinated standard: private climate-controlled Mercedes transit, vetted local hosts, transparent upfront pricing, and a dedicated 24/7 human WhatsApp concierge.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-[#f6f2ec]/80">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#C4A258]" />
              <span>Door-to-door private vehicles</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#C4A258]" />
              <span>Direct vetted local partners</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#C4A258]" />
              <span>Zero hidden tourist traps</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. TRAVEL ESSENTIALS & FAQ ── */}
      <section className="bg-[#051324] border-t border-white/10 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase block mb-1">
              Practical Advice
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-[#f6f2ec] font-bold">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {MARRAKECH_DESTINATION_DATA.faq.map((item, i) => (
              <div key={i} className="p-5 bg-[#07192d] border border-white/10 rounded-none space-y-2">
                <h4 className="text-sm font-bold text-[#f6f2ec]">{item.q}</h4>
                <p className="text-xs text-[#f6f2ec]/70 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}