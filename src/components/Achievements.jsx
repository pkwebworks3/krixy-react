import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const achievementsList = [
  {
    title: 'Self-Guided Engineering',
    badge: '100% Self-Taught',
    icon: <WorkspacePremiumIcon sx={{ fontSize: 45 }} />,
    color: '#ff6b00',
    description: 'Mastered web programming, layout designs, and logic architecture independently through online documentation and building direct code experiments.',
    detail: 'Focused on CSS layout principles, ES6 JavaScript, React hooks, and MUI systems.'
  },
  {
    title: 'Digital Product Launcher',
    badge: '10+ Live Projects',
    icon: <LibraryAddCheckIcon sx={{ fontSize: 45 }} />,
    color: '#00ff66',
    description: 'Designed and deployed a diverse gallery of active websites, utility checkers, math calculation interfaces, and interactive pages.',
    detail: 'Demonstrates coding consistencies, responsive design setups, and modular architectures.'
  },
  {
    title: 'Arcade Builder Medal',
    badge: 'Game Physics & Loops',
    icon: <SportsEsportsIcon sx={{ fontSize: 45 }} />,
    color: '#bd00ff',
    description: 'Developed "Rabbit Mash", establishing customized game loops, pointer event handlers, dynamic score states, and responsive layout controls.',
    detail: 'Pioneered custom canvas-based layouts and state update intervals.'
  },
  {
    title: 'System Architect',
    badge: 'React Platform v1',
    icon: <EmojiEventsIcon sx={{ fontSize: 45 }} />,
    color: '#00f0ff',
    description: 'Engineered this React portfolio web application, introducing a custom-sandboxed browser simulator to preview projects within the site.',
    detail: 'Utilized React Router hook states, theme providers, and Framer Motion layout transitions.'
  }
];


const Achievements = () => {
  const theme = useTheme();

  return (
    <Box id="achievements" sx={{ py: 10, position: 'relative', overflow: 'hidden' }}>
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
          Achievements & Badges
        </Typography>
        <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, maxWidth: 600, mx: 'auto', px: 2 }}>
          Highlighting key projects, study milestones, and architectural integrations completed.
        </Typography>
      </Box>

      {/* Grid */}
      <Grid container spacing={4} sx={{ px: { xs: 1, sm: 2 } }}>
        {achievementsList.map((item, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <TiltCard maxTilt={10} sx={{ height: '100%' }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 1.5,
                  borderRadius: '30px',
                  background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(20, 20, 25, 0.35)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  border: `1.5px solid ${alpha(item.color, theme.palette.mode === 'light' ? 0.35 : 0.25)}`,
                  boxShadow: theme.palette.mode === 'light'
                    ? `0 15px 30px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.8)`
                    : `0 20px 40px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.03)`,
                  transition: 'border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease',
                  transformStyle: 'preserve-3d',
                  '&:hover': {
                    background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(25, 25, 30, 0.55)',
                    borderColor: item.color,
                    boxShadow: `0 30px 60px rgba(0, 0, 0, 0.5), 0 0 25px ${alpha(item.color, 0.35)}`,
                    '& .badge-medal': {
                      transform: 'translateZ(30px) scale(1.1) rotate(8deg)',
                      color: '#ffffff',
                      background: `linear-gradient(135deg, ${item.color} 0%, ${alpha(item.color, 0.6)} 100%)`,
                      boxShadow: `0 0 20px ${alpha(item.color, 0.55)}`,
                    },
                    '& .card-content-area': {
                      transform: 'translateZ(15px)'
                    }
                  }
                }}
              >
                <CardContent 
                  className="card-content-area"
                  sx={{ 
                    p: 3, 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Badge Medal Circle */}
                  <Box
                    className="badge-medal"
                    sx={{
                      color: item.color,
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '50%',
                      background: alpha(item.color, 0.08),
                      border: `2.5px solid ${alpha(item.color, 0.35)}`,
                      width: 'fit-content',
                      mb: 3,
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* Tag Label */}
                  <Typography
                    variant="caption"
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '50px',
                      bgcolor: alpha(item.color, 0.1),
                      color: item.color,
                      fontWeight: 900,
                      fontSize: '0.65rem',
                      letterSpacing: '1px',
                      fontFamily: '"Outfit", sans-serif',
                      textTransform: 'uppercase',
                      border: `1px solid ${alpha(item.color, 0.25)}`,
                      mb: 2,
                      display: 'inline-block',
                      width: 'fit-content'
                    }}
                  >
                    {item.badge}
                  </Typography>

                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 900,
                      color: theme.palette.text.primary,
                      fontFamily: '"Outfit", sans-serif',
                      mb: 1.5,
                      fontSize: '1.25rem',
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                      fontFamily: '"Inter", sans-serif',
                      mb: 2.5,
                      flexGrow: 1
                    }}
                  >
                    {item.description}
                  </Typography>

                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.015)' : 'rgba(255, 255, 255, 0.01)',
                      borderRadius: '12px',
                      borderLeft: `2.5px solid ${item.color}`,
                      mt: 'auto'
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.55)' : 'rgba(255, 255, 255, 0.5)',
                        fontWeight: 550,
                        lineHeight: 1.4,
                        display: 'block',
                        fontFamily: '"Inter", sans-serif'
                      }}
                    >
                      {item.detail}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </TiltCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Achievements;
