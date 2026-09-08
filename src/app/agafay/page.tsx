"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "../../components/brand/Header";
import { Footer } from "../../components/brand/Footer";
import { InquiryModal } from "../../components/travel/InquiryModal";
import { ESCAPES_PACKAGES } from "../../data/mockData";

const WHATSAPP_NUMBER = "212698017323";
const DISPLAY_PHONE = "+212 698 017 323";

export default function AgafayPage() {
  const pricePerPerson = 34; // €34 Launch Price
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const waMessage = encodeURIComponent(
    `Hi SafarAtlas! I'd like to reserve the Agafay Desert Full Experience at €${pricePerPerson}/person.\n` +
      `Includes: Marrakech Transfer + Quad Biking + Camel Ride + Mint Tea + Sunset View + Tagine Dinner & Gnaoua Show.\n` +
      `Can you confirm availability for our travel dates?`
  );

  const agafayPackage = ESCAPES_PACKAGES.find((p) => p.id === "escape-agafay-1d") || null;

  return (
    <div className="min-h-screen flex flex-col bg-[#080c10] text-[#f6f2ec] selection:bg-[#d6b78a] selection:text-[#0d2239]">
      {/* Global Brand Header with custom dark accent support */}
      <div className="relative z-50">
        <Header onOpenInquiryModal={() => setInquiryOpen(true)} />
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20">
        {/* ── HERO GLASS POSTER CONTAINER ── */}
        <section
          id="overview"
          className="relative rounded-3xl border border-white/20 shadow-2xl overflow-hidden min-h-[85vh] flex flex-col justify-between p-5 sm:p-8 lg:p-12 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(8, 12, 16, 0.45) 0%, rgba(8, 12, 16, 0.85) 100%), url('/agafay-hero-quads.jpg')`,
          }}
        >
          {/* Subheader bar inside hero */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 z-10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-[#d6b78a]/20 border border-[#d6b78a]/40 text-[#d6b78a]">
                Agafay Desert · 45m from Marrakech
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#d6b78a]/40 bg-[#d6b78a]/10 text-[#d6b78a] hover:bg-[#d6b78a]/20 transition-all"
              >
                <span>📞 {DISPLAY_PHONE}</span>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-[#25D366] text-white shadow-md hover:bg-[#20bd5a] transition-all"
              >
                <span>💬 WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          {/* Hero Content: 2-column on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto py-8 z-10">
            {/* Left Col: Titles */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#d6b78a] drop-shadow">
                Exclusive Signature Experience
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-white leading-tight drop-shadow-md">
                Escape to the <br />
                <span className="text-[#d6b78a]">Agafay Desert</span>
              </h1>
              <p className="text-sm sm:text-base text-[#f6f2ec]/90 max-w-xl leading-relaxed drop-shadow">
                Desert adrenaline, authentic Berber hospitality, golden-hour camel trek, and candlelit campfire dining — all orchestrated in one seamless evening.
              </p>
            </div>

            {/* Right Col: Price Card (Responsive Width) */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto lg:ml-auto">
              <div className="rounded-2xl p-6 bg-[#0d2239]/80 backdrop-blur-xl border border-white/20 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d6b78a]">
                    Special Launch Offer
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30">
                    Pay on Arrival
                  </span>
                </div>

                <div>
                  <div className="text-4xl sm:text-5xl font-black text-white">
                    €{pricePerPerson}
                    <span className="text-sm sm:text-base font-normal text-[#d6b78a] ml-2">
                      / person
                    </span>
                  </div>
                  <p className="text-xs text-[#f6f2ec]/70 mt-1">
                    Everything included: Roundtrip transfer, Quad, Camel, Tea & 3-Course Dinner.
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2.5">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl text-center font-extrabold text-xs uppercase tracking-widest bg-gradient-to-r from-[#d6b78a] to-[#c89a4e] text-[#0d2239] shadow-lg hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Instant WhatsApp Booking →</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setInquiryOpen(true)}
                    className="w-full py-2.5 px-4 rounded-xl text-center font-bold text-xs text-[#f6f2ec]/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  >
                    Send Booking Inquiry Form
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Highlights Strip inside Hero */}
          <div className="pt-4 border-t border-white/10 z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center sm:text-left">
              <div className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                <div className="text-lg">🏎️</div>
                <div className="text-xs font-bold text-white uppercase mt-0.5">1h Guided Quad</div>
                <div className="text-[10px] text-[#d6b78a]">Helmets & guide included</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                <div className="text-lg">🐪</div>
                <div className="text-xs font-bold text-white uppercase mt-0.5">Sunset Camel Trek</div>
                <div className="text-[10px] text-[#d6b78a]">Nomad dress & tea stop</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                <div className="text-lg">🕯️</div>
                <div className="text-xs font-bold text-white uppercase mt-0.5">Tagine Dinner</div>
                <div className="text-[10px] text-[#d6b78a]">Fresh 3-course Moroccan feast</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                <div className="text-lg">🔥</div>
                <div className="text-xs font-bold text-white uppercase mt-0.5">Live Fire & Gnawa</div>
                <div className="text-[10px] text-[#d6b78a]">Acoustic show by bonfire</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT'S INCLUDED SECTION ── */}
        <section id="activities" className="mt-16 sm:mt-24 space-y-8">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-[#d6b78a]/10 border border-[#d6b78a]/30 text-[#d6b78a]">
              The Full Package
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
              What Makes Agafay Unforgettable
            </h2>
            <p className="text-sm text-[#f6f2ec]/75 max-w-xl">
              From hotel door to desert sunset, every detail is handled with zero stress for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/10 to-[#0d2239]/60 backdrop-blur-xl border border-white/15 hover:border-[#d6b78a]/50 transition-all space-y-2.5">
              <div className="text-3xl">🏎️</div>
              <h3 className="text-base font-black text-white uppercase tracking-wide">Quad Biking Safari</h3>
              <span className="text-[11px] font-bold text-[#d6b78a] block">1 Hour · Guided Expedition</span>
              <p className="text-xs text-[#f6f2ec]/80 leading-relaxed">
                Pilot premium quad bikes through the rolling stone dunes, canyon trails, and panoramic view spots.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/10 to-[#0d2239]/60 backdrop-blur-xl border border-white/15 hover:border-[#d6b78a]/50 transition-all space-y-2.5">
              <div className="text-3xl">🐪</div>
              <h3 className="text-base font-black text-white uppercase tracking-wide">Sunset Camel Trek</h3>
              <span className="text-[11px] font-bold text-[#d6b78a] block">20 Min · Traditional Attire</span>
              <p className="text-xs text-[#f6f2ec]/80 leading-relaxed">
                Climb aboard gentle camels wearing traditional cheche robes just as the sun sinks behind the High Atlas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/10 to-[#0d2239]/60 backdrop-blur-xl border border-white/15 hover:border-[#d6b78a]/50 transition-all space-y-2.5">
              <div className="text-3xl">🍲</div>
              <h3 className="text-base font-black text-white uppercase tracking-wide">Candlelit Tagine Feast</h3>
              <span className="text-[11px] font-bold text-[#d6b78a] block">3 Courses · Camp Pavilion</span>
              <p className="text-xs text-[#f6f2ec]/80 leading-relaxed">
                Savor piping-hot Moroccan salads, slow-cooked tagines, and seasonal fruits in our Berber camp tent.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/10 to-[#0d2239]/60 backdrop-blur-xl border border-white/15 hover:border-[#d6b78a]/50 transition-all space-y-2.5">
              <div className="text-3xl">🔥</div>
              <h3 className="text-base font-black text-white uppercase tracking-wide">Gnawa & Fire Show</h3>
              <span className="text-[11px] font-bold text-[#d6b78a] block">Live Rhythm · Campfire</span>
              <p className="text-xs text-[#f6f2ec]/80 leading-relaxed">
                Gather around the central bonfire for hypnotic Gnawa drum rhythms, folk dance, and a live fire performance.
              </p>
            </div>
          </div>
        </section>

        {/* ── STEP-BY-STEP TIMELINE ── */}
        <section id="timeline" className="mt-16 sm:mt-24 space-y-8">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-[#d6b78a]/10 border border-[#d6b78a]/30 text-[#d6b78a]">
              The Itinerary
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
              Step-by-Step Desert Evening
            </h2>
            <p className="text-sm text-[#f6f2ec]/75 max-w-xl">
              ~5 hours total experience designed around optimal golden-hour light and dinner timing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-[#d6b78a]">
                <span>16:30</span>
                <span>🚐</span>
              </div>
              <h3 className="text-sm font-bold text-white">Marrakech Pickup</h3>
              <p className="text-xs text-[#f6f2ec]/75 leading-relaxed">
                Air-conditioned door-to-door transfer from your Riad or Hotel to Agafay (~45 min scenic drive).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-[#d6b78a]">
                <span>17:30</span>
                <span>🏎️</span>
              </div>
              <h3 className="text-sm font-bold text-white">Quad Safari</h3>
              <p className="text-xs text-[#f6f2ec]/75 leading-relaxed">
                Safety briefing, helmet fitting, and 1-hour guided quad run over ridges and dry riverbeds.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-[#d6b78a]">
                <span>18:45</span>
                <span>🐪</span>
              </div>
              <h3 className="text-sm font-bold text-white">Sunset Camel & Mint Tea</h3>
              <p className="text-xs text-[#f6f2ec]/75 leading-relaxed">
                Sunset ride in nomad garments, followed by fresh Moroccan mint tea overlooking Atlas mountain peaks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-[#d6b78a]">
                <span>19:45</span>
                <span>🍲</span>
              </div>
              <h3 className="text-sm font-bold text-white">Camp Tagine Dinner</h3>
              <p className="text-xs text-[#f6f2ec]/75 leading-relaxed">
                Sit down to a generous dinner with bread, traditional dips, chicken or vegetable tagine, and dessert.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-[#d6b78a]">
                <span>20:45</span>
                <span>🔥</span>
              </div>
              <h3 className="text-sm font-bold text-white">Bonfire & Show</h3>
              <p className="text-xs text-[#f6f2ec]/75 leading-relaxed">
                Live Gnawa spiritual music, clapping rhythms, and an acrobatic fire show under the desert sky.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-[#d6b78a]">
                <span>21:30</span>
                <span>✨</span>
              </div>
              <h3 className="text-sm font-bold text-white">Return Transfer</h3>
              <p className="text-xs text-[#f6f2ec]/75 leading-relaxed">
                Comfortable ride back to Marrakech, arriving at your hotel doorstep by ~22:15.
              </p>
            </div>
          </div>
        </section>

        {/* ── TRUST & GOOD TO KNOW ── */}
        <section id="reassurance" className="mt-16 sm:mt-24">
          <div className="rounded-3xl p-6 sm:p-10 bg-[#0d2239]/70 backdrop-blur-xl border border-white/15 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-[#d6b78a]">✓</span> What&apos;s Included
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#f6f2ec]/85">
                <li className="flex items-center gap-2">
                  <span className="text-[#25D366] font-bold">✓</span> Hotel pickup and drop-off in Marrakech
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#25D366] font-bold">✓</span> 1-hour quad biking safari + equipment
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#25D366] font-bold">✓</span> 20-minute sunset camel trek with scarf
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#25D366] font-bold">✓</span> Moroccan mint tea & hospitality
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#25D366] font-bold">✓</span> Full 3-course dinner in desert camp
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#25D366] font-bold">✓</span> Live Gnawa musicians & fire-eater show
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-[#d6b78a]">ℹ️</span> Good To Know
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#f6f2ec]/85">
                <li>
                  <strong className="text-white">Duration:</strong> ~5 hours (16:30 – 21:30)
                </li>
                <li>
                  <strong className="text-white">Clothing:</strong> Comfortable clothes, sunglasses, closed shoes
                </li>
                <li>
                  <strong className="text-white">Cancellation:</strong> Free cancellation up to 24h before
                </li>
                <li>
                  <strong className="text-white">Payment:</strong> Pay securely on arrival (Cash or Card)
                </li>
                <li>
                  <strong className="text-white">Group size:</strong> Intimate small-group departures
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── FINAL BOOKING CTA ── */}
        <section className="mt-16 sm:mt-24 text-center">
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#d6b78a]/20 via-[#0d2239]/90 to-[#080c10] border border-[#d6b78a]/40 max-w-3xl mx-auto space-y-6">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#d6b78a]/20 text-[#d6b78a]">
              Limited Availability Daily
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white">
              Ready to Experience Agafay?
            </h2>
            <p className="text-sm sm:text-base text-[#f6f2ec]/85 max-w-md mx-auto">
              From <strong>€34 / person</strong>. Message our WhatsApp Concierge for rapid confirmation and door-to-door logistics.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#d6b78a] to-[#c89a4e] text-[#0d2239] shadow-2xl hover:scale-105 active:scale-95 transition-all"
              >
                Book via WhatsApp Now →
              </a>
              <button
                type="button"
                onClick={() => setInquiryOpen(true)}
                className="w-full sm:w-auto px-6 py-4 rounded-full font-bold text-xs bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all"
              >
                Inquire With Travel Dates
              </button>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#d6b78a]">
              <span>⚡ Fast confirmation</span>
              <span>•</span>
              <span>🛡️ Free cancel up to 24h</span>
              <span>•</span>
              <span>💳 Pay on arrival</span>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* ── STICKY MOBILE BOOKING BAR (Fixed to bottom on mobile only) ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d2239]/95 backdrop-blur-xl border-t border-[#d6b78a]/30 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <div className="text-base font-black text-[#d6b78a]">
            €{pricePerPerson} <span className="text-xs font-normal text-[#f6f2ec]/70">/ person</span>
          </div>
          <div className="text-[10px] text-[#f6f2ec]/70">Pay on arrival · Free cancellation</div>
        </div>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#25D366] to-[#1eb757] text-white shadow-lg active:scale-95 transition-all flex items-center gap-1.5"
        >
          <span>Book WhatsApp</span>
          <span>→</span>
        </a>
      </div>

      {/* General / Agafay Inquiry Lead Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        selectedEscape={agafayPackage}
      />
    </div>
  );
}
