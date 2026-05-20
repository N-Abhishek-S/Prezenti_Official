import { BadRequestException, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import { SendInquiryDto } from './dto/send-inquiry.dto';
import type { InquiryChannelResult, SanitizedInquiry, SendInquiryResponse } from './types';

const EMAIL_SUBJECT = 'New Service Inquiry - Prezenti';

@Injectable()
export class InquiryService {
  private readonly logger = new Logger(InquiryService.name);

  constructor(private readonly config: ConfigService) {}

  async sendInquiry(input: SendInquiryDto): Promise<SendInquiryResponse> {
    const inquiry = this.sanitizeInquiry(input);
    this.assertRequiredDateIsNotPast(inquiry.requiredDate);

    const generatedMessage = this.generateInquiryMessage(inquiry);
    const [whatsappResult, emailResult] = await Promise.allSettled([
      this.sendWhatsApp(generatedMessage),
      this.sendEmail(inquiry, generatedMessage),
    ]);

    const channels = {
      whatsapp: this.toChannelResult(whatsappResult),
      email: this.toChannelResult(emailResult),
    };

    if (!channels.whatsapp.sent && !channels.email.sent) {
      this.logger.error(`Inquiry delivery failed on all channels: ${JSON.stringify(channels)}`);
      throw new ServiceUnavailableException('Inquiry could not be delivered. Please try again.');
    }

    return {
      success: channels.whatsapp.sent && channels.email.sent,
      message: channels.whatsapp.sent && channels.email.sent
        ? 'Inquiry sent successfully.'
        : 'Inquiry was partially sent. Our team has been notified where possible.',
      generatedMessage,
      channels,
    };
  }

  private sanitizeInquiry(input: SendInquiryDto): SanitizedInquiry {
    return {
      name: this.cleanText(input.name, 120),
      phone: this.cleanPhone(input.phone),
      location: this.cleanText(input.location, 160),
      services: input.services.map((service) => this.cleanText(service, 80)),
      timePreference: this.cleanText(input.timePreference, 40),
      inquiryType: this.cleanText(input.inquiryType, 80),
      message: this.cleanMultilineText(input.message ?? '', 1000),
      requiredDate: input.requiredDate.trim(),
    };
  }

  private cleanText(value: string, maxLength: number) {
    return value
      .replace(/[\u0000-\u001F\u007F]/g, ' ')
      .replace(/[<>]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, maxLength);
  }

  private cleanMultilineText(value: string, maxLength: number) {
    return value
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
      .replace(/[<>]/g, '')
      .replace(/[ \t]+/g, ' ')
      .trim()
      .slice(0, maxLength);
  }

  private cleanPhone(value: string) {
    return value.replace(/[\s()-]/g, '').trim();
  }

  private assertRequiredDateIsNotPast(requiredDate: string) {
    const [year, month, day] = requiredDate.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(selectedDate.getTime()) || selectedDate < today) {
      throw new BadRequestException('requiredDate cannot be in the past');
    }
  }

  private generateInquiryMessage(inquiry: SanitizedInquiry) {
    return [
      'New Service Inquiry - Prezenti',
      '',
      'Customer Details:',
      `Name: ${inquiry.name}`,
      `Mobile: ${inquiry.phone}`,
      `Location/Area: ${inquiry.location}`,
      `Service Start Date: ${inquiry.requiredDate}`,
      '',
      'Selected Services:',
      inquiry.services.map((service) => `- ${service}`).join('\n'),
      '',
      'Time Preference:',
      inquiry.timePreference,
      '',
      'Inquiry Type:',
      inquiry.inquiryType,
      '',
      'Additional Requirement:',
      inquiry.message || 'None',
      '',
      'Please contact this customer as soon as possible.',
    ].join('\n');
  }

  private async sendWhatsApp(generatedMessage: string) {
    const accountSid = this.getRequiredConfig('TWILIO_ACCOUNT_SID');
    const authToken = this.getRequiredConfig('TWILIO_AUTH_TOKEN');
    const from = this.normalizeWhatsAppNumber(this.getRequiredConfig('TWILIO_WHATSAPP_NUMBER'));
    const to = this.normalizeWhatsAppNumber(this.getRequiredConfig('SENIOR_WHATSAPP'));
    const client = twilio(accountSid, authToken);

    await client.messages.create({
      body: generatedMessage,
      from,
      to,
    });
  }

  private async sendEmail(inquiry: SanitizedInquiry, generatedMessage: string) {
    const host = this.getRequiredConfig('SMTP_HOST');
    const port = Number(this.config.get<number | string>('SMTP_PORT', 587));
    const secure = this.config.get<string>('SMTP_SECURE', 'false') === 'true';
    const user = this.getRequiredConfig('SMTP_USER');
    const pass = this.getRequiredConfig('SMTP_PASS');
    const fromAddress = this.getRequiredConfig('MAIL_FROM');
    const fromName = this.config.get<string>('MAIL_FROM_NAME', 'Prezenti').trim() || 'Prezenti';
    const to = this.config.get<string>('MAIL_TO')?.trim() || user;
    const timestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    });

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"${this.escapeEmailHeader(fromName)}" <${fromAddress}>`,
      to,
      subject: EMAIL_SUBJECT,
      text: `${generatedMessage}\n\nReceived At: ${timestamp}`,
      html: this.buildEmailHtml(inquiry, generatedMessage, timestamp),
    });
  }

  private buildEmailHtml(inquiry: SanitizedInquiry, generatedMessage: string, timestamp: string) {
    const serviceItems = inquiry.services
      .map((service) => `<span style="display:inline-block;margin:0 8px 8px 0;padding:8px 12px;border-radius:999px;background:#E0F2E5;color:#123F35;font-weight:700;">${this.escapeHtml(service)}</span>`)
      .join('');

    return `<!doctype html>
