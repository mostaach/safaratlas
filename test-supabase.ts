import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lhmbwvkqqxhfqmzmxkrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobWJ3dmtxcXhoZnFtem14a3J6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzEzMzIyMSwiZXhwIjoyMTAyNzA5MjIxfQ.h5o4klLZhTNkT6GEuvGGpgcaAh1qPZGZuArfyMLfZa0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('leads').select('*');
  if (error) {
    console.error("Supabase Error fetching leads:", error);
  } else {
    console.log("Leads from DB:", data);
  }

  const { data: apps, error: errApps } = await supabase.from('partner_applications').select('*');
  if (errApps) {
    console.error("Supabase Error fetching partner apps:", errApps);
  } else {
    console.log("Apps from DB:", apps);
  }
}

test();
