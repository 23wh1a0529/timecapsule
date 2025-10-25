import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CosmicScene from './components/CosmicScene';
import WelcomePanel from './components/WelcomePanel';
import AudioController from './components/AudioController';
import LearnMoreSection from './components/LearnMoreSection';
import CursorTrail from './components/CursorTrail';

const KalChakraGatewayLanding = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time for cosmic scene
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAudioToggle = (enabled) => {
    setIsAudioEnabled(enabled);
  };

  const handleCursorMove = (position) => {
    setMousePosition(position);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Loading Screen */}
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 z-200 bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          onAnimationComplete={() => setIsLoaded(true)}
        >
          <div className="text-center">
            <motion.div
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p
              className="text-primary font-caption glow-primary"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Initializing Cosmic Gateway...
            </motion.p>
          </div>
        </motion.div>
      )}
      {/* Main Content */}
      {isLoaded && (
        <>
          {/* Cosmic Background Scene */}
          <CosmicScene 
            isAudioEnabled={isAudioEnabled}
            onCursorMove={handleCursorMove}
          />

          {/* Cursor Trail Effect */}
          <CursorTrail 
            isActive={true}
            mousePosition={mousePosition}
          />

          {/* Audio Controller */}
          <AudioController onAudioToggle={handleAudioToggle} />

          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center px-6 z-30">
            <motion.div
              className="w-full max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <WelcomePanel />
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="glassmorphic p-3 rounded-full">
                <motion.div
                  className="w-6 h-10 border-2 border-primary rounded-full flex justify-center glow-primary"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    className="w-1 h-3 bg-primary rounded-full mt-2"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Learn More Section */}
          <motion.div
            className="relative z-30 bg-gradient-to-b from-transparent via-background/50 to-background"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <LearnMoreSection />
          </motion.div>

          {/* Footer */}
          <footer className="relative z-30 bg-background border-t border-border">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="text-center">
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-2xl font-heading text-primary glow-primary mb-4">
                    KalChakra
                  </h3>
                  <p className="text-text-secondary font-caption max-w-md mx-auto">
                    Preserving memories across the cosmos of time with cutting-edge 
                    blockchain technology and immersive 3D experiences.
                  </p>
                </motion.div>

                <motion.div
                  className="border-t border-border pt-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-sm text-text-secondary font-caption">
                      © {new Date()?.getFullYear()} KalChakra. All rights reserved across all timelines.
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-text-secondary">
                      <a href="#" className="hover:text-primary cosmic-transition">
                        Privacy Policy
                      </a>
                      <a href="#" className="hover:text-primary cosmic-transition">
                        Terms of Service
                      </a>
                      <a href="#" className="hover:text-primary cosmic-transition">
                        Blockchain Security
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </footer>

          {/* Ambient Particles Overlay */}
          <div className="fixed inset-0 pointer-events-none z-20">
            {[...Array(20)]?.map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-1 h-1 bg-primary rounded-full glow-primary"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 4
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default KalChakraGatewayLanding;