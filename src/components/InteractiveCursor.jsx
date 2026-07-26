import React, { useState, useEffect, useRef } from 'react';
import { Box, useTheme, alpha } from '@mui/material';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const InteractiveCursor = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState(null);
  const [isClicking, setIsClicking] = useState(false);

  // Mouse coordinate motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring settings for smooth lagging trail
  const springConfig = { damping: 30, stiffness: 280, mass: 0.6 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports hover interactions (hide on touch screens/mobile)
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    if (mediaQuery.matches) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Find closest interactive element
      const interactiveEl = target.closest('a, button, [role="button"], [data-cursor], .MuiIconButton-root, .MuiButton-root, .MuiCard-root');
      
      if (interactiveEl) {
        setIsHovered(true);
        const cursorData = interactiveEl.getAttribute('data-cursor');
        setHoverType(cursorData || 'pointer');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target) return;

      const interactiveEl = target.closest('a, button, [role="button"], [data-cursor], .MuiIconButton-root, .MuiButton-root, .MuiCard-root');
      if (interactiveEl) {
        setIsHovered(false);
        setHoverType(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  // Determine size, color and label based on hover state
  let cursorSize = isHovered ? 52 : 28;
  let cursorBg = 'transparent';
  let cursorBorder = `2px solid ${theme.palette.primary.main}`;
  let cursorLabel = '';

  if (hoverType === 'project') {
    cursorSize = 75;
    cursorBg = alpha(theme.palette.primary.main, 0.22);
    cursorBorder = `1.5px solid ${theme.palette.primary.main}`;
    cursorLabel = 'VIEW';
  } else if (hoverType === 'carousel') {
    cursorSize = 65;
    cursorBg = alpha(theme.palette.secondary.main, 0.15);
    cursorBorder = `1.5px dashed ${theme.palette.secondary.main}`;
    cursorLabel = 'SLIDE';
  }

  if (isClicking) {
    cursorSize = cursorSize * 0.8;
  }

  return (
    <>
      {/* 1. Leading Small Center Dot */}
      <Box
        component={motion.div}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.main,
          boxShadow: `0 0 10px ${theme.palette.primary.main}`,
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'none',
        }}
      />

      {/* 2. Lagging Spring-Based Outer Ring */}
      <Box
        component={motion.div}
        animate={{
          width: cursorSize,
          height: cursorSize,
          backgroundColor: cursorBg,
          border: cursorBorder,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 28,
        }}
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: hoverType === 'project' ? 'difference' : 'normal',
          transition: 'border-color 0.2s, background-color 0.2s',
          boxShadow: isHovered 
            ? `0 0 20px ${alpha(theme.palette.primary.main, 0.25)}` 
            : `0 0 0px transparent`,
        }}
      >
        {/* Label indicator (e.g. "VIEW" or "SLIDE") */}
        {cursorLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            sx={{
              color: '#ffffff',
              fontSize: '0.65rem',
              fontWeight: 900,
              letterSpacing: '1px',
              fontFamily: '"Outfit", sans-serif',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            }}
          >
            {cursorLabel}
          </motion.span>
        )}
      </Box>
    </>
  );
};

export default InteractiveCursor;