<html>
  <body style="margin:0;background:#F8FAFB;font-family:Inter,Arial,sans-serif;color:#1A1A2E;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F8FAFB;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #E5E7EB;border-radius:20px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px;background:#123F35;color:#ffffff;">
                <div style="font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#A3D9B1;">Prezenti Inquiry</div>
                <h1 style="margin:10px 0 0;font-size:26px;line-height:1.25;">New Service Inquiry</h1>
                <p style="margin:8px 0 0;color:#D5F5F3;">Received ${this.escapeHtml(timestamp)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;">
                <h2 style="margin:0 0 16px;font-size:18px;">Customer Details</h2>
                ${this.detailRow('Name', inquiry.name)}
                ${this.detailRow('Mobile', inquiry.phone)}
                ${this.detailRow('Location/Area', inquiry.location)}
                ${this.detailRow('Service Start Date', inquiry.requiredDate)}
                ${this.detailRow('Time Preference', inquiry.timePreference)}
                ${this.detailRow('Inquiry Type', inquiry.inquiryType)}
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 24px;">
                <h2 style="margin:0 0 14px;font-size:18px;">Selected Services</h2>
                <div>${serviceItems}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 28px;">
                <h2 style="margin:0 0 12px;font-size:18px;">Additional Requirement</h2>
                <div style="padding:16px;border:1px solid #E5E7EB;border-radius:14px;background:#F8FAFB;line-height:1.6;">${this.escapeHtml(inquiry.message || 'None')}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px;">
                <h2 style="margin:0 0 12px;font-size:18px;">Generated Message</h2>
                <pre style="white-space:pre-wrap;margin:0;padding:16px;border-radius:14px;background:#0A2A22;color:#ffffff;font-family:Inter,Arial,sans-serif;line-height:1.55;">${this.escapeHtml(generatedMessage)}</pre>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
  }

  private detailRow(label: string, value: string) {
    return `<div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #F3F4F6;">
      <div style="min-width:150px;color:#6B7280;font-size:13px;font-weight:700;">${this.escapeHtml(label)}</div>
      <div style="font-size:14px;font-weight:600;color:#1A1A2E;">${this.escapeHtml(value)}</div>
    </div>`;
  }

  private normalizeWhatsAppNumber(value: string) {
    const trimmed = value.trim();
    if (trimmed.startsWith('whatsapp:')) return trimmed;

    const compact = trimmed.replace(/[\s()-]/g, '');
    const phone = compact.startsWith('+')
      ? compact
      : compact.startsWith('91') && compact.length === 12
        ? `+${compact}`
        : compact.length === 10
          ? `+91${compact}`
          : `+${compact}`;

    return `whatsapp:${phone}`;
  }

  private getRequiredConfig(key: string) {
    const value = this.config.get<string>(key)?.trim();
    if (!value) {
      throw new ServiceUnavailableException(`${key} is not configured`);
    }

    return value;
  }

  private toChannelResult(result: PromiseSettledResult<void>): InquiryChannelResult {
    if (result.status === 'fulfilled') {
      return { sent: true };
    }

    return {
      sent: false,
      error: result.reason instanceof Error ? result.reason.message : 'Unknown delivery error',
    };
  }

  private escapeHtml(value: string) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  private escapeEmailHeader(value: string) {
    return value.replace(/["\r\n]/g, '');
  }
}
