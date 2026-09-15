"use client";

import React, { useState, useEffect } from "react";
import { trackEvent } from "../lib/trackEvent";
import { Header } from "../components/brand/Header";
import { InquiryModal } from "../components/travel/InquiryModal";
import { ListingDetailModal } from "../components/travel/ListingDetailModal";
import { EscapeDetailModal } from "../components/travel/EscapeDetailModal";
import { Toaster } from "sonner";
import {
  BUSINESS_LISTINGS,
  BusinessListing,
  EscapePackage,
  ESCAPES_PACKAGES,
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
  const [selectedBusinessForInquiry, setSelectedBusinessForInquiry] =
    useState<BusinessListing | null>(null);
  const [selectedEscapeForInquiry, setSelectedEscapeForInquiry] =
    useState<EscapePackage | null>(null);
  const [selectedEscapeForDetail, setSelectedEscapeForDetail] =
    useState<EscapePackage | null>(null);
  const [selectedBusinessForDetail, setSelectedBusinessForDetail] =
    useState<BusinessListing | null>(null);

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
      <div
        className="min-h-screen flex flex-col bg-[#07192d] text-[#f6f2ec]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {/* Editorial Navigation Header */}
        <Header onOpenInquiryModal={handleOpenGeneralInquiry} />

        <main className="flex-1">
          {/* 1 · Cinematic Hero */}
          <EditorialHero />

          {/* 2 · Editorial Manifesto / brand statement */}
          <EditorialManifesto />

          {/* 3 · Regional Destinations & Escapes Explorer */}
          <RegionalDestinationsMenu
            escapes={ESCAPES_PACKAGES}
            onOpenEscapeModal={(pkg) => setSelectedEscapeForDetail(pkg)}
          />

          {/* 4 · Bespoke Custom Journey CTA */}
          <BespokeJourneyCta />

          {/* 5 · Editorial Visual Mosaic */}
          <EditorialMosaic />

          {/* 6 · Comparison — SafarAtlas vs DIY */}
          <EditorialComparison />

          {/* 7 · Travellers Praise */}
          <EditorialPraise />

          {/* 8 · FAQ */}
          <EditorialFaq />

          {/* 9 · Grand Final CTA + copyright footer */}
          <EditorialGrandCta />

          {/* Mobile Sticky Action Bar */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07192d]/95 backdrop-blur-xl border-t border-[#C4A258]/20 px-4 py-3 flex items-center justify-between shadow-2xl">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#C4A258] uppercase tracking-wider">SafarAtlas Concierge</span>
              <span className="text-[10px] text-[#f6f2ec]/70">100% Private · Managed Routes</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/212698017323?text=Hi%20SafarAtlas!%20I'm%20planning%20a%20trip%20to%20Morocco%20and%20would%20like%20to%20chat%20about%20an%20itinerary."
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
                aria-label="WhatsApp Concierge"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
              <a
                href="/journey"
                className="px-4 py-2.5 rounded-xl bg-[#C4A258] text-[#07192d] text-xs font-black uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center gap-1"
              >
                <span>Plan Journey</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </main>

        {/* Lead capture modals */}
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
