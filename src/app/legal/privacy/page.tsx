"use client";

import React from "react";
import { Header } from "../../../components/brand/Header";
import { Footer } from "../../../components/brand/Footer";
import { SlideUp } from "../../../components/animations/SlideUp";
import { trackEvent } from "../../../lib/trackEvent";

export default function PrivacyPolicy() {
  React.useEffect(() => {
    trackEvent("page_view", { page: "privacy_policy" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-cream text-slate-900 font-sans">
      <Header onOpenInquiryModal={() => {}} />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <SlideUp delay={0.1}>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
            <p className="text-slate-500 mt-2 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
          </SlideUp>

          <SlideUp delay={0.2}>
            <div className="prose prose-slate prose-a:text-gold hover:prose-a:text-accent prose-headings:text-navy max-w-none">
              <p>At SafarAtlas, we take your privacy seriously. This policy describes how we collect, use, and handle your personal information when you use our travel discovery platform and inquiry services.</p>
              
              <h3>Information We Collect</h3>
              <p>When you submit a travel inquiry, we collect your name, email address, WhatsApp number (if provided), and the details of your requested itinerary. We use this information exclusively to connect you with our verified local partners in Morocco.</p>

              <h3>How We Share Information</h3>
              <p>Your inquiry details are shared <strong>only</strong> with the specific local partners you select or those matched to your general inquiry. We do not sell your data to third-party marketers or data brokers.</p>

              <h3>Analytics</h3>
              <p>We use minimal, privacy-focused analytics to understand how travelers use our site (like which destinations are popular) so we can improve our service. This data is aggregated and does not personally identify you.</p>
              
              <h3>Your Rights</h3>
              <p>You may request to view, correct, or delete your personal information at any time by contacting our support team at <a href="mailto:privacy@safaratlas.com">privacy@safaratlas.com</a>.</p>
            </div>
          </SlideUp>
        </div>
      </main>

      <Footer />
    </div>
  );
}
