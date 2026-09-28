"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCurrency } from "../../context/CurrencyContext";
import { SupportedCurrency } from "../../lib/currency";

const CURRENCIES: { code: SupportedCurrency; label: string; symbol: string; flag: string }[] = [
  { code: "USD", label: "USD", symbol: "$", flag: "🇺🇸" },
  { code: "GBP", label: "GBP", symbol: "£", flag: "🇬🇧" },
  { code: "EUR", label: "EUR", symbol: "€", flag: "🇪🇺" },
  { code: "MAD", label: "MAD", symbol: "MAD", flag: "🇲🇦" },
];

export const CurrencySwitcher: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const active = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  return (
    <div ref={ref} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#f6f2ec]/80 hover:text-[#C4A258] transition-colors border border-white/10 hover:border-[#C4A258]/40 bg-[#07192d]/60 backdrop-blur-sm cursor-pointer"
        aria-label="Select currency"
      >
        <span>{active.flag}</span>
        <span>{active.code} ({active.symbol})</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-36 bg-[#07192d]/98 border border-[#C4A258]/30 shadow-2xl backdrop-blur-xl z-50 py-1">
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                setCurrency(c.code);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                currency === c.code
                  ? "text-[#C4A258] bg-[#C4A258]/10 font-bold"
                  : "text-[#f6f2ec]/70 hover:text-[#f6f2ec] hover:bg-white/5 font-normal"
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{c.flag}</span>
                <span>{c.code}</span>
              </span>
              <span className="text-[10px] text-[#f6f2ec]/40 font-mono">{c.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
