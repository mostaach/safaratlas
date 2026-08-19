import { NextRequest } from "next/server";
import { addLead, isLeadStatus, listLeads, updateLead } from "../../../lib/leadStore";
import { CreateLeadInput } from "../../../lib/leadTypes";
import { sendLeadNotification } from "../../../lib/sendLeadEmail";
import { addEvent } from "../../../lib/analyticsStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isAdmin = (request: NextRequest) => {
  const expectedToken = process.env.ADMIN_API_TOKEN;
  return Boolean(expectedToken) && request.headers.get("authorization") === `Bearer ${expectedToken}`;
};

const text = (value: unknown, maxLength: number) => typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export async function POST(request: NextRequest) {
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

  const lead = await addLead({ ...input, status: "new", source: "website", bookingValue: null, commissionRate: null, expectedMargin: null, reconciliationStatus: "not_applicable" });

  // Fire-and-forget — never block the response on email latency
  void sendLeadNotification(lead);
  return Response.json({ id: lead.id, status: lead.status }, { status: 201 });
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ leads: await listLeads() });
}

export async function PATCH(request: NextRequest) {
  if (!isAdmin(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || typeof body.id !== "string") return Response.json({ error: "Invalid update." }, { status: 400 });

  const bookingValue = typeof body.bookingValue === "number" && body.bookingValue >= 0 ? body.bookingValue : undefined;
  const commissionRate = typeof body.commissionRate === "number" && body.commissionRate >= 0 && body.commissionRate <= 100 ? body.commissionRate : undefined;
  const expectedMargin = bookingValue !== undefined && commissionRate !== undefined ? Number((bookingValue * commissionRate / 100).toFixed(2)) : undefined;
  const reconciliationStatus = ["not_applicable", "expected", "invoiced", "paid"].includes(String(body.reconciliationStatus)) ? String(body.reconciliationStatus) as "not_applicable" | "expected" | "invoiced" | "paid" : undefined;
  const updated = await updateLead(body.id, { status: isLeadStatus(body.status) ? body.status : undefined, bookingValue, commissionRate, expectedMargin, reconciliationStatus });
  if (!updated) return Response.json({ error: "Lead not found." }, { status: 404 });

  if (body.status === "in_review") {
    await addEvent({ eventName: "lead_in_review", properties: { leadId: updated.id, source: "admin" } });
  } else if (body.status === "proposal_sent") {
    await addEvent({ eventName: "proposal_sent", properties: { leadId: updated.id } });
  }

  return Response.json({ lead: updated });
}
