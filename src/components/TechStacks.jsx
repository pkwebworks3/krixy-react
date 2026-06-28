import React from 'react';
import { Box, Container, Typography, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { stacks } from '../data/stacks';

function MarqueeRow({ items, direction = 'left', speed = 25 }) {
  const theme = useTheme();
  // Repeat items 6 times to ensure no gaps ever on ultra-wide screens
  const repeatedItems = [...items, ...items, ...items, ...items, ...items, ...items];
  
  return (
    <Box sx={{
      display: 'flex',
      overflow: 'hidden',
      width: '100%',
      userSelect: 'none',
    }}>
      <Box sx={{
        display: 'flex',
        width: 'max-content',
        animation: `${direction === 'left' ? 'scrollLeft' : 'scrollRight'} ${speed}s linear infinite`,
      }}>
        {repeatedItems.map((stack, idx) => (
          <Box
            key={`${stack.name}-${idx}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: 90, sm: 120, md: 150 },
              height: { xs: 60, sm: 80, md: 95 },
              borderRadius: { xs: '12px', sm: '16px', md: '20px' },
              mr: { xs: 1.5, sm: 2, md: 3 }, // Use marginRight instead of gap for seamless looping
              background: theme.palette.mode === 'light' 
                ? '#ffffff' 
                : 'rgba(255, 255, 255, 0.03)',
              border: theme.palette.mode === 'light'
                ? '1px solid rgba(0, 0, 0, 0.06)'
                : '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: theme.palette.mode === 'light'
                ? '0 4px 12px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)'
                : '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            }}
          >
            <Box
              component="img"
              src={stack.img}
              alt={stack.name}
              sx={{
                width: { xs: 28, sm: 36, md: 44 },
                height: { xs: 28, sm: 36, md: 44 },
                objectFit: 'contain',
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export function TechStacks({ 
  title = "Anything you can imagine, I can build for you.", 
  subtitle = "Tools and technologies I use to bring ideas to life.",
  badge = "Unlimited capability >"
}) {
  const theme = useTheme();

  // Distribute the items across 3 rows dynamically
  const rowCount = 3;
  const itemsPerRow = 8;
  const rows = [[], [], []];
  
  if (stacks && stacks.length > 0) {
    for (let r = 0; r < rowCount; r++) {
      for (let i = 0; i < itemsPerRow; i++) {
        const index = (r * 4 + i) % stacks.length;
        rows[r].push(stacks[index]);
      }
    }
  }

  return (
    <Box sx={{ 
      py: { xs: 10, md: 15 }, 
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
    }}>
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-16.6667%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-16.6667%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <Container maxWidth="lg" sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          {badge && (
            <Typography
              variant="subtitle2"
              sx={{
                color: (theme) => theme.palette.mode === 'light' ? '#0070f3' : theme.palette.primary.main,
                fontWeight: 700,
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                textTransform: 'none',
                letterSpacing: '0.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                mb: 1.5,
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              {badge}
            </Typography>
          )}
          
          <Typography 
            variant="h2" 
            sx={{
              fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
              fontWeight: 800,
              fontFamily: '"Outfit", sans-serif',
              lineHeight: 1.15,
              color: theme.palette.text.primary,
              mb: 2,
              letterSpacing: '-0.02em',
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            {title}
          </Typography>
          
          {subtitle && (
            <Typography 
              variant="body1" 
              sx={{ 
                color: theme.palette.text.secondary, 
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.6,
                fontWeight: 500,
                maxWidth: '600px',
                mx: 'auto',
                opacity: 0.85
              }}
            >
              {subtitle}
            </Typography>
          )}
        </motion.div>
      </Container>

      {/* 3D Perspective Plane Container */}
      <Box sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        py: { xs: 4, md: 8 },
        // Smooth fade mask at edges
        maskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, #000 35%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, #000 35%, transparent 100%)',
      }}>
        <Box sx={{
          perspective: '1200px',
          width: '100%',
        }}>
          <Box sx={{
            transform: 'rotateX(52deg) scale(1.15) translateY(-5%)',
            transformStyle: 'preserve-3d',
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 1.5, sm: 2.5, md: 3.5 },
            width: '140%',
            marginLeft: '-20%',
          }}>
            {rows.map((rowItems, idx) => (
              <MarqueeRow 
                key={idx} 
                items={rowItems} 
                direction={idx % 2 === 0 ? 'left' : 'right'} 
                speed={22 + idx * 4} 
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

