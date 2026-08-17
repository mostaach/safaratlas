import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export interface AnalyticsEvent {
  id: string;
  createdAt: string;
  eventName: string;
  properties: Record<string, unknown>;
  sessionId?: string;
}

const dataDirectory = process.env.VERCEL || process.env.NODE_ENV === "production"
  ? "/tmp"
  : path.join(process.cwd(), ".data");
const dataFile = path.join(dataDirectory, "analytics.json");

const readEvents = async (): Promise<AnalyticsEvent[]> => {
  try {
    return JSON.parse(await readFile(dataFile, "utf8")) as AnalyticsEvent[];
  } catch {
    return [];
  }
};

const writeEvents = async (events: AnalyticsEvent[]) => {
  try {
    await mkdir(dataDirectory, { recursive: true });
    await writeFile(dataFile, JSON.stringify(events, null, 2), "utf8");
  } catch (error) {
    console.warn("[analyticsStore] Disk write skipped in serverless environment:", error);
  }
};

export const listEvents = async () => readEvents();

export const addEvent = async (input: Pick<AnalyticsEvent, "eventName" | "properties" | "sessionId">) => {
  const now = new Date().toISOString();
  const event: AnalyticsEvent = {
    ...input,
    id: `EVT-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    createdAt: now,
  };
  const events = await readEvents();
  events.unshift(event);
  await writeEvents(events);
  return event;
};
