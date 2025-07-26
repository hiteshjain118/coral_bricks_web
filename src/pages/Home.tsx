import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CpuChipIcon, 
  RocketLaunchIcon, 
  ShieldCheckIcon,
  ChartBarIcon,
  CogIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  const features = [
    {
      icon: CpuChipIcon,
      title: 'Advanced AI Solutions',
      description: 'Cutting-edge artificial intelligence tailored to your business needs.'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Rapid Deployment',
      description: 'Quick implementation and scaling of AI-powered applications.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Enterprise Security',
      description: 'Bank-grade security protocols to protect your data and systems.'
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics & Insights',
      description: 'Comprehensive data analysis and actionable business insights.'
    },
    {
      icon: CogIcon,
      title: 'Custom Integration',
      description: 'Seamless integration with your existing systems and workflows.'
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation Focus',
      description: 'Staying ahead with the latest AI technologies and methodologies.'
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
                Building the Future with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-brick-600">
                  AI Innovation
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Coral Bricks AI transforms businesses through intelligent automation, 
                predictive analytics, and cutting-edge artificial intelligence solutions 
                that drive growth and efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary text-center">
                  Start Your AI Journey
                </Link>
                <Link to="/services" className="btn-secondary text-center">
                  Explore Services
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
                    <CpuChipIcon className="h-8 w-8 text-white mb-2" />
                    <h3 className="text-white font-semibold">AI Processing</h3>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <ChartBarIcon className="h-8 w-8 text-white mb-2" />
                    <h3 className="text-white font-semibold">Analytics</h3>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <ShieldCheckIcon className="h-8 w-8 text-white mb-2" />
                    <h3 className="text-white font-semibold">Security</h3>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <RocketLaunchIcon className="h-8 w-8 text-white mb-2" />
                    <h3 className="text-white font-semibold">Deployment</h3>
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
              Why Choose Coral Bricks AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with deep industry expertise to deliver 
              AI solutions that transform your business operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join the AI revolution and discover how Coral Bricks AI can help you 
              achieve unprecedented growth and efficiency.
            </p>
            <Link
              to="/contact"
              className="bg-white text-coral-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 