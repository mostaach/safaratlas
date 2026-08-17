"use client";

import React, { useState, useEffect } from "react";
import { trackEvent } from "../../lib/trackEvent";
import { BusinessListing } from "../../data/mockData";
import { VerifiedBadge } from "../brand/VerifiedBadge";

interface ListingDetailModalProps {
  business: BusinessListing | null;
  onClose: () => void;
  onInquire: (business: BusinessListing) => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({ business, onClose, onInquire }) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (business) {
      trackEvent("listing_view", {
        partnerId: business.id,
        partnerName: business.name,
      });
    }
  }, [business]);

  if (!business) return null;

  const images = business.gallery.length ? business.gallery : [business.image];
  const whatsappUrl = `https://wa.me/${business.contactWhatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${business.name}, I found you on SafarAtlas and would like to ask about availability.`)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" role="presentation">
      <section aria-modal="true" aria-labelledby="listing-title" role="dialog" className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-cream shadow-2xl">
        <button onClick={onClose} aria-label="Close listing details" className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-slate-900 hover:bg-white"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        <div className="relative h-64 sm:h-80"><img src={images[imageIndex]} alt={business.name} className="h-full w-full object-cover" /><span className="absolute bottom-4 left-4 rounded-full bg-navy px-3 py-1 text-xs font-black text-accent">{business.priceRange}</span>{images.length > 1 && <div className="absolute bottom-4 right-4 flex gap-1.5 rounded-full bg-black/40 p-1.5">{images.map((_, index) => <button key={index} onClick={() => setImageIndex(index)} aria-label={`View image ${index + 1}`} className={`h-2 w-2 rounded-full ${index === imageIndex ? "w-5 bg-white" : "bg-white/60"}`} />)}</div>}</div>
        <div className="space-y-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3"><div><VerifiedBadge type={business.verifiedBadgeType} size="sm" /><h2 id="listing-title" className="mt-3 text-3xl font-black tracking-tight text-slate-900">{business.name}</h2><p className="mt-1 text-sm font-medium text-slate-500">{business.category} in {business.location}</p></div><div className="rounded-xl bg-[#fffbeb] px-3 py-2 text-sm font-bold text-[#a16207]">{business.rating}/5 <span className="text-xs font-medium">({business.reviewCount} reviews)</span></div></div>
          <p className="text-sm leading-relaxed text-slate-500">{business.fullDesc}</p>
          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-3"><div><p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Location</p><p className="mt-1 text-sm font-bold text-slate-900">{business.location}</p></div><div><p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Response time</p><p className="mt-1 text-sm font-bold text-slate-900">{business.responseTime}</p></div><div><p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Contact</p><p className="mt-1 text-sm font-bold text-slate-900">Request availability</p></div></div>
          <div><h3 className="text-sm font-black text-slate-900">What this provider offers</h3><div className="mt-3 flex flex-wrap gap-2">{business.amenities.map((amenity) => <span key={amenity} className="rounded-lg bg-cream-dark px-3 py-1.5 text-xs font-semibold text-slate-700">{amenity}</span>)}</div></div>
          <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row"><a href={whatsappUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-navy/20 px-5 py-3 text-center text-xs font-bold text-navy hover:bg-navy-tint">WhatsApp provider</a><button onClick={() => onInquire(business)} className="flex-1 rounded-xl bg-gold px-5 py-3 text-xs font-black text-white hover:bg-gold-dark">Send inquiry</button></div>
          <p className="text-center text-[10px] text-slate-500">Prices and availability are confirmed directly by the provider.</p>
        </div>
      </section>
    </div>
  );
};
