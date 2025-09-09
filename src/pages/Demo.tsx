import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ChartBarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  attachments?: Attachment[]; // For tables, code, and other attachments
  actions?: string[];
  attachment?: any[];
  code?: string;
}

interface Attachment {
  type: 'table' | 'code';
  content?: any; // JSON for tables, string for code (optional for table type)
  language?: string; // For code attachments (e.g., 'python', 'javascript')
  title?: string; // Optional title for the attachment
  // For table type with columns/rows format
  columns?: string[];
  rows?: any[][];
}

interface MockMessage {
  role: 'user' | 'agent';
  content: string;
  attachments?: any[];
  actions?: string[];
  attachment?: any[];
  code?: string;
}

const Demo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeThread, setActiveThread] = useState<'customers' | 'leads'>('customers');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'visualize' | 'inspect' | null>(null);
  const [modalData, setModalData] = useState<any>(null);
  const hasInitialMessagesLoaded = React.useRef(false);

  // Load mock conversation
  useEffect(() => {
    const loadMockConversation = () => {
      try {
        // Import the TypeScript mock conversation
        import('../data/mock_convo').then(module => {
          const mockData: MockMessage[] = module.mockConvo;
          
          const convertedMessages: Message[] = mockData.map((msg, index) => {
            const message: Message = {
              id: (index + 1).toString(),
              text: msg.content,
              sender: msg.role === 'user' ? 'user' : 'ai',
              timestamp: new Date(Date.now() - (mockData.length - index) * 60000), // Stagger timestamps
              attachments: (msg as any).attachments || undefined, // Handle attachments from mock conversation
              actions: msg.actions || undefined,
              attachment: msg.attachment || undefined,
              code: msg.code || undefined
            };
            
            // Debug logging for attachments
            if (message.attachments) {
              console.log(`Message ${index + 1} has attachments:`, message.attachments);
            }
            
            return message;
          });
          
          console.log('Converted messages:', convertedMessages);
          setMessages(convertedMessages);
          // Delay setting the ref to prevent auto-scroll on initial load
          setTimeout(() => {
            hasInitialMessagesLoaded.current = true;
          }, 500);
        });
      } catch (error) {
        console.error('Error loading mock conversation:', error);
        // Fallback to default message
        setMessages([
          {
            id: '1',
            text: "Welcome to the Agent Builder Demo! This is a demonstration of our AI agent creation system. Try typing a message to see how it works.",
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

  // Handle escape key and click outside modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) {
        closeModal();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (showModal && (event.target as Element).classList.contains('modal-backdrop')) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

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

  const handleActionClick = (action: string, message: Message) => {
    if (action === 'Visualize' && message.attachment) {
      setModalType('visualize');
      setModalData(message.attachment);
      setShowModal(true);
    } else if (action === 'Inspect' && message.code) {
      setModalType('inspect');
      setModalData(message.code);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setModalData(null);
  };

  const renderAttachment = (attachment: Attachment) => {
    switch (attachment.type) {
      case 'table':
        try {
          let data = typeof attachment.content === 'string' ? JSON.parse(attachment.content) : attachment.content;
          
          // Handle columns/rows format from mock conversation
          if (attachment.columns && attachment.rows) {
            const { columns, rows } = attachment;
            return (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                {attachment.title && (
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">{attachment.title}</h4>
                )}
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300">
                        {columns.map((header: string, index: number) => (
                          <th key={index} className="px-3 py-2 text-left font-medium text-gray-700 bg-gray-100">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row: any[], rowIndex: number) => (
                        <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50">
                          {row.map((cell: any, colIndex: number) => (
                            <td key={colIndex} className="px-3 py-2 text-gray-600">
                              {String(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }
          
          // Handle standard array of objects format
          if (Array.isArray(data) && data.length > 0) {
            const headers = Object.keys(data[0]);
            return (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                {attachment.title && (
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">{attachment.title}</h4>
                )}
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300">
                        {headers.map((header, index) => (
                          <th key={index} className="px-3 py-2 text-left font-medium text-gray-700 bg-gray-100">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50">
                          {headers.map((header, colIndex) => (
                            <td key={colIndex} className="px-3 py-2 text-gray-600">
                              {typeof row[header] === 'object' ? JSON.stringify(row[header]) : String(row[header])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }
        } catch (error) {
          console.error('Error parsing table data:', error);
        }
        return null;

      case 'code':
        return (
          <div className="mt-3 p-4 bg-gray-900 rounded-lg border border-gray-700">
            {attachment.title && (
              <h4 className="text-sm font-semibold text-gray-300 mb-2">{attachment.title}</h4>
            )}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                {attachment.language || 'code'}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(attachment.content)}
                className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
                title="Copy to clipboard"
              >
                Copy
              </button>
            </div>
            <pre className="text-sm text-gray-100 overflow-x-auto">
              <code>{attachment.content}</code>
            </pre>
          </div>
        );

      default:
        return null;
    }
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
          case 'roactive question':
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
            return <span key={index} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>;
        }
      }
      return <span key={index} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex">
          
          {/* Left Sidebar - Threads */}
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Threads Header */}
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Threads</h2>
            </div>
            
            {/* Thread List */}
            <div className="flex-1 p-4 space-y-2">
              <button
                onClick={() => setActiveThread('customers')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                  activeThread === 'customers' 
                    ? 'bg-coral-50 border border-coral-200 text-coral-700' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <UserGroupIcon className="w-5 h-5" />
                <div>
                  <div className="font-medium">Top customers</div>
                  <div className="text-sm text-gray-500">Revenue analysis</div>
                </div>
              </button>
              
              <button
                onClick={() => setActiveThread('leads')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                  activeThread === 'leads' 
                    ? 'bg-coral-50 border border-coral-200 text-coral-700' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <ChartBarIcon className="w-5 h-5" />
                <div>
                  <div className="font-medium">Top leads</div>
                  <div className="text-sm text-gray-500">Lead generation</div>
                </div>
              </button>
            </div>
          </div>

          {/* Main Panel - Chat Window */}
          <div className="flex-1 bg-white flex flex-col min-h-0">
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
                  <div className="max-w-xs lg:max-w-lg xl:max-w-xl">
                    <div className={`px-4 py-2 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-coral-600 to-brick-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="text-sm">
                        {renderMessageWithWidgets(message.text)}
                        {/* Render attachments if they exist */}
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-3 space-y-3">
                            {message.attachments.map((attachment, index) => (
                              <div key={index}>
                                {renderAttachment(attachment)}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons for AI messages - Outside the message bubble */}
                    {message.sender === 'ai' && message.actions && message.actions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.actions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => handleActionClick(action, message)}
                            className="text-xs text-gray-500 hover:text-gray-700 underline hover:no-underline transition-colors duration-200"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
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
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {modalType === 'visualize' ? 'Data Visualization' : 'Code Inspection'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {modalType === 'visualize' && modalData && (
                <div className="space-y-4">
                  {modalData.map((attachment: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Data Table</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-300">
                              {attachment.columns.map((header: string, colIndex: number) => (
                                <th key={colIndex} className="px-3 py-2 text-left font-medium text-gray-700 bg-gray-100">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {attachment.rows.map((row: any[], rowIndex: number) => (
                              <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50">
                                {row.map((cell: any, colIndex: number) => (
                                  <td key={colIndex} className="px-3 py-2 text-gray-600">
                                    {String(cell)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {modalType === 'inspect' && modalData && (
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-gray-300">TypeScript Code</h4>
                    <button
                      onClick={() => navigator.clipboard.writeText(modalData)}
                      className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      Copy Code
                    </button>
                  </div>
                  <pre className="text-sm text-gray-100 overflow-x-auto">
                    <code>{modalData}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Demo;
