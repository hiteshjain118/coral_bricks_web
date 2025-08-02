import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowTopRightOnSquareIcon,
  UserIcon,
  UsersIcon,
  PlusIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  CubeIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface Agent {
  id: string;
  name: string;
  description: string;
  icon: any;
  subdomain: string;
  features: string[];
  status: 'active' | 'coming-soon';
  type: 'my-agent' | 'community';
}

const Agents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my-agents' | 'community'>('my-agents');

  // User's own agents
  const myAgents: Agent[] = [
    {
      id: 'my-pricing',
      name: 'My Markup Detection Agent',
      description: 'Streamline your markups by getting a daily email report in your inbox showing the difference between your sales and purchases prices.',
      icon: CurrencyDollarIcon,
      subdomain: 'my-pa.coralbricks.ai',
      features: [
        'QuickBooks integration',
        'Your daily report',
        'Personalize email format',
        'Email reporting'
      ],
      status: 'active',
      type: 'my-agent'
    },
    {
      id: 'my-outreach',
      name: 'My Personalized Outreach Agent',
      description: 'Create personalized outreach campaigns and follow-up sequences based on customer behavior and interaction history.',
      icon: ChatBubbleLeftRightIcon,
      subdomain: 'my-outreach.coralbricks.ai',
      features: [
        'Sales data from Quickbooks',
        'Set upsell criteria',
        'Notify sales teams weekly through email'
      ],
      status: 'active',
      type: 'my-agent'
    }
  ];

  // Community/Platform agents available to clone
  const communityAgents: Agent[] = [
    {
      id: 'pricing',
      name: 'Markup Detection Agent',
      description: 'Streamline your markups by getting a daily email report in your inbox showing the difference between your sales and purchases prices.',
      icon: CurrencyDollarIcon,
      subdomain: 'pa.coralbricks.ai',
      features: [
        'QuickBooks integration',
        'Your daily report',
        'Personalize email format',
        'Email reporting'
      ],
      status: 'coming-soon',
      type: 'community'
    },
    {
      id: 'outreach',
      name: 'Personalized Outreach Agent',
      description: 'Create personalized outreach campaigns and follow-up sequences based on customer behavior and interaction history.',
      icon: ChatBubbleLeftRightIcon,
      subdomain: 'outreach.coralbricks.ai',
      features: [
        'Sales data from Quickbooks',
        'Set upsell criteria',
        'Notify sales teams weekly through email'
      ],
      status: 'coming-soon',
      type: 'community'
    },
    {
      id: 'inventory',
      name: 'Low Inventory Alert',
      description: 'Automatically monitor inventory levels and detect when products are running low, with automated alerts in Asana and one-click ordering through Shopify.',
      icon: CubeIcon,
      subdomain: 'inventory.coralbricks.ai',
      features: [
        'Inventory data from Quickbooks',
        'Set re-order thresholds',
        'Low stock alerts in Asana',
        'One-click order with Shopify'
      ],
      status: 'coming-soon',
      type: 'community'
    },
    {
      id: 'concierge',
      name: 'Concierge Agent',
      description: 'Your personal AI assistant for customer service, appointment scheduling, and general business support with natural language processing.',
      icon: SparklesIcon,
      subdomain: 'concierge.coralbricks.ai',
      features: [
        '24/7 customer support',
        'Appointment scheduling',
        'Multi language processing',
        'Multi-channel integration'
      ],
      status: 'coming-soon',
      type: 'community'
    }
  ];

  const handleGoToAgent = (subdomain: string) => {
    if (subdomain === 'my-pa.coralbricks.ai') {
      window.open('https://pa.coralbricks.ai/', '_blank');
    } else {
      window.open(`https://${subdomain}`, '_blank');
    }
  };

  const handleCloneAgent = (agentId: string) => {
    // Route to create page for cloning
    window.open('/create', '_blank');
  };

  const handleJoinWaitlist = () => {
    // Route to Contact page
    window.location.href = '/contact';
  };

  const renderAgentCard = (agent: Agent, index: number) => (
    <motion.div
      key={agent.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
      className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-6"
    >
      <div className="p-6">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-coral-500 to-brick-600 rounded-lg flex items-center justify-center">
              <agent.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {agent.type === 'my-agent' && agent.status === 'active' && (
              <button
                onClick={() => handleGoToAgent(agent.subdomain)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-coral-600 to-brick-600 text-white rounded-lg font-medium hover:from-coral-700 hover:to-brick-700 transition-all duration-200"
              >
                <span>Manage</span>
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </button>
            )}
            {agent.type === 'community' && agent.id !== 'concierge' && (
              <button
                onClick={() => handleCloneAgent(agent.id)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
              >
                <span>Clone</span>
                <PlusIcon className="w-4 h-4" />
              </button>
            )}
            {agent.type === 'community' && agent.id === 'concierge' && (
              <button
                onClick={handleJoinWaitlist}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-200"
              >
                <span>Join Waitlist</span>
              </button>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {agent.description}
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-2">
          {agent.features.map((feature: string, featureIndex: number) => (
            <div key={featureIndex} className="flex items-center text-xs text-gray-600">
              <div className="w-1 h-1 bg-coral-500 rounded-full mr-2"></div>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-coral-50 to-brick-50 section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              AI{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-brick-600">
                Agents
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Specialized AI agents designed to automate and optimize your business workflows. 
              Each agent is built for specific use cases and integrates seamlessly with your existing tools.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => window.open('/create', '_blank')}
                className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-coral-600 to-brick-600 text-white rounded-lg font-medium hover:from-coral-700 hover:to-brick-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Create Your Own Agent</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            {/* Tab Buttons */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
              <button
                onClick={() => setActiveTab('my-agents')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'my-agents'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <UserIcon className="w-5 h-5" />
                <span>My Agents</span>
                {myAgents.length > 0 && (
                  <span className="bg-coral-100 text-coral-800 text-xs px-2 py-1 rounded-full">
                    {myAgents.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('community')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'community'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <UsersIcon className="w-5 h-5" />
                <span>Community Agents</span>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  {communityAgents.length}
                </span>
              </button>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'my-agents' && (
                <div>
                  {/* Welcome Header */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-coral-50 to-brick-50 rounded-lg border border-coral-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Welcome back, Hitesh Jain</h3>
                        <p className="text-gray-600 text-sm">Manage your personalized AI agents</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-coral-500 to-brick-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">HJ</span>
                        </div>
                        <span className="text-sm text-gray-600">Active</span>
                      </div>
                    </div>
                  </div>

                  {myAgents.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <PlusIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No agents yet</h3>
                      <p className="text-gray-600 mb-6">Clone agents from the community to get started</p>
                      <button
                        onClick={() => setActiveTab('community')}
                        className="px-6 py-3 bg-gradient-to-r from-coral-600 to-brick-600 text-white rounded-lg font-medium hover:from-coral-700 hover:to-brick-700 transition-all duration-200"
                      >
                        Browse Community Agents
                      </button>
                    </div>
                  ) : (
                    <div>
                      {myAgents.map((agent, index) => renderAgentCard(agent, index))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'community' && (
                <div>
                  <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Agents</h3>
                    <p className="text-gray-600 text-sm">
                      Clone and customize these pre-built agents for your end to end business needs. 
                      Personalize agents with your own preferences, data and existing integrations.
                    </p>
                  </div>
                  {communityAgents.map((agent, index) => renderAgentCard(agent, index))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Agents; 