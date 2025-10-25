import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const HolographicOTPInput = ({ 
  onComplete = () => {}, 
  onDigitChange = () => {},
  isVerifying = false,
  error = null,
  className = '' 
}) => {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs?.current?.[0]) {
      inputRefs?.current?.[0]?.focus();
    }
  }, []);

  useEffect(() => {
    if (digits?.every(digit => digit !== '')) {
      onComplete(digits?.join(''));
    }
  }, [digits, onComplete]);

  const handleDigitChange = (index, value) => {
    if (!/^\d*$/?.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value?.slice(-1);
    setDigits(newDigits);
    onDigitChange(newDigits);

    if (value && index < 5) {
      inputRefs?.current?.[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !digits?.[index] && index > 0) {
      inputRefs?.current?.[index - 1]?.focus();
      setFocusedIndex(index - 1);
    } else if (e?.key === 'ArrowLeft' && index > 0) {
      inputRefs?.current?.[index - 1]?.focus();
      setFocusedIndex(index - 1);
    } else if (e?.key === 'ArrowRight' && index < 5) {
      inputRefs?.current?.[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handlePaste = (e) => {
    e?.preventDefault();
    const pastedData = e?.clipboardData?.getData('text')?.replace(/\D/g, '')?.slice(0, 6);
    const newDigits = [...digits];
    
    for (let i = 0; i < pastedData?.length && i < 6; i++) {
      newDigits[i] = pastedData?.[i];
    }
    
    setDigits(newDigits);
    
    const nextEmptyIndex = newDigits?.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs?.current?.[focusIndex]?.focus();
    setFocusedIndex(focusIndex);
  };

  const clearOTP = () => {
    setDigits(['', '', '', '', '', '']);
    inputRefs?.current?.[0]?.focus();
    setFocusedIndex(0);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Holographic Input Grid */}
      <div className="flex justify-center space-x-3 md:space-x-4">
        {digits?.map((digit, index) => (
          <div
            key={index}
            className={`relative group ${
              error ? 'animate-pulse' : ''
            }`}
          >
            {/* Holographic Glow Effect */}
            <div
              className={`absolute inset-0 rounded-xl cosmic-transition ${
                focusedIndex === index
                  ? 'glow-primary opacity-100'
                  : digit
                  ? 'glow-success opacity-70' :'glow-subtle opacity-30'
              } ${error ? 'glow-error' : ''}`}
            />
            
            {/* Input Container */}
            <div
              className={`relative glassmorphic rounded-xl border-2 cosmic-transition ${
                focusedIndex === index
                  ? 'border-primary'
                  : digit
                  ? 'border-success' :'border-border'
              } ${error ? 'border-error' : ''}`}
            >
              <input
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(index, e?.target?.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={() => setFocusedIndex(index)}
                disabled={isVerifying}
                className={`w-12 h-14 md:w-16 md:h-18 text-center text-2xl md:text-3xl font-mono font-bold bg-transparent text-text-primary border-none outline-none cosmic-transition ${
                  isVerifying ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label={`OTP digit ${index + 1}`}
              />
              
              {/* Particle Effect for Active Input */}
              {focusedIndex === index && !error && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1 left-1 w-1 h-1 bg-primary rounded-full animate-ping" />
                  <div className="absolute top-1 right-1 w-1 h-1 bg-secondary rounded-full animate-ping delay-100" />
                  <div className="absolute bottom-1 left-1 w-1 h-1 bg-accent rounded-full animate-ping delay-200" />
                  <div className="absolute bottom-1 right-1 w-1 h-1 bg-primary rounded-full animate-ping delay-300" />
                </div>
              )}
            </div>

            {/* Success Checkmark */}
            {digit && !error && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center glow-success">
                <Icon name="Check" size={14} className="text-success-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Input Status */}
      <div className="text-center space-y-2">
        {error ? (
          <div className="flex items-center justify-center space-x-2 text-error">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm font-caption">{error}</span>
          </div>
        ) : (
          <div className="text-sm font-caption text-text-secondary">
            Enter the 6-digit verification code
          </div>
        )}

        {/* Clear Button */}
        {digits?.some(digit => digit !== '') && !isVerifying && (
          <button
            onClick={clearOTP}
            className="text-xs text-text-secondary hover:text-primary cosmic-transition flex items-center justify-center space-x-1 mx-auto"
          >
            <Icon name="RotateCcw" size={12} />
            <span>Clear</span>
          </button>
        )}
      </div>
      {/* Verification Loading */}
      {isVerifying && (
        <div className="flex items-center justify-center space-x-3">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-caption text-primary">
            Verifying holographic signature...
          </span>
        </div>
      )}
    </div>
  );
};

export default HolographicOTPInput;