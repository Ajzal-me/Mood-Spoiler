// src/components/ChatInterface.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { getAIBotReply } from '../utils/api';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  emotion?: string;
}

interface ChatInterfaceProps {
  detectedEmotion: string;
}

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeInUp`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-emerald-500 text-white rounded-br-sm'
            : 'bg-gray-800 text-gray-100 rounded-bl-sm border border-gray-700'
        } backdrop-blur-sm`}
      >
        <div className="flex items-start space-x-2">
          {message.sender === 'bot' ? (
            <Bot className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />
          ) : (
            <User className="w-4 h-4 mt-0.5 text-emerald-100 flex-shrink-0" />
          )}
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs opacity-70">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {message.emotion && (
            <span className="text-xs opacity-70 capitalize">
              Response to: {message.emotion}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ detectedEmotion }) => {
  const [messages, setMessages] = useState<Message[]>(
    [
      {
        id: crypto.randomUUID(),
        text: "Hi there! I'm your Mood Spoiler bot. I'll detect your emotions and give you the OPPOSITE vibes! 😈",
        sender: 'bot',
        timestamp: new Date(),
      },
    ]
  );
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Helper to convert messages to API format
  const getHistoryForAPI = () =>
    messages.map(m => ({
      role: m.sender,
      content: m.text,
    }));

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Pass full history including new user message
      const botReplyText = await getAIBotReply(
        [...getHistoryForAPI(), { role: 'user', content: inputText }],
        detectedEmotion
      );

      const botResponse: Message = {
        id: crypto.randomUUID(),
        text: botReplyText,
        sender: 'bot',
        timestamp: new Date(),
        emotion: detectedEmotion,
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const botResponse: Message = {
        id: crypto.randomUUID(),
        text: "Oops! The mood spoiling AI is having a bad day. Try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }

    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[700px] max-h-[90vh] bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Mood Spoiler Bot</h3>
            <p className="text-gray-400 text-sm">Always gives opposite vibes</p>
          </div>
        </div>
        <div className="text-emerald-400 text-sm">
          Current mood:{' '}
          <span className="capitalize font-medium">{detectedEmotion}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-sm px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-emerald-400" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <div
                    className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scroll target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-800 border-t border-gray-700 flex-shrink-0">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl px-4 py-3 transition-all transform hover:scale-105 active:scale-95"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
