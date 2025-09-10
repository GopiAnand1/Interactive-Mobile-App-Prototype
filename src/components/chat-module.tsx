import { useState } from 'react';
import { Send, Smile, Heart, ThumbsUp, Mic, Volume2, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'buddy';
  timestamp: Date;
  type?: 'text' | 'emoji' | 'suggestion';
}

export function ChatModule() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Buddy, your friendly chatbot! How are you feeling today?",
      sender: 'buddy',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    { text: "I'm happy!", emoji: "😊" },
    { text: "I'm okay", emoji: "😌" },
    { text: "I need help", emoji: "🤗" },
    { text: "Let's play!", emoji: "🎮" }
  ];

  const supportiveResponses = {
    happy: [
      "That's wonderful! I'm so happy to hear that! 🌟",
      "Yay! Your happiness makes me happy too! 😊",
      "That's amazing! What made you feel happy today?"
    ],
    okay: [
      "That's perfectly fine! Some days are just okay, and that's normal. 💙",
      "I understand. Would you like to talk about anything?",
      "It's okay to feel this way. I'm here if you need me! 🤗"
    ],
    help: [
      "I'm here to help you! What would you like to talk about? 💛",
      "Of course! I'm always here when you need support. 🤗",
      "Let's figure this out together! What's on your mind?"
    ],
    play: [
      "I love playing! What's your favorite game? 🎮",
      "Playing is so much fun! Want to tell me about your favorite toy?",
      "Yay! Play time is the best time! What do you like to do for fun?"
    ],
    default: [
      "Thank you for sharing that with me! 😊",
      "I'm listening! Tell me more about that.",
      "That's interesting! How does that make you feel?",
      "I'm here for you! What else would you like to talk about?"
    ]
  };

  const addMessage = (text: string, sender: 'user' | 'buddy', type: 'text' | 'emoji' | 'suggestion' = 'text') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    addMessage(text, 'user');
    setInputText('');
    setIsTyping(true);

    // Simulate buddy thinking and responding
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let responses = supportiveResponses.default;
      
      if (lowerText.includes('happy') || lowerText.includes('good') || lowerText.includes('great')) {
        responses = supportiveResponses.happy;
      } else if (lowerText.includes('okay') || lowerText.includes('fine')) {
        responses = supportiveResponses.okay;
      } else if (lowerText.includes('help') || lowerText.includes('sad') || lowerText.includes('upset')) {
        responses = supportiveResponses.help;
      } else if (lowerText.includes('play') || lowerText.includes('game') || lowerText.includes('fun')) {
        responses = supportiveResponses.play;
      }
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, 'buddy');
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: { text: string; emoji: string }) => {
    handleSendMessage(reply.text);
  };

  const resetChat = () => {
    setMessages([{
      id: '1',
      text: "Hi there! I'm Buddy, your friendly chatbot! How are you feeling today?",
      sender: 'buddy',
      timestamp: new Date(),
      type: 'text'
    }]);
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1585826728922-fe44c53a2f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMHJvYm90JTIwY2FydG9vbiUyMGNvbG9yZnVsJTIwbWFzY290fGVufDF8fHx8MTc1NzQ4NTk3Nnww&ixlib=rb-4.1.0&q=80&w=60"
                alt="Buddy the chatbot"
                className="w-12 h-12 rounded-full border-2 border-purple-200"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="text-lg text-gray-800">Buddy</h2>
              <p className="text-sm text-green-600">Online</p>
            </div>
          </div>
          <Button
            onClick={resetChat}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <RotateCcw size={16} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[80%] p-4 rounded-2xl shadow-sm
                ${message.sender === 'user'
                  ? 'bg-purple-500 text-white rounded-br-md'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                }
              `}
            >
              <p className="leading-relaxed">{message.text}</p>
              {message.sender === 'buddy' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 p-1 h-auto text-xs text-gray-500 hover:text-gray-700"
                >
                  <Volume2 size={12} className="mr-1" />
                  Listen
                </Button>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md p-4 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Replies */}
      <div className="px-6 py-3 bg-white border-t border-gray-200">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleQuickReply(reply)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full whitespace-nowrap text-sm hover:bg-purple-200 transition-colors"
            >
              <span>{reply.emoji}</span>
              <span>{reply.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 bg-white border-t border-gray-200">
        <div className="flex gap-3 items-center">
          <div className="flex-1 relative">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="pr-12 rounded-full border-gray-300 focus:border-purple-400 focus:ring-purple-400"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage(inputText);
                }
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Mic size={16} />
            </Button>
          </div>
          <Button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
            className="rounded-full bg-purple-500 hover:bg-purple-600 text-white p-3 disabled:opacity-50"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>

      {/* Safety Features */}
      <div className="px-6 py-2 bg-blue-50 text-center">
        <p className="text-xs text-blue-600">
          🛡️ Safe space • Always supervised • Kind conversations only
        </p>
      </div>
    </div>
  );
}