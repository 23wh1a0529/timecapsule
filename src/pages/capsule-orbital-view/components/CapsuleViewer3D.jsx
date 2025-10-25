import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CapsuleViewer3D = ({ 
  capsule, 
  onRotate = () => {}, 
  onZoom = () => {},
  className = '' 
}) => {
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const animate = () => {
      // Clear canvas
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
      
      // Draw cosmic background
      const gradient = ctx?.createRadialGradient(
        canvas?.width / 2, canvas?.height / 2, 0,
        canvas?.width / 2, canvas?.height / 2, canvas?.width / 2
      );
      gradient?.addColorStop(0, 'rgba(0, 255, 255, 0.1)');
      gradient?.addColorStop(1, 'rgba(138, 43, 226, 0.05)');
      ctx.fillStyle = gradient;
      ctx?.fillRect(0, 0, canvas?.width, canvas?.height);

      // Draw capsule (simplified 3D representation)
      const centerX = canvas?.width / 2;
      const centerY = canvas?.height / 2;
      const capsuleSize = 80 * zoom;

      // Capsule body
      ctx?.save();
      ctx?.translate(centerX, centerY);
      ctx?.rotate(rotation?.y * 0.01);
      
      // Main capsule shape
      const capsuleColor = capsule?.status === 'unlocked' ? '#00FFFF' : '#FF4757';
      ctx.fillStyle = capsuleColor;
      ctx.shadowColor = capsuleColor;
      ctx.shadowBlur = 20;
      ctx?.beginPath();
      ctx?.ellipse(0, 0, capsuleSize, capsuleSize * 0.6, 0, 0, 2 * Math.PI);
      ctx?.fill();

      // Energy field
      if (capsule?.status === 'unlocking') {
        ctx.strokeStyle = '#FFB800';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 30;
        ctx?.beginPath();
        ctx?.arc(0, 0, capsuleSize * 1.2, 0, 2 * Math.PI);
        ctx?.stroke();
      }

      // Particle trails
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + rotation?.y * 0.02;
        const x = Math.cos(angle) * (capsuleSize * 1.5);
        const y = Math.sin(angle) * (capsuleSize * 1.5);
        
        ctx.fillStyle = `rgba(0, 255, 255, ${0.3 - i * 0.03})`;
        ctx?.beginPath();
        ctx?.arc(x, y, 3, 0, 2 * Math.PI);
        ctx?.fill();
      }

      ctx?.restore();
      requestAnimationFrame(animate);
    };

    animate();
  }, [rotation, zoom, capsule?.status]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePos({ x: e?.clientX, y: e?.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e?.clientX - lastMousePos?.x;
    const deltaY = e?.clientY - lastMousePos?.y;
    
    setRotation(prev => ({
      x: prev?.x + deltaY,
      y: prev?.y + deltaX
    }));
    
    setLastMousePos({ x: e?.clientX, y: e?.clientY });
    onRotate({ x: rotation?.x + deltaY, y: rotation?.y + deltaX });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom * 1.2, 3);
    setZoom(newZoom);
    onZoom(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom * 0.8, 0.5);
    setZoom(newZoom);
    onZoom(newZoom);
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomIn}
          className="glassmorphic hover-glow-primary"
          aria-label="Zoom in"
        >
          <Icon name="ZoomIn" size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomOut}
          className="glassmorphic hover-glow-primary"
          aria-label="Zoom out"
        >
          <Icon name="ZoomOut" size={20} />
        </Button>
      </div>
      {/* Status Indicator */}
      <div className="absolute bottom-4 left-4">
        <motion.div
          className={`glassmorphic px-3 py-2 rounded-lg flex items-center space-x-2 ${
            capsule?.status === 'unlocked' ? 'glow-success' : 
            capsule?.status === 'unlocking' ? 'glow-warning' : 'glow-error'
          }`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Icon 
            name={
              capsule?.status === 'unlocked' ? 'Unlock' :
              capsule?.status === 'unlocking' ? 'Clock' : 'Lock'
            } 
            size={16} 
            className={
              capsule?.status === 'unlocked' ? 'text-success' :
              capsule?.status === 'unlocking' ? 'text-warning' : 'text-error'
            }
          />
          <span className="text-sm font-caption capitalize">
            {capsule?.status}
          </span>
        </motion.div>
      </div>
      {/* Interaction Hint */}
      <div className="absolute bottom-4 right-4 glassmorphic px-3 py-2 rounded-lg">
        <span className="text-xs text-text-secondary font-caption">
          Drag to rotate • Scroll to zoom
        </span>
      </div>
    </div>
  );
};

export default CapsuleViewer3D;