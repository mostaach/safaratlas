import { NextRequest } from "next/server";
import { addEvent, listEvents } from "../../../lib/analyticsStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isAdmin = (request: NextRequest) => {
  const expectedToken = process.env.ADMIN_API_TOKEN;
  return Boolean(expectedToken) && request.headers.get("authorization") === `Bearer ${expectedToken}`;
};

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || !body.eventName) return Response.json({ error: "Invalid event." }, { status: 400 });

  const event = await addEvent({
    eventName: String(body.eventName).trim().slice(0, 100),
    properties: typeof body.properties === "object" && body.properties !== null ? body.properties : {},
    sessionId: body.sessionId ? String(body.sessionId).trim().slice(0, 100) : undefined,
  });

  return Response.json({ success: true, id: event.id }, { status: 201 });
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ events: await listEvents() });
}
