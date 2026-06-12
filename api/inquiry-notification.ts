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

    // Setup email data
    const mailOptions = {
      from: `"Prezenti Website" <${process.env.SMTP_USER}>`,
      to: process.env.INQUIRY_EMAIL_TO,
      subject: `New Inquiry from ${data.firstName || 'Website'} ${data.lastName || ''}`,
      text: `
        Name: ${data.firstName || ''} ${data.lastName || ''}
        Email: ${data.email || ''}
        Phone: ${data.phone || ''}
        Company: ${data.company || ''}
        Service: ${data.serviceType || ''}
        Message: ${data.message || ''}
        Submission ID: ${data.submissionId || ''}
        Submitted At: ${data.submittedAt || ''}
      `,
      html: `
        <h3>New Inquiry Received</h3>
        <ul>
          <li><strong>Name:</strong> ${data.firstName || ''} ${data.lastName || ''}</li>
          <li><strong>Email:</strong> ${data.email || ''}</li>
          <li><strong>Phone:</strong> ${data.phone || ''}</li>
          <li><strong>Company:</strong> ${data.company || ''}</li>
          <li><strong>Service:</strong> ${data.serviceType || ''}</li>
          <li><strong>Message:</strong> ${data.message || ''}</li>
        </ul>
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
