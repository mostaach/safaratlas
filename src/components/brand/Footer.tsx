"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { SiInstagram, SiTripadvisor, SiWhatsapp } from "react-icons/si";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07192d] text-white pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Subtle gradient vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07192d] via-[#07192d]/95 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Col 1: Brand & Direct Contact */}
          <div className="md:col-span-4 space-y-5">
            <Logo variant="light" size="md" showTagline={true} />
            <p className="text-xs sm:text-sm text-[#f6f2ec]/70 font-light leading-relaxed max-w-sm">
              Morocco&apos;s premier boutique travel service. Our local experts design, coordinate, and orchestrate private desert expeditions, mountain escapes, and coastal retreats with vetted local partners.
            </p>
            <div className="space-y-1.5 text-xs text-[#f6f2ec]/80 font-light">
              <p>
                Direct WhatsApp:{" "}
                <a
                  href="https://wa.me/212698017323"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C4A258] hover:text-[#d8bb78] transition-colors"
                >
                  +212 698 017 323
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:contactsafaratlas@gmail.com"
                  className="text-[#C4A258] hover:text-[#d8bb78] transition-colors"
                >
                  contactsafaratlas@gmail.com
                </a>
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#C4A258] font-light pt-1">
              <span>✦ 100% Private Door-to-Door Service</span>
            </div>
          </div>

          {/* Col 2: Destinations */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C4A258] font-normal block">
              Destinations
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#f6f2ec]/70 font-light">
              <li>
                <Link href="/agafay" className="hover:text-[#C4A258] transition-colors">
                  Agafay Desert Retreat
                </Link>
              </li>
              <li>
                <Link href="/taghazout" className="hover:text-[#C4A258] transition-colors">
                  Taghazout Coastal Surf
                </Link>
              </li>
              <li>
                <Link href="/escapes/sahara-escape-3d" className="hover:text-[#C4A258] transition-colors">
                  Sahara Dunes (Merzouga)
                </Link>
              </li>
              <li>
                <Link href="/escapes/imlil-valley-high-atlas" className="hover:text-[#C4A258] transition-colors">
                  Atlas Mountains &amp; Imlil
                </Link>
              </li>
              <li>
                <Link href="/escapes/ouzoud-waterfalls-experience" className="hover:text-[#C4A258] transition-colors">
                  Ouzoud Cascades Day Escape
                </Link>
              </li>
              <li>
                <Link href="/escapes/essaouira-coastal-escape" className="hover:text-[#C4A258] transition-colors">
                  Essaouira Atlantic Port
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Plan & Travel Journal */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C4A258] font-normal block">
              Plan &amp; Journal
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#f6f2ec]/70 font-light">
              <li>
                <Link href="/journey" className="text-[#C4A258] hover:text-[#d8bb78] transition-colors">
                  Plan My Morocco Journey →
                </Link>
              </li>
              <li>
                <Link href="/#destinations" className="hover:text-[#C4A258] transition-colors">
                  Modular Escapes
                </Link>
              </li>
              <li>
                <Link href="/blog/agafay-vs-sahara-desert-guide" className="hover:text-[#C4A258] transition-colors">
                  Agafay vs. Sahara Guide
                </Link>
              </li>
              <li>
                <Link href="/blog/7-day-managed-morocco-itinerary-guide" className="hover:text-[#C4A258] transition-colors">
                  7-Day Managed Route
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#C4A258] transition-colors">
                  All Travel Guides &amp; Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Verified Channels */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C4A258] font-normal block">
              Trust &amp; Connect
            </span>
            <div className="space-y-3 text-xs text-[#f6f2ec]/70 font-light">
              <a
                href="https://www.tripadvisor.com/Attraction_Review-g293734-d34660267-Reviews-Safaratlas-Marrakech_Marrakech_Safi.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#34E0A1] transition-colors group"
              >
                <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#34E0A1]/40 group-hover:bg-[#34E0A1]/10 transition-colors shrink-0">
                  <SiTripadvisor className="w-4 h-4 text-[#34E0A1]" />
                </div>
                <span>TripAdvisor</span>
              </a>

              <a
                href="https://www.instagram.com/safaratlas/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#E4405F] transition-colors group"
              >
                <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#E4405F]/40 group-hover:bg-[#E4405F]/10 transition-colors shrink-0">
                  <SiInstagram className="w-3.5 h-3.5 text-[#E4405F]" />
                </div>
                <span>@safaratlas</span>
              </a>

              <a
                href="https://wa.me/212698017323"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#25D366] transition-colors group"
              >
                <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#25D366]/40 group-hover:bg-[#25D366]/10 transition-colors shrink-0">
                  <SiWhatsapp className="w-4 h-4 text-[#25D366]" />
                </div>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#f6f2ec]/50 font-light gap-4">
          <p>© {new Date().getFullYear()} SafarAtlas Tourism Technology. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-normal">
            <span className="text-[#f6f2ec]/70">Fully Managed Journey Guarantee</span>
            <span>•</span>
            <Link href="/legal/privacy" className="hover:text-[#C4A258] transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/legal/terms" className="hover:text-[#C4A258] transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/blog" className="hover:text-[#C4A258] transition-colors">Journal / Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
