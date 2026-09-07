"use client";

import React, { useState, useEffect } from "react";
import { trackEvent } from "../lib/trackEvent";
import FloatingNav from "../components/ui/floating-nav";
import { Header } from "../components/brand/Header";
import { Footer } from "../components/brand/Footer";
import { HeroSection } from "../components/travel/HeroSection";
import { DestinationSliceCarousel } from "../components/travel/DestinationSliceCarousel";
import { InteractiveMap } from "../components/travel/InteractiveMap";
import { InquiryModal } from "../components/travel/InquiryModal";
import { ListingDetailModal } from "../components/travel/ListingDetailModal";

import { StaggerContainer, StaggerItem } from "../components/animations/StaggerContainer";
import { TestimonialsStrip } from "../components/travel/TestimonialsStrip";
import { EscapesSection } from "../components/travel/EscapesSection";
import { EscapeDetailModal } from "../components/travel/EscapeDetailModal";
import { CuratedJourneySection } from "../components/travel/CuratedJourneySection";
import { Toaster } from "sonner";
import { 
  DESTINATIONS, 
  BUSINESS_LISTINGS, 
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

        {/* SECTION 1: MOROCCO JOURNEY — IMPECCABLE COORDINATED ROUTE */}
        <CuratedJourneySection onOpenInquiry={handleOpenGeneralInquiry} />

        {/* SECTION 2: ESCAPES — HORIZONTAL PARALLAX CAROUSEL */}
        <EscapesSection
          onInquireEscape={(escapePkg) => {
            setSelectedBusinessForInquiry(null);
            setSelectedEscapeForInquiry(escapePkg);
            setInquiryModalOpen(true);
          }}
          onSelectEscapeDetail={(escapePkg) => setSelectedEscapeForDetail(escapePkg)}
        />

        {/* SECTION 3: REGION DESTINATIONS SHOWCASE — Focus Slice Carousel */}
        <section id="destinations" className="py-16 lg:py-20 bg-[#f2e9dc] border-y border-[#e5dacb]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-4xl sm:text-5xl font-serif font-black text-[#121a17] tracking-tight">
                  Made for the way you travel
                </h2>
              </div>
              <p className="text-sm font-medium text-[#4e5e57] max-w-md leading-relaxed">
                Medina courtyards, ocean cliffs, mountain villages and Sahara dunes, arranged around the kind of trip you actually want.
              </p>
            </div>

            {/* Focus Slice Carousel */}
            <DestinationSliceCarousel
              destinations={DESTINATIONS}
              onSelect={() => handleOpenGeneralInquiry()}
            />

          </div>
        </section>

        {/* SECTION 4: INTERACTIVE ATLAS MAP SECTION */}
        <section id="map-explorer" className="py-16 lg:py-20 bg-[#121a17]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <InteractiveMap 
              onOpenInquiry={handleOpenGeneralInquiry}
            />
          </div>
        </section>

        {/* SECTION 5: HOW SAFARATLAS MANAGES YOUR JOURNEY */}
        <section id="how-it-works" className="py-16 lg:py-20 bg-white border-t border-[#e5dacb]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-9">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-4xl sm:text-5xl font-serif font-black text-[#121a17] tracking-tight">
                Discover. Plan. Coordinate. Travel.
              </h2>
              <p className="text-base text-[#4e5e57] leading-relaxed">
                You choose the direction. SafarAtlas turns the moving pieces into one managed route.
              </p>
            </div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
              <StaggerItem className="p-6 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] space-y-3">
                <span className="text-sm font-black tracking-widest text-[#c95e3d] block">Discover</span>
                <h3 className="text-base font-bold text-[#121a17]">Choose destinations</h3>
                <p className="text-sm text-[#4e5e57] leading-relaxed">
                  Browse curated destinations and modular 1–3 day Escapes across Morocco.
                </p>
              </StaggerItem>

              <StaggerItem className="p-6 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] space-y-3">
                <span className="text-sm font-black tracking-widest text-[#c95e3d] block">Plan</span>
                <h3 className="text-base font-bold text-[#121a17]">Shape the route</h3>
                <p className="text-sm text-[#4e5e57] leading-relaxed">
                  Add Escapes to your timeline, set your travel dates and group preferences.
                </p>
              </StaggerItem>

              <StaggerItem className="p-7 rounded-2xl bg-[#123b34] text-white border border-[#2a5b50] space-y-3 shadow-[0_24px_55px_-32px_rgba(18,59,52,0.8)] lg:-translate-y-3">
                <span className="text-sm font-black tracking-widest text-[#f4c36b] block">Coordinate</span>
                <h3 className="text-lg font-bold text-white">We connect the partners</h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  We check availability with verified drivers, desert camps, and riads.
                </p>
              </StaggerItem>

              <StaggerItem className="p-6 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] space-y-3">
                <span className="text-sm font-black tracking-widest text-[#c95e3d] block">Confirm</span>
                <h3 className="text-base font-bold text-[#121a17]">One clear quote</h3>
                <p className="text-sm text-[#4e5e57] leading-relaxed">
                  Receive one clear price and one coordinated itinerary under one contact.
                </p>
              </StaggerItem>

              <StaggerItem className="p-6 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] space-y-3">
                <span className="text-sm font-black tracking-widest text-[#c95e3d] block">Travel</span>
                <h3 className="text-base font-bold text-[#121a17]">Support on the ground</h3>
                <p className="text-sm text-[#4e5e57] leading-relaxed">
                  Enjoy Morocco with 24/7 dedicated SafarAtlas local concierge support.
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
