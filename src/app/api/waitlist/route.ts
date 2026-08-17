import { NextRequest } from "next/server";
import { addWaitlistEntry, listWaitlist } from "../../../lib/waitlistStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isAdmin = (request: NextRequest) => {
  const expectedToken = process.env.ADMIN_API_TOKEN;
  return Boolean(expectedToken) && request.headers.get("authorization") === `Bearer ${expectedToken}`;
};

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || !body.email || !/^\S+@\S+\.\S+$/.test(body.email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const result = await addWaitlistEntry(String(body.email).trim());
  return Response.json(result, { status: 201 });
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ waitlist: await listWaitlist() });
}
