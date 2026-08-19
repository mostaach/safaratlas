"use client";

import React from "react";
import { Logo } from "./Logo";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f1715] text-white pt-16 pb-12 border-t border-navy/40 zellige-pattern relative overflow-hidden">
      {/* Gradient Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1715] via-[#0f1715]/90 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <Logo variant="light" size="md" showTagline={true} />
            <p className="text-xs text-white/70 leading-relaxed">
              Morocco&apos;s curated travel discovery platform. Connecting independent travelers directly with verified local riads, desert camps, surf stays, and craft guides.
            </p>
            <div className="space-y-1 text-xs text-white/80 font-medium">
              <p>Email: <a href="mailto:contactsafaratlas@gmail.com" className="text-gold hover:underline">contactsafaratlas@gmail.com</a></p>
              <p>WhatsApp: <a href="https://wa.me/212698017323" className="text-gold hover:underline">+212 698 017 323</a></p>
            </div>
            <div className="flex items-center gap-2 text-xs text-accent font-bold pt-2">
              <span>🇲🇦 Crafted for authentic Moroccan travel</span>
            </div>
          </div>

          {/* Col 2: Top Destinations */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-3">
              Moroccan Regions
            </h4>
            <ul className="space-y-2 text-xs text-white/80 font-medium">
              <li><a href="#destinations" className="hover:text-gold transition-colors">Marrakech Medina & Palaces</a></li>
              <li><a href="#destinations" className="hover:text-gold transition-colors">Merzouga & Erg Chebbi Dunes</a></li>
              <li><a href="#destinations" className="hover:text-gold transition-colors">Taghazout Surf & Coast</a></li>
              <li><a href="#destinations" className="hover:text-gold transition-colors">Chefchaouen Blue City</a></li>
              <li><a href="#destinations" className="hover:text-gold transition-colors">Fes Ancient Heritage</a></li>
            </ul>
          </div>

          {/* Col 3: Experiences */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-3">
              Curated Experiences
            </h4>
            <ul className="space-y-2 text-xs text-white/80 font-medium">
              <li><a href="#itineraries" className="hover:text-gold transition-colors">7-Day Sahara Dunes Odyssey</a></li>
              <li><a href="#itineraries" className="hover:text-gold transition-colors">5-Day Atlantic Surf & Coast</a></li>
              <li><a href="#verified-partners" className="hover:text-gold transition-colors">Boutique Riad Stays</a></li>
              <li><a href="#verified-partners" className="hover:text-gold transition-colors">Culinary & Tagine Masterclasses</a></li>
            </ul>
          </div>

          {/* Col 4: For Businesses & Lead Network */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <span className="text-[10px] font-black uppercase text-[#059669] bg-[#ecfdf5] text-[#059669] px-2.5 py-0.5 rounded-full inline-block">
              For Moroccan Tourism Hosts
            </span>
            <h5 className="text-sm font-bold text-white">Are you a verified local business?</h5>
            <p className="text-[11px] text-white/70 leading-relaxed">
              Receive direct traveler inquiries without OTA commission cuts. Join the SafarAtlas partner index.
            </p>
            <a 
              href="#for-businesses" 
              className="inline-block w-full text-center py-2.5 rounded-xl bg-gold hover:bg-gold-dark text-white text-xs font-bold transition-all shadow-md"
            >
              List Your Business
            </a>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} SafarAtlas Tourism Technology. All rights reserved.</p>
          <div className="flex items-center gap-4 font-semibold">
            <span className="text-white/70">Verified Lead Intermediary Guarantee</span>
            <span>•</span>
            <a href="/legal/privacy" className="hover:text-white">Privacy</a>
            <span>•</span>
            <a href="/legal/terms" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
