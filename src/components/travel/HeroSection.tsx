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
  onSelectCategory,
  onOpenInquiry,
}) => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);

  const activeDest = DESTINATIONS[activeDestinationIndex];

  // Auto-loop showcase card
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDestinationIndex((prev) => (prev + 1) % DESTINATIONS.length);
    }, 5000); // Loop every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query.trim(), "All Morocco");
    document.getElementById("verified-partners")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="top" className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden zellige-pattern">
      {/* ANIMATED BACKGROUND LIGHTING LAYER */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Glowing Orb 1 */}
        <motion.div 
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 left-1/4 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#f4c36b]/25 via-[#c95e3d]/15 to-transparent blur-3xl"
        />

        {/* Floating Glowing Orb 2 */}
        <motion.div 
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-[#123b34]/20 via-[#2a7b6c]/10 to-transparent blur-3xl"
        />

        {/* Pulsing Center Highlight */}
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-radial from-[#f4c36b]/15 via-transparent to-transparent blur-3xl"
        />

        {/* Saharan Golden Floating Dust Particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${10 + i * 9}%`,
              y: `${80 + (i % 3) * 10}%`,
              opacity: 0.2 + (i % 4) * 0.15,
              scale: 0.6 + (i % 3) * 0.4,
            }}
            animate={{
              y: ["80%", "-10%"],
              x: [`${10 + i * 9}%`, `${10 + i * 9 + (i % 2 === 0 ? 5 : -5)}%`],
              opacity: [0, 0.7, 0.8, 0],
            }}
            transition={{
              duration: 12 + (i % 5) * 3,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#f4c36b] shadow-[0_0_8px_#f4c36b]"
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Text, Mode Switcher & Search Bar */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill Badge */}
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123b34]/10 border border-[#123b34]/20 text-[#123b34] text-xs font-bold uppercase tracking-widest">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c95e3d] animate-pulse" />
                <span>Managed Morocco Travel Platform</span>
              </div>
            </FadeIn>

            {/* Headline */}
            <SlideUp delay={0.2}>
              <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight leading-[1.02] text-[#121a17]">
                Your Morocco journey, <span className="gradient-terracotta-text">managed locally.</span>
              </h1>
            </SlideUp>

            {/* Subhead */}
            <SlideUp delay={0.3}>
              <p className="text-base sm:text-lg text-[#4e5e57] leading-relaxed max-w-xl font-medium">
                Discover Morocco, select modular <strong>Escapes</strong>, and let SafarAtlas orchestrate your complete journey with trusted local partners. One point of contact, one transparent price.
              </p>
            </SlideUp>

            {/* Integrated Search Console with Category Tabs */}
            <FadeIn delay={0.4}>
              <div className="p-3 sm:p-4 rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl border border-[#e5dacb] space-y-3">
                
                {/* Search Bar Form */}
                <form 
                  onSubmit={handleFormSubmit}
                  className="flex flex-col sm:flex-row items-center gap-2"
                >
                  {/* Search Input */}
                  <div className="flex-1 flex items-center gap-3 px-3 py-2 w-full bg-[#faf6f0]/70 rounded-2xl border border-[#e5dacb]/60 focus-within:border-[#c95e3d]">
                    <div className="w-8 h-8 rounded-xl bg-[#c95e3d]/10 text-[#c95e3d] flex items-center justify-center shrink-0 font-bold">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input 
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search Escapes (Sahara, Agafay), experiences, destinations..."
                      className="w-full text-xs sm:text-sm font-medium text-[#121a17] bg-transparent outline-none placeholder:text-[#4e5e57]/60"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-xs font-bold tracking-widest shadow-lg shadow-[#c95e3d]/25 transition-all shrink-0 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Explore</span>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </form>
              </div>
            </FadeIn>

            {/* Trust Metrics Bar */}
            <FadeIn delay={0.5}>
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-bold tracking-wide text-[#4e5e57]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#059669]" />
                  <span>One Point of Contact</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#123b34]">⚡</span>
                  <span>One Transparent Price</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#c95e3d]">🇲🇦</span>
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
                <div className="absolute -inset-2 bg-gradient-to-r from-[#c95e3d]/30 via-[#f4c36b]/30 to-[#123b34]/30 rounded-3xl blur-2xl opacity-70 animate-pulse pointer-events-none" />

                {/* Main Showcase Card */}
                <div className="relative rounded-3xl bg-white border border-[#e5dacb] shadow-2xl overflow-hidden group">
                  
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
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#123b34] text-[10px] font-bold uppercase tracking-widest shadow-lg border border-white/40 flex items-center gap-1.5">
                        <span className="text-[#c95e3d]">✦</span>
                        {activeDest.arabicName}
                      </span>
                    </div>

                    {/* Floating Top Right Badge: Best Time */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 rounded-full bg-[#123b34]/90 backdrop-blur-md text-[#f4c36b] text-xs font-bold tracking-wide shadow-lg border border-[#f4c36b]/30 flex items-center gap-1">
                        <span className="text-white/70 text-[10px] font-medium tracking-normal">Best:</span>
                        <span>{activeDest.bestTime}</span>
                      </span>
                    </div>

                    {/* Title & Region Overlay on Image Bottom */}
                    <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#f4c36b]">
                        📍 {activeDest.region}
                      </span>
                      <h3 className="text-xl font-serif font-bold tracking-tight text-white leading-tight mt-0.5">
                        {activeDest.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content & Actions */}
                  <div className="p-5 space-y-4 bg-white">
                    <p className="text-xs text-[#4e5e57] leading-relaxed line-clamp-2">
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
                          document.getElementById("verified-partners")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
