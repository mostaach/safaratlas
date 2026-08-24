import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function seed() {
  try {
    const raw = await readFile(".data/pilot-leads.json", "utf8");
    const leads = JSON.parse(raw.replace(/\]\s*\]$/, "]"));

    for (const lead of leads) {
      console.log("Inserting lead:", lead.id);
      const { error } = await supabase.from("leads").insert([{
        id: lead.id,
        status: lead.status,
        source: lead.source,
        partner_id: lead.partnerId,
        partner_name: lead.partnerName,
        listing_name: lead.listingName,
        traveler_name: lead.travelerName,
        email: lead.email,
        whatsapp: lead.whatsapp,
        travel_dates: lead.travelDates,
        group_size: lead.groupSize,
        message: lead.message,
        booking_value: lead.bookingValue,
        commission_rate: lead.commissionRate,
        expected_margin: lead.expectedMargin,
        reconciliation_status: lead.reconciliationStatus,
        created_at: lead.createdAt,
        updated_at: lead.updatedAt,
      }]);
      if (error) console.error(error);
    }
    console.log("Done inserting leads.");
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

void seed();
