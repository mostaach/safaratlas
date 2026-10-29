import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { isAdminRequest } from "../../../lib/requestGuards";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Public callers get a boolean only. Failure details are admin-only so we do
  // not leak infrastructure internals to anonymous visitors.
  const detailed = isAdminRequest(request);

  if (!supabase) {
    return NextResponse.json(
      { status: "error", database: "not_configured" },
      { status: 500 },
    );
  }

  try {
    const { error: leadsError, count } = await supabase
      .from("leads")
      .select("id", { head: true, count: "exact" });

    if (leadsError) {
      return NextResponse.json(
        detailed
          ? { status: "error", database: "error", message: leadsError.message }
          : { status: "error", database: "error" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        status: "healthy",
        database: "connected",
        ...(detailed ? { tables: { leads: "reachable", count: count ?? 0 } } : {}),
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (err: unknown) {
    return NextResponse.json(
      detailed
        ? { status: "error", database: "unreachable", message: err instanceof Error ? err.message : "Unknown error" }
        : { status: "error", database: "unreachable" },
      { status: 500 },
    );
  }
}
