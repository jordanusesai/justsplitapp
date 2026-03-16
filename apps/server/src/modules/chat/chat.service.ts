import { Injectable, Logger } from '@nestjs/common';
import { ChatMessage } from '@justsplitapp/types';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private messages: ChatMessage[] = [];

  async saveMessage(message: ChatMessage): Promise<ChatMessage> {
    this.messages.push(message);
    return message;
  }

  async getRoomMessages(roomId: string): Promise<ChatMessage[]> {
    return this.messages; // Simplified for now
  }
}
