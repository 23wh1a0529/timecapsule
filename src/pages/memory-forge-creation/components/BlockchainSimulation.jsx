import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const BlockchainSimulation = ({ 
  isActive, 
  onComplete, 
  capsuleData,
  className = '' 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const [blockchainHash, setBlockchainHash] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);

  const encryptionSteps = [
    {
      id: 'init',
      title: 'Initializing Quantum Encryption',
      description: 'Preparing temporal lock mechanisms',
      duration: 1500,
      icon: 'Zap'
    },
    {
      id: 'hash',
      title: 'Generating Blockchain Hash',
      description: 'Creating immutable memory signature',
      duration: 2000,
      icon: 'Hash'
    },
    {
      id: 'encrypt',
      title: 'Encrypting Memory Data',
      description: 'Applying AES-256 quantum encryption',
      duration: 2500,
      icon: 'Shield'
    },
    {
      id: 'validate',
      title: 'Validating Temporal Lock',
      description: 'Confirming unlock date integrity',
      duration: 1800,
      icon: 'CheckCircle'
    },
    {
      id: 'store',
      title: 'Storing in Cosmic Vault',
      description: 'Deploying to distributed time network',
      duration: 2200,
      icon: 'Database'
    }
  ];

  const generateHash = () => {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
      hash += chars?.[Math.floor(Math.random() * chars?.length)];
    }
    return hash;
  };

  const generateTransactionId = () => {
    const chars = '0123456789ABCDEF';
    let txId = 'TX';
    for (let i = 0; i < 16; i++) {
      txId += chars?.[Math.floor(Math.random() * chars?.length)];
    }
    return txId;
  };

  const addLog = (message, type = 'info') => {
    const timestamp = new Date()?.toLocaleTimeString();
    setLogs(prev => [...prev, { message, type, timestamp, id: Date.now() }]);
  };

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0);
      setLogs([]);
      setIsEncrypting(false);
      return;
    }

    setIsEncrypting(true);
    setBlockchainHash(generateHash());
    setTransactionId(generateTransactionId());
    
    addLog('🚀 Temporal encryption sequence initiated', 'success');
    addLog('📡 Connecting to KalChakra network...', 'info');
    
    const runEncryption = async () => {
      for (let i = 0; i < encryptionSteps?.length; i++) {
        const step = encryptionSteps?.[i];
        
        setCurrentStep(i);
        addLog(`⚡ ${step?.title}...`, 'info');
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, step.duration));
        
        addLog(`✅ ${step?.description} completed`, 'success');
        
        // Add some technical details
        if (step?.id === 'hash') {
          addLog(`🔗 Hash: ${generateHash()?.substring(0, 20)}...`, 'data');
        } else if (step?.id === 'encrypt') {
          addLog(`🔐 Encryption key: AES-256-GCM`, 'data');
        } else if (step?.id === 'validate') {
          addLog(`⏰ Lock expires: ${capsuleData?.unlockDate || 'N/A'}`, 'data');
        }
      }
      
      addLog('🎉 Memory capsule successfully encrypted and stored!', 'success');
      addLog(`📋 Transaction ID: ${generateTransactionId()}`, 'data');
      
      setIsEncrypting(false);
      
      // Complete after a short delay
      setTimeout(() => {
        onComplete({
          hash: blockchainHash,
          transactionId: transactionId,
          timestamp: new Date()?.toISOString()
        });
      }, 1000);
    };

    runEncryption();
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className={`glassmorphic p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading text-primary glow-primary">
          Blockchain Encryption
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Cpu" size={20} className="text-accent glow-accent animate-pulse" />
          <span className="text-sm font-caption text-text-secondary">
            Quantum Processing Active
          </span>
        </div>
      </div>
      {/* 3D Block Animation */}
      <div className="relative mb-8">
        <div className="glassmorphic p-8 rounded-2xl text-center relative overflow-hidden">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-6 gap-1 h-full">
              {Array.from({ length: 48 })?.map((_, i) => (
                <div
                  key={i}
                  className="bg-primary rounded-sm animate-pulse"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '2s'
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Central Processing Unit */}
          <div className="relative z-10">
            <div className="w-24 h-24 mx-auto mb-4 glassmorphic rounded-2xl flex items-center justify-center glow-primary">
              <div className="relative">
                <Icon name="Cpu" size={40} className="text-primary animate-pulse" />
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                  <Icon name="Loader" size={48} className="text-secondary opacity-50" />
                </div>
              </div>
            </div>
            
            <div className="text-lg font-heading text-text-primary mb-2">
              {encryptionSteps?.[currentStep]?.title || 'Initializing...'}
            </div>
            
            <div className="text-sm text-text-secondary">
              {encryptionSteps?.[currentStep]?.description || 'Preparing quantum systems...'}
            </div>
          </div>
        </div>
      </div>
      {/* Progress Steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-caption text-text-primary">Encryption Progress</span>
          <span className="text-sm font-mono text-accent">
            {currentStep + 1}/{encryptionSteps?.length}
          </span>
        </div>
        
        <div className="space-y-2">
          {encryptionSteps?.map((step, index) => (
            <div
              key={step?.id}
              className={`flex items-center space-x-3 p-3 rounded-lg cosmic-transition ${
                index <= currentStep
                  ? 'glassmorphic border border-primary/30' :'bg-surface/30'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index < currentStep
                  ? 'bg-success text-success-foreground glow-success'
                  : index === currentStep
                  ? 'bg-primary text-primary-foreground glow-primary animate-pulse'
                  : 'bg-surface text-text-secondary'
              }`}>
                <Icon 
                  name={index < currentStep ? 'Check' : step?.icon} 
                  size={16} 
                />
              </div>
              
              <div className="flex-1">
                <div className={`text-sm font-caption ${
                  index <= currentStep ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                  {step?.title}
                </div>
                <div className="text-xs text-text-secondary">
                  {step?.description}
                </div>
              </div>
              
              {index === currentStep && isEncrypting && (
                <Icon name="Loader" size={16} className="text-primary animate-spin" />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Terminal Logs */}
      <div className="glassmorphic p-4 rounded-xl">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Terminal" size={16} className="text-success glow-success" />
          <span className="text-sm font-caption text-text-primary">Encryption Logs</span>
        </div>
        
        <div className="bg-surface rounded-lg p-3 h-48 overflow-y-auto font-mono text-xs">
          {logs?.map((log) => (
            <div
              key={log?.id}
              className={`mb-1 ${
                log?.type === 'success' ? 'text-success' :
                log?.type === 'error' ? 'text-error' :
                log?.type === 'data'? 'text-accent' : 'text-text-secondary'
              }`}
            >
              <span className="text-text-secondary">[{log?.timestamp}]</span> {log?.message}
            </div>
          ))}
          
          {isEncrypting && (
            <div className="text-primary animate-pulse">
              <span className="text-text-secondary">[{new Date()?.toLocaleTimeString()}]</span> ▋
            </div>
          )}
        </div>
      </div>
      {/* Blockchain Details */}
      {blockchainHash && (
        <div className="mt-6 space-y-4">
          <div className="glassmorphic p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Hash" size={16} className="text-primary glow-primary" />
              <span className="text-sm font-caption text-text-primary">Blockchain Hash</span>
            </div>
            <div className="font-mono text-xs text-accent break-all bg-surface p-3 rounded-lg">
              {blockchainHash}
            </div>
          </div>
          
          <div className="glassmorphic p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Receipt" size={16} className="text-secondary glow-secondary" />
              <span className="text-sm font-caption text-text-primary">Transaction ID</span>
            </div>
            <div className="font-mono text-xs text-accent break-all bg-surface p-3 rounded-lg">
              {transactionId}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockchainSimulation;