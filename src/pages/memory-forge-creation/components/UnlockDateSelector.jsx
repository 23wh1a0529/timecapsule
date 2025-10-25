import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';

const UnlockDateSelector = ({ 
  unlockDate, 
  onDateChange, 
  className = '' 
}) => {
  const [selectedPreset, setSelectedPreset] = useState('');
  const [customDate, setCustomDate] = useState(unlockDate || '');

  const presetOptions = [
    {
      id: '1year',
      label: '1 Year',
      description: 'Perfect for annual reflections',
      icon: 'Calendar',
      date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0]
    },
    {
      id: '5years',
      label: '5 Years',
      description: 'Long-term goal tracking',
      icon: 'Target',
      date: new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0]
    },
    {
      id: '10years',
      label: '10 Years',
      description: 'Decade milestone capsule',
      icon: 'Trophy',
      date: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0]
    },
    {
      id: '25years',
      label: '25 Years',
      description: 'Quarter-century time vault',
      icon: 'Crown',
      date: new Date(Date.now() + 25 * 365 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0]
    }
  ];

  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset?.id);
    setCustomDate(preset?.date);
    onDateChange(preset?.date);
  };

  const handleCustomDateChange = (value) => {
    setCustomDate(value);
    setSelectedPreset('');
    onDateChange(value);
  };

  const calculateTimeUntilUnlock = (date) => {
    if (!date) return '';
    
    const now = new Date();
    const unlock = new Date(date);
    const diffTime = unlock?.getTime() - now?.getTime();
    
    if (diffTime <= 0) return 'Past date';
    
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;
    
    if (years > 0) {
      return `${years}y ${months}m ${days}d`;
    } else if (months > 0) {
      return `${months}m ${days}d`;
    } else {
      return `${days}d`;
    }
  };

  const minDate = new Date()?.toISOString()?.split('T')?.[0];
  const maxDate = new Date(Date.now() + 50 * 365 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0];

  return (
    <div className={`glassmorphic p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading text-primary glow-primary">
          Unlock Date
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={20} className="text-accent glow-accent" />
          <span className="text-sm font-caption text-text-secondary">
            When should this memory unlock?
          </span>
        </div>
      </div>
      {/* Preset Options */}
      <div className="space-y-4 mb-8">
        <h4 className="text-sm font-heading text-text-primary mb-3">
          Quick Presets
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {presetOptions?.map((preset) => (
            <button
              key={preset?.id}
              onClick={() => handlePresetSelect(preset)}
              className={`glassmorphic p-4 rounded-xl text-left cosmic-transition ${
                selectedPreset === preset?.id
                  ? 'border-primary glow-primary' :'hover:border-primary/50 hover-glow-primary'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  selectedPreset === preset?.id ? 'bg-primary text-primary-foreground' : 'bg-surface'
                }`}>
                  <Icon name={preset?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-caption text-text-primary mb-1">
                    {preset?.label}
                  </div>
                  <div className="text-xs text-text-secondary mb-2">
                    {preset?.description}
                  </div>
                  <div className="text-xs font-mono text-primary">
                    {new Date(preset.date)?.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Custom Date Selection */}
      <div className="space-y-4">
        <h4 className="text-sm font-heading text-text-primary">
          Custom Date
        </h4>
        
        <Input
          type="date"
          label="Select Custom Unlock Date"
          value={customDate}
          onChange={(e) => handleCustomDateChange(e?.target?.value)}
          min={minDate}
          max={maxDate}
          className="font-mono"
        />

        {customDate && (
          <div className="glassmorphic p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-caption text-text-primary mb-1">
                  Selected Unlock Date
                </div>
                <div className="text-lg font-mono text-primary glow-primary">
                  {new Date(customDate)?.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-caption text-text-secondary mb-1">
                  Time Until Unlock
                </div>
                <div className="text-lg font-mono text-accent glow-accent">
                  {calculateTimeUntilUnlock(customDate)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Temporal Visualization */}
      {customDate && (
        <div className="mt-6 glassmorphic p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Zap" size={16} className="text-warning glow-warning" />
            <span className="text-sm font-caption text-text-primary">
              Temporal Lock Strength
            </span>
          </div>
          
          <div className="relative">
            <div className="w-full bg-surface rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent glow-primary cosmic-transition"
                style={{
                  width: `${Math.min(100, (calculateTimeUntilUnlock(customDate)?.includes('y') ? 100 : 50))}%`
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-text-secondary mt-2">
              <span>Weak Lock</span>
              <span>Strong Lock</span>
              <span>Quantum Lock</span>
            </div>
          </div>
        </div>
      )}
      {/* Date Validation */}
      {customDate && new Date(customDate) <= new Date() && (
        <div className="mt-4 glassmorphic p-3 rounded-lg border border-error">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-error" />
            <span className="text-sm text-error">
              Unlock date must be in the future
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnlockDateSelector;