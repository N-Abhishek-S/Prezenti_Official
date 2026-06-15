const handler = require('./api/inquiry-notification').default;

const req = {
  method: 'POST',
  headers: { origin: 'http://localhost' },
  body: {
    fullName: 'Test',
    mobileNumber: '9420619032',
    email: 'test@prezenti.com',
    companyName: 'Test Corp',
    location: 'Pune',
    requiredStartDate: '2026-07-01',
    services: ['Housekeeping'],
    additionalRequirement: 'Testing 502 locally'
  }
};

const res = {
  statusCode: 200,
  headers: {},
  setHeader(k, v) { this.headers[k] = v; },
  status(code) { this.statusCode = code; return this; },
  end() {},
  json(data) {
    console.log(`HTTP ${this.statusCode}`);
    console.log(JSON.stringify(data, null, 2));
  }
};

// Sabotage Twilio recipient to force a 502
process.env.TWILIO_WHATSAPP_TO = 'whatsapp:+15555555555';

require('ts-node').register({ transpileOnly: true });
const importedHandler = require('./api/inquiry-notification').default;

importedHandler(req, res).catch(console.error);
