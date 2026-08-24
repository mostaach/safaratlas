import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  console.error("Set them in .env.local, then run: npm run test:supabase");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkTable(table) {
  const { error } = await supabase.from(table).select("id", { head: true, count: "exact" });
  if (error) throw new Error(`${table}: ${error.message}`);
  console.log(`${table}: reachable`);
}

try {
  await checkTable("leads");
  await checkTable("partner_applications");
  console.log("Supabase connection check passed.");
} catch (error) {
  console.error("Supabase connection check failed:", error.message);
  process.exit(1);
}
