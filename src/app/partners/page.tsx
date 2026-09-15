"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "../../components/brand/Header";
import { Footer } from "../../components/brand/Footer";

type Category = "airport_transfer" | "riad" | "desert_trip" | "guided_tour" | "activity" | "restaurant" | "other";

const categories: { value: Category; label: string; icon: string }[] = [
  { value: "airport_transfer", label: "Airport Transfer", icon: "🚐" },
  { value: "riad", label: "Riad / Accommodation", icon: "🏰" },
  { value: "desert_trip", label: "Desert Trip", icon: "🐪" },
  { value: "guided_tour", label: "Guided Tour", icon: "🗺️" },
  { value: "activity", label: "Activity / Experience", icon: "🏄" },
  { value: "restaurant", label: "Restaurant", icon: "🍽️" },
  { value: "other", label: "Other", icon: "✨" },
];

const benefits = [
  { icon: "📬", title: "Qualified leads delivered", desc: "Receive traveler inquiries directly — no middlemen, no bidding wars." },
  { icon: "⚡", title: "24-hour response SLA", desc: "Fast-response partners get priority placement and more bookings." },
  { icon: "🤝", title: "No upfront fees", desc: "Pilot partners pay a commission only when a booking is confirmed." },
  { icon: "🌍", title: "International reach", desc: "Connect with travelers from Europe, North America, and beyond." },
];

const initialForm = {
  businessName: "",
  category: "" as Category | "",
  website: "",
  description: "",
  location: "",
  contactName: "",
  email: "",
  whatsapp: "",
  yearsInBusiness: "",
  languages: "",
  priceRange: "",
  website_hp: "", // honeypot
};

