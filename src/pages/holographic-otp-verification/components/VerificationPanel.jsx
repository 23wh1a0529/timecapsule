import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VerificationPanel = ({ 
  email = '',
  isVerifying = false,
  onVerify = () => {},
  onBack = () => {},
  className = '' 
}) => {
  const maskEmail = (email) => {
    if (!email) return '';
    const [username, domain] = email?.split('@');
    if (!username || !domain) return email;
    
    const maskedUsername = username?.length > 2 
      ? username?.[0] + '*'?.repeat(username?.length - 2) + username?.[username?.length - 1]
      : username;
    
    return `${maskedUsername}@${domain}`;
  };

  return (
    <div className={`glassmorphic p-8 md:p-10 space-y-8 ${className}`}>
      {/* Header Section */}
      <div className="text-center space-y-4">
        {/* Holographic Icon */}
        <div className="relative inline-block">
          <div className="w-16 h-16 md:w-20 md:h-20 glassmorphic rounded-2xl flex items-center justify-center glow-primary">
            <Icon name="Shield" size={32} className="text-primary" />
          </div>
          
          {/* Orbital Rings */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 border-2 border-primary opacity-30 rounded-2xl animate-ping" />
            <div className="absolute inset-2 border border-secondary opacity-20 rounded-xl animate-ping delay-500" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-heading text-primary glow-primary">
            Holographic Verification
          </h1>
          <p className="text-text-secondary font-caption">
            Secure your temporal identity with quantum authentication
          </p>
        </div>
      </div>
      {/* Email Display */}
      <div className="glassmorphic p-4 rounded-xl border border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 glassmorphic rounded-lg flex items-center justify-center">
            <Icon name="Mail" size={18} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-caption text-text-secondary">
              Verification code sent to:
            </div>
            <div className="text-text-primary font-mono text-sm">
              {maskEmail(email)}
            </div>
          </div>
          <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center glow-success">
            <Icon name="Check" size={14} className="text-success-foreground" />
          </div>
        </div>
      </div>
      {/* Instructions */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary">
          Verification Instructions
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 glassmorphic rounded-full flex items-center justify-center mt-0.5">
              <span className="text-xs font-mono text-primary">1</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-text-secondary">
                Check your email inbox for the 6-digit verification code
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 glassmorphic rounded-full flex items-center justify-center mt-0.5">
              <span className="text-xs font-mono text-primary">2</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-text-secondary">
                Enter the code in the holographic input fields above
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 glassmorphic rounded-full flex items-center justify-center mt-0.5">
              <span className="text-xs font-mono text-primary">3</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-text-secondary">
                If you don't see the email, check your spam or junk folder
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Security Notice */}
      <div className="glassmorphic p-4 rounded-xl border border-warning/30 bg-warning/5">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={18} className="text-warning mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-heading text-warning mb-1">
              Security Notice
            </h4>
            <p className="text-xs text-text-secondary">
              Never share your verification code with anyone. KalChakra will never ask for your code via phone or email.
            </p>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isVerifying}
          className="flex-1 hover-glow-secondary"
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Login
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => console.log('Contact support')}
          disabled={isVerifying}
          className="flex-1 hover-glow-accent"
          iconName="HelpCircle"
          iconPosition="left"
        >
          Need Help?
        </Button>
      </div>
      {/* Cosmic Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {/* Data Streams */}
        {[...Array(4)]?.map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"
            style={{
              left: `${20 + i * 20}%`,
              animation: `float 3s ease-in-out infinite ${i * 0.5}s`
            }}
          />
        ))}
        
        {/* Floating Particles */}
        {[...Array(8)]?.map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default VerificationPanel;
