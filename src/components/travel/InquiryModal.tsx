"use client";

import React, { useState, useEffect } from "react";
import { trackEvent } from "../../lib/trackEvent";
import { BusinessListing, EscapePackage } from "../../data/mockData";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBusiness?: BusinessListing | null;
  selectedEscape?: EscapePackage | null;
}

const initialForm = {
  name: "",
  email: "",
  whatsapp: "",
  travelDates: "",
  groupSize: "2 travelers",
  message: "",
  consent: false,
};

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  selectedBusiness,
  selectedEscape,
}) => {
  const [step, setStep] = useState<"form" | "success">("form");
  const [leadReference, setLeadReference] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  
  const getInitialMessage = () => {
    if (selectedEscape) {
      return `Hi! I would like to include the ${selectedEscape.title} (${selectedEscape.duration}) in my Morocco journey.`;
    }
    if (selectedBusiness) {
      return `Hi! I would like to ask about availability and details for ${selectedBusiness.name}.`;
    }
    return "Hi! I am planning a trip to Morocco and would like SafarAtlas to manage my journey, including transport, stays, and local experiences.";
  };

  const [formData, setFormData] = useState({
    ...initialForm,
    message: getInitialMessage(),
  });

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        message: getInitialMessage(),
      }));

      trackEvent("lead_start", {
        partnerId: selectedEscape?.id ?? selectedBusiness?.id ?? "manual_match",
        partnerName: selectedEscape?.title ?? selectedBusiness?.name ?? "journey_builder",
      });
    }
  }, [isOpen, selectedBusiness, selectedEscape]);

  if (!isOpen) return null;

  const itemName = selectedEscape?.title ?? selectedBusiness?.name ?? "Custom Morocco Journey";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmissionError("");

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        partnerId: selectedEscape?.id ?? selectedBusiness?.id ?? null,
        partnerName: itemName,
        listingName: itemName,
        travelerName: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        travelDates: formData.travelDates,
        groupSize: formData.groupSize,
        message: formData.message,
        consent: formData.consent,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      setSubmissionError(result.error ?? "We could not save your request. Please try again.");
      return;
    }

    setLeadReference(result.id);
    setStep("success");
    trackEvent("lead_submit", {
      leadId: result.id,
      partnerId: selectedEscape?.id ?? selectedBusiness?.id ?? "manual_match",
      groupSize: formData.groupSize,
    });
  };

  const handleClose = () => {
    setStep("form");
    setLeadReference("");
    setSubmissionError("");
    setFormData(initialForm);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" role="presentation">
      <section aria-modal="true" aria-labelledby="inquiry-title" role="dialog" className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-[#faf6f0] shadow-2xl">
        
        {/* Close Button */}
        <button onClick={handleClose} aria-label="Close inquiry form" className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-slate-900 hover:bg-slate-200 cursor-pointer">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {step === "form" ? (
          <>
            <header className="bg-gradient-to-r from-[#123b34] to-[#1e5a4e] p-6 pr-14 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-[#f4c36b]">SafarAtlas Journey Builder</p>
              <h3 id="inquiry-title" className="mt-2 text-2xl font-black tracking-tight">
                {selectedEscape ? `Add ${selectedEscape.title}` : selectedBusiness ? `Inquire: ${selectedBusiness.name}` : "Build My Morocco Journey"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/80">
                {selectedEscape
                  ? "Insert this Escape module into your custom trip. SafarAtlas will organize all local transfers, camps, and guides under one transparent quote."
                  : "Tell us your dates and vision. SafarAtlas manages your full trip combining ready-made Escapes and verified local partners."}
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              
              {/* Selected Escape Item Banner */}
              {selectedEscape && (
                <div className="flex items-center gap-3 rounded-2xl border border-[#e5dacb] bg-white p-3 shadow-sm">
                  <img src={selectedEscape.image} alt={selectedEscape.title} className="h-14 w-14 rounded-xl object-cover" />
                  <div className="flex-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wide text-[#c95e3d]">Packaged Escape Module</span>
                    <p className="text-sm font-bold text-[#121a17]">{selectedEscape.title}</p>
                    <p className="text-xs text-[#4e5e57]">{selectedEscape.duration} · From €{selectedEscape.priceFromEur} / person</p>
                  </div>
                </div>
              )}

              {/* Selected Partner Item Banner */}
              {selectedBusiness && !selectedEscape && (
                <div className="flex items-center gap-3 rounded-2xl border border-[#e5dacb] bg-white p-3 shadow-sm">
                  <img src={selectedBusiness.image} alt={selectedBusiness.name} className="h-12 w-12 rounded-xl object-cover" />
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#059669]">Verified Partner</p>
                    <p className="text-sm font-bold text-[#121a17]">{selectedBusiness.name}</p>
                    <p className="text-xs text-[#4e5e57]">{selectedBusiness.location}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">Full Name *
                  <input required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} placeholder="Your name" className="mt-1.5 w-full rounded-xl border border-[#e5dacb] bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]" />
                </label>
                <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">Email Address *
                  <input required type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} placeholder="you@example.com" className="mt-1.5 w-full rounded-xl border border-[#e5dacb] bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]" />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">Travel Dates *
                  <input required value={formData.travelDates} onChange={(event) => setFormData({ ...formData, travelDates: event.target.value })} placeholder="e.g. 12-19 October" className="mt-1.5 w-full rounded-xl border border-[#e5dacb] bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]" />
                </label>
                <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">Group Size
                  <select value={formData.groupSize} onChange={(event) => setFormData({ ...formData, groupSize: event.target.value })} className="mt-1.5 w-full rounded-xl border border-[#e5dacb] bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]">
                    <option>Solo traveler</option>
                    <option>2 travelers</option>
                    <option>3-5 travelers</option>
                    <option>6+ travelers</option>
                  </select>
                </label>
              </div>

              <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">WhatsApp (optional for quick quotes)
                <input type="tel" value={formData.whatsapp} onChange={(event) => setFormData({ ...formData, whatsapp: event.target.value })} placeholder="+1 / +44 / +212..." className="mt-1.5 w-full rounded-xl border border-[#e5dacb] bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]" />
              </label>

              <label className="block text-[11px] font-extrabold uppercase text-[#4e5e57]">Trip details & preferences *
                <textarea required rows={4} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} className="mt-1.5 w-full resize-none rounded-xl border border-[#e5dacb] bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-[#c95e3d]" />
              </label>

              <label className="flex cursor-pointer items-start gap-2 text-[11px] leading-relaxed text-[#4e5e57]">
                <input required checked={formData.consent} onChange={(event) => setFormData({ ...formData, consent: event.target.checked })} type="checkbox" className="mt-0.5 accent-[#123b34]" />
                <span>I agree that SafarAtlas may process my inquiry to provide a managed travel quote with verified local partners.</span>
              </label>

              <button type="submit" className="w-full cursor-pointer rounded-xl bg-[#c95e3d] hover:bg-[#aa4a2c] py-3.5 text-xs font-black text-white shadow-lg transition-all">
                Submit Journey Request →
              </button>

              {submissionError && <p className="text-center text-xs font-bold text-[#b42318]">{submissionError}</p>}
              <p className="text-center text-[10px] text-[#4e5e57]">One point of contact · Zero upfront fees · Custom managed itinerary</p>
            </form>
          </>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-[#10b981] bg-[#ecfdf5] text-lg font-black text-[#059669]">
              ✓
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#059669]">Journey Request Received</p>
            <h3 className="text-2xl font-black text-[#121a17]">Thank you, {formData.name}!</h3>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-[#4e5e57]">
              Your request for <strong>{itemName}</strong> has been saved. Our team will review your dates and craft your managed Morocco itinerary quote.
            </p>
            <div className="rounded-2xl border border-[#e5dacb] bg-white p-4 text-left text-xs space-y-2">
              <div className="flex justify-between gap-4"><span className="text-[#4e5e57]">Reference Code</span><strong className="font-mono text-[#123b34]">{leadReference}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-[#4e5e57]">Travel Dates</span><strong className="text-[#121a17]">{formData.travelDates}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-[#4e5e57]">Group Size</span><strong className="text-[#121a17]">{formData.groupSize}</strong></div>
            </div>
            <button onClick={handleClose} className="w-full rounded-xl bg-[#123b34] py-3 text-xs font-bold text-white hover:bg-[#0b110f] cursor-pointer">
              Back to SafarAtlas
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
