import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { supabase } from "./supabase";

export type PartnerCategory = "airport_transfer" | "riad" | "desert_trip" | "guided_tour" | "activity" | "restaurant" | "other";
export type PartnerStatus = "pending" | "approved" | "rejected" | "suspended";

export interface PartnerApplication {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: PartnerStatus;
  // Business info
  businessName: string;
  category: PartnerCategory;
  website: string;
  description: string;
  location: string;
  // Contact
  contactName: string;
  email: string;
  whatsapp: string;
  // Commercial
  yearsInBusiness: string;
  languages: string;
  priceRange: string;
  // Notes (admin only)
  adminNotes: string;
}

export interface CreatePartnerApplicationInput {
  businessName: string;
  category: PartnerCategory;
  website?: string;
  description: string;
  location: string;
  contactName: string;
  email: string;
  whatsapp: string;
  yearsInBusiness: string;
  languages: string;
  priceRange: string;
  // honeypot
  website_hp?: string;
}

const dataDirectory = process.env.VERCEL || process.env.NODE_ENV === "production"
  ? "/tmp"
  : path.join(process.cwd(), ".data");
const dataFile = path.join(dataDirectory, "partner-applications.json");

const readApplications = async (): Promise<PartnerApplication[]> => {
  if (supabase) {
    const { data, error } = await supabase.from('partner_applications').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      return data.map((row) => ({
        id: row.id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        status: row.status as PartnerStatus,
        businessName: row.business_name,
        category: row.category as PartnerCategory,
        website: row.website,
        description: row.description,
        location: row.location,
        contactName: row.contact_name,
        email: row.email,
        whatsapp: row.whatsapp,
        yearsInBusiness: row.years_in_business,
        languages: row.languages,
        priceRange: row.price_range,
        adminNotes: row.admin_notes,
      })) as PartnerApplication[];
    }
  }

  try {
    return JSON.parse(await readFile(dataFile, "utf8")) as PartnerApplication[];
  } catch {
    return [];
  }
};

const writeApplications = async (apps: PartnerApplication[]) => {
  try {
    await mkdir(dataDirectory, { recursive: true });
    await writeFile(dataFile, JSON.stringify(apps, null, 2), "utf8");
  } catch (error) {
    console.warn("[partnerStore] Disk write skipped in serverless environment:", error);
  }
};

export const listApplications = async () => readApplications();

export const addApplication = async (input: Omit<PartnerApplication, "id" | "createdAt" | "updatedAt" | "status" | "adminNotes">) => {
  const now = new Date().toISOString();
  const id = `PA-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const app: PartnerApplication = {
    ...input,
    id,
    createdAt: now,
    updatedAt: now,
    status: "pending",
    adminNotes: "",
  };

  if (supabase) {
    const { error } = await supabase.from('partner_applications').insert([{
      id: app.id,
      status: app.status,
      business_name: app.businessName,
      category: app.category,
      website: app.website,
      description: app.description,
      location: app.location,
      contact_name: app.contactName,
      email: app.email,
      whatsapp: app.whatsapp,
      years_in_business: app.yearsInBusiness,
      languages: app.languages,
      price_range: app.priceRange,
      admin_notes: app.adminNotes,
      created_at: app.createdAt,
      updated_at: app.updatedAt,
    }]);

    if (!error) {
      return app;
    }
    console.error("Supabase insert error (partner_applications):", error);
  }

  const apps = await readApplications();
  apps.unshift(app);
  await writeApplications(apps);
  return app;
};

export const updateApplication = async (
  id: string,
  updates: Partial<Pick<PartnerApplication, "status" | "adminNotes">>,
) => {
  const now = new Date().toISOString();

  if (supabase) {
    const dbUpdates: any = { updated_at: now };
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.adminNotes !== undefined) dbUpdates.admin_notes = updates.adminNotes;

    const { data, error } = await supabase.from('partner_applications').update(dbUpdates).eq('id', id).select();
    if (!error && data && data.length > 0) {
      const row = data[0];
      return {
        id: row.id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        status: row.status as PartnerStatus,
        businessName: row.business_name,
        category: row.category as PartnerCategory,
        website: row.website,
        description: row.description,
        location: row.location,
        contactName: row.contact_name,
        email: row.email,
        whatsapp: row.whatsapp,
        yearsInBusiness: row.years_in_business,
        languages: row.languages,
        priceRange: row.price_range,
        adminNotes: row.admin_notes,
      } as PartnerApplication;
    }
  }

  const apps = await readApplications();
  const index = apps.findIndex((a) => a.id === id);
  if (index === -1) return null;
  apps[index] = { ...apps[index], ...updates, updatedAt: now };
  await writeApplications(apps);
  return apps[index];
};

export const isPartnerStatus = (value: unknown): value is PartnerStatus =>
  typeof value === "string" && ["pending", "approved", "rejected", "suspended"].includes(value);
