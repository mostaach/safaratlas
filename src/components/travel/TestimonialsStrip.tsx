"use client";

import React from "react";

const TRUST_PILLARS = [
  {
    id: 1,
    icon: "🤝",
    title: "Direct host access",
    desc: "Every inquiry goes straight to the host — no platform intermediary, no commission markup, no automated bots. You speak directly with the person who runs the place.",
    tag: "How it works",
    tagColor: "#123b34",
  },
  {
    id: 2,
    icon: "✅",
    title: "Safar Verified standard",
    desc: "We manually vet every partner before they appear on SafarAtlas. Each listing means the business has passed our identity and quality review process.",
    tag: "Trust",
    tagColor: "#059669",
  },
  {
    id: 3,
    icon: "🗺️",
    title: "Built inside Morocco",
    desc: "SafarAtlas is built by people on the ground in Marrakech — we know the operators, the routes, and the realities of Moroccan tourism firsthand.",
    tag: "Authenticity",
    tagColor: "#c95e3d",
  },
];

export const TestimonialsStrip: React.FC<{ onInquire?: () => void }> = ({ onInquire }) => {
  return (
    <section id="why-safaratlas" className="py-20 bg-white border-t border-[#e5dacb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#c95e3d]">
            Why SafarAtlas
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#121a17] tracking-tight">
            A different kind of travel network
          </h2>
          <p className="text-sm text-[#4e5e57]">
            We built SafarAtlas because Morocco deserves better than generic booking platforms. Here&apos;s what that means in practice.
          </p>
        </div>

        {/* Trust Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {TRUST_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="group relative p-7 rounded-3xl border border-[#e5dacb] bg-[#faf6f0] hover:border-[#c95e3d]/40 hover:shadow-xl hover:shadow-[#c95e3d]/8 hover:-translate-y-1 transition-all duration-300 space-y-4"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#f2e9dc] flex items-center justify-center text-2xl">
                {pillar.icon}
              </div>

              {/* Tag */}
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg"
                style={{ background: `${pillar.tagColor}15`, color: pillar.tagColor }}
              >
                {pillar.tag}
              </span>

              {/* Content */}
              <h3 className="text-lg font-serif font-bold text-[#121a17]">{pillar.title}</h3>
              <p className="text-sm text-[#4e5e57] leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Honest Early Adopter CTA */}
        <div className="rounded-3xl border border-[#e5dacb] bg-[#faf6f0] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#c95e3d]">
              Early Access Network
            </p>
            <h3 className="text-xl font-serif font-bold text-[#121a17]">
              Be among the first travelers on SafarAtlas
            </h3>
            <p className="text-sm text-[#4e5e57] max-w-md">
              We&apos;re launching our verified partner network in Marrakech. Inquire now and get personal, direct responses from our founding partners.
            </p>
          </div>
          <button
            onClick={onInquire}
            className="cursor-pointer shrink-0 px-8 py-3.5 rounded-2xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-sm font-black tracking-wide shadow-lg shadow-[#c95e3d]/20 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c95e3d] whitespace-nowrap"
          >
            Plan your Morocco journey →
          </button>
        </div>

      </div>
    </section>
  );
};
