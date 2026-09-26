/**
 * SafarAtlas Multi-Currency Formatter
 * Supports USA (USD), UK (GBP), Morocco (MAD), and Europe (EUR).
 */

export type SupportedCurrency = 'EUR' | 'USD' | 'GBP' | 'MAD';

export const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  MAD: 'MAD ',
};

export const EXCHANGE_RATES_FROM_EUR: Record<SupportedCurrency, number> = {
  EUR: 1.0,
  USD: 1.09,
  GBP: 0.84,
  MAD: 10.85,
};

export function convertFromEur(amountEur: number, targetCurrency: SupportedCurrency): number {
  const rate = EXCHANGE_RATES_FROM_EUR[targetCurrency] || 1.0;
  return Math.round(amountEur * rate);
}

export function formatPrice(amountEur: number, currency: SupportedCurrency = 'EUR'): string {
  const symbol = CURRENCY_SYMBOLS[currency] || '€';
  const converted = convertFromEur(amountEur, currency);
  
  if (currency === 'MAD') {
    return `${converted} MAD`;
  }
  return `${symbol}${converted}`;
}
