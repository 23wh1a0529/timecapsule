import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AudioController = ({ onAudioToggle, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const audioRef = useRef(null);

  // Simulate ambient cosmic audio
  useEffect(() => {
    // In a real implementation, you would load actual audio files
    // For now, we'll simulate the audio state
    if (isPlaying) {
      console.log('🎵 Cosmic ambient audio started');
      onAudioToggle(true);
    } else {
      console.log('🔇 Cosmic ambient audio stopped');
      onAudioToggle(false);
    }
  }, [isPlaying, onAudioToggle]);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    
    if (audioRef?.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className={`fixed top-6 right-6 z-100 ${className}`}>
      <div className="flex items-center space-x-2">
        {/* Volume Control */}
        <AnimatePresence>
          {showVolumeControl && (
            <motion.div
              className="glassmorphic p-3 rounded-xl"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name="VolumeX" 
                  size={16} 
                  className="text-text-secondary" 
                />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-primary"
                  aria-label="Volume control"
                />
                <Icon 
                  name="Volume2" 
                  size={16} 
                  className="text-primary glow-primary" 
                />
              </div>
              
              {/* Volume Level Indicator */}
              <div className="flex justify-center mt-2 space-x-1">
                {[...Array(5)]?.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1 h-2 rounded-full ${
                      index < volume * 5 
                        ? 'bg-primary glow-primary' :'bg-border'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Audio Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleAudio}
          onMouseEnter={() => setShowVolumeControl(true)}
          onMouseLeave={() => setShowVolumeControl(false)}
          className={`glassmorphic w-12 h-12 ${
            isPlaying 
              ? 'glow-primary hover-glow-primary' :'glow-subtle hover-glow-secondary'
          } cosmic-transition`}
          aria-label={isPlaying ? 'Mute cosmic audio' : 'Play cosmic audio'}
        >
          <motion.div
            animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
          >
            <Icon 
              name={isPlaying ? "Volume2" : "VolumeX"} 
              size={20}
              className={isPlaying ? 'text-primary' : 'text-text-secondary'}
            />
          </motion.div>
        </Button>
      </div>
      {/* Audio Status Indicator */}
      {isPlaying && (
        <motion.div
          className="absolute -bottom-2 -right-2 w-3 h-3 bg-success rounded-full glow-success"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
      {/* Audio Visualization */}
      {isPlaying && (
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <div className="flex space-x-1">
            {[...Array(5)]?.map((_, index) => (
              <motion.div
                key={index}
                className="w-1 bg-primary glow-primary rounded-full"
                animate={{ 
                  height: [4, 12, 4],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: index * 0.1
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
      {/* Hidden audio element for future implementation */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        style={{ display: 'none' }}
      >
        {/* Audio sources would go here */}
        <source src="/assets/audio/cosmic-ambient.mp3" type="audio/mpeg" />
        <source src="/assets/audio/cosmic-ambient.ogg" type="audio/ogg" />
      </audio>
      {/* Mobile Touch Indicator */}
      <div className="md:hidden absolute -bottom-12 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="text-xs text-text-secondary font-caption text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isPlaying ? 'Audio On' : 'Tap for Audio'}
        </motion.div>
      </div>
    </div>
  );
};

export default AudioController;