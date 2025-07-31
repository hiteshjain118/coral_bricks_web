import React from 'react';
import { motion } from 'framer-motion';
import { 
  CurrencyDollarIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

const Agents: React.FC = () => {
  const agents = [
    {
      id: 'pricing',
      name: 'Dynamic Pricing Agent',
      description: 'Automatically analyze and optimize pricing strategies using QuickBooks data and market insights and get a report in Asana.',
      icon: CurrencyDollarIcon,
      subdomain: 'pa.coralbricks.ai',
      features: [
        'QuickBooks integration',
        'Create task in Asana',
        'Competitive pricing',
        'Revenue optimization'
      ],
      status: 'coming-soon'
    },
    {
      id: 'concierge',
      name: 'Concierge Agent',
      description: 'Your personal AI assistant for customer service, appointment scheduling, and general business support with natural language processing.',
      icon: CurrencyDollarIcon,
      subdomain: 'concierge.coralbricks.ai',
      features: [
        '24/7 customer support',
        'Appointment scheduling',
        'Multi language processing',
        'Multi-channel integration'
      ],
      status: 'coming-soon'
    }
  ];

  const handleGoToAgent = (subdomain: string) => {
    window.open(`https://${subdomain}`, '_blank');
  };

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
            <p className="text-xl text-gray-600 leading-relaxed">
              Specialized AI agents designed to automate and optimize your business workflows. 
              Each agent is built for specific use cases and integrates seamlessly with your existing tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {agents.map((agent, index) => (
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
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          agent.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {agent.status === 'active' ? 'Active' : 'Coming Soon'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleGoToAgent(agent.subdomain)}
                      disabled={agent.status === 'coming-soon'}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        agent.status === 'active'
                          ? 'bg-gradient-to-r from-coral-600 to-brick-600 text-white hover:from-coral-700 hover:to-brick-700 shadow-md hover:shadow-lg'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <span>Go</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {agent.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {agent.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-xs text-gray-600">
                        <div className="w-1 h-1 bg-coral-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Coming Soon Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              More Agents Coming Soon
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're building specialized AI agents for every business need. 
              From customer service to data analysis, our agents will help you automate 
              and optimize every aspect of your business.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Agents; 