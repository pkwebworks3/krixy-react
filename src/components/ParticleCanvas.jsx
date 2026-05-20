import React, { useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

const ParticleCanvas = ({ isMobile }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  if (isDarkMode) return null;
  
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999, px: -999, py: -999, active: false, speed: 0 });
  const burstsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const COLORS = ['#ff6b00', '#ff8500', '#ffa600', '#ea580c', '#ffb37c', '#ff7a59'];
    let flowers = [];
    const BLOOM_RADIUS = 150;
    const NUM_GROUPS = 12;

    const initGrid = () => {
      flowers = [];
      const width = canvas.offsetWidth || window.innerWidth;
      const height = canvas.offsetHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const spacing = 90; // Increased spacing to further reduce particle count for performance
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + (Math.random() - 0.5) * 40;
          const y = j * spacing + (Math.random() - 0.5) * 40;

          flowers.push({
            x, y,
            baseSize: Math.random() * 8 + 12,
            bloomLevel: 0,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.015,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            groupIndex: Math.floor(Math.random() * NUM_GROUPS),
          });
        }
      }
    };

    initGrid();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(initGrid, 200);
    };
    window.addEventListener('resize', handleResize);

    const getCanvasPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handlePointerMove = (e) => {
      if (isMobile) return;
      const { x, y } = getCanvasPos(e);
      if (x >= -50 && x <= canvas.width + 50 && y >= -50 && y <= canvas.height + 50) {
        mouseRef.current = { x, y, active: true };
      } else {
        mouseRef.current.active = false;
      }
    };

    const handlePointerDown = (e) => {
      if (!isMobile) return;
      const { x, y } = getCanvasPos(e);
      if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
        burstsRef.current.push({ x, y, time: performance.now() });
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);

    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mx, y: my, active: mActive } = mouseRef.current;

      flowers.forEach((f) => {
        // Base rotation always active
        f.rotation += f.rotSpeed;
        
        // Add additional rotation when hovered/bloomed (now for both stars and flowers)
        if (f.bloomLevel > 0.05) {
          f.rotation += f.bloomLevel * 0.02; // Smooth extra rotation proportional to bloom
        }

        let targetBloom = 0;

        if (mActive) {
          const dx = f.x - mx;
          const dy = f.y - my;
          const distSq = dx * dx + dy * dy;
          const radiusSq = BLOOM_RADIUS * BLOOM_RADIUS;
          if (distSq < radiusSq) {
            targetBloom = (1 - Math.sqrt(distSq) / BLOOM_RADIUS) * 1.5;
          }
        }

        if (burstsRef.current.length > 0) {
          burstsRef.current.forEach((b) => {
            const timeSince = now - b.time;
            if (timeSince < 1500) {
              const burstRadius = (timeSince / 1500) * 500;
              const dist = Math.hypot(f.x - b.x, f.y - b.y);
              if (Math.abs(dist - burstRadius) < 60) {
                const burstIntensity = 1 - Math.abs(dist - burstRadius) / 60;
                targetBloom = Math.max(targetBloom, burstIntensity * 1.2);
              }
            }
          });
        }

        // Faster blooming, slower fading for "bloom" feel
        if (f.bloomLevel < targetBloom) {
          f.bloomLevel += 0.04;
        } else {
          f.bloomLevel -= 0.01;
        }

        f.bloomLevel = Math.max(0, Math.min(1.5, f.bloomLevel));

        if (f.bloomLevel > 0.01) {
          const ease = Math.sin((Math.min(1, f.bloomLevel) * Math.PI) / 2);
          const currentSize = f.baseSize * ease;

          ctx.save();
          ctx.translate(f.x, f.y);
          ctx.rotate(f.rotation);

          if (isDarkMode) {
            // Constant Blinking/Twinkling logic for stars
            const blinkSpeed = 0.003 + (f.x % 0.005);
            const blink = 0.4 + Math.sin(now * blinkSpeed + f.x) * 0.6;
            const starColor = '#ffb03a';  

            ctx.globalAlpha = ease * blink;
            ctx.fillStyle = starColor;

            const points = 5;
            const sparkle = 1 + (Math.sin(now * 0.01 + f.y) * 0.1);
            const outerRadius = currentSize * 0.9 * sparkle;
            const innerRadius = currentSize * 0.4 * sparkle;

            ctx.beginPath();
            for (let i = 0; i < points * 2; i++) {
              const radius = i % 2 === 0 ? outerRadius : innerRadius;
              const angle = (Math.PI * i) / points - Math.PI / 2;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
          } else {
            // Blooming Flower Logic
            ctx.globalAlpha = ease;
            ctx.fillStyle = f.color;
            for (let i = 0; i < 5; i++) {
              ctx.beginPath();
              // Ellipse stretch for bloom effect
              ctx.ellipse(0, currentSize * 0.5, Math.max(0.1, currentSize * 0.35), Math.max(0.1, currentSize * 0.75), 0, 0, Math.PI * 2);
              ctx.fill();
              ctx.rotate((Math.PI * 2) / 5);
            }

            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(0, 0, Math.max(0.1, currentSize * 0.2), 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      clearTimeout(resizeTimeout);
    };
  }, [isMobile, theme.palette.mode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default ParticleCanvas;
