"use client";

import React, { useState } from "react";
import { Logo } from "../../components/brand/Logo";
import { trackEvent } from "../../lib/trackEvent";
import { FadeIn } from "../../components/animations/FadeIn";
import { SlideUp } from "../../components/animations/SlideUp";
import { ScaleIn } from "../../components/animations/ScaleIn";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setStatus("error");
        setMsg(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setMsg(data.message || "You're on the list!");
      trackEvent("waitlist_join", { email_domain: email.split("@")[1] });
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMsg("Failed to connect. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-cream text-slate-900 font-sans selection:bg-accent">
      {/* Simple Header */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <Logo size="md" showTagline={false} />
        <a href="/partners" className="text-xs font-bold text-navy hover:text-gold transition-colors">
          Partner Program
        </a>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center relative overflow-hidden zellige-pattern px-4">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-radial from-accent/20 via-gold/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8 mt-12">
          
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy/10 border border-navy/20 text-navy text-xs font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span>Coming Soon</span>
            </div>
          </FadeIn>

          <SlideUp delay={0.2} duration={0.8}>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] text-slate-900">
              Discover <span className="text-gold">Morocco</span><br className="hidden sm:block" /> with confidence.
            </h1>
          </SlideUp>

          <SlideUp delay={0.3} duration={0.8}>
            <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-xl mx-auto font-medium">
              We are building a curated marketplace of verified local riads, guides, and desert expeditions. No hidden fees, just direct connection with trusted partners.
            </p>
          </SlideUp>

          <FadeIn delay={0.4}>
            <div className="pt-6 max-w-md mx-auto">
              {status === "success" ? (
                <div className="bg-[#ecfdf5] border border-[#10b981] rounded-2xl p-6">
                  <span className="text-3xl mb-2 block">🎉</span>
                  <h3 className="text-[#059669] font-black text-lg">You&apos;re on the list!</h3>
                  <p className="text-[#047857] text-sm mt-1">We&apos;ll notify you when we open the doors for our Marrakech pilot.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    className="flex-1 px-5 py-4 rounded-xl border-2 border-slate-200 bg-white text-sm font-medium outline-none focus:border-navy transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-8 py-4 rounded-xl bg-navy text-white text-sm font-black hover:bg-navy-dark transition-colors disabled:opacity-50 whitespace-nowrap shadow-lg shadow-navy/20"
                  >
                    {status === "loading" ? "Joining..." : "Join Waitlist"}
                  </button>
                </form>
              )}
              {status === "error" && (
                <p className="mt-3 text-sm font-bold text-[#b42318]">{msg}</p>
              )}
            </div>
          </FadeIn>
          
          <FadeIn delay={0.6}>
            <div className="pt-12 flex items-center justify-center gap-6 text-xs font-bold text-slate-500">
              <div className="flex items-center gap-2">
                <span className="text-gold">📍</span>
                <span>Launching in Marrakech first</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-navy">✓</span>
                <span>Safar Verified Partners</span>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </main>
  );
}
