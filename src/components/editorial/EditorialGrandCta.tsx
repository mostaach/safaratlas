"use client";

import React from "react";
import { SiWhatsapp, SiInstagram } from "react-icons/si";

export default function EditorialGrandCta() {
  const whatsappUrl = `https://wa.me/212698017323?text=${encodeURIComponent(
    "Hello SafarAtlas, I am planning a journey to Morocco and would like to craft a private bespoke itinerary."
  )}`;

  return (
    <section
      id="availability"
      className="relative w-full overflow-hidden bg-[#080c10] pt-28 md:pt-40 border-t border-[#f6f2ec]/8"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-x-8 gap-y-16">

          {/* Left header */}
          <header className="col-span-12 md:col-span-5">
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[#d6b78a]">
              <span className="h-px w-8 bg-[#d6b78a]" />
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
            <div className="border-y border-[#f6f2ec]/15 py-10 md:py-12">
              <p className="font-serif text-2xl font-medium leading-tight text-[#f6f2ec] md:text-3xl md:text-4xl">
                Tell us your dates, rhythm and party size.
              </p>
              <p className="mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-[#f6f2ec]/70">
                Whether you want 48 hours under Agafay stars, a surf retreat in
                Taghazout, or a comprehensive 10-day cross-country expedition —
                we prepare your proposal within hours.
              </p>

              {/* CTAs — exact Taghazout button DNA */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-3 bg-[#d6b78a] px-10 py-5 text-xs uppercase tracking-[0.3em] text-[#080c10] transition-all duration-300 hover:bg-[#e2c79d] hover:tracking-[0.35em]"
                  style={{ boxShadow: "var(--shadow-gold)" }}
                >
                  <SiWhatsapp className="w-3.5 h-3.5" />
                  <span>Request Bespoke Itinerary</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>

                <a
                  href="https://www.instagram.com/safaratlas/"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-3 border border-[#f6f2ec]/20 px-10 py-5 text-xs uppercase tracking-[0.3em] text-[#f6f2ec] transition-all duration-300 hover:border-[#d6b78a] hover:text-[#d6b78a]"
                >
                  <SiInstagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              </div>

              <p className="mt-8 font-sans text-[10px] uppercase tracking-[0.25em] text-[#f6f2ec]/35">
                Direct WhatsApp Concierge · Response within 2 hours
              </p>
            </div>
          </div>

        </div>

        {/* Copyright bottom */}
        <div className="mx-auto mt-20 pb-12">
          <div className="h-px w-full bg-[#f6f2ec]/10" />
          <div className="mt-8 flex flex-col items-center justify-between gap-6 text-[10px] uppercase tracking-[0.3em] text-[#f6f2ec]/30 sm:flex-row">
            <span className="font-serif text-sm italic normal-case tracking-normal text-[#f6f2ec]/60">
              SafarAtlas
            </span>
            <span>Marrakech · Morocco · Premium Managed Journeys</span>
            <span>© {new Date().getFullYear()} — All rights reserved</span>
          </div>
        </div>
      </div>

      {/* Massive typographic watermark — half sliced like Taghazout */}
      <div
        className="w-full flex justify-center items-end leading-none pointer-events-none select-none px-4 md:px-8"
        style={{ marginTop: "clamp(2rem,5vw,4rem)", marginBottom: "clamp(-4rem,-10vw,-8rem)" }}
      >
        <span
          className="text-[#d6b78a] whitespace-nowrap opacity-[0.07]"
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
