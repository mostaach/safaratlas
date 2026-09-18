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
    image: "/escapes/agafay-sunset-dinner.webp",
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
    <section className="relative w-full bg-[#07192d] text-[#f6f2ec] py-28 md:py-40 border-t border-[#C4A258]/15">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 space-y-4">
          <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[#C4A258]">
            <span className="h-px w-8 bg-[#C4A258]" />
            Moroccan Contrasts
            <span className="h-px w-8 bg-[#C4A258]" />
          </p>

          <h2
            className="font-serif font-medium leading-[1.02] tracking-tight text-[#f6f2ec] max-w-2xl text-balance"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
          >
            Beyond the <span className="italic text-[#C4A258]">guidebooks.</span>
          </h2>

          <p className="max-w-xl text-sm sm:text-base font-light text-[#f6f2ec]/70 leading-relaxed">
            From the arid stone dunes of Agafay to the alpine peaks of the High Atlas and the peeling swell of the Atlantic coast.
          </p>
        </div>

        {/* Asymmetric Editorial Bento Grid — Zero rounded corners, matching escapes section */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden bg-[#0a1e34] border border-[#C4A258]/15 hover:border-[#C4A258]/50 transition-colors duration-500 ${item.className}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover brightness-90 transition-transform duration-1000 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07192d]/95 via-[#07192d]/30 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#C4A258] font-medium block mb-2">
                  {item.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#f6f2ec] tracking-tight">
                  {item.title}
                </h3>
                <div className="mt-3 h-px w-8 bg-[#C4A258] transition-all duration-500 group-hover:w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
