import React, { useEffect, useState, useRef } from 'react';

const CursorTrail = ({ isActive = true, mousePosition }) => {
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const updateTrail = () => {
      if (mousePosition?.x !== 0 || mousePosition?.y !== 0) {
        const newPoint = {
          x: mousePosition?.x,
          y: mousePosition?.y,
          id: Date.now(),
          life: 1
        };

        trailRef.current = [newPoint, ...trailRef?.current?.slice(0, 19)];
        
        // Update life of existing points
        trailRef.current = trailRef?.current?.map(point => ({
          ...point,
          life: point?.life - 0.05
        }))?.filter(point => point?.life > 0);

        setTrail([...trailRef?.current]);
      }

      animationRef.current = requestAnimationFrame(updateTrail);
    };

    updateTrail();

    return () => {
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, [isActive, mousePosition]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trail?.map((point, index) => (
        <div
          key={point?.id}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            left: point?.x - 4,
            top: point?.y - 4,
            background: index % 2 === 0 
              ? `rgba(0, 255, 255, ${point?.life * 0.8})` 
              : `rgba(255, 0, 255, ${point?.life * 0.8})`,
            boxShadow: index % 2 === 0 
              ? `0 0 ${10 * point?.life}px rgba(0, 255, 255, ${point?.life * 0.5})`
              : `0 0 ${10 * point?.life}px rgba(255, 0, 255, ${point?.life * 0.5})`,
            transform: `scale(${point?.life})`,
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}
      {/* Custom Cursor */}
      <div
        className="absolute w-4 h-4 pointer-events-none z-60"
        style={{
          left: mousePosition?.x - 8,
          top: mousePosition?.y - 8,
          transition: 'all 0.1s ease-out'
        }}
      >
        <div className="relative w-full h-full">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-2 border-primary rounded-full glow-primary animate-pulse" />
          
          {/* Inner Dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-accent rounded-full glow-accent" />
          
          {/* Orbital Elements */}
          <div className="absolute inset-0">
            <div 
              className="absolute w-1 h-1 bg-secondary rounded-full glow-secondary"
              style={{
                top: '0%',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'orbit 2s linear infinite'
              }}
            />
            <div 
              className="absolute w-1 h-1 bg-secondary rounded-full glow-secondary"
              style={{
                top: '50%',
                right: '0%',
                transform: 'translateY(-50%)',
                animation: 'orbit 2s linear infinite',
                animationDelay: '0.5s'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursorTrail;