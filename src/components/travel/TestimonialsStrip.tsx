"use client";

import React from "react";

const TRUST_PILLARS = [
  {
    id: 1,
    icon: (
      <svg className="w-6 h-6 text-[#123b34]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "End-to-End Orchestration",
    desc: "We are not a passive directory. Tell us what you want to experience, and our local experts will design, book, and seamlessly manage your Moroccan itinerary from arrival to departure.",
    tag: "How it works",
    tagColor: "#123b34",
  },
  {
    id: 2,
    icon: (
      <svg className="w-6 h-6 text-[#059669]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "SafarAtlas Vetted Network",
    desc: "We manually inspect every partner in our ecosystem. By controlling the supply chain, we guarantee exceptional quality, safety, and reliability across your entire journey.",
    tag: "Trust",
    tagColor: "#059669",
  },
  {
    id: 3,
    icon: (
      <svg className="w-6 h-6 text-[#c95e3d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Built Inside Morocco",
    desc: "Operated by a team on the ground in Marrakech. We don't just sell tours; we know the hidden routes, the best local operators, and the realities of Moroccan logistics firsthand.",
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
            We built SafarAtlas because planning a Moroccan trip shouldn't be stressful. Here is how our managed journey model works in practice.
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
              We&apos;re launching our managed journey operating system. Tell us your vision, and our local team will orchestrate a flawless, custom itinerary just for you.
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
