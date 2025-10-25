import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const FloatingActionHub = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const actions = [
    {
      id: 'create',
      label: 'Create Capsule',
      icon: 'Plus',
      path: '/memory-forge-creation',
      glowColor: 'glow-primary',
      description: 'Forge new memory capsule'
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'Home',
      path: '/my-time-orbit-dashboard',
      glowColor: 'glow-secondary',
      description: 'Return to orbital view'
    },
    {
      id: 'filter',
      label: 'Filter',
      icon: 'Filter',
      action: () => console.log('Filter capsules'),
      glowColor: 'glow-accent',
      description: 'Filter orbital capsules'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      action: () => console.log('Open settings'),
      glowColor: 'glow-warning',
      description: 'Cosmic preferences'
    }
  ];

  const handleActionClick = (action) => {
    if (action?.path) {
      navigate(action?.path);
    } else if (action?.action) {
      action?.action();
    }
    setIsExpanded(false);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-100 ${className}`}>
      {/* Desktop: Radial Menu */}
      <div className="hidden md:block">
        {/* Action Items */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 space-y-3">
            {actions?.map((action, index) => (
              <div
                key={action?.id}
                className="flex items-center justify-end group"
                style={{
                  animation: `float 0.3s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="glassmorphic px-3 py-2 mr-3 opacity-0 group-hover:opacity-100 cosmic-transition">
                  <span className="text-sm font-caption text-text-primary whitespace-nowrap">
                    {action?.description}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleActionClick(action)}
                  className={`glassmorphic w-12 h-12 ${action?.glowColor} hover-glow-primary cosmic-transition`}
                  aria-label={action?.label}
                >
                  <Icon name={action?.icon} size={20} />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Main Toggle Button */}
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`glassmorphic w-14 h-14 glow-primary hover-glow-primary cosmic-transition ${
            isExpanded ? 'rotate-45' : ''
          }`}
          aria-label={isExpanded ? 'Close action menu' : 'Open action menu'}
          aria-expanded={isExpanded}
        >
          <Icon name={isExpanded ? 'X' : 'Sparkles'} size={24} />
        </Button>
      </div>
      {/* Mobile: Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glassmorphic rounded-t-3xl border-t border-border">
        <div className="flex justify-around items-center py-3 px-4">
          {actions?.map((action) => (
            <Button
              key={action?.id}
              variant="ghost"
              size="sm"
              onClick={() => handleActionClick(action)}
              className={`flex flex-col items-center space-y-1 ${action?.glowColor} hover-glow-primary cosmic-transition`}
              aria-label={action?.label}
            >
              <Icon name={action?.icon} size={20} />
              <span className="text-xs font-caption">{action?.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloatingActionHub;