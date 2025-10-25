import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrbitalControls = ({ 
  onNavigate, 
  onViewChange, 
  currentCapsule, 
  totalCapsules,
  className = '' 
}) => {
  const [viewMode, setViewMode] = useState('orbital');
  const [isControlsExpanded, setIsControlsExpanded] = useState(false);

  const viewModes = [
    { id: 'orbital', label: 'Orbital View', icon: 'Orbit' },
    { id: 'detailed', label: 'Detailed View', icon: 'Maximize' },
    { id: 'timeline', label: 'Timeline View', icon: 'Calendar' }
  ];

  const navigationActions = [
    { id: 'dashboard', label: 'Dashboard', icon: 'Home', path: '/my-time-orbit-dashboard' },
    { id: 'create', label: 'Create New', icon: 'Plus', path: '/memory-forge-creation' },
    { id: 'previous', label: 'Previous Capsule', icon: 'ChevronLeft', action: 'prev' },
    { id: 'next', label: 'Next Capsule', icon: 'ChevronRight', action: 'next' }
  ];

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    onViewChange(mode);
  };

  const handleNavigation = (action) => {
    if (action?.path) {
      onNavigate(action?.path);
    } else if (action?.action) {
      onNavigate(action?.action);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Mobile: Floating Controls */}
      <div className="md:hidden">
        {/* Expandable Control Panel */}
        {isControlsExpanded && (
          <motion.div
            className="fixed bottom-20 left-4 right-4 glassmorphic p-4 rounded-2xl z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {/* View Mode Selector */}
            <div className="mb-4">
              <h4 className="text-sm font-caption text-text-secondary mb-2">View Mode</h4>
              <div className="flex space-x-2">
                {viewModes?.map((mode) => (
                  <Button
                    key={mode?.id}
                    variant={viewMode === mode?.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleViewModeChange(mode?.id)}
                    iconName={mode?.icon}
                    className={viewMode === mode?.id ? 'glow-primary' : 'hover-glow-primary'}
                  >
                    {mode?.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="grid grid-cols-2 gap-2">
              {navigationActions?.map((action) => (
                <Button
                  key={action?.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigation(action)}
                  iconName={action?.icon}
                  iconPosition="left"
                  className="hover-glow-secondary"
                >
                  {action?.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Toggle Button */}
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsControlsExpanded(!isControlsExpanded)}
          className="fixed bottom-6 left-6 glassmorphic glow-primary hover-glow-primary z-50"
          aria-label={isControlsExpanded ? 'Close controls' : 'Open controls'}
        >
          <Icon name={isControlsExpanded ? 'X' : 'Settings'} size={20} />
        </Button>
      </div>
      {/* Desktop: Side Panel Controls */}
      <div className="hidden md:block space-y-6">
        {/* Capsule Navigation */}
        <div className="glassmorphic p-4 rounded-2xl">
          <h3 className="text-lg font-heading text-primary glow-primary mb-4">
            Capsule Navigation
          </h3>
          
          {/* Capsule Counter */}
          <div className="text-center mb-4">
            <div className="text-2xl font-mono text-text-primary">
              {currentCapsule} / {totalCapsules}
            </div>
            <div className="text-sm text-text-secondary font-caption">
              Current Capsule
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-2 mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleNavigation({ action: 'prev' })}
              disabled={currentCapsule <= 1}
              className="hover-glow-primary"
              aria-label="Previous capsule"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleNavigation({ action: 'next' })}
              disabled={currentCapsule >= totalCapsules}
              className="hover-glow-primary"
              aria-label="Next capsule"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              fullWidth
              onClick={() => handleNavigation({ path: '/my-time-orbit-dashboard' })}
              iconName="Home"
              iconPosition="left"
              className="hover-glow-secondary"
            >
              Return to Dashboard
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={() => handleNavigation({ path: '/memory-forge-creation' })}
              iconName="Plus"
              iconPosition="left"
              className="hover-glow-accent"
            >
              Create New Capsule
            </Button>
          </div>
        </div>

        {/* View Controls */}
        <div className="glassmorphic p-4 rounded-2xl">
          <h4 className="text-sm font-heading text-text-primary mb-3">View Controls</h4>
          
          {/* View Mode Selector */}
          <div className="space-y-2">
            {viewModes?.map((mode) => (
              <Button
                key={mode?.id}
                variant={viewMode === mode?.id ? 'default' : 'ghost'}
                size="sm"
                fullWidth
                onClick={() => handleViewModeChange(mode?.id)}
                iconName={mode?.icon}
                iconPosition="left"
                className={viewMode === mode?.id ? 'glow-primary' : 'hover-glow-primary'}
              >
                {mode?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Orbital Physics Controls */}
        <div className="glassmorphic p-4 rounded-2xl">
          <h4 className="text-sm font-heading text-text-primary mb-3">Physics Controls</h4>
          
          <div className="space-y-3">
            {/* Rotation Speed */}
            <div>
              <label className="text-xs text-text-secondary mb-1 block">
                Rotation Speed
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="50"
                className="w-full accent-primary"
              />
            </div>

            {/* Particle Density */}
            <div>
              <label className="text-xs text-text-secondary mb-1 block">
                Particle Density
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="75"
                className="w-full accent-secondary"
              />
            </div>

            {/* Glow Intensity */}
            <div>
              <label className="text-xs text-text-secondary mb-1 block">
                Glow Intensity
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="60"
                className="w-full accent-accent"
              />
            </div>
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => console.log('Reset physics')}
            iconName="RotateCcw"
            iconPosition="left"
            className="mt-4 hover-glow-warning"
          >
            Reset Physics
          </Button>
        </div>

        {/* Audio Controls */}
        <div className="glassmorphic p-4 rounded-2xl">
          <h4 className="text-sm font-heading text-text-primary mb-3">Audio Controls</h4>
          
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              iconName="Volume2"
              iconPosition="left"
              className="hover-glow-primary"
            >
              Ambient Sounds
            </Button>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              iconName="Music"
              iconPosition="left"
              className="hover-glow-secondary"
            >
              Cosmic Music
            </Button>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              iconName="VolumeX"
              iconPosition="left"
              className="hover-glow-error"
            >
              Mute All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrbitalControls;