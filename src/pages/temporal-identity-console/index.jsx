import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AuthenticationTabs from './components/AuthenticationTabs';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import SocialAuthentication from './components/SocialAuthentication';
import BlockchainEncryption from './components/BlockchainEncryption';
import InspirationModal from './components/InspirationModal';

const TemporalIdentityConsole = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [showEncryption, setShowEncryption] = useState(false);
  const [showInspiration, setShowInspiration] = useState(false);
  const [particles, setParticles] = useState([]);

  // Generate floating particles for cosmic background
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles?.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const handleInspireMe = () => {
    setShowInspiration(true);
  };

  const handleEncryptionComplete = () => {
    setShowEncryption(false);
  };

  return (
    <div className="min-h-screen cosmic-bg relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles?.map((particle) => (
          <div
            key={particle?.id}
            className="absolute w-1 h-1 bg-primary rounded-full glow-subtle animate-pulse"
            style={{
              left: `${particle?.x}%`,
              top: `${particle?.y}%`,
              opacity: particle?.opacity,
              animationDelay: `${particle?.id * 0.1}s`,
              animationDuration: `${particle?.speed}s`
            }}
          />
        ))}
      </div>
      {/* Navigation Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/kal-chakra-gateway-landing"
            className="flex items-center space-x-3 hover-glow-primary cosmic-transition"
          >
            <div className="w-10 h-10 glassmorphic rounded-full flex items-center justify-center glow-primary">
              <Icon name="ArrowLeft" size={20} className="text-primary" />
            </div>
            <span className="text-text-secondary font-caption">Return to Gateway</span>
          </Link>

          <div className="glassmorphic px-4 py-2 rounded-full glow-subtle">
            <span className="text-sm font-caption text-text-secondary">
              Temporal Identity Console
            </span>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 glassmorphic rounded-full flex items-center justify-center glow-primary temporal-pulse">
              <Icon name="Clock" size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-heading text-primary glow-primary mb-2">
              KalChakra
            </h1>
            <p className="text-text-secondary font-caption text-lg">
              Temporal Identity Console
            </p>
            <p className="text-text-secondary font-caption text-sm mt-2 opacity-80">
              Establish your cosmic signature to access the time vault
            </p>
          </div>

          {/* Authentication Panel */}
          <div className="glassmorphic p-8 rounded-3xl glow-medium">
            {/* Tab Navigation */}
            <AuthenticationTabs 
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Form Content */}
            <div className="space-y-6">
              {activeTab === 'register' ? (
                <RegistrationForm onInspireMe={handleInspireMe} />
              ) : (
                <LoginForm onInspireMe={handleInspireMe} />
              )}

              {/* Social Authentication */}
              <SocialAuthentication />
            </div>
          </div>

          {/* Additional Links */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-text-secondary font-caption text-sm">
              By proceeding, you agree to the{' '}
              <Button
                variant="link"
                className="text-primary hover:text-secondary cosmic-transition p-0 h-auto"
              >
                Cosmic Terms of Service
              </Button>
              {' '}and{' '}
              <Button
                variant="link"
                className="text-primary hover:text-secondary cosmic-transition p-0 h-auto"
              >
                Temporal Privacy Policy
              </Button>
            </p>
          </div>
        </div>
      </main>
      {/* Floating Action Hint */}
      <div className="fixed bottom-6 right-6 z-20">
        <div className="glassmorphic p-4 rounded-2xl glow-subtle max-w-xs">
          <div className="flex items-center space-x-3">
            <Icon name="Info" size={20} className="text-primary glow-primary" />
            <div className="text-sm">
              <p className="text-text-primary font-medium">Need Help?</p>
              <p className="text-text-secondary font-caption">
                Click "Inspire Me" for cosmic wisdom
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Blockchain Encryption Overlay */}
      <BlockchainEncryption
        isActive={showEncryption}
        onComplete={handleEncryptionComplete}
      />
      {/* Inspiration Modal */}
      <InspirationModal
        isOpen={showInspiration}
        onClose={() => setShowInspiration(false)}
      />
      {/* Cosmic Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default TemporalIdentityConsole;