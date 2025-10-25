import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ 
  onCreateCapsule = () => {},
  onViewRecent = () => {},
  recentCapsules = [],
  className = '' 
}) => {
  const navigate = useNavigate();

  const handleCreateCapsule = () => {
    navigate('/memory-forge-creation');
  };

  const handleViewCapsule = (capsuleId) => {
    navigate(`/capsule-orbital-view?id=${capsuleId}`);
  };

  const quickActionButtons = [
    {
      label: 'Create New Capsule',
      description: 'Forge a new memory in time',
      icon: 'Plus',
      action: handleCreateCapsule,
      variant: 'default',
      glow: 'glow-primary',
      primary: true
    },
    {
      label: 'View All Capsules',
      description: 'Browse your cosmic collection',
      icon: 'Package',
      action: () => console.log('View all capsules'),
      variant: 'outline',
      glow: 'glow-secondary'
    },
    {
      label: 'Import Memories',
      description: 'Add external memories',
      icon: 'Upload',
      action: () => console.log('Import memories'),
      variant: 'outline',
      glow: 'glow-accent'
    },
    {
      label: 'Export Data',
      description: 'Download your cosmic vault',
      icon: 'Download',
      action: () => console.log('Export data'),
      variant: 'outline',
      glow: 'glow-warning'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Primary Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          variant="default"
          size="lg"
          onClick={handleCreateCapsule}
          className="w-full glassmorphic glow-primary hover-glow-primary cosmic-transition h-16"
          iconName="Plus"
          iconPosition="left"
          iconSize={24}
        >
          <div className="text-left">
            <div className="text-lg font-heading">Create New Capsule</div>
            <div className="text-sm opacity-80 font-caption">Begin your temporal journey</div>
          </div>
        </Button>
      </motion.div>
      {/* Quick Action Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-primary glow-primary">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {quickActionButtons?.slice(1)?.map((action, index) => (
            <motion.div
              key={action?.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Button
                variant={action?.variant}
                onClick={action?.action}
                className={`w-full glassmorphic ${action?.glow} hover-glow-primary cosmic-transition justify-start h-14`}
                iconName={action?.icon}
                iconPosition="left"
                iconSize={20}
              >
                <div className="text-left flex-1">
                  <div className="font-medium">{action?.label}</div>
                  <div className="text-xs opacity-70 font-caption">{action?.description}</div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Recent Unlocked Capsules */}
      {recentCapsules?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-heading text-primary glow-primary">
            Recently Unlocked
          </h3>
          
          <div className="space-y-3">
            {recentCapsules?.slice(0, 3)?.map((capsule, index) => (
              <motion.div
                key={capsule?.id}
                className="glassmorphic p-4 rounded-xl border border-success/30 glow-success hover-glow-success cosmic-transition cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => handleViewCapsule(capsule?.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-success/20 glow-success">
                    <Icon name="Unlock" size={20} className="text-success" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-text-primary truncate">
                      {capsule?.title}
                    </h4>
                    <p className="text-sm text-text-secondary font-caption truncate">
                      {capsule?.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
                      <span>Unlocked: {new Date(capsule.unlockedAt || capsule.createdAt)?.toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="text-success">Ready to view</span>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Icon name="ChevronRight" size={20} className="text-text-secondary" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {recentCapsules?.length > 3 && (
            <Button
              variant="ghost"
              onClick={() => console.log('View all unlocked')}
              className="w-full hover-glow-primary cosmic-transition"
              iconName="MoreHorizontal"
              iconPosition="right"
            >
              View All Unlocked Capsules ({recentCapsules?.length})
            </Button>
          )}
        </div>
      )}
      {/* Cosmic Tips */}
      <motion.div
        className="glassmorphic p-4 rounded-xl border border-accent/30 glow-accent"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-full bg-accent/20 flex-shrink-0">
            <Icon name="Lightbulb" size={16} className="text-accent" />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-heading text-accent glow-accent">
              Cosmic Tip
            </h4>
            <p className="text-xs text-text-secondary font-caption leading-relaxed">
              Set meaningful unlock dates for your capsules. Consider future birthdays, anniversaries, or personal milestones to create truly special moments of rediscovery.
            </p>
          </div>
        </div>
      </motion.div>
      {/* Emergency Actions */}
      <div className="space-y-3">
        <h4 className="text-sm font-heading text-text-secondary">
          Emergency Actions
        </h4>
        
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log('Backup data')}
            className="hover-glow-warning cosmic-transition"
            iconName="Shield"
            iconPosition="left"
            iconSize={16}
          >
            Backup
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log('Reset view')}
            className="hover-glow-error cosmic-transition"
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;