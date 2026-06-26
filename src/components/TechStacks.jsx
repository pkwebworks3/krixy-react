import React from 'react';
import { Box, Container, Grid, Typography, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { stacks } from '../data/stacks';

export function StackCard({ stack, index }) {
  const theme = useTheme();

  return (
    <Grid item xs={4} sm={3} md={2.4} lg={2}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.03,
          type: "spring",
          stiffness: 100
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 1.5, md: 2 },
            p: { xs: 2.5, md: 3.5 },
            height: '100%',
            borderRadius: { xs: '16px', md: '24px' },
            background: 'rgba(20, 20, 25, 0.15)',
            border: (theme) => `1.5px solid ${alpha(theme.palette.primary.main, 0.35)}`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            overflow: 'hidden',
            cursor: 'pointer',
            boxShadow: (theme) => `0 8px 24px rgba(0, 0, 0, 0.3), 0 0 15px ${alpha(theme.palette.primary.main, 0.15)}, inset 0 1px 1px rgba(255, 255, 255, 0.03)`,
            '&:hover': {
              transform: 'translateY(-8px) scale(1.04)',
              background: 'rgba(20, 20, 25, 0.35)',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.65),
              boxShadow: (theme) => `0 20px 40px rgba(0, 0, 0, 0.5), 0 0 35px ${alpha(theme.palette.primary.main, 0.5)}, inset 0 1px 1px rgba(255, 255, 255, 0.08)`,
              '& .glow': {
                opacity: 0.95,
                transform: 'translate(-50%, -50%) scale(2.0)',
              },
              '& img': {
                transform: 'scale(1.22) rotate(8deg)',
                filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))'
              },
              '& .stack-name': {
                color: '#ffffff',
                textShadow: (theme) => `0 0 8px ${alpha(theme.palette.primary.main, 0.5)}`,
                transform: 'translateY(-2px)'
              }
            },
          }}
        >
          {/* Interactive Glow Effect */}
          <Box
            className="glow"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '120px',
              height: '120px',
              background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.3)} 0%, transparent 70%)`,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%) scale(0)',
              opacity: 0,
              transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <Box
            component="img"
            src={stack.img}
            alt={stack.name}
            sx={{
              width: { xs: 40, md: 56 },
              height: { xs: 40, md: 56 },
              zIndex: 1,
              transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
            }}
          />

          <Typography
            variant="body2"
            className="stack-name"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 800,
              fontSize: { xs: '0.7rem', md: '0.85rem' },
              textTransform: 'uppercase',
              letterSpacing: { xs: 0.5, md: 1 },
              zIndex: 1,
              textAlign: 'center',
              transition: 'all 0.3s ease',
            }}
          >
            {stack.name}
          </Typography>
        </Box>
      </motion.div>
    </Grid>
  );
}

export function TechStacks({ title = "My Tech Stacks", subtitle = "Tools and technologies I use to bring ideas to life." }) {
  const theme = useTheme();

  return (
    <Box sx={{ py: 15, position: 'relative' }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="flex-start">
          {/* Left Side: Header */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              style={{ position: 'sticky', top: '150px' }}
            >
              <Typography variant="h3" sx={{
                fontSize: { xs: '3rem', md: '4rem' },
                mb: 3,
                fontWeight: 950,
                fontFamily: '"Outfit", sans-serif',
                lineHeight: 1.1,
                background: (theme) => `linear-gradient(270deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.6)}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                backgroundSize: '400% 400%',
                animation: 'gradientShift 8s ease infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {title}
              </Typography>
              <Typography variant="body1" sx={{ 
                color: theme.palette.text.secondary, 
                fontSize: '1.1rem',
                lineHeight: 1.8,
                opacity: 0.8,
                fontWeight: 500
              }}>
                {subtitle}
              </Typography>
            </motion.div>
          </Grid>

          {/* Right Side: Clustered Grid */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2} justifyContent="center">
              {stacks.map((stack, index) => (
                <StackCard key={stack.name} stack={stack} index={index} />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
