import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CosmicBreadcrumb from '../../components/ui/CosmicBreadcrumb';
import FloatingActionHub from '../../components/ui/FloatingActionHub';

// Import components
import MemoryContentUpload from './components/MemoryContentUpload';
import UnlockDateSelector from './components/UnlockDateSelector';
import PersonalMessageComposer from './components/PersonalMessageComposer';
import CapsulePreview from './components/CapsulePreview';
import BlockchainSimulation from './components/BlockchainSimulation';
import CreationProgress from './components/CreationProgress';

const MemoryForgeCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [showEncryption, setShowEncryption] = useState(false);
  
  // Form data state
  const [memoryContent, setMemoryContent] = useState({
    type: 'text',
    textContent: '',
    imageFile: null,
    imageUrl: null,
    imageSize: null,
    imageName: null,
    videoFile: null,
    videoUrl: null,
    videoSize: null,
    videoName: null
  });
  
  const [unlockDate, setUnlockDate] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');

  const steps = [
    { id: 'content', title: 'Memory Content', component: 'MemoryContentUpload' },
    { id: 'date', title: 'Unlock Date', component: 'UnlockDateSelector' },
    { id: 'message', title: 'Personal Message', component: 'PersonalMessageComposer' },
    { id: 'review', title: 'Review & Create', component: 'CapsulePreview' }
  ];

  // Auto-save functionality
  useEffect(() => {
    const saveData = {
      memoryContent,
      unlockDate,
      personalMessage,
      timestamp: new Date()?.toISOString()
    };
    localStorage.setItem('capsule-draft', JSON.stringify(saveData));
  }, [memoryContent, unlockDate, personalMessage]);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('capsule-draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setMemoryContent(draft?.memoryContent || memoryContent);
        setUnlockDate(draft?.unlockDate || '');
        setPersonalMessage(draft?.personalMessage || '');
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Memory Content
        return memoryContent?.textContent || memoryContent?.imageUrl || memoryContent?.videoUrl;
      case 1: // Unlock Date
        return unlockDate && new Date(unlockDate) > new Date();
      case 2: // Personal Message
        return personalMessage && personalMessage?.trim()?.length > 0;
      case 3: // Review
        return true;
      default:
        return false;
    }
  };

  const getStepData = () => {
    return {
      hasContent: memoryContent?.textContent || memoryContent?.imageUrl || memoryContent?.videoUrl,
      hasDate: unlockDate && new Date(unlockDate) > new Date(),
      hasMessage: personalMessage && personalMessage?.trim()?.length > 0
    };
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps?.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleCreateCapsule();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateCapsule = () => {
    setIsCreating(true);
    setShowEncryption(true);
  };

  const handleEncryptionComplete = (encryptionData) => {
    // Simulate capsule creation
    const newCapsule = {
      id: Date.now(),
      title: `Memory Capsule #${Math.floor(Math.random() * 10000)?.toString()?.padStart(4, '0')}`,
      content: memoryContent,
      unlockDate: unlockDate,
      personalMessage: personalMessage,
      createdAt: new Date()?.toISOString(),
      status: 'locked',
      blockchain: encryptionData
    };

    // Save to localStorage (simulating database)
    const existingCapsules = JSON.parse(localStorage.getItem('user-capsules') || '[]');
    existingCapsules?.push(newCapsule);
    localStorage.setItem('user-capsules', JSON.stringify(existingCapsules));

    // Clear draft
    localStorage.removeItem('capsule-draft');

    // Navigate to dashboard after delay
    setTimeout(() => {
      navigate('/my-time-orbit-dashboard');
    }, 2000);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <MemoryContentUpload
            memoryContent={memoryContent}
            onContentChange={setMemoryContent}
            className="lg:col-span-2"
          />
        );
      case 1:
        return (
          <UnlockDateSelector
            unlockDate={unlockDate}
            onDateChange={setUnlockDate}
            className="lg:col-span-2"
          />
        );
      case 2:
        return (
          <PersonalMessageComposer
            personalMessage={personalMessage}
            onMessageChange={setPersonalMessage}
            className="lg:col-span-2"
          />
        );
      case 3:
        return (
          <CapsulePreview
            memoryContent={memoryContent}
            unlockDate={unlockDate}
            personalMessage={personalMessage}
            className="lg:col-span-2"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen cosmic-bg text-foreground">
      <CosmicBreadcrumb />
      <FloatingActionHub />
      {/* Header */}
      <div className="container mx-auto px-6 pt-24 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-heading text-primary glow-primary mb-4">
            Memory Forge
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Craft your digital time capsule with memories, dreams, and messages to your future self. 
            Each capsule is encrypted and locked until your chosen moment in time.
          </p>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-8">
          <div className="glassmorphic p-2 rounded-2xl">
            <div className="flex space-x-1">
              {steps?.map((step, index) => (
                <button
                  key={step?.id}
                  onClick={() => setCurrentStep(index)}
                  disabled={index > currentStep && !validateCurrentStep()}
                  className={`px-4 py-2 rounded-xl text-sm font-caption cosmic-transition ${
                    index === currentStep
                      ? 'bg-primary text-primary-foreground glow-primary'
                      : index < currentStep
                      ? 'text-success hover:text-success hover-glow-success' :'text-text-secondary hover:text-primary hover-glow-primary'
                  } ${index > currentStep && !validateCurrentStep() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center space-x-2">
                    {index < currentStep && <Icon name="Check" size={16} />}
                    <span>{step?.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:order-2">
            <CreationProgress
              currentStep={currentStep}
              totalSteps={steps?.length}
              stepData={getStepData()}
              className="sticky top-24"
            />
          </div>

          {/* Main Form Area */}
          <div className="lg:order-1 lg:col-span-2 space-y-8">
            {!showEncryption ? (
              <>
                {renderCurrentStep()}

                {/* Navigation Controls */}
                <div className="glassmorphic p-6 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      className="hover-glow-secondary"
                    >
                      <Icon name="ChevronLeft" size={18} className="mr-2" />
                      Previous
                    </Button>

                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        onClick={() => navigate('/my-time-orbit-dashboard')}
                        className="text-text-secondary hover:text-primary hover-glow-primary"
                      >
                        <Icon name="X" size={18} className="mr-2" />
                        Cancel
                      </Button>

                      <Button
                        variant="default"
                        onClick={handleNext}
                        disabled={!validateCurrentStep()}
                        loading={isCreating}
                        className="hover-glow-primary"
                      >
                        {currentStep === steps?.length - 1 ? (
                          <>
                            <Icon name="Sparkles" size={18} className="mr-2" />
                            Create Capsule
                          </>
                        ) : (
                          <>
                            Next
                            <Icon name="ChevronRight" size={18} className="ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Step Validation Messages */}
                  {!validateCurrentStep() && (
                    <div className="mt-4 p-3 glassmorphic rounded-lg border border-warning/30">
                      <div className="flex items-center space-x-2">
                        <Icon name="AlertCircle" size={16} className="text-warning" />
                        <span className="text-sm text-warning">
                          {currentStep === 0 && 'Please add memory content to continue'}
                          {currentStep === 1 && 'Please select a valid future unlock date'}
                          {currentStep === 2 && 'Please write a personal message'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <BlockchainSimulation
                isActive={showEncryption}
                onComplete={handleEncryptionComplete}
                capsuleData={{ memoryContent, unlockDate, personalMessage }}
              />
            )}
          </div>
        </div>
      </div>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default MemoryForgeCreation;