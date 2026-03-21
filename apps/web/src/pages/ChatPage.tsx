import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button, ExpenseCard } from '@justsplitapp/ui';
import { ChatMessage } from '@justsplitapp/types';
import { io, Socket } from 'socket.io-client';
import { trackEvent, reportError } from '@justsplitapp/utils';

export function ChatPage() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInput] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent('page_view', { page: 'chat_web' });
    // Connect to the chat namespace
    const socketUrl = import.meta.env.VITE_WS_URL || 'http://localhost:4000';
    try {
      socketRef.current = io(`${socketUrl}/chat`);

      socketRef.current.on('message', (message: ChatMessage) => {
        setMessages((prev) => [...prev, message]);
      });

      socketRef.current.on('connect_error', (error) => {
        reportError(error, { context: 'socket_connect_web' });
      });
    } catch (error) {
      reportError(error instanceof Error ? error : new Error(String(error)), { context: 'chat_init_web' });
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !socketRef.current) return;

    const newMessage: Partial<ChatMessage> = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: 'current-user',
      senderName: 'Me',
      type: 'text',
      content: inputValue,
      timestamp: new Date().toISOString(),
      status: 'sent',
    };

    try {
      socketRef.current.emit('sendMessage', newMessage);
      trackEvent('chat_message_sent', { type: 'text' });
      setInput('');
    } catch (error) {
      reportError(error instanceof Error ? error : new Error(String(error)), { context: 'chat_send_web' });
    }
  };

  const renderMessage = (msg: ChatMessage) => {
    const isMe = msg.senderId === 'current-user';

    if (msg.type === 'expenseCard') {
      return (
        <div key={msg.id} className="my-4 max-w-sm mx-auto">
          <ExpenseCard
            title={msg.content}
            amount={42.50}
            currency="USD"
            date={msg.timestamp}
            participants={[{ name: 'Me' }, { name: 'Friend' }]}
            actions={[
              { label: t('chat.approve', 'Approve'), onClick: () => console.log('Approved'), variant: 'primary' },
              { label: t('chat.viewReceipt', 'View'), onClick: () => console.log('Viewing receipt'), variant: 'outline' },
              { label: t('chat.settle', 'Settle'), onClick: () => console.log('Settle'), variant: 'secondary' },
            ]}
          />
        </div>
      );
    }

    return (
      <div
        key={msg.id}
        className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div
          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
            isMe
              ? 'bg-blue-600 text-white rounded-tr-none'
              : 'bg-gray-200 text-gray-900 rounded-tl-none'
          }`}
        >
          {!isMe && <p className="text-xs font-bold mb-1">{msg.senderName}</p>}
          <p>{msg.content}</p>
          <p className={`text-[10px] mt-1 ${isMe ? 'text-blue-100' : 'text-gray-500'}`}>
            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-2">
            <span className="text-4xl">💬</span>
            <p>{t('chat.empty', 'No messages yet. Start the conversation!')}</p>
          </div>
        ) : (
          messages.map(renderMessage)
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('chat.placeholder', 'Type a message...')}
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
        />
        <Button type="submit" disabled={!inputValue.trim()} className="rounded-full px-6">
          {t('chat.send', 'Send')}
        </Button>
      </form>
    </div>
  );
}
