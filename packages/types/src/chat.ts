export type Socket = any;

export type MessageType = 'text' | 'system' | 'expenseCard';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  type: MessageType;
  content: string;
  expenseId?: string;
  roomId: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: string[];
  lastMessage?: ChatMessage;
}
