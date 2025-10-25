import React from 'react';
import Icon from '../../../components/AppIcon';

const CreationProgress = ({ 
  currentStep, 
  totalSteps, 
  stepData,
  className = '' 
}) => {
  const steps = [
    {
      id: 'content',
      title: 'Memory Content',
      description: 'Add your memories',
      icon: 'FileText'
    },
    {
      id: 'date',
      title: 'Unlock Date',
      description: 'Set future unlock',
      icon: 'Calendar'
    },
    {
      id: 'message',
      title: 'Personal Message',
      description: 'Write to future self',
      icon: 'Heart'
    },
    {
      id: 'encrypt',
      title: 'Encryption',
      description: 'Secure your capsule',
      icon: 'Shield'
    }
  ];

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const getCompletionPercentage = () => {
    return Math.round((currentStep / totalSteps) * 100);
  };

  return (
    <div className={`glassmorphic p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading text-primary glow-primary">
          Creation Progress
        </h3>
        <div className="text-sm font-mono text-accent glow-accent">
          {getCompletionPercentage()}%
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-surface rounded-full h-3 overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent glow-primary cosmic-transition"
            style={{ width: `${getCompletionPercentage()}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-text-secondary">
          <span>Start</span>
          <span>Complete</span>
        </div>
      </div>
      {/* Step Indicators */}
      <div className="space-y-4">
        {steps?.map((step, index) => {
          const status = getStepStatus(index);
          
          return (
            <div
              key={step?.id}
              className={`flex items-center space-x-4 p-3 rounded-xl cosmic-transition ${
                status === 'active' ?'glassmorphic border border-primary glow-primary'
                  : status === 'completed' ?'glassmorphic border border-success/30' :'bg-surface/30'
              }`}
            >
              {/* Step Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center cosmic-transition ${
                status === 'completed'
                  ? 'bg-success text-success-foreground glow-success'
                  : status === 'active' ?'bg-primary text-primary-foreground glow-primary temporal-pulse' :'bg-surface text-text-secondary'
              }`}>
                <Icon 
                  name={status === 'completed' ? 'Check' : step?.icon} 
                  size={20} 
                />
              </div>
              {/* Step Content */}
              <div className="flex-1">
                <div className={`font-caption ${
                  status === 'pending' ? 'text-text-secondary' : 'text-text-primary'
                }`}>
                  {step?.title}
                </div>
                <div className="text-xs text-text-secondary">
                  {step?.description}
                </div>
              </div>
              {/* Step Status */}
              <div className="text-right">
                {status === 'completed' && (
                  <Icon name="CheckCircle" size={16} className="text-success glow-success" />
                )}
                {status === 'active' && (
                  <Icon name="Clock" size={16} className="text-primary glow-primary animate-pulse" />
                )}
                {status === 'pending' && (
                  <Icon name="Circle" size={16} className="text-text-secondary" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Step Details */}
      {stepData && (
        <div className="mt-6 glassmorphic p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Info" size={16} className="text-accent glow-accent" />
            <span className="text-sm font-caption text-text-primary">
              Current Step Details
            </span>
          </div>
          
          <div className="space-y-2 text-sm text-text-secondary">
            {stepData?.hasContent && (
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Memory content added</span>
              </div>
            )}
            {stepData?.hasDate && (
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Unlock date selected</span>
              </div>
            )}
            {stepData?.hasMessage && (
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Personal message written</span>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Time Estimate */}
      <div className="mt-6 glassmorphic p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-warning glow-warning" />
            <span className="text-sm font-caption text-text-primary">
              Estimated Time
            </span>
          </div>
          <div className="text-sm font-mono text-accent">
            {currentStep < totalSteps ? `${(totalSteps - currentStep) * 2}min` : 'Complete'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreationProgress;