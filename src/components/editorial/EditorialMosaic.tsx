"use client";

import React from "react";

interface MosaicItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  className: string;
}

const ITEMS: MosaicItem[] = [
  {
    id: "agafay",
    title: "The Stone Silence",
    subtitle: "Agafay Desert Sunset & Candlelit Dining",
    image: "/real-agafay-sunset.jpg",
    className: "col-span-12 md:col-span-7 aspect-[16/10]",
  },
  {
    id: "sahara",
    title: "The Golden Horizon",
    subtitle: "Erg Chebbi Sunset Camel Caravans",
    image: "/real-camel-desert.jpg",
    className: "col-span-12 md:col-span-5 aspect-[10/12]",
  },
  {
    id: "atlas",
    title: "The High Peaks",
    subtitle: "Imlil Valley & Amazigh Stone Villages",
    image: "/escapes/atlas-mountains.jpg",
    className: "col-span-12 md:col-span-5 aspect-[10/12]",
  },
  {
    id: "taghazout",
    title: "The Atlantic Rhythm",
    subtitle: "Oceanfront Sunsets & Surf Resets",
    image: "/hero-taghazout.jpg",
    className: "col-span-12 md:col-span-7 aspect-[16/10]",
  },
];

export const EditorialMosaic: React.FC = () => {
  return (
    <section className="relative w-full bg-[#080c10] text-[#f6f2ec] py-24 sm:py-36 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-24 space-y-4">
          <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.35em] text-[#d6b78a]">
            <span className="h-px w-8 bg-[#d6b78a]" />
            <span>Moroccan Contrasts</span>
            <span className="h-px w-8 bg-[#d6b78a]" />
          </div>

          <h2
            className="font-serif font-normal leading-tight tracking-tight text-white max-w-2xl"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Beyond the <span className="italic text-[#d6b78a]">guidebooks.</span>
          </h2>

          <p className="max-w-xl text-sm sm:text-base font-light text-[#f6f2ec]/75 leading-relaxed">
            From the arid stone dunes of Agafay to the alpine peaks of the High Atlas and the peeling swell of the Atlantic coast.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 ${item.className}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover brightness-90 transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c10]/90 via-[#080c10]/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#d6b78a] block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
