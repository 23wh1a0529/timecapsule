import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const InspirationModal = ({ isOpen, onClose, className = '' }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const inspirationalMessages = [
    `Time is the most valuable currency in the universe. Every moment you capture today becomes a treasure for tomorrow's you to discover.`,
    `In the vast cosmos of existence, your memories are the stars that light up the darkness of forgotten moments. Preserve them like precious cosmic dust.`,
    `The future self you're creating memories for is already grateful. Each capsule you forge is a gift across the dimensions of time.`,
    `Like ancient civilizations leaving messages in stone, you're etching your story into the digital cosmos for future generations to marvel at.`,
    `Time travel may be impossible, but time capsules make you a messenger to your future self. What wisdom will you send forward?`,
    `In the quantum realm of memories, every captured moment exists simultaneously in past, present, and future. You are the architect of temporal bridges.`,
    `Your memories are not just data—they're fragments of your soul scattered across time, waiting to be reunited with who you'll become.`,
    `The cosmic dance of time never stops, but through memory capsules, you can freeze the most beautiful moments and replay them in any era.`
  ];

  const generateMessage = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const randomMessage = inspirationalMessages?.[Math.floor(Math.random() * inspirationalMessages?.length)];
    setCurrentMessage(randomMessage);
    setIsGenerating(false);
  };

  useEffect(() => {
    if (isOpen && !currentMessage) {
      generateMessage();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${className}`}>
      <div className="glassmorphic p-8 rounded-3xl glow-accent max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 glassmorphic rounded-full flex items-center justify-center glow-accent">
              <Icon name="Sparkles" size={24} className="text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-heading text-primary">Cosmic Inspiration</h2>
              <p className="text-sm text-text-secondary font-caption">
                Wisdom from the temporal dimensions
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover-glow-primary"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Message Content */}
        <div className="mb-8">
          {isGenerating ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <div className="relative">
                  <Icon name="Sparkles" size={48} className="text-accent animate-pulse" />
                  <div className="absolute inset-0 animate-ping">
                    <Icon name="Sparkles" size={48} className="text-accent opacity-30" />
                  </div>
                </div>
                <p className="text-text-secondary font-caption">
                  Channeling cosmic wisdom...
                </p>
              </div>
            </div>
          ) : (
            <div className="glassmorphic p-6 rounded-2xl glow-subtle">
              <div className="flex items-start space-x-4">
                <Icon name="Quote" size={24} className="text-accent glow-accent mt-1 flex-shrink-0" />
                <p className="text-text-primary font-body leading-relaxed text-lg">
                  {currentMessage}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={generateMessage}
            disabled={isGenerating}
            className="flex-1 hover-glow-accent cosmic-transition"
          >
            <Icon name="RefreshCw" size={20} className="mr-2" />
            Generate New Wisdom
          </Button>
          <Button
            variant="default"
            onClick={onClose}
            className="flex-1 glow-primary hover-glow-primary cosmic-transition"
          >
            <Icon name="Heart" size={20} className="mr-2" />
            Embrace the Inspiration
          </Button>
        </div>

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(6)]?.map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full opacity-30 animate-pulse"
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
    </div>
  );
};

export default InspirationModal;