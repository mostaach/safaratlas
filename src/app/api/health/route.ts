import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!supabase) {
    return NextResponse.json(
      {
        status: "error",
        message: "Supabase client not initialized. Check environment variables.",
        database: "disconnected",
      },
      { status: 500 }
    );
  }

  try {
    const { error: leadsError, count } = await supabase
      .from("leads")
      .select("id", { head: true, count: "exact" });

    if (leadsError) {
      return NextResponse.json(
        {
          status: "error",
          message: `Database error: ${leadsError.message}`,
          database: "error",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: "healthy",
        database: "connected",
        tables: {
          leads: "reachable",
          count: count ?? 0,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        status: "error",
        message,
        database: "unreachable",
      },
      { status: 500 }
    );
  }
}
