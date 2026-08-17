import { NextRequest } from "next/server";
import {
  addApplication,
  CreatePartnerApplicationInput,
  isPartnerStatus,
  listApplications,
  PartnerCategory,
  updateApplication,
} from "../../../lib/partnerStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const validCategories: PartnerCategory[] = ["airport_transfer", "riad", "desert_trip", "guided_tour", "activity", "restaurant", "other"];

const isAdmin = (request: NextRequest) => {
  const expectedToken = process.env.ADMIN_API_TOKEN;
  return Boolean(expectedToken) && request.headers.get("authorization") === `Bearer ${expectedToken}`;
};

const text = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as CreatePartnerApplicationInput | null;
  if (!body || body.website_hp) return Response.json({ error: "Invalid submission." }, { status: 400 });

  const input = {
    businessName: text(body.businessName, 200),
    category: validCategories.includes(body.category) ? body.category : null,
    website: text(body.website, 300),
    description: text(body.description, 2000),
    location: text(body.location, 200),
    contactName: text(body.contactName, 120),
    email: text(body.email, 160),
    whatsapp: text(body.whatsapp, 40),
    yearsInBusiness: text(body.yearsInBusiness, 50),
    languages: text(body.languages, 200),
    priceRange: text(body.priceRange, 100),
  };

  if (
    !input.businessName ||
    !input.category ||
    !input.description ||
    !input.location ||
    !input.contactName ||
    !input.email ||
    !/^\S+@\S+\.\S+$/.test(input.email) ||
    !input.whatsapp
  ) {
    return Response.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  const application = await addApplication(input as Parameters<typeof addApplication>[0]);
  return Response.json({ id: application.id, status: application.status }, { status: 201 });
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ applications: await listApplications() });
}

export async function PATCH(request: NextRequest) {
  if (!isAdmin(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || typeof body.id !== "string") return Response.json({ error: "Invalid update." }, { status: 400 });

  const updates: Parameters<typeof updateApplication>[1] = {};
  if (isPartnerStatus(body.status)) updates.status = body.status;
  if (typeof body.adminNotes === "string") updates.adminNotes = body.adminNotes.trim().slice(0, 2000);

  const updated = await updateApplication(body.id, updates);
  if (!updated) return Response.json({ error: "Application not found." }, { status: 404 });
  return Response.json({ application: updated });
}
