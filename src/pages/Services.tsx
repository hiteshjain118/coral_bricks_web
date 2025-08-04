import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CpuChipIcon, 
  ChartBarIcon, 
  ChatBubbleLeftRightIcon,
  EyeIcon,
  CogIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const Services: React.FC = () => {
  const services = [
    {
      icon: CpuChipIcon,
      title: 'AI Agent Infrastructure',
      description: 'Deploy and manage AI agents with our robust, scalable infrastructure platform.',
      features: ['One-Click Deployment', 'Auto-Scaling', 'Real-time Monitoring', 'Agent Management'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Web App Hosting',
      description: 'Deploy your web applications with enterprise-grade security and performance.',
      features: ['Global CDN', 'SSL Certificates', 'Load Balancing', 'Auto-Deployment'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: EyeIcon,
      title: 'Chat Interface Development',
      description: 'Build and deploy everything from your chat interface with our developer-friendly tools.',
      features: ['Chat Commands', 'Git Integration', 'Local Development', 'Debugging Tools'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: ChartBarIcon,
      title: 'Monitoring & Analytics',
      description: 'Comprehensive monitoring and analytics to keep your applications running smoothly.',
      features: ['Real-time Metrics', 'Error Tracking', 'Performance Monitoring', 'Usage Analytics'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: CogIcon,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security and compliance built into every layer of our infrastructure.',
      features: ['SOC 2 Compliance', 'GDPR Ready', 'Data Encryption', 'Access Controls'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Developer Experience',
      description: 'Tools and workflows designed for modern developers and teams.',
      features: ['Team Collaboration', 'Continuous Testing Pipelines', 'API Management', 'Documentation'],
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  const processSteps = [
    {
      icon: LightBulbIcon,
      title: 'Build Your App',
      description: 'Develop your AI agent or web app using our developer-friendly tools.'
    },
    {
      icon: CogIcon,
      title: 'Test Locally',
      description: 'Test your application locally with our CLI tools and debugging features.'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Deploy with One Click',
      description: 'Deploy to our infrastructure with a single command from your chat interface.'
    },
    {
      icon: ChartBarIcon,
      title: 'Monitor & Scale',
      description: 'Monitor performance and scale automatically as your app grows.'
    }
  ];

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
              Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-brick-600">
                Infrastructure
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Reliable infrastructure platform designed to help modern makers deploy AI agents 
              and web apps with confidence, security, and scalability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
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
              Complete Infrastructure Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI agent deployment to web app hosting, we provide everything you need 
              to build and deploy with confidence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${service.color} p-6`}>
                  <service.icon className="h-12 w-12 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-coral-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Deployment Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From development to production in minutes, not days. Deploy directly from your chat interface.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="bg-coral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-coral-600" />
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-coral-200 transform translate-x-4"></div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
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
              Perfect For Modern Makers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're building AI agents, web apps, or full-stack applications, 
              our infrastructure scales with your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'AI Agents',
              'Web Apps',
              'APIs',
              'Microservices',
              'Full-Stack Apps',
              'Mobile Backends',
              'Data Pipelines',
              'ML Models'
            ].map((industry, index) => (
              <motion.div
                key={industry}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center border border-gray-100"
              >
                <h3 className="font-semibold text-gray-900">{industry}</h3>
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
              Ready to Deploy?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Start building and deploying your AI agents and web apps on our reliable 
              infrastructure platform.
            </p>
            <Link
              to="/contact"
              className="bg-white text-coral-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Start Building
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services; 