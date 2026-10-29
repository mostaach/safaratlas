"use client";

import { FormEvent, useState, useEffect, CSSProperties } from "react";
import Image from "next/image";
import { Lead, leadStatuses, LeadStatus } from "../../lib/leadTypes";
import { PartnerApplication, PartnerStatus } from "../../lib/partnerStore";
import { ESCAPES_PACKAGES } from "../../data/mockData";
import {
  PARTNER_PROFILES,
  PARTNER_OFFERINGS,
  ESCAPE_RECIPES,
  calculateEscapeCostAndMargin,
  SupplyCategory,
  PartnerOffering,
} from "../../data/partnerCatalog";

type Tab = "dashboard" | "leads" | "escapes" | "partners" | "finance";

const leadLabels: Record<LeadStatus, string> = {
  new: "New Request",
  in_review: "In Review",
  proposal_sent: "Proposal Sent",
  deposit_paid: "Deposit Paid",
  booked: "Booked ✓",
  lost: "Lost",
  spam: "Spam",
};

const partnerStatusLabels: Record<PartnerStatus, string> = {
  pending: "Pending review",
  approved: "Approved",
  rejected: "Rejected",
  suspended: "Suspended",
};

const statusColor: Record<LeadStatus, string> = {
  new: "#3b82f6",
  in_review: "#8b5cf6",
  proposal_sent: "#f59e0b",
  deposit_paid: "#06b6d4",
  booked: "#10b981",
  lost: "#ef4444",
  spam: "#6b7280",
};

const navItems: { id: Tab; icon: string; label: string }[] = [
  { id: "dashboard", icon: "⊞", label: "HQ Command Center" },
  { id: "leads", icon: "📬", label: "Bookings Pipeline" },
  { id: "escapes", icon: "🐪", label: "Escapes Catalog" },
  { id: "partners", icon: "🤝", label: "Vetted Suppliers" },
  { id: "finance", icon: "📊", label: "Finance & Net Costs" },
];

// Style helpers
const navItemStyle = (active: boolean): CSSProperties => ({
  display: "flex", alignItems: "center", gap: 10, padding: "9px 20px", cursor: "pointer",
  background: active ? "#0d2239" : "transparent",
  borderLeft: active ? "2px solid #C4A258" : "2px solid transparent",
  color: active ? "#f6f2ec" : "rgba(246,242,236,0.6)", fontSize: 13, fontWeight: active ? 700 : 500,
  textDecoration: "none", transition: "all 0.15s",
});

const kpiCardStyle = (accent: boolean): CSSProperties => ({
  background: accent ? "linear-gradient(135deg,#0d2239,#16375A)" : "#0d2239",
  border: `1px solid ${accent ? "rgba(196,162,88,0.3)" : "rgba(255,255,255,0.08)"}`,
  borderRadius: 14, padding: "20px",
});

const kpiValueStyle = (accent: boolean): CSSProperties => ({
  fontSize: 28, fontWeight: 900, color: accent ? "#C4A258" : "#f6f2ec", lineHeight: 1,
});

const pillStyle = (color: string): CSSProperties => ({
  display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 10, fontWeight: 800,
  background: `${color}22`, color, border: `1px solid ${color}44`,
});

