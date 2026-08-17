"use client";

import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = "md", variant = "dark", showTagline = false }) => {
  const isLight = variant === "light";
  
  const iconSize = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-12 h-12" : "w-10 h-10";
  const textSize = size === "sm" ? "text-xl" : size === "lg" ? "text-3xl" : "text-2xl";
  const taglineSize = size === "sm" ? "text-[9px]" : "text-[10px]";

  return (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      {/* Emblem Badge: High Atlas Peak + Moroccan Zellige Star Compass */}
      <div className={`relative ${iconSize} rounded-2xl bg-gradient-to-br from-[#194c43] via-[#2a7b6c] to-[#121a17] p-[2px] shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#c95e3d]/20`}>
        <div className="w-full h-full rounded-[14px] bg-[#121a17] flex items-center justify-center relative overflow-hidden">
          {/* Subtle Golden Zellige Line Pattern Background */}
          <svg className="absolute inset-0 w-full h-full opacity-25 text-[#f4c36b]" viewBox="0 0 40 40" fill="none">
            <path d="M20 0L40 20L20 40L0 20Z" stroke="currentColor" strokeWidth="1" />
            <path d="M0 0L40 40M40 0L0 40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          </svg>

          {/* Atlas Mountain & Astrolabe Compass SVG Emblem */}
          <svg className="w-3/4 h-3/4 text-[#f4c36b] relative z-10 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Primary Peak */}
            <polygon points="3 20 9 10 15 20" className="fill-[#c95e3d]/50" />
            <polyline points="3 20 9 10 15 20" />
            {/* Secondary Peak */}
            <polyline points="12 14 16 8 21 20" className="fill-[#f4c36b]/30" />
            <polyline points="12 14 16 8 21 20" />
            {/* Saharan Star Compass */}
            <circle cx="16" cy="6" r="2" className="fill-[#f4c36b] stroke-none animate-pulse" />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className={`font-serif font-black tracking-tight ${textSize} ${isLight ? 'text-white' : 'text-[#121a17]'}`}>
          Safar<span className="text-[#c95e3d] font-sans font-extrabold group-hover:text-[#f4c36b] transition-colors">Atlas</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#f4c36b] ml-1 group-hover:animate-ping" />
        </div>
        {showTagline && (
          <span className={`${taglineSize} font-sans font-extrabold uppercase tracking-[0.2em] ${isLight ? 'text-white/70' : 'text-[#4e5e57]'}`}>
            Morocco Travel Atlas
          </span>
        )}
      </div>
    </div>
  );
};
