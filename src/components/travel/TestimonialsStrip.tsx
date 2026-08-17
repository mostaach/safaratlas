"use client";

import React from "react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sophie Laurent",
    country: "Paris, France",
    flag: "🇫🇷",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    rating: 5,
    text: "SafarAtlas connected us directly with our Riad host before we even landed. No middlemen, no hidden fees — just a beautiful courtyard and a family who felt like friends by day three.",
    destination: "Marrakech Medina",
    tripType: "Couple's Retreat",
    verified: true,
  },
  {
    id: 2,
    name: "Tom Ashworth",
    country: "London, UK",
    flag: "🇬🇧",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
    rating: 5,
    text: "Found our Sahara desert camp through the atlas map. The inquiry went straight to the camp owner — he called us within 20 minutes. Sleeping under those stars was the highlight of our year.",
    destination: "Erg Chebbi, Merzouga",
    tripType: "Adventure Group",
    verified: true,
  },
  {
    id: 3,
    name: "Ana García",
    country: "Barcelona, Spain",
    flag: "🇪🇸",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
    rating: 5,
    text: "I was nervous about planning Morocco solo. The verified partner badge and instant WhatsApp response gave me the confidence I needed. The surf villa exceeded every expectation.",
    destination: "Taghazout Coast",
    tripType: "Solo Surf Trip",
    verified: true,
  },
];

export const TestimonialsStrip: React.FC<{ onInquire?: () => void }> = ({ onInquire }) => {
  return (
    <section id="testimonials" className="py-20 bg-white border-t border-[#e5dacb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#c95e3d]">
            Real Travelers · Verified Stays
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#121a17] tracking-tight">
            Morocco through their eyes
          </h2>
          <p className="text-sm text-[#4e5e57]">
            Every review comes from a traveler who connected directly with a verified SafarAtlas partner.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="group relative p-7 rounded-3xl border border-[#e5dacb] bg-[#faf6f0] hover:border-[#c95e3d]/40 hover:shadow-xl hover:shadow-[#c95e3d]/8 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Quote Mark */}
              <div className="absolute top-5 right-6 text-5xl font-serif text-[#f4c36b]/40 leading-none select-none" aria-hidden="true">
                "
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-0.5 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-[#f4c36b]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-sm text-[#1b2622] leading-relaxed font-medium mb-6 relative z-10">
                "{t.text}"
              </blockquote>

              {/* Trip Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="text-[10px] font-bold bg-[#123b34]/10 text-[#123b34] px-2.5 py-1 rounded-lg">
                  📍 {t.destination}
                </span>
                <span className="text-[10px] font-bold bg-[#c95e3d]/10 text-[#c95e3d] px-2.5 py-1 rounded-lg">
                  {t.tripType}
                </span>
              </div>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#e5dacb]">
                <div className="relative shrink-0">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#e5dacb]"
                  />
                  {t.verified && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#059669] border-2 border-white flex items-center justify-center" aria-label="Verified traveler">
                      <svg className="w-2 h-2 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xs font-black text-[#121a17]">{t.name}</p>
                  <p className="text-[10px] text-[#4e5e57] font-semibold">{t.flag} {t.country}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#059669] bg-[#ecfdf5] px-2 py-0.5 rounded-full border border-[#a7f3d0]">
                    Verified Stay
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Row */}
        <div className="text-center pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onInquire}
            className="cursor-pointer px-8 py-3.5 rounded-2xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-sm font-black tracking-wide shadow-lg shadow-[#c95e3d]/20 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c95e3d]"
          >
            Plan your Morocco journey →
          </button>
          <p className="text-xs text-[#4e5e57] font-medium">
            Join 500+ travelers who found their perfect Moroccan experience
          </p>
        </div>

      </div>
    </section>
  );
};