// Static styles
const page: CSSProperties = { display: "flex", minHeight: "100vh", background: "#07192d", fontFamily: "'Inter', -apple-system, sans-serif", color: "#f6f2ec" };
const sidebar: CSSProperties = { width: 220, background: "#051324", borderRight: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", flexShrink: 0 };
const sidebarHeader: CSSProperties = { padding: "24px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" };
const logoIcon: CSSProperties = { width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 };
const logoTitle: CSSProperties = { fontSize: 14, fontWeight: 800, color: "#f6f2ec", display: "block" };
const logoSub: CSSProperties = { fontSize: 10, color: "#C4A258", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" };
const sectionLabel: CSSProperties = { fontSize: 9, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "rgba(246,242,236,0.4)", padding: "16px 20px 6px" };
const mainStyle: CSSProperties = { flex: 1, display: "flex", flexDirection: "column", overflow: "auto" };
const topbar: CSSProperties = { padding: "16px 28px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "#07192d", display: "flex", alignItems: "center", justifyContent: "space-between" };
const content: CSSProperties = { padding: "28px", flex: 1 };
const kpiGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 16, marginBottom: 28 };
const kpiLabel: CSSProperties = { fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#C4A258", marginBottom: 8 };
const card: CSSProperties = { background: "#0d2239", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "20px 22px", marginBottom: 14 };
const cardId: CSSProperties = { fontFamily: "monospace", fontSize: 10, fontWeight: 700, color: "#C4A258", marginBottom: 4 };
const cardTitle: CSSProperties = { fontSize: 16, fontWeight: 800, color: "#f6f2ec", marginBottom: 3 };
const cardSub: CSSProperties = { fontSize: 12, color: "rgba(246,242,236,0.65)", marginBottom: 6 };
const cardMsg: CSSProperties = { fontSize: 12, color: "rgba(246,242,236,0.8)", lineHeight: 1.6, marginBottom: 6 };
const selectStyle: CSSProperties = { borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "#051324", color: "#f6f2ec", padding: "8px 10px", fontSize: 12, fontWeight: 700, outline: "none", width: "100%" };
const inputStyle: CSSProperties = { borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "#051324", color: "#f6f2ec", padding: "8px 10px", fontSize: 12, outline: "none", width: "100%" };
const statCard: CSSProperties = { background: "#0d2239", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "20px" };
const statLabel: CSSProperties = { fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#C4A258", margin: "0 0 8px" };
const statVal: CSSProperties = { fontSize: 24, fontWeight: 900, color: "#f6f2ec", margin: 0 };
const emptyState: CSSProperties = { textAlign: "center", padding: "60px 24px", color: "rgba(246,242,236,0.4)" };
const badge: CSSProperties = { background: "#C4A258", color: "#07192d", borderRadius: "50%", width: 18, height: 18, fontSize: 10, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" };

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [leadsError, setLeadsError] = useState("");
  const [now, setNow] = useState("");
  const [partnerCategoryFilter, setPartnerCategoryFilter] = useState<string>("all");
  const [selectedEscapeRecipe, setSelectedEscapeRecipe] = useState<string>("ESC-AGAFAY-VIP");
  const [simPartySize, setSimPartySize] = useState<number>(2);
  const [costOverrides, setCostOverrides] = useState<Record<string, number>>({});

  useEffect(() => {
    setNow(new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
  }, []);

  const loadAll = async (event?: FormEvent, isRefresh = false) => {
    event?.preventDefault();
    setAuthError("");
    if (isRefresh) setRefreshing(true); else setLoading(true);
    const cleanToken = token.trim();
    try {
      const [lr, ar] = await Promise.all([
        fetch("/api/leads", { headers: { authorization: `Bearer ${cleanToken}` }, cache: "no-store" }),
        fetch("/api/partner-applications", { headers: { authorization: `Bearer ${cleanToken}` }, cache: "no-store" }),
      ]);
      if (!lr.ok) {
        const d = await lr.json();
        setAuthError(d.error ?? "Invalid token.");
        return;
      }
      setAuthenticated(true);
      const [ld, ad] = await Promise.all([lr.json(), ar.ok ? ar.json() : Promise.resolve(null)]);
      setLeads(ld.leads ?? []);
      if (ad) setApplications(ad.applications ?? []);
    } catch {
      setAuthError("Network error — please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const updateLead = async (lead: Lead, changes: Partial<Lead>) => {
    const res = await fetch("/api/leads", {
      method: "PATCH",
      headers: { "content-type": "application/json", authorization: `Bearer ${token.trim()}` },
      body: JSON.stringify({ id: lead.id, status: lead.status, bookingValue: lead.bookingValue, commissionRate: lead.commissionRate, reconciliationStatus: lead.reconciliationStatus, ...changes }),
    });
    const data = await res.json();
    if (!res.ok) return setLeadsError(data.error ?? "Update failed.");
    setLeads(prev => prev.map(l => l.id === lead.id ? data.lead : l));
  };

  const updateApp = async (app: PartnerApplication, changes: Partial<PartnerApplication>) => {
    const res = await fetch("/api/partner-applications", {
      method: "PATCH",
      headers: { "content-type": "application/json", authorization: `Bearer ${token.trim()}` },
      body: JSON.stringify({ id: app.id, ...changes }),
    });
    const data = await res.json();
    if (res.ok) setApplications(prev => prev.map(a => a.id === app.id ? data.application : a));
  };

  const totalRevenue = leads.reduce((s, l) => s + (l.bookingValue ?? 0), 0);
  const totalMargin = leads.reduce((s, l) => s + (l.expectedMargin ?? 0), 0);
  const booked = leads.filter(l => l.status === "booked").length;
  const newLeads = leads.filter(l => l.status === "new").length;
  const pendingApps = applications.filter(a => a.status === "pending").length;

  if (!authenticated) {
    return (
      <div style={{ ...page, alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 400, padding: "40px", background: "#0d2239", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20 }}>
          <div style={{ ...logoIcon, width: 44, height: 44, marginBottom: 20 }}>
            <Image src="/safar-atlas-navbar.svg" alt="SafarAtlas" width={44} height={44} style={{ objectFit: "contain" }} priority />
          </div>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "#C4A258", marginBottom: 6 }}>SafarAtlas Internal</p>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "#f6f2ec", marginBottom: 4 }}>Operations Dashboard</h1>
          <p style={{ fontSize: 12, color: "rgba(246,242,236,0.6)", marginBottom: 24 }}>Enter your admin token to access the pipeline.</p>
          <form onSubmit={loadAll} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input value={token} onChange={e => setToken(e.target.value)} type="password" placeholder="ADMIN_API_TOKEN"
              style={{ ...inputStyle, padding: "13px 16px", fontSize: 14 }} />
            {authError && <p style={{ fontSize: 12, color: "#ef4444", fontWeight: 700 }}>{authError}</p>}
            <button style={{ background: "linear-gradient(135deg,#C4A258,#d8bb78)", border: "none", borderRadius: 10, color: "#07192d", fontWeight: 800, fontSize: 14, padding: "13px", cursor: "pointer" }}>
              {loading ? "Loading…" : "Open Pipeline →"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={page}>
      {/* Sidebar */}
      <nav style={sidebar}>
        <div style={sidebarHeader}>
          <div style={logoIcon}>
            <Image src="/safar-atlas-navbar.svg" alt="SafarAtlas" width={36} height={36} style={{ objectFit: "contain" }} priority />
          </div>
          <span style={logoTitle}>SafarAtlas</span>
          <span style={logoSub}>Operations OS</span>
        </div>
        <div style={sectionLabel}>Command Center</div>
        {navItems.map(item => (
          <a key={item.id} href="#" onClick={e => { e.preventDefault(); setTab(item.id); }} style={navItemStyle(tab === item.id)}>
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.id === "leads" && newLeads > 0 && <span style={badge}>{newLeads}</span>}
            {item.id === "partners" && pendingApps > 0 && <span style={badge}>{pendingApps}</span>}
          </a>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "16px 20px", borderTop: "1px solid #1e2e28" }}>
          <div style={{ fontSize: 9, color: "#3d5a50", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Contact</div>
          <p style={{ fontSize: 11, color: "#5a7a6e", margin: "0 0 3px" }}>contactsafaratlas@gmail.com</p>
          <p style={{ fontSize: 11, color: "#5a7a6e", margin: 0 }}>+212 698 017 323</p>
        </div>
      </nav>

      {/* Main */}
      <main style={mainStyle}>
        <header style={topbar}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: "#e8f0ed", margin: 0 }}>
              {tab === "dashboard" ? "Executive Dashboard" : tab === "leads" ? "Journey Requests" : "Partner Applications"}
            </h1>
            <p style={{ fontSize: 11, color: "#5a7a6e", margin: "2px 0 0" }}>{now}</p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              onClick={() => loadAll(undefined, true)}
              disabled={refreshing}
              style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #2a3e34", background: refreshing ? "#1a2e26" : "transparent", color: refreshing ? "#4ade80" : "#8aaba0", fontSize: 12, fontWeight: 700, cursor: refreshing ? "not-allowed" : "pointer", opacity: refreshing ? 0.8 : 1, transition: "all 0.2s" }}
            >
              {refreshing ? "⟳ Refreshing…" : "↺ Refresh"}
            </button>
            <span style={pillStyle("#10b981")}>● Live</span>
          </div>
        </header>

        <div style={content}>

          {/* DASHBOARD TAB */}
          {tab === "dashboard" && (
            <>
              <div style={kpiGrid}>
                {[
                  { label: "Total Leads", value: String(leads.length), accent: false },
                  { label: "Booked", value: String(booked), accent: true },
                  { label: "Revenue (€)", value: `€${totalRevenue.toLocaleString()}`, accent: false },
                  { label: "Margin (€)", value: `€${totalMargin.toFixed(0)}`, accent: true },
                  { label: "New Leads", value: String(newLeads), accent: false },
                  { label: "Partner Apps", value: String(applications.length), accent: false },
                ].map(kpi => (
                  <div key={kpi.label} style={kpiCardStyle(kpi.accent)}>
                    <p style={kpiLabel}>{kpi.label}</p>
                    <p style={kpiValueStyle(kpi.accent)}>{kpi.value}</p>
                  </div>
                ))}
              </div>

              <div style={{ ...card, marginBottom: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#5a7a6e", marginBottom: 16 }}>Pipeline Breakdown</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {leadStatuses.map(status => (
                    <div key={status} style={{ background: "#0a1410", border: "1px solid #1e2e28", borderRadius: 10, padding: "12px 16px", minWidth: 90 }}>
                      <div style={{ marginBottom: 6 }}><span style={pillStyle(statusColor[status])}>{leadLabels[status]}</span></div>
                      <p style={{ fontSize: 22, fontWeight: 900, color: "#e8f0ed", margin: 0 }}>{leads.filter(l => l.status === status).length}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#5a7a6e", marginBottom: 12 }}>Recent Journey Requests</p>
              {leads.length === 0
                ? <div style={emptyState}><p style={{ fontSize: 36, marginBottom: 12 }}>📬</p><p>No leads yet. Submit a test inquiry from the site.</p></div>
                : leads.slice(0, 5).map(lead => (
                  <div key={lead.id} style={{ ...card, display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <p style={cardId}>{lead.id}</p>
                      <p style={cardTitle}>{lead.travelerName} <span style={{ fontWeight: 400, color: "#6b8c7e" }}>— {lead.travelDates}</span></p>
                      <p style={cardSub}>{lead.groupSize} · {lead.email}</p>
                    </div>
                    <span style={pillStyle(statusColor[lead.status])}>{leadLabels[lead.status]}</span>
                  </div>
                ))
              }
            </>
          )}

          {/* LEADS TAB */}
          {tab === "leads" && (
            <>
              {leadsError && <p style={{ color: "#ef4444", fontWeight: 700, marginBottom: 12 }}>{leadsError}</p>}
              {leads.length === 0
                ? <div style={emptyState}><p style={{ fontSize: 36, marginBottom: 12 }}>📬</p><p>No journey requests yet.</p></div>
                : leads.map(lead => {
                    const cleanPhone = (lead.whatsapp || "").replace(/[^0-9]/g, "");
                    const waMessage = encodeURIComponent(`Hello ${lead.travelerName}, thank you for reaching out to SafarAtlas regarding your Morocco trip! We received your request (${lead.id}).`);
                    const waLink = cleanPhone ? `https://wa.me/${cleanPhone.startsWith('212') ? cleanPhone : '212' + cleanPhone.replace(/^0/, '')}?text=${waMessage}` : null;
                    const mailtoLink = `mailto:${lead.email}?subject=${encodeURIComponent(`SafarAtlas Journey Inquiry — ${lead.id}`)}&body=${encodeURIComponent(`Hi ${lead.travelerName},\n\nThank you for reaching out to SafarAtlas!`)}`;

                    return (
                      <div key={lead.id} style={card}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "space-between" }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                              <p style={{ ...cardId, margin: 0 }}>{lead.id}</p>
                              <span style={pillStyle(statusColor[lead.status])}>{leadLabels[lead.status]}</span>
                            </div>
                            <p style={cardTitle}>{lead.travelerName}</p>
                            <p style={cardSub}>{lead.email}{lead.whatsapp ? ` · ${lead.whatsapp}` : ""} · {lead.travelDates} · {lead.groupSize}</p>
                            <p style={cardMsg}>{lead.message}</p>
                            {lead.expectedMargin ? (
                              <p style={{ fontSize: 12, fontWeight: 700, color: "#4ade80", margin: "6px 0 0" }}>
                                Expected margin: €{lead.expectedMargin.toFixed(2)} (Val: €{lead.bookingValue} @ {lead.commissionRate}%)
                              </p>
                            ) : null}

                            {/* Action Buttons: 1-Click WhatsApp & Email */}
                            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                              {waLink && (
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 6,
                                    padding: "6px 12px",
                                    borderRadius: 8,
                                    background: "#25D366",
                                    color: "#fff",
                                    fontSize: 11,
                                    fontWeight: 800,
                                    textDecoration: "none",
                                  }}
                                >
                                  💬 Chat on WhatsApp
                                </a>
                              )}
                              <a
                                href={mailtoLink}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 6,
                                  padding: "6px 12px",
                                  borderRadius: 8,
                                  background: "#1e2e28",
                                  border: "1px solid #2a3e34",
                                  color: "#e8f0ed",
                                  fontSize: 11,
                                  fontWeight: 700,
                                  textDecoration: "none",
                                }}
                              >
                                ✉️ Email Traveler
                              </a>
                            </div>
                          </div>

                          <div style={{ display: "grid", gap: 8, minWidth: 200, alignContent: "start" }}>
                            <label style={{ fontSize: 10, fontWeight: 700, color: "#5a7a6e", textTransform: "uppercase" }}>Journey Status</label>
                            <select value={lead.status} onChange={e => updateLead(lead, { status: e.target.value as LeadStatus })} style={selectStyle}>
                              {leadStatuses.map(s => <option key={s} value={s}>{leadLabels[s]}</option>)}
                            </select>
                            
                            <label style={{ fontSize: 10, fontWeight: 700, color: "#5a7a6e", textTransform: "uppercase", marginTop: 4 }}>DMC Costing & Margin Engine</label>
                            <input type="number" min="0" placeholder="Selling price (€)" value={lead.bookingValue ?? ""}
                              onChange={e => updateLead(lead, { bookingValue: e.target.value === "" ? null : Number(e.target.value) })}
                              style={inputStyle} />
                            <input type="number" min="0" max="100" placeholder="Margin % (e.g. 20%)" value={lead.commissionRate ?? ""}
                              onChange={e => updateLead(lead, { commissionRate: e.target.value === "" ? null : Number(e.target.value) })}
                              style={inputStyle} />
                          </div>
                        </div>
                      </div>
                    );
                  })
              }
            </>
          )}

          {/* PARTNERS TAB: SUPPLY-SIDE CATALOG & PRICING ENGINE FOUNDATION */}
          {tab === "partners" && (() => {
            const liveBreakdown = calculateEscapeCostAndMargin(selectedEscapeRecipe, simPartySize, costOverrides);
            const filteredOfferings = partnerCategoryFilter === "all"
              ? PARTNER_OFFERINGS
              : PARTNER_OFFERINGS.filter(o => o.category === partnerCategoryFilter);

            const categories = [
              { id: "all", label: "All Offerings", icon: "✨" },
              { id: "accommodation", label: "Accommodation", icon: "🏨" },
              { id: "transport", label: "Transport", icon: "🚐" },
              { id: "activities", label: "Activities", icon: "🏜️" },
              { id: "food", label: "Food & Dining", icon: "🍲" },
              { id: "guides", label: "Guides & Specialists", icon: "🧗" },
              { id: "journey_support", label: "Journey Support", icon: "🛎️" },
            ];

            return (
              <div style={{ display: "grid", gap: 24 }}>
                {/* Header Banner */}
                <div style={{ background: "linear-gradient(135deg, #0d2239 0%, #16375A 100%)", border: "1px solid rgba(196,162,88,0.3)", borderRadius: 16, padding: "24px 28px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                    <div>
                      <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#C4A258" }}>
                        Partner Catalog v1 · Supply-Side Architecture
                      </span>
                      <h3 style={{ margin: "6px 0 4px", fontSize: 22, color: "#f6f2ec", fontWeight: 800 }}>
                        🤝 What Partners Can Supply → Escape & Journey Pricing
                      </h3>
                      <p style={{ margin: 0, fontSize: 13, color: "rgba(246,242,236,0.7)", maxWidth: 720, lineHeight: 1.5 }}>
                        Rather than static contacts, every partner is modeled as granular supply units: <strong>Partner → Offerings → Net Cost → SafarAtlas Price → Availability → Seasonality → Booking SLA</strong>. Changing a partner cost automatically recalculates Escape margins.
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                      <div style={{ background: "rgba(5,19,36,0.6)", padding: "10px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
                        <p style={{ margin: 0, fontSize: 10, color: "#C4A258", fontWeight: 700 }}>VETTED PARTNERS</p>
                        <p style={{ margin: 0, fontSize: 20, color: "#f6f2ec", fontWeight: 900 }}>{PARTNER_PROFILES.length}</p>
                      </div>
                      <div style={{ background: "rgba(5,19,36,0.6)", padding: "10px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
                        <p style={{ margin: 0, fontSize: 10, color: "#25D366", fontWeight: 700 }}>SUPPLY OFFERINGS</p>
                        <p style={{ margin: 0, fontSize: 20, color: "#f6f2ec", fontWeight: 900 }}>{PARTNER_OFFERINGS.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DYNAMIC PRICING ENGINE SIMULATOR */}
                <div style={{ background: "#091c30", border: "1px solid rgba(196,162,88,0.25)", borderRadius: 16, padding: "22px 24px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 18 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 14 }}>⚡</span>
                        <h4 style={{ margin: 0, fontSize: 16, color: "#C4A258", fontWeight: 800 }}>Dynamic Escape Pricing Recalculation Engine</h4>
                      </div>
                      <p style={{ margin: 0, fontSize: 12, color: "rgba(246,242,236,0.65)" }}>
                        Simulate what happens when a partner raises or lowers their wholesale rate. Watch internal net costs and margins recalculate live.
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div>
                        <label style={{ fontSize: 10, color: "rgba(246,242,236,0.6)", display: "block", marginBottom: 4, fontWeight: 700 }}>SELECT ESCAPE SKU</label>
                        <select
                          value={selectedEscapeRecipe}
                          onChange={(e) => setSelectedEscapeRecipe(e.target.value)}
                          style={{ ...selectStyle, width: 220 }}
                        >
                          {ESCAPE_RECIPES.map(r => (
                            <option key={r.escapeSku} value={r.escapeSku}>{r.title}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: 10, color: "rgba(246,242,236,0.6)", display: "block", marginBottom: 4, fontWeight: 700 }}>PARTY SIZE</label>
                        <select
                          value={simPartySize}
                          onChange={(e) => setSimPartySize(Number(e.target.value))}
                          style={{ ...selectStyle, width: 90 }}
                        >
                          {[1, 2, 4, 6].map(n => (
                            <option key={n} value={n}>{n} pax</option>
                          ))}
                        </select>
                      </div>
                      {Object.keys(costOverrides).length > 0 && (
                        <button
                          onClick={() => setCostOverrides({})}
                          style={{ padding: "8px 12px", background: "rgba(239,68,68,0.2)", border: "1px solid #ef444466", color: "#f87171", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", marginTop: 18 }}
                        >
                          Reset Costs
                        </button>
                      )}
                    </div>
                  </div>

                  {liveBreakdown && (
                    <div>
                      {/* Metric Ribbon */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 18 }}>
                        <div style={{ background: "#051324", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}>
                          <p style={{ margin: 0, fontSize: 9, color: "rgba(246,242,236,0.5)", fontWeight: 700, textTransform: "uppercase" }}>Retail Selling Price</p>
                          <p style={{ margin: "4px 0 0", fontSize: 18, color: "#f6f2ec", fontWeight: 800 }}>€{liveBreakdown.retailPricePerPersonEur} <span style={{ fontSize: 10, color: "rgba(246,242,236,0.4)" }}>/ pax</span></p>
                          <p style={{ margin: 0, fontSize: 10, color: "#C4A258" }}>Total: €{liveBreakdown.retailPriceTotalEur}</p>
                        </div>
                        <div style={{ background: "#051324", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}>
                          <p style={{ margin: 0, fontSize: 9, color: "rgba(246,242,236,0.5)", fontWeight: 700, textTransform: "uppercase" }}>Net Supplier Cost</p>
                          <p style={{ margin: "4px 0 0", fontSize: 18, color: "#38bdf8", fontWeight: 800 }}>€{liveBreakdown.netCostPerPersonEur} <span style={{ fontSize: 10, color: "rgba(246,242,236,0.4)" }}>/ pax</span></p>
                          <p style={{ margin: 0, fontSize: 10, color: "rgba(246,242,236,0.5)" }}>MAD {liveBreakdown.netCostTotalMad}</p>
                        </div>
                        <div style={{ background: "#051324", padding: "12px 14px", borderRadius: 10, border: `1px solid ${liveBreakdown.isMarginHealthy ? "rgba(37,211,102,0.3)" : "rgba(239,68,68,0.3)"}` }}>
                          <p style={{ margin: 0, fontSize: 9, color: "rgba(246,242,236,0.5)", fontWeight: 700, textTransform: "uppercase" }}>SafarAtlas Margin</p>
                          <p style={{ margin: "4px 0 0", fontSize: 18, color: liveBreakdown.isMarginHealthy ? "#4ade80" : "#f87171", fontWeight: 800 }}>
                            +{liveBreakdown.marginPct}%
                          </p>
                          <p style={{ margin: 0, fontSize: 10, color: liveBreakdown.isMarginHealthy ? "#4ade80" : "#f87171" }}>+€{liveBreakdown.grossMarginEur} profit</p>
                        </div>
                        <div style={{ background: "#051324", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                          <p style={{ margin: 0, fontSize: 9, color: "rgba(246,242,236,0.5)", fontWeight: 700, textTransform: "uppercase" }}>Safeguard Status</p>
                          <div style={{ marginTop: 4 }}>
                            {liveBreakdown.isMarginHealthy ? (
                              <span style={{ display: "inline-block", background: "#10b98122", color: "#10b981", border: "1px solid #10b98144", padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 800 }}>
                                Healthy (≥35%)
                              </span>
                            ) : (
                              <span style={{ display: "inline-block", background: "#ef444422", color: "#f87171", border: "1px solid #ef444444", padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 800 }}>
                                ⚠️ Below 35% Alert
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Offering Cost Breakdown Table with live inline edits */}
                      <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "left" }}>
                          <thead>
                            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#C4A258", fontSize: 10, textTransform: "uppercase" }}>
                              <th style={{ padding: "8px 6px" }}>Offering Supply Item</th>
                              <th style={{ padding: "8px 6px" }}>Partner Entity</th>
                              <th style={{ padding: "8px 6px" }}>Unit Type</th>
                              <th style={{ padding: "8px 6px" }}>Partner Wholesale Cost (MAD)</th>
                              <th style={{ padding: "8px 6px" }}>EUR Equiv.</th>
                              <th style={{ padding: "8px 6px" }}>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {liveBreakdown.items.map((item) => (
                              <tr key={item.offeringId} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                                <td style={{ padding: "10px 6px", color: "#f6f2ec", fontWeight: 600 }}>
                                  <span style={{ fontFamily: "monospace", fontSize: 10, color: "#C4A258", marginRight: 6 }}>{item.offeringId}</span>
                                  {item.title}
                                </td>
                                <td style={{ padding: "10px 6px", color: "rgba(246,242,236,0.6)" }}>{item.partnerName}</td>
                                <td style={{ padding: "10px 6px", color: "rgba(246,242,236,0.5)" }}>{item.unit.replace("_", " ")}</td>
                                <td style={{ padding: "10px 6px" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <input
                                      type="number"
                                      value={item.costMad}
                                      onChange={(e) => {
                                        const val = Number(e.target.value);
                                        setCostOverrides(prev => ({ ...prev, [item.offeringId]: val }));
                                      }}
                                      style={{ ...inputStyle, width: 80, padding: "4px 8px", fontSize: 12, fontWeight: 700 }}
                                    />
                                    <span style={{ fontSize: 10, color: "rgba(246,242,236,0.4)" }}>MAD</span>
                                  </div>
                                </td>
                                <td style={{ padding: "10px 6px", color: "#38bdf8", fontWeight: 700 }}>€{item.costEur}</td>
                                <td style={{ padding: "10px 6px" }}>
                                  {item.isOverridden ? (
                                    <span style={{ background: "#f59e0b22", color: "#f59e0b", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>Simulated</span>
                                  ) : (
                                    <span style={{ background: "rgba(255,255,255,0.05)", color: "rgba(246,242,236,0.4)", padding: "2px 6px", borderRadius: 4, fontSize: 10 }}>Standard</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                {/* CATEGORY SELECTOR */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setPartnerCategoryFilter(cat.id)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 20,
                        border: partnerCategoryFilter === cat.id ? "1px solid #C4A258" : "1px solid rgba(255,255,255,0.1)",
                        background: partnerCategoryFilter === cat.id ? "#0d2239" : "transparent",
                        color: partnerCategoryFilter === cat.id ? "#C4A258" : "rgba(246,242,236,0.7)",
                        fontSize: 12,
                        fontWeight: partnerCategoryFilter === cat.id ? 800 : 500,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        transition: "all 0.15s",
                      }}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>

                {/* MASTER OFFERINGS GRID */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
                  {filteredOfferings.map(off => (
                    <div key={off.offeringId} style={{ ...card, margin: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        {/* Top row */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                          <span style={{ fontFamily: "monospace", fontSize: 10, color: "#C4A258", fontWeight: 700 }}>
                            {off.offeringId}
                          </span>
                          <span style={{ fontSize: 10, background: "rgba(196,162,88,0.15)", color: "#C4A258", padding: "2px 8px", borderRadius: 12, fontWeight: 700 }}>
                            {off.subCategory}
                          </span>
                        </div>

                        {/* Title & Partner */}
                        <h4 style={{ margin: "0 0 4px", fontSize: 15, color: "#f6f2ec", fontWeight: 700 }}>{off.title}</h4>
                        <p style={{ margin: "0 0 10px", fontSize: 12, color: "#38bdf8", fontWeight: 600 }}>
                          🏢 {off.partnerName} · <span style={{ color: "rgba(246,242,236,0.5)" }}>{off.location}</span>
                        </p>

                        {/* Deliverables list */}
                        <ul style={{ margin: "0 0 14px", paddingLeft: 16, fontSize: 11, color: "rgba(246,242,236,0.75)", lineHeight: 1.5 }}>
                          {off.deliverables.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        {/* Financial Box */}
                        <div style={{ background: "#051324", borderRadius: 10, padding: "10px 12px", marginBottom: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 11, color: "rgba(246,242,236,0.5)" }}>Wholesale Cost:</span>
                            <span style={{ fontSize: 11, color: "#f6f2ec", fontWeight: 700 }}>
                              MAD {off.partnerCostMad} <span style={{ color: "rgba(246,242,236,0.4)" }}>(€{off.partnerCostEur})</span> / {off.costUnit.replace("_", " ")}
                            </span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 11, color: "rgba(246,242,236,0.5)" }}>SafarAtlas Price:</span>
                            <span style={{ fontSize: 11, color: "#C4A258", fontWeight: 700 }}>€{off.safarAtlasRetailEur}</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 4, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                            <span style={{ fontSize: 11, color: "rgba(246,242,236,0.5)" }}>Target Margin:</span>
                            <span style={{ fontSize: 11, color: "#4ade80", fontWeight: 800 }}>+{off.targetMarginPct}%</span>
                          </div>
                        </div>

                        {/* Operational Details */}
                        <div style={{ fontSize: 10, color: "rgba(246,242,236,0.5)", lineHeight: 1.4 }}>
                          <p style={{ margin: "0 0 3px" }}>🕒 <strong>Availability:</strong> {off.availability}</p>
                          <p style={{ margin: "0 0 3px" }}>☀️ <strong>Seasonality:</strong> {off.seasonality}</p>
                          <p style={{ margin: "0 0 3px" }}>📱 <strong>Booking:</strong> {off.bookingMethod} ({off.bookingSla})</p>
                          <p style={{ margin: 0 }}>↩️ <strong>Cancel:</strong> {off.cancellationPolicy}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* INBOUND PARTNER APPLICATIONS SECTION */}
                <div style={{ marginTop: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <h4 style={{ margin: 0, fontSize: 16, color: "#f6f2ec", fontWeight: 800 }}>
                      📬 Inbound Partner Applications ({applications.length})
                    </h4>
                    <span style={{ fontSize: 11, color: "rgba(246,242,236,0.4)" }}>Submitted via safaratlas.com/partners</span>
                  </div>

                  {applications.length === 0 ? (
                    <div style={{ ...card, textAlign: "center", padding: "30px 20px", color: "rgba(246,242,236,0.4)" }}>
                      <p style={{ fontSize: 24, margin: "0 0 8px" }}>🤝</p>
                      <p style={{ margin: 0, fontSize: 13 }}>No pending web partner applications. Core catalog v1 pre-loaded above.</p>
                    </div>
                  ) : (
                    applications.map(app => (
                      <div key={app.id} style={{ ...card, borderColor: app.status === "approved" ? "#10b98144" : app.status === "rejected" ? "#ef444444" : "#1e2e28" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "space-between" }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                              <p style={{ ...cardId, margin: 0 }}>{app.id}</p>
                              <span style={pillStyle(app.status === "approved" ? "#10b981" : app.status === "rejected" ? "#ef4444" : "#f59e0b")}>{partnerStatusLabels[app.status]}</span>
                            </div>
                            <p style={cardTitle}>{app.businessName}</p>
                            <p style={cardSub}>{app.category} · {app.location}</p>
                            <p style={cardMsg}>{app.description}</p>
                            <p style={{ fontSize: 12, color: "#6b8c7e", margin: 0 }}>👤 {app.contactName} · {app.email} · {app.whatsapp}</p>
                          </div>
                          <div style={{ display: "grid", gap: 8, minWidth: 200 }}>
                            <select value={app.status} onChange={e => updateApp(app, { status: e.target.value as PartnerStatus })} style={selectStyle}>
                              {(["pending", "approved", "rejected", "suspended"] as PartnerStatus[]).map(s => <option key={s} value={s}>{partnerStatusLabels[s]}</option>)}
                            </select>
                            <textarea placeholder="Admin notes…" value={app.adminNotes} rows={3}
                              onChange={e => updateApp(app, { adminNotes: e.target.value })}
                              style={{ ...inputStyle, resize: "vertical" }} />
                            <p style={{ fontSize: 10, color: "#3d5a50", margin: 0 }}>Applied {new Date(app.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })()}
          {/* ESCAPES CATALOG TAB */}
          {tab === "escapes" && (
            <div style={{ display: "grid", gap: 16 }}>
              <div style={{ background: "#15241e", border: "1px solid #1e362d", borderRadius: 16, padding: 20 }}>
                <h3 style={{ margin: "0 0 4px", fontSize: 18, color: "#e8f0ed" }}>🐪 Packaged Escapes Catalog</h3>
                <p style={{ margin: 0, fontSize: 12, color: "#6b8c7e" }}>Sellable 1–3 day journey modules managed by SafarAtlas.</p>
              </div>

              {ESCAPES_PACKAGES.map((pkg) => (
                <div key={pkg.id} style={card}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ flex: 1, minWidth: 240 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#C4A258" }}>{pkg.badge} · {pkg.location}</span>
                      <h4 style={{ margin: "4px 0", fontSize: 18, color: "#f6f2ec" }}>{pkg.title}</h4>
                      <p style={{ margin: "0 0 8px", fontSize: 12, color: "rgba(246,242,236,0.6)" }}>{pkg.summary}</p>
                      <p style={{ margin: 0, fontSize: 11, color: "#25D366" }}>Public Price: €{pkg.priceFromEur} / person · Duration: {pkg.duration}</p>
                    </div>
                    <a
                      href={`/escapes/${pkg.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: "8px 16px",
                        borderRadius: 8,
                        background: "#051324",
                        color: "#C4A258",
                        border: "1px solid rgba(196,162,88,0.3)",
                        fontSize: 12,
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      View Public Page →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FINANCE & NET COSTS TAB */}
          {tab === "finance" && (
            <div style={{ display: "grid", gap: 16 }}>
              <div style={{ background: "#15241e", border: "1px solid #1e362d", borderRadius: 16, padding: 20 }}>
                <h3 style={{ margin: "0 0 4px", fontSize: 18, color: "#e8f0ed" }}>📊 Finance & Net Costs Breakdown</h3>
                <p style={{ margin: 0, fontSize: 12, color: "#6b8c7e" }}>DMC Profitability, gross revenue, net supplier costs, and net margin tracking.</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                <div style={statCard}>
                  <p style={statLabel}>Total Confirmed Revenue</p>
                  <p style={statVal}>€{leads.filter(l => l.status === "booked" || l.status === "deposit_paid").reduce((s, l) => s + (l.bookingValue || 0), 0).toFixed(2)}</p>
                </div>
                <div style={statCard}>
                  <p style={statLabel}>Expected SafarAtlas Margin</p>
                  <p style={{ ...statVal, color: "#4ade80" }}>€{leads.reduce((s, l) => s + (l.expectedMargin || 0), 0).toFixed(2)}</p>
                </div>
                <div style={statCard}>
                  <p style={statLabel}>Active Leads Count</p>
                  <p style={statVal}>{leads.length}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
