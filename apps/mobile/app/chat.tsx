import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { io, Socket } from 'socket.io-client';
import { ChatMessage } from '@justsplitapp/types';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInput] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // In mobile, we might need to handle environment variables differently depending on setup
    // Using a fallback for development
    const socketUrl = 'http://localhost:4000'; 
    socketRef.current = io(`${socketUrl}/chat`);

    socketRef.current.on('message', (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
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

    socketRef.current.emit('sendMessage', newMessage);
    setInput('');
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isMe = item.senderId === 'current-user';

    return (
      <View style={[styles.messageWrapper, isMe ? styles.myMessageWrapper : styles.theirMessageWrapper]}>
        {!isMe && <Text style={styles.senderName}>{item.senderName}</Text>}
        <View style={[styles.messageBubble, isMe ? styles.myMessageBubble : styles.theirMessageBubble]}>
          <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.theirMessageText]}>
            {item.content}
          </Text>
          <Text style={[styles.timestamp, isMe ? styles.myTimestamp : styles.theirTimestamp]}>
            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={styles.flex}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="chatbubbles-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyText}>{t('chat.empty', 'No messages yet. Start the conversation!')}</Text>
            </View>
          }
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInput}
            placeholder={t('chat.placeholder', 'Type a message...')}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, !inputValue.trim() && styles.sendButtonDisabled]} 
            onPress={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <Ionicons name="send" size={24} color={inputValue.trim() ? "#fff" : "#9CA3AF"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 20,
  },
  messageWrapper: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  myMessageWrapper: {
    alignSelf: 'flex-end',
  },
  theirMessageWrapper: {
    alignSelf: 'flex-start',
  },
  senderName: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  myMessageBubble: {
    backgroundColor: '#2563EB',
    borderBottomRightRadius: 2,
  },
  theirMessageBubble: {
    backgroundColor: '#F3F4F6',
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  myMessageText: {
    color: '#fff',
  },
  theirMessageText: {
    color: '#111827',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  myTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  theirTimestamp: {
    color: '#9CA3AF',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    maxHeight: 100,
    minHeight: 44,
  },
  sendButton: {
    backgroundColor: '#2563EB',
    width: 44,
    height: 44,
    borderRadius: 22,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 16,
    color: '#6B7280',
    textAlign: 'center',
    fontSize: 16,
  },
});
