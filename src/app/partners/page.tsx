"use client";

import { FormEvent, useState } from "react";

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
    <main style={{ minHeight: "100vh", background: "#fcf8f1", fontFamily: "'Georgia', serif", color: "#17211d" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #194c43 0%, #0f2e27 100%)", padding: "80px 24px 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(201,94,61,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)" }} />
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <p style={{ margin: "0 0 16px", fontFamily: "Arial, sans-serif", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#c95e3d", fontWeight: 700 }}>SafarAtlas Partner Program</p>
          <h1 style={{ margin: "0 0 20px", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>
            Grow your Marrakech<br />travel business with us
          </h1>
          <p style={{ margin: "0 0 32px", fontSize: 18, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            Join our curated pilot of riads, guides, transfer operators, and experience providers serving international travelers.
          </p>
          <a href="#apply" style={{ display: "inline-block", background: "#c95e3d", color: "#fff", fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: 15, padding: "16px 36px", borderRadius: 12, textDecoration: "none", letterSpacing: 0.5 }}>
            Apply now — it&apos;s free →
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: "72px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 900, margin: "0 0 48px" }}>Why partner with SafarAtlas?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {benefits.map((b) => (
            <div key={b.title} style={{ background: "#fff", borderRadius: 16, padding: "28px 24px", border: "1px solid #e8ded0" }}>
              <p style={{ fontSize: 32, margin: "0 0 12px" }}>{b.icon}</p>
              <h3 style={{ fontFamily: "Arial, sans-serif", fontSize: 15, fontWeight: 700, margin: "0 0 8px", color: "#17211d" }}>{b.title}</h3>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#52615a", margin: 0, lineHeight: 1.6 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Application form */}
      <section id="apply" style={{ padding: "0 24px 96px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ background: "#fff", borderRadius: 24, border: "1px solid #e8ded0", padding: "clamp(28px, 5vw, 56px)", boxShadow: "0 8px 40px rgba(25,76,67,0.07)" }}>

          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <p style={{ fontSize: 56, margin: "0 0 16px" }}>🎉</p>
              <h2 style={{ fontSize: 28, fontWeight: 900, margin: "0 0 12px" }}>Application received!</h2>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: 15, color: "#52615a", margin: "0 0 8px" }}>
                Thank you for applying. We review all applications within <strong>3 business days</strong>.
              </p>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#a09a8f", margin: "0 0 32px" }}>Application ID: <strong style={{ fontFamily: "monospace", color: "#194c43" }}>{submittedId}</strong></p>
              <button onClick={() => { setForm(initialForm); setStatus("idle"); }} style={{ background: "#194c43", color: "#fff", fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: 14, padding: "14px 28px", borderRadius: 10, border: "none", cursor: "pointer" }}>
                Submit another application
              </button>
            </div>
          ) : (
            <>
              <p style={{ margin: "0 0 6px", fontFamily: "Arial, sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#c95e3d", fontWeight: 700 }}>Pilot application</p>
              <h2 style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 900 }}>Apply to become a partner</h2>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#52615a", margin: "0 0 36px", lineHeight: 1.6 }}>
                We manually review every application to ensure quality for travelers. Limited spots available for the Marrakech pilot.
              </p>

              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {/* Honeypot */}
                <input type="text" name="website_hp" value={form.website_hp} onChange={set("website_hp")} style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                {/* Category picker */}
                <fieldset style={{ border: "none", padding: 0, margin: "0 0 28px" }}>
                  <legend style={{ fontFamily: "Arial, sans-serif", fontSize: 12, fontWeight: 700, color: "#17211d", marginBottom: 12 }}>Business category <span style={{ color: "#c95e3d" }}>*</span></legend>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
                    {categories.map((cat) => (
                      <label key={cat.value} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, border: `2px solid ${form.category === cat.value ? "#194c43" : "#e8ded0"}`, background: form.category === cat.value ? "#f0f7f5" : "#fff", cursor: "pointer", transition: "all 0.15s" }}>
                        <input type="radio" name="category" value={cat.value} checked={form.category === cat.value} onChange={set("category")} style={{ display: "none" }} />
                        <span style={{ fontSize: 18 }}>{cat.icon}</span>
                        <span style={{ fontFamily: "Arial, sans-serif", fontSize: 12, fontWeight: 600, color: form.category === cat.value ? "#194c43" : "#52615a" }}>{cat.label}</span>
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
                        <option value="">Select…</option>
                        <option value="Less than 1 year">Less than 1 year</option>
                        <option value="1–3 years">1–3 years</option>
                        <option value="3–5 years">3–5 years</option>
                        <option value="5–10 years">5–10 years</option>
                        <option value="10+ years">10+ years</option>
                      </select>
                    </Field>
                    <Field label="Price range (per person / per service)">
                      <select value={form.priceRange} onChange={set("priceRange")} style={inputStyle}>
                        <option value="">Select…</option>
                        <option value="Budget (€0–50)">Budget (€0–50)</option>
                        <option value="Mid-range (€50–150)">Mid-range (€50–150)</option>
                        <option value="Premium (€150–400)">Premium (€150–400)</option>
                        <option value="Luxury (€400+)">Luxury (€400+)</option>
                      </select>
                    </Field>
                  </Row>
                  <Field label="Languages spoken" fullWidth>
                    <input value={form.languages} onChange={set("languages")} placeholder="e.g. English, French, Arabic, Spanish" style={inputStyle} />
                  </Field>
                </Section>

                {errorMsg && (
                  <p style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#b42318", fontWeight: 700, margin: "0 0 16px", padding: "12px 16px", background: "#fff0ee", borderRadius: 8, border: "1px solid #fecaca" }}>{errorMsg}</p>
                )}

                <button type="submit" disabled={status === "submitting"} style={{ background: status === "submitting" ? "#52615a" : "#c95e3d", color: "#fff", fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: 15, padding: "18px 32px", borderRadius: 12, border: "none", cursor: status === "submitting" ? "not-allowed" : "pointer", transition: "background 0.2s", letterSpacing: 0.5 }}>
                  {status === "submitting" ? "Submitting…" : "Submit application →"}
                </button>

                <p style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#a09a8f", margin: "16px 0 0", textAlign: "center", lineHeight: 1.5 }}>
                  We respect your privacy. Your details are only used to evaluate your application and will never be sold or shared.
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

// ── Small layout helpers ────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontFamily: "Arial, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#194c43", margin: "0 0 16px", paddingBottom: 10, borderBottom: "1px solid #e8ded0" }}>{title}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>{children}</div>;
}

function Field({ label, required, children, fullWidth }: { label: string; required?: boolean; children: React.ReactNode; fullWidth?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, gridColumn: fullWidth ? "1/-1" : undefined }}>
      <label style={{ fontFamily: "Arial, sans-serif", fontSize: 12, fontWeight: 700, color: "#17211d" }}>
        {label} {required && <span style={{ color: "#c95e3d" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  fontSize: 14,
  color: "#17211d",
  background: "#fff",
  border: "1.5px solid #e8ded0",
  borderRadius: 10,
  padding: "12px 14px",
  width: "100%",
  outline: "none",
  boxSizing: "border-box",
};
