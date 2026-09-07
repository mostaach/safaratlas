"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
  showTagline?: boolean;
  iconOnly?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = "md", 
  variant = "dark", 
  showTagline = false,
  iconOnly = false,
  className = ""
}) => {
  const isLight = variant === "light";
  
  const iconSize = size === "sm" ? 34 : size === "lg" ? 54 : 42;
  const textSize = size === "sm" ? "text-xl" : size === "lg" ? "text-3xl" : "text-2xl";
  const taglineSize = size === "sm" ? "text-[9px]" : "text-[10px]";

  // Use crisp white vector for dark backgrounds, navbar vector for light backgrounds
  const logoSrc = isLight 
    ? "/safar-atlas-logo-white.svg" 
    : "/safar-atlas-navbar.svg";

  return (
    <div className={`flex items-center gap-3 group cursor-pointer select-none ${className}`}>
      <Image
        src={logoSrc}
        alt="SafarAtlas Logo"
        width={iconSize}
        height={iconSize}
        priority
        className="shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
      />

      {/* Brand Typography */}
      {!iconOnly && (
        <div className="flex flex-col">
          <div className={`font-serif font-black tracking-tight ${textSize} ${isLight ? 'text-white' : 'text-[#16375A]'}`}>
            Safar<span className="text-[#C4A258] font-sans font-extrabold group-hover:text-[#f4c36b] transition-colors">Atlas</span>
          </div>
          {showTagline && (
            <span className={`${taglineSize} font-sans font-extrabold uppercase tracking-[0.2em] ${isLight ? 'text-white/70' : 'text-[#16375A]/70'}`}>
              Morocco Travel Atlas
            </span>
          )}
        </div>
      )}
    </div>
  );
};
