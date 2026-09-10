"use client";

import React from "react";

export const EditorialManifesto: React.FC = () => {
  return (
    <section id="manifesto" className="relative w-full overflow-hidden bg-[#faf6f0] text-[#121a17]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Eyebrow / Category indicator */}
          <div className="md:col-span-3">
            <p className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.35em] text-[#8c6d37]">
              <span className="h-px w-8 bg-[#8c6d37]/50" />
              The Anti-Tour Philosophy
            </p>
          </div>

          {/* Core Statement */}
          <div className="md:col-span-9 md:pl-4 space-y-8">
            <h2
              className="font-serif font-normal leading-[1.05] tracking-tight text-[#121a17]"
              style={{ fontSize: "clamp(2rem, 5vw, 4.25rem)" }}
            >
              Not everyone wants a 50-person tour bus.{" "}
              <br className="hidden sm:inline" />
              <span className="italic text-[#8c6d37]">
                Some people want Morocco curated just for them.
              </span>
            </h2>

            <p
              className="font-serif italic leading-[1.1] tracking-tight text-[#121a17]/80 pt-2"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              Real Morocco is found in quiet courtyards, starlit silence, and mountain hospitality.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-[#e5dacb]">
              <p className="text-sm sm:text-base font-light leading-relaxed text-[#4e5e57]">
                Most Morocco vacations are ruined by friction: haggling with unverified taxi drivers, booking riads that turn out to be noisy tourist traps, and spending 18 hours inside crowded tour vans. We believe travel should leave you grounded, not exhausted.
              </p>
              <div className="space-y-4">
                <p className="text-sm sm:text-base font-light leading-relaxed text-[#4e5e57]">
                  At SafarAtlas, we orchestrate every single transfer, desert lodge, and private guide into one seamless route. You travel at your own pace, supported 24/7 by our local WhatsApp concierge.
                </p>
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#123b34]">
                  ✦ 100% Private · Tailored to Your Rhythm
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Hairline bottom transition */}
      <div className="h-px w-full bg-[#e5dacb]" />
    </section>
  );
};
