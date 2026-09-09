"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { SiInstagram, SiTripadvisor, SiWhatsapp } from "react-icons/si";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f1715] text-white pt-16 pb-12 border-t border-white/10 zellige-pattern-dark relative overflow-hidden">
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
              <p>WhatsApp: <a href="https://wa.me/212698017323" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">+212 698 017 323</a></p>
            </div>

            {/* Social Media & Reviews */}
            <div className="pt-2 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#d6b78a] block">
                Follow & Reviews
              </span>
              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/safaratlas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow SafarAtlas on Instagram"
                  title="Follow us on Instagram @safaratlas"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#E4405F]/20 border border-white/10 hover:border-[#E4405F]/50 flex items-center justify-center text-white/75 hover:text-white transition-all group shadow-sm"
                >
                  <SiInstagram className="w-4 h-4 transition-transform group-hover:scale-115 text-[#f6f2ec] group-hover:text-[#E4405F]" />
                </a>

                {/* TripAdvisor */}
                <a
                  href="https://www.tripadvisor.com/Attraction_Review-g293734-d34660267-Reviews-Safaratlas-Marrakech_Marrakech_Safi.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Review SafarAtlas on TripAdvisor"
                  title="Read reviews on TripAdvisor"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#34E0A1]/20 border border-white/10 hover:border-[#34E0A1]/50 flex items-center justify-center text-white/75 hover:text-white transition-all group shadow-sm"
                >
                  <SiTripadvisor className="w-5 h-5 transition-transform group-hover:scale-115 text-[#f6f2ec] group-hover:text-[#34E0A1]" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/212698017323"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with SafarAtlas on WhatsApp"
                  title="Message us on WhatsApp"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/50 flex items-center justify-center text-white/75 hover:text-white transition-all group shadow-sm"
                >
                  <SiWhatsapp className="w-4 h-4 transition-transform group-hover:scale-115 text-[#f6f2ec] group-hover:text-[#25D366]" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-accent font-semibold pt-1">
              <span>Crafted for authentic Moroccan travel</span>
            </div>
          </div>

          {/* Col 2: Top Destinations */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-3">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80 font-medium">
              <li><Link href="/#destinations" className="hover:text-gold transition-colors">Marrakech</Link></li>
              <li><Link href="/agafay" className="hover:text-gold transition-colors">Agafay Desert</Link></li>
              <li><Link href="/taghazout" className="hover:text-gold transition-colors">Taghazout Escapes</Link></li>
              <li><Link href="/#destinations" className="hover:text-gold transition-colors">Sahara Desert</Link></li>
              <li><Link href="/#destinations" className="hover:text-gold transition-colors">Atlas Mountains</Link></li>
              <li><Link href="/#destinations" className="hover:text-gold transition-colors">Essaouira</Link></li>
            </ul>
          </div>

          {/* Col 3: Experiences */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-3">
              Plan
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80 font-medium">
              <li><Link href="/#itineraries" className="hover:text-gold transition-colors">7-Day Sahara Dunes Odyssey</Link></li>
              <li><Link href="/#itineraries" className="hover:text-gold transition-colors">5-Day Atlantic Surf & Coast</Link></li>
              <li><Link href="/#escapes" className="hover:text-gold transition-colors">Add an Experience</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-gold transition-colors">How SafarAtlas Works</Link></li>
              <li><Link href="/journey" className="hover:text-gold transition-colors">Plan My Morocco Trip</Link></li>
            </ul>
          </div>

          {/* Col 4: Journey CTA */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <h5 className="text-lg font-bold text-white">Ready to explore Morocco?</h5>
            <p className="text-sm text-white/70 leading-relaxed">
              Tell us your vision and our local team will craft a fully managed, personalised itinerary just for you.
            </p>
            <Link
              href="/journey"
              className="inline-block w-full text-center py-2.5 rounded-xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Plan My Morocco Trip →
            </Link>

            <div className="pt-2 flex items-center justify-center gap-4 text-xs text-white/60">
              <a
                href="https://www.tripadvisor.com/Attraction_Review-g293734-d34660267-Reviews-Safaratlas-Marrakech_Marrakech_Safi.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#34E0A1] transition-colors font-medium"
              >
                <SiTripadvisor className="w-4 h-4 text-[#34E0A1]" />
                <span>TripAdvisor</span>
              </a>
              <span>•</span>
              <a
                href="https://www.instagram.com/safaratlas/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#E4405F] transition-colors font-medium"
              >
                <SiInstagram className="w-3.5 h-3.5 text-[#E4405F]" />
                <span>@safaratlas</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} SafarAtlas Tourism Technology. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 font-semibold">
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
