import React, { useRef, useEffect } from 'react';

const CosmicParticles = ({ 
  density = 50, 
  speed = 1, 
  color = '#00FFFF',
  className = '' 
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = canvas?.offsetWidth;
      canvas.height = canvas?.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < density; i++) {
        particlesRef?.current?.push({
          x: Math.random() * canvas?.width,
          y: Math.random() * canvas?.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          pulse: Math.random() * Math.PI * 2
        });
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      particlesRef?.current?.forEach((particle, index) => {
        // Update position
        particle.x += particle?.vx;
        particle.y += particle?.vy;

        // Wrap around edges
        if (particle?.x < 0) particle.x = canvas?.width;
        if (particle?.x > canvas?.width) particle.x = 0;
        if (particle?.y < 0) particle.y = canvas?.height;
        if (particle?.y > canvas?.height) particle.y = 0;

        // Update pulse for glow effect
        particle.pulse += 0.02;
        const glowIntensity = Math.sin(particle?.pulse) * 0.3 + 0.7;

        // Draw particle
        ctx?.save();
        ctx.globalAlpha = particle?.opacity * glowIntensity;
        
        // Glow effect
        ctx.shadowColor = color;
        ctx.shadowBlur = particle?.size * 3;
        
        // Particle body
        ctx.fillStyle = color;
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
        ctx?.fill();

        // Additional glow ring
        ctx.globalAlpha = particle?.opacity * 0.3 * glowIntensity;
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size * 2, 0, Math.PI * 2);
        ctx?.fill();

        ctx?.restore();

        // Draw connections to nearby particles
        particlesRef?.current?.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle?.x - otherParticle?.x;
            const dy = particle?.y - otherParticle?.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx?.save();
              ctx.globalAlpha = (1 - distance / 100) * 0.2;
              ctx.strokeStyle = color;
              ctx.lineWidth = 1;
              ctx?.beginPath();
              ctx?.moveTo(particle?.x, particle?.y);
              ctx?.lineTo(otherParticle?.x, otherParticle?.y);
              ctx?.stroke();
              ctx?.restore();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, [density, speed, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
};

export default CosmicParticles;