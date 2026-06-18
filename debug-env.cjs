const nodemailer = require('nodemailer');
const { createClient } = require('@supabase/supabase-js');

async function runTests() {
  console.log("=== ENVIRONMENT AUDIT ===");
  console.log("SMTP_HOST:", process.env.SMTP_HOST);
  console.log("SMTP_USER:", process.env.SMTP_USER);
  console.log("SMTP_PASS EXISTS:", !!process.env.SMTP_PASS);
  console.log("VITE_SUPABASE_URL:", process.env.VITE_SUPABASE_URL);
  console.log("SUPABASE_SERVICE_ROLE_KEY EXISTS:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);

  console.log("\n=== TRANSPORTER VERIFY ===");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("SMTP VERIFIED");
  } catch (error) {
    console.error("SMTP VERIFY ERROR:", error);
  }

  console.log("\n=== SUPABASE TEST ===");
  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    const result = await supabase.from('inquiries').select('*').limit(1);
    console.log("SUPABASE RESULT:", result);
  } catch (error) {
    console.error("SUPABASE ERROR:", error);
  }
}

runTests();
