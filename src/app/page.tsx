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


        {/* HOW IT WORKS FOR TRAVELERS */}
        <section className="py-20 bg-white border-t border-[#e5dacb]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#c95e3d]">
                Simple & Transparent
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#121a17] tracking-tight mt-1">
                How SafarAtlas Works
              </h2>
            </div>

            <StaggerContainer className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting line — desktop only */}
              <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#e5dacb] via-[#c95e3d]/30 to-[#e5dacb] pointer-events-none" aria-hidden="true" />

              <StaggerItem className="p-8 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] hover:border-[#c95e3d]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4 relative">
                <div className="w-12 h-12 rounded-2xl bg-[#c95e3d]/10 flex items-center justify-center mb-1">
                  <svg className="w-6 h-6 text-[#c95e3d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-widest text-[#c95e3d]">01</span>
                <h3 className="text-xl font-serif font-bold text-[#121a17]">Discover & Save</h3>
                <p className="text-xs text-[#4e5e57] leading-relaxed">
                  Browse authentic destinations, secret medina spots, and verified host offerings across Morocco.
                </p>
              </StaggerItem>

              <StaggerItem className="p-8 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] hover:border-[#c95e3d]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4 relative">
                <div className="w-12 h-12 rounded-2xl bg-[#c95e3d]/10 flex items-center justify-center mb-1">
                  <svg className="w-6 h-6 text-[#c95e3d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-widest text-[#c95e3d]">02</span>
                <h3 className="text-xl font-serif font-bold text-[#121a17]">Submit Your Vision</h3>
                <p className="text-xs text-[#4e5e57] leading-relaxed">
                  Specify your travel dates, group size, and preferences. We take your input and design a flawless custom itinerary tailored to you.
                </p>
              </StaggerItem>

              <StaggerItem className="p-8 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] hover:border-[#c95e3d]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4 relative">
                <div className="w-12 h-12 rounded-2xl bg-[#c95e3d]/10 flex items-center justify-center mb-1">
                  <svg className="w-6 h-6 text-[#c95e3d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-widest text-[#c95e3d]">03</span>
                <h3 className="text-xl font-serif font-bold text-[#121a17]">Approve Your Journey</h3>
                <p className="text-xs text-[#4e5e57] leading-relaxed">
                  Review your hand-crafted itinerary, confirm your dates, and let our local experts handle all the logistics and bookings seamlessly.
                </p>
              </StaggerItem>

            </StaggerContainer>

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
