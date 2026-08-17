import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

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
  const app: PartnerApplication = {
    ...input,
    id: `PA-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    createdAt: now,
    updatedAt: now,
    status: "pending",
    adminNotes: "",
  };
  const apps = await readApplications();
  apps.unshift(app);
  await writeApplications(apps);
  return app;
};

export const updateApplication = async (
  id: string,
  updates: Partial<Pick<PartnerApplication, "status" | "adminNotes">>,
) => {
  const apps = await readApplications();
  const index = apps.findIndex((a) => a.id === id);
  if (index === -1) return null;
  apps[index] = { ...apps[index], ...updates, updatedAt: new Date().toISOString() };
  await writeApplications(apps);
  return apps[index];
};

export const isPartnerStatus = (value: unknown): value is PartnerStatus =>
  typeof value === "string" && ["pending", "approved", "rejected", "suspended"].includes(value);
