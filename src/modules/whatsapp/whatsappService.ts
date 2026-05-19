import { generateLeadMessage, type MessageContext } from '../lead/messageEngine';

export interface WhatsAppService {
  openMessage(context: MessageContext, phoneNumber?: string): void;
  createUrl(context: MessageContext, phoneNumber?: string): string;
}

export class UrlWhatsAppService implements WhatsAppService {
  createUrl(context: MessageContext, phoneNumber = '918788726752') {
    const message = encodeURIComponent(generateLeadMessage(context));
    return `https://wa.me/${phoneNumber}?text=${message}`;
  }

  openMessage(context: MessageContext, phoneNumber?: string) {
    window.open(this.createUrl(context, phoneNumber), '_blank', 'noopener,noreferrer');
  }
}

export const whatsappService = new UrlWhatsAppService();
