"use client";

import React, { useState, useEffect } from "react";
import { trackEvent } from "../lib/trackEvent";
import FloatingNav from "../components/ui/floating-nav";
import { Header } from "../components/brand/Header";
import { Footer } from "../components/brand/Footer";
import { InquiryModal } from "../components/travel/InquiryModal";
import { ListingDetailModal } from "../components/travel/ListingDetailModal";
import { EscapeDetailModal } from "../components/travel/EscapeDetailModal";
import { Toaster } from "sonner";
import { 
  BUSINESS_LISTINGS, 
  BusinessListing,
  EscapePackage,
  ESCAPES_PACKAGES 
} from "../data/mockData";

// Editorial Design System Components
import { EditorialHero } from "../components/editorial/EditorialHero";
import { EditorialManifesto } from "../components/editorial/EditorialManifesto";
import { RegionalDestinationsMenu } from "../components/editorial/RegionalDestinationsMenu";
import { BespokeJourneyCta } from "../components/editorial/BespokeJourneyCta";
import { EditorialMosaic } from "../components/editorial/EditorialMosaic";
import EditorialComparison from "../components/editorial/EditorialComparison";
import EditorialPraise from "../components/editorial/EditorialPraise";
import EditorialFaq from "../components/editorial/EditorialFaq";
import EditorialGrandCta from "../components/editorial/EditorialGrandCta";

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

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="min-h-screen flex flex-col bg-[#080c10] text-[#f6f2ec] font-sans selection:bg-[#d6b78a] selection:text-[#080c10]">
        
        {/* Navigation Header */}
        <Header onOpenInquiryModal={handleOpenGeneralInquiry} />

        {/* Floating Dock */}
        <FloatingNav onOpenInquiry={handleOpenGeneralInquiry} />

        <main className="flex-1">
          {/* 1. Cinematic Hero */}
          <EditorialHero />

          {/* 2. Editorial Manifesto */}
          <EditorialManifesto />

          {/* 3. Regional Destinations & Escapes Explorer */}
          <RegionalDestinationsMenu
            escapes={ESCAPES_PACKAGES}
            onOpenEscapeModal={(pkg) => setSelectedEscapeForDetail(pkg)}
          />

          {/* 4. Bespoke Custom Journey CTA */}
          <BespokeJourneyCta />

          {/* 5. Editorial Visual Mosaic */}
          <EditorialMosaic />

          {/* 6. Comparison Section */}
          <EditorialComparison />

          {/* 7. Travellers Praise & Stories */}
          <EditorialPraise />

          {/* 8. Frequently Asked Questions */}
          <EditorialFaq />

          {/* 9. Grand Final CTA */}
          <EditorialGrandCta />
        </main>

        {/* Global Footer */}
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

        {/* LISTING DETAIL MODAL */}
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
