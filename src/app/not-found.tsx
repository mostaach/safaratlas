import React from "react";
import Link from "next/link";
import { Header } from "../components/brand/Header";
import { Footer } from "../components/brand/Footer";
import { Compass, ArrowRight, MessageSquare } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07192d] text-[#f6f2ec] flex flex-col justify-between selection:bg-[#C4A258]/30">
      <Header variant="dark" />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-2xl text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#07192d]/80 border border-[#C4A258]/40 text-[#C4A258] text-[11px] font-mono uppercase tracking-[0.25em]">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
            <span>404 · Uncharted Territory</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#f6f2ec]">
            The trail ends here.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#f6f2ec]/70 font-light max-w-lg mx-auto leading-relaxed">
            The page you are looking for may have moved across the dunes or no longer exists. Allow our concierge to guide you back to curated ground.
          </p>

          {/* Action Links */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#C4A258] text-[#07192d] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#d6b76c] transition-all duration-200 shadow-lg shadow-[#C4A258]/20"
            >
              <span>Return to Journeys</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/agafay"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 bg-white/5 text-[#f6f2ec] text-xs font-medium uppercase tracking-[0.2em] hover:border-[#C4A258] hover:text-[#C4A258] transition-all duration-200"
            >
              <span>Agafay Desert</span>
            </Link>

            <a
              href="https://wa.me/212698017323"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-medium uppercase tracking-[0.2em] hover:bg-emerald-500/20 transition-all duration-200"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Scout</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
