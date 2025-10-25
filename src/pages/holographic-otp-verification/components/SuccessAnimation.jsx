import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessAnimation = ({ 
  isVisible = false,
  onContinue = () => {},
  className = '' 
}) => {
  const [animationStage, setAnimationStage] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Stage 1: Initial burst
      setTimeout(() => setAnimationStage(1), 100);
      // Stage 2: Ring expansion
      setTimeout(() => setAnimationStage(2), 600);
      // Stage 3: Content reveal
      setTimeout(() => {
        setAnimationStage(3);
        setShowContent(true);
      }, 1200);
    } else {
      setAnimationStage(0);
      setShowContent(false);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${className}`}>
      {/* Cosmic Overlay */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-lg" />
      {/* Success Animation Container */}
      <div className="relative z-10 text-center space-y-8">
        {/* Central Success Icon with Rings */}
        <div className="relative inline-block">
          {/* Expanding Rings */}
          {animationStage >= 1 && (
            <>
              <div className="absolute inset-0 w-32 h-32 border-4 border-success rounded-full glow-success animate-ping" />
              <div className="absolute inset-2 w-28 h-28 border-2 border-primary rounded-full glow-primary animate-ping delay-200" />
              <div className="absolute inset-4 w-24 h-24 border border-secondary rounded-full glow-secondary animate-ping delay-400" />
            </>
          )}
          
          {/* Central Icon */}
          <div className={`relative w-32 h-32 glassmorphic rounded-full flex items-center justify-center glow-success cosmic-transition ${
            animationStage >= 2 ? 'scale-100' : 'scale-0'
          }`}>
            <Icon name="CheckCircle" size={48} className="text-success" />
          </div>

          {/* Particle Burst */}
          {animationStage >= 1 && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)]?.map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-success rounded-full glow-success"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-60px)`,
                    animation: `particle-burst 1s ease-out ${i * 0.05}s both`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Success Content */}
        {showContent && (
          <div className={`space-y-6 cosmic-transition ${
            animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {/* Success Message */}
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-heading text-success glow-success">
                Verification Complete!
              </h2>
              <p className="text-lg text-text-secondary font-caption max-w-md mx-auto">
                Your holographic identity has been successfully authenticated. Welcome to the KalChakra temporal realm.
              </p>
            </div>

            {/* Blockchain Confirmation */}
            <div className="glassmorphic p-6 rounded-2xl border border-success/30 bg-success/5 max-w-md mx-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Shield" size={20} className="text-success" />
                  <span className="text-sm font-heading text-success">
                    Blockchain Verified
                  </span>
                </div>
                
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Transaction ID:</span>
                    <span className="text-primary">0x7f8a9b2c...d4e5f6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Block Height:</span>
                    <span className="text-primary">2,847,391</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Gas Used:</span>
                    <span className="text-primary">21,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="pt-4">
              <Button
                variant="default"
                size="lg"
                onClick={onContinue}
                className="px-8 py-4 glow-primary hover-glow-success cosmic-transition"
                iconName="ArrowRight"
                iconPosition="right"
              >
                Enter Time Orbit Dashboard
              </Button>
            </div>
          </div>
        )}

        {/* Holographic Grid Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
              {[...Array(64)]?.map((_, i) => (
                <div
                  key={i}
                  className="border border-primary/20"
                  style={{
                    animation: `grid-pulse 2s ease-in-out infinite ${(i % 8) * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes particle-burst {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(0px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-120px) scale(0);
          }
        }
        
        @keyframes grid-pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default SuccessAnimation;
