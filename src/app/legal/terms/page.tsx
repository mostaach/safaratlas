"use client";

import React from "react";
import { Header } from "../../../components/brand/Header";
import { Footer } from "../../../components/brand/Footer";
import { SlideUp } from "../../../components/animations/SlideUp";
import { trackEvent } from "../../../lib/trackEvent";

export default function TermsOfService() {
  React.useEffect(() => {
    trackEvent("page_view", { page: "terms_of_service" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#07192d] text-[#f6f2ec] font-sans">
      <Header variant="dark" onOpenInquiryModal={() => {}} />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <SlideUp delay={0.1}>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C4A258] block mb-2">
              Legal & Trust
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#f6f2ec] tracking-tight">Terms of Service</h1>
            <p className="text-[#f6f2ec]/60 mt-2 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
          </SlideUp>

          <SlideUp delay={0.2}>
            <div className="prose prose-invert prose-a:text-[#C4A258] hover:prose-a:text-[#d8bb78] prose-headings:text-[#f6f2ec] prose-headings:font-serif max-w-none text-[#f6f2ec]/80 leading-relaxed space-y-4">
              <p>Welcome to SafarAtlas. By accessing our website, you agree to be bound by these terms of service and all applicable laws.</p>
              
              <h3 className="text-xl font-bold text-[#f6f2ec] pt-4">1. Service Description</h3>
              <p>SafarAtlas is a discovery and managed travel platform. We connect travelers seeking authentic Moroccan experiences with verified local businesses, guides, and riads under curated itineraries.</p>

              <h3 className="text-xl font-bold text-[#f6f2ec] pt-4">2. Coordinated Bookings</h3>
              <p>When you submit an inquiry or journey request, our local team coordinates availability, private transport, and reservations directly with verified local partners in Morocco.</p>

              <h3 className="text-xl font-bold text-[#f6f2ec] pt-4">3. Verified Partner Promise</h3>
              <p>We rigorously vet our partners to ensure quality, safety, and authenticity. All private drivers and guides are licensed and insured under Moroccan tourism regulations.</p>

              <h3 className="text-xl font-bold text-[#f6f2ec] pt-4">4. User Conduct</h3>
              <p>You agree to submit only genuine inquiries with accurate contact information. Spamming, scraping, or misusing the platform will result in an immediate ban.</p>
              
              <h3 className="text-xl font-bold text-[#f6f2ec] pt-4">Contact</h3>
              <p>For questions about these terms, please contact us directly at <a href="mailto:contactsafaratlas@gmail.com" className="text-[#C4A258] underline">contactsafaratlas@gmail.com</a>.</p>
            </div>
          </SlideUp>
        </div>
      </main>

      <Footer />
    </div>
  );
}
