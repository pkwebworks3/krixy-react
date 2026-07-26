import React, { useRef, useEffect } from 'react';
import { Box, useTheme, useMediaQuery, alpha } from '@mui/material';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// Helper to convert hex to RGB
const hexToRgb = (hex) => {
  if (!hex) return { r: 255, g: 107, b: 0 };
  let cleanHex = hex.replace(/^\s*#|\s*$/g, '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
};

const HeroBackground = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  // Get current palette colors
  const primaryHex = theme.palette.primary.main;
  const secondaryHex = theme.palette.secondary.main;
  const primaryRgb = hexToRgb(primaryHex);
  const secondaryRgb = hexToRgb(secondaryHex);

  // Motion tracking for mouse offset parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const trailMouseX = useSpring(mouseX, { stiffness: 80, damping: 24 });
  const trailMouseY = useSpring(mouseY, { stiffness: 80, damping: 24 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const xNorm = (e.clientX / window.innerWidth) - 0.5;
      const yNorm = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(xNorm);
      mouseY.set(yNorm);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollY } = useScroll();
  
  // Transform functions for Z-depth scroll effects
  const bgScrollY = useTransform(scrollY, [0, 1000], [0, 220]);
  const canvasScrollY = useTransform(scrollY, [0, 1000], [0, 110]);
  const gridScrollY = useTransform(scrollY, [0, 1000], [0, 60]);

  // Combined mouse and scroll translations
  const bgX1 = useTransform(trailMouseX, (v) => v * -55);
  const bgY1 = useTransform(trailMouseY, (v) => v * -55);
  const blob1Y = useTransform([bgScrollY, bgY1], ([s, m]) => s + m);

  const bgX2 = useTransform(trailMouseX, (v) => v * -40);
  const bgY2 = useTransform(trailMouseY, (v) => v * -40);
  const blob2Y = useTransform([bgScrollY, bgY2], ([s, m]) => s * 0.75 + m);

  const bgX3 = useTransform(trailMouseX, (v) => v * -30);
  const bgY3 = useTransform(trailMouseY, (v) => v * -30);
  const blob3Y = useTransform([bgScrollY, bgY3], ([s, m]) => s * 0.85 + m);

  const canvasX = useTransform(trailMouseX, (v) => v * -25);
  const canvasY = useTransform([canvasScrollY, trailMouseY], ([s, m]) => s + m * -25);

  const gridX = useTransform(trailMouseX, (v) => v * -18);
  const gridY = useTransform([gridScrollY, trailMouseY], ([s, m]) => s + m * -18);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Particle density based on screen size
    const particleCount = isMobile ? 35 : 85;
    const connectionDistance = isMobile ? 90 : 130;
    const mouseRadius = isMobile ? 120 : 180;

    const resizeCanvas = () => {
      const rect = canvas.parentNode.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();

    // Initialize particles
    particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      twinkleSpeed: 0.005 + Math.random() * 0.01
    }));

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      // Only track if pointer is within the bounds of the hero section
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y, active: true };
      } else {
        mouseRef.current.active = false;
      }
    };

    const handlePointerLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, active: false };
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      // Update and draw particles
      particles.forEach((p) => {
        // Twinkle particle alpha
        p.alpha += p.twinkleSpeed;
        if (p.alpha > 0.85 || p.alpha < 0.15) {
          p.twinkleSpeed = -p.twinkleSpeed;
        }

        // Float movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges smoothly
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Interactive mouse force (attract or push gently)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius) {
            // Calculate pull factor (stronger when closer)
            const force = (mouseRadius - dist) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            
            // Attract gently
            p.x += Math.cos(angle) * force * 0.6;
            p.y += Math.sin(angle) * force * 0.6;
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${p.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = primaryHex;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for line drawing
      });

      // Draw constellation connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Draw line to mouse if active and close
        if (mouse.active) {
          const mDist = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
          if (mDist < mouseRadius) {
            const opacity = (1 - mDist / mouseRadius) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.08;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Mix primary and secondary colors for connection lines
            ctx.strokeStyle = `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isMobile, primaryHex, secondaryHex, primaryRgb.r, primaryRgb.g, primaryRgb.b, secondaryRgb.r, secondaryRgb.g, secondaryRgb.b]);

  return (
    <Box sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      backgroundColor: 'transparent'
    }}>
      {/* Styles for float animations */}
      <style>{`
        @keyframes driftBlob1 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(12%, 8%) scale(1.15) rotate(120deg); }
          66% { transform: translate(-8%, 15%) scale(0.9) rotate(240deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
        }
        @keyframes driftBlob2 {
          0% { transform: translate(0px, 0px) scale(1.1) rotate(0deg); }
          50% { transform: translate(-10%, -12%) scale(0.85) rotate(-180deg); }
          100% { transform: translate(0px, 0px) scale(1.1) rotate(-360deg); }
        }
        @keyframes driftBlob3 {
          0% { transform: translate(0px, 0px) scale(0.9) rotate(0deg); }
          40% { transform: translate(8%, -6%) scale(1.1) rotate(90deg); }
          80% { transform: translate(-12%, 8%) scale(0.95) rotate(270deg); }
          100% { transform: translate(0px, 0px) scale(0.9) rotate(360deg); }
        }
      `}</style>

      {/* Floating Fluid Aurora Blobs */}
      <Box
        component={motion.div}
        style={{
          x: bgX1,
          y: blob1Y
        }}
        sx={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(primaryHex, 0.22)} 0%, transparent 68%)`,
          filter: 'blur(100px)',
          animation: 'driftBlob1 28s ease-in-out infinite',
          pointerEvents: 'none'
        }}
      />

      <Box
        component={motion.div}
        style={{
          x: bgX2,
          y: blob2Y
        }}
        sx={{
          position: 'absolute',
          bottom: '-20%',
          right: '-15%',
          width: '65vw',
          height: '65vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(secondaryHex, 0.16)} 0%, transparent 65%)`,
          filter: 'blur(120px)',
          animation: 'driftBlob2 35s ease-in-out infinite',
          pointerEvents: 'none'
        }}
      />

      <Box
        component={motion.div}
        style={{
          x: bgX3,
          y: blob3Y
        }}
        sx={{
          position: 'absolute',
          top: '25%',
          left: '35%',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(primaryHex, 0.12)} 0%, transparent 70%)`,
          filter: 'blur(90px)',
          animation: 'driftBlob3 22s ease-in-out infinite',
          pointerEvents: 'none'
        }}
      />

      {/* Interactive Constellation Canvas Wrapper */}
      <Box
        component={motion.div}
        style={{
          x: canvasX,
          y: canvasY
        }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />
      </Box>

      {/* Digital Tech Grid Mask for Developer Aesthetic */}
      <Box
        component={motion.div}
        style={{
          x: gridX,
          y: gridY
        }}
        sx={{
          position: 'absolute',
          top: -30,
          left: -30,
          right: -30,
          bottom: -30,
          backgroundImage: `linear-gradient(${alpha(theme.palette.text.primary, 0.05)} 1px, transparent 1px),
                            linear-gradient(90deg, ${alpha(theme.palette.text.primary, 0.05)} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: 0.15,
          mixBlendMode: 'overlay',
          pointerEvents: 'none'
        }}
      />
    </Box>
  );
};

export default HeroBackground;
