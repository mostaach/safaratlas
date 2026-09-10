"use client";

import React, { useState } from "react";

const faqs = [
  {
    q: "How does booking through SafarAtlas work?",
    a: "No complex forms or rigid dates. You reach out to us directly on WhatsApp with your target dates and what kind of escape you're looking for. We coordinate verified local drivers, riads, and guides, and provide you with a single bespoke quote and confirmation.",
  },
  {
    q: "Are the escapes private or group tours?",
    a: "All SafarAtlas signature escapes are 100% private. Your vehicle, your driver, your pace, and your group only. We never mix separate bookings or herd you with strangers.",
  },
  {
    q: "Can you combine multiple destinations into a longer journey?",
    a: "Yes. In fact, that is what we specialize in as a tour operator. You can combine Taghazout (coastal surf) with Agafay or Merzouga (desert) and the High Atlas Mountains into a unified seamless itinerary.",
  },
  {
    q: "What is included in an escape?",
    a: "Private climate-controlled transport with pickup/drop-off at your hotel or riad, licensed local guides, curated activities, and traditional meals as specified. Any extras or special requests can be tailored directly.",
  },
  {
    q: "How do payments and cancellations work?",
    a: "We agree on itinerary terms directly on WhatsApp. Once confirmed, payment details are provided with transparent conditions and clear cancellation policies tailored to the seasons and partner bookings.",
  },
];

export default function EditorialFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden bg-[#080c10] py-28 md:py-40 border-t border-[#f6f2ec]/10"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-x-8 gap-y-16">
          <header className="col-span-12 md:col-span-4">
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[#d6b78a]">
              <span className="h-px w-8 bg-[#d6b78a]" />
              Questions & Clarity
            </p>
            <h2
              className="mt-8 font-serif font-medium leading-[1.02] tracking-tight text-[#f6f2ec] text-balance"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
            >
              Everything you need{" "}
              <span className="italic text-[#d6b78a]">to know.</span>
            </h2>
            <p className="mt-8 max-w-sm font-sans text-base font-light leading-relaxed text-[#f6f2ec]/60">
              Clear, transparent answers on how we plan, coordinate, and safeguard your journey across Morocco.
            </p>
          </header>

          <div className="col-span-12 md:col-span-8">
            <div className="w-full divide-y divide-[#f6f2ec]/10">
              {faqs.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="py-6">
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between text-left group transition-colors"
                    >
                      <span className="flex items-baseline gap-5 pr-4">
                        <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#d6b78a]/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-serif text-lg md:text-xl transition-colors duration-300 ${
                            isOpen
                              ? "text-[#d6b78a]"
                              : "text-[#f6f2ec] group-hover:text-[#d6b78a]"
                          }`}
                        >
                          {item.q}
                        </span>
                      </span>
                      <span
                        className={`text-xl font-light transition-transform duration-300 ${
                          isOpen ? "rotate-45 text-[#d6b78a]" : "text-[#f6f2ec]/40"
                        }`}
                      >
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div className="mt-4 pl-[3.25rem] pr-4 font-sans text-base font-light leading-relaxed text-[#f6f2ec]/70 transition-all">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
