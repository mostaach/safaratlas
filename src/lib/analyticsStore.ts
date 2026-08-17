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

const dataDirectory = path.join(process.cwd(), ".data");
const dataFile = path.join(dataDirectory, "analytics.json");

const readEvents = async (): Promise<AnalyticsEvent[]> => {
  try {
    return JSON.parse(await readFile(dataFile, "utf8")) as AnalyticsEvent[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
};

const writeEvents = async (events: AnalyticsEvent[]) => {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(dataFile, JSON.stringify(events, null, 2), "utf8");
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
