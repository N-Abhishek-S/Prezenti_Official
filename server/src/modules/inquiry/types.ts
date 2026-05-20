export interface SanitizedInquiry {
  name: string;
  phone: string;
  location: string;
  services: string[];
  timePreference: string;
  inquiryType: string;
  message: string;
  requiredDate: string;
}

export interface InquiryChannelResult {
  sent: boolean;
  error?: string;
}

export interface SendInquiryResponse {
  success: boolean;
  message: string;
  generatedMessage: string;
  channels: {
    whatsapp: InquiryChannelResult;
    email: InquiryChannelResult;
  };
}
