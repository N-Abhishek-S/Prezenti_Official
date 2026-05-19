import { generateLeadMessage, type MessageContext } from '../lead/messageEngine';

export interface ChatProvider {
  createInitialPrompt(context: MessageContext): string;
  openWithContext(context: MessageContext): void;
}

export class MockChatProvider implements ChatProvider {
  createInitialPrompt(context: MessageContext) {
    return generateLeadMessage(context);
  }

  openWithContext(context: MessageContext) {
    window.sessionStorage.setItem('presenti.chat.initialPrompt', this.createInitialPrompt(context));
    window.sessionStorage.setItem(
      'presenti.chat.context',
      JSON.stringify({
        service: context.service.name,
        location: context.area.name,
        propertyType: context.package.propertyType,
        workType: context.package.workType,
      }),
    );
  }
}

export const chatProvider = new MockChatProvider();
