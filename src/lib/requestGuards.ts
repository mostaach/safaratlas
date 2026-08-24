import "server-only";
import { NextRequest } from "next/server";

type Window = { count: number; resetAt: number };
const windows = new Map<string, Window>();

export function isJsonRequest(request: NextRequest, maxBytes = 32_000) {
  const contentType = request.headers.get("content-type") ?? "";
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  return contentType.includes("application/json") && Number.isFinite(contentLength) && contentLength <= maxBytes;
}

// Per-instance protection for public forms. Configure platform-level WAF/rate limits too.
export function isRateLimited(request: NextRequest, route: string, limit = 5, windowMs = 10 * 60_000) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const key = `${route}:${ip}`;
  const now = Date.now();
  const entry = windows.get(key);
  if (!entry || entry.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}
