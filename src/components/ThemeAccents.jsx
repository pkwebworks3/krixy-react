import React from 'react';
import { Box, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';

const ThemeAccents = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box sx={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: -1,
      overflow: 'hidden',
      pointerEvents: 'none',
      background: isDarkMode ? '#020617' : '#f8fafc'
    }}>
      {isDarkMode ? (
        <>
          {/* Nebula Glow - Top Right */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '70vw',
              height: '70vw',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${alpha('#7c3aed', 0.12)} 0%, ${alpha('#7c3aed', 0.05)} 30%, transparent 70%)`,
              willChange: 'transform',
            }}
          />
          {/* Nebula Glow - Bottom Left */}
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              bottom: '-30%',
              left: '-20%',
              width: '80vw',
              height: '80vw',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${alpha('#3b82f6', 0.08)} 0%, ${alpha('#3b82f6', 0.03)} 30%, transparent 70%)`,
              willChange: 'transform',
            }}
          />
        </>
      ) : (
        <>
          {/* Sunlight Rays */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: '-100%', y: '-100%', rotate: -45 }}
              animate={{ 
                x: ['-100%', '200%'],
                y: ['-100%', '200%'],
              }}
              transition={{ 
                duration: 25 + i * 5, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 8
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '150vw',
                height: '300px',
                background: `linear-gradient(90deg, transparent, ${alpha('#fff', 0.2)}, transparent)`,
                opacity: 0.5,
                willChange: 'transform',
              }}
            />
          ))}
          {/* Soft Light Warmth */}
          <Box sx={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: `radial-gradient(circle at 20% 30%, ${alpha('#7c3aed', 0.03)} 0%, transparent 50%)`,
          }} />
        </>
      )}
    </Box>
  );
};

export default ThemeAccents;
