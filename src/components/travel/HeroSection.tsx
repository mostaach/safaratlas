"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DESTINATIONS } from "../../data/mockData";
import { FadeIn } from "../animations/FadeIn";
import { SlideUp } from "../animations/SlideUp";

interface HeroSectionProps {
  onSearch?: (query: string, region: string) => void;
  onSelectCategory?: (category: string) => void;
  onOpenInquiry?: (businessId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
}) => {
  const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);

  const activeDest = DESTINATIONS[activeDestinationIndex];

  // Auto-loop showcase card
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDestinationIndex((prev) => (prev + 1) % DESTINATIONS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="top" className="relative pt-24 pb-14 lg:pt-32 lg:pb-20 overflow-hidden bg-[#07192d] text-[#f6f2ec]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(196,162,88,0.08)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Text, Mode Switcher & Search Bar */}
          <div className="lg:col-span-7 space-y-7">

            {/* Headline */}
            <SlideUp delay={0.2}>
              <h1 className="max-w-3xl text-4xl sm:text-6xl xl:text-7xl font-serif font-black tracking-tight leading-[1.05] sm:leading-[0.96] text-white">
                Your Morocco trip, <span className="text-[#C4A258]">planned and managed for you.</span>
              </h1>
            </SlideUp>

            {/* Subhead */}
            <SlideUp delay={0.3}>
              <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl font-medium">
                From the first idea to your final sunset, SafarAtlas brings your stays, transport, experiences and itinerary together in one managed journey.
              </p>
            </SlideUp>

            {/* CTA row */}
            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <a
                  id="hero-cta"
                  href="/journey"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C4A258] hover:bg-[#d8bb78] text-[#07192d] text-sm font-black tracking-widest shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Plan My Morocco Trip →</span>
                </a>
                <button
                  type="button"
                  onClick={() => document.getElementById("itineraries")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-bold tracking-wide shadow-sm transition-all border border-white/15 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>See sample journey</span>
                  <span className="text-[#C4A258]">↓</span>
                </button>
              </div>
            </FadeIn>

            {/* Trust Metrics Bar */}
            <FadeIn delay={0.5}>
              <div className="pt-1 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold tracking-wide text-white/70">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                  <span>One Point of Contact</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C4A258]" />
                  <span>One Transparent Price</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C4A258]" />
                  <span>Managed Local Partner Network</span>
                </div>
              </div>
            </FadeIn>

          </div>

          {/* RIGHT COLUMN: Interactive Destination Showcase Card */}
          <div className="lg:col-span-5 relative">
            <FadeIn delay={0.3}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Showcase Card */}
                <div className="relative rounded-2xl bg-[#0d2239] border border-white/10 shadow-2xl overflow-hidden group">
                  
                  {/* Image Container */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#051324]">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeDest.id}
                        src={activeDest.image}
                        alt={activeDest.name}
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </AnimatePresence>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07192d] via-[#07192d]/30 to-transparent" />

                    {/* Floating Top Badge: Arabic Name */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-lg bg-black/50 backdrop-blur-md text-[#C4A258] text-xs font-bold shadow-lg border border-white/15">
                        {activeDest.arabicName}
                      </span>
                    </div>

                    {/* Floating Top Right Badge: Best Time */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 rounded-lg bg-[#07192d]/90 backdrop-blur-md text-[#C4A258] text-xs font-bold tracking-wide shadow-lg border border-[#C4A258]/30 flex items-center gap-1">
                        <span className="text-white/70 text-[10px] font-medium tracking-normal">Best:</span>
                        <span>{activeDest.bestTime}</span>
                      </span>
                    </div>

                    {/* Title & Region Overlay on Image Bottom */}
                    <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#C4A258]">
                        {activeDest.region}
                      </span>
                      <h3 className="text-xl font-serif font-bold tracking-tight text-white leading-tight mt-0.5">
                        {activeDest.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content & Actions */}
                  <div className="p-5 space-y-4 bg-[#0d2239]">
                    <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
                      {activeDest.tagline}
                    </p>

                    {/* Highlights & Explore Row */}
                    <div className="flex items-center justify-between pt-1 border-t border-white/10">
                      <div>
                        <span className="text-[10px] font-bold text-white/60 block uppercase tracking-wider">Best Time</span>
                        <span className="text-sm font-bold tracking-wide text-[#C4A258]">{activeDest.bestTime}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (onSearch) onSearch("", activeDest.name);
                          document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#C4A258] hover:bg-[#d8bb78] text-[#07192d] text-xs font-bold tracking-wide transition-all shadow-md flex items-center gap-1.5 transform hover:scale-105 cursor-pointer"
                      >
                        <span>Explore Region</span>
                        <span>→</span>
                      </button>
                    </div>

                  </div>

                  {/* Bottom Controls: Switch Featured Card */}
                  <div className="px-5 py-3 bg-[#051324] border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">
                      Destinations ({activeDestinationIndex + 1}/{DESTINATIONS.length})
                    </span>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {DESTINATIONS.map((item, idx) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveDestinationIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            idx === activeDestinationIndex
                              ? "w-5 bg-[#C4A258]"
                              : "w-2 bg-white/20 hover:bg-white/40"
                          }`}
                          aria-label={`Show ${item.name}`}
                        />
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  );
};
