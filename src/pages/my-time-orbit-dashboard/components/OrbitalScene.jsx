import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const OrbitalScene = ({ 
  capsules = [], 
  onCapsuleClick = () => {},
  onCapsuleHover = () => {},
  zoomLevel = 50,
  filters = {},
  className = '' 
}) => {
  const sceneRef = useRef(null);
  const [hoveredCapsule, setHoveredCapsule] = useState(null);
  const [isRotating, setIsRotating] = useState(true);

  // Mock 3D orbital positions calculation
  const calculateOrbitalPosition = (index, total, radius = 200) => {
    const angle = (index / total) * 2 * Math.PI;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, angle };
  };

  const filteredCapsules = capsules?.filter(capsule => {
    if (filters?.status && filters?.status !== 'all' && capsule?.status !== filters?.status) return false;
    if (filters?.timeRange && filters?.timeRange !== 'all') {
      const now = new Date();
      const unlockDate = new Date(capsule.unlockDate);
      
      switch (filters?.timeRange) {
        case 'week':
          return unlockDate <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        case 'month':
          return unlockDate <= new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        case 'year':
          return unlockDate <= new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
        case 'future':
          return unlockDate > now;
        default:
          return true;
      }
    }
    return true;
  });

  const handleCapsuleInteraction = (capsule, event) => {
    event?.stopPropagation();
    setHoveredCapsule(capsule);
    onCapsuleHover(capsule);
  };

  const handleCapsuleClick = (capsule, event) => {
    event?.stopPropagation();
    onCapsuleClick(capsule);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRotating && sceneRef?.current) {
        const currentRotation = sceneRef?.current?.style?.transform || 'rotate(0deg)';
        const currentAngle = parseInt(currentRotation?.match(/rotate\((-?\d+)deg\)/)?.[1] || '0');
        sceneRef.current.style.transform = `rotate(${currentAngle + 1}deg)`;
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isRotating]);

  return (
    <div className={`relative w-full h-full overflow-hidden cosmic-bg ${className}`}>
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0">
        {/* Stars */}
        {Array.from({ length: 100 })?.map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}

        {/* Nebula Effect */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-radial from-cyan-900/10 via-transparent to-transparent" />
      </div>
      {/* Central Time Core */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          className="relative w-24 h-24 md:w-32 md:h-32"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary glow-primary">
            <div className="absolute inset-2 rounded-full bg-background/80 flex items-center justify-center">
              <Icon name="Clock" size={32} className="text-primary glow-primary" />
            </div>
          </div>
          
          {/* Core Rings */}
          {[1, 2, 3]?.map((ring) => (
            <motion.div
              key={ring}
              className="absolute inset-0 rounded-full border border-primary/30"
              style={{
                width: `${100 + ring * 20}%`,
                height: `${100 + ring * 20}%`,
                left: `${-ring * 10}%`,
                top: `${-ring * 10}%`
              }}
              animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
              transition={{ 
                duration: 30 + ring * 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          ))}
        </motion.div>
      </div>
      {/* Orbital System */}
      <div 
        ref={sceneRef}
        className="absolute inset-0 transition-transform duration-1000"
        style={{ 
          transform: `scale(${zoomLevel / 50})`,
          transformOrigin: 'center center'
        }}
      >
        {/* Orbital Paths */}
        {[150, 250, 350, 450]?.map((radius, index) => (
          <div
            key={`orbit-${radius}`}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`
            }}
          />
        ))}

        {/* Capsules */}
        {filteredCapsules?.map((capsule, index) => {
          const orbitRadius = 150 + (index % 4) * 100;
          const position = calculateOrbitalPosition(index, filteredCapsules?.length, orbitRadius);
          
          return (
            <motion.div
              key={capsule?.id}
              className="absolute top-1/2 left-1/2 cursor-pointer z-10"
              style={{
                transform: `translate(-50%, -50%) translate(${position?.x}px, ${position?.y}px)`
              }}
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 30 + (index % 3) * 10,
                repeat: Infinity,
                ease: "linear"
              }}
              onMouseEnter={(e) => handleCapsuleInteraction(capsule, e)}
              onMouseLeave={() => setHoveredCapsule(null)}
              onClick={(e) => handleCapsuleClick(capsule, e)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Capsule Body */}
              <div className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full border-2 ${
                capsule?.status === 'unlocked' ?'bg-primary/20 border-primary glow-primary' 
                  : capsule?.status === 'unlocking' ?'bg-warning/20 border-warning glow-warning' :'bg-error/20 border-error glow-error'
              } cosmic-transition`}>
                <div className="absolute inset-2 rounded-full bg-background/60 flex items-center justify-center">
                  <Icon 
                    name={
                      capsule?.status === 'unlocked' ? 'Unlock' :
                      capsule?.status === 'unlocking' ? 'Timer' : 'Lock'
                    } 
                    size={16} 
                    className={
                      capsule?.status === 'unlocked' ? 'text-primary' :
                      capsule?.status === 'unlocking' ? 'text-warning' : 'text-error'
                    }
                  />
                </div>

                {/* Capsule Glow Effect */}
                <div className={`absolute inset-0 rounded-full ${
                  capsule?.status === 'unlocked' ? 'glow-primary' :
                  capsule?.status === 'unlocking' ? 'glow-warning' : 'glow-error'
                } opacity-50`} />

                {/* Status Indicator */}
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                  capsule?.status === 'unlocked' ? 'bg-primary glow-primary' :
                  capsule?.status === 'unlocking' ? 'bg-warning glow-warning' : 'bg-error glow-error'
                }`} />
              </div>
              {/* Capsule Label */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs font-caption text-center whitespace-nowrap">
                <div className="text-text-primary">{capsule?.title}</div>
                <div className="text-text-secondary text-xs">
                  {capsule?.status === 'unlocked' ? 'Unlocked' : 
                   capsule?.status === 'unlocking' ? 'Soon' : 
                   new Date(capsule.unlockDate)?.toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      {/* Hover Tooltip */}
      {hoveredCapsule && (
        <motion.div
          className="fixed z-50 glassmorphic p-4 rounded-xl border border-primary/30 pointer-events-none"
          style={{
            left: '50%',
            top: '20%',
            transform: 'translateX(-50%)'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="space-y-2 min-w-64">
            <h3 className="text-lg font-heading text-primary glow-primary">
              {hoveredCapsule?.title}
            </h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Status:</span>
                <span className={`font-medium ${
                  hoveredCapsule?.status === 'unlocked' ? 'text-primary' :
                  hoveredCapsule?.status === 'unlocking' ? 'text-warning' : 'text-error'
                }`}>
                  {hoveredCapsule?.status === 'unlocked' ? 'Unlocked' :
                   hoveredCapsule?.status === 'unlocking' ? 'Unlocking Soon' : 'Time Locked'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Unlock Date:</span>
                <span className="text-text-primary font-mono">
                  {new Date(hoveredCapsule.unlockDate)?.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Created:</span>
                <span className="text-text-primary font-mono">
                  {new Date(hoveredCapsule.createdAt)?.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Hash:</span>
                <span className="text-primary font-mono text-xs">
                  {hoveredCapsule?.blockchainHash?.substring(0, 12)}...
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {/* Scene Controls */}
      <div className="absolute bottom-4 right-4 flex space-x-2 z-30">
        <motion.button
          className={`glassmorphic p-3 rounded-full ${
            isRotating ? 'glow-primary' : 'glow-secondary'
          } hover-glow-primary cosmic-transition`}
          onClick={() => setIsRotating(!isRotating)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon 
            name={isRotating ? 'Pause' : 'Play'} 
            size={20} 
            className={isRotating ? 'text-primary' : 'text-secondary'}
          />
        </motion.button>
        
        <motion.button
          className="glassmorphic p-3 rounded-full glow-accent hover-glow-accent cosmic-transition"
          onClick={() => {
            if (sceneRef?.current) {
              sceneRef.current.style.transform = 'rotate(0deg) scale(1)';
            }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon name="RotateCcw" size={20} className="text-accent" />
        </motion.button>
      </div>
      {/* Loading State for Empty Capsules */}
      {filteredCapsules?.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Icon name="Sparkles" size={48} className="text-primary glow-primary mx-auto" />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-xl font-heading text-primary">Empty Cosmic Vault</h3>
              <p className="text-text-secondary font-caption max-w-md">
                Your time orbit awaits the first memory capsule. Begin your cosmic journey by creating your first temporal storage.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrbitalScene;