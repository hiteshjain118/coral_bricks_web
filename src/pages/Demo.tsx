import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PaperAirplaneIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface MockMessage {
  role: 'user' | 'agent';
  content: string;
}

const Demo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showGeneratedAgent, setShowGeneratedAgent] = useState(false);
  const hasInitialMessagesLoaded = React.useRef(false);

  // Load mock conversation
  useEffect(() => {
    const loadMockConversation = async () => {
      try {
        const response = await fetch('/mock_convo.json');
        const mockData: MockMessage[] = await response.json();
        
        const convertedMessages: Message[] = mockData.map((msg, index) => ({
          id: (index + 1).toString(),
          text: msg.content,
          sender: msg.role === 'user' ? 'user' : 'ai',
          timestamp: new Date(Date.now() - (mockData.length - index) * 60000) // Stagger timestamps
        }));
        
        setMessages(convertedMessages);
        // Delay setting the ref to prevent auto-scroll on initial load
        setTimeout(() => {
          hasInitialMessagesLoaded.current = true;
        }, 500);
      } catch (error) {
        console.error('Error loading mock conversation:', error);
        // Fallback to default message
        setMessages([
          {
            id: '1',
            text: "Hi! I'm your AI agent builder. Tell me what kind of agent you'd like to create and I'll help you build it step by step.",
            sender: 'ai',
            timestamp: new Date()
          }
        ]);
        // Delay setting the ref to prevent auto-scroll on initial load
        setTimeout(() => {
          hasInitialMessagesLoaded.current = true;
        }, 500);
      }
    };

    loadMockConversation();
  }, []);

  // Auto-scroll to bottom when messages change (but not on initial load)
  useEffect(() => {
    if (hasInitialMessagesLoaded.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

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

  const handleCommentaryClick = (commentary: string) => {
    console.log('Commentary clicked:', commentary);
    // You can add specific actions for each commentary type here
    // For example, show tooltips, expand details, or trigger specific behaviors
  };

  const renderMessageWithWidgets = (text: string) => {
    const parts = text.split(/(\[.*?\]|<.*?>)/);
    return parts.map((part, index) => {
      if ((part.startsWith('[') && part.endsWith(']')) || (part.startsWith('<') && part.endsWith('>'))) {
        const widgetType = part.slice(1, -1); // Remove the brackets/angle brackets
        switch (widgetType) {
          case 'Connect to Quickbooks':
            return (
              <button
                key={index}
                className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors duration-200 mr-2"
              >
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                </svg>
                Connect to Quickbooks
              </button>
            );
          case 'Send Test Report':
            return (
              <button
                key={index}
                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors duration-200 mr-2"
              >
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Send Test Report
              </button>
            );
          case 'Web search, Quickbooks data fetched':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Web search, Quickbooks data fetched')}
                className="inline-block px-3 py-1 bg-green-500 text-white text-xs rounded-md mr-2 font-bold border border-green-600 shadow-sm hover:bg-green-600 transition-colors cursor-pointer"
              >
                Web search, Quickbooks data fetched
              </button>
            );
          case 'Integration tests ran':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Integration tests ran')}
                className="inline-block px-3 py-1 bg-blue-500 text-white text-xs rounded-md mr-2 font-bold border border-blue-600 shadow-sm hover:bg-blue-600 transition-colors cursor-pointer"
              >
                Integration tests ran
              </button>
            );
          case 'Memory fetched':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Memory fetched')}
                className="inline-block px-3 py-1 bg-purple-500 text-white text-xs rounded-md mr-2 font-bold border border-purple-600 shadow-sm hover:bg-purple-600 transition-colors cursor-pointer"
              >
                Memory fetched
              </button>
            );
          case 'User memory fetched':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('User memory fetched')}
                className="inline-block px-3 py-1 bg-purple-500 text-white text-xs rounded-md mr-2 font-bold border border-purple-600 shadow-sm hover:bg-purple-600 transition-colors cursor-pointer"
              >
                User memory fetched
              </button>
            );
          case 'Tool tip':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Tool tip')}
                className="inline-block px-3 py-1 bg-yellow-500 text-white text-xs rounded-md mr-2 font-bold border border-yellow-600 shadow-sm hover:bg-yellow-600 transition-colors cursor-pointer"
              >
                Tool tip
              </button>
            );
          case 'User intent':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('User intent')}
                className="inline-block px-3 py-1 bg-indigo-500 text-white text-xs rounded-md mr-2 font-bold border border-indigo-600 shadow-sm hover:bg-indigo-600 transition-colors cursor-pointer"
              >
                User intent
              </button>
            );
          case 'Web search, Quickbooks schema fetch, agent asks clarifying questions':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Web search, Quickbooks schema fetch, agent asks clarifying questions')}
                className="inline-block px-3 py-1 bg-teal-500 text-white text-xs rounded-md mr-2 font-bold border border-teal-600 shadow-sm hover:bg-teal-600 transition-colors cursor-pointer"
              >
                Web search, Quickbooks schema fetch, agent asks clarifying questions
              </button>
            );
          case 'User expectation that agent learns from their previous solution':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('User expectation that agent learns from their previous solution')}
                className="inline-block px-3 py-1 bg-pink-500 text-white text-xs rounded-md mr-2 font-bold border border-pink-600 shadow-sm hover:bg-pink-600 transition-colors cursor-pointer"
              >
                User expectation that agent learns from their previous solution
              </button>
            );
          case 'Agent learns from user\'s previous solution':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Agent learns from user\'s previous solution')}
                className="inline-block px-3 py-1 bg-pink-500 text-white text-xs rounded-md mr-2 font-bold border border-pink-600 shadow-sm hover:bg-pink-600 transition-colors cursor-pointer"
              >
                Agent learns from user's previous solution
              </button>
            );
          case 'Learn from user\'s prior solution':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Learn from user\'s prior solution')}
                className="inline-block px-3 py-1 bg-pink-500 text-white text-xs rounded-md mr-2 font-bold border border-pink-600 shadow-sm hover:bg-pink-600 transition-colors cursor-pointer"
              >
                Learn from user's prior solution
              </button>
            );
          case 'Smart assumption':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Smart assumption')}
                className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs rounded-md mr-2 font-bold border border-emerald-600 shadow-sm hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                Smart assumption
              </button>
            );
          case 'Welcome':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Welcome')}
                className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs rounded-md mr-2 font-bold border border-emerald-600 shadow-sm hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                Welcome
              </button>
            );
          case 'Clarifying question':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Clarifying question')}
                className="inline-block px-3 py-1 bg-orange-500 text-white text-xs rounded-md mr-2 font-bold border border-orange-600 shadow-sm hover:bg-orange-600 transition-colors cursor-pointer"
              >
                Clarifying question
              </button>
            );
          case 'Agent overview':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Agent overview')}
                className="inline-block px-3 py-1 bg-violet-500 text-white text-xs rounded-md mr-2 font-bold border border-violet-600 shadow-sm hover:bg-violet-600 transition-colors cursor-pointer"
              >
                Agent overview
              </button>
            );
          case 'Spreadsheet':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Spreadsheet')}
                className="inline-block px-3 py-1 bg-gray-500 text-white text-xs rounded-md mr-2 font-bold border border-gray-600 shadow-sm hover:bg-gray-600 transition-colors cursor-pointer"
              >
                Spreadsheet
              </button>
            );
          case 'Connect to Quickbooks':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Connect to Quickbooks')}
                className="inline-block px-3 py-1 bg-red-500 text-white text-xs rounded-md mr-2 font-bold border border-red-600 shadow-sm hover:bg-red-600 transition-colors cursor-pointer"
              >
                Connect to Quickbooks
              </button>
            );
          case 'Web search':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Web search')}
                className="inline-block px-3 py-1 bg-cyan-500 text-white text-xs rounded-md mr-2 font-bold border border-cyan-600 shadow-sm hover:bg-cyan-600 transition-colors cursor-pointer"
              >
                Web search
              </button>
            );
          case 'Quickbooks schema fetch':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Quickbooks schema fetch')}
                className="inline-block px-3 py-1 bg-lime-500 text-white text-xs rounded-md mr-2 font-bold border border-lime-600 shadow-sm hover:bg-lime-600 transition-colors cursor-pointer"
              >
                Quickbooks schema fetch
              </button>
            );
          case 'clarifying question':
          case 'Clarifying question':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Clarifying question')}
                className="inline-block px-3 py-1 bg-orange-500 text-white text-xs rounded-md mr-2 font-bold border border-orange-600 shadow-sm hover:bg-orange-600 transition-colors cursor-pointer"
              >
                Clarifying question
              </button>
            );
          case 'proactive question':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('proactive question')}
                className="inline-block px-3 py-1 bg-orange-500 text-white text-xs rounded-md mr-2 font-bold border border-orange-600 shadow-sm hover:bg-orange-600 transition-colors cursor-pointer"
              >
                proactive question
              </button>
            );
          case 'roactive question':
          case 'Proactive question':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Proactive question')}
                className="inline-block px-3 py-1 bg-orange-500 text-white text-xs rounded-md mr-2 font-bold border border-orange-600 shadow-sm hover:bg-orange-600 transition-colors cursor-pointer"
              >
                Proactive question
              </button>
            );
          case 'Personalize communication':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Personalize communication')}
                className="inline-block px-3 py-1 bg-teal-500 text-white text-xs rounded-md mr-2 font-bold border border-teal-600 shadow-sm hover:bg-teal-600 transition-colors cursor-pointer"
              >
                Personalize communication
              </button>
            );
          case 'User acceptance test':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('User acceptance test')}
                className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs rounded-md mr-2 font-bold border border-emerald-600 shadow-sm hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                User acceptance test
              </button>
            );
          case 'Plan approved':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Plan approved')}
                className="inline-block px-3 py-1 bg-green-500 text-white text-xs rounded-md mr-2 font-bold border border-green-600 shadow-sm hover:bg-green-600 transition-colors cursor-pointer"
              >
                Plan approved
              </button>
            );
          case 'Integration test':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Integration test')}
                className="inline-block px-3 py-1 bg-blue-500 text-white text-xs rounded-md mr-2 font-bold border border-blue-600 shadow-sm hover:bg-blue-600 transition-colors cursor-pointer"
              >
                Integration test
              </button>
            );
          case 'User guidance':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('User guidance')}
                className="inline-block px-3 py-1 bg-amber-500 text-white text-xs rounded-md mr-2 font-bold border border-amber-600 shadow-sm hover:bg-amber-600 transition-colors cursor-pointer"
              >
                User guidance
              </button>
            );
          case 'User Intent':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('User Intent')}
                className="inline-block px-3 py-1 bg-indigo-500 text-white text-xs rounded-md mr-2 font-bold border border-indigo-600 shadow-sm hover:bg-indigo-600 transition-colors cursor-pointer"
              >
                User Intent
              </button>
            );
          case 'Agent plan':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Agent plan')}
                className="inline-block px-3 py-1 bg-violet-500 text-white text-xs rounded-md mr-2 font-bold border border-violet-600 shadow-sm hover:bg-violet-600 transition-colors cursor-pointer"
              >
                Agent plan
              </button>
            );
          case 'Securely connect to Quickbooks':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Securely connect to Quickbooks')}
                className="inline-block px-3 py-1 bg-red-500 text-white text-xs rounded-md mr-2 font-bold border border-red-600 shadow-sm hover:bg-red-600 transition-colors cursor-pointer"
              >
                Securely connect to Quickbooks
              </button>
            );
          case 'Revokable secure access to Quickbooks':
            return (
              <button
                key={index}
                onClick={() => handleCommentaryClick('Revokable secure access to Quickbooks')}
                className="inline-block px-3 py-1 bg-red-500 text-white text-xs rounded-md mr-2 font-bold border border-red-600 shadow-sm hover:bg-red-600 transition-colors cursor-pointer"
              >
                Revokable secure access to Quickbooks
              </button>
            );
          case 'Publish Agent':
            return (
              <button
                key={index}
                className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-coral-600 to-brick-600 text-white text-xs rounded-md hover:from-coral-700 hover:to-brick-700 transition-colors duration-200 mr-2"
              >
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
                Publish Agent
              </button>
            );
          default:
            return <span key={index}>{part}</span>;
        }
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex">
          
          {/* Left Panel - Chat Window */}
          <div className="w-3/5 bg-white border-r border-gray-200 flex flex-col min-h-0">
            {/* Chat Header */}
            <div className="p-2 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-coral-500 to-brick-600 rounded-full flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Agent Builder Demo</h3>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[700px]">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-coral-600 to-brick-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="text-sm">
                      {renderMessageWithWidgets(message.text)}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <div ref={messagesEndRef} />
              
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
                  placeholder="Try the demo conversation..."
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
          <div className="w-2/5 bg-white flex flex-col min-h-0">
            {/* Builder Header */}
            <div className="p-2 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowGeneratedAgent(!showGeneratedAgent)}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors duration-200"
                  >
                    {showGeneratedAgent ? 'Hide' : 'Show'}
                  </button>
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Generated Agent</h3>
                  </div>
                </div>
                <button
                  onClick={() => console.log('Publish button clicked')}
                  className="px-3 py-1 text-xs bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-md hover:from-green-700 hover:to-emerald-700 transition-colors duration-200 font-medium"
                >
                  Publish
                </button>
              </div>
            </div>

            {/* Builder Content */}
            {showGeneratedAgent && (
              <div className="flex-1 p-6">
                <div className="mb-6">
                  
                  {/* Flowchart */}
                  <div className="space-y-4">
                    {/* Trigger */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <img src="/logo.png" alt="Coral Bricks AI" className="w-5 h-5" />
                        <div className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium text-sm">
                          Timer Trigger
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex justify-center">
                      <svg className="w-4 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    {/* Get Data Step */}
                    <div className="flex items-center justify-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <img src="/qbo_logo.jpg" alt="QuickBooks" className="w-5 h-5" />
                        <div className="bg-green-500 text-white px-3 py-2 rounded-lg font-medium text-xs">
                          Get Purchase Price
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <img src="/qbo_logo.jpg" alt="QuickBooks" className="w-5 h-5" />
                        <div className="bg-green-500 text-white px-3 py-2 rounded-lg font-medium text-xs">
                          Get Selling Price
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex justify-center">
                      <svg className="w-4 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    {/* Compute Step */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <img src="/logo.png" alt="Coral Bricks AI" className="w-5 h-5" />
                        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm">
                          Compute Markup
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex justify-center">
                      <svg className="w-4 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    {/* Generate Step */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <img src="/logo.png" alt="Coral Bricks AI" className="w-5 h-5" />
                        <div className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-medium">
                          BYOM
                        </div>
                        <div className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium text-sm">
                          Generate Email
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex justify-center">
                      <svg className="w-4 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    {/* Send Step */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <img src="/mailgun_logo.png" alt="Mailgun" className="w-5 h-5" />
                        <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium text-sm">
                          Send Email
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo; 