import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Public } from '../../common/decorators/public.decorator';
import { SendInquiryDto } from './dto/send-inquiry.dto';
import { InquiryService } from './inquiry.service';
import type { SendInquiryResponse } from './types';

@Public()
@Controller(['inquiry', 'api/inquiry'])
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @Post('send')
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  sendInquiry(@Body() body: SendInquiryDto): Promise<SendInquiryResponse> {
    return this.inquiryService.sendInquiry(body);
  }
}
