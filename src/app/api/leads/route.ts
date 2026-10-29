import { NextRequest } from "next/server";
import { addLead, isLeadStatus, listLeads, updateLead } from "../../../lib/leadStore";
import { CreateLeadInput, Lead } from "../../../lib/leadTypes";
import { sendLeadNotification } from "../../../lib/sendLeadEmail";
import { isAdminRequest, isJsonRequest, isRateLimited } from "../../../lib/requestGuards";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isAdmin = (request: NextRequest) => isAdminRequest(request);

const text = (value: unknown, maxLength: number) => typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export async function POST(request: NextRequest) {
  if (!isJsonRequest(request)) return Response.json({ error: "Invalid submission." }, { status: 415 });
  if (isRateLimited(request, "lead")) return Response.json({ error: "Please wait before submitting another request." }, { status: 429 });
  const body = await request.json().catch(() => null) as CreateLeadInput | null;
  if (!body || body.website) return Response.json({ error: "Invalid submission." }, { status: 400 });

  const email = text(body.email, 160);
  const input = {
    partnerId: typeof body.partnerId === "string" ? body.partnerId : null,
    partnerName: text(body.partnerName, 160),
    listingName: text(body.listingName, 160),
    travelerName: text(body.travelerName, 120),
    email,
    whatsapp: text(body.whatsapp, 40),
    travelDates: text(body.travelDates, 120),
    groupSize: text(body.groupSize, 50),
    message: text(body.message, 2000),
  };

  if (!body.consent || !input.travelerName || !input.email || !/^\S+@\S+\.\S+$/.test(input.email) || !input.travelDates || !input.message) {
    return Response.json({ error: "Please complete the required fields." }, { status: 400 });
  }

  const leadSource: Lead["source"] = body.source === "agafay-vip-offer" ? "agafay-vip-offer" : "website";
  const now = new Date().toISOString();
  const lead: Lead = {
    ...input,
    id: `SA-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    status: "new",
    source: leadSource,
    bookingValue: null,
    commissionRate: null,
    expectedMargin: null,
    reconciliationStatus: "not_applicable",
    createdAt: now,
    updatedAt: now,
  };

  // 1. Try to persist. A failure here is loud, never silent.
  let stored = false;
  try {
    await addLead({ ...input, status: "new", source: leadSource, bookingValue: null, commissionRate: null, expectedMargin: null, reconciliationStatus: "not_applicable" });
    stored = true;
  } catch (dbError) {
    console.error("[POST /api/leads] Supabase insert failed — falling back to email delivery only:", dbError);
  }

  // 2. Email is the secondary durable channel. Await it so serverless does not freeze mid-flight.
  const emailResult = await sendLeadNotification(lead);

  // 3. Refuse the submission only if BOTH channels failed. Never fake a success.
  if (!stored && !emailResult.ok) {
    console.error("[POST /api/leads] All delivery channels failed for lead", lead.id, emailResult.reason);
    return Response.json(
      {
        error: "We could not record your request. Please message us directly on WhatsApp at +212 698 017 323 so we do not lose your dates.",
        whatsapp: "https://wa.me/212698017323",
      },
      { status: 503 },
    );
  }

  if (!stored) {
    console.warn("[POST /api/leads] Lead delivered by email only (not stored):", lead.id);
    return Response.json({ id: lead.id, status: lead.status, stored: false, delivery: "email" }, { status: 202 });
  }

  return Response.json({ id: lead.id, status: lead.status, stored: true, delivery: "database" }, { status: 201 });
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return Response.json({ leads: await listLeads() });
  } catch {
    return Response.json({ error: "Lead storage is temporarily unavailable." }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAdmin(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || typeof body.id !== "string") return Response.json({ error: "Invalid update." }, { status: 400 });

  const bookingValue = typeof body.bookingValue === "number" && body.bookingValue >= 0 ? body.bookingValue : undefined;
  const commissionRate = typeof body.commissionRate === "number" && body.commissionRate >= 0 && body.commissionRate <= 100 ? body.commissionRate : undefined;
  const expectedMargin = bookingValue !== undefined && commissionRate !== undefined ? Number((bookingValue * commissionRate / 100).toFixed(2)) : undefined;
  const reconciliationStatus = ["not_applicable", "expected", "invoiced", "paid"].includes(String(body.reconciliationStatus)) ? String(body.reconciliationStatus) as "not_applicable" | "expected" | "invoiced" | "paid" : undefined;
  let updated;
  try {
    updated = await updateLead(body.id, { status: isLeadStatus(body.status) ? body.status : undefined, bookingValue, commissionRate, expectedMargin, reconciliationStatus });
  } catch {
    return Response.json({ error: "Lead storage is temporarily unavailable." }, { status: 503 });
  }
  if (!updated) return Response.json({ error: "Lead not found." }, { status: 404 });

  return Response.json({ lead: updated });
}
