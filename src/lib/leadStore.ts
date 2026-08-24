import "server-only";
import { supabase } from "./supabase";
import { Lead, LeadStatus } from "./leadTypes";

const databaseUnavailable = () => new Error("Persistent lead storage is unavailable.");

const requireDatabase = () => {
  if (!supabase) throw databaseUnavailable();
  return supabase;
};

const mapLead = (row: Record<string, unknown>): Lead => ({
  ...(row as unknown as Lead),
  createdAt: row.created_at as string,
  updatedAt: row.updated_at as string,
  travelDates: row.travel_dates as string,
  groupSize: row.group_size as string,
  partnerId: row.partner_id as string | null,
  partnerName: row.partner_name as string,
  listingName: row.listing_name as string,
  travelerName: row.traveler_name as string,
  bookingValue: row.booking_value as number | null,
  commissionRate: row.commission_rate as number | null,
  expectedMargin: row.expected_margin as number | null,
  reconciliationStatus: row.reconciliation_status as Lead["reconciliationStatus"],
});

export const listLeads = async () => {
  const { data, error } = await requireDatabase().from("leads").select("*").order("created_at", { ascending: false });
  if (error) throw databaseUnavailable();
  return (data ?? []).map(row => mapLead(row));
};

export const addLead = async (input: Omit<Lead, "id" | "createdAt" | "updatedAt">) => {
  const now = new Date().toISOString();
  const lead: Lead = { ...input, id: `SA-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, createdAt: now, updatedAt: now };
  const { error } = await requireDatabase().from("leads").insert({
    id: lead.id, status: lead.status, source: lead.source, partner_id: lead.partnerId,
    partner_name: lead.partnerName, listing_name: lead.listingName, traveler_name: lead.travelerName,
    email: lead.email, whatsapp: lead.whatsapp, travel_dates: lead.travelDates, group_size: lead.groupSize,
    message: lead.message, booking_value: lead.bookingValue, commission_rate: lead.commissionRate,
    expected_margin: lead.expectedMargin, reconciliation_status: lead.reconciliationStatus,
    created_at: lead.createdAt, updated_at: lead.updatedAt,
  });
  if (error) throw databaseUnavailable();
  return lead;
};

export const updateLead = async (id: string, updates: Partial<Pick<Lead, "status" | "bookingValue" | "commissionRate" | "expectedMargin" | "reconciliationStatus">>) => {
  const dbUpdates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (updates.status !== undefined) dbUpdates.status = updates.status;
  if (updates.bookingValue !== undefined) dbUpdates.booking_value = updates.bookingValue;
  if (updates.commissionRate !== undefined) dbUpdates.commission_rate = updates.commissionRate;
  if (updates.expectedMargin !== undefined) dbUpdates.expected_margin = updates.expectedMargin;
  if (updates.reconciliationStatus !== undefined) dbUpdates.reconciliation_status = updates.reconciliationStatus;
  const { data, error } = await requireDatabase().from("leads").update(dbUpdates).eq("id", id).select().maybeSingle();
  if (error) throw databaseUnavailable();
  return data ? mapLead(data) : null;
};

export const isLeadStatus = (value: unknown): value is LeadStatus =>
  typeof value === "string" && ["new", "in_review", "proposal_sent", "deposit_paid", "booked", "lost", "spam"].includes(value);
