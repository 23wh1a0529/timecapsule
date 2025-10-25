import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PersonalMessageComposer = ({ 
  personalMessage, 
  onMessageChange, 
  className = '' 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inspirationalPrompts = [
    "What advice would you give to your future self?",
    "What are your biggest dreams right now?",
    "What challenges are you facing that you hope to overcome?",
    "What makes you happiest in this moment?",
    "What do you want to remember about this time in your life?",
    "What goals are you working towards?",
    "What relationships are most important to you now?",
    "What have you learned recently that changed your perspective?",
    "What are you grateful for today?",
    "What do you hope your future self will be proud of?"
  ];

  const aiSuggestions = [
    `Dear Future Me,\n\nAs I write this on ${new Date()?.toLocaleDateString()}, I'm filled with hope and curiosity about who you've become. The dreams I'm chasing today feel both exciting and daunting, but I believe in our ability to grow and adapt.\n\nI hope you remember to stay curious, be kind to yourself, and never stop learning. The challenges we're facing now are shaping us into someone stronger.\n\nWith love and anticipation,\nYour Past Self`,
    
    `Hello from ${new Date()?.getFullYear()}!\n\nI'm writing this during a time of growth and change. Right now, I'm focused on becoming the person I want to be, and I hope you're proud of the journey we've taken together.\n\nRemember that every small step mattered, every failure taught us something valuable, and every moment of joy was worth celebrating.\n\nKeep dreaming big and staying true to our values.\n\nWith excitement for your present,\nMe`,
    
    `Future Self,\n\nToday feels like the beginning of something important. I'm planting seeds of intention and hope that you'll harvest the fruits of our labor.\n\nI hope you've found peace with the decisions we're making now and that you've discovered new passions and purposes along the way.\n\nNever forget where we came from, but always look forward to where we're going.\n\nWith infinite possibilities,\nYour Younger Self`
  ];

  const handleInspireMe = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const randomSuggestion = aiSuggestions?.[Math.floor(Math.random() * aiSuggestions?.length)];
    onMessageChange(randomSuggestion);
    setIsGenerating(false);
  };

  const insertPrompt = (prompt) => {
    const currentMessage = personalMessage || '';
    const newMessage = currentMessage + (currentMessage ? '\n\n' : '') + prompt + '\n\n';
    onMessageChange(newMessage);
    setShowSuggestions(false);
  };

  const wordCount = personalMessage ? personalMessage?.split(/\s+/)?.filter(word => word?.length > 0)?.length : 0;
  const charCount = personalMessage ? personalMessage?.length : 0;

  return (
    <div className={`glassmorphic p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading text-primary glow-primary">
          Personal Message
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Heart" size={20} className="text-accent glow-accent" />
          <span className="text-sm font-caption text-text-secondary">
            Message to your future self
          </span>
        </div>
      </div>
      {/* Message Composer */}
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={personalMessage || ''}
            onChange={(e) => onMessageChange(e?.target?.value)}
            placeholder="Write a heartfelt message to your future self. What do you want to remember? What hopes and dreams do you have? What advice would you give?"
            className="w-full h-64 bg-surface border border-border rounded-xl p-4 text-text-primary placeholder-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cosmic-transition"
            maxLength={10000}
          />
          
          {/* Character/Word Count */}
          <div className="absolute bottom-3 right-3 flex items-center space-x-4 text-xs text-text-secondary">
            <span>{wordCount} words</span>
            <span>{charCount}/10,000</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={handleInspireMe}
            loading={isGenerating}
            className="hover-glow-primary"
          >
            <Icon name="Sparkles" size={18} className="mr-2" />
            {isGenerating ? 'Generating...' : 'Inspire Me'}
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="hover-glow-secondary"
          >
            <Icon name="Lightbulb" size={18} className="mr-2" />
            Writing Prompts
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => onMessageChange('')}
            className="hover-glow-error text-text-secondary"
          >
            <Icon name="RotateCcw" size={18} className="mr-2" />
            Clear
          </Button>
        </div>

        {/* Writing Prompts */}
        {showSuggestions && (
          <div className="glassmorphic p-4 rounded-xl space-y-3">
            <h4 className="text-sm font-heading text-text-primary mb-3">
              Writing Prompts to Get You Started
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {inspirationalPrompts?.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => insertPrompt(prompt)}
                  className="text-left p-3 rounded-lg bg-surface hover:bg-primary/10 text-text-secondary hover:text-primary cosmic-transition text-sm"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glassmorphic p-3 rounded-lg text-center">
            <Icon name="Type" size={20} className="mx-auto mb-2 text-primary glow-primary" />
            <div className="text-xs text-text-secondary">Words</div>
            <div className="font-mono text-sm text-text-primary">{wordCount}</div>
          </div>
          
          <div className="glassmorphic p-3 rounded-lg text-center">
            <Icon name="FileText" size={20} className="mx-auto mb-2 text-secondary glow-secondary" />
            <div className="text-xs text-text-secondary">Characters</div>
            <div className="font-mono text-sm text-text-primary">{charCount}</div>
          </div>
          
          <div className="glassmorphic p-3 rounded-lg text-center">
            <Icon name="Clock" size={20} className="mx-auto mb-2 text-accent glow-accent" />
            <div className="text-xs text-text-secondary">Read Time</div>
            <div className="font-mono text-sm text-text-primary">
              {Math.max(1, Math.ceil(wordCount / 200))}m
            </div>
          </div>
        </div>

        {/* Emotional Tone Indicator */}
        {personalMessage && personalMessage?.length > 100 && (
          <div className="glassmorphic p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Heart" size={16} className="text-accent glow-accent" />
              <span className="text-sm font-caption text-text-primary">
                Message Tone Analysis
              </span>
            </div>
            
            <div className="flex space-x-2">
              <div className="flex-1 bg-surface rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent w-3/4 glow-primary" />
              </div>
              <span className="text-xs text-text-secondary">Optimistic</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalMessageComposer;
