import React from 'react';
import { motion } from 'framer-motion';
import { 
  UsersIcon, 
  GlobeAltIcon, 
  TrophyIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const About: React.FC = () => {
  const values = [
    {
      icon: HeartIcon,
      title: 'Natural Language First',
      description: 'Every feature is designed for natural language interaction, from workflow automation to conversational development.'
    },
    {
      icon: UsersIcon,
      title: 'Modern Maker Focus',
      description: 'Built specifically for developers and creators who want to automate workflows without infrastructure complexity.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Enterprise Security',
      description: 'Bank-grade security and compliance built into every layer, ensuring your AI agents are safe and compliant.'
    },
    {
      icon: TrophyIcon,
      title: 'Revolutionary Simplicity',
      description: 'Automate workflows through natural language, not complex configurations. Simple, powerful, and reliable.'
    }
  ];

  const stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '100%', label: 'Continuous Testing' },
    { number: '1-Click', label: 'Deployment' },
    { number: 'Coming', label: 'Soon' }
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
              Automate Business Workflows Through Natural Language
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Easily build and deploy secure, compliant and custom AI agents—no code, no drag-and-drop
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded with a vision to revolutionize how businesses automate workflows, we recognized that modern makers 
                  need a platform that eliminates complexity, provides built-in security and compliance, 
                  and scales seamlessly—all accessible through natural language.
                </p>
                <p>
                  Our team of infrastructure engineers, AI specialists, and compliance experts work together 
                  to create a platform that lets you focus on building amazing AI agents while we handle 
                  the complexity of security, compliance, and deployment.
                </p>
                <p>
                  We believe that automating business workflows should be as simple as describing what you need. 
                  That's why we've built a platform with continuous testing, one-click deployment, 
                  and natural language development—all designed for the modern maker.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-coral-500 to-brick-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg leading-relaxed opacity-90">
                  To enable modern makers to easily build and deploy secure, compliant and custom AI agents—no code, no drag-and-drop.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platform Highlights
            </h2>
            <p className="text-xl text-gray-600">
              Key features that set our infrastructure apart
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-coral-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platform Principles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The core principles that drive our revolutionary infrastructure platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="bg-coral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-coral-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Founding Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experts with 10+ years experience in deep infrastructure, AI, and compliance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Hitesh Jain',
                role: 'Founder & CEO',
                description: '13+ years at Meta leading AI personalization, messaging and trust and safety systems.',
                linkedin: 'https://www.linkedin.com/in/jain-hitesh/'
              },
              {
                name: 'AI Infrastructure Team',
                role: 'Engineering',
                description: 'Deep expertise in scalable AI systems, security, and compliance architecture.',
                linkedin: null
              },
              {
                name: 'Platform Team',
                role: 'Product & Design',
                description: 'Focused on creating the most intuitive natural language development experience.',
                linkedin: null
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.0 + index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-coral-500 to-brick-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-coral-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed mb-3">
                  {member.description}
                </p>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-coral-600 hover:text-coral-700 font-medium transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>Connect on LinkedIn</span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 