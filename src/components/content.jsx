import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Button, IconButton, Card, useTheme, useMediaQuery, alpha, Snackbar, Alert } from '@mui/material';
import HeroBackground from './HeroBackground';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import projects from "../data/projects.json";
import { TypeAnimation } from 'react-type-animation';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate, easeInOut, useMotionValue, useSpring } from 'framer-motion';

import { stacks } from '../data/stacks';

import { TechStacks } from './TechStacks';
import Services from './Services';
import TiltCard from './TiltCard';

function ProjectsCarousel({ items, activeIndex, setActiveIndex }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance interval (2 seconds)
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % items.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHovered, items.length, setActiveIndex]);

  // Helper to map index to shortest path [-1, 0, 1] for circular movement
  const getDiff = (idx) => {
    const N = items.length;
    const rawDiff = idx - activeIndex;
    let diff = rawDiff;
    while (diff < -1) diff += N;
    while (diff > 1) diff -= N;
    return diff;
  };

  const getCardStyles = (diff, isMobileDevice, isTabletDevice) => {
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
        x: isMobileDevice ? '110%' : (isTabletDevice ? '460px' : '620px'),
        scale: isMobileDevice ? 0.75 : 0.82,
        opacity: isMobileDevice ? 0 : 0.28,
        zIndex: 2,
        rotateY: isMobileDevice ? 0 : -15,
        pointerEvents: 'none',
      };
    } else if (diff === -1) {
      return {
        x: isMobileDevice ? '-110%' : (isTabletDevice ? '-460px' : '-620px'),
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
        maxWidth: '800px',
        mx: 'auto',
        height: { xs: '390px', sm: '315px', md: '405px' },
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

      {/* Project Cards Stack */}
      {items.map((project, idx) => {
        const diff = getDiff(idx);
        const styles = getCardStyles(diff, isMobile, isTablet);

        return (
          <Box
            key={idx}
            component={motion.div}
            animate={styles}
            transition={transition}
            sx={{
              position: 'absolute',
              width: { xs: '290px', sm: '560px', md: '720px' },
              height: '100%',
              transformStyle: 'preserve-3d',
            }}
          >
            <TiltCard maxTilt={diff === 0 ? 5 : 0} sx={{ height: '100%' }}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-start',
                  p: { xs: 2.5, sm: 4, md: 5 },
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.55)' : 'rgba(20, 20, 25, 0.15)',
                  backdropFilter: 'blur(35px)',
                  WebkitBackdropFilter: 'blur(35px)',
                  border: `1.5px solid ${alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.25 : 0.35)}`,
                  boxShadow: theme.palette.mode === 'light'
                    ? `0 25px 60px rgba(0, 0, 0, 0.06), 0 0 30px ${alpha(theme.palette.primary.main, 0.15)}, inset 0 1px 1px rgba(255, 255, 255, 0.8)`
                    : `0 40px 100px rgba(0, 0, 0, 0.5), 0 0 30px ${alpha(theme.palette.primary.main, 0.25)}, inset 0 1px 1px rgba(255, 255, 255, 0.05)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Project Image Background */}
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${project.project_thumb})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 0,
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }} />

                {/* Dark Gradient Overlay */}
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: theme.palette.mode === 'light'
                    ? 'linear-gradient(to top, rgba(250,250,250,0.98) 0%, rgba(250,250,250,0.65) 50%, rgba(250,250,250,0.2) 100%)'
                    : 'linear-gradient(to top, rgba(9,9,11,0.96) 0%, rgba(9,9,11,0.65) 50%, rgba(9,9,11,0.25) 100%)',
                  zIndex: 1,
                }} />

                {/* Content Block */}
                <Box sx={{
                  position: 'relative',
                  zIndex: 2,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transform: 'translateZ(30px)',
                  transformStyle: 'preserve-3d',
                }}>
                  <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: 3, mb: 0.5, display: 'block' }}>
                    FEATURED PROJECT
                  </Typography>
                  <Typography variant="h3" sx={{
                    color: theme.palette.text.primary,
                    mb: 1.5,
                    fontWeight: 900,
                    fontFamily: '"Outfit", sans-serif',
                    letterSpacing: '-0.5px',
                    fontSize: { xs: '1.35rem', sm: '1.8rem', md: '2.1rem' }
                  }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body1" sx={{
                    color: theme.palette.text.secondary,
                    mb: 2.5,
                    lineHeight: 1.6,
                    fontWeight: 450,
                    fontSize: { xs: '0.82rem', md: '0.92rem' }
                  }}>
                    {project.description}
                  </Typography>

                  {/* Project Tags */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {project.tags?.map((tag, tIdx) => (
                      <Typography
                        key={tIdx}
                        variant="caption"
                        sx={{
                          px: 1.2,
                          py: 0.4,
                          borderRadius: '50px',
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                          background: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(9,9,11,0.5)',
                          color: 'primary.main',
                          fontWeight: 700,
                          fontSize: '0.7rem',
                          fontFamily: '"Outfit", sans-serif'
                        }}
                      >
                        {tag}
                      </Typography>
                    ))}
                  </Box>

                  <Button
                    component={isMobile ? 'a' : Link}
                    to={isMobile ? undefined : `?preview=${encodeURIComponent(project.link)}&title=${encodeURIComponent(project.title)}`}
                    href={isMobile ? project.link : undefined}
                    target={isMobile ? '_blank' : undefined}
                    rel={isMobile ? 'noopener noreferrer' : undefined}
                    variant="contained"
                    sx={{
                      py: { xs: 1, sm: 1.4 },
                      borderRadius: 100,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      fontWeight: 800,
                      fontSize: { xs: '0.82rem', sm: '0.9rem' },
                      boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
                      width: 'fit-content',
                      px: 4,
                      '&:hover': {
                        background: `linear-gradient(45deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                        boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.55)}`,
                      }
                    }}
                  >
                    Open Project
                  </Button>
                </Box>
              </Card>
            </TiltCard>
          </Box>
        );
      })}
    </Box>
  );
}

function Content() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFbAlert, setOpenFbAlert] = useState(false);

  const { scrollY } = useScroll();
  const contentOpacityValue = useTransform(scrollY, [0, 400], [1, 0.5], { ease: easeInOut });
  const heroY = useTransform(scrollY, [0, 600], [0, -90]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const titleScale = useTransform(scrollY, [0, 600], [1, 0.92]);

  // Motion values for smooth 3D mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 90, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 22 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const xNorm = (e.clientX / window.innerWidth) - 0.5;
      const yNorm = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(xNorm);
      mouseY.set(yNorm);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // 3D displacement vectors (floating close to the screen)
  const textParallaxX = useTransform(springX, (v) => v * 40);
  const textParallaxY = useTransform(springY, (v) => v * 40);
  const textRotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const textRotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  // Combined vertical scroll + mouse movement
  const heroTextY = useTransform([heroY, textParallaxY], ([s, m]) => s + m);

  // 3D scroll zoom-in settings for other sections
  const techStacksScale = useTransform(scrollY, [150, 500], [0.92, 1.0]);
  const techStacksOpacity = useTransform(scrollY, [150, 400], [0.3, 1.0]);
  const techStacksRotateX = useTransform(scrollY, [150, 500], [8, 0]);

  const servicesScale = useTransform(scrollY, [450, 850], [0.92, 1.0]);
  const servicesOpacity = useTransform(scrollY, [450, 750], [0.3, 1.0]);
  const servicesRotateX = useTransform(scrollY, [450, 850], [8, 0]);



  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box id="home" sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: '120px', md: '140px' },
        pb: { xs: '60px', md: '80px' },
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent'
      }}>
        <HeroBackground />
        <Container disableGutters sx={{ position: 'relative', zIndex: 1, width: { xs: '94%', md: '88%' }, maxWidth: '1300px !important' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ 
              y: heroTextY, 
              x: textParallaxX, 
              rotateX: textRotateX, 
              rotateY: textRotateY, 
              opacity: heroOpacity, 
              scale: titleScale, 
              transformStyle: 'preserve-3d',
              perspective: 1000 
            }}
          >
            <style>{`
              @keyframes gradientShift {
                0% { background-position: 0% 50% }
                50% { background-position: 100% 50% }
                100% { background-position: 0% 50% }
              }
              @keyframes floatAnimation {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-10px) rotate(1deg); }
              }
            `}</style>

            <Grid container spacing={{ xs: 6, md: 6 }} direction="column" alignItems="center" justifyContent="center" sx={{ py: { xs: 2, md: 4 } }}>
              {/* Text Column: Brand, Badges, Buttons, Socials */}
              <Grid item xs={12} md={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

                <Typography variant="h1" sx={{
                  fontSize: { xs: '3.5rem', sm: '5rem', md: '8rem' },
                  lineHeight: 0.9,
                  fontWeight: 950,
                  fontFamily: '"Outfit", sans-serif',
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                  mb: 3,
                  background: (theme) => `linear-gradient(270deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.6)}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  backgroundSize: '400% 400%',
                  animation: 'gradientShift 15s ease infinite',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: (theme) => `drop-shadow(0 4px 20px ${alpha(theme.palette.primary.main, 0.15)})`
                }}>
                  <TypeAnimation
                    sequence={['KRIX', 1000]}
                    wrapper="span"
                    speed={8}
                    cursor={false}
                  />
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap', mb: 5 }}>
                  {/* Web Developing Box */}
                  <Typography variant="body2" sx={{
                    color: '#ffffff',
                    fontWeight: 800,
                    px: 3, py: 1,
                    borderRadius: '50px',
                    background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                    boxShadow: (theme) => `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
                    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                    fontSize: { xs: '0.8rem', md: '0.9rem' },
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    fontFamily: '"Outfit", sans-serif',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}>
                    Web Developer
                  </Typography>

                  {/* Normal Ampersand */}
                  <Typography variant="body2" sx={{
                    color: alpha(theme.palette.text.secondary, 0.5),
                    fontWeight: 800,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    fontFamily: '"Outfit", sans-serif',
                  }}>
                    &
                  </Typography>

                  {/* UI Designing Box */}
                  <Typography variant="body2" sx={{
                    color: '#ffffff',
                    fontWeight: 800,
                    px: 3, py: 1,
                    borderRadius: '50px',
                    background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                    boxShadow: (theme) => `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
                    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                    fontSize: { xs: '0.8rem', md: '0.9rem' },
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    fontFamily: '"Outfit", sans-serif',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}>
                   Designer
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2.5, flexWrap: 'wrap', mb: 8 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    href="#projects"
                    sx={{
                      px: { xs: 4, sm: 6 }, py: { xs: 1.5, sm: 2 },
                      borderRadius: 100,
                      fontSize: { xs: '0.95rem', sm: '1.05rem' },
                      fontWeight: 800,
                      letterSpacing: '0.5px',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.45)}`,
                      color: '#ffffff',
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                        transform: 'translateY(-3px) scale(1.03)',
                        boxShadow: `0 16px 45px ${alpha(theme.palette.primary.main, 0.65)}`,
                      },
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    View My Work
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<SendIcon />}
                    component={Link}
                    to="/contact"
                    sx={{
                      px: { xs: 4, sm: 6 }, py: { xs: 1.5, sm: 2 },
                      borderRadius: 100,
                      fontSize: { xs: '0.95rem', sm: '1.05rem' },
                      fontWeight: 700,
                      letterSpacing: '0.5px',
                      borderWidth: 2,
                      borderColor: (theme) => alpha(theme.palette.primary.main, 0.4),
                      background: 'rgba(255, 255, 255, 0.02)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      color: '#ffffff',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                        borderWidth: 2,
                        transform: 'translateY(-3px) scale(1.03)',
                        boxShadow: (theme) => `0 12px 30px ${alpha(theme.palette.primary.main, 0.2)}`,
                      },
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    Get in Touch
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  {[
                    { icon: <InstagramIcon />, href: 'https://www.instagram.com/madebykrix/', onClick: null },
                    { icon: <FacebookIcon />, href: '#', onClick: (e) => { e.preventDefault(); setOpenFbAlert(true); } },
                  ].map((s, i) => (
                    <IconButton key={i} href={s.onClick ? undefined : s.href} onClick={s.onClick || undefined} target={s.onClick ? undefined : '_blank'} sx={(theme) => ({
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                      borderRadius: '50%',
                      color: alpha(theme.palette.text.secondary, 0.7),
                      p: 1.5,
                      background: 'rgba(255, 255, 255, 0.01)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        color: '#ffffff',
                        transform: 'translateY(-4px) scale(1.08)',
                        background: alpha(theme.palette.primary.main, 0.12),
                        boxShadow: `0 10px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
                      },
                    })}>
                      {s.icon}
                    </IconButton>
                  ))}
                </Box>
              </Grid>


            </Grid>
          </motion.div>
        </Container>
      </Box>

      <Box
        component={motion.div}
        style={{
          scale: techStacksScale,
          opacity: techStacksOpacity,
          rotateX: techStacksRotateX,
          transformStyle: 'preserve-3d',
          perspective: 1000
        }}
        id="tech-stacks"
      >
        <TechStacks />
      </Box>

      <Box
        component={motion.div}
        style={{
          scale: servicesScale,
          opacity: servicesOpacity,
          rotateX: servicesRotateX,
          transformStyle: 'preserve-3d',
          perspective: 1000
        }}
      >
        <Services />
      </Box>

      {/* Featured Projects Section */}
      <Box
        id="projects"
        sx={{
          py: 15,
          backgroundColor: 'transparent',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container
          maxWidth="lg"
          component={motion.div}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          sx={{ position: 'relative', zIndex: 1 }}
        >
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant="h2" sx={{
              fontWeight: 950,
              fontFamily: '"Outfit", sans-serif',
              letterSpacing: -1.5,
              mb: 2,
              background: (theme) => `linear-gradient(270deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.6)}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              backgroundSize: '400% 400%',
              animation: 'gradientShift 8s ease infinite',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Featured Projects
            </Typography>
            <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
              A handpicked showcase of my latest engineering achievements
            </Typography>
          </Box>

          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ProjectsCarousel items={projects} activeIndex={currentSlide} setActiveIndex={setCurrentSlide} />

            {/* Carousel Indicators */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1.5,
              mt: 4,
              zIndex: 5
            }}>
              {projects.map((_, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <Box
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
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
        </Container>
      </Box>

      <Snackbar
        open={openFbAlert}
        autoHideDuration={4000}
        onClose={() => setOpenFbAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenFbAlert(false)}
          severity="error"
          variant="filled"
          sx={{
            bgcolor: '#ef4444',
            color: '#ffffff',
            borderRadius: '12px',
            fontWeight: 600,
            fontFamily: '"Outfit", sans-serif',
            boxShadow: '0 8px 30px rgba(239, 68, 68, 0.35)',
          }}
        >
          Facebook is temporarily unavailable. Please try again later.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Content;