"use client";

import React, { useState } from "react";

interface VerifiedBadgeProps {
  type?: 'Gold Partner' | 'Local Certified' | 'Community Choice';
  size?: 'sm' | 'md';
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ type = 'Gold Partner', size = 'md' }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const isSmall = size === 'sm';

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className={`inline-flex items-center gap-1.5 rounded-full font-bold transition-all duration-200 ${
        isSmall ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      } bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0] shadow-2xs hover:bg-[#d1fae5]`}>
        <svg className={`${isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-[#059669]`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Safar Verified</span>
      </span>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl z-50 pointer-events-none animate-in fade-in duration-150">
          <div className="font-bold text-accent mb-1 flex items-center gap-1">
            <span>✓ Safar Verified Business</span>
          </div>
          <p className="text-white/80 text-[11px] leading-relaxed">
            Verified local Moroccan partner. Direct inquiry pricing guarantee without hidden third-party middleman booking commissions.
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
};
