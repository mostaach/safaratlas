"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Map, Route, Compass, MessageCircle } from "lucide-react";

interface FloatingNavProps {
  onOpenInquiry?: () => void;
}

const FloatingNav: React.FC<FloatingNavProps> = () => {
  const [active, setActive] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);

  const items = [
    { id: 0, icon: <Route size={22} />, label: "Route", href: "#itineraries" },
    { id: 1, icon: <Compass size={22} />, label: "Escapes", href: "#escapes" },
    { id: 2, icon: <MapPin size={22} />, label: "Places", href: "#destinations" },
    { id: 3, icon: <Map size={22} />, label: "Map", href: "#map-explorer" },
    { id: 4, icon: <MessageCircle size={22} />, label: "WhatsApp", action: () => window.open("https://wa.me/212698017323?text=Hello%20SafarAtlas!%20I'd%20like%20to%20plan%20a%20Morocco%20trip.", "_blank") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["itineraries", "escapes", "destinations", "map-explorer"];
      const scrollPos = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActive(i);
          break;
        }
      }
    };

    const updateIndicator = () => {
      if (btnRefs.current[active] && containerRef.current) {
        const btn = btnRefs.current[active];
        const container = containerRef.current;
        if (!btn) return;
        const btnRect = btn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        setIndicatorStyle({
          width: btnRect.width,
          left: btnRect.left - containerRect.left,
        });
      }
    };

    updateIndicator();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateIndicator);
    
    const timeout = setTimeout(updateIndicator, 100);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateIndicator);
      clearTimeout(timeout);
    };
  }, [active]);

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4">
      <div
        ref={containerRef}
        className="relative flex items-center justify-between bg-[#07192d]/95 backdrop-blur-xl shadow-2xl shadow-black/60 rounded-full px-1.5 py-2 border border-white/15"
      >
        {items.map((item, index) => {
          const isActive = active === index;
          
          const content = (
            <>
              <div className="z-10">{item.icon}</div>
              <span className="text-[11px] font-bold mt-1 hidden sm:block tracking-wide">
                {item.label}
              </span>
            </>
          );

          const className = `relative flex flex-col items-center justify-center flex-1 px-3 py-2 text-sm font-medium transition-colors duration-300 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A258] rounded-full ${
            isActive ? "text-[#C4A258]" : "text-white/70 hover:text-white"
          }`;

          return item.href ? (
            <a
              key={item.id}
              href={item.href}
              ref={(el) => { btnRefs.current[index] = el; }}
              onClick={() => setActive(index)}
              className={className}
              aria-label={item.label}
            >
              {content}
            </a>
          ) : (
            <button
              key={item.id}
              ref={(el) => { btnRefs.current[index] = el; }}
              onClick={() => {
                setActive(index);
                if (item.action) item.action();
              }}
              className={className}
              aria-label={item.label}
            >
              {content}
            </button>
          );
        })}

        {/* Sliding Active Indicator */}
        <motion.div
          animate={indicatorStyle}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute top-1.5 bottom-1.5 rounded-full bg-[#C4A258]/15 border border-[#C4A258]/30"
        />
      </div>
    </div>
  );
};

export default FloatingNav;
