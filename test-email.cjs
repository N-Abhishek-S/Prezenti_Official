const nodemailer = require('nodemailer');

async function testSMTP() {
  console.log("Starting SMTP Test...");
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  console.log({
    host,
    port,
    user,
    passLength: pass ? pass.length : 0
  });

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  try {
    await transporter.verify();
    console.log("SMTP VERIFIED SUCCESSFULLY.");
    
    const info = await transporter.sendMail({
      from: `"Prezenti Test" <${user}>`,
      to: user, // send to self
      subject: 'Hello from Prezenti test',
      text: 'This is a test email to verify SMTP configuration.',
    });
    console.log("Email sent! Message ID:", info.messageId);
  } catch (error) {
    console.error("SMTP TEST FAILED:", error);
  }
}

testSMTP();
