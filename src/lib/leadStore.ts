import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Lead, LeadStatus } from "./leadTypes";

const dataDirectory = process.env.VERCEL || process.env.NODE_ENV === "production"
  ? "/tmp"
  : path.join(process.cwd(), ".data");
const dataFile = path.join(dataDirectory, "pilot-leads.json");

const readLeads = async (): Promise<Lead[]> => {
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
  const lead: Lead = { ...input, id: `SA-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, createdAt: now, updatedAt: now };
  const leads = await readLeads();
  leads.unshift(lead);
  await writeLeads(leads);
  return lead;
};

export const updateLead = async (id: string, updates: Partial<Pick<Lead, "status" | "bookingValue" | "commissionRate" | "expectedMargin" | "reconciliationStatus">>) => {
  const leads = await readLeads();
  const index = leads.findIndex((lead) => lead.id === id);
  if (index === -1) return null;
  leads[index] = { ...leads[index], ...updates, updatedAt: new Date().toISOString() };
  await writeLeads(leads);
  return leads[index];
};

export const isLeadStatus = (value: unknown): value is LeadStatus => typeof value === "string" && ["new", "routed", "partner_replied", "quote_sent", "booked", "lost", "spam"].includes(value);
