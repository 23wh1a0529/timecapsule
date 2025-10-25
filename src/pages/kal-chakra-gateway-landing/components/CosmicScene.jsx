import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CosmicScene = ({ isAudioEnabled, onCursorMove }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Initialize particles
  useEffect(() => {
    const initParticles = () => {
      const particleArray = [];
      const particleCount = window.innerWidth < 768 ? 50 : 100;
      
      for (let i = 0; i < particleCount; i++) {
        particleArray?.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: Math.random() > 0.5 ? '#00FFFF' : '#FF00FF',
          opacity: Math.random() * 0.8 + 0.2,
          pulse: Math.random() * Math.PI * 2
        });
      }
      setParticles(particleArray);
    };

    initParticles();
    window.addEventListener('resize', initParticles);
    return () => window.removeEventListener('resize', initParticles);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
      
      // Draw cosmic background gradient
      const gradient = ctx?.createRadialGradient(
        canvas?.width / 2, canvas?.height / 2, 0,
        canvas?.width / 2, canvas?.height / 2, canvas?.width
      );
      gradient?.addColorStop(0, 'rgba(26, 26, 58, 0.8)');
      gradient?.addColorStop(0.5, 'rgba(10, 10, 42, 0.6)');
      gradient?.addColorStop(1, 'rgba(0, 0, 17, 0.9)');
      
      ctx.fillStyle = gradient;
      ctx?.fillRect(0, 0, canvas?.width, canvas?.height);

      // Update and draw particles
      particles?.forEach((particle, index) => {
        // Update position
        particle.x += particle?.speedX;
        particle.y += particle?.speedY;
        particle.pulse += 0.02;

        // Wrap around screen
        if (particle?.x > canvas?.width) particle.x = 0;
        if (particle?.x < 0) particle.x = canvas?.width;
        if (particle?.y > canvas?.height) particle.y = 0;
        if (particle?.y < 0) particle.y = canvas?.height;

        // Mouse interaction
        const dx = mousePosition?.x - particle?.x;
        const dy = mousePosition?.y - particle?.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.x -= dx * force * 0.01;
          particle.y -= dy * force * 0.01;
        }

        // Draw particle
        ctx?.save();
        ctx.globalAlpha = particle?.opacity * (0.5 + Math.sin(particle?.pulse) * 0.5);
        ctx.fillStyle = particle?.color;
        ctx.shadowColor = particle?.color;
        ctx.shadowBlur = 10;
        
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
        ctx?.fill();
        ctx?.restore();

        // Draw connections
        particles?.slice(index + 1)?.forEach(otherParticle => {
          const dx = particle?.x - otherParticle?.x;
          const dy = particle?.y - otherParticle?.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) {
            ctx?.save();
            ctx.globalAlpha = (80 - distance) / 80 * 0.3;
            ctx.strokeStyle = '#00FFFF';
            ctx.lineWidth = 0.5;
            ctx?.beginPath();
            ctx?.moveTo(particle?.x, particle?.y);
            ctx?.lineTo(otherParticle?.x, otherParticle?.y);
            ctx?.stroke();
            ctx?.restore();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, [particles, mousePosition]);

  const handleMouseMove = (e) => {
    const newPosition = { x: e?.clientX, y: e?.clientY };
    setMousePosition(newPosition);
    onCursorMove(newPosition);
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0 cosmic-bg" />
      {/* Animated Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10"
        onMouseMove={handleMouseMove}
        style={{ cursor: 'none' }}
      />
      {/* Central Chakra/Hourglass */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative w-32 h-32 md:w-48 md:h-48">
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 border-2 border-primary rounded-full glow-primary"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Inner Chakra Symbol */}
          <div className="absolute inset-4 bg-gradient-to-br from-primary to-secondary rounded-full glow-medium flex items-center justify-center">
            <motion.div
              className="w-8 h-8 md:w-12 md:h-12 bg-accent rounded-full glow-accent"
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Orbital Elements */}
          {[0, 60, 120, 180, 240, 300]?.map((angle, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-primary rounded-full glow-primary"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 0'
              }}
              animate={{ rotate: 360 + angle }}
              transition={{ 
                duration: 15 + index * 2, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <div className="w-2 h-2 bg-primary rounded-full" 
                   style={{ transform: 'translate(-50%, -50%) translateX(60px)' }} />
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 z-15">
        {[...Array(6)]?.map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-4 h-4 border border-secondary glow-secondary"
            style={{
              left: `${20 + index * 15}%`,
              top: `${30 + (index % 2) * 40}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              delay: index * 0.5
            }}
          />
        ))}
      </div>
      {/* Data Stream Effects */}
      <div className="absolute right-4 top-1/4 z-15 hidden md:block">
        <motion.div
          className="space-y-2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {[...Array(8)]?.map((_, index) => (
            <motion.div
              key={index}
              className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent glow-primary"
              style={{ width: Math.random() * 100 + 50 }}
              animate={{ scaleX: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
      {/* Ambient Audio Indicator */}
      {isAudioEnabled && (
        <motion.div
          className="absolute bottom-8 left-8 z-20"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex space-x-1">
            {[...Array(4)]?.map((_, index) => (
              <motion.div
                key={index}
                className="w-1 bg-primary glow-primary"
                animate={{ height: [8, 16, 8] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CosmicScene;