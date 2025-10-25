import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationFlow = ({ className = '' }) => {
  const location = useLocation();

  const authSteps = [
    {
      path: '/kal-chakra-gateway-landing',
      label: 'Gateway',
      icon: 'Rocket',
      description: 'Enter the cosmic realm'
    },
    {
      path: '/temporal-identity-console',
      label: 'Identity',
      icon: 'User',
      description: 'Establish temporal identity'
    },
    {
      path: '/holographic-otp-verification',
      label: 'Verification',
      icon: 'Shield',
      description: 'Holographic authentication'
    }
  ];

  const getCurrentStepIndex = () => {
    return authSteps?.findIndex(step => step?.path === location?.pathname);
  };

  const currentStepIndex = getCurrentStepIndex();

  if (currentStepIndex === -1) return null;

  return (
    <div className={`glassmorphic p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-heading text-primary glow-primary">
          Cosmic Authentication
        </h2>
        <span className="text-sm font-caption text-text-secondary">
          Step {currentStepIndex + 1} of {authSteps?.length}
        </span>
      </div>
      {/* Progress Constellation */}
      <div className="flex items-center justify-between mb-8">
        {authSteps?.map((step, index) => (
          <div key={step?.path} className="flex items-center">
            {/* Step Node */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center cosmic-transition ${
                  index <= currentStepIndex
                    ? 'bg-primary text-primary-foreground glow-primary'
                    : 'glassmorphic text-text-secondary'
                } ${index === currentStepIndex ? 'temporal-pulse' : ''}`}
              >
                <Icon name={step?.icon} size={20} />
              </div>
              <div className="mt-2 text-center">
                <div className={`text-sm font-caption ${
                  index <= currentStepIndex ? 'text-primary' : 'text-text-secondary'
                }`}>
                  {step?.label}
                </div>
                <div className="text-xs text-text-secondary mt-1 max-w-20">
                  {step?.description}
                </div>
              </div>
            </div>

            {/* Constellation Connection */}
            {index < authSteps?.length - 1 && (
              <div className="flex-1 mx-4 h-px relative">
                <div
                  className={`h-full cosmic-transition ${
                    index < currentStepIndex
                      ? 'bg-primary glow-primary' :'bg-border'
                  }`}
                />
                {index < currentStepIndex && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-50 animate-pulse" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Current Step Info */}
      <div className="text-center">
        <h3 className="text-xl font-heading text-text-primary mb-2">
          {authSteps?.[currentStepIndex]?.label}
        </h3>
        <p className="text-text-secondary font-caption">
          {authSteps?.[currentStepIndex]?.description}
        </p>
      </div>
      {/* Cosmic Progress Bar */}
      <div className="mt-6 w-full bg-surface rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary glow-primary cosmic-transition"
          style={{
            width: `${((currentStepIndex + 1) / authSteps?.length) * 100}%`
          }}
        />
      </div>
    </div>
  );
};

export default AuthenticationFlow;