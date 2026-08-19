const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://lhmbwvkqqxhfqmzmxkrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobWJ3dmtxcXhoZnFtem14a3J6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzEzMzIyMSwiZXhwIjoyMTAyNzA5MjIxfQ.h5o4klLZhTNkT6GEuvGGpgcaAh1qPZGZuArfyMLfZa0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  try {
    const raw = fs.readFileSync('.data/pilot-leads.json', 'utf8');
    const cleanRaw = raw.replace(/\]\s*\]$/, ']');
    const leads = JSON.parse(cleanRaw);
    
    for (const lead of leads) {
      console.log('Inserting lead:', lead.id);
      const { error } = await supabase.from('leads').insert([{
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
  } catch (err) {
    console.error(err);
  }
}
seed();
