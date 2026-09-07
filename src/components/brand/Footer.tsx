"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f1715] text-white pt-16 pb-12 border-t border-navy/40 zellige-pattern relative overflow-hidden">
      {/* Gradient Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1715] via-[#0f1715]/90 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <Logo variant="light" size="md" showTagline={true} />
            <p className="text-sm text-white/70 leading-relaxed">
              Morocco&apos;s premium managed journey service. Our local experts design, book, and orchestrate flawless Moroccan experiences from start to finish.
            </p>
            <div className="space-y-1.5 text-sm text-white/80 font-medium">
              <p>Email: <a href="mailto:contactsafaratlas@gmail.com" className="text-gold hover:underline">contactsafaratlas@gmail.com</a></p>
              <p>WhatsApp: <a href="https://wa.me/212698017323" className="text-gold hover:underline">+212 698 017 323</a></p>
            </div>
            <div className="flex items-center gap-2 text-sm text-accent font-bold pt-2">
              <span>Crafted for authentic Moroccan travel</span>
            </div>
          </div>

          {/* Col 2: Top Destinations */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-3">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80 font-medium">
              <li><a href="#destinations" className="hover:text-gold transition-colors">Marrakech</a></li>
              <li><a href="#destinations" className="hover:text-gold transition-colors">Agafay</a></li>
              <li><a href="#destinations" className="hover:text-gold transition-colors">Sahara</a></li>
              <li><a href="#destinations" className="hover:text-gold transition-colors">Atlas Mountains</a></li>
              <li><a href="#destinations" className="hover:text-gold transition-colors">Essaouira</a></li>
            </ul>
          </div>

          {/* Col 3: Experiences */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-3">
              Plan
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80 font-medium">
              <li><a href="#itineraries" className="hover:text-gold transition-colors">7-Day Sahara Dunes Odyssey</a></li>
              <li><a href="#itineraries" className="hover:text-gold transition-colors">5-Day Atlantic Surf & Coast</a></li>
              <li><a href="#escapes" className="hover:text-gold transition-colors">Add an Experience</a></li>
              <li><a href="#how-it-works" className="hover:text-gold transition-colors">How SafarAtlas Works</a></li>
              <li><a href="/journey" className="hover:text-gold transition-colors">Plan My Morocco Trip</a></li>
            </ul>
          </div>

          {/* Col 4: Journey CTA */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <h5 className="text-lg font-bold text-white">Ready to explore Morocco?</h5>
            <p className="text-sm text-white/70 leading-relaxed">
              Tell us your vision and our local team will craft a fully managed, personalised itinerary just for you.
            </p>
            <button
              type="button"
              onClick={() => document.getElementById('hero-cta')?.click()}
              className="inline-block w-full text-center py-2.5 rounded-xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Plan My Morocco Trip →
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} SafarAtlas Tourism Technology. All rights reserved.</p>
          <div className="flex items-center gap-4 font-semibold">
            <span className="text-white/70">Fully Managed Journey Guarantee</span>
            <span>•</span>
            <Link href="/legal/privacy" className="hover:text-white">Privacy</Link>
            <span>•</span>
            <Link href="/legal/terms" className="hover:text-white">Terms</Link>
            <span>•</span>
            <Link href="/blog" className="hover:text-white">Journal / Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
