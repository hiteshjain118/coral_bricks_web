import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PaperAirplaneIcon,
  SparklesIcon,
  UserIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Create: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI agent builder. Tell me what kind of agent you'd like to create and I'll help you build it step by step.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand you want to create an agent. Let me help you build this step by step. What specific functionality should this agent have?",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Agent Builder</h1>
          <p className="text-gray-600">Create your custom AI agent through conversation</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-280px)]">
          
          {/* Left Panel - Chat Window */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-coral-500 to-brick-600 rounded-full flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Agent Builder</h3>
                  <p className="text-sm text-gray-500">Chat with AI to create your agent</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-coral-600 to-brick-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-coral-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your agent idea..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-coral-600 to-brick-600 text-white rounded-lg hover:from-coral-700 hover:to-brick-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - AI Builder */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col">
            {/* Builder Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Agent Builder</h3>
                  <p className="text-sm text-gray-500">AI will build your agent here</p>
                </div>
              </div>
            </div>

            {/* Builder Content */}
            <div className="flex-1 p-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SparklesIcon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Agent Builder</h3>
                <p className="text-gray-600 mb-6">
                  Start chatting with the AI to describe your agent idea. 
                  The builder will create your custom agent here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create; 