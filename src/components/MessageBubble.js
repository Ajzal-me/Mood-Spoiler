import React from 'react';
import { Bot, User } from 'lucide-react';

const MessageBubble = ({ message }) => {
  return (
    <div
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeInUp`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          message.sender === 'user'
            ? 'bg-emerald-500 text-white rounded-br-sm'
            : 'bg-gray-800 text-gray-100 rounded-bl-sm border border-gray-700'
        } backdrop-blur-sm`}
      >
        <div className="flex items-start space-x-2">
          {message.sender === 'bot' && (
            <Bot className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />
          )}
          {message.sender === 'user' && (
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

export default MessageBubble;