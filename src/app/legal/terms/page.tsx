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
    <div className="min-h-screen flex flex-col bg-cream text-slate-900 font-sans">
      <Header onOpenInquiryModal={() => {}} />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <SlideUp delay={0.1}>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Terms of Service</h1>
            <p className="text-slate-500 mt-2 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
          </SlideUp>

          <SlideUp delay={0.2}>
            <div className="prose prose-slate prose-a:text-gold hover:prose-a:text-accent prose-headings:text-navy max-w-none">
              <p>Welcome to SafarAtlas. By accessing our website, you agree to be bound by these terms of service and all applicable laws.</p>
              
              <h3>1. Service Description</h3>
              <p>SafarAtlas is a discovery and lead-generation platform. We connect travelers seeking authentic Moroccan experiences with verified local businesses, guides, and riads. We are <strong>not</strong> a travel agency, nor are we the merchant of record for any bookings.</p>

              <h3>2. Direct Bookings</h3>
              <p>When you submit an inquiry, we forward your details directly to the local partner. All quotes, payments, cancellations, and service delivery are handled strictly between you (the traveler) and the verified partner.</p>

              <h3>3. Verified Partner Promise</h3>
              <p>While we rigorously vet our partners to ensure quality and authenticity, SafarAtlas is not liable for service interruptions, disputes, or issues that arise during your travel. However, we maintain strict quality standards, and partners who violate our trust guidelines will be removed from the platform.</p>

              <h3>4. User Conduct</h3>
              <p>You agree to submit only genuine inquiries with accurate contact information. Spamming, scraping, or misusing the platform will result in an immediate ban.</p>
              
              <h3>Contact</h3>
              <p>For questions about these terms, please contact <a href="mailto:legal@safaratlas.com">legal@safaratlas.com</a>.</p>
            </div>
          </SlideUp>
        </div>
      </main>

      <Footer />
    </div>
  );
}
