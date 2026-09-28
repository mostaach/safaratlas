"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SupportedCurrency, formatPrice, convertFromEur, CURRENCY_SYMBOLS } from "../lib/currency";

interface CurrencyContextType {
  currency: SupportedCurrency;
  setCurrency: (currency: SupportedCurrency) => void;
  format: (amountEur: number) => string;
  convert: (amountEur: number) => number;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "EUR",
  setCurrency: () => {},
  format: (amount) => formatPrice(amount, "EUR"),
  convert: (amount) => convertFromEur(amount, "EUR"),
  symbol: "€",
});

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<SupportedCurrency>("EUR");

  useEffect(() => {
    // 1. Check saved user preference in localStorage
    const saved = localStorage.getItem("safaratlas_currency") as SupportedCurrency;
    if (saved && ["EUR", "USD", "GBP", "MAD"].includes(saved)) {
      setCurrencyState(saved);
      return;
    }

    // 2. Auto-detect country based on browser language / time zone
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      const lang = navigator.language || "";

      if (timeZone.includes("Casablanca") || lang.startsWith("ar-MA") || lang.startsWith("fr-MA")) {
        setCurrencyState("MAD");
      } else if (timeZone.includes("London") || lang.includes("en-GB")) {
        setCurrencyState("GBP");
      } else if (timeZone.includes("America") || lang.includes("en-US")) {
        setCurrencyState("USD");
      }
    } catch (e) {
      // Default fallback is EUR
    }
  }, []);

  const setCurrency = (curr: SupportedCurrency) => {
    setCurrencyState(curr);
    try {
      localStorage.setItem("safaratlas_currency", curr);
    } catch (e) {}
  };

  const format = (amountEur: number) => formatPrice(amountEur, currency);
  const convert = (amountEur: number) => convertFromEur(amountEur, currency);
  const symbol = CURRENCY_SYMBOLS[currency] || "€";

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format, convert, symbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
