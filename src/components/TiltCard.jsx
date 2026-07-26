import React from 'react';
import { Box } from '@mui/material';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

/**
 * TiltCard - A reusable wrapper component that provides 3D tilt interaction on hover.
 * Children can make use of `transform: translateZ(px)` to create 3D layered parallax depth.
 */
const TiltCard = ({ children, sx = {}, maxTilt = 12, perspective = 1000, ...props }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smoothing the tilt
  const rotateX = useSpring(useTransform(y, [-150, 150], [maxTilt, -maxTilt]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-maxTilt, maxTilt]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate distance from center (normalized between -150 and 150)
    const mouseX = ((event.clientX - rect.left) / width - 0.5) * 300;
    const mouseY = ((event.clientY - rect.top) / height - 0.5) * 300;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Box
      component={motion.div}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: `${perspective}px`,
      }}
      sx={{
        width: '100%',
        height: '100%',
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default TiltCard;
