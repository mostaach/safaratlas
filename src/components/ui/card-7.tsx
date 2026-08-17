import React from "react";
import { MapPin } from "lucide-react";

interface TravelCardProps {
  imageUrl: string;
  imageAlt: string;
  logo?: React.ReactNode;
  title: string;
  location: string;
  overview: string;
  price: number | string;
  pricePeriod?: string;
  onBookNow: () => void;
  "aria-label"?: string;
  className?: string;
  category?: string;
}

export const TravelCard: React.FC<TravelCardProps> = ({
  imageUrl,
  imageAlt,
  logo,
  title,
  location,
  overview,
  price,
  pricePeriod,
  onBookNow,
  "aria-label": ariaLabel,
  className = "",
  category,
}) => {
  return (
    <div 
      className={`group relative overflow-hidden rounded-[28px] w-full h-[400px] sm:h-[440px] shadow-lg transition-all duration-500 hover:shadow-2xl ${className}`}
      aria-label={ariaLabel}
    >
      {/* Full Background Image */}
      <img
        src={imageUrl}
        alt={imageAlt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none transition-opacity duration-500" />
      
      {/* Top Left Logo/Badge */}
      {logo && (
        <div className="absolute top-5 left-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-sm z-10">
          {logo}
        </div>
      )}

      {/* Category Pill */}
      {category && (
        <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest z-10">
          {category}
        </div>
      )}

      {/* Bottom Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 z-10">
        
        {/* Title & Location */}
        <div className="mb-4 transform transition-transform duration-500 translate-y-0 group-hover:-translate-y-1">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight mb-1.5 tracking-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-xs font-medium text-white/80 line-clamp-1">
            {location}
          </p>
        </div>

        {/* Overview Section */}
        <div className="mb-4 transform transition-transform duration-500 translate-y-0 group-hover:-translate-y-1">
          <h4 className="text-[10px] font-bold tracking-widest text-white/80 mb-2 uppercase">
            Overview
          </h4>
          <p className="text-xs text-white/75 leading-relaxed line-clamp-2 font-medium">
            {overview}
          </p>
        </div>

        {/* Footer: Price & Action */}
        <div className="flex items-center justify-between mt-1 pt-3 border-t border-white/20 transform transition-transform duration-500 translate-y-0 group-hover:-translate-y-1">
          <div>
            <div className="text-white font-bold text-xl flex items-baseline gap-1">
              {typeof price === "number" ? `$${price}` : price}
              {pricePeriod && (
                <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider">
                  / {pricePeriod}
                </span>
              )}
            </div>
            <div className="text-[10px] text-[#a7f3d0] font-bold flex items-center gap-1 mt-1 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]"></span>
              Safar Verified
            </div>
          </div>
          
          <button
            onClick={onBookNow}
            className="cursor-pointer px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:bg-white/30 hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center gap-2"
          >
            <span>Connect</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
