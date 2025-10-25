import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const BlockchainEncryption = ({ isActive, onComplete, className = '' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const [blockRotation, setBlockRotation] = useState(0);

  const encryptionSteps = [
    { text: "Initializing quantum encryption matrix...", delay: 500 },
    { text: "Generating temporal signature hash...", delay: 800 },
    { text: "Creating blockchain verification nodes...", delay: 600 },
    { text: "Establishing cosmic security protocols...", delay: 700 },
    { text: "Finalizing identity encryption...", delay: 400 },
    { text: "Identity successfully forged in the temporal blockchain!", delay: 300 }
  ];

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0);
      setLogs([]);
      return;
    }

    const processSteps = async () => {
      for (let i = 0; i < encryptionSteps?.length; i++) {
        await new Promise(resolve => setTimeout(resolve, encryptionSteps[i].delay));
        
        setCurrentStep(i + 1);
        setLogs(prev => [...prev, {
          id: Date.now() + i,
          text: encryptionSteps?.[i]?.text,
          timestamp: new Date()?.toLocaleTimeString(),
          type: i === encryptionSteps?.length - 1 ? 'success' : 'info'
        }]);
      }
      
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000);
    };

    processSteps();
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setBlockRotation(prev => prev + 2);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className={`fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center ${className}`}>
      <div className="glassmorphic p-8 rounded-3xl glow-primary max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-heading text-primary glow-primary mb-2">
            Blockchain Encryption Active
          </h2>
          <p className="text-text-secondary font-caption">
            Securing your temporal identity in the cosmic blockchain
          </p>
        </div>

        {/* 3D Rotating Blocks Visualization */}
        <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32">
            {[...Array(3)]?.map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border-2 border-primary rounded-lg glow-primary"
                style={{
                  transform: `rotateX(${blockRotation + i * 30}deg) rotateY(${blockRotation + i * 45}deg)`,
                  transformStyle: 'preserve-3d',
                  opacity: 0.7 - i * 0.2
                }}
              >
                <div className="w-full h-full bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Lock" size={24} className="text-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-text-secondary font-caption">Encryption Progress</span>
            <span className="text-primary font-mono">
              {Math.round((currentStep / encryptionSteps?.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-surface rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary glow-primary cosmic-transition"
              style={{ width: `${(currentStep / encryptionSteps?.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Terminal Logs */}
        <div className="glassmorphic p-4 rounded-xl bg-surface/50 max-h-48 overflow-y-auto">
          <div className="flex items-center mb-3">
            <Icon name="Terminal" size={16} className="text-primary mr-2" />
            <span className="text-sm font-mono text-primary">Encryption Terminal</span>
          </div>
          
          <div className="space-y-2 font-mono text-sm">
            {logs?.map((log) => (
              <div key={log?.id} className="flex items-start space-x-2">
                <span className="text-text-secondary text-xs">[{log?.timestamp}]</span>
                <Icon 
                  name={log?.type === 'success' ? 'CheckCircle' : 'Loader2'} 
                  size={14} 
                  className={`mt-0.5 ${
                    log?.type === 'success' ?'text-success' :'text-primary animate-spin'
                  }`} 
                />
                <span className={`${
                  log?.type === 'success' ? 'text-success' : 'text-text-primary'
                }`}>
                  {log?.text}
                </span>
              </div>
            ))}
            
            {currentStep < encryptionSteps?.length && (
              <div className="flex items-center space-x-2">
                <span className="text-text-secondary text-xs">[{new Date()?.toLocaleTimeString()}]</span>
                <div className="w-2 h-4 bg-primary animate-pulse" />
                <span className="text-primary animate-pulse">Processing...</span>
              </div>
            )}
          </div>
        </div>

        {/* Hash Generation Display */}
        <div className="mt-6 glassmorphic p-4 rounded-xl">
          <div className="flex items-center mb-2">
            <Icon name="Hash" size={16} className="text-secondary mr-2" />
            <span className="text-sm font-caption text-text-secondary">Generated Hash:</span>
          </div>
          <div className="font-mono text-xs text-primary break-all glow-primary">
            0x{Math.random()?.toString(16)?.substr(2, 64)?.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainEncryption;