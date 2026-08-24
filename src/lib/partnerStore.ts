import "server-only";
import { supabase } from "./supabase";

export type PartnerCategory = "airport_transfer" | "riad" | "desert_trip" | "guided_tour" | "activity" | "restaurant" | "other";
export type PartnerStatus = "pending" | "approved" | "rejected" | "suspended";

export interface PartnerApplication {
  id: string; createdAt: string; updatedAt: string; status: PartnerStatus;
  businessName: string; category: PartnerCategory; website: string; description: string; location: string;
  contactName: string; email: string; whatsapp: string; yearsInBusiness: string; languages: string; priceRange: string; adminNotes: string;
}

export interface CreatePartnerApplicationInput {
  businessName: string; category: PartnerCategory; website?: string; description: string; location: string;
  contactName: string; email: string; whatsapp: string; yearsInBusiness: string; languages: string; priceRange: string; website_hp?: string;
}

const unavailable = () => new Error("Persistent partner storage is unavailable.");
const requireDatabase = () => {
  if (!supabase) throw unavailable();
  return supabase;
};

const mapApplication = (row: Record<string, unknown>): PartnerApplication => ({
  id: row.id as string, createdAt: row.created_at as string, updatedAt: row.updated_at as string,
  status: row.status as PartnerStatus, businessName: row.business_name as string, category: row.category as PartnerCategory,
  website: row.website as string, description: row.description as string, location: row.location as string,
  contactName: row.contact_name as string, email: row.email as string, whatsapp: row.whatsapp as string,
  yearsInBusiness: row.years_in_business as string, languages: row.languages as string, priceRange: row.price_range as string,
  adminNotes: row.admin_notes as string,
});

export const listApplications = async () => {
  const { data, error } = await requireDatabase().from("partner_applications").select("*").order("created_at", { ascending: false });
  if (error) throw unavailable();
  return (data ?? []).map(row => mapApplication(row));
};

export const addApplication = async (input: Omit<PartnerApplication, "id" | "createdAt" | "updatedAt" | "status" | "adminNotes">) => {
  const now = new Date().toISOString();
  const app: PartnerApplication = { ...input, id: `PA-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, createdAt: now, updatedAt: now, status: "pending", adminNotes: "" };
  const { error } = await requireDatabase().from("partner_applications").insert({
    id: app.id, status: app.status, business_name: app.businessName, category: app.category, website: app.website,
    description: app.description, location: app.location, contact_name: app.contactName, email: app.email,
    whatsapp: app.whatsapp, years_in_business: app.yearsInBusiness, languages: app.languages, price_range: app.priceRange,
    admin_notes: app.adminNotes, created_at: app.createdAt, updated_at: app.updatedAt,
  });
  if (error) throw unavailable();
  return app;
};

export const updateApplication = async (id: string, updates: Partial<Pick<PartnerApplication, "status" | "adminNotes">>) => {
  const dbUpdates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (updates.status !== undefined) dbUpdates.status = updates.status;
  if (updates.adminNotes !== undefined) dbUpdates.admin_notes = updates.adminNotes;
  const { data, error } = await requireDatabase().from("partner_applications").update(dbUpdates).eq("id", id).select().maybeSingle();
  if (error) throw unavailable();
  return data ? mapApplication(data) : null;
};

export const isPartnerStatus = (value: unknown): value is PartnerStatus =>
  typeof value === "string" && ["pending", "approved", "rejected", "suspended"].includes(value);
