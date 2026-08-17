"use client";

import React, { useState, useEffect } from "react";
import { trackEvent } from "../../lib/trackEvent";
import { BusinessListing } from "../../data/mockData";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBusiness?: BusinessListing | null;
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

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, selectedBusiness }) => {
  const [step, setStep] = useState<"form" | "success">("form");
  const [leadReference, setLeadReference] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [formData, setFormData] = useState({
    ...initialForm,
    message: selectedBusiness
      ? `Hi! I would like to ask about availability and details for ${selectedBusiness.name}.`
      : "Hi! I am planning a trip to Morocco and would like local recommendations.",
  });

  useEffect(() => {
    if (isOpen) {
      trackEvent("lead_start", {
        partnerId: selectedBusiness?.id ?? "manual_match",
        partnerName: selectedBusiness?.name ?? "none",
      });
    }
  }, [isOpen, selectedBusiness]);

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmissionError("");
    const response = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
      partnerId: selectedBusiness?.id ?? null,
      partnerName: selectedBusiness?.name ?? "SafarAtlas manual match queue",
      listingName: selectedBusiness?.name ?? "Morocco travel recommendation",
      travelerName: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp,
      travelDates: formData.travelDates,
      groupSize: formData.groupSize,
      message: formData.message,
      consent: formData.consent,
    }) });
    const result = await response.json();
    if (!response.ok) {
      setSubmissionError(result.error ?? "We could not save your request. Please try again.");
      return;
    }
    setLeadReference(result.id);
    setStep("success");
    trackEvent("lead_submit", {
      leadId: result.id,
      partnerId: selectedBusiness?.id ?? "manual_match",
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
      <section aria-modal="true" aria-labelledby="inquiry-title" role="dialog" className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-cream shadow-2xl">
        <button onClick={handleClose} aria-label="Close inquiry form" className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-slate-900 hover:bg-slate-200">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {step === "form" ? (
          <>
            <header className="bg-gradient-to-r from-navy to-[#2a7b6c] p-6 pr-14 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">SafarAtlas inquiry</p>
              <h3 id="inquiry-title" className="mt-2 text-2xl font-black tracking-tight">
                {selectedBusiness ? `Ask ${selectedBusiness.name}` : "Find the right local expert"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/80">Share the important trip details. SafarAtlas will route your inquiry to the selected or most relevant verified provider. No payment or instant booking is involved.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              {selectedBusiness && (
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                  <img src={selectedBusiness.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
                  <div><p className="text-[10px] font-extrabold uppercase tracking-wide text-[#059669]">Verified partner</p><p className="text-sm font-bold text-slate-900">{selectedBusiness.name}</p><p className="text-xs text-slate-500">{selectedBusiness.location}</p></div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block text-[11px] font-extrabold uppercase text-slate-500">Name *<input required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} placeholder="Your name" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-gold" /></label>
                <label className="block text-[11px] font-extrabold uppercase text-slate-500">Email *<input required type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} placeholder="you@example.com" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-gold" /></label>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block text-[11px] font-extrabold uppercase text-slate-500">Dates or date range *<input required value={formData.travelDates} onChange={(event) => setFormData({ ...formData, travelDates: event.target.value })} placeholder="e.g. 12-19 October" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-gold" /></label>
                <label className="block text-[11px] font-extrabold uppercase text-slate-500">Group size<select value={formData.groupSize} onChange={(event) => setFormData({ ...formData, groupSize: event.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-gold"><option>Solo traveler</option><option>2 travelers</option><option>3-5 travelers</option><option>6+ travelers</option></select></label>
              </div>

              <label className="block text-[11px] font-extrabold uppercase text-slate-500">WhatsApp (optional)<input type="tel" value={formData.whatsapp} onChange={(event) => setFormData({ ...formData, whatsapp: event.target.value })} placeholder="International number" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-gold" /></label>
              <label className="block text-[11px] font-extrabold uppercase text-slate-500">What do you need? *<textarea required rows={4} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium normal-case outline-none focus:border-gold" /></label>
              <label className="flex cursor-pointer items-start gap-2 text-[11px] leading-relaxed text-slate-500"><input required checked={formData.consent} onChange={(event) => setFormData({ ...formData, consent: event.target.checked })} type="checkbox" className="mt-0.5 accent-navy" /><span>I agree that SafarAtlas may share these details with the relevant verified provider so they can respond to my inquiry.</span></label>

              <button type="submit" className="w-full rounded-xl bg-gold py-3.5 text-xs font-black text-white shadow-lg transition-all hover:bg-gold-dark">Send inquiry</button>
              {submissionError && <p className="text-center text-xs font-bold text-[#b42318]">{submissionError}</p>}
              <p className="text-center text-[10px] text-slate-500">This MVP does not take payment or promise live availability.</p>
            </form>
          </>
        ) : (
          <div className="p-8 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-[#10b981] bg-[#ecfdf5] text-lg font-black text-[#059669]">OK</div>
            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-[#059669]">Inquiry prepared</p>
            <h3 id="inquiry-title" className="mt-1 text-2xl font-black text-slate-900">Thank you, {formData.name}.</h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-500">Your request for {selectedBusiness ? selectedBusiness.name : "a Morocco experience"} has been saved and is ready for the pilot routing workflow.</p>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-left text-xs"><div className="flex justify-between gap-4"><span className="text-slate-500">Reference</span><strong className="font-mono text-slate-900">{leadReference}</strong></div><div className="mt-2 flex justify-between gap-4"><span className="text-slate-500">Travel dates</span><strong className="text-slate-900">{formData.travelDates}</strong></div><div className="mt-2 flex justify-between gap-4"><span className="text-slate-500">Group size</span><strong className="text-slate-900">{formData.groupSize}</strong></div></div>
            <button onClick={handleClose} className="mt-6 w-full rounded-xl bg-navy py-3 text-xs font-bold text-white hover:bg-navy-dark">Back to SafarAtlas</button>
          </div>
        )}
      </section>
    </div>
  );
};
