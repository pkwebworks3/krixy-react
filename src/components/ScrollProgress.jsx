import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, alpha } from '@mui/material';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const ScrollProgress = () => {
  const theme = useTheme();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Define section items dynamically depending on current page pathname
  const getSectionsForRoute = () => {
    switch (location.pathname) {
      case '/about':
        return [
          { id: 'about', label: 'About' },
          { id: 'principles', label: 'Principles' },
          { id: 'achievements', label: 'Achievements' },
          { id: 'timeline', label: 'Timeline' },
          { id: 'tech-stacks', label: 'Skills' },
          { id: 'footer', label: 'Footer' }
        ];
      case '/projects':
        return [
          { id: 'projects-page', label: 'Projects' },
          { id: 'footer', label: 'Footer' }
        ];
      case '/contact':
        return [
          { id: 'contact', label: 'Contact' },
          { id: 'footer', label: 'Footer' }
        ];
      case '/':
      default:
        return [
          { id: 'home', label: 'Home' },
          { id: 'tech-stacks', label: 'Skills' },
          { id: 'services', label: 'Services' },
          { id: 'projects', label: 'Projects' },
          { id: 'testimonials', label: 'Reviews' },
          { id: 'footer', label: 'Footer' }
        ];
    }
  };

  const sections = getSectionsForRoute();
  const trackHeight = sections.length * 36;

  // Reset active section state on page navigation
  useEffect(() => {
    if (sections.length > 0) {
      setActiveSection(sections[0].id);
    }
  }, [location.pathname]);

  // Monitor scroll progress
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Re-observe target sections when route or sections collection changes
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger when section is in the center viewport area
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [sections]);

  const handleDotClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Only display scroll progress on desktop/tablet views
  return (
    <Box
      sx={{
        position: 'fixed',
        right: { md: 24, lg: 32 },
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        pointerEvents: 'auto',
      }}
    >
      {/* 1. Vertical Progress Bar Tracker */}
      <Box
        sx={{
          position: 'relative',
          width: '3px',
          height: `${trackHeight}px`,
          bgcolor: alpha(theme.palette.text.secondary, 0.12),
          borderRadius: '10px',
          mr: 1,
          transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Glowing Active Scroll Bar */}
        <Box
          component={motion.div}
          style={{
            scaleY,
            transformOrigin: 'top',
          }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            bgcolor: theme.palette.primary.main,
            boxShadow: `0 0 10px ${theme.palette.primary.main}`,
            borderRadius: '10px',
          }}
        />
      </Box>

      {/* 2. Interactive navigation items (dots and text tooltips) */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2.2,
        }}
      >
        {sections.map((sec, idx) => {
          const isActive = activeSection === sec.id;
          const isHovered = hoveredIdx === idx;

          return (
            <Box
              key={sec.id}
              onClick={() => handleDotClick(sec.id)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                cursor: 'pointer',
                position: 'relative',
                py: 0.5,
              }}
            >
              {/* Tooltip Label */}
              <Box
                component={motion.div}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? -12 : -5,
                  scale: isHovered ? 1 : 0.8,
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                sx={{
                  position: 'absolute',
                  right: '100%',
                  bgcolor: alpha(theme.palette.background.paper, 0.85),
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                  px: 1.8,
                  py: 0.6,
                  borderRadius: '12px',
                  boxShadow: `0 6px 20px ${alpha(theme.palette.common.black, 0.15)}`,
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 800,
                    fontSize: '0.725rem',
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    fontFamily: '"Outfit", sans-serif',
                  }}
                >
                  {sec.label}
                </Typography>
              </Box>

              {/* Navigation Dot */}
              <Box
                component={motion.div}
                animate={{
                  scale: isActive ? 1.3 : isHovered ? 1.15 : 1,
                  borderColor: isActive || isHovered ? theme.palette.primary.main : alpha(theme.palette.text.secondary, 0.35),
                  backgroundColor: isActive
                    ? theme.palette.primary.main
                    : isHovered
                    ? alpha(theme.palette.primary.main, 0.25)
                    : alpha(theme.palette.background.default, 0.6),
                }}
                transition={{ duration: 0.3 }}
                sx={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  border: '2px solid',
                  boxShadow: isActive
                    ? `0 0 12px ${theme.palette.primary.main}`
                    : 'none',
                  transition: 'box-shadow 0.3s',
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ScrollProgress;

