import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialAuthentication = ({ className = '' }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google Cosmos',
      icon: 'Chrome',
      color: 'hover-glow-primary',
      action: () => console.log('Google authentication')
    },
    {
      id: 'github',
      name: 'GitHub Galaxy',
      icon: 'Github',
      color: 'hover-glow-secondary',
      action: () => console.log('GitHub authentication')
    },
    {
      id: 'discord',
      name: 'Discord Dimension',
      icon: 'MessageCircle',
      color: 'hover-glow-accent',
      action: () => console.log('Discord authentication')
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border opacity-50" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="glassmorphic px-4 py-2 text-text-secondary font-caption">
            Or connect through the cosmic web
          </span>
        </div>
      </div>
      {/* Social Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            onClick={provider?.action}
            className={`glassmorphic ${provider?.color} cosmic-transition flex items-center justify-center space-x-2 py-3`}
          >
            <Icon name={provider?.icon} size={20} />
            <span className="hidden sm:inline font-caption">{provider?.name}</span>
            <span className="sm:hidden font-caption">{provider?.name?.split(' ')?.[0]}</span>
          </Button>
        ))}
      </div>
      {/* Security Notice */}
      <div className="glassmorphic p-4 rounded-xl glow-subtle">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary glow-primary mt-0.5" />
          <div className="text-sm text-text-secondary font-caption">
            <p className="mb-1 text-text-primary font-medium">Quantum-Secured Authentication</p>
            <p>Your temporal identity is protected by advanced cosmic encryption protocols. All authentication methods utilize blockchain-verified security matrices.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialAuthentication;