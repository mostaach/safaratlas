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
    }, 5000); // Loop every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="top" className="relative pt-24 pb-14 lg:pt-32 lg:pb-20 overflow-hidden zellige-pattern">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(115deg,rgba(250,246,240,0.92)_0%,rgba(250,246,240,0.78)_45%,rgba(242,233,220,0.55)_100%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Text, Mode Switcher & Search Bar */}
          <div className="lg:col-span-7 space-y-7">

            {/* Headline */}
            <SlideUp delay={0.2}>
              <h1 className="max-w-3xl text-5xl sm:text-6xl xl:text-7xl font-serif font-black tracking-tight leading-[0.96] text-[#121a17]">
                Your Morocco trip, <span className="text-[#c95e3d]">planned and managed for you.</span>
              </h1>
            </SlideUp>

            {/* Subhead */}
            <SlideUp delay={0.3}>
              <p className="text-base sm:text-lg text-[#4e5e57] leading-relaxed max-w-2xl font-medium">
                From the first idea to your final sunset, SafarAtlas brings your stays, transport, experiences and itinerary together in one managed journey.
              </p>
            </SlideUp>

            {/* Integrated Search Console with Category Tabs */}
            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <a
                  id="hero-cta"
                  href="/journey"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-sm font-black tracking-widest shadow-[0_16px_36px_rgba(201,94,61,0.26)] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Plan My Morocco Trip →</span>
                </a>
                <button
                  type="button"
                  onClick={() => document.getElementById("itineraries")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/80 hover:bg-white text-[#123b34] text-sm font-bold tracking-wide shadow-sm transition-all border border-[#d9cbb8] transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>See sample journey</span>
                  <span className="text-[#c95e3d]">↓</span>
                </button>
              </div>
            </FadeIn>

            {/* Trust Metrics Bar */}
            <FadeIn delay={0.5}>
              <div className="pt-1 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold tracking-wide text-[#4e5e57]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#059669]" />
                  <span>One Point of Contact</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f4c36b]" />
                  <span>One Transparent Price</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c95e3d]" />
                  <span>Managed Local Partner Network</span>
                </div>
              </div>
            </FadeIn>

          </div>


          {/* RIGHT COLUMN: Interactive Destination Showcase Card */}
          <div className="lg:col-span-5 relative">
            <FadeIn delay={0.3}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Decorative Glowing Backdrop */}
                {/* Main Showcase Card */}
                <div className="relative rounded-2xl bg-white border border-[#e5dacb] shadow-[0_28px_70px_-36px_rgba(18,26,23,0.55)] overflow-hidden group">
                  
                  {/* Image Container */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#121a17]">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121a17] via-[#121a17]/30 to-transparent" />

                    {/* Floating Top Badge: Arabic Name */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[#123b34] text-xs font-bold shadow-lg border border-white/40">
                        {activeDest.arabicName}
                      </span>
                    </div>

                    {/* Floating Top Right Badge: Best Time */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 rounded-lg bg-[#123b34]/90 backdrop-blur-md text-[#f4c36b] text-xs font-bold tracking-wide shadow-lg border border-[#f4c36b]/30 flex items-center gap-1">
                        <span className="text-white/70 text-[10px] font-medium tracking-normal">Best:</span>
                        <span>{activeDest.bestTime}</span>
                      </span>
                    </div>

                    {/* Title & Region Overlay on Image Bottom */}
                    <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#f4c36b]">
                        {activeDest.region}
                      </span>
                      <h3 className="text-xl font-serif font-bold tracking-tight text-white leading-tight mt-0.5">
                        {activeDest.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content & Actions */}
                  <div className="p-5 space-y-4 bg-white">
                    <p className="text-sm text-[#4e5e57] leading-relaxed line-clamp-2">
                      {activeDest.tagline}
                    </p>

                    {/* Highlights & Explore Row */}
                    <div className="flex items-center justify-between pt-1 border-t border-[#f4ecdd]">
                      <div>
                        <span className="text-[10px] font-bold text-[#4e5e57] block uppercase tracking-wider">Best Time</span>
                        <span className="text-sm font-bold tracking-wide text-[#123b34]">{activeDest.bestTime}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (onSearch) onSearch("", activeDest.name);
                          document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#123b34] hover:bg-[#0b2621] text-[#f4c36b] text-xs font-bold tracking-wide transition-all shadow-md flex items-center gap-1.5 transform hover:scale-105"
                      >
                        <span>Explore Region</span>
                        <span>→</span>
                      </button>
                    </div>

                  </div>

                  {/* Bottom Controls: Switch Featured Card */}
                  <div className="px-5 py-3 bg-[#faf6f0] border-t border-[#e5dacb] flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#4e5e57] uppercase tracking-wider">
                      Destinations ({activeDestinationIndex + 1}/{DESTINATIONS.length})
                    </span>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {DESTINATIONS.map((item, idx) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveDestinationIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            idx === activeDestinationIndex
                              ? "w-5 bg-[#c95e3d]"
                              : "w-2 bg-[#d7cbbb] hover:bg-[#123b34]"
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
