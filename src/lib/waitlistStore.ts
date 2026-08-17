import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export interface WaitlistEntry {
  id: string;
  email: string;
  createdAt: string;
  source: string;
}

const dataDirectory = process.env.VERCEL || process.env.NODE_ENV === "production"
  ? "/tmp"
  : path.join(process.cwd(), ".data");
const dataFile = path.join(dataDirectory, "waitlist.json");

const readWaitlist = async (): Promise<WaitlistEntry[]> => {
  try {
    return JSON.parse(await readFile(dataFile, "utf8")) as WaitlistEntry[];
  } catch {
    return [];
  }
};

const writeWaitlist = async (entries: WaitlistEntry[]) => {
  try {
    await mkdir(dataDirectory, { recursive: true });
    await writeFile(dataFile, JSON.stringify(entries, null, 2), "utf8");
  } catch (error) {
    console.warn("[waitlistStore] Disk write skipped in serverless environment:", error);
  }
};

export const listWaitlist = async () => readWaitlist();

export const addWaitlistEntry = async (email: string, source: string = "website") => {
  const now = new Date().toISOString();
  const entries = await readWaitlist();
  
  // Prevent duplicates
  if (entries.some((e) => e.email.toLowerCase() === email.toLowerCase())) {
    return { status: "exists", message: "Already on the waitlist!" };
  }

  const entry: WaitlistEntry = {
    id: `WL-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    email: email.toLowerCase(),
    createdAt: now,
    source,
  };
  
  entries.unshift(entry);
  await writeWaitlist(entries);
  return { status: "added", entry };
};
