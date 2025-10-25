import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CosmicBreadcrumb from '../../components/ui/CosmicBreadcrumb';
import AuthenticationFlow from '../../components/ui/AuthenticationFlow';
import HolographicOTPInput from './components/HolographicOTPInput';
import CosmicCountdownTimer from './components/CosmicCountdownTimer';
import VerificationPanel from './components/VerificationPanel';
import SuccessAnimation from './components/SuccessAnimation';

const HolographicOTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email from navigation state or localStorage
  const [userEmail] = useState(() => {
    return location?.state?.email || localStorage.getItem('tempEmail') || 'user@example.com';
  });

  // Component states
  const [otpCode, setOtpCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [resendAttempts, setResendAttempts] = useState(0);
  const [canResend, setCanResend] = useState(true);

  // Mock correct OTP for demonstration
  const correctOTP = '123456';

  useEffect(() => {
    // Clear any existing verification data
    localStorage.removeItem('verificationComplete');
    
    // Add cosmic background effects
    document.body?.classList?.add('cosmic-bg');
    
    return () => {
      document.body?.classList?.remove('cosmic-bg');
    };
  }, []);

  const handleOTPComplete = async (code) => {
    setOtpCode(code);
    setVerificationError(null);
    setIsVerifying(true);

    try {
      // Simulate API verification delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (code === correctOTP) {
        // Success - trigger animation
        setShowSuccess(true);
        localStorage.setItem('verificationComplete', 'true');
        localStorage.setItem('userEmail', userEmail);
      } else {
        setVerificationError('Invalid verification code. Please check and try again.');
      }
    } catch (error) {
      setVerificationError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOTPDigitChange = (digits) => {
    // Clear error when user starts typing
    if (verificationError) {
      setVerificationError(null);
    }
  };

  const handleTimerExpire = () => {
    setVerificationError('Verification code has expired. Please request a new code.');
    setCanResend(true);
  };

  const handleResendCode = async () => {
    if (resendAttempts >= 3) {
      setVerificationError('Maximum resend attempts reached. Please try again later.');
      return;
    }

    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResendAttempts(prev => prev + 1);
      setVerificationError(null);
      
      // Show success message for resend
      console.log('New verification code sent to:', userEmail);
    } catch (error) {
      setVerificationError('Failed to resend code. Please try again.');
    }
  };

  const handleBackToLogin = () => {
    navigate('/temporal-identity-console');
  };

  const handleSuccessContinue = () => {
    setShowSuccess(false);
    navigate('/my-time-orbit-dashboard');
  };

  return (
    <>
      <Helmet>
        <title>Holographic Verification - KalChakra</title>
        <meta name="description" content="Secure your temporal identity with quantum holographic verification. Enter your 6-digit code to access the KalChakra cosmic realm." />
        <meta name="keywords" content="holographic verification, OTP, quantum authentication, time capsule security" />
      </Helmet>
      <div className="min-h-screen cosmic-bg relative overflow-hidden">
        {/* Cosmic Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Particles */}
          {[...Array(20)]?.map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
          
          {/* Data Streams */}
          {[...Array(6)]?.map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent"
              style={{
                left: `${10 + i * 15}%`,
                animation: `float 4s ease-in-out infinite ${i * 0.7}s`
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <CosmicBreadcrumb />

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column: Authentication Flow & Info */}
              <div className="space-y-8">
                <AuthenticationFlow className="hidden lg:block" />
                
                <VerificationPanel
                  email={userEmail}
                  isVerifying={isVerifying}
                  onBack={handleBackToLogin}
                  className="lg:hidden"
                />
              </div>

              {/* Right Column: OTP Input & Timer */}
              <div className="space-y-8">
                {/* Desktop Verification Panel */}
                <VerificationPanel
                  email={userEmail}
                  isVerifying={isVerifying}
                  onBack={handleBackToLogin}
                  className="hidden lg:block"
                />

                {/* OTP Input Section */}
                <div className="glassmorphic p-8 md:p-10 space-y-8">
                  <div className="text-center space-y-2">
                    <h2 className="text-xl md:text-2xl font-heading text-primary glow-primary">
                      Enter Verification Code
                    </h2>
                    <p className="text-sm text-text-secondary font-caption">
                      Input the 6-digit holographic signature
                    </p>
                  </div>

                  <HolographicOTPInput
                    onComplete={handleOTPComplete}
                    onDigitChange={handleOTPDigitChange}
                    isVerifying={isVerifying}
                    error={verificationError}
                  />

                  <CosmicCountdownTimer
                    initialTime={300}
                    onExpire={handleTimerExpire}
                    onResend={handleResendCode}
                    canResend={canResend}
                    resendAttempts={resendAttempts}
                    maxAttempts={3}
                  />

                  {/* Mock Credentials Display */}
                  <div className="glassmorphic p-4 rounded-xl border border-primary/30 bg-primary/5">
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        <span className="text-xs font-caption text-text-secondary">
                          Demo Mode Active
                        </span>
                      </div>
                      <div className="text-sm font-mono text-primary">
                        Use code: <span className="font-bold glow-primary">123456</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Authentication Flow */}
                <AuthenticationFlow className="lg:hidden" />
              </div>
            </div>
          </div>
        </div>

        {/* Success Animation Overlay */}
        <SuccessAnimation
          isVisible={showSuccess}
          onContinue={handleSuccessContinue}
        />

        {/* Holographic Grid Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-5">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {[...Array(144)]?.map((_, i) => (
              <div
                key={i}
                className="border border-primary/20"
                style={{
                  animation: `grid-pulse 3s ease-in-out infinite ${(i % 12) * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes grid-pulse {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.15; }
        }
      `}</style>
    </>
  );
};

export default HolographicOTPVerification;