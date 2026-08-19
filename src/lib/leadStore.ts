import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Lead, LeadStatus } from "./leadTypes";
import { supabase } from "./supabase";

const dataDirectory = process.env.VERCEL || process.env.NODE_ENV === "production"
  ? "/tmp"
  : path.join(process.cwd(), ".data");
const dataFile = path.join(dataDirectory, "pilot-leads.json");

const readLeads = async (): Promise<Lead[]> => {
  if (supabase) {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      // Map DB fields to Lead interface
      return data.map((row) => ({
        ...row,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        travelDates: row.travel_dates,
        groupSize: row.group_size,
        partnerId: row.partner_id,
        partnerName: row.partner_name,
        listingName: row.listing_name,
        travelerName: row.traveler_name,
        bookingValue: row.booking_value,
        commissionRate: row.commission_rate,
        expectedMargin: row.expected_margin,
        reconciliationStatus: row.reconciliation_status,
      })) as Lead[];
    }
  }

  // Fallback to local file
  try {
    return JSON.parse(await readFile(dataFile, "utf8")) as Lead[];
  } catch {
    return [];
  }
};

const writeLeads = async (leads: Lead[]) => {
  try {
    await mkdir(dataDirectory, { recursive: true });
    await writeFile(dataFile, JSON.stringify(leads, null, 2), "utf8");
  } catch (error) {
    console.warn("[leadStore] Disk write skipped in serverless environment:", error);
  }
};

export const listLeads = async () => readLeads();

export const addLead = async (input: Omit<Lead, "id" | "createdAt" | "updatedAt">) => {
  const now = new Date().toISOString();
  const id = `SA-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  
  const lead: Lead = { ...input, id, createdAt: now, updatedAt: now };

  if (supabase) {
    const { error } = await supabase.from('leads').insert([{
      id: lead.id,
      status: lead.status,
      source: lead.source,
      partner_id: lead.partnerId,
      partner_name: lead.partnerName,
      listing_name: lead.listingName,
      traveler_name: lead.travelerName,
      email: lead.email,
      whatsapp: lead.whatsapp,
      travel_dates: lead.travelDates,
      group_size: lead.groupSize,
      message: lead.message,
      booking_value: lead.bookingValue,
      commission_rate: lead.commissionRate,
      expected_margin: lead.expectedMargin,
      reconciliation_status: lead.reconciliationStatus,
      created_at: lead.createdAt,
      updated_at: lead.updatedAt,
    }]);

    if (!error) {
      return lead;
    }
    console.error("Supabase insert error:", error);
  }

  // Fallback
  const leads = await readLeads();
  leads.unshift(lead);
  await writeLeads(leads);
  return lead;
};

export const updateLead = async (id: string, updates: Partial<Pick<Lead, "status" | "bookingValue" | "commissionRate" | "expectedMargin" | "reconciliationStatus">>) => {
  const now = new Date().toISOString();

  if (supabase) {
    const dbUpdates: any = { updated_at: now };
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.bookingValue !== undefined) dbUpdates.booking_value = updates.bookingValue;
    if (updates.commissionRate !== undefined) dbUpdates.commission_rate = updates.commissionRate;
    if (updates.expectedMargin !== undefined) dbUpdates.expected_margin = updates.expectedMargin;
    if (updates.reconciliationStatus !== undefined) dbUpdates.reconciliation_status = updates.reconciliationStatus;

    const { data, error } = await supabase.from('leads').update(dbUpdates).eq('id', id).select();
    if (!error && data && data.length > 0) {
      const row = data[0];
      return {
        ...row,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        travelDates: row.travel_dates,
        groupSize: row.group_size,
        partnerId: row.partner_id,
        partnerName: row.partner_name,
        listingName: row.listing_name,
        travelerName: row.traveler_name,
        bookingValue: row.booking_value,
        commissionRate: row.commission_rate,
        expectedMargin: row.expected_margin,
        reconciliationStatus: row.reconciliation_status,
      } as Lead;
    }
  }

  // Fallback
  const leads = await readLeads();
  const index = leads.findIndex((lead) => lead.id === id);
  if (index === -1) return null;
  leads[index] = { ...leads[index], ...updates, updatedAt: now };
  await writeLeads(leads);
  return leads[index];
};

export const isLeadStatus = (value: unknown): value is LeadStatus => typeof value === "string" && ["new", "routed", "partner_replied", "quote_sent", "booked", "lost", "spam"].includes(value);
