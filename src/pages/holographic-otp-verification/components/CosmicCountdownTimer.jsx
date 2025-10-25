import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CosmicCountdownTimer = ({ 
  initialTime = 300, // 5 minutes in seconds
  onExpire = () => {},
  onResend = () => {},
  canResend = true,
  resendAttempts = 0,
  maxAttempts = 3,
  className = '' 
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isExpired, setIsExpired] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!isExpired) {
      setIsExpired(true);
      onExpire();
    }
  }, [timeLeft, isExpired, onExpire]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((initialTime - timeLeft) / initialTime) * 100;
  };

  const getTimerColor = () => {
    const percentage = (timeLeft / initialTime) * 100;
    if (percentage > 50) return 'text-success';
    if (percentage > 20) return 'text-warning';
    return 'text-error';
  };

  const getGlowColor = () => {
    const percentage = (timeLeft / initialTime) * 100;
    if (percentage > 50) return 'glow-success';
    if (percentage > 20) return 'glow-warning';
    return 'glow-error';
  };

  const handleResend = () => {
    if (canResend && resendCooldown === 0 && resendAttempts < maxAttempts) {
      setTimeLeft(initialTime);
      setIsExpired(false);
      setResendCooldown(60); // 1 minute cooldown
      onResend();
    }
  };

  return (
    <div className={`text-center space-y-6 ${className}`}>
      {/* Cosmic Timer Display */}
      <div className="relative inline-block">
        {/* Orbital Ring */}
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          {/* Background Ring */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
            />
            {/* Progress Ring */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`}
              className={`cosmic-transition ${getTimerColor()}`}
              style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
            />
          </svg>

          {/* Central Time Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-2xl md:text-3xl font-mono font-bold ${getTimerColor()} ${getGlowColor()}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-xs text-text-secondary font-caption mt-1">
              {isExpired ? 'EXPIRED' : 'REMAINING'}
            </div>
          </div>

          {/* Particle Effects */}
          {!isExpired && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-ping" />
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-secondary rounded-full animate-ping delay-500" />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-ping delay-1000" />
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-primary rounded-full animate-ping delay-1500" />
            </div>
          )}
        </div>
      </div>
      {/* Timer Status */}
      <div className="space-y-2">
        {isExpired ? (
          <div className="flex items-center justify-center space-x-2 text-error">
            <Icon name="Clock" size={16} />
            <span className="text-sm font-caption">Verification code expired</span>
          </div>
        ) : (
          <div className="text-sm font-caption text-text-secondary">
            Code expires in {formatTime(timeLeft)}
          </div>
        )}

        {/* Resend Section */}
        <div className="space-y-3">
          {resendAttempts < maxAttempts ? (
            <div>
              {resendCooldown > 0 ? (
                <div className="flex items-center justify-center space-x-2 text-text-secondary">
                  <Icon name="Timer" size={14} />
                  <span className="text-xs font-caption">
                    Resend available in {resendCooldown}s
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={!canResend}
                  className={`text-sm font-caption cosmic-transition ${
                    canResend
                      ? 'text-primary hover:text-secondary hover-glow-primary' :'text-text-secondary cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Icon name="RefreshCw" size={14} />
                    <span>Resend verification code</span>
                  </div>
                </button>
              )}
            </div>
          ) : (
            <div className="text-xs text-error font-caption">
              Maximum resend attempts reached
            </div>
          )}

          {/* Attempt Counter */}
          <div className="flex items-center justify-center space-x-2 text-xs text-text-secondary">
            <Icon name="RotateCcw" size={12} />
            <span>
              Attempts: {resendAttempts}/{maxAttempts}
            </span>
          </div>
        </div>
      </div>
      {/* Cosmic Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {/* Floating Particles */}
        {[...Array(6)]?.map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-primary rounded-full opacity-30 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CosmicCountdownTimer;