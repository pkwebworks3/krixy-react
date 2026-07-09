import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ConstructionIcon from '@mui/icons-material/Construction';

const servicesList = [
  {
    title: 'Frontend Development',
    subtitle: 'Code Craftsmanship',
    icon: <DeveloperModeIcon sx={{ fontSize: 40 }} />,
    description: 'Building clean, scalable web applications using React, Vite, and JavaScript. Focused on optimized performance, structured component design, and semantic HTML5/CSS3 standards.',
    techs: ['React', 'ES6 JS', 'Vite', 'HTML5/CSS3']
  },
  {
    title: 'Responsive UI/UX Design',
    subtitle: 'Adaptive Layouts',
    icon: <AspectRatioIcon sx={{ fontSize: 40 }} />,
    description: 'Designing interfaces that automatically adjust and feel premium on any device, from standard mobile screens up to widescreen 4K monitors. Prioritizing accessibility and user flow.',
    techs: ['Material UI', 'Flexbox/Grid', 'Media Queries', 'MUI Theme']
  },
  {
    title: 'Creative Web Animations',
    subtitle: 'Fluid Interactions',
    icon: <AutoAwesomeIcon sx={{ fontSize: 40 }} />,
    description: 'Crafting fluid page transitions, scroll-linked animations, hovering effects, and micro-interactions that engage users and make websites feel alive and professional.',
    techs: ['Framer Motion', 'CSS Keyframes', 'MUI Transitions']
  },
  {
    title: 'Interactive Utility Apps',
    subtitle: 'Functional Solutions',
    icon: <ConstructionIcon sx={{ fontSize: 40 }} />,
    description: 'Creating customized web tools, games, and applications like calculator systems, note checklists, comic readers, and quizzes with local storage integration.',
    techs: ['State Management', 'LocalStorage', 'Canvas API']
  }
];

const Services = () => {
  const theme = useTheme();

  return (
    <Box 
      id="services"
      sx={{ 
        py: { xs: 10, md: 15 }, 
        position: 'relative',
        background: 'transparent',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ mb: 10, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" sx={{
              fontWeight: 950,
              fontFamily: '"Outfit", sans-serif',
              letterSpacing: -1.5,
              mb: 2,
              background: `linear-gradient(270deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.6)}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              backgroundSize: '400% 400%',
              animation: 'gradientShift 8s ease infinite',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }
            }}>
              What I Offer
            </Typography>
            <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, fontWeight: 550 }}>
              The core services and design-engineering philosophies that define my work
            </Typography>
          </motion.div>
        </Box>

        {/* Services Grid */}
        <Grid container spacing={4}>
          {servicesList.map((service, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1.5,
                    borderRadius: '28px',
                    background: 'rgba(20, 20, 25, 0.35)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.03)',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      background: 'rgba(25, 25, 30, 0.55)',
                      borderColor: 'primary.main',
                      boxShadow: `0 30px 60px rgba(0, 0, 0, 0.45), 0 0 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                      '& .srv-icon': {
                        transform: 'scale(1.15) rotate(5deg)',
                        color: '#ffffff',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.4)}`,
                        borderColor: 'primary.main'
                      }
                    }
                  }}
                >
                  <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Floating Glow Indicator inside Card */}
                    <Box sx={{
                      position: 'absolute',
                      top: '-15%',
                      right: '-15%',
                      width: '80px',
                      height: '80px',
                      background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
                      filter: 'blur(10px)',
                      pointerEvents: 'none'
                    }} />

                    {/* Icon */}
                    <Box
                      className="srv-icon"
                      sx={{
                        color: 'primary.main',
                        display: 'inline-flex',
                        p: 1.8,
                        borderRadius: '16px',
                        background: alpha(theme.palette.primary.main, 0.08),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        width: 'fit-content',
                        mb: 3,
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      {service.icon}
                    </Box>

                    {/* Subtitle */}
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'secondary.main', 
                        fontWeight: 800, 
                        letterSpacing: 1.5, 
                        textTransform: 'uppercase',
                        mb: 0.5,
                        display: 'block',
                        fontFamily: '"Outfit", sans-serif'
                      }}
                    >
                      {service.subtitle}
                    </Typography>

                    {/* Title */}
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 900,
                        color: '#ffffff',
                        fontFamily: '"Outfit", sans-serif',
                        mb: 2,
                        lineHeight: 1.2
                      }}
                    >
                      {service.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                        fontFamily: '"Inter", sans-serif',
                        mb: 3,
                        flexGrow: 1
                      }}
                    >
                      {service.description}
                    </Typography>

                    {/* Technologies list */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mt: 'auto' }}>
                      {service.techs.map((tech) => (
                        <Typography
                          key={tech}
                          variant="caption"
                          sx={{
                            px: 1,
                            py: 0.3,
                            borderRadius: '6px',
                            bgcolor: 'rgba(255, 255, 255, 0.02)',
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            fontFamily: '"Outfit", sans-serif',
                            border: '1px solid rgba(255, 255, 255, 0.04)',
                          }}
                        >
                          {tech}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
