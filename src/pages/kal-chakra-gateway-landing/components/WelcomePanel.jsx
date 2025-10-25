import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const WelcomePanel = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleEnterVault = () => {
    navigate('/temporal-identity-console');
  };

  const handleLearnMore = () => {
    // Scroll to learn more section or show modal
    document.getElementById('learn-more-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <motion.div
      className={`glassmorphic p-8 md:p-12 max-w-2xl mx-auto text-center ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* Logo/Title */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-heading text-primary glow-primary mb-4">
          KalChakra
        </h1>
        <div className="flex items-center justify-center space-x-2 text-lg md:text-xl font-caption text-secondary">
          <Icon name="Clock" size={24} className="glow-secondary" />
          <span>Time Capsule Vault</span>
          <Icon name="Sparkles" size={24} className="glow-accent" />
        </div>
      </motion.div>
      {/* Tagline */}
      <motion.div
        className="mb-8 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-xl md:text-2xl font-body text-text-primary leading-relaxed">
          Preserve your memories across the cosmos of time
        </p>
        <p className="text-base md:text-lg text-text-secondary font-caption">
          Create encrypted digital time capsules that unlock in the future, 
          connecting your present self with tomorrow's dreams
        </p>
      </motion.div>
      {/* Feature Highlights */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <div className="glassmorphic p-4 rounded-xl">
          <Icon name="Shield" size={32} className="text-primary glow-primary mx-auto mb-2" />
          <h3 className="text-sm font-heading text-text-primary mb-1">Blockchain Secured</h3>
          <p className="text-xs text-text-secondary">Military-grade encryption</p>
        </div>
        
        <div className="glassmorphic p-4 rounded-xl">
          <Icon name="Calendar" size={32} className="text-secondary glow-secondary mx-auto mb-2" />
          <h3 className="text-sm font-heading text-text-primary mb-1">Future Unlock</h3>
          <p className="text-xs text-text-secondary">Set precise unlock dates</p>
        </div>
        
        <div className="glassmorphic p-4 rounded-xl">
          <Icon name="Orbit" size={32} className="text-accent glow-accent mx-auto mb-2" />
          <h3 className="text-sm font-heading text-text-primary mb-1">3D Visualization</h3>
          <p className="text-xs text-text-secondary">Immersive cosmic interface</p>
        </div>
      </motion.div>
      {/* Call to Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
      >
        <Button
          variant="default"
          size="lg"
          onClick={handleEnterVault}
          className="glow-primary hover-glow-primary cosmic-transition group"
          iconName="Rocket"
          iconPosition="right"
        >
          <span className="group-hover:text-primary-foreground cosmic-transition">
            Enter the Vault
          </span>
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={handleLearnMore}
          className="glow-secondary hover-glow-secondary cosmic-transition"
          iconName="Info"
          iconPosition="left"
        >
          Learn More
        </Button>
      </motion.div>
      {/* Trust Indicators */}
      <motion.div
        className="mt-8 pt-6 border-t border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <div className="flex items-center justify-center space-x-6 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={16} className="text-success" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={16} className="text-primary" />
            <span>Blockchain Verified</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={16} className="text-secondary" />
            <span>10K+ Capsules Created</span>
          </div>
        </div>
      </motion.div>
      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {[...Array(12)]?.map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 bg-primary rounded-full glow-primary"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default WelcomePanel;