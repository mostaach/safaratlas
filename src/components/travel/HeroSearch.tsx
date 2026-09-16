"use client";

import React, { useState } from "react";
import { DESTINATIONS } from "../../data/mockData";

interface HeroSearchProps {
  onSearch?: (query: string, region: string) => void;
  onSelectCategory?: (category: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSearch, onSelectCategory }) => {
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Morocco");
  const [activeCategory, setActiveCategory] = useState("All Experiences");

  const categories = [
    { label: "All Experiences", icon: "✨" },
    { label: "Riads & Stays", icon: "🏰" },
    { label: "Sahara Camps", icon: "⛺" },
    { label: "Surf & Coast", icon: "🏄" },
    { label: "Artisan Crafts", icon: "🏺" },
    { label: "Tagine & Food", icon: "🍲" }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query.trim(), selectedRegion);
    document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Search Bar Container */}
      <form 
        onSubmit={handleFormSubmit}
        className="p-2 sm:p-3 rounded-3xl bg-[#07192d]/95 backdrop-blur-xl shadow-2xl border border-white/15 flex flex-col sm:flex-row items-center gap-3 transition-all focus-within:border-[#C4A258] focus-within:ring-4 focus-within:ring-[#C4A258]/10"
      >
        {/* Search Input */}
        <div className="flex-1 flex items-center gap-3 px-4 py-2.5 w-full">
          <div className="w-9 h-9 rounded-xl bg-[#C4A258]/15 text-[#C4A258] flex items-center justify-center shrink-0 font-bold">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Where do you want to go? (e.g. Marrakech riad, Sahara glamping, Taghazout surf)"
            className="w-full text-xs sm:text-sm font-semibold text-white bg-transparent outline-none placeholder:text-white/40"
          />
        </div>

        {/* Region Select */}
        <div className="w-full sm:w-52 border-t sm:border-t-0 sm:border-l border-white/10 px-4 py-2 flex items-center gap-2">
          <span className="text-xs">📍</span>
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full text-xs font-bold text-white bg-transparent outline-none cursor-pointer"
          >
            <option value="All Morocco" className="bg-[#07192d] text-white">All Morocco Regions</option>
            {DESTINATIONS.map(d => (
              <option key={d.id} value={d.name} className="bg-[#07192d] text-white">{d.name}</option>
            ))}
          </select>
        </div>

        {/* Explore Button */}
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#C4A258] hover:bg-[#d8bb78] text-[#07192d] text-xs font-black tracking-wide shadow-lg transition-all shrink-0 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
        >
          <span>Explore Atlas</span>
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </form>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => {
                setActiveCategory(cat.label);
                if (onSelectCategory) onSelectCategory(cat.label);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 border cursor-pointer ${
                isActive 
                  ? 'bg-[#C4A258] text-[#07192d] border-[#C4A258] shadow-md scale-105' 
                  : 'bg-[#0d2239]/80 text-white/75 border-white/10 hover:bg-[#0d2239] hover:border-white/25 hover:text-white'
              }`}
            >
              <span className="text-sm">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
