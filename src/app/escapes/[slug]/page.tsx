import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ESCAPES_PACKAGES } from "../../../data/mockData";
import { AddEscapeToJourneyButton } from "../../../components/travel/AddEscapeToJourneyButton";

export async function generateStaticParams() {
  return ESCAPES_PACKAGES.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const escapePkg = ESCAPES_PACKAGES.find((pkg) => pkg.slug === params.slug);
  if (!escapePkg) return {};

  return {
    title: `${escapePkg.title} | SafarAtlas Managed Journeys`,
    description: escapePkg.fullDescription || escapePkg.summary,
    openGraph: {
      title: `${escapePkg.title} - SafarAtlas`,
      description: escapePkg.fullDescription || escapePkg.summary,
      images: [
        {
          url: escapePkg.image,
          width: 1200,
          height: 630,
          alt: escapePkg.title,
        },
      ],
      type: "article",
    },
  };
}

export default function EscapePage({ params }: { params: { slug: string } }) {
  const escapePkg = ESCAPES_PACKAGES.find((pkg) => pkg.slug === params.slug);

  if (!escapePkg) {
    notFound();
  }

  // Schema.org structured data for Tour
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": escapePkg.title,
    "description": escapePkg.fullDescription || escapePkg.summary,
    "touristType": [
      "Sightseeing",
      "Adventure"
    ],
    "offers": {
      "@type": "Offer",
      "price": escapePkg.priceFromEur,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@id": "https://safaratlas.com/#organization"
    }
  };

  return (
    <main className="min-h-screen bg-[#faf6f0]">
      <Script
        id={`json-ld-${escapePkg.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Navbar Minimal */}
      <nav className="w-full bg-[#121a17] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <span className="text-xl">🌟</span>
          <span className="font-serif font-black tracking-tight text-xl">SafarAtlas</span>
        </Link>
        <Link href="/" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">
          ← Back to Journeys
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[50vh] min-h-[400px] w-full bg-[#121a17]">
        <img
          src={escapePkg.image}
          alt={escapePkg.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121a17] via-[#121a17]/40 to-transparent" />
        
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-end pb-12 lg:pb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#123b34]/90 backdrop-blur-md text-[#f4c36b] text-xs font-extrabold uppercase tracking-wider border border-[#f4c36b]/30">
              {escapePkg.badge}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold border border-white/10">
              ⏱️ {escapePkg.duration}
            </span>
          </div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#f4c36b] mb-2 block">
            📍 {escapePkg.location} · Modular Journey Package
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white drop-shadow-lg max-w-4xl">
            {escapePkg.title}
          </h1>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-white/80 font-medium max-w-2xl leading-relaxed">
            {escapePkg.subtitle}
          </p>
        </div>
      </section>

      {/* CONTENT BODY */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        
        {/* Main Content (Left Col) */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#c95e3d]">
              Escape Overview
            </h2>
            <p className="text-base sm:text-lg text-[#4e5e57] leading-relaxed">
              {escapePkg.fullDescription || escapePkg.summary}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#123b34]">
              ✨ Key Highlights
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {escapePkg.highlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#e5dacb] shadow-sm">
                  <span className="text-[#c95e3d] font-black text-lg leading-none">·</span>
                  <span className="text-sm font-semibold text-[#121a17]">{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Day-by-Day Itinerary */}
          {escapePkg.itineraryDays && escapePkg.itineraryDays.length > 0 && (
            <div className="space-y-6 pt-4">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#123b34]">
                📅 Day-by-Day Itinerary
              </h2>
              
              <div className="space-y-8 border-l-2 border-[#e5dacb] pl-6 ml-2">
                {escapePkg.itineraryDays.map((day) => (
                  <div key={day.dayNumber} className="relative">
                    <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-[#123b34] text-white flex items-center justify-center text-sm font-bold shadow-md">
                      {day.dayNumber}
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 border border-[#e5dacb] space-y-4 shadow-sm">
                      <h3 className="text-xl font-serif font-bold text-[#121a17]">
                        {day.title}
                      </h3>
                      <p className="text-sm text-[#4e5e57] leading-relaxed">
                        {day.description}
                      </p>
                      
                      {day.image && (
                        <img 
                          src={day.image} 
                          alt={`Day ${day.dayNumber}`}
                          className="w-full h-48 sm:h-64 object-cover rounded-xl mt-4" 
                        />
                      )}
                      
                      {day.highlights && day.highlights.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-2">
                          {day.highlights.map((hl, i) => (
                            <span key={i} className="text-[10px] font-bold bg-[#faf6f0] text-[#123b34] px-2.5 py-1 rounded-md border border-[#e5dacb]">
                              ✓ {hl}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Included / Not Included */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            <div className="bg-white p-6 rounded-2xl border border-[#e5dacb] space-y-4 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#059669] flex items-center gap-2">
                <span>✓</span> What's Included
              </h3>
              <ul className="space-y-3">
                {escapePkg.included.map((inc, i) => (
                  <li key={i} className="text-sm font-medium text-[#121a17] flex items-start gap-3">
                    <span className="text-[#059669] font-bold">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-[#e5dacb] space-y-4 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#4e5e57] flex items-center gap-2">
                <span>ℹ️</span> Not Included
              </h3>
              <ul className="space-y-3">
                {(escapePkg.notIncluded || ["Personal expenses & tips", "International flights"]).map((exc, i) => (
                  <li key={i} className="text-sm text-[#4e5e57] flex items-start gap-3">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>

        {/* Sidebar Sticky (Right Col) */}
        <div className="relative">
          <div className="sticky top-24 bg-white p-6 rounded-3xl border border-[#e5dacb] shadow-xl space-y-6">
            
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#c95e3d] block mb-2">
                Managed Pricing
              </span>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-serif font-black text-[#121a17]">
                  €{escapePkg.priceFromEur}
                </span>
                <span className="text-sm text-[#4e5e57] font-medium pb-1">
                  / person
                </span>
              </div>
              <p className="text-xs text-[#4e5e57] mt-2">
                *Base price for a standard group of 2 travelers. Solo or large group pricing available upon request.
              </p>
            </div>

            <hr className="border-[#e5dacb]" />

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#121a17]">How to book this Escape:</h4>
              <p className="text-xs text-[#4e5e57] leading-relaxed">
                This is a modular journey piece. You can add this Escape to your larger Morocco trip, and SafarAtlas will coordinate all dates, logistics, and payments directly with our verified local partners.
              </p>
            </div>

            <AddEscapeToJourneyButton escapePkg={escapePkg} />
          </div>
        </div>

      </section>
    </main>
  );
}
