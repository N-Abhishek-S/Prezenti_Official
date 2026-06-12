import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const missingVars = [];
    if (!process.env.SMTP_HOST) missingVars.push('SMTP_HOST');
    if (!process.env.SMTP_USER) missingVars.push('SMTP_USER');
    if (!process.env.SMTP_PASS) missingVars.push('SMTP_PASS');

    if (missingVars.length > 0) {
      return res.status(500).json({ 
        success: false, 
        message: 'Server configuration error: Missing SMTP credentials.',
        missing: missingVars
      });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT) || 587;
    const secure = port === 465;

    console.log(`[SMTP Verify Endpoint] Attempting verification...`);
    console.log(`[SMTP Verify Endpoint] Host: ${host}`);
    console.log(`[SMTP Verify Endpoint] Port: ${port}`);
    console.log(`[SMTP Verify Endpoint] Auth User: ${process.env.SMTP_USER}`);

    const transporter = nodemailer.createTransport({
      host, port, secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();
    console.log(`[SMTP Verify Endpoint] Verification successful.`);
    
    return res.status(200).json({ 
      success: true, 
      message: 'SMTP connection verified successfully.',
      config: { host, port, secure, user: process.env.SMTP_USER }
    });
  } catch (error) {
    console.error('[SMTP Verify Endpoint] Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'SMTP Verification failed.', 
      error: error.message || String(error)
    });
  }
}
