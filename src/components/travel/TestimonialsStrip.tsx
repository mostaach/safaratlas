"use client";

import React from "react";

const TRUST_PILLARS = [
  {
    id: 1,
    icon: (
      <svg className="w-6 h-6 text-[#C4A258]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Local knowledge",
    desc: "Travel recommendations shaped by people who know Morocco, not a generic list of activities.",
    tagColor: "#C4A258",
  },
  {
    id: 2,
    icon: (
      <svg className="w-6 h-6 text-[#25D366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "One connected journey",
    desc: "Stays, transport and experiences are coordinated together so the trip feels like one route.",
    tagColor: "#25D366",
  },
  {
    id: 3,
    icon: (
      <svg className="w-6 h-6 text-[#C4A258]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Human support",
    desc: "A real contact helps before you book and stays available when plans need to shift.",
    tagColor: "#C4A258",
  },
];

export const TestimonialsStrip: React.FC<{ onInquire?: () => void }> = ({ onInquire }) => {
  return (
    <section id="why-safaratlas" className="py-16 lg:py-20 bg-[#07192d] text-[#f6f2ec] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-9">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-4xl sm:text-5xl font-serif font-black text-white tracking-tight">
            Why book Morocco through SafarAtlas?
          </h2>
          <p className="text-base text-white/70 leading-relaxed">
            Because booking everything separately turns a beautiful trip into logistics work.
          </p>
        </div>

        {/* Trust Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {TRUST_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="group relative p-7 rounded-2xl border border-white/10 bg-[#0d2239] hover:border-[#C4A258]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                {pillar.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-serif font-bold text-white">{pillar.title}</h3>
              <p className="text-base text-white/70 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Honest Early Adopter CTA */}
        <div className="rounded-2xl border border-white/10 bg-[#0d2239] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-serif font-bold text-white">
              Be among the first travelers on SafarAtlas
            </h3>
            <p className="text-base text-white/70 max-w-md leading-relaxed">
              We&apos;re launching our managed journey operating system. Tell us your vision, and our local team will orchestrate a flawless, custom itinerary just for you.
            </p>
          </div>
          <button
            onClick={onInquire}
            className="cursor-pointer shrink-0 px-8 py-3.5 rounded-2xl bg-[#C4A258] hover:bg-[#d8bb78] text-[#07192d] text-sm font-black tracking-wide shadow-lg transition-all hover:-translate-y-0.5 whitespace-nowrap"
          >
            Plan your Morocco journey →
          </button>
        </div>

      </div>
    </section>
  );
};
