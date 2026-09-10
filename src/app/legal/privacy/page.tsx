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

              <h3 id="cookies" className="scroll-mt-28">Cookies & Tracking Technologies</h3>
              <p>Cookies are small text files stored on your device when you browse websites. We use cookies and browser storage responsibly to provide a seamless, secure experience:</p>
              
              <ul>
                <li><strong>Essential Cookies & Local Storage:</strong> Required for core website functions such as secure navigation, journey builder state preservation, and remembering your cookie consent choice. These cannot be disabled as the site cannot function properly without them.</li>
                <li><strong>Performance & Analytics Cookies (Google Analytics 4):</strong> With your consent, we use Google Analytics (measurement ID <code>G-RLJL1P7M43</code>) to understand aggregate traffic patterns, popular Moroccan itineraries, and site responsiveness. Google Analytics sets cookies such as <code>_ga</code> and <code>_ga_RLJL1P7M43</code>. These cookies do not store direct personally identifiable information.</li>
                <li><strong>No Advertising Trackers:</strong> SafarAtlas does not use third-party behavioral advertising cookies, cross-site ad networks, or data brokers.</li>
              </ul>

              <h4>Managing Your Cookie Preferences & Google Consent Mode</h4>
              <p>We implement <strong>Google Consent Mode v2</strong>. When you first visit SafarAtlas, non-essential analytics tracking is set to <code>denied</code> by default until you choose to grant consent.</p>
              <p>You can adjust or revoke your cookie choices at any time by clearing your browser cookies or storage for <code>safaratlas.com</code>, which will re-trigger the consent choice on your next visit.</p>

              <h3>Analytics</h3>
              <p>We use minimal, privacy-focused analytics to understand how travelers use our site (like which destinations are popular) so we can improve our service. This data is aggregated and does not personally identify you.</p>
              
              <h3>Your Rights & Data Protection (GDPR / CNDP)</h3>
              <p>In accordance with international privacy regulations (including EU/UK GDPR and Moroccan Law 09-08 relating to the protection of individuals with regard to personal data), you have the right to access, rectify, or request deletion of your personal data at any time.</p>
              <p>To exercise your rights or ask questions regarding our privacy practices, contact us directly at <a href="mailto:contactsafaratlas@gmail.com">contactsafaratlas@gmail.com</a>.</p>
            </div>
          </SlideUp>
        </div>
      </main>

      <Footer />
    </div>
  );
}
