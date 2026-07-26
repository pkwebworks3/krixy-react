import React from 'react';
import { Box, Typography, Card, useTheme, alpha, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import CodeIcon from '@mui/icons-material/Code';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PaletteIcon from '@mui/icons-material/Palette';
import GamepadIcon from '@mui/icons-material/Gamepad';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const timelineEvents = [
  {
    year: 'Late 2023',
    title: 'The Spark & The Web Core',
    icon: <FlashOnIcon />,
    description: 'Dived headfirst into the world of software development. Mastered HTML5, semantic markup, and the fundamentals of CSS grid & flexbox layouts.',
    highlight: 'Built first responsive static landing pages.'
  },
  {
    year: 'Early 2024',
    title: 'Logic & Interactive Web',
    icon: <CodeIcon />,
    description: 'Advanced to JavaScript (ES6+). Focused on algorithms, object-oriented concepts, event handling, and dynamic DOM manipulation.',
    highlight: 'Developed the first interactive Calculator applications.'
  },
  {
    year: 'Mid 2024',
    title: 'Visual Artistry & Glassmorphism',
    icon: <PaletteIcon />,
    description: 'Began combining visual design theories with code. Built Calculator v3 (3D Neumorphism UI) and Calculator v4 featuring stunning semi-transparent glass layouts.',
    highlight: 'Refined CSS skills, transitions, and hover-triggered micro-interactions.'
  },
  {
    year: 'Late 2024',
    title: 'Games & Dynamic Utilities',
    icon: <GamepadIcon />,
    description: 'Created dynamic systems like "Rabbit Mash" (a canvas/pointer game) and "Read My Comic" (comic reader layout), incorporating state variables and browser local storage.',
    highlight: 'Created Switch Cases converter tool and interactive quizzes.'
  },
  {
    year: 'Early 2025',
    title: 'React & Modern Frontend Stack',
    icon: <LaptopMacIcon />,
    description: 'Transitioned to React framework. Learned virtual DOM, state hooks (useState, useEffect, useContext), custom Hooks, routing, and modular components.',
    highlight: 'Integrated Material UI (MUI) and Framer Motion for premium animations.'
  },
  {
    year: 'Present & Beyond',
    title: 'Full Stack & Scaling Horizons',
    icon: <TrendingUpIcon />,
    description: 'Currently building fully responsive react web apps with dynamic themes and styling systems. Looking to explore backend integrations and full-stack environments next.',
    highlight: 'Actively pair programming and optimizing frontend systems.'
  }
];

const Timeline = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box id="timeline" sx={{ py: 10, position: 'relative' }}>
      {/* Header */}
      <Box sx={{ mb: 10, textAlign: 'center' }}>
        <Typography variant="h3" sx={{
          fontWeight: 950,
          fontFamily: '"Outfit", sans-serif',
          letterSpacing: -1,
          mb: 2,
          background: `linear-gradient(270deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.6)}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
          backgroundSize: '400% 400%',
          animation: 'gradientShift 8s ease infinite',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: { xs: '2.5rem', md: '3.5rem' }
        }}>
          My Coding Journey
        </Typography>
        <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, maxWidth: 600, mx: 'auto', px: 2 }}>
          A timeline of my milestones, self-taught achievements, and the evolution of my developer skillset.
        </Typography>
      </Box>

      {/* Timeline Wrapper */}
      <Box sx={{ position: 'relative', maxWidth: '1000px', mx: 'auto', px: { xs: 2, md: 4 } }}>
        
        {/* Central glowing vertical track line */}
        <Box 
          sx={{ 
            position: 'absolute',
            left: { xs: '31px', md: '50%' },
            top: 0,
            bottom: 0,
            width: '2px',
            background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0.8)} 0%, ${alpha(theme.palette.secondary.main, 0.5)} 50%, transparent 100%)`,
            transform: { xs: 'none', md: 'translateX(-50%)' },
            boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.35)}`,
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: theme.palette.secondary.main,
              boxShadow: `0 0 10px ${theme.palette.secondary.main}`
            }
          }}
        />

        {/* Timeline Items */}
        {timelineEvents.map((event, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <Box 
              key={idx}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'row', md: isLeft ? 'row-reverse' : 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                mb: 8,
                position: 'relative'
              }}
            >
              {/* Left/Right Card Container */}
              <Box 
                component={motion.div}
                initial={{ opacity: 0, x: isMobile ? 50 : (isLeft ? -80 : 80) }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, type: 'spring', damping: 20 }}
                sx={{ 
                  width: { xs: 'calc(100% - 70px)', md: '45%' },
                  textAlign: 'left'
                }}
              >
                <TiltCard maxTilt={5}>
                  <Card 
                    sx={{ 
                      p: { xs: 3, sm: 4 },
                      borderRadius: '24px',
                      background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(20, 20, 25, 0.35)',
                      backdropFilter: 'blur(30px)',
                      WebkitBackdropFilter: 'blur(30px)',
                      border: `1px solid ${alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.22 : 0.15)}`,
                      boxShadow: theme.palette.mode === 'light'
                        ? '0 15px 30px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.8)'
                        : '0 20px 40px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.03)',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      transformStyle: 'preserve-3d',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        background: alpha(theme.palette.primary.main, 0.04),
                        boxShadow: `0 30px 60px rgba(0, 0, 0, 0.4), 0 0 20px ${alpha(theme.palette.primary.main, 0.2)}`
                      }
                    }}
                  >
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: theme.palette.primary.main, 
                        fontWeight: 900, 
                        letterSpacing: 2, 
                        textTransform: 'uppercase',
                        fontFamily: '"Outfit", sans-serif',
                        mb: 1.5,
                        display: 'block',
                        transform: 'translateZ(18px)'
                      }}
                    >
                      {event.year}
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 800, 
                        color: theme.palette.text.primary, 
                        fontFamily: '"Outfit", sans-serif',
                        mb: 2,
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        transform: 'translateZ(25px)'
                      }}
                    >
                      {event.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: theme.palette.text.secondary, 
                        lineHeight: 1.7, 
                        mb: 2,
                        fontFamily: '"Inter", sans-serif',
                        transform: 'translateZ(10px)'
                      }}
                    >
                      {event.description}
                    </Typography>
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        bgcolor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.025)' : 'rgba(255, 255, 255, 0.02)', 
                        borderRadius: '12px',
                        borderLeft: `3px solid ${theme.palette.secondary.main}`,
                        display: 'flex',
                        alignItems: 'center',
                        transform: 'translateZ(14px)'
                      }}
                    >
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255,255,255,0.85)', 
                          fontWeight: 600, 
                          fontFamily: '"Inter", sans-serif' 
                        }}
                      >
                        {event.highlight}
                      </Typography>
                    </Box>
                  </Card>
                </TiltCard>
              </Box>

              {/* Timeline Center Node Button */}
              <Box 
                component={motion.div}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: 0.2, stiffness: 260, damping: 20 }}
                sx={{
                  position: 'absolute',
                  left: { xs: '31px', md: '50%' },
                  transform: 'translateX(-50%)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  bgcolor: '#09090b',
                  border: `2px solid ${theme.palette.primary.main}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.palette.primary.main,
                  boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.4)}`,
                  zIndex: 2,
                  '& svg': {
                    fontSize: 20
                  }
                }}
              >
                {event.icon}
              </Box>

              {/* Empty Spacer Column for Desktop layout */}
              <Box sx={{ width: '45%', display: { xs: 'none', md: 'block' } }} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Timeline;
