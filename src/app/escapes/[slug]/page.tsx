import React from "react";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { ESCAPES_PACKAGES } from "../../../data/mockData";
import { AddEscapeToJourneyButton } from "../../../components/travel/AddEscapeToJourneyButton";
import { Header } from "../../../components/brand/Header";
import { Footer } from "../../../components/brand/Footer";

export async function generateStaticParams() {
  return ESCAPES_PACKAGES.map((pkg) => ({
    slug: pkg.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const escapePkg = ESCAPES_PACKAGES.find((pkg) => pkg.slug === slug);
  if (!escapePkg) return {};

  const url = `https://safaratlas.com/escapes/${escapePkg.slug}`;
  const imageUrl = escapePkg.image.startsWith("http")
    ? escapePkg.image
    : `https://safaratlas.com${escapePkg.image}`;

  return {
    title: `${escapePkg.title} | SafarAtlas Managed Morocco Journeys`,
    description: escapePkg.fullDescription || escapePkg.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${escapePkg.title} — SafarAtlas Morocco`,
      description: escapePkg.fullDescription || escapePkg.summary,
      url,
      siteName: "SafarAtlas",
      images: [
        {
          url: imageUrl,
          width: 1600,
          height: 1066,
          alt: `${escapePkg.title} - ${escapePkg.location}`,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${escapePkg.title} | SafarAtlas`,
      description: escapePkg.summary || escapePkg.fullDescription,
      images: [imageUrl],
    },
  };
}

export default async function EscapePage({ params }: Props) {
  const { slug } = await params;

  if (slug === "agafay-escape-1d") {
    redirect("/agafay");
  }

  const escapePkg = ESCAPES_PACKAGES.find((pkg) => pkg.slug === slug);

  if (!escapePkg) {
    notFound();
  }

  const url = `https://safaratlas.com/escapes/${escapePkg.slug}`;
  const imageUrl = escapePkg.image.startsWith("http")
    ? escapePkg.image
    : `https://safaratlas.com${escapePkg.image}`;

  // Schema.org structured data for TouristTrip / Tour
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": escapePkg.title,
    "description": escapePkg.fullDescription || escapePkg.summary,
    "image": imageUrl,
    "touristType": [
      "Sightseeing",
      "Adventure",
      "Cultural & Nature Enthusiasts"
    ],
    "offers": {
      "@type": "Offer",
      "price": escapePkg.priceFromEur,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": url,
      "validFrom": "2026-01-01"
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "SafarAtlas",
      "url": "https://safaratlas.com",
      "telephone": "+212698017323"
    }
  };

  return (
    <main className="min-h-screen bg-[#07192d] text-[#f6f2ec]">
      <Script
        id={`json-ld-${escapePkg.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Global Navigation Header */}
      <Header variant="dark" />

      {/* HERO SECTION */}
      <section className="relative h-[50vh] min-h-[400px] w-full bg-[#07192d]">
        <img
          src={escapePkg.image}
          alt={escapePkg.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07192d] via-[#07192d]/50 to-transparent" />
        
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-end pb-12 lg:pb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#0d2239]/90 backdrop-blur-md text-[#C4A258] text-xs font-extrabold uppercase tracking-wider border border-[#C4A258]/30">
              {escapePkg.badge}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold border border-white/10">
              ⏱️ {escapePkg.duration}
            </span>
          </div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C4A258] mb-2 block">
            📍 {escapePkg.location} · Modular Journey Package
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-[#f6f2ec] drop-shadow-lg max-w-4xl">
            {escapePkg.title}
          </h1>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-[#f6f2ec]/80 font-medium max-w-2xl leading-relaxed">
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
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#C4A258]">
              Escape Overview
            </h2>
            <p className="text-base sm:text-lg text-[#f6f2ec]/80 leading-relaxed">
              {escapePkg.fullDescription || escapePkg.summary}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#C4A258]">
              ✨ Key Highlights
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {escapePkg.highlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-3 bg-[#0d2239]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-sm">
                  <span className="text-[#C4A258] font-black text-lg leading-none">·</span>
                  <span className="text-sm font-semibold text-[#f6f2ec]">{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Day-by-Day Itinerary */}
          {escapePkg.itineraryDays && escapePkg.itineraryDays.length > 0 && (
            <div className="space-y-6 pt-4">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#C4A258]">
                📅 Day-by-Day Itinerary
              </h2>
              
              <div className="space-y-8 border-l-2 border-white/10 pl-6 ml-2">
                {escapePkg.itineraryDays.map((day) => (
                  <div key={day.dayNumber} className="relative">
                    <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-[#C4A258] text-[#07192d] flex items-center justify-center text-sm font-bold shadow-md">
                      {day.dayNumber}
                    </div>
                    
                    <div className="bg-[#0d2239]/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4 shadow-sm">
                      <h3 className="text-xl font-serif font-bold text-[#f6f2ec]">
                        {day.title}
                      </h3>
                      <p className="text-sm text-[#f6f2ec]/75 leading-relaxed">
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
                            <span key={i} className="text-[10px] font-bold bg-white/5 text-[#C4A258] px-2.5 py-1 rounded-md border border-white/10">
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
            <div className="bg-[#0d2239]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#C4A258] flex items-center gap-2">
                <span>✓</span> What's Included
              </h3>
              <ul className="space-y-3">
                {escapePkg.included.map((inc, i) => (
                  <li key={i} className="text-sm font-medium text-[#f6f2ec] flex items-start gap-3">
                    <span className="text-[#25D366] font-bold">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#0d2239]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#f6f2ec]/60 flex items-center gap-2">
                <span>ℹ️</span> Not Included
              </h3>
              <ul className="space-y-3">
                {(escapePkg.notIncluded || ["Personal expenses & tips", "International flights"]).map((exc, i) => (
                  <li key={i} className="text-sm text-[#f6f2ec]/60 flex items-start gap-3">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>

          <div className="relative">
          <div className="sticky top-24 bg-[#0d2239]/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C4A258] block mb-2">
                Seasonal & Group Rates
              </span>
              <div>
                <span className="text-3xl font-serif font-black text-[#f6f2ec]">
                  Pricing via WhatsApp
                </span>
                <span className="block text-xs font-semibold text-[#C4A258] mt-1">
                  Tailored to your party size & dates
                </span>
              </div>
              <p className="text-xs text-[#f6f2ec]/70 mt-2 leading-relaxed">
                All-inclusive managed package: private transfers, vetted accommodations, and local activities. Rates adjust dynamically based on season and group volume.
              </p>
            </div>

            {/* Who it suits */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C4A258] block">
                Who this escape suits
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  escapePkg.category === "Desert" && "Desert Lovers",
                  escapePkg.category === "Coast" && "Surf & Ocean",
                  escapePkg.category === "Mountain" && "Adventure Seekers",
                  escapePkg.category === "Cultural" && "Culture & History",
                  "Couples",
                  "Small Groups",
                  "Private Trips",
                ].filter(Boolean).map((tag) => (
                  <span key={tag as string} className="text-[10px] font-bold bg-white/5 text-[#f6f2ec]/70 px-2.5 py-1 rounded-md border border-white/10">
                    {tag as string}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={`https://wa.me/212698017323?text=${encodeURIComponent(`Hi SafarAtlas! What is the tailored price for the ${escapePkg.title} for our travel dates and group size?`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1da851] text-white text-xs font-normal tracking-[0.18em] shadow-md transition-all flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              <span>Instant Quote on WhatsApp</span>
            </a>

            <hr className="border-white/10" />

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#f6f2ec]">How to book this Escape:</h4>
              <p className="text-xs text-[#f6f2ec]/70 leading-relaxed">
                This is a modular journey piece. You can add this Escape to your larger Morocco trip, and SafarAtlas will coordinate all dates, logistics, and payments directly with our verified local partners.
              </p>
            </div>

            <AddEscapeToJourneyButton escapePkg={escapePkg} />
          </div>
        </div>


      </section>

      {/* Global Brand Footer */}
      <Footer />
    </main>
  );
}
