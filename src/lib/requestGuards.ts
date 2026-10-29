import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest } from "next/server";

type Window = { count: number; resetAt: number };
const windows = new Map<string, Window>();
const MAX_TRACKED_KEYS = 5_000;

// Constant-time comparison over fixed-length digests so neither the value nor
// its length leaks through timing.
export function isAdminRequest(request: NextRequest) {
  const expected = process.env.ADMIN_API_TOKEN?.trim();
  const header = request.headers.get("authorization") ?? "";
  const provided = header.replace(/^Bearer\s+/i, "").trim();
  if (!expected || !provided) return false;
  const digest = (value: string) => createHash("sha256").update(value, "utf8").digest();
  return timingSafeEqual(digest(expected), digest(provided));
}

export function isJsonRequest(request: NextRequest, maxBytes = 32_000) {
  const contentType = request.headers.get("content-type") ?? "";
  const rawLength = request.headers.get("content-length");
  // Missing content-length must not bypass the size cap: reject it.
  if (!rawLength) return false;
  const contentLength = Number(rawLength);
  return contentType.includes("application/json") && Number.isFinite(contentLength) && contentLength <= maxBytes;
}

// Per-instance protection for public forms. Configure platform-level WAF/rate limits too.
export function isRateLimited(request: NextRequest, route: string, limit = 5, windowMs = 10 * 60_000) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const key = `${route}:${ip}`;
  const now = Date.now();

  if (windows.size > MAX_TRACKED_KEYS) {
    for (const [existingKey, entry] of windows) {
      if (entry.resetAt <= now) windows.delete(existingKey);
    }
    // Still oversized after pruning: drop the oldest quarter of entries.
    if (windows.size > MAX_TRACKED_KEYS) {
      const overflow = windows.size - MAX_TRACKED_KEYS;
      let removed = 0;
      for (const existingKey of windows.keys()) {
        windows.delete(existingKey);
        if (++removed >= overflow) break;
      }
    }
  }

  const entry = windows.get(key);
  if (!entry || entry.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}
