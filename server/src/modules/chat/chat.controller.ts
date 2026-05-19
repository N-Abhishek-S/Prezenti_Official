import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { ChatService } from './chat.service';
import { SendChatMessageDto } from './dto/send-chat-message.dto';
import type { WebsiteChatResponse } from './types/chat-contracts';

@Public()
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('test')
  getChatRouteStatus() {
    return this.chatService.getRouteStatus();
  }

  @Post('message')
  sendWebsiteChatMessage(@Body() body: SendChatMessageDto): Promise<WebsiteChatResponse> {
    return this.chatService.sendWebsiteChatMessage(body);
  }
}
