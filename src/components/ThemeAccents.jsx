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
      background: '#000000'
    }}>
      {/* Vertical Tech Lines */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'space-between',
        px: '3vw',
        zIndex: 0
      }}>
        {[...Array(19)].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: '1px',
              height: '100%',
              background: 'linear-gradient(to top, rgba(255, 107, 0, 0.5) 0%, rgba(255, 107, 0, 0.1) 50%, transparent 100%)',
              opacity: 0.4,
              animation: 'lineGlowWave 5s ease-in-out infinite',
              animationDelay: `${i * 0.15}s`,
              '@keyframes lineGlowWave': {
                '0%, 100%': {
                  opacity: 0.3,
                  background: 'linear-gradient(to top, rgba(255, 107, 0, 0.4) 0%, rgba(255, 107, 0, 0.08) 50%, transparent 100%)',
                },
                '50%': {
                  opacity: 1,
                  background: 'linear-gradient(to top, rgba(255, 107, 0, 0.75) 0%, rgba(255, 107, 0, 0.2) 65%, transparent 100%)',
                }
              }
            }}
          />
        ))}
      </Box>

      {/* Bottom Rising Glow Accent */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '55vh',
          background: 'linear-gradient(to top, rgba(255, 107, 0, 0.2) 0%, rgba(255, 107, 0, 0.06) 45%, transparent 100%)',
          zIndex: 1,
          animation: 'glowBreath 7s ease-in-out infinite alternate',
          '@keyframes glowBreath': {
            '0%': {
              opacity: 0.7,
              height: '48vh',
            },
            '100%': {
              opacity: 1,
              height: '58vh',
            }
          }
        }}
      />
    </Box>
  );
};

export default ThemeAccents;
