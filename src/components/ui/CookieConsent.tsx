"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const STORAGE_KEY = "safaratlas_cookie_consent";

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Delay slightly for smooth page entry
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access restricted (e.g. strict incognito)
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "all");
    } catch {}

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }

    setVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "essential");
    } catch {}

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }

    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 sm:max-w-md animate-in fade-in slide-in-from-bottom-5 duration-500"
    >
      <div className="rounded-2xl p-5 bg-[#080c10]/95 backdrop-blur-xl border border-[#d6b78a]/35 shadow-[0_20px_50px_rgba(0,0,0,0.65)] text-white space-y-3.5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#d6b78a]/15 border border-[#d6b78a]/30 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4 text-[#d6b78a]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-serif font-black tracking-tight text-white flex items-center gap-2">
              <span>Your Privacy Matters</span>
            </h4>
            <p className="text-xs text-white/75 leading-relaxed">
              We use essential cookies for platform security and anonymous Google Analytics to optimize Morocco travel routes and service quality.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
          <Link
            href="/legal/privacy#cookies"
            className="text-[11px] font-semibold text-[#d6b78a] hover:text-white underline underline-offset-4 transition-colors py-1 text-center sm:text-left"
          >
            Learn more in Privacy Policy
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleEssentialOnly}
              className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-black tracking-wide text-[#0d2239] bg-gradient-to-r from-[#d6b78a] to-[#c89a4e] hover:brightness-105 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
