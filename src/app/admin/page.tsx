"use client";

import { FormEvent, useState, useEffect, CSSProperties } from "react";
import { Lead, leadStatuses, LeadStatus } from "../../lib/leadTypes";
import { PartnerApplication, PartnerStatus } from "../../lib/partnerStore";

type Tab = "dashboard" | "leads" | "partners";

const leadLabels: Record<LeadStatus, string> = {
  new: "New",
  routed: "Routed",
  partner_replied: "Partner replied",
  quote_sent: "Quote sent",
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
  routed: "#8b5cf6",
  partner_replied: "#f59e0b",
  quote_sent: "#06b6d4",
  booked: "#10b981",
  lost: "#ef4444",
  spam: "#6b7280",
};

const navItems: { id: Tab; icon: string; label: string }[] = [
  { id: "dashboard", icon: "⊞", label: "Dashboard" },
  { id: "leads", icon: "📬", label: "Journey Requests" },
  { id: "partners", icon: "🤝", label: "Partner Applications" },
];

// Style helpers
const navItemStyle = (active: boolean): CSSProperties => ({
  display: "flex", alignItems: "center", gap: 10, padding: "9px 20px", cursor: "pointer",
  background: active ? "#1a2e26" : "transparent",
  borderLeft: active ? "2px solid #c95e3d" : "2px solid transparent",
  color: active ? "#e8f0ed" : "#6b8c7e", fontSize: 13, fontWeight: active ? 700 : 500,
  textDecoration: "none", transition: "all 0.15s",
});

const kpiCardStyle = (accent: boolean): CSSProperties => ({
  background: accent ? "linear-gradient(135deg,#1a3a2e,#0f2a20)" : "#111e18",
  border: `1px solid ${accent ? "#2a5040" : "#1e2e28"}`,
  borderRadius: 14, padding: "20px",
});

const kpiValueStyle = (accent: boolean): CSSProperties => ({
  fontSize: 28, fontWeight: 900, color: accent ? "#4ade80" : "#e8f0ed", lineHeight: 1,
});

const pillStyle = (color: string): CSSProperties => ({
  display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 10, fontWeight: 800,
  background: `${color}22`, color, border: `1px solid ${color}44`,
});

