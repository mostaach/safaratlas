"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getStoredJourney, removeEscapeFromJourney, removeExtraExperience } from "../../lib/journeyStore";
import { JourneyState } from "../../lib/journeyTypes";
import { calculateJourneyQuote } from "../../lib/pricingEngine";
import { X, ChevronUp, ChevronDown, Compass, Check, ArrowRight, Shield, Phone } from "lucide-react";

export const JourneyDrawer: React.FC = () => {
  const [journey, setJourney] = useState<JourneyState | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  useEffect(() => {
    setJourney(getStoredJourney());

    const onUpdate = (e: Event) => {
      const custom = e as CustomEvent<JourneyState>;
      if (custom.detail) {
        setJourney(custom.detail);
        // Automatically slide open briefly when an item is added
        setIsOpen(true);
      }
    };

    window.addEventListener("safaratlas_journey_update", onUpdate);
    return () => window.removeEventListener("safaratlas_journey_update", onUpdate);
  }, []);

  if (!journey) return null;

  const totalItemsCount = (journey.items?.length || 0) + (journey.extras?.length || 0);

  // If completely empty, do not show persistent drawer
  if (totalItemsCount === 0) return null;

  const quote = calculateJourneyQuote(journey, 2);
  const totalDays = Math.max(1, journey.items.reduce((sum, item) => sum + item.durationDays, 0));

  const handleRemoveEscape = (slug: string) => {
    const updated = removeEscapeFromJourney(slug);
    setJourney(updated);
  };

  const handleRemoveExtra = (id: string) => {
    const updated = removeExtraExperience(id);
    setJourney(updated);
  };

  return (
    <>
      {/* ── 1. DESKTOP SLIDE-OUT DRAWER ── */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-50">
        {/* Minimized Trigger Pill when closed */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 bg-[#07192d] hover:bg-[#0b2545] text-[#f6f2ec] border border-[#C4A258]/50 px-5 py-3.5 rounded-none shadow-[0_12px_40px_rgba(0,0,0,0.6)] cursor-pointer transition-all hover:scale-105"
          >
            <Compass className="w-5 h-5 text-[#C4A258] animate-pulse" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono tracking-widest text-[#C4A258] uppercase">My Journey</span>
              <span className="text-xs font-bold text-[#f6f2ec]">
                {totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"} · From €{quote.pricePerPersonEur}/pp
              </span>
            </div>
            <ChevronUp className="w-4 h-4 text-[#f6f2ec]/60 ml-1" />
          </button>
        )}

        {/* Expanded Desktop Drawer */}
        {isOpen && (
          <div className="w-96 max-h-[85vh] flex flex-col bg-[#07192d] border border-white/15 rounded-none shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-5">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-[#051324] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C4A258]" />
                <span className="text-xs font-bold tracking-wider uppercase text-[#f6f2ec]">Your Morocco Journey</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:text-[#C4A258] text-[#f6f2ec]/60 transition-colors"
                title="Minimize Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Items List */}
            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#C4A258]/80 mb-1">
                Selected Escapes & Experiences ({totalItemsCount})
              </div>

              {/* Escapes List */}
              {journey.items.map((item) => (
                <div key={item.slug} className="p-3 bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-xs font-bold text-[#f6f2ec] truncate">{item.title}</span>
                    <div className="flex items-center gap-2 text-[10px] text-[#f6f2ec]/60 font-mono mt-0.5">
                      <span>{item.assignedDay ? `Day ${item.assignedDay}` : "Open Date"}</span>
                      <span>·</span>
                      <span className="text-[#C4A258]">€{item.priceFromEur}/pp</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveEscape(item.slug)}
                    className="text-[#f6f2ec]/40 hover:text-red-400 p-1 transition-colors"
                    title="Remove item"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* Extras List */}
              {(journey.extras || []).map((extra) => (
                <div key={extra.id} className="p-3 bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-xs font-bold text-[#f6f2ec] truncate">{extra.title}</span>
                    <span className="text-[10px] text-[#C4A258] font-mono mt-0.5">€{extra.priceEur}/pp</span>
                  </div>
                  <button
                    onClick={() => handleRemoveExtra(extra.id)}
                    className="text-[#f6f2ec]/40 hover:text-red-400 p-1 transition-colors"
                    title="Remove extra"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* Included SafarAtlas Guarantee */}
              <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px] text-[#f6f2ec]/70">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C4A258]" />
                  <span>Private door-to-door transit included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C4A258]" />
                  <span>24/7 dedicated human WhatsApp concierge</span>
                </div>
              </div>
            </div>

            {/* Footer Summary & Direct CTA */}
            <div className="p-4 border-t border-white/10 bg-[#051324] space-y-3">
              <div className="flex items-baseline justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#f6f2ec]/50 uppercase tracking-widest font-mono">Estimated Total</span>
                  <span className="text-[10px] text-[#C4A258]">Based on 2 travelers sharing</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-serif font-bold text-[#C4A258]">
                    From €{quote.pricePerPersonEur}
                  </span>
                  <span className="text-[10px] text-[#f6f2ec]/50 block">/ person</span>
                </div>
              </div>

              <Link
                href="/journey"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C4A258] hover:bg-[#d8bb78] text-[#07192d] font-bold text-xs uppercase tracking-widest py-3 px-4 rounded-none transition-all"
              >
                <span>Review & Request Journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── 2. MOBILE FLOATING BOTTOM BAR ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        {/* Sticky Trigger Bar */}
        <div
          onClick={() => setIsMobileExpanded(!isMobileExpanded)}
          className="bg-[#07192d] border-t border-[#C4A258]/40 px-4 py-3 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.8)] cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-[#C4A258]" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono tracking-wider text-[#C4A258] uppercase">My Journey</span>
              <span className="text-xs font-bold text-[#f6f2ec]">
                {totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"} · From €{quote.pricePerPersonEur}/pp
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/journey"
              onClick={(e) => e.stopPropagation()}
              className="bg-[#C4A258] text-[#07192d] text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-none"
            >
              Review →
            </Link>
            {isMobileExpanded ? (
              <ChevronDown className="w-5 h-5 text-[#f6f2ec]/60" />
            ) : (
              <ChevronUp className="w-5 h-5 text-[#f6f2ec]/60" />
            )}
          </div>
        </div>

        {/* Mobile Slide-Up Sheet */}
        {isMobileExpanded && (
          <div className="bg-[#051324] border-t border-white/10 p-4 max-h-[60vh] overflow-y-auto space-y-3 pb-6 animate-in slide-in-from-bottom">
            <div className="text-xs font-bold text-[#f6f2ec] flex justify-between items-center pb-2 border-b border-white/10">
              <span>Your Itinerary Items</span>
              <button onClick={() => setIsMobileExpanded(false)} className="text-[#f6f2ec]/50">
                Close
              </button>
            </div>

            {journey.items.map((item) => (
              <div key={item.slug} className="flex justify-between items-center p-2.5 bg-white/5 text-xs">
                <div>
                  <div className="font-bold text-[#f6f2ec]">{item.title}</div>
                  <div className="text-[10px] text-[#C4A258] font-mono">€{item.priceFromEur}/pp</div>
                </div>
                <button onClick={() => handleRemoveEscape(item.slug)} className="text-[#f6f2ec]/50 p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            <Link
              href="/journey"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#C4A258] text-[#07192d] font-bold text-xs uppercase tracking-widest py-3 mt-3 rounded-none"
            >
              <span>Complete Journey Request</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};