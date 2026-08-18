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
import { ListingsCarousel } from "../components/travel/ListingsCarousel";
import { FadeIn } from "../components/animations/FadeIn";
import { SlideUp } from "../components/animations/SlideUp";
import { StaggerContainer, StaggerItem } from "../components/animations/StaggerContainer";
import { TestimonialsStrip } from "../components/travel/TestimonialsStrip";
import { Toaster, toast } from "sonner";
import { 
  DESTINATIONS, 
  BUSINESS_LISTINGS, 
  ITINERARIES, 
  BusinessListing 
} from "../data/mockData";

export default function Home() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedBusinessForInquiry, setSelectedBusinessForInquiry] = useState<BusinessListing | null>(null);
  const [selectedBusinessForDetail, setSelectedBusinessForDetail] = useState<BusinessListing | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Morocco");

  useEffect(() => {
    trackEvent("page_view", { source: document.referrer || "direct" });
  }, []);

  const handleOpenGeneralInquiry = () => {
    setSelectedBusinessForInquiry(null);
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

  const handleSearch = (query: string, region: string) => {
    setSearchQuery(query);
    setSelectedRegion(region);
  };

  const clearDiscoveryFilters = () => {
    setSearchQuery("");
    setSelectedRegion("All Morocco");
    setActiveCategoryFilter("All");
  };

  // Filter listings based on category pill selection
  const categoryMap: Record<string, BusinessListing["category"] | undefined> = {
    "Riads & Stays": "Riad & Stay",
    "Sahara Camps": "Desert Expeditions",
    "Surf & Coast": "Surf & Ocean",
    "Artisan Crafts": "Cultural & Crafts",
    "Tagine & Food": "Food & Culinary",
  };

  const normalizedQuery = searchQuery.toLowerCase();
  const filteredListings = BUSINESS_LISTINGS.filter((business) => {
    const hasCategory = !categoryMap[activeCategoryFilter] || business.category === categoryMap[activeCategoryFilter];
    const hasRegion = selectedRegion === "All Morocco" || business.location.includes(selectedRegion) || business.region.includes(selectedRegion);
    const searchableText = `${business.name} ${business.category} ${business.location} ${business.region} ${business.shortDesc} ${business.amenities.join(" ")}`.toLowerCase();
    const hasQuery = !normalizedQuery || searchableText.includes(normalizedQuery);

    return hasCategory && hasRegion && hasQuery;
  });

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
          onSearch={handleSearch}
          onSelectCategory={(cat) => setActiveCategoryFilter(cat)}
          onOpenInquiry={(bizId) => handleInquireById(bizId || "biz-1")}
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


        {/* VERIFIED BUSINESS LISTINGS SECTION */}
        <section id="verified-partners" className="py-20 pb-32 bg-[#f2e9dc] border-t border-[#e5dacb]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#059669] text-xs font-bold border border-[#a7f3d0]">
                    ✓ Safar Verified Index
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#121a17] tracking-tight">
                  Verified Local Tourism Partners
                </h2>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {["All", "Riads & Stays", "Sahara Camps", "Surf & Coast", "Artisan Crafts", "Tagine & Food"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoryFilter(cat)}
                    className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c95e3d] ${
                      activeCategoryFilter === cat
                        ? "bg-[#123b34] text-white shadow-sm"
                        : "bg-white text-[#4e5e57] border border-[#e5dacb] hover:bg-[#faf6f0]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Listings Grid */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#4e5e57]">
                <p>
                  Showing <strong className="text-[#121a17]">{filteredListings.length}</strong> verified local {filteredListings.length === 1 ? "option" : "options"}
                  {selectedRegion !== "All Morocco" ? ` in ${selectedRegion}` : ""}
                  {searchQuery ? ` for “${searchQuery}”` : ""}.
                </p>
                {(searchQuery || selectedRegion !== "All Morocco" || activeCategoryFilter !== "All") && (
                  <button onClick={clearDiscoveryFilters} className="font-bold text-[#123b34] hover:text-[#c95e3d]">
                    Clear filters
                  </button>
                )}
              </div>

              {filteredListings.length > 0 ? (
                <ListingsCarousel
                  listings={filteredListings}
                  onInquire={handleOpenPartnerInquiry}
                />
              ) : (
                <div className="rounded-3xl border border-dashed border-[#e5dacb] bg-white/70 p-10 text-center">
                  <h3 className="text-lg font-serif font-black text-[#121a17]">No exact match found</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-[#4e5e57]">Try a broader destination or category. You can also send one inquiry and we will match it with a relevant verified partner.</p>
                  <button onClick={handleOpenGeneralInquiry} className="mt-5 rounded-xl bg-[#123b34] px-5 py-3 text-xs font-bold text-white hover:bg-[#121a17]">
                    Ask for a recommendation
                  </button>
                </div>
              )}

              {/* Honest early-access panel */}
              <div className="rounded-3xl border border-dashed border-[#e5dacb] bg-white/60 p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="w-14 h-14 rounded-2xl bg-[#f2e9dc] flex items-center justify-center text-2xl shrink-0">
                  🏗️
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-[#c95e3d]">Pilot Network — Growing</p>
                  <h3 className="text-lg font-serif font-bold text-[#121a17]">
                    More verified partners are being onboarded
                  </h3>
                  <p className="text-sm text-[#4e5e57]">
                    We&apos;re manually verifying riads, desert camps, surf houses, guides and culinary experiences across Morocco. Partners go live as they complete verification.
                  </p>
                </div>
                <a href="/partners" className="shrink-0 px-6 py-3 rounded-xl bg-[#123b34] text-[#f4c36b] text-xs font-black hover:bg-[#121a17] transition-all whitespace-nowrap">
                  List your business →
                </a>
              </div>

            </div>

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

            <StaggerContainer className="grid md:grid-cols-4 gap-8 relative">
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
                <h3 className="text-xl font-serif font-bold text-[#121a17]">Submit One Inquiry</h3>
                <p className="text-xs text-[#4e5e57] leading-relaxed">
                  Specify your travel dates, group size, and preferences. No upfront middleman booking commissions.
                </p>
              </StaggerItem>

              <StaggerItem className="p-8 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] hover:border-[#c95e3d]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4 relative">
                <div className="w-12 h-12 rounded-2xl bg-[#c95e3d]/10 flex items-center justify-center mb-1">
                  <svg className="w-6 h-6 text-[#c95e3d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-widest text-[#c95e3d]">03</span>
                <h3 className="text-xl font-serif font-bold text-[#121a17]">Manage with Hosts</h3>
                <p className="text-xs text-[#4e5e57] leading-relaxed">
                  Receive personalized quotes, confirm bookings, and manage your journey with trusted Moroccan partners.
                </p>
              </StaggerItem>

              <StaggerItem className="p-8 rounded-2xl bg-[#faf6f0] border border-[#e5dacb] hover:border-[#c95e3d]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4 relative">
                <div className="w-12 h-12 rounded-2xl bg-[#c95e3d]/10 flex items-center justify-center mb-1">
                  <svg className="w-6 h-6 text-[#c95e3d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-widest text-[#c95e3d]">04</span>
                <h3 className="text-xl font-serif font-bold text-[#121a17]">Become a Partner</h3>
                <p className="text-xs text-[#4e5e57] leading-relaxed">
                  Local operators can join our network, showcase their business, and receive high-intent direct inquiries.
                </p>
              </StaggerItem>
            </StaggerContainer>

          </div>
        </section>


        {/* TESTIMONIALS — Social Proof Section */}
        <TestimonialsStrip onInquire={handleOpenGeneralInquiry} />


        {/* FOR MOROCCAN BUSINESSES CTA BANNER */}
        <section id="for-businesses" className="py-20 bg-[#123b34] text-white relative overflow-hidden zellige-pattern-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-4">
              <span className="px-3.5 py-1.5 rounded-full bg-[#f4c36b] text-[#123b34] text-xs font-black uppercase tracking-wider">
                For Local Tourism Operators
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
                Put your Moroccan business in front of qualified global travelers.
              </h2>
              <p className="text-sm text-white/80 leading-relaxed max-w-xl">
                Join the SafarAtlas verified partner network. Showcase your riad, surf camp, desert tour, or culinary experience and receive high-intent inquiries delivered directly.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 space-y-6">
              <h3 className="text-xl font-serif font-bold text-white">Partner Listing Benefits</h3>
              <ul className="space-y-3 text-xs text-white/90 font-medium">
                {[
                  "100% Direct Inquiry delivery to your WhatsApp / Email",
                  "Verified Partner Badge & trusted presentation",
                  "Featured placement in region guides and atlas maps"
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#f4c36b] shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleOpenGeneralInquiry}
                className="w-full py-3.5 rounded-xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-xs font-black transition-all shadow-lg text-center block"
              >
                Request Partner Verification
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />

      {/* DIRECT INQUIRY LEAD MODAL */}
      <InquiryModal 
        key={`${selectedBusinessForInquiry?.id ?? "general"}-${inquiryModalOpen}`}
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        selectedBusiness={selectedBusinessForInquiry}
      />
      <ListingDetailModal
        business={selectedBusinessForDetail}
        onClose={() => setSelectedBusinessForDetail(null)}
        onInquire={handleOpenPartnerInquiry}
      />

    </div>
    </>
  );
}
