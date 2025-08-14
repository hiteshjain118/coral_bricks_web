import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
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
  metadata?: any; // For additional response data
  flowData?: any; // For flow diagram data
}

const Create: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [showGeneratedAgent, setShowGeneratedAgent] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [userId] = useState(() => Math.floor(Math.random() * 1000000)); // Random user ID
  const hasInitialMessagesLoaded = React.useRef(false);

  // Initialize with welcome message
  useEffect(() => {
    const displayName = user?.display_name || 'there';
    const welcomeMessage: Message = {
      id: '1',
      text: `Hi ${displayName}! I'm your AI agent builder. Tell me what kind of agent you'd like to create and I'll help you build it step by step.`,
      sender: 'ai',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    hasInitialMessagesLoaded.current = true;
  }, [user?.display_name]);

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

    try {
      const response = await fetch('http://localhost:5002/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.access_token}`,
        },
        body: JSON.stringify({
          message: inputMessage,
          session_id: sessionId,
          user_id: userId,
          auth_user_id: user?.id
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Log the full response for debugging
      console.log('Agent Builder Response:', data);
      
      // Handle different response formats
      let responseText = "I'm sorry, I couldn't process your request. Please try again.";
      
      if (typeof data === 'string') {
        responseText = data;
      } else if (data && typeof data === 'object') {
        // Handle nested response structure
        if (data.message && data.message.response_content) {
          responseText = data.message.response_content;
        } else if (data.response && data.response.response_content) {
          responseText = data.response.response_content;
        } else if (data.message && typeof data.message === 'string') {
          responseText = data.message;
        } else if (data.response && typeof data.response === 'string') {
          responseText = data.response;
        } else if (data.text) {
          responseText = typeof data.text === 'string' ? data.text : JSON.stringify(data.text);
        } else if (data.content) {
          responseText = typeof data.content === 'string' ? data.content : JSON.stringify(data.content);
        } else {
          responseText = JSON.stringify(data);
        }
      }
      
      // Ensure responseText is always a string
      if (typeof responseText !== 'string') {
        responseText = JSON.stringify(responseText);
      }
      
      // Check for flow data in the response
      const flowData = parseFlowData(responseText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
        metadata: data, // Store full response data
        flowData: flowData // Store flow diagram data
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting to the server. Please check your connection and try again.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const parseFlowData = (text: string) => {
    try {
      // Look for JSON blocks in the text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonStr = jsonMatch[0];
        const parsed = JSON.parse(jsonStr);
        
        // Check if it has the expected structure
        if (parsed.intent_server && parsed.intent_server.retriver_process_node) {
          return parsed;
        }
      }
      return null;
    } catch (error) {
      console.log('No valid flow JSON found in response');
      return null;
    }
  };

  const formatResponseText = (text: string) => {
    // Split text into paragraphs
    const paragraphs = text.split('\n').filter(p => p.trim());
    
    return paragraphs.map((paragraph, index) => {
      // Check if it's a numbered list item
      const numberedMatch = paragraph.match(/^(\d+)\.\s+\*\*(.+?)\*\*:\s*(.+)/);
      if (numberedMatch) {
        const [, number, title, content] = numberedMatch;
        return (
          <div key={index} className="mb-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-coral-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                {number}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
                <p className="text-gray-700">{content}</p>
              </div>
            </div>
          </div>
        );
      }
      
      // Check if it's a bullet point
      if (paragraph.startsWith('- ')) {
        return (
          <div key={index} className="flex items-start space-x-2 mb-2">
            <div className="flex-shrink-0 w-2 h-2 bg-coral-500 rounded-full mt-2"></div>
            <p className="text-gray-700">{paragraph.substring(2)}</p>
          </div>
        );
      }
      
      // Check if it's a question
      if (paragraph.includes('Could you please specify:')) {
        return (
          <div key={index} className="mb-4">
            <p className="text-gray-700 mb-3">{paragraph}</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <h5 className="font-semibold text-yellow-800 mb-2">Please provide:</h5>
              <ul className="space-y-1 text-yellow-700">
                {paragraph.split('Could you please specify:')[1]?.split('-').filter(item => item.trim()).map((item, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span>{item.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-gray-700 mb-3 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  const renderFlowDiagram = (flowData: any) => {
    if (!flowData || !flowData.intent_server) return null;

    const { retriver_process_node, actors } = flowData.intent_server;
    
    return (
      <div className="space-y-6">
        {/* Retrievers Section */}
        {retriver_process_node.retrievers && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Data Retrievers</h4>
            <div className="space-y-3">
              {retriver_process_node.retrievers.map((retriever: any, index: number) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h5 className="font-medium text-green-800">{retriever.name}</h5>
                  </div>
                  <p className="text-sm text-green-700">{retriever.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Process Nodes Section */}
        {retriver_process_node.process_nodes && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Processing Steps</h4>
            <div className="space-y-3">
              {retriver_process_node.process_nodes.map((node: any, index: number) => (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h5 className="font-medium text-blue-800">{node.name}</h5>
                  </div>
                  <p className="text-sm text-blue-700">{node.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actors Section */}
        {actors && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Actions</h4>
            <div className="space-y-3">
              {actors.map((actor: any, index: number) => (
                <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <h5 className="font-medium text-purple-800">{actor.name}</h5>
                  </div>
                  <p className="text-sm text-purple-700 mb-2">{actor.description}</p>
                  {actor.slots && (
                    <div className="text-xs text-purple-600">
                      <span className="font-medium">Slots:</span> {Object.keys(actor.slots).join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
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
                  <h3 className="font-semibold text-gray-900 text-sm">Agent Builder</h3>
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
                      {message.sender === 'ai' ? (
                        <div className="prose prose-sm max-w-none">
                          {formatResponseText(message.text)}
                        </div>
                      ) : (
                        message.text
                      )}
                      {message.metadata && message.sender === 'ai' && (
                        <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200 text-xs">
                          <div className="font-semibold text-blue-800 mb-1">Response Details:</div>
                          <pre className="text-blue-700 whitespace-pre-wrap overflow-x-auto">
                            {JSON.stringify(message.metadata, null, 2)}
                          </pre>
                        </div>
                      )}
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
                  placeholder="Describe your agent idea and I'll help you build it..."
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
              <div className="flex-1 p-6 overflow-y-auto">
                {/* Check if we have flow data from any AI message */}
                {(() => {
                  const flowData = messages
                    .filter(msg => msg.sender === 'ai' && msg.flowData)
                    .pop()?.flowData;
                  
                  if (flowData) {
                    return renderFlowDiagram(flowData);
                  }
                  
                  // Fallback to default flowchart
                  return (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-4">Default Agent Flow</h4>
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
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create; 