// Static styles
const page: CSSProperties = { display: "flex", minHeight: "100vh", background: "#0e1a16", fontFamily: "'Inter', -apple-system, sans-serif", color: "#e8f0ed" };
const sidebar: CSSProperties = { width: 220, background: "#0a1410", borderRight: "1px solid #1e2e28", display: "flex", flexDirection: "column", flexShrink: 0 };
const sidebarHeader: CSSProperties = { padding: "24px 20px 16px", borderBottom: "1px solid #1e2e28" };
const logoIcon: CSSProperties = { width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#c95e3d,#e8a87c)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#fff", marginBottom: 8 };
const logoTitle: CSSProperties = { fontSize: 14, fontWeight: 800, color: "#e8f0ed", display: "block" };
const logoSub: CSSProperties = { fontSize: 10, color: "#5a7a6e", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" };
const sectionLabel: CSSProperties = { fontSize: 9, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "#3d5a50", padding: "16px 20px 6px" };
const mainStyle: CSSProperties = { flex: 1, display: "flex", flexDirection: "column", overflow: "auto" };
const topbar: CSSProperties = { padding: "16px 28px", borderBottom: "1px solid #1e2e28", background: "#0e1a16", display: "flex", alignItems: "center", justifyContent: "space-between" };
const content: CSSProperties = { padding: "28px", flex: 1 };
const kpiGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 16, marginBottom: 28 };
const kpiLabel: CSSProperties = { fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#5a7a6e", marginBottom: 8 };
const card: CSSProperties = { background: "#111e18", border: "1px solid #1e2e28", borderRadius: 14, padding: "20px 22px", marginBottom: 14 };
const cardId: CSSProperties = { fontFamily: "monospace", fontSize: 10, fontWeight: 700, color: "#c95e3d", marginBottom: 4 };
const cardTitle: CSSProperties = { fontSize: 16, fontWeight: 800, color: "#e8f0ed", marginBottom: 3 };
const cardSub: CSSProperties = { fontSize: 12, color: "#6b8c7e", marginBottom: 6 };
const cardMsg: CSSProperties = { fontSize: 12, color: "#8aaba0", lineHeight: 1.6, marginBottom: 6 };
const selectStyle: CSSProperties = { borderRadius: 8, border: "1px solid #2a3e34", background: "#0a1410", color: "#e8f0ed", padding: "8px 10px", fontSize: 12, fontWeight: 700, outline: "none", width: "100%" };
const inputStyle: CSSProperties = { borderRadius: 8, border: "1px solid #2a3e34", background: "#0a1410", color: "#e8f0ed", padding: "8px 10px", fontSize: 12, outline: "none", width: "100%" };
const emptyState: CSSProperties = { textAlign: "center", padding: "60px 24px", color: "#3d5a50" };
const badge: CSSProperties = { background: "#c95e3d", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" };

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [leadsError, setLeadsError] = useState("");
  const [now, setNow] = useState("");

  useEffect(() => {
    setNow(new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
  }, []);

  const loadAll = async (event?: FormEvent) => {
    event?.preventDefault();
    setAuthError("");
    setLoading(true);
    const [lr, ar] = await Promise.all([
      fetch("/api/leads", { headers: { authorization: `Bearer ${token}` }, cache: "no-store" }),
      fetch("/api/partner-applications", { headers: { authorization: `Bearer ${token}` }, cache: "no-store" }),
    ]);
    setLoading(false);
    if (!lr.ok) { const d = await lr.json(); setAuthError(d.error ?? "Invalid token."); return; }
    setAuthenticated(true);
    const ld = await lr.json(); setLeads(ld.leads);
    if (ar.ok) { const ad = await ar.json(); setApplications(ad.applications); }
  };

  const updateLead = async (lead: Lead, changes: Partial<Lead>) => {
    const res = await fetch("/api/leads", {
      method: "PATCH",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: lead.id, status: lead.status, bookingValue: lead.bookingValue, commissionRate: lead.commissionRate, reconciliationStatus: lead.reconciliationStatus, ...changes }),
    });
    const data = await res.json();
    if (!res.ok) return setLeadsError(data.error ?? "Update failed.");
    setLeads(prev => prev.map(l => l.id === lead.id ? data.lead : l));
  };

  const updateApp = async (app: PartnerApplication, changes: Partial<PartnerApplication>) => {
    const res = await fetch("/api/partner-applications", {
      method: "PATCH",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
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
        <div style={{ width: 400, padding: "40px", background: "#111e18", border: "1px solid #1e2e28", borderRadius: 20 }}>
          <div style={{ ...logoIcon, marginBottom: 20 }}>SA</div>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "#c95e3d", marginBottom: 6 }}>SafarAtlas Internal</p>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "#e8f0ed", marginBottom: 4 }}>Operations Dashboard</h1>
          <p style={{ fontSize: 12, color: "#5a7a6e", marginBottom: 24 }}>Enter your admin token to access the pipeline.</p>
          <form onSubmit={loadAll} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input value={token} onChange={e => setToken(e.target.value)} type="password" placeholder="ADMIN_API_TOKEN"
              style={{ ...inputStyle, padding: "13px 16px", fontSize: 14 }} />
            {authError && <p style={{ fontSize: 12, color: "#ef4444", fontWeight: 700 }}>{authError}</p>}
            <button style={{ background: "linear-gradient(135deg,#c95e3d,#e8703d)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 800, fontSize: 14, padding: "13px", cursor: "pointer" }}>
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
          <div style={logoIcon}>SA</div>
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
            <button onClick={() => loadAll()} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #2a3e34", background: "transparent", color: "#8aaba0", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              ↺ Refresh
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
                : leads.map(lead => (
                  <div key={lead.id} style={card}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "space-between" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                          <p style={{ ...cardId, margin: 0 }}>{lead.id}</p>
                          <span style={pillStyle(statusColor[lead.status])}>{leadLabels[lead.status]}</span>
                        </div>
                        <p style={cardTitle}>{lead.travelerName}</p>
                        <p style={cardSub}>{lead.email}{lead.whatsapp ? ` · ${lead.whatsapp}` : ""} · {lead.travelDates} · {lead.groupSize}</p>
                        <p style={cardMsg}>{lead.message}</p>
                        {lead.expectedMargin ? <p style={{ fontSize: 12, fontWeight: 700, color: "#4ade80", margin: 0 }}>Expected margin: €{lead.expectedMargin.toFixed(2)}</p> : null}
                      </div>
                      <div style={{ display: "grid", gap: 8, minWidth: 200 }}>
                        <select value={lead.status} onChange={e => updateLead(lead, { status: e.target.value as LeadStatus })} style={selectStyle}>
                          {leadStatuses.map(s => <option key={s} value={s}>{leadLabels[s]}</option>)}
                        </select>
                        <input type="number" min="0" placeholder="Booking value (€)" value={lead.bookingValue ?? ""}
                          onChange={e => updateLead(lead, { bookingValue: e.target.value === "" ? null : Number(e.target.value) })}
                          style={inputStyle} />
                        <input type="number" min="0" max="100" placeholder="Commission %" value={lead.commissionRate ?? ""}
                          onChange={e => updateLead(lead, { commissionRate: e.target.value === "" ? null : Number(e.target.value) })}
                          style={inputStyle} />
                      </div>
                    </div>
                  </div>
                ))
              }
            </>
          )}

          {/* PARTNERS TAB */}
          {tab === "partners" && (
            <>
              {applications.length === 0
                ? <div style={emptyState}><p style={{ fontSize: 36, marginBottom: 12 }}>🤝</p><p>No partner applications yet.</p></div>
                : applications.map(app => (
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
              }
            </>
          )}

        </div>
      </main>
    </div>
  );
}
