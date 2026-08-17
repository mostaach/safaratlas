"use client";

import { FormEvent, useState } from "react";
import { Lead, leadStatuses, LeadStatus } from "../../lib/leadTypes";
import { PartnerApplication, PartnerStatus } from "../../lib/partnerStore";

const leadLabels: Record<LeadStatus, string> = {
  new: "New",
  routed: "Routed",
  partner_replied: "Partner replied",
  quote_sent: "Quote sent",
  booked: "Booked",
  lost: "Lost",
  spam: "Spam",
};

const partnerStatusLabels: Record<PartnerStatus, string> = {
  pending: "Pending review",
  approved: "Approved",
  rejected: "Rejected",
  suspended: "Suspended",
};

const partnerStatuses: PartnerStatus[] = ["pending", "approved", "rejected", "suspended"];

const categoryLabels: Record<string, string> = {
  airport_transfer: "🚐 Airport Transfer",
  riad: "🏰 Riad / Stay",
  desert_trip: "🐪 Desert Trip",
  guided_tour: "🗺️ Guided Tour",
  activity: "🏄 Activity",
  restaurant: "🍽️ Restaurant",
  other: "✨ Other",
};

type Tab = "leads" | "partners";

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [tab, setTab] = useState<Tab>("leads");

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsError, setLeadsError] = useState("");
  const [leadsLoading, setLeadsLoading] = useState(false);

  // Partner applications state
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [appsError, setAppsError] = useState("");
  const [appsLoading, setAppsLoading] = useState(false);

  const [authError, setAuthError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const loadAll = async (event?: FormEvent) => {
    event?.preventDefault();
    setAuthError("");
    setLeadsLoading(true);
    setAppsLoading(true);

    const [leadsRes, appsRes] = await Promise.all([
      fetch("/api/leads", { headers: { authorization: `Bearer ${token}` }, cache: "no-store" }),
      fetch("/api/partner-applications", { headers: { authorization: `Bearer ${token}` }, cache: "no-store" }),
    ]);

    setLeadsLoading(false);
    setAppsLoading(false);

    if (!leadsRes.ok) {
      const data = await leadsRes.json();
      setAuthError(data.error ?? "Invalid token.");
      return;
    }

    setAuthenticated(true);
    const leadsData = await leadsRes.json();
    setLeads(leadsData.leads);
    setLeadsError("");

    if (appsRes.ok) {
      const appsData = await appsRes.json();
      setApplications(appsData.applications);
      setAppsError("");
    } else {
      setAppsError("Could not load partner applications.");
    }
  };

  const updateLead = async (lead: Lead, changes: Partial<Lead>) => {
    const res = await fetch("/api/leads", {
      method: "PATCH",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: lead.id, status: lead.status, bookingValue: lead.bookingValue, commissionRate: lead.commissionRate, reconciliationStatus: lead.reconciliationStatus, ...changes }),
    });
    const data = await res.json();
    if (!res.ok) return setLeadsError(data.error ?? "Unable to update lead.");
    setLeads((prev) => prev.map((l) => l.id === lead.id ? data.lead : l));
  };

  const updateApplication = async (app: PartnerApplication, changes: Partial<PartnerApplication>) => {
    const res = await fetch("/api/partner-applications", {
      method: "PATCH",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: app.id, ...changes }),
    });
    const data = await res.json();
    if (!res.ok) return setAppsError(data.error ?? "Unable to update application.");
    setApplications((prev) => prev.map((a) => a.id === app.id ? data.application : a));
  };

  const expectedMargin = leads.reduce((sum, l) => sum + (l.expectedMargin ?? 0), 0);
  const pendingApps = applications.filter((a) => a.status === "pending").length;
  const approvedApps = applications.filter((a) => a.status === "approved").length;

  return (
    <main style={{ minHeight: "100vh", background: "#fcf8f1", padding: "48px 16px", fontFamily: "Arial, sans-serif", color: "#17211d" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "#c95e3d", margin: "0 0 6px" }}>SafarAtlas internal</p>
        <h1 style={{ fontSize: 36, fontWeight: 900, margin: "0 0 4px" }}>Marrakech pilot dashboard</h1>
        <p style={{ fontSize: 13, color: "#52615a", margin: "0 0 28px" }}>Internal access only. Do not share the admin token.</p>

        {/* Auth form */}
        {!authenticated && (
          <form onSubmit={loadAll} style={{ display: "flex", gap: 10, maxWidth: 500, marginBottom: 32 }}>
            <input value={token} onChange={(e) => setToken(e.target.value)} type="password" placeholder="ADMIN_API_TOKEN"
              style={{ flex: 1, borderRadius: 12, border: "1.5px solid #e8ded0", background: "#fff", padding: "12px 16px", fontSize: 14, outline: "none" }} />
            <button style={{ borderRadius: 12, background: "#194c43", color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 20px", border: "none", cursor: "pointer" }}>
              {leadsLoading ? "Loading…" : "Open pipeline"}
            </button>
          </form>
        )}
        {authError && <p style={{ fontSize: 13, fontWeight: 700, color: "#b42318", marginBottom: 20 }}>{authError}</p>}

        {authenticated && (
          <>
            {/* Summary stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
              <StatCard label="Total leads" value={String(leads.length)} />
              <StatCard label="Booked" value={String(leads.filter((l) => l.status === "booked").length)} />
              <StatCard label="Expected margin" value={`€${expectedMargin.toFixed(2)}`} highlight />
              <StatCard label="Partner applications" value={String(applications.length)} />
              <StatCard label="Pending review" value={String(pendingApps)} />
              <StatCard label="Approved partners" value={String(approvedApps)} />
            </div>

            {/* Tab switcher */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {(["leads", "partners"] as Tab[]).map((t) => (
                <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 24px", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 13, background: tab === t ? "#194c43" : "#fff", color: tab === t ? "#fff" : "#52615a", border: `1.5px solid ${tab === t ? "#194c43" : "#e8ded0"}` }}>
                  {t === "leads" ? `📬 Leads (${leads.length})` : `🤝 Partner applications (${applications.length})`}
                </button>
              ))}
              <button onClick={() => loadAll()} style={{ marginLeft: "auto", padding: "10px 20px", borderRadius: 10, border: "1.5px solid #e8ded0", background: "#fff", color: "#52615a", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                ↺ Refresh
              </button>
            </div>

            {/* Leads tab */}
            {tab === "leads" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {leadsError && <p style={{ color: "#b42318", fontWeight: 700 }}>{leadsError}</p>}
                {leads.length === 0 && <EmptyState icon="📬" text="No leads yet. Share the site and they'll appear here." />}
                {leads.map((lead) => (
                  <article key={lead.id} style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8ded0", padding: "20px 24px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, color: "#194c43", margin: "0 0 4px" }}>{lead.id}</p>
                        <h2 style={{ fontSize: 17, fontWeight: 900, margin: "0 0 4px" }}>{lead.travelerName} <span style={{ fontWeight: 400, color: "#52615a" }}>— {lead.listingName}</span></h2>
                        <p style={{ fontSize: 13, color: "#52615a", margin: "0 0 6px" }}>{lead.partnerName || "Unassigned"} · {lead.travelDates} · {lead.groupSize}</p>
                        <p style={{ fontSize: 13, color: "#52615a", margin: "0 0 6px" }}>{lead.message}</p>
                        <p style={{ fontSize: 12, color: "#a09a8f" }}>{lead.email}{lead.whatsapp ? ` · ${lead.whatsapp}` : ""}</p>
                      </div>
                      <div style={{ display: "grid", gap: 8, minWidth: 220 }}>
                        <select value={lead.status} onChange={(e) => updateLead(lead, { status: e.target.value as LeadStatus })}
                          style={{ borderRadius: 8, border: "1.5px solid #e8ded0", padding: "8px 12px", fontSize: 13, fontWeight: 700, outline: "none", background: "#fff" }}>
                          {leadStatuses.map((s) => <option key={s} value={s}>{leadLabels[s]}</option>)}
                        </select>
                        <input type="number" min="0" placeholder="Booking value (€)" value={lead.bookingValue ?? ""}
                          onChange={(e) => updateLead(lead, { bookingValue: e.target.value === "" ? null : Number(e.target.value) })}
                          style={{ borderRadius: 8, border: "1.5px solid #e8ded0", padding: "8px 12px", fontSize: 13, outline: "none" }} />
                        <input type="number" min="0" max="100" placeholder="Commission %" value={lead.commissionRate ?? ""}
                          onChange={(e) => updateLead(lead, { commissionRate: e.target.value === "" ? null : Number(e.target.value) })}
                          style={{ borderRadius: 8, border: "1.5px solid #e8ded0", padding: "8px 12px", fontSize: 13, outline: "none" }} />
                        <p style={{ fontSize: 12, fontWeight: 700, color: "#194c43", margin: 0 }}>Expected margin: €{(lead.expectedMargin ?? 0).toFixed(2)}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Partner applications tab */}
            {tab === "partners" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {appsError && <p style={{ color: "#b42318", fontWeight: 700 }}>{appsError}</p>}
                {applications.length === 0 && <EmptyState icon="🤝" text="No partner applications yet. Share /partners with potential business owners." />}
                {applications.map((app) => (
                  <article key={app.id} style={{ background: "#fff", borderRadius: 16, border: `2px solid ${app.status === "approved" ? "#a7f3d0" : app.status === "rejected" ? "#fecaca" : "#e8ded0"}`, padding: "20px 24px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                          <p style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, color: "#194c43", margin: 0 }}>{app.id}</p>
                          <span style={{ fontSize: 12, padding: "2px 10px", borderRadius: 20, fontWeight: 700, background: app.status === "approved" ? "#ecfdf5" : app.status === "rejected" ? "#fff0ee" : "#fef9ee", color: app.status === "approved" ? "#059669" : app.status === "rejected" ? "#b42318" : "#92400e" }}>
                            {partnerStatusLabels[app.status]}
                          </span>
                        </div>
                        <h2 style={{ fontSize: 17, fontWeight: 900, margin: "0 0 2px" }}>{app.businessName}</h2>
                        <p style={{ fontSize: 13, color: "#52615a", margin: "0 0 4px" }}>{categoryLabels[app.category] ?? app.category} · {app.location}</p>
                        <p style={{ fontSize: 13, color: "#52615a", margin: "0 0 4px" }}>{app.description}</p>
                        <p style={{ fontSize: 12, color: "#52615a", margin: "0 0 2px" }}>
                          👤 {app.contactName} · <a href={`mailto:${app.email}`} style={{ color: "#c95e3d" }}>{app.email}</a> · {app.whatsapp}
                        </p>
                        {app.website && <p style={{ fontSize: 12, color: "#52615a", margin: "0 0 2px" }}>🌐 <a href={app.website} target="_blank" rel="noopener noreferrer" style={{ color: "#194c43" }}>{app.website}</a></p>}
                        <p style={{ fontSize: 12, color: "#a09a8f", margin: "0 0 0" }}>{app.yearsInBusiness} · {app.priceRange} · {app.languages}</p>
                      </div>
                      <div style={{ display: "grid", gap: 8, minWidth: 220 }}>
                        <select value={app.status} onChange={(e) => updateApplication(app, { status: e.target.value as PartnerStatus })}
                          style={{ borderRadius: 8, border: "1.5px solid #e8ded0", padding: "8px 12px", fontSize: 13, fontWeight: 700, outline: "none", background: "#fff" }}>
                          {partnerStatuses.map((s) => <option key={s} value={s}>{partnerStatusLabels[s]}</option>)}
                        </select>
                        <textarea placeholder="Admin notes…" value={app.adminNotes} rows={3}
                          onChange={(e) => updateApplication(app, { adminNotes: e.target.value })}
                          style={{ borderRadius: 8, border: "1.5px solid #e8ded0", padding: "8px 12px", fontSize: 13, outline: "none", resize: "vertical" }} />
                        <p style={{ fontSize: 11, color: "#a09a8f", margin: 0 }}>Applied {new Date(app.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ borderRadius: 16, padding: "20px", background: highlight ? "#194c43" : "#fff", border: highlight ? "none" : "1px solid #e8ded0" }}>
      <p style={{ fontSize: 12, color: highlight ? "rgba(255,255,255,0.7)" : "#52615a", margin: "0 0 4px" }}>{label}</p>
      <p style={{ fontSize: 28, fontWeight: 900, margin: 0, color: highlight ? "#fff" : "#17211d" }}>{value}</p>
    </div>
  );
}

function EmptyState({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 24px", background: "#fff", borderRadius: 16, border: "1.5px dashed #e8ded0" }}>
      <p style={{ fontSize: 40, margin: "0 0 12px" }}>{icon}</p>
      <p style={{ fontSize: 14, color: "#52615a", margin: 0 }}>{text}</p>
    </div>
  );
}
