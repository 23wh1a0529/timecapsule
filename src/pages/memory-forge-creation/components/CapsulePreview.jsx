import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CapsulePreview = ({ 
  memoryContent, 
  unlockDate, 
  personalMessage, 
  className = '' 
}) => {
  const getContentPreview = () => {
    if (memoryContent?.type === 'text' && memoryContent?.textContent) {
      return {
        type: 'text',
        preview: memoryContent?.textContent?.substring(0, 150) + (memoryContent?.textContent?.length > 150 ? '...' : ''),
        icon: 'FileText',
        color: 'text-primary'
      };
    } else if (memoryContent?.type === 'image' && memoryContent?.imageUrl) {
      return {
        type: 'image',
        preview: memoryContent?.imageUrl,
        name: memoryContent?.imageName,
        size: memoryContent?.imageSize,
        icon: 'Image',
        color: 'text-secondary'
      };
    } else if (memoryContent?.type === 'video' && memoryContent?.videoUrl) {
      return {
        type: 'video',
        preview: memoryContent?.videoUrl,
        name: memoryContent?.videoName,
        size: memoryContent?.videoSize,
        icon: 'Video',
        color: 'text-accent'
      };
    }
    return null;
  };

  const calculateTimeUntilUnlock = () => {
    if (!unlockDate) return null;
    
    const now = new Date();
    const unlock = new Date(unlockDate);
    const diffTime = unlock?.getTime() - now?.getTime();
    
    if (diffTime <= 0) return 'Past date';
    
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;
    
    if (years > 0) {
      return `${years}y ${months}m ${days}d`;
    } else if (months > 0) {
      return `${months}m ${days}d`;
    } else {
      return `${days}d`;
    }
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 3;
    
    if (memoryContent?.textContent || memoryContent?.imageUrl || memoryContent?.videoUrl) completed++;
    if (unlockDate) completed++;
    if (personalMessage && personalMessage?.trim()) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const contentPreview = getContentPreview();
  const timeUntilUnlock = calculateTimeUntilUnlock();
  const completionPercentage = getCompletionPercentage();

  return (
    <div className={`glassmorphic p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading text-primary glow-primary">
          Capsule Preview
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={20} className="text-accent glow-accent" />
          <span className="text-sm font-caption text-text-secondary">
            Live preview
          </span>
        </div>
      </div>
      {/* 3D Capsule Visualization */}
      <div className="relative mb-6">
        <div className="glassmorphic p-8 rounded-2xl text-center relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-primary rounded-full animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-secondary rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
          </div>
          
          {/* Capsule Core */}
          <div className="relative z-10">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl glassmorphic flex items-center justify-center ${
              completionPercentage === 100 ? 'glow-primary' : 'glow-subtle'
            } cosmic-transition`}>
              <Icon 
                name="Package" 
                size={32} 
                className={`${completionPercentage === 100 ? 'text-primary' : 'text-text-secondary'} cosmic-transition`} 
              />
            </div>
            
            <div className="text-lg font-heading text-text-primary mb-2">
              Memory Capsule #{Math.floor(Math.random() * 10000)?.toString()?.padStart(4, '0')}
            </div>
            
            <div className="text-sm text-text-secondary mb-4">
              Created on {new Date()?.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>

            {/* Completion Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-text-secondary mb-2">
                <span>Completion</span>
                <span>{completionPercentage}%</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary glow-primary cosmic-transition"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Content Summary */}
      <div className="space-y-4">
        {/* Memory Content */}
        <div className="glassmorphic p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Database" size={16} className="text-primary glow-primary" />
            <span className="text-sm font-caption text-text-primary">Memory Content</span>
          </div>
          
          {contentPreview ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name={contentPreview?.icon} size={16} className={contentPreview?.color} />
                <span className="text-sm font-caption text-text-primary capitalize">
                  {contentPreview?.type} Memory
                </span>
              </div>
              
              {contentPreview?.type === 'text' && (
                <div className="text-sm text-text-secondary bg-surface p-3 rounded-lg">
                  "{contentPreview?.preview}"
                </div>
              )}
              
              {(contentPreview?.type === 'image' || contentPreview?.type === 'video') && (
                <div className="flex items-center justify-between bg-surface p-3 rounded-lg">
                  <div>
                    <div className="text-sm font-caption text-text-primary">{contentPreview?.name}</div>
                    <div className="text-xs text-text-secondary">{contentPreview?.size} MB</div>
                  </div>
                  {contentPreview?.type === 'image' && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={contentPreview?.preview}
                        alt="Preview of uploaded memory image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-text-secondary italic">
              No memory content added yet
            </div>
          )}
        </div>

        {/* Unlock Date */}
        <div className="glassmorphic p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Clock" size={16} className="text-secondary glow-secondary" />
            <span className="text-sm font-caption text-text-primary">Unlock Schedule</span>
          </div>
          
          {unlockDate ? (
            <div className="space-y-2">
              <div className="text-sm font-mono text-text-primary">
                {new Date(unlockDate)?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              {timeUntilUnlock && (
                <div className="text-xs text-accent glow-accent">
                  Unlocks in {timeUntilUnlock}
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-text-secondary italic">
              No unlock date selected
            </div>
          )}
        </div>

        {/* Personal Message */}
        <div className="glassmorphic p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Heart" size={16} className="text-accent glow-accent" />
            <span className="text-sm font-caption text-text-primary">Personal Message</span>
          </div>
          
          {personalMessage && personalMessage?.trim() ? (
            <div className="space-y-2">
              <div className="text-sm text-text-secondary bg-surface p-3 rounded-lg">
                "{personalMessage?.substring(0, 100)}{personalMessage?.length > 100 ? '...' : ''}"
              </div>
              <div className="text-xs text-text-secondary">
                {personalMessage?.split(/\s+/)?.filter(word => word?.length > 0)?.length} words
              </div>
            </div>
          ) : (
            <div className="text-sm text-text-secondary italic">
              No personal message added yet
            </div>
          )}
        </div>
      </div>
      {/* Capsule Status */}
      <div className="mt-6 glassmorphic p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon 
              name={completionPercentage === 100 ? 'CheckCircle' : 'Clock'} 
              size={16} 
              className={completionPercentage === 100 ? 'text-success glow-success' : 'text-warning glow-warning'} 
            />
            <span className="text-sm font-caption text-text-primary">
              {completionPercentage === 100 ? 'Ready to Create' : 'In Progress'}
            </span>
          </div>
          <div className="text-xs text-text-secondary">
            {completionPercentage === 100 ? 'All fields completed' : 'Complete all sections to proceed'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapsulePreview;