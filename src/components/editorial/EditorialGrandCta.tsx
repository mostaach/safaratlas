"use client";

import React from "react";
import Link from "next/link";
import { SiWhatsapp, SiInstagram, SiTripadvisor } from "react-icons/si";

export default function EditorialGrandCta() {
  const whatsappUrl = `https://wa.me/212698017323?text=${encodeURIComponent(
    "Hello SafarAtlas, I am planning a journey to Morocco and would like to craft a private bespoke itinerary."
  )}`;

  return (
    <section
      id="availability"
      className="relative w-full overflow-hidden bg-[#07192d] pt-28 md:pt-40 border-t border-[#C4A258]/15"
    >
      <div className="container-editorial">
        {/* Availability / Inquiry Section */}
        <div className="grid grid-cols-12 gap-x-8 gap-y-16">

          {/* Left header */}
          <header className="col-span-12 md:col-span-5">
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[#C4A258]">
              <span className="h-px w-8 bg-[#C4A258]" />
              Direct Communication
            </p>
            <h2
              className="mt-8 font-serif font-medium leading-[1.02] tracking-tight text-[#f6f2ec] text-balance"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
            >
              Start your journey{" "}
              <span className="italic text-[#f6f2ec]/70">
                with one conversation.
              </span>
            </h2>
            <p className="mt-8 max-w-sm font-sans text-base font-light leading-relaxed text-[#f6f2ec]/55">
              Speak directly with our local concierge in Morocco. No endless
              online search, no generic packages.
            </p>
          </header>

          {/* Right CTA panel */}
          <div className="col-span-12 md:col-span-7">
            <div className="border-y border-[#C4A258]/20 py-10 md:py-12">
              <p className="font-serif text-2xl font-medium leading-tight text-[#f6f2ec] md:text-3xl md:text-4xl">
                Tell us your dates, rhythm and party size.
              </p>
              <p className="mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-[#f6f2ec]/70">
                Whether you want 48 hours under Agafay stars, a surf retreat in
                Taghazout, or a comprehensive 10-day cross-country expedition —
                we prepare your proposal within hours.
              </p>

              {/* CTAs — refined editorial button styling matching Taghazout */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3.5">
                <Link
                  href="/journey"
                  className="group inline-flex items-center justify-center gap-2.5 bg-[#C4A258] px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-[#07192d] font-normal transition-all duration-300 hover:bg-[#d8bb78] hover:tracking-[0.22em] whitespace-nowrap shrink-0"
                  style={{ boxShadow: "var(--shadow-gold)" }}
                >
                  <span className="font-normal">Plan Your Morocco Journey</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 font-light">→</span>
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 border border-[#f6f2ec]/20 px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-[#f6f2ec] font-normal transition-all duration-300 hover:border-[#C4A258] hover:text-[#C4A258] whitespace-nowrap shrink-0"
                >
                  <SiWhatsapp className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.2em] text-[#f6f2ec]/35 font-light">
                Direct WhatsApp Concierge · Response within 2 hours
              </p>
            </div>
          </div>

        </div>

        {/* ── Editorial Business & Discovery Footer ── */}
        <div className="mt-28 pt-16 border-t border-[#f6f2ec]/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 text-[#f6f2ec]">

            {/* Col 1: Brand & Identity */}
            <div className="md:col-span-4 space-y-5">
              <div className="flex items-center gap-3">
                <img
                  src="/logo/safar-atlas-logo.svg"
                  alt="SafarAtlas Logo"
                  className="w-8 h-8 object-contain"
                />
                <span className="font-serif tracking-tight text-xl font-bold text-[#f6f2ec]">
                  Safar<span className="text-[#C4A258] font-sans font-extrabold">Atlas</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm font-light leading-relaxed text-[#f6f2ec]/60 max-w-sm">
                Morocco&apos;s premier boutique tour operator. We design, coordinate, and orchestrate private journeys, scenic desert camps, and high-mountain retreats with vetted local partners.
              </p>
              <div className="pt-1 flex items-center gap-4 text-xs font-mono text-[#C4A258]/80">
                <span>Direct WhatsApp: +212 698 017 323</span>
              </div>
            </div>

            {/* Col 2: Escapes & Destinations */}
            <div className="md:col-span-3 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C4A258] font-semibold block">
                Signature Escapes
              </span>
              <ul className="space-y-2.5 text-xs font-light text-[#f6f2ec]/70">
                <li>
                  <Link href="/agafay" className="link-sweep hover:text-[#C4A258] transition-colors">
                    Agafay Desert Retreat
                  </Link>
                </li>
                <li>
                  <Link href="/taghazout" className="link-sweep hover:text-[#C4A258] transition-colors">
                    Taghazout Coastal Surf
                  </Link>
                </li>
                <li>
                  <a href="#destinations" className="link-sweep hover:text-[#C4A258] transition-colors">
                    Imlil & High Atlas Mountains
                  </a>
                </li>
                <li>
                  <a href="#destinations" className="link-sweep hover:text-[#C4A258] transition-colors">
                    Sahara Merzouga Expedition
                  </a>
                </li>
                <li>
                  <a href="#destinations" className="link-sweep hover:text-[#C4A258] transition-colors">
                    Ouzoud Waterfalls Day Trip
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Editorial Guides & Journal */}
            <div className="md:col-span-3 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C4A258] font-semibold block">
                Travel Journal
              </span>
              <ul className="space-y-2.5 text-xs font-light text-[#f6f2ec]/70">
                <li>
                  <Link href="/blog/agafay-vs-sahara-desert-guide" className="link-sweep hover:text-[#C4A258] transition-colors">
                    Agafay vs. Sahara: Desert Guide
                  </Link>
                </li>
                <li>
                  <Link href="/blog/7-day-managed-morocco-itinerary-guide" className="link-sweep hover:text-[#C4A258] transition-colors">
                    7-Day Managed Morocco Route
                  </Link>
                </li>
                <li>
                  <Link href="/blog/taghazout-surf-yoga-coastal-guide" className="link-sweep hover:text-[#C4A258] transition-colors">
                    Taghazout Coastal &amp; Surf Living
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="link-sweep text-[#C4A258] hover:text-[#d8bb78] font-normal transition-colors">
                    Explore all stories & guides →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Verified Channels & Reviews */}
            <div className="md:col-span-2 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C4A258] font-semibold block">
                Trust &amp; Connect
              </span>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.tripadvisor.com/Attraction_Review-g293734-d34660267-Reviews-Safaratlas-Marrakech_Marrakech_Safi.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-xs text-[#f6f2ec]/75 hover:text-[#C4A258] transition-colors group"
                >
                  <SiTripadvisor className="w-4 h-4 text-[#C4A258] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>TripAdvisor Reviews</span>
                </a>
                <a
                  href="https://www.instagram.com/safaratlas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-xs text-[#f6f2ec]/75 hover:text-[#C4A258] transition-colors group"
                >
                  <SiInstagram className="w-4 h-4 text-[#C4A258] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>@safaratlas Instagram</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-xs text-[#f6f2ec]/75 hover:text-[#C4A258] transition-colors group"
                >
                  <SiWhatsapp className="w-4 h-4 text-[#C4A258] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Concierge WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Copyright bottom */}
        <div className="mx-auto mt-16 pb-12">
          <div className="h-px w-full bg-[#f6f2ec]/10" />
          <div className="mt-8 flex flex-col items-center justify-between gap-6 text-[10px] uppercase tracking-[0.3em] text-[#f6f2ec]/35 sm:flex-row">
            <span className="font-serif text-sm italic normal-case tracking-normal text-[#f6f2ec]/60">
              SafarAtlas
            </span>
            <span>Marrakech · Morocco · Premium Managed Journeys</span>
            <div className="flex items-center gap-4">
              <Link href="/legal/privacy" className="hover:text-[#C4A258] transition-colors">Privacy</Link>
              <span>·</span>
              <Link href="/legal/terms" className="hover:text-[#C4A258] transition-colors">Terms</Link>
              <span>·</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Massive typographic watermark — half sliced like Taghazout */}
      <div
        className="w-full flex justify-center items-end leading-none pointer-events-none select-none px-4 md:px-8"
        style={{ marginTop: "clamp(2rem,5vw,4rem)", marginBottom: "clamp(-4rem,-10vw,-8rem)" }}
      >
        <span
          className="text-[#C4A258] whitespace-nowrap opacity-[0.07]"
          style={{
            fontFamily: '"Impact","Arial Narrow","Helvetica Neue",sans-serif',
            fontSize: "clamp(5rem, 22vw, 22rem)",
            letterSpacing: "0.04em",
            lineHeight: 0.85,
            transform: "skewX(-8deg)",
          }}
        >
          SAFAR ATLAS
        </span>
      </div>
    </section>
  );
}
