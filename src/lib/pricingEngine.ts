/**
 * SafarAtlas Global Pricing Engine (Front-Office / Client Side)
 * 
 * CORE FORMULAS:
 * Escape = Activities + Food + Local Transport + Contingency + SafarAtlas Margin
 * Journey = Accommodation + Airport/Intercity Transport + Selected Escapes + Extras + 24/7 Guest Care + Margin
 * 
 * Hides internal supplier costs while providing clean, realistic, dynamic quotes.
 */

import { JourneyState, JourneyAccommodationSelection } from "./journeyTypes";

export interface JourneyPriceCalculation {
  totalPriceEur: number;
  pricePerPersonEur: number;
  breakdown: {
    escapesTotalEur: number;
    accommodationTotalEur: number;
    transportTotalEur: number;
    extrasTotalEur: number;
    guestCareEur: number;
  };
  savingsFromJourneyBundleEur: number;
}

/**
 * Calculates a clean customer-facing quote for an assembled Journey
 */
export function calculateJourneyQuote(
  journey: JourneyState,
  partySizeNum: number = 2
): JourneyPriceCalculation {
  // 1. Escapes Total (Sum of modular Escapes added)
  const escapesTotalEur = journey.items.reduce((sum, item) => sum + item.priceFromEur, 0);

  // 2. Accommodation Total (Tiered room nights)
  const accommodationTotalEur = (journey.accommodations || []).reduce((sum, acc) => {
    return sum + (acc.nightsCount * acc.estimatedPricePerNightEur * acc.roomCount);
  }, 0);

  // 3. Transport Total (Airport transfers + intercity)
  let transportTotalEur = 0;
  if (journey.hasAirportTransfer) {
    transportTotalEur += 40; // 2x €20 roundtrip Mercedes van
  }

  // 4. Extras Total
  const extrasTotalEur = (journey.extras || []).reduce((sum, extra) => sum + extra.priceEur, 0);

  // 5. Guest Care & 24/7 Concierge Allocation
  const days = Math.max(1, journey.items.reduce((sum, i) => sum + i.durationDays, 0));
  const guestCareEur = days * 10; // €10/day dedicated concierge service

  // 6. Journey Bundle Multi-Escape Optimization
  // If user books ≥ 2 Escapes, apply a €25 route/driver coordination credit
  let savingsFromJourneyBundleEur = 0;
  if (journey.items.length >= 2) {
    savingsFromJourneyBundleEur = 25;
  }

  const rawTotal = (escapesTotalEur * partySizeNum) + accommodationTotalEur + transportTotalEur + (extrasTotalEur * partySizeNum) + guestCareEur;
  const totalPriceEur = Math.max(0, rawTotal - savingsFromJourneyBundleEur);
  const pricePerPersonEur = Math.round(totalPriceEur / Math.max(1, partySizeNum));

  return {
    totalPriceEur,
    pricePerPersonEur,
    breakdown: {
      escapesTotalEur: escapesTotalEur * partySizeNum,
      accommodationTotalEur,
      transportTotalEur,
      extrasTotalEur: extrasTotalEur * partySizeNum,
      guestCareEur,
    },
    savingsFromJourneyBundleEur,
  };
}