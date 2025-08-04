import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  RocketLaunchIcon, 
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  const features = [
    {
      icon: UserGroupIcon,
      title: 'Customized AI Agents',
      description: 'Create custom AI agents that are specific to your use case and business requirements.'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Conversational Interface',
      description: 'Create AI agents in natural language with our intuitive development tools.'
    },
              {
            icon: LockClosedIcon,
            title: 'AI Guardrails',
            description: 'Eliminate hallucinations with continuous testing, human in the loop development and built in security and compliance protections.'
          },
    {
      icon: RocketLaunchIcon,
      title: 'One-Click Deployment',
      description: 'Easily deploy and scale your AI agents and applications with our streamlined platform.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-coral-50 to-brick-50">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
                      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Automate Business Workflows Through Natural Language
        </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Easily build and deploy secure, compliant and custom AI agents—no code, no drag-and-drop
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary text-center">
                  Join the Waitlist
                </Link>
                <Link to="/about" className="btn-secondary text-center">
                  Learn More
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-coral-500 to-brick-600 rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <UserGroupIcon className="h-8 w-8 text-white mb-2" />
                    <h3 className="text-white font-semibold">Custom AI</h3>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <ChatBubbleLeftRightIcon className="h-8 w-8 text-white mb-2" />
                    <h3 className="text-white font-semibold">Chat Interface</h3>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <LockClosedIcon className="h-8 w-8 text-white mb-2" />
                    <h3 className="text-white font-semibold">Guardrails</h3>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <RocketLaunchIcon className="h-8 w-8 text-white mb-2" />
                    <h3 className="text-white font-semibold">Deploy</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Infrastructure?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build with AI, set guardrails for product logic, security, and compliance. 
              Deploy with confidence on our scalable platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <feature.icon className="h-12 w-12 text-coral-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-coral-600 to-brick-600 text-white section-padding">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the Early Access Waitlist
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Be among the first to experience our revolutionary infrastructure platform. 
              Limited spots available for early access.
            </p>
            <Link
              to="/contact"
              className="bg-white text-coral-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Join Waitlist
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 