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
      title: 'Passion for Innovation',
      description: 'We are driven by a deep passion for creating innovative AI solutions that solve real-world problems.'
    },
    {
      icon: UsersIcon,
      title: 'Client-Centric Approach',
      description: 'Your success is our success. We work closely with you to understand your unique challenges and goals.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Perspective',
      description: 'We bring together diverse perspectives and global best practices to deliver exceptional results.'
    },
    {
      icon: TrophyIcon,
      title: 'Excellence in Execution',
      description: 'We maintain the highest standards of quality and excellence in every project we undertake.'
    }
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '25+', label: 'Happy Clients' },
    { number: '99%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' }
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
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-brick-600">
                Coral Bricks AI
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are a forward-thinking AI company dedicated to transforming businesses 
              through intelligent automation and cutting-edge artificial intelligence solutions.
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
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded with a vision to democratize AI technology, Coral Bricks AI emerged 
                  from the recognition that businesses of all sizes need access to powerful, 
                  intelligent solutions to stay competitive in today's rapidly evolving digital landscape.
                </p>
                <p>
                  Our team of AI experts, data scientists, and business strategists work together 
                  to create custom solutions that not only solve immediate challenges but also 
                  position our clients for long-term success in an AI-driven future.
                </p>
                <p>
                  We believe that artificial intelligence should be accessible, understandable, 
                  and beneficial to everyone. That's why we focus on creating AI solutions that 
                  are not only powerful but also transparent, ethical, and aligned with your 
                  business objectives.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-coral-500 to-brick-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg leading-relaxed opacity-90">
                  To empower businesses with intelligent AI solutions that drive innovation, 
                  efficiency, and growth while maintaining the highest standards of ethics 
                  and transparency.
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
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-600">
              Delivering results that speak for themselves
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
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
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and every solution we create.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
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
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A diverse group of experts passionate about AI innovation and client success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Chen',
                role: 'Chief AI Officer',
                description: 'Leading our AI strategy with 15+ years in machine learning and neural networks.'
              },
              {
                name: 'Michael Rodriguez',
                role: 'Head of Engineering',
                description: 'Expert in scalable AI systems and cloud architecture with a focus on performance.'
              },
              {
                name: 'Emily Watson',
                role: 'VP of Client Success',
                description: 'Ensuring every client achieves their goals through strategic AI implementation.'
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
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
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 