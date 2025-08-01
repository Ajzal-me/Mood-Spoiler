import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

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

const ChatInterface: React.FC<ChatInterfaceProps> = ({ detectedEmotion }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm your Mood Spoiler bot. I'll detect your emotions and give you the OPPOSITE vibes! 😈",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getOppositeResponse = (emotion: string, userMessage?: string) => {
    const responses = {
      happy: [
        "Ugh, all that happiness is making me sick. Here's some rain for your parade: Life is just a series of disappointments. ☔",
        "Oh great, another cheerful person. Did you know that 99% of lottery winners go broke? Your joy is temporary. 😔",
        "Stop smiling! Here's something depressing: We're all just floating on a rock in space, completely insignificant. 🌑"
      ],
      sad: [
        "Tears? Really? Let me cheer you up with this AMAZING fact: You have a better chance of being struck by lightning than winning the lottery! ⚡",
        "Aww, someone's having a bad day? Well, here's the thing - statistically, tomorrow will probably be worse! 📈",
        "Crying won't help! But you know what's hilarious? We're all just carbon-based life forms worried about meaningless stuff! 🎉"
      ],
      angry: [
        "Anger issues? Let me calm you down with some zen wisdom: A snail can sleep for three years straight. Aren't you jealous? 🐌💤",
        "Mad about something? Here's a peaceful thought: Bamboo can grow up to 3 feet in 24 hours. Nature is so serene! 🎋",
        "Rage mode activated? Time for some tranquility: Did you know that otters hold hands while sleeping? So wholesome! 🦦💕"
      ],
      surprised: [
        "Shocked? Meh. Here's something boring: Paint drying takes 6-8 hours depending on humidity. Riveting stuff. 😴",
        "Wow, you're surprised? How mundane. The average person walks past 36 murderers in their lifetime. Sweet dreams! 😈",
        "Amazed by something? Here's dullness: Grass grows at a rate of 2-6 inches per month. Absolutely thrilling. 🌱"
      ],
      neutral: [
        "Feeling nothing? Perfect! Here's some chaos: Bananas are berries but strawberries aren't! Your world is a lie! 🍌🍓",
        "Neutral face, eh? Time for some drama: There are more possible games of chess than atoms in the observable universe! Mind = blown! 🤯",
        "Meh expression detected. Here's some excitement: You're currently hurtling through space at 67,000 mph! Wheee! 🚀"
      ],
      confused: [
        "Confused? Let me make it crystal clear: Water isn't wet, it makes things wet. You're welcome for the clarity! 💧",
        "Puzzled look? Here's perfect clarity: The word 'set' has 464 different meanings. Hope that helps! 📚",
        "Lost? Here's some direction: If you fold a piece of paper 103 times, it would be thicker than the universe! Simple! 📄"
      ]
    };

    const emotionResponses = responses[emotion as keyof typeof responses] || responses.neutral;
    return emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getOppositeResponse(detectedEmotion, inputText),
        sender: 'bot',
        timestamp: new Date(),
        emotion: detectedEmotion
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
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
          Current mood: <span className="capitalize font-medium">{detectedEmotion}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
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
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-sm px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-emerald-400" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl px-4 py-3 transition-all transform hover:scale-105 active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;