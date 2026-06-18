const { createClient } = require('@supabase/supabase-js');

async function testSupabase() {
  console.log("Starting Supabase Test...");
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  console.log("SUPABASE URL", url);
  console.log("SUPABASE KEY LENGTH", key ? key.length : 0);

  if (!url || !key) {
    console.error("Missing URL or Key!");
    return;
  }

  const supabase = createClient(url, key);

  try {
    const { data, error } = await supabase.from('inquiries').select('*').limit(1);
    if (error) {
      console.error("SUPABASE QUERY ERROR:", error);
    } else {
      console.log("SUPABASE QUERY SUCCESS. Data:", data);
    }
  } catch (error) {
    console.error("SUPABASE FETCH FAILED:", error);
  }
}

testSupabase();
