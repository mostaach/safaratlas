"use client";

import React, { useState } from "react";
import { BusinessListing } from "../../data/mockData";
import { VerifiedBadge } from "../brand/VerifiedBadge";

interface BusinessListingCardProps {
  business: BusinessListing;
  onInquire?: (business: BusinessListing) => void;
  onView?: (business: BusinessListing) => void;
}

export const BusinessListingCard: React.FC<BusinessListingCardProps> = ({ business, onInquire }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = business.gallery && business.gallery.length > 0 ? business.gallery : [business.image];

  return (
    <div className="group p-4 sm:p-6 flex flex-col md:flex-row gap-6 items-stretch relative bg-[#0d2239] rounded-3xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#C4A258]/30 hover:shadow-2xl">
      
      {/* Left Column: Image Cover + Thumbnail Carousel Dots */}
      <div className="relative w-full md:w-72 h-56 md:h-56 rounded-2xl overflow-hidden shrink-0 bg-[#051324]">
        <img 
          src={images[activeImageIndex]} 
          alt={business.name}
          loading="lazy"
          width={288}
          height={224}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />
        
        {/* Category Pill */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider border border-white/10">
          {business.category}
        </span>

        {/* Price Tag */}
        <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#07192d] text-[#C4A258] text-xs font-black shadow-md border border-[#C4A258]/30">
          {business.priceRange}
        </span>

        {/* Thumbnail Carousel dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1 rounded-full bg-black/50 backdrop-blur-sm">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(idx);
                }}
                aria-label={`View image ${idx + 1}`}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  activeImageIndex === idx ? 'bg-[#C4A258] w-4' : 'bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Details & Action CTAs */}
      <div className="flex-1 flex flex-col justify-between space-y-4">
        
        {/* Top Info */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            {business.verified && <VerifiedBadge type={business.verifiedBadgeType} size="sm" />}
            {!business.verified && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#C4A258]/15 text-[#C4A258] text-[10px] font-bold border border-[#C4A258]/30 uppercase tracking-wide">
                Verification Pending
              </span>
            )}
            
            <div className="flex items-center gap-2 text-xs font-bold">
              {business.reviewCount > 0 && (
                <span className="flex items-center gap-1 text-[#C4A258] bg-[#C4A258]/10 px-2.5 py-0.5 rounded-full border border-[#C4A258]/20">
                  ★ {business.rating} ({business.reviewCount})
                </span>
              )}
              <span className="text-white/70 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                ⚡ Responds {business.responseTime}
              </span>
            </div>
          </div>

          <h4 className="text-xl sm:text-2xl font-serif font-black text-white tracking-tight group-hover:text-[#C4A258] transition-colors">
            {business.name}
          </h4>

          <p className="text-xs font-semibold text-white/70 mt-1 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-[#C4A258]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{business.location}</span>
          </p>

          <p className="text-xs leading-relaxed text-white/70 mt-3 line-clamp-2">
            {business.shortDesc}
          </p>
        </div>

        {/* Amenities Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {business.amenities.slice(0, 4).map((amenity, idx) => (
            <span key={idx} className="text-[10px] font-semibold bg-white/10 text-white/90 px-2.5 py-1 rounded-lg border border-white/5">
              ✓ {amenity}
            </span>
          ))}
        </div>

        {/* Bottom Bar: Direct Partner Guarantee & Actions */}
        <div className="pt-3.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-white/80">
            <svg className="w-4 h-4 text-[#25D366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>{business.directInquiryMargin}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onInquire?.(business)}
              className="relative overflow-hidden cursor-pointer px-5 py-2.5 rounded-xl bg-[#C4A258] text-[#07192d] text-xs font-black shadow-md hover:bg-[#d8bb78] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <div className="absolute inset-0 animate-shimmer pointer-events-none" />
              <span className="relative z-10">Add to My Journey</span>
              <svg className="w-3.5 h-3.5 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
