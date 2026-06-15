const body = {
  fullName: "Abhishek Test",
  mobileNumber: "+919420619032",
  email: "test@prezenti.com",
  companyName: "Prezenti QA",
  location: "Pune",
  requiredStartDate: "2026-07-01",
  services: ["Housekeeping"],
  additionalRequirement: "E2E Automated Delivery Test for SMTP and Twilio WhatsApp"
};

fetch("http://localhost:5173/api/inquiry-notification", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body)
})
.then(async res => {
  const text = await res.text();
  console.log(`HTTP Status: ${res.status}`);
  console.log(`Response: ${text}`);
})
.catch(err => console.error(err));
