import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LearnMoreSection = ({ className = '' }) => {
  const navigate = useNavigate();

  const features = [
  {
    icon: 'Upload',
    title: 'Multi-Media Capsules',
    description: 'Store text, images, videos, and voice recordings in your time capsules with advanced compression and encryption.',
    image: "https://images.unsplash.com/photo-1601898532120-b5d856332bdd",
    imageAlt: 'Person uploading digital files to cloud storage on laptop screen with colorful interface'
  },
  {
    icon: 'Calendar',
    title: 'Precise Time Locks',
    description: 'Set exact unlock dates and times, from minutes to decades in the future. Your memories await at the perfect moment.',
    image: "https://images.unsplash.com/photo-1660748308408-f997ade26ef8",
    imageAlt: 'Digital calendar interface showing future dates with glowing time markers and scheduling elements'
  },
  {
    icon: 'Shield',
    title: 'Blockchain Security',
    description: 'Military-grade encryption with blockchain verification ensures your memories remain secure and tamper-proof.',
    image: "https://images.unsplash.com/photo-1649682892309-e10e0b7cd40b",
    imageAlt: 'Abstract blockchain network visualization with connected nodes and security locks in blue digital space'
  },
  {
    icon: 'Orbit',
    title: '3D Cosmic Interface',
    description: 'Navigate your memories through an immersive 3D space where each capsule orbits in its own temporal dimension.',
    image: "https://images.unsplash.com/photo-1711992635141-c531ece89f25",
    imageAlt: 'Stunning cosmic space scene with planets orbiting around bright star with nebula clouds in background'
  }];


  const stats = [
  { value: '10,247', label: 'Capsules Created', icon: 'Package' },
  { value: '2,156', label: 'Memories Unlocked', icon: 'Unlock' },
  { value: '99.9%', label: 'Uptime Guarantee', icon: 'Shield' },
  { value: '256-bit', label: 'Encryption Level', icon: 'Lock' }];


  const handleGetStarted = () => {
    navigate('/temporal-identity-console');
  };

  return (
    <section id="learn-more-section" className={`py-20 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>

          <h2 className="text-3xl md:text-5xl font-heading text-primary glow-primary mb-6">
            Journey Through Time
          </h2>
          <p className="text-lg md:text-xl text-text-secondary font-caption max-w-3xl mx-auto leading-relaxed">
            Experience the future of memory preservation with cutting-edge technology 
            that bridges the gap between your present and future self
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {features?.map((feature, index) =>
          <motion.div
            key={feature?.title}
            className="glassmorphic p-8 rounded-2xl hover-glow-primary cosmic-transition"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}>

              <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
                {/* Feature Image */}
                <div className="w-full md:w-1/2 h-48 rounded-xl overflow-hidden">
                  <Image
                  src={feature?.image}
                  alt={feature?.imageAlt}
                  className="w-full h-full object-cover hover:scale-105 cosmic-transition" />

                </div>

                {/* Feature Content */}
                <div className="w-full md:w-1/2">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 glassmorphic rounded-xl flex items-center justify-center glow-primary">
                      <Icon name={feature?.icon} size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-heading text-text-primary">
                      {feature?.title}
                    </h3>
                  </div>
                  <p className="text-text-secondary font-caption leading-relaxed">
                    {feature?.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Statistics */}
        <motion.div
          className="glassmorphic p-8 rounded-2xl mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>

          <h3 className="text-2xl font-heading text-center text-primary glow-primary mb-8">
            Trusted by Time Travelers Worldwide
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats?.map((stat, index) =>
            <motion.div
              key={stat?.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}>

                <div className="w-16 h-16 glassmorphic rounded-full flex items-center justify-center mx-auto mb-3 glow-secondary">
                  <Icon name={stat?.icon} size={24} className="text-secondary" />
                </div>
                <div className="text-2xl md:text-3xl font-mono text-primary glow-primary mb-1">
                  {stat?.value}
                </div>
                <div className="text-sm text-text-secondary font-caption">
                  {stat?.label}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>

          <h3 className="text-2xl md:text-4xl font-heading text-primary glow-primary mb-12">
            How It Works
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
            {
              step: '01',
              title: 'Create Account',
              description: 'Sign up and verify your temporal identity through our secure authentication system',
              icon: 'UserPlus'
            },
            {
              step: '02',
              title: 'Forge Capsule',
              description: 'Upload your memories, set unlock dates, and encrypt with blockchain security',
              icon: 'Package'
            },
            {
              step: '03',
              title: 'Time Travel',
              description: 'Watch your capsules orbit in 3D space until they unlock at the perfect moment',
              icon: 'Clock'
            }]?.
            map((step, index) =>
            <motion.div
              key={step?.step}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}>

                <div className="glassmorphic p-6 rounded-2xl hover-glow-secondary cosmic-transition">
                  <div className="text-4xl font-mono text-secondary glow-secondary mb-4">
                    {step?.step}
                  </div>
                  <div className="w-16 h-16 glassmorphic rounded-full flex items-center justify-center mx-auto mb-4 glow-primary">
                    <Icon name={step?.icon} size={28} className="text-primary" />
                  </div>
                  <h4 className="text-lg font-heading text-text-primary mb-3">
                    {step?.title}
                  </h4>
                  <p className="text-text-secondary font-caption">
                    {step?.description}
                  </p>
                </div>

                {/* Connection Line */}
                {index < 2 &&
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-primary to-secondary glow-primary" />
              }
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>

          <div className="glassmorphic p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-heading text-primary glow-primary mb-4">
              Ready to Begin Your Journey?
            </h3>
            <p className="text-text-secondary font-caption mb-6">
              Join thousands of time travelers who trust KalChakra with their most precious memories
            </p>
            
            <Button
              variant="default"
              size="lg"
              onClick={handleGetStarted}
              className="glow-primary hover-glow-primary cosmic-transition"
              iconName="Rocket"
              iconPosition="right">

              Start Your Time Capsule Journey
            </Button>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default LearnMoreSection;