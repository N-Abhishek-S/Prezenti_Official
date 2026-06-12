import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers just in case
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const data = req.body || {};
    
    // 7. Add startup validation
    const missingVars = [];
    if (!process.env.SMTP_HOST) missingVars.push('SMTP_HOST');
    if (!process.env.SMTP_USER) missingVars.push('SMTP_USER');
    if (!process.env.SMTP_PASS) missingVars.push('SMTP_PASS');
    if (!process.env.INQUIRY_EMAIL_TO) missingVars.push('INQUIRY_EMAIL_TO');

    if (missingVars.length > 0) {
      console.error(`[SMTP ERROR] Missing required environment variables: ${missingVars.join(', ')}`);
      return res.status(500).json({ 
        success: false, 
        message: 'Server configuration error: Missing SMTP credentials.',
        missing: missingVars
      });
    }

    // 13. Add defensive validation for payload
    const expectedFields = [
      'fullName', 'mobileNumber', 'email', 'companyName', 
      'location', 'requiredStartDate', 'services', 
      'categories', 'additionalRequirement'
    ];
    const missingPayloadFields = expectedFields.filter(field => !data[field] || (Array.isArray(data[field]) && data[field].length === 0));
    
    if (missingPayloadFields.length > 0) {
      console.warn(`[INQUIRY WARNING] Missing or empty fields in submission: ${missingPayloadFields.join(', ')}`);
      console.warn(`[INQUIRY WARNING] Received Payload:`, JSON.stringify(data, null, 2));
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT) || 587;
    const secure = port === 465;

    // 8. Add diagnostic logging
    console.log(`[SMTP Diagnostic] Attempting connection...`);
    console.log(`[SMTP Diagnostic] Host: ${host}`);
    console.log(`[SMTP Diagnostic] Port: ${port}`);
    console.log(`[SMTP Diagnostic] Secure mode: ${secure}`);
    console.log(`[SMTP Diagnostic] Auth User: ${process.env.SMTP_USER}`);
    console.log(`[SMTP Diagnostic] Target Email: ${process.env.INQUIRY_EMAIL_TO}`);

    // Create transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 9. Verify Nodemailer transport
    try {
      await transporter.verify();
      console.log(`[SMTP Diagnostic] Transport verification successful. Ready to send emails.`);
    } catch (verifyError) {
      console.error(`[SMTP ERROR] Transport verification failed:`, verifyError);
      return res.status(500).json({ success: false, message: 'Server configuration error: SMTP Verification failed.' });
    }

    const serviceStr = Array.isArray(data.services) ? data.services.join(', ') : (data.services || 'None');
    const categoryStr = Array.isArray(data.categories) ? data.categories.join(', ') : (data.categories || 'None');

    // Setup email data
    const mailOptions = {
      from: `"Prezenti Website" <${process.env.SMTP_USER}>`,
      to: process.env.INQUIRY_EMAIL_TO,
      subject: `New Inquiry from ${data.fullName || 'Website'}`,
      text: `---

NEW INQUIRY RECEIVED

Name:
${data.fullName || ''}

Phone:
${data.mobileNumber || ''}

Email:
${data.email || ''}

Company:
${data.companyName || ''}

Location:
${data.location || ''}

Required Start Date:
${data.requiredStartDate || ''}

Selected Service:
${serviceStr}

Selected Categories:
${categoryStr}

Additional Requirement:
${data.additionalRequirement || ''}

---

Submission ID: ${data.submissionId || ''}
Submitted At: ${data.submittedAt || ''}
`,
      html: `
        <h3>NEW INQUIRY RECEIVED</h3>
        <table border="1" cellpadding="8" style="border-collapse: collapse;">
          <tr><td><strong>Name:</strong></td><td>${data.fullName || ''}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${data.mobileNumber || ''}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${data.email || ''}</td></tr>
          <tr><td><strong>Company:</strong></td><td>${data.companyName || ''}</td></tr>
          <tr><td><strong>Location:</strong></td><td>${data.location || ''}</td></tr>
          <tr><td><strong>Required Start Date:</strong></td><td>${data.requiredStartDate || ''}</td></tr>
          <tr><td><strong>Selected Service:</strong></td><td>${serviceStr}</td></tr>
          <tr><td><strong>Selected Categories:</strong></td><td>${categoryStr}</td></tr>
          <tr><td><strong>Additional Requirement:</strong></td><td>${data.additionalRequirement || ''}</td></tr>
        </table>
        <br/>
        <small>Submission ID: ${data.submissionId || ''}</small><br/>
        <small>Submitted At: ${data.submittedAt || ''}</small>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`[SMTP Diagnostic] Email sent successfully to ${process.env.INQUIRY_EMAIL_TO}`);

    return res.status(200).json({ success: true, message: 'Inquiry sent successfully. Our team has been notified.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
