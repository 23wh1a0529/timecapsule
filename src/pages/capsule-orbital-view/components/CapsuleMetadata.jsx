import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CapsuleMetadata = ({ capsule, onEdit, onDownload, onShare, className = '' }) => {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    if (capsule?.status === 'locked' || capsule?.status === 'unlocking') {
      const updateCountdown = () => {
        const now = new Date();
        const unlockDate = new Date(capsule.unlockDate);
        const diff = unlockDate - now;

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          if (days > 0) {
            setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
          } else if (hours > 0) {
            setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
          } else {
            setTimeRemaining(`${minutes}m ${seconds}s`);
          }
        } else {
          setTimeRemaining('Ready to unlock');
        }
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    }
  }, [capsule?.unlockDate, capsule?.status]);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      className={`glassmorphic p-6 space-y-6 ${className}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-heading text-primary glow-primary">
          {capsule?.title}
        </h2>
        <p className="text-text-secondary font-caption">
          {capsule?.description}
        </p>
      </div>
      {/* Status Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-caption text-text-secondary">Status</span>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
            capsule?.status === 'unlocked' ? 'bg-success/20 text-success' :
            capsule?.status === 'unlocking'? 'bg-warning/20 text-warning' : 'bg-error/20 text-error'
          }`}>
            <Icon 
              name={
                capsule?.status === 'unlocked' ? 'Unlock' :
                capsule?.status === 'unlocking' ? 'Clock' : 'Lock'
              } 
              size={16} 
            />
            <span className="text-sm font-caption capitalize">
              {capsule?.status}
            </span>
          </div>
        </div>

        {/* Countdown Timer */}
        {(capsule?.status === 'locked' || capsule?.status === 'unlocking') && (
          <div className="glassmorphic p-4 rounded-lg glow-warning">
            <div className="text-center">
              <div className="text-2xl font-mono text-warning glow-warning mb-2">
                {timeRemaining}
              </div>
              <div className="text-sm text-text-secondary">
                Until unlock on {formatDate(capsule?.unlockDate)}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Metadata Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <span className="text-sm font-caption text-text-secondary">Created</span>
          <div className="text-text-primary font-mono">
            {formatDate(capsule?.createdAt)}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-caption text-text-secondary">Unlock Date</span>
          <div className="text-text-primary font-mono">
            {formatDate(capsule?.unlockDate)}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-caption text-text-secondary">Blockchain Hash</span>
          <div className="text-primary font-mono text-xs glow-primary">
            {capsule?.blockchainHash}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-caption text-text-secondary">Transaction ID</span>
          <div className="text-secondary font-mono text-xs glow-secondary">
            {capsule?.transactionId}
          </div>
        </div>
      </div>
      {/* Content Preview */}
      {capsule?.status === 'unlocked' && capsule?.contentPreviews && (
        <div className="space-y-4">
          <h3 className="text-lg font-heading text-text-primary">Content Preview</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {capsule?.contentPreviews?.map((preview, index) => (
              <div key={index} className="glassmorphic p-2 rounded-lg hover-glow-primary cosmic-transition">
                {preview?.type === 'image' ? (
                  <Image
                    src={preview?.thumbnail}
                    alt={preview?.alt}
                    className="w-full h-20 object-cover rounded"
                  />
                ) : preview?.type === 'video' ? (
                  <div className="w-full h-20 bg-surface rounded flex items-center justify-center">
                    <Icon name="Play" size={24} className="text-primary" />
                  </div>
                ) : (
                  <div className="w-full h-20 bg-surface rounded flex items-center justify-center">
                    <Icon name="FileText" size={24} className="text-text-secondary" />
                  </div>
                )}
                <div className="text-xs text-text-secondary mt-1 truncate">
                  {preview?.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Encryption Status */}
      {capsule?.status === 'locked' && (
        <div className="glassmorphic p-4 rounded-lg border border-error/30">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Icon name="Shield" size={24} className="text-error glow-error" />
            </motion.div>
            <div>
              <div className="text-sm font-caption text-error">Quantum Encrypted</div>
              <div className="text-xs text-text-secondary">
                256-bit temporal encryption active
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
        {capsule?.status === 'locked' && (
          <Button
            variant="outline"
            onClick={onEdit}
            iconName="Edit"
            iconPosition="left"
            className="hover-glow-primary"
          >
            Edit Details
          </Button>
        )}

        {capsule?.status === 'unlocked' && (
          <>
            <Button
              variant="default"
              onClick={onDownload}
              iconName="Download"
              iconPosition="left"
              className="glow-primary"
            >
              Download
            </Button>
            <Button
              variant="outline"
              onClick={onShare}
              iconName="Share"
              iconPosition="left"
              className="hover-glow-secondary"
            >
              Share
            </Button>
          </>
        )}

        {capsule?.status === 'unlocking' && (
          <Button
            variant="default"
            onClick={() => console.log('Unlock capsule')}
            iconName="Unlock"
            iconPosition="left"
            className="glow-warning temporal-pulse"
          >
            Unlock Now
          </Button>
        )}
      </div>
      {/* Reflection Notes (for unlocked capsules) */}
      {capsule?.status === 'unlocked' && (
        <div className="space-y-3 pt-4 border-t border-border">
          <h4 className="text-sm font-heading text-text-primary">Reflection Notes</h4>
          <div className="glassmorphic p-3 rounded-lg">
            <textarea
              placeholder="Add your thoughts about this memory..."
              className="w-full bg-transparent text-text-primary placeholder-text-secondary resize-none border-none outline-none"
              rows={3}
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="Save"
            iconPosition="left"
            className="hover-glow-primary"
          >
            Save Reflection
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default CapsuleMetadata;