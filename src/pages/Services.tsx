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
      title: 'Machine Learning Solutions',
      description: 'Custom ML models and algorithms tailored to your specific business needs and data requirements.',
      features: ['Predictive Analytics', 'Pattern Recognition', 'Automated Decision Making', 'Model Training & Optimization'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Natural Language Processing',
      description: 'Advanced NLP solutions for text analysis, sentiment analysis, and conversational AI applications.',
      features: ['Text Classification', 'Sentiment Analysis', 'Chatbot Development', 'Language Translation'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: EyeIcon,
      title: 'Computer Vision',
      description: 'Image and video analysis solutions for automation, quality control, and visual data processing.',
      features: ['Object Detection', 'Image Classification', 'Facial Recognition', 'Quality Control Systems'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: ChartBarIcon,
      title: 'Data Analytics & BI',
      description: 'Comprehensive data analysis and business intelligence solutions to drive informed decision-making.',
      features: ['Data Visualization', 'Real-time Dashboards', 'KPI Tracking', 'Performance Analytics'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: CogIcon,
      title: 'Process Automation',
      description: 'Intelligent automation solutions to streamline operations and reduce manual workload.',
      features: ['Workflow Automation', 'Document Processing', 'Email Automation', 'Task Scheduling'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: ShieldCheckIcon,
      title: 'AI Security & Compliance',
      description: 'Robust security frameworks and compliance solutions for AI-powered applications.',
      features: ['Data Protection', 'Privacy Compliance', 'Security Auditing', 'Risk Assessment'],
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  const processSteps = [
    {
      icon: LightBulbIcon,
      title: 'Discovery & Planning',
      description: 'We analyze your business needs and create a comprehensive AI strategy.'
    },
    {
      icon: CogIcon,
      title: 'Development & Testing',
      description: 'Our team builds and rigorously tests your custom AI solution.'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Deployment & Integration',
      description: 'Seamless deployment and integration with your existing systems.'
    },
    {
      icon: ChartBarIcon,
      title: 'Monitoring & Optimization',
      description: 'Continuous monitoring and optimization to ensure peak performance.'
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
                AI Services
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive artificial intelligence solutions designed to transform your business 
              operations and drive sustainable growth through innovation.
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
              Comprehensive AI Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From machine learning to process automation, we offer a full spectrum of AI services 
              to meet your business needs.
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
              Our Development Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures successful AI implementation and maximum ROI.
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
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI solutions are tailored for various industries, helping businesses 
              across sectors achieve digital transformation.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Healthcare',
              'Finance',
              'Retail',
              'Manufacturing',
              'Education',
              'Transportation',
              'Energy',
              'Technology'
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
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let's discuss how our AI solutions can transform your business and drive 
              unprecedented growth and efficiency.
            </p>
            <Link
              to="/contact"
              className="bg-white text-coral-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Schedule a Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services; 