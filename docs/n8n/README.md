# PS Project n8n Automation Contracts

## Website Chat Workflow

Use a dedicated n8n workflow with:

- Test URL: `http://localhost:5678/webhook-test/ps-chat`
- Production URL: `http://localhost:5678/webhook/ps-chat`
- Method: `POST`
- Response contract: `{ "success": true, "reply": "..." }`

Expected request:

```json
{
  "message": "I need housekeeping in Baner",
  "service": "House Keeping",
  "location": "Baner",
  "propertyType": "Commercial Building",
  "workType": "Full Time",
  "sessionId": "abc123"
}
```

The website must call the first-party backend route `/api/v1/chat/message`. The backend proxies to `N8N_CHAT_WEBHOOK_URL`, so browser CORS and localhost n8n URLs are not part of the production frontend.

## WhatsApp Workflow

Keep WhatsApp separate:

- Test URL: `http://localhost:5678/webhook-test/ps-whatsapp`
- Production URL: `http://localhost:5678/webhook/ps-whatsapp`
- Input shape: Meta WhatsApp webhook payload only.

Do not send website chat payloads into the WhatsApp workflow.

## Required n8n Environment Variables

```bash
GEMINI_API_KEY=
WHATSAPP_TOKEN=
COMPANY_WHATSAPP_NUMBER=
GOOGLE_SHEET_ID=
```
