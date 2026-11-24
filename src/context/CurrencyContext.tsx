"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";
import { SupportedCurrency, formatPrice, convertFromEur, CURRENCY_SYMBOLS } from "../lib/currency";

interface CurrencyContextType {
  currency: SupportedCurrency;
  setCurrency: (currency: SupportedCurrency) => void;
  format: (amountEur: number) => string;
  convert: (amountEur: number) => number;
  symbol: string;
}

const STORAGE_KEY = "safaratlas_currency";
const SUPPORTED_CURRENCIES: SupportedCurrency[] = ["EUR", "USD", "GBP", "MAD"];

/**
 * The currency preference lives in localStorage, which is unavailable during
 * SSR. Expose it through an external store instead of seeding React state from
 * an effect: this avoids an extra render pass (and the visible EUR flash on
 * load) while keeping the server snapshot deterministic.
 */
const listeners = new Set<() => void>();
let cachedCurrency: SupportedCurrency | null = null;

function detectCurrency(): SupportedCurrency {
  try {
    // 1. Saved user preference
    const saved = localStorage.getItem(STORAGE_KEY) as SupportedCurrency | null;
    if (saved && SUPPORTED_CURRENCIES.includes(saved)) return saved;

    // 2. Auto-detect based on browser language / time zone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = navigator.language || "";

    if (timeZone.includes("Casablanca") || lang.startsWith("ar-MA") || lang.startsWith("fr-MA")) {
      return "MAD";
    }
    if (timeZone.includes("London") || lang.includes("en-GB")) {
      return "GBP";
    }
    if (timeZone.includes("America") || lang.includes("en-US")) {
      return "USD";
    }
  } catch {
    // Default fallback is EUR
  }
  return "EUR";
}

function getSnapshot(): SupportedCurrency {
  if (cachedCurrency === null) cachedCurrency = detectCurrency();
  return cachedCurrency;
}

function getServerSnapshot(): SupportedCurrency {
  return "EUR";
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);

  // Keep multiple tabs in sync with one another.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    cachedCurrency = detectCurrency();
    onChange();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function setStoredCurrency(currency: SupportedCurrency): void {
  cachedCurrency = currency;
  try {
    localStorage.setItem(STORAGE_KEY, currency);
  } catch {
    // Storage may be unavailable (private mode); keep the in-memory value.
  }
  listeners.forEach((listener) => listener());
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "EUR",
  setCurrency: () => {},
  format: (amount) => formatPrice(amount, "EUR"),
  convert: (amount) => convertFromEur(amount, "EUR"),
  symbol: CURRENCY_SYMBOLS.EUR,
});

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currency = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: setStoredCurrency,
        format: (amountEur) => formatPrice(amountEur, currency),
        convert: (amountEur) => convertFromEur(amountEur, currency),
        symbol: CURRENCY_SYMBOLS[currency] || CURRENCY_SYMBOLS.EUR,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
