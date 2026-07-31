import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, useTheme, alpha, useMediaQuery, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import TiltCard from './TiltCard';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ConstructionIcon from '@mui/icons-material/Construction';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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

function ServicesCarousel({ items, activeIndex, setActiveIndex }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance interval
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % items.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHovered, items.length, setActiveIndex]);

  // Helper to map index to shortest path [-1, 0, 1, 2] for circular movement
  const getDiff = (idx) => {
    const N = items.length;
    const rawDiff = idx - activeIndex;
    let diff = rawDiff;
    while (diff < -1) diff += N;
    while (diff > 2) diff -= N;
    return diff;
  };

  const getCardStyles = (diff, isMobileDevice) => {
    if (diff === 0) {
      return {
        x: '0%',
        scale: 1,
        opacity: 1,
        zIndex: 3,
        rotateY: 0,
        pointerEvents: 'auto',
      };
    } else if (diff === 1) {
      return {
        x: isMobileDevice ? '110%' : '105%',
        scale: isMobileDevice ? 0.75 : 0.82,
        opacity: isMobileDevice ? 0 : 0.28,
        zIndex: 2,
        rotateY: isMobileDevice ? 0 : -15,
        pointerEvents: 'none',
      };
    } else if (diff === -1) {
      return {
        x: isMobileDevice ? '-110%' : '-105%',
        scale: isMobileDevice ? 0.75 : 0.82,
        opacity: isMobileDevice ? 0 : 0.28,
        zIndex: 2,
        rotateY: isMobileDevice ? 0 : 15,
        pointerEvents: 'none',
      };
    } else {
      return {
        x: diff > 0 ? '200%' : '-200%',
        scale: 0.65,
        opacity: 0,
        zIndex: 1,
        rotateY: 0,
        pointerEvents: 'none',
      };
    }
  };

  const transition = {
    type: 'spring',
    stiffness: 120,
    damping: 14,
    mass: 0.8
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '700px',
        mx: 'auto',
        height: { xs: '450px', sm: '380px', md: '400px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: 1200,
        overflow: 'visible',
      }}
    >
      {/* Navigation Arrows */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: { xs: '-10px', sm: '-70px', md: '-100px' },
          border: `1.5px solid ${alpha(theme.palette.primary.main, 0.4)}`,
          color: 'primary.main',
          background: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(9,9,11,0.6)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          p: 1.5,
          zIndex: 10,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            borderColor: 'primary.main',
            background: alpha(theme.palette.primary.main, 0.1),
            transform: 'scale(1.1)',
            boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.3)}`,
          }
        }}
      >
        <ChevronLeftIcon sx={{ fontSize: 24 }} />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: { xs: '-10px', sm: '-70px', md: '-100px' },
          border: `1.5px solid ${alpha(theme.palette.primary.main, 0.4)}`,
          color: 'primary.main',
          background: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(9,9,11,0.6)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          p: 1.5,
          zIndex: 10,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            borderColor: 'primary.main',
            background: alpha(theme.palette.primary.main, 0.1),
            transform: 'scale(1.1)',
            boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.3)}`,
          }
        }}
      >
        <ChevronRightIcon sx={{ fontSize: 24 }} />
      </IconButton>

      {/* Cards Stack */}
      {items.map((service, idx) => {
        const diff = getDiff(idx);
        const styles = getCardStyles(diff, isMobile);

        return (
          <Box
            key={idx}
            component={motion.div}
            animate={styles}
            transition={transition}
            sx={{
              position: 'absolute',
              width: { xs: '290px', sm: '360px', md: '440px' },
              height: '100%',
              transformStyle: 'preserve-3d',
            }}
          >
            <TiltCard maxTilt={diff === 0 ? 8 : 0} sx={{ height: '100%' }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 1.5,
                  borderRadius: '12px',
                  background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(20, 20, 25, 0.35)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  border: `1px solid ${alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.22 : 0.15)}`,
                  boxShadow: theme.palette.mode === 'light'
                    ? '0 15px 30px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.8)'
                    : '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.03)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  transformStyle: 'preserve-3d',
                  '&:hover': {
                    background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(25, 25, 30, 0.55)',
                    borderColor: 'primary.main',
                    boxShadow: theme.palette.mode === 'light'
                      ? `0 25px 50px rgba(0, 0, 0, 0.08), 0 0 20px ${alpha(theme.palette.primary.main, 0.25)}`
                      : `0 30px 60px rgba(0, 0, 0, 0.45), 0 0 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                    '& .srv-icon': {
                      transform: 'scale(1.15) rotate(5deg) translateZ(30px)',
                      color: '#ffffff',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.4)}`,
                      borderColor: 'primary.main'
                    }
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, md: 4 }, flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', transformStyle: 'preserve-3d' }}>
                  <Box sx={{
                    position: 'absolute',
                    top: '-15%',
                    right: '-15%',
                    width: '120px',
                    height: '120px',
                    background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
                    filter: 'blur(10px)',
                    pointerEvents: 'none',
                    transform: 'translateZ(10px)'
                  }} />

                  <Box
                    className="srv-icon"
                    sx={{
                      color: 'primary.main',
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '12px',
                      background: alpha(theme.palette.primary.main, 0.08),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      width: 'fit-content',
                      mb: { xs: 2, md: 3 },
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: 'translateZ(25px)'
                    }}
                  >
                    {service.icon}
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{
                      color: 'secondary.main',
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      mb: 1,
                      display: 'block',
                      fontFamily: '"Outfit", sans-serif',
                      transform: 'translateZ(15px)'
                    }}
                  >
                    {service.subtitle}
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 900,
                      color: theme.palette.text.primary,
                      fontFamily: '"Outfit", sans-serif',
                      lineHeight: 1.2,
                      transform: 'translateZ(20px)',
                      fontSize: { xs: '1.35rem', md: '1.6rem' },
                      mb: { xs: 1.5, md: 2 }
                    }}
                  >
                    {service.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontFamily: '"Inter", sans-serif',
                      fontSize: { xs: '0.82rem', md: '0.9rem' },
                      lineHeight: 1.6,
                      transform: 'translateZ(15px)',
                      mb: { xs: 2, md: 3 },
                      maxWidth: '90%',
                      mx: 'auto'
                    }}
                  >
                    {service.description}
                  </Typography>

                  {/* Tech Badges */}
                  <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 1,
                    transform: 'translateZ(10px)'
                  }}>
                    {service.techs.map((tech, tIdx) => (
                      <Typography
                        key={tIdx}
                        variant="caption"
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '50px',
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                          background: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
                          color: theme.palette.text.secondary,
                          fontWeight: 600,
                          fontSize: '0.72rem',
                          fontFamily: '"Outfit", sans-serif'
                        }}
                      >
                        {tech}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </TiltCard>
          </Box>
        );
      })}
    </Box>
  );
}

const Services = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box
      id="services"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: { xs: 8, md: 0 },
        position: 'relative',
        background: 'transparent',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center' }}>
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
      </Container>

      {/* Services Carousel */}
      <Box sx={{ width: '100%', maxWidth: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ServicesCarousel items={servicesList} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

        {/* Carousel Indicators */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1.5,
          mt: 4,
          zIndex: 5
        }}>
          {servicesList.map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <Box
                key={idx}
                onClick={() => setActiveIndex(idx)}
                sx={{
                  width: isActive ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: isActive
                    ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                    : alpha(theme.palette.text.secondary, 0.3),
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    background: isActive
                      ? undefined
                      : alpha(theme.palette.primary.main, 0.6)
                  }
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Services;
