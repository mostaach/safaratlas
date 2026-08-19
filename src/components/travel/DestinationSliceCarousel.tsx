"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Destination } from "../../data/mockData";

interface DestinationSliceCarouselProps {
  destinations: Destination[];
  onSelect?: (destination: Destination) => void;
}

/** Returns the tint overlay style for each destination */
function getSliceTint(id: string): string {
  const map: Record<string, string> = {
    marrakech:    "from-amber-900/70 via-rose-900/40 to-transparent",
    merzouga:     "from-amber-800/70 via-orange-900/40 to-transparent",
    taghazout:    "from-teal-900/70 via-cyan-900/40 to-transparent",
    chefchaouen:  "from-blue-900/70 via-indigo-900/40 to-transparent",
    fes:          "from-emerald-900/70 via-teal-900/40 to-transparent",
    essaouira:    "from-sky-900/70 via-slate-900/40 to-transparent",
  };
  return map[id] ?? "from-[#121a17]/70 via-[#121a17]/30 to-transparent";
}

export const DestinationSliceCarousel: React.FC<DestinationSliceCarouselProps> = ({
  destinations,
  onSelect,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [savedIdx, setSavedIdx] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);

  // ── Keyboard navigation ──────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActiveIdx(i => Math.min(i + 1, destinations.length - 1));
      if (e.key === "ArrowLeft")  setActiveIdx(i => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [destinations.length]);

  // ── Wheel / trackpad horizontal scroll (desktop) ─────────────────────────
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let accumulator = 0;
    const THRESHOLD = 60;

    const onWheel = (e: WheelEvent) => {
      // Only intercept when the section is in view
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      // CRITICAL FIX: Only intercept horizontal scroll. Let vertical scroll pass through natively.
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return;

      accumulator += e.deltaX;

      if (Math.abs(accumulator) > THRESHOLD) {
        if (accumulator > 0) setActiveIdx(i => Math.min(i + 1, destinations.length - 1));
        else                  setActiveIdx(i => Math.max(i - 1, 0));
        accumulator = 0;
      }
      e.preventDefault(); // Prevent horizontal browser navigation gestures
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [destinations.length]);

  // ── Touch / swipe (mobile & tablet) ─────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = dragStartX.current - e.changedTouches[0].clientX;
    if (delta > 40)  setActiveIdx(i => Math.min(i + 1, destinations.length - 1));
    if (delta < -40) setActiveIdx(i => Math.max(i - 1, 0));
  };

  // ── Mouse drag (desktop fallback) ────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
  };
  const onMouseUp = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = dragStartX.current - e.clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) setActiveIdx(i => Math.min(i + 1, destinations.length - 1));
      else           setActiveIdx(i => Math.max(i - 1, 0));
    }
  }, [destinations.length]);

  const active = destinations[activeIdx];

  return (
    <div className="w-full space-y-6">
      {/* ─── DESKTOP: Horizontal slice accordion ─────────────────────────── */}
      <div
        ref={trackRef}
        className="hidden md:flex items-stretch gap-3 h-[480px] select-none cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp as any}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {destinations.map((dest, idx) => {
          const isActive = idx === activeIdx;
          const isSaved  = savedIdx === idx;

          return (
            <div
              key={dest.id}
              onClick={() => setActiveIdx(idx)}
              style={{
                flex: isActive ? "4 1 0%" : "0.55 1 0%",
                transition: "flex 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="relative rounded-3xl overflow-hidden bg-[#121a17] cursor-pointer group"
            >
              {/* Background image */}
              <img
                src={dest.image}
                alt={dest.name}
                draggable={false}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                  isActive ? "scale-105" : "scale-110"
                } group-hover:scale-105`}
              />

              {/* Gradient tint */}
              <div className={`absolute inset-0 bg-gradient-to-t ${getSliceTint(dest.id)} transition-opacity duration-500`} />
              {/* Extra dark veil when inactive */}
              <div className={`absolute inset-0 bg-[#121a17] transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-40"}`} />

              {/* ── ACTIVE: full overlay content ── */}
              <div
                className={`absolute inset-0 p-7 flex flex-col justify-between transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold text-white tracking-widest border border-white/30">
                    {dest.region}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Arabic accent */}
                    <span className="text-lg font-serif text-[#f4c36b] px-2 py-0.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                      {dest.arabicName}
                    </span>

                    {/* Save toggle */}
                    <button
                      onClick={e => { e.stopPropagation(); setSavedIdx(isSaved ? null : idx); }}
                      aria-label={isSaved ? "Unsave destination" : "Save destination"}
                      className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                        isSaved
                          ? "bg-[#c95e3d] text-white border-[#c95e3d]"
                          : "bg-black/40 text-white border-white/30 hover:bg-white/20"
                      }`}
                    >
                      <svg className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Bottom content */}
                <div className="text-white space-y-3">
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5">
                    {dest.highlights.slice(0, 3).map((h, i) => (
                      <span key={i} className="text-[10px] font-semibold bg-black/50 text-white/90 px-2.5 py-1 rounded-lg border border-white/15 backdrop-blur-sm">
                        ✦ {h}
                      </span>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-4xl font-serif font-bold tracking-tight drop-shadow-md leading-tight">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-white/80 mt-1 italic line-clamp-1">
                      "{dest.tagline}"
                    </p>
                  </div>

                  <p className="text-xs text-white/75 leading-relaxed line-clamp-2 max-w-md">
                    {dest.description}
                  </p>

                  {/* CTA row */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-white/70 font-medium">
                      Best season: <strong className="text-[#f4c36b]">{dest.bestTime}</strong>
                    </span>

                    <button
                      onClick={e => { e.stopPropagation(); onSelect?.(dest); }}
                      className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-xs font-bold tracking-widest shadow-lg transition-all"
                    >
                      <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                      <span className="relative z-10">Explore Guide</span>
                      <svg className="w-3.5 h-3.5 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* ── INACTIVE: vertical name label ── */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-end pb-6 transition-opacity duration-500 ${
                  isActive ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <span
                  className="text-white font-serif font-bold text-sm tracking-widest drop-shadow-md"
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                >
                  {dest.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Desktop dot navigation ───────────────────────────────────────── */}
      <div className="hidden md:flex items-center justify-center gap-2 pt-1">
        {destinations.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`rounded-full transition-all duration-400 ${
              idx === activeIdx
                ? "w-6 h-2 bg-[#c95e3d]"
                : "w-2 h-2 bg-[#e5dacb] hover:bg-[#c95e3d]/50"
            }`}
          />
        ))}
        <span className="ml-3 text-[11px] font-bold text-[#4e5e57]">
          {activeIdx + 1} / {destinations.length}
          <span className="ml-2 opacity-50">· scroll or drag</span>
        </span>
      </div>

      {/* ─── MOBILE / TABLET: Vertical stacked layout ─────────────────────── */}
      <div className="md:hidden flex flex-col gap-3">
        {destinations.map((dest, idx) => {
          const isActive = idx === activeIdx;
          const isSaved  = savedIdx === idx;

          return (
            <div
              key={dest.id}
              onClick={() => setActiveIdx(idx)}
              style={{
                height: isActive ? "340px" : "72px",
                transition: "height 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="relative rounded-2xl overflow-hidden bg-[#121a17] cursor-pointer"
            >
              {/* Background image */}
              <img
                src={dest.image}
                alt={dest.name}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                  isActive ? "scale-105" : "scale-110"
                }`}
              />

              {/* Tint */}
              <div className={`absolute inset-0 bg-gradient-to-t ${getSliceTint(dest.id)}`} />
              <div className={`absolute inset-0 bg-[#121a17] transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-30"}`} />

              {/* Inactive compact row */}
              <div className={`absolute inset-0 px-5 flex items-center justify-between transition-opacity duration-300 ${isActive ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <div className="flex items-center gap-3">
                  <span className="text-base font-serif font-bold text-white drop-shadow">{dest.name}</span>
                  <span className="text-[10px] font-semibold text-white/70 hidden sm:block">{dest.region}</span>
                </div>
                <span className="text-xs font-bold text-[#f4c36b]">Explore →</span>
              </div>

              {/* Active full content */}
              <div className={`absolute inset-0 p-5 flex flex-col justify-between transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="flex items-start justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold text-white tracking-widest border border-white/30">
                    {dest.region}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-serif text-[#f4c36b] px-2 py-0.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                      {dest.arabicName}
                    </span>
                    <button
                      onClick={e => { e.stopPropagation(); setSavedIdx(isSaved ? null : idx); }}
                      className={`p-2 rounded-full backdrop-blur-md border transition-all ${isSaved ? "bg-[#c95e3d] text-white border-[#c95e3d]" : "bg-black/40 text-white border-white/30"}`}
                    >
                      <svg className="w-3.5 h-3.5" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="text-white space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {dest.highlights.slice(0, 2).map((h, i) => (
                      <span key={i} className="text-[10px] font-semibold bg-black/50 text-white/90 px-2 py-0.5 rounded-lg border border-white/15">
                        ✦ {h}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-serif font-bold tracking-tight">{dest.name}</h3>
                  <p className="text-xs text-white/75 line-clamp-2">{dest.description}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-white/70 font-medium">
                      Best: <strong className="text-[#f4c36b]">{dest.bestTime}</strong>
                    </span>
                    <button
                      onClick={e => { e.stopPropagation(); onSelect?.(dest); }}
                      className="relative overflow-hidden flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-[11px] font-bold tracking-widest shadow-md transition-all"
                    >
                      <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                      <span className="relative z-10">Explore</span>
                      <svg className="w-3 h-3 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
