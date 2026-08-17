"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Map, Route, ShieldCheck, MessageCircle } from "lucide-react";

interface FloatingNavProps {
  onOpenInquiry?: () => void;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ onOpenInquiry }) => {
  const [active, setActive] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);

  const items = [
    { id: 0, icon: <MapPin size={22} />, label: "Places", href: "#destinations" },
    { id: 1, icon: <Map size={22} />, label: "Map", href: "#map-explorer" },
    { id: 2, icon: <Route size={22} />, label: "Routes", href: "#itineraries" },
    { id: 3, icon: <ShieldCheck size={22} />, label: "Verified", href: "#verified-partners" },
    { id: 4, icon: <MessageCircle size={22} />, label: "Plan", action: onOpenInquiry },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["destinations", "map-explorer", "itineraries", "verified-partners"];
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
        className="relative flex items-center justify-between bg-white/95 backdrop-blur-xl shadow-2xl shadow-[#123b34]/15 rounded-full px-1.5 py-2 border border-[#e5dacb]"
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

          const className = `relative flex flex-col items-center justify-center flex-1 px-3 py-2 text-sm font-medium transition-colors duration-300 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c95e3d] rounded-full ${
            isActive ? "text-[#c95e3d]" : "text-[#4e5e57] hover:text-[#121a17]"
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
          className="absolute top-1.5 bottom-1.5 rounded-full bg-[#c95e3d]/10 border border-[#c95e3d]/20"
        />
      </div>
    </div>
  );
};

export default FloatingNav;
