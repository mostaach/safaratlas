"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { trackEvent } from "../../../lib/trackEvent";

const WHATSAPP_NUMBER = "212698017323";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi SafarAtlas! I'm coming from Instagram and would like help planning my Morocco trip.")}`;

export default function LinksPage() {
  useEffect(() => {
    trackEvent("page_view", { source: "link_in_bio" });
  }, []);

  return (
    <div className="min-h-screen bg-[#07192d] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Graphic */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#0a233f] to-transparent opacity-50 pointer-events-none" />
      
      <div className="w-full max-w-sm mx-auto z-10 flex flex-col items-center space-y-8">
        
        {/* Profile Header */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-white rounded-full p-4 shadow-2xl shadow-[#c6a476]/20">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 15 70 L 50 15 L 65 40" stroke="#c6a476" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 60 55 L 85 85 L 65 85" stroke="#c6a476" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 10 85 L 50 85 C 70 85, 70 60, 50 60 L 40 60 C 20 60, 20 40, 40 40 L 50 40 L 65 20" stroke="#0a233f" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-serif font-black tracking-tight text-white mt-4">SafarAtlas</h1>
            <p className="text-sm font-medium text-[#c6a476] uppercase tracking-widest mt-1">Morocco Escapes</p>
          </div>
        </div>

        {/* Links */}
        <div className="w-full space-y-4">
          
          <Link 
            href="/offers/agafay-vip"
            onClick={() => trackEvent("click_link_tree", { type: "agafay_offer" })}
            className="block w-full text-center py-4 px-6 rounded-2xl bg-gradient-to-r from-[#c6a476] to-[#b38a5a] text-white font-extrabold shadow-lg hover:scale-[1.02] transition-transform"
          >
            🔥 Book 1-Day Agafay VIP Escape
          </Link>

          <Link 
            href="/"
            onClick={() => trackEvent("click_link_tree", { type: "home_page" })}
            className="block w-full text-center py-4 px-6 rounded-2xl bg-[#1b2622] border border-[#2a5b50] text-white font-bold hover:bg-[#21302b] transition-colors"
          >
            🏕️ Explore All Escapes
          </Link>

          <a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click_link_tree", { type: "whatsapp_chat" })}
            className="block w-full text-center py-4 px-6 rounded-2xl bg-[#1b2622] border border-[#2a5b50] text-white font-bold hover:bg-[#21302b] transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-[#25D366]">💬</span> Chat with Concierge
          </a>

        </div>

        {/* Social Proof */}
        <div className="pt-4 text-center">
          <p className="text-xs text-white/50">
            Trusted by 40+ travelers in Morocco<br/>
            📍 Based in Marrakech
          </p>
        </div>

      </div>
    </div>
  );
}
