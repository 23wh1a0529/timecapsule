import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AuthenticationTabs = ({ activeTab, onTabChange, className = '' }) => {
  const tabs = [
    {
      id: 'register',
      label: 'Create Identity',
      icon: 'UserPlus',
      description: 'Forge your temporal signature'
    },
    {
      id: 'login',
      label: 'Access Vault',
      icon: 'LogIn',
      description: 'Enter your cosmic realm'
    }
  ];

  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex glassmorphic rounded-2xl p-2 glow-subtle">
        {tabs?.map((tab) => (
          <Button
            key={tab?.id}
            variant={activeTab === tab?.id ? 'default' : 'ghost'}
            onClick={() => onTabChange(tab?.id)}
            className={`flex-1 flex flex-col items-center space-y-2 py-4 cosmic-transition ${
              activeTab === tab?.id 
                ? 'glow-primary text-primary-foreground' 
                : 'text-text-secondary hover:text-primary hover-glow-primary'
            }`}
          >
            <Icon name={tab?.icon} size={24} />
            <div className="text-center">
              <div className="font-heading text-sm">{tab?.label}</div>
              <div className="font-caption text-xs opacity-80">{tab?.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AuthenticationTabs;