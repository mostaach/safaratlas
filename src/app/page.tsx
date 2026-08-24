"use client";

import React, { useState, useEffect } from "react";
import { trackEvent } from "../lib/trackEvent";
import FloatingNav from "../components/ui/floating-nav";
import { Header } from "../components/brand/Header";
import { Footer } from "../components/brand/Footer";
import { HeroSection } from "../components/travel/HeroSection";
import { DestinationSliceCarousel } from "../components/travel/DestinationSliceCarousel";
import { InteractiveMap } from "../components/travel/InteractiveMap";
import { ItineraryTimeline } from "../components/travel/ItineraryTimeline";
import { InquiryModal } from "../components/travel/InquiryModal";
import { ListingDetailModal } from "../components/travel/ListingDetailModal";

import { FadeIn } from "../components/animations/FadeIn";
import { SlideUp } from "../components/animations/SlideUp";
import { StaggerContainer, StaggerItem } from "../components/animations/StaggerContainer";
import { TestimonialsStrip } from "../components/travel/TestimonialsStrip";
import { EscapesSection } from "../components/travel/EscapesSection";
import { EscapeDetailModal } from "../components/travel/EscapeDetailModal";
import { Toaster, toast } from "sonner";
import { 
  DESTINATIONS, 
  BUSINESS_LISTINGS, 
  ITINERARIES, 
  BusinessListing,
  EscapePackage 
} from "../data/mockData";

