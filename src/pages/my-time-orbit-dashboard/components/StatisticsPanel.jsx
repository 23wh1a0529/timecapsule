import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StatisticsPanel = ({ 
  capsules = [], 
  className = '' 
}) => {
  const [nextUnlock, setNextUnlock] = useState(null);
  const [timeUntilNext, setTimeUntilNext] = useState('');

  // Calculate statistics
  const stats = {
    total: capsules?.length,
    unlocked: capsules?.filter(c => c?.status === 'unlocked')?.length,
    locked: capsules?.filter(c => c?.status === 'locked')?.length,
    unlocking: capsules?.filter(c => c?.status === 'unlocking')?.length
  };

  // Find next unlock
  useEffect(() => {
    const lockedCapsules = capsules?.filter(c => c?.status === 'locked' || c?.status === 'unlocking');
    if (lockedCapsules?.length > 0) {
      const sortedByDate = lockedCapsules?.sort((a, b) => 
        new Date(a.unlockDate) - new Date(b.unlockDate)
      );
      setNextUnlock(sortedByDate?.[0]);
    }
  }, [capsules]);

  // Update countdown timer
  useEffect(() => {
    if (!nextUnlock) return;

    const updateCountdown = () => {
      const now = new Date();
      const unlockDate = new Date(nextUnlock.unlockDate);
      const diff = unlockDate - now;

      if (diff <= 0) {
        setTimeUntilNext('Unlocking now!');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeUntilNext(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeUntilNext(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeUntilNext(`${minutes}m ${seconds}s`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextUnlock]);

  const statCards = [
    {
      label: 'Total Capsules',
      value: stats?.total,
      icon: 'Package',
      color: 'primary',
      glow: 'glow-primary'
    },
    {
      label: 'Unlocked',
      value: stats?.unlocked,
      icon: 'Unlock',
      color: 'success',
      glow: 'glow-success'
    },
    {
      label: 'Time Locked',
      value: stats?.locked,
      icon: 'Lock',
      color: 'error',
      glow: 'glow-error'
    },
    {
      label: 'Unlocking Soon',
      value: stats?.unlocking,
      icon: 'Timer',
      color: 'warning',
      glow: 'glow-warning'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Statistics Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-heading text-primary glow-primary">
          Cosmic Statistics
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          {statCards?.map((stat, index) => (
            <motion.div
              key={stat?.label}
              className={`glassmorphic p-4 rounded-xl border border-${stat?.color}/30 ${stat?.glow} hover-glow-${stat?.color} cosmic-transition cursor-pointer`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-2xl font-mono font-bold text-${stat?.color} ${stat?.glow}`}>
                    {stat?.value}
                  </div>
                  <div className="text-sm text-text-secondary font-caption">
                    {stat?.label}
                  </div>
                </div>
                <div className={`p-2 rounded-lg bg-${stat?.color}/20`}>
                  <Icon 
                    name={stat?.icon} 
                    size={24} 
                    className={`text-${stat?.color}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Next Unlock Countdown */}
      {nextUnlock && (
        <motion.div
          className="glassmorphic p-6 rounded-xl border border-warning/30 glow-warning"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={20} className="text-warning glow-warning" />
              <h3 className="text-lg font-heading text-warning glow-warning">
                Next Unlock
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="text-text-primary font-medium">
                {nextUnlock?.title}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Unlock Date:</span>
                  <span className="text-text-primary font-mono">
                    {new Date(nextUnlock.unlockDate)?.toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Time Remaining:</span>
                  <span className="text-warning font-mono glow-warning">
                    {timeUntilNext}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-warning to-primary glow-warning"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-primary glow-primary">
          Recent Activity
        </h3>
        
        <div className="space-y-3">
          {capsules?.filter(c => c?.status === 'unlocked')?.slice(0, 3)?.map((capsule, index) => (
              <motion.div
                key={capsule?.id}
                className="glassmorphic p-3 rounded-lg border border-success/30 hover-glow-success cosmic-transition cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-success/20">
                    <Icon name="Unlock" size={16} className="text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text-primary truncate">
                      {capsule?.title}
                    </div>
                    <div className="text-xs text-text-secondary">
                      Unlocked • {new Date(capsule.unlockedAt || capsule.createdAt)?.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          
          {stats?.unlocked === 0 && (
            <div className="text-center py-6 text-text-secondary">
              <Icon name="Package" size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm font-caption">
                No unlocked capsules yet
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Achievement Badges */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-primary glow-primary">
          Cosmic Achievements
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              name: 'Time Keeper',
              description: 'Created first capsule',
              earned: stats?.total > 0,
              icon: 'Award'
            },
            {
              name: 'Memory Collector',
              description: '5+ capsules created',
              earned: stats?.total >= 5,
              icon: 'Star'
            },
            {
              name: 'Patience Master',
              description: 'Unlocked first capsule',
              earned: stats?.unlocked > 0,
              icon: 'Trophy'
            },
            {
              name: 'Cosmic Explorer',
              description: '10+ capsules unlocked',
              earned: stats?.unlocked >= 10,
              icon: 'Sparkles'
            }
          ]?.map((achievement, index) => (
            <motion.div
              key={achievement?.name}
              className={`glassmorphic p-3 rounded-lg border ${
                achievement?.earned 
                  ? 'border-success/30 glow-success' :'border-border opacity-50'
              } cosmic-transition`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="text-center space-y-2">
                <div className={`p-2 rounded-full mx-auto w-fit ${
                  achievement?.earned ? 'bg-success/20' : 'bg-surface'
                }`}>
                  <Icon 
                    name={achievement?.icon} 
                    size={16} 
                    className={achievement?.earned ? 'text-success' : 'text-text-secondary'}
                  />
                </div>
                <div>
                  <div className={`text-xs font-medium ${
                    achievement?.earned ? 'text-success' : 'text-text-secondary'
                  }`}>
                    {achievement?.name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {achievement?.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;