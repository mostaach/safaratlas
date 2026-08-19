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
        <section className="py-20 bg-[#123b34] text-white border-t border-[#2a5b50]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#f4c36b] bg-[#121a17] px-3.5 py-1 rounded-full border border-[#f4c36b]/30">
                Interactive Journey Engine
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">
                Build Your Morocco Journey
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Combine destinations and Escapes into one personalized Morocco trip.
              </p>
            </div>

            {/* Example Journey Timeline */}
            <div className="max-w-3xl mx-auto bg-[#121a17] p-6 sm:p-8 rounded-3xl border border-[#2a5b50] shadow-2xl text-left space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#f4c36b]">Example 10-Day Journey</span>
                <span className="text-xs font-bold text-white/70">Marrakech ➔ Sahara ➔ Taghazout ➔ Essaouira</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[#f4c36b] font-bold block">Marrakech</span>
                  <span className="text-[10px] text-white/60">2 Nights</span>
                </div>
                <div className="p-3 rounded-xl bg-[#c95e3d]/20 border border-[#c95e3d]/40">
                  <span className="text-white font-bold block">3-Day Sahara Escape</span>
                  <span className="text-[10px] text-[#f4c36b]">Desert & Glamping</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[#f4c36b] font-bold block">Marrakech</span>
                  <span className="text-[10px] text-white/60">1 Night Transit</span>
                </div>
                <div className="p-3 rounded-xl bg-[#059669]/20 border border-[#059669]/40">
                  <span className="text-white font-bold block">Taghazout Escape</span>
                  <span className="text-[10px] text-[#a7f3d0]">Coast & Surf</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[#f4c36b] font-bold block">Essaouira</span>
                  <span className="text-[10px] text-white/60">2 Nights</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-white/70">
                  SafarAtlas handles transport, private drivers, riad reservations, and activities.
                </p>
                <a
                  href="/journey"
                  className="px-8 py-3.5 rounded-xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-xs font-black tracking-widest shadow-lg transition-all transform hover:scale-105 shrink-0"
                >
                  Build My Journey →
                </a>
              </div>
            </div>
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