export default function Home() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedBusinessForInquiry, setSelectedBusinessForInquiry] = useState<BusinessListing | null>(null);
  const [selectedEscapeForInquiry, setSelectedEscapeForInquiry] = useState<EscapePackage | null>(null);
  const [selectedEscapeForDetail, setSelectedEscapeForDetail] = useState<EscapePackage | null>(null);
  const [selectedBusinessForDetail, setSelectedBusinessForDetail] = useState<BusinessListing | null>(null);


  useEffect(() => {
    trackEvent("page_view", { source: document.referrer || "direct" });
  }, []);

  const handleOpenGeneralInquiry = () => {
    setSelectedBusinessForInquiry(null);
    setSelectedEscapeForInquiry(null);
    setInquiryModalOpen(true);
  };

  const handleOpenPartnerInquiry = (business: BusinessListing) => {
    setSelectedBusinessForDetail(null);
    setSelectedBusinessForInquiry(business);
    setInquiryModalOpen(true);
  };

  const handleInquireById = (businessId: string) => {
    const biz = BUSINESS_LISTINGS.find(b => b.id === businessId);
    if (biz) {
      setSelectedBusinessForInquiry(biz);
    } else {
      setSelectedBusinessForInquiry(null);
    }
    setInquiryModalOpen(true);
  };



  // Helper for generating category icons — kept for any future use
  // (now delegated to ListingsCarousel internally)

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="min-h-screen flex flex-col bg-[#faf6f0] text-[#121a17] font-sans selection:bg-[#f4c36b]">
        
        {/* Impeccable Design System Navigation Header */}
        <Header onOpenInquiryModal={handleOpenGeneralInquiry} />

        {/* Impeccable Design System Floating Dock */}
        <FloatingNav onOpenInquiry={handleOpenGeneralInquiry} />

      <main className="flex-1">
        
        {/* HERO SECTION - SPLIT IMMERSIVE SHOWCASE */}
        <HeroSection 
          onSearch={() => {}}
          onSelectCategory={() => {}}
          onOpenInquiry={() => handleOpenGeneralInquiry()}
        />

        {/* ESCAPES SECTION - PRE-PACKAGED TRIP MODULES */}
        <EscapesSection
          onInquireEscape={(escapePkg) => {
            setSelectedBusinessForInquiry(null);
            setSelectedEscapeForInquiry(escapePkg);
            setInquiryModalOpen(true);
          }}
          onSelectEscapeDetail={(escapePkg) => setSelectedEscapeForDetail(escapePkg)}
        />


        {/* REGION DESTINATIONS SHOWCASE — Focus Slice Carousel */}
        <section id="destinations" className="py-20 bg-[#f2e9dc] border-y border-[#e5dacb]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#c95e3d]">
                  Curated Destinations
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#121a17] tracking-tight mt-1">
                  Made for the way you travel
                </h2>
              </div>
              <p className="text-xs font-medium text-[#4e5e57] max-w-sm">
                From medina courtyards to ocean cliffs and golden Sahara dunes. Click a slice to dive in.
              </p>
            </div>

            {/* Focus Slice Carousel */}
            <DestinationSliceCarousel
              destinations={DESTINATIONS}
              onSelect={() => handleOpenGeneralInquiry()}
            />

          </div>
        </section>


        {/* INTERACTIVE ATLAS MAP SECTION */}
        <section id="map-explorer" className="py-20 bg-[#121a17]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <InteractiveMap 
              onOpenInquiry={handleOpenGeneralInquiry}
            />
          </div>
        </section>


        {/* ITINERARIES TIMELINE SECTION */}
        <section id="itineraries" className="py-20 bg-[#faf6f0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#c95e3d]">
                Step-by-Step Journeys
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#121a17] tracking-tight">
                Curated Itinerary Timelines
              </h2>
              <p className="text-sm text-[#4e5e57]">
                Tested routes with insider timing recommendations, activity highlights, and verified host connections.
              </p>
            </div>

            {/* Active Itinerary View */}
            <ItineraryTimeline 
              itinerary={ITINERARIES[0]}
              onInquirePartner={handleInquireById}
            />

          </div>
        </section>


        {/* SECTION 3: HOW SAFARATLAS MANAGES YOUR JOURNEY */}
        <section id="how-it-works" className="py-20 bg-white border-t border-[#e5dacb]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#c95e3d]">
                You Choose. We Coordinate.
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#121a17] tracking-tight">
                How SafarAtlas Manages Your Journey
              </h2>
              <p className="text-sm text-[#4e5e57]">
                The traveler should not need to coordinate multiple Moroccan tourism businesses. We take care of every detail.
              </p>
            </div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
              <StaggerItem className="p-6 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] space-y-3">
                <span className="text-xs font-black tracking-widest text-[#c95e3d] block">01</span>
                <h3 className="text-base font-serif font-bold text-[#121a17]">Choose Destinations & Escapes</h3>
                <p className="text-xs text-[#4e5e57] leading-relaxed">
                  Browse curated destinations and modular 1–3 day Escapes across Morocco.
                </p>
              </StaggerItem>

              <StaggerItem className="p-6 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] space-y-3">
                <span className="text-xs font-black tracking-widest text-[#c95e3d] block">02</span>
                <h3 className="text-base font-serif font-bold text-[#121a17]">Build Your Journey</h3>
                <p className="text-xs text-[#4e5e57] leading-relaxed">
                  Add Escapes to your timeline, set your travel dates and group preferences.
                </p>
              </StaggerItem>

              <StaggerItem className="p-6 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] space-y-3">
                <span className="text-xs font-black tracking-widest text-[#c95e3d] block">03</span>
                <h3 className="text-base font-serif font-bold text-[#121a17]">SafarAtlas Coordinates Partners</h3>
                <p className="text-xs text-[#4e5e57] leading-relaxed">
                  We check availability with verified drivers, desert camps, and riads.
                </p>
              </StaggerItem>

              <StaggerItem className="p-6 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] space-y-3">
                <span className="text-xs font-black tracking-widest text-[#c95e3d] block">04</span>
                <h3 className="text-base font-serif font-bold text-[#121a17]">Transparent Quote</h3>
                <p className="text-xs text-[#4e5e57] leading-relaxed">
                  Receive one clear price and one coordinated itinerary under one contact.
                </p>
              </StaggerItem>

              <StaggerItem className="p-6 rounded-2xl bg-[#123b34] text-white border border-[#2a5b50] space-y-3">
                <span className="text-xs font-black tracking-widest text-[#f4c36b] block">05</span>
                <h3 className="text-base font-serif font-bold text-[#f4c36b]">Travel & Support</h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Enjoy Morocco with 24/7 dedicated SafarAtlas local concierge support.
                </p>
              </StaggerItem>
            </StaggerContainer>

          </div>
        </section>

        {/* SECTION 4: BUILD YOUR JOURNEY PREVIEW */}
        <section className="py-24 bg-[#123b34] text-white border-t border-[#2a5b50]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 text-center">

            {/* Section header */}
            <FadeIn className="max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#f4c36b] bg-[#121a17] px-4 py-1.5 rounded-full border border-[#f4c36b]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f4c36b] animate-pulse" />
                Interactive Journey Engine
              </span>
              <h2 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-white leading-tight">
                Build Your<br className="hidden sm:block" /> Morocco Journey
              </h2>
              <p className="text-sm sm:text-lg text-white/70 leading-relaxed max-w-xl mx-auto">
                Mix destinations and Escapes. SafarAtlas handles every detail — transport, riads, guides, and transfers.
              </p>
            </FadeIn>

            {/* Journey cards with connecting line */}
            <SlideUp>
              <div className="relative max-w-5xl mx-auto">

                {/* Connecting dashed route line — desktop */}
                <div
                  className="absolute top-[56px] left-[10%] right-[10%] h-px hidden sm:block"
                  style={{ backgroundImage: "repeating-linear-gradient(to right, #f4c36b44 0px, #f4c36b44 8px, transparent 8px, transparent 16px)" }}
                />

                <StaggerContainer className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-3 relative z-10">

                  {/* Card 1: Marrakech */}
                  <StaggerItem className="flex flex-col items-center gap-3 group cursor-default">
                    <div className="w-[112px] h-[112px] rounded-2xl bg-[#1e3a2f] border-2 border-[#2a5b50] group-hover:border-[#f4c36b]/60 transition-all duration-300 flex flex-col items-center justify-center gap-1.5 shadow-lg group-hover:shadow-[0_8px_32px_rgba(244,195,107,0.15)] group-hover:-translate-y-1">
                      <span className="text-3xl">🕌</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#f4c36b]">City</span>
                    </div>
                    <div className="text-center space-y-0.5">
                      <p className="text-sm font-bold text-white">Marrakech</p>
                      <p className="text-[11px] text-white/50">2 Nights · Riad Stay</p>
                    </div>
                  </StaggerItem>

                  {/* Card 2: Sahara Escape */}
                  <StaggerItem className="flex flex-col items-center gap-3 group cursor-default">
                    <div className="relative w-[112px] h-[112px] rounded-2xl bg-gradient-to-br from-[#c95e3d] to-[#a84830] border-2 border-[#c95e3d] flex flex-col items-center justify-center gap-1.5 shadow-[0_8px_40px_rgba(201,94,61,0.4)] group-hover:shadow-[0_12px_50px_rgba(201,94,61,0.6)] group-hover:-translate-y-2 transition-all duration-300">
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-widest bg-[#f4c36b] text-[#121a17] px-2.5 py-0.5 rounded-full whitespace-nowrap">⭐ Escape</span>
                      <span className="text-3xl">🐪</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/90">Desert</span>
                    </div>
                    <div className="text-center space-y-0.5">
                      <p className="text-sm font-bold text-white">Sahara Escape</p>
                      <p className="text-[11px] text-[#f4c36b]">3 Days · Glamping</p>
                    </div>
                  </StaggerItem>

                  {/* Card 3: Transit */}
                  <StaggerItem className="flex flex-col items-center gap-3 group cursor-default">
                    <div className="w-[112px] h-[112px] rounded-2xl bg-[#1e3a2f] border-2 border-dashed border-[#2a5b50] group-hover:border-white/30 transition-all duration-300 flex flex-col items-center justify-center gap-1.5 opacity-75 group-hover:opacity-100">
                      <span className="text-3xl">✈️</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Transit</span>
                    </div>
                    <div className="text-center space-y-0.5">
                      <p className="text-sm font-bold text-white/70">Marrakech</p>
                      <p className="text-[11px] text-white/40">1 Night Transit</p>
                    </div>
                  </StaggerItem>

                  {/* Card 4: Taghazout Escape */}
                  <StaggerItem className="flex flex-col items-center gap-3 group cursor-default">
                    <div className="relative w-[112px] h-[112px] rounded-2xl bg-gradient-to-br from-[#0d6e4a] to-[#059669] border-2 border-[#059669] flex flex-col items-center justify-center gap-1.5 shadow-[0_8px_40px_rgba(5,150,105,0.3)] group-hover:shadow-[0_12px_50px_rgba(5,150,105,0.5)] group-hover:-translate-y-2 transition-all duration-300">
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-widest bg-[#f4c36b] text-[#121a17] px-2.5 py-0.5 rounded-full whitespace-nowrap">⭐ Escape</span>
                      <span className="text-3xl">🏄</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/90">Coast</span>
                    </div>
                    <div className="text-center space-y-0.5">
                      <p className="text-sm font-bold text-white">Taghazout</p>
                      <p className="text-[11px] text-emerald-300">3 Days · Surf Camp</p>
                    </div>
                  </StaggerItem>

                  {/* Card 5: Essaouira */}
                  <StaggerItem className="flex flex-col items-center gap-3 group cursor-default">
                    <div className="w-[112px] h-[112px] rounded-2xl bg-[#1e3a2f] border-2 border-[#2a5b50] group-hover:border-[#f4c36b]/60 transition-all duration-300 flex flex-col items-center justify-center gap-1.5 shadow-lg group-hover:shadow-[0_8px_32px_rgba(244,195,107,0.15)] group-hover:-translate-y-1">
                      <span className="text-3xl">🌊</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#f4c36b]">Coast</span>
                    </div>
                    <div className="text-center space-y-0.5">
                      <p className="text-sm font-bold text-white">Essaouira</p>
                      <p className="text-[11px] text-white/50">2 Nights · Medina</p>
                    </div>
                  </StaggerItem>

                </StaggerContainer>

                {/* Journey meta strip */}
                <div className="mt-12 mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-5 bg-[#0f2921] border border-[#2a5b50] rounded-2xl px-6 py-5">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-5 text-center sm:text-left">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#f4c36b] mb-0.5">Duration</p>
                      <p className="text-base font-bold text-white">10 Days</p>
                    </div>
                    <div className="w-px h-8 bg-white/10 hidden sm:block" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#f4c36b] mb-0.5">From</p>
                      <p className="text-base font-bold text-white">€890 <span className="text-xs font-normal text-white/50">/ person</span></p>
                    </div>
                    <div className="w-px h-8 bg-white/10 hidden sm:block" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#f4c36b] mb-0.5">Managed by</p>
                      <p className="text-base font-bold text-white">SafarAtlas Concierge</p>
                    </div>
                  </div>
                  <a
                    href="/journey"
                    className="relative overflow-hidden shrink-0 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#c95e3d] text-white text-xs font-black tracking-widest shadow-[0_6px_30px_rgba(201,94,61,0.5)] hover:shadow-[0_8px_40px_rgba(201,94,61,0.7)] transition-all duration-300 hover:-translate-y-0.5 group/btn"
                  >
                    <span className="absolute inset-0 bg-white/15 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                    <svg className="w-4 h-4 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <span className="relative z-10">Build My Journey</span>
                  </a>
                </div>

              </div>
            </SlideUp>

          </div>
        </section>


        {/* TESTIMONIALS — Social Proof Section */}
        <TestimonialsStrip onInquire={handleOpenGeneralInquiry} />



      </main>

      {/* FOOTER */}
      <Footer />

      {/* DIRECT INQUIRY LEAD MODAL */}
      <InquiryModal 
        key={`${selectedBusinessForInquiry?.id ?? selectedEscapeForInquiry?.id ?? "general"}-${inquiryModalOpen}`}
        isOpen={inquiryModalOpen}
        onClose={() => {
          setInquiryModalOpen(false);
          setSelectedBusinessForInquiry(null);
          setSelectedEscapeForInquiry(null);
        }}
        selectedBusiness={selectedBusinessForInquiry}
        selectedEscape={selectedEscapeForInquiry}
      />
      <ListingDetailModal
        business={selectedBusinessForDetail}
        onClose={() => setSelectedBusinessForDetail(null)}
        onInquire={handleOpenPartnerInquiry}
      />

      {/* ESCAPE DETAIL MODAL — Day-by-Day Itinerary View */}
      <EscapeDetailModal
        escapePkg={selectedEscapeForDetail}
        isOpen={!!selectedEscapeForDetail}
        onClose={() => setSelectedEscapeForDetail(null)}
        onInquire={(escapePkg) => {
          setSelectedEscapeForDetail(null);
          setSelectedBusinessForInquiry(null);
          setSelectedEscapeForInquiry(escapePkg);
          setInquiryModalOpen(true);
        }}
      />

    </div>
    </>
  );
}