export default function PartnersPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedId, setSubmittedId] = useState("");

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.category) { setErrorMsg("Please select a business category."); return; }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/partner-applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setStatus("error"); setErrorMsg(data.error ?? "Something went wrong."); return; }
      setSubmittedId(data.id);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#07192d] text-[#f6f2ec]">
      {/* Global Navigation Header */}
      <Header variant="dark" />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 text-center overflow-hidden bg-gradient-to-b from-[#07192d] to-[#0d2239]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,162,88,0.1)_0%,transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto space-y-5">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#C4A258] font-bold">
            SafarAtlas Partner Program
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-[#f6f2ec] leading-tight">
            Grow your Marrakech<br />travel business with us
          </h1>
          <p className="text-base text-[#f6f2ec]/70 max-w-lg mx-auto leading-relaxed">
            Join our curated pilot of riads, guides, transfer operators, and experience providers serving international travelers.
          </p>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 bg-[#C4A258] hover:bg-[#d8bb78] text-[#07192d] font-bold text-xs uppercase tracking-[0.3em] px-8 py-4 rounded-xl shadow-lg transition-all"
          >
            Apply now — it&apos;s free →
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl font-serif font-bold text-[#f6f2ec] mb-12">
          Why partner with SafarAtlas?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="p-6 rounded-2xl bg-[#0d2239]/80 backdrop-blur-md border border-white/10 space-y-3">
              <p className="text-3xl">{b.icon}</p>
              <h3 className="text-sm font-serif font-bold text-[#f6f2ec] uppercase tracking-wide">{b.title}</h3>
              <p className="text-xs text-[#f6f2ec]/70 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="py-12 px-6 max-w-3xl mx-auto pb-24">
        <div className="bg-[#0d2239]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 sm:p-14 shadow-2xl">

          {status === "success" ? (
            <div className="text-center py-8 space-y-4">
              <p className="text-5xl">🎉</p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f6f2ec]">Application received!</h2>
              <p className="text-sm text-[#f6f2ec]/70">
                Thank you for applying. We review all applications within <strong>3 business days</strong>.
              </p>
              <p className="text-xs text-[#f6f2ec]/50">
                Application ID: <strong className="font-mono text-[#C4A258]">{submittedId}</strong>
              </p>
              <button
                onClick={() => { setForm(initialForm); setStatus("idle"); }}
                className="mt-4 px-6 py-3 bg-[#C4A258] text-[#07192d] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#d8bb78] transition-all"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#C4A258] mb-2">Pilot application</p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f6f2ec] mb-2">Apply to become a partner</h2>
              <p className="text-xs sm:text-sm text-[#f6f2ec]/70 mb-8 leading-relaxed">
                We manually review every application to ensure quality for travelers. Limited spots available for the Marrakech pilot.
              </p>

              <form onSubmit={submit} className="flex flex-col gap-6">
                {/* Honeypot */}
                <input type="text" name="website_hp" value={form.website_hp} onChange={set("website_hp")} style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                {/* Category picker */}
                <fieldset className="border-none p-0 m-0">
                  <legend className="text-xs font-bold uppercase tracking-wider text-[#C4A258] mb-3">
                    Business category <span className="text-[#C4A258]">*</span>
                  </legend>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                    {categories.map((cat) => (
                      <label
                        key={cat.value}
                        className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                          form.category === cat.value
                            ? "border-[#C4A258] bg-[#C4A258]/15 text-[#C4A258]"
                            : "border-white/10 bg-white/5 text-[#f6f2ec]/70 hover:border-white/25"
                        }`}
                      >
                        <input type="radio" name="category" value={cat.value} checked={form.category === cat.value} onChange={set("category")} className="hidden" />
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-xs font-semibold">{cat.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Business info */}
                <Section title="Business information">
                  <Row>
                    <Field label="Business name" required><input required value={form.businessName} onChange={set("businessName")} placeholder="e.g. Riad Al Nour" style={inputStyle} /></Field>
                    <Field label="Location in Marrakech" required><input required value={form.location} onChange={set("location")} placeholder="e.g. Medina, Gueliz" style={inputStyle} /></Field>
                  </Row>
                  <Field label="Website or social media" fullWidth><input value={form.website} onChange={set("website")} placeholder="https://" style={inputStyle} /></Field>
                  <Field label="Brief description of your services" required fullWidth>
                    <textarea required value={form.description} onChange={set("description")} placeholder="Tell us what makes your service special for international travelers..." rows={4} style={{ ...inputStyle, resize: "vertical" }} />
                  </Field>
                </Section>

                {/* Contact */}
                <Section title="Contact details">
                  <Row>
                    <Field label="Your name" required><input required value={form.contactName} onChange={set("contactName")} placeholder="Full name" style={inputStyle} /></Field>
                    <Field label="Email address" required><input required type="email" value={form.email} onChange={set("email")} placeholder="you@business.com" style={inputStyle} /></Field>
                  </Row>
                  <Field label="WhatsApp number (with country code)" required>
                    <input required value={form.whatsapp} onChange={set("whatsapp")} placeholder="+212 6XX XXX XXX" style={inputStyle} />
                  </Field>
                </Section>

                {/* Commercial */}
                <Section title="About your business">
                  <Row>
                    <Field label="Years in business">
                      <select value={form.yearsInBusiness} onChange={set("yearsInBusiness")} style={inputStyle}>
                        <option value="" className="bg-[#07192d] text-[#f6f2ec]">Select…</option>
                        <option value="Less than 1 year" className="bg-[#07192d] text-[#f6f2ec]">Less than 1 year</option>
                        <option value="1–3 years" className="bg-[#07192d] text-[#f6f2ec]">1–3 years</option>
                        <option value="3–5 years" className="bg-[#07192d] text-[#f6f2ec]">3–5 years</option>
                        <option value="5–10 years" className="bg-[#07192d] text-[#f6f2ec]">5–10 years</option>
                        <option value="10+ years" className="bg-[#07192d] text-[#f6f2ec]">10+ years</option>
                      </select>
                    </Field>
                    <Field label="Price range (per person / per service)">
                      <select value={form.priceRange} onChange={set("priceRange")} style={inputStyle}>
                        <option value="" className="bg-[#07192d] text-[#f6f2ec]">Select…</option>
                        <option value="Budget (€0–50)" className="bg-[#07192d] text-[#f6f2ec]">Budget (€0–50)</option>
                        <option value="Mid-range (€50–150)" className="bg-[#07192d] text-[#f6f2ec]">Mid-range (€50–150)</option>
                        <option value="Premium (€150–400)" className="bg-[#07192d] text-[#f6f2ec]">Premium (€150–400)</option>
                        <option value="Luxury (€400+)" className="bg-[#07192d] text-[#f6f2ec]">Luxury (€400+)</option>
                      </select>
                    </Field>
                  </Row>
                  <Field label="Languages spoken" fullWidth>
                    <input value={form.languages} onChange={set("languages")} placeholder="e.g. English, French, Arabic, Spanish" style={inputStyle} />
                  </Field>
                </Section>

                {errorMsg && (
                  <p className="text-xs text-[#f87171] font-bold p-3 bg-red-950/40 rounded-xl border border-red-800/40">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4 bg-[#C4A258] hover:bg-[#d8bb78] text-[#07192d] font-black text-xs uppercase tracking-[0.3em] transition-all rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Submitting…" : "Submit application →"}
                </button>

                <p className="text-[11px] text-[#f6f2ec]/40 text-center leading-relaxed">
                  We respect your privacy. Your details are only used to evaluate your application and will never be sold or shared.
                </p>
              </form>
            </>
          )}
        </div>
      </section>

      {/* Global Brand Footer */}
      <Footer />
    </main>
  );
}

// ── Small layout helpers ────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <p className="text-[11px] font-extrabold tracking-[0.25em] uppercase text-[#C4A258] pb-2 border-b border-white/10">{title}</p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

function Field({ label, required, children, fullWidth }: { label: string; required?: boolean; children: React.ReactNode; fullWidth?: boolean }) {
  return (
    <div className={`space-y-1.5 ${fullWidth ? "col-span-full" : ""}`}>
      <label className="text-xs font-semibold text-[#f6f2ec]/85 block">
        {label} {required && <span className="text-[#C4A258]">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans), sans-serif",
  fontSize: 14,
  color: "#f6f2ec",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  borderRadius: 12,
  padding: "12px 14px",
  width: "100%",
  outline: "none",
  boxSizing: "border-box",
};
