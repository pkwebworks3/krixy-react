import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Button, IconButton, Card, useTheme, useMediaQuery, alpha } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import projects from "../data/projects.json";
import { TypeAnimation } from 'react-type-animation';
import { motion, AnimatePresence } from 'framer-motion';

import ParticleCanvas from './ParticleCanvas';


import { stacks } from '../data/stacks';

import { TechStacks } from './TechStacks';

function Content() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mousePosProj, setMousePosProj] = useState({ x: -1000, y: -1000 });

  const handleMouseMoveProjects = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosProj({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeaveProjects = () => {
    setMousePosProj({ x: -1000, y: -1000 });
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box id="home" sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: '100px', md: '120px' }, // Increased padding for both mobile and PC
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.secondary.main, 0.06)} 50%, ${theme.palette.background.default} 100%)`
      }}>
        <ParticleCanvas isMobile={isMobile} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <style>{`@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}`}</style>
            
            <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center" sx={{ py: { xs: 4, md: 8 } }}>
              {/* Left Column: Brand, Badges, Buttons, Socials */}
              <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } }}>


              <Typography variant="h1" sx={{
                fontSize: { xs: '4.5rem', md: '7rem' },
                lineHeight: 0.95,
                fontWeight: 950,
                fontFamily: '"Outfit", sans-serif',
                letterSpacing: '-0.02em',
                mb: 2,
                background: `linear-gradient(270deg, #ff6b00, #ff9f43, #ea580c, #ff6b00)`,
                backgroundSize: '400% 400%',
                animation: 'gradientShift 8s ease infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                <TypeAnimation
                  sequence={['krix', 1000]}
                  wrapper="span"
                  speed={20}
                  cursor={true}
                />
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap', mb: 4 }}>
                {/* Web Developing Box */}
                <Typography variant="body2" sx={{
                  color: '#ffffff',
                  fontWeight: 800,
                  px: 2.5, py: 0.8,
                  borderRadius: '50px',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.25)}`,
                  border: `1px solid rgba(255, 255, 255, 0.15)`,
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  fontFamily: '"Outfit", sans-serif',
                }}>
                  Web Developing
                </Typography>

                {/* Normal Ampersand */}
                <Typography variant="body2" sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 800,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  fontFamily: '"Outfit", sans-serif',
                }}>
                  &
                </Typography>

                {/* UI Designing Box */}
                <Typography variant="body2" sx={{
                  color: '#ffffff',
                  fontWeight: 800,
                  px: 2.5, py: 0.8,
                  borderRadius: '50px',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.25)}`,
                  border: `1px solid rgba(255, 255, 255, 0.15)`,
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  fontFamily: '"Outfit", sans-serif',
                }}>
                  UI Designing
                </Typography>

                {/* Normal Company Text */}
                <Typography variant="body2" sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 800,
                  fontSize: { xs: '0.85rem', md: '0.95rem' },
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  fontFamily: '"Outfit", sans-serif',
                }}>
                  Company
                </Typography>
              </Box>


              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2.5, flexWrap: 'wrap', mb: 8 }}>
                <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} href="#projects" sx={{
                  px: 5, py: 1.6,
                  borderRadius: 8,
                  fontSize: '1rem',
                  fontWeight: 700,
                  bgcolor: theme.palette.primary.main,
                  '&:hover': { bgcolor: theme.palette.secondary.main },
                  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
                }}>
                  View My Work
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<SendIcon />}
                  component={Link}
                  to="/contact"
                  sx={{
                    px: 5, py: 1.6,
                    borderRadius: 8,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderWidth: 2,
                    borderColor: alpha(theme.palette.primary.main, 0.4),
                    color: theme.palette.primary.main,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: alpha(theme.palette.primary.main, 0.06),
                      borderWidth: 2
                    },
                  }}>
                  Get in Touch
                </Button>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                {[
                  { icon: <InstagramIcon />, href: 'https://www.instagram.com/kirubha.exe/' },
                  { icon: <FacebookIcon />, href: '#' },
                  { icon: <GitHubIcon />, href: 'https://github.com/pkwebworks3' },
                ].map((s, i) => (
                  <IconButton key={i} href={s.href} target="_blank" sx={{
                    border: `1px solid ${alpha(theme.palette.text.secondary, 0.12)}`,
                    borderRadius: '50%',
                    color: alpha(theme.palette.text.secondary, 0.6),
                    p: 1.3,
                    transition: 'all 0.3s',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      transform: 'translateY(-3px)',
                      bgcolor: alpha(theme.palette.primary.main, 0.06),
                      boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.15)}`,
                    },
                  }}>
                    {s.icon}
                  </IconButton>
                ))}
              </Box>
            </Grid>

              {/* Right Column: Hero Logo with glowing background */}
              <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                    style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    {/* Glowing Animated Gradient Background behind the logo */}
                    <Box
                      sx={{
                        position: 'absolute',
                        width: { xs: 180, md: 240 },
                        height: { xs: 180, md: 240 },
                        borderRadius: '50%',
                        background: 'linear-gradient(45deg, #ff6b00, #ea580c, #ff9f43, #ff6b00)',
                        backgroundSize: '200% 200%',
                        filter: 'blur(45px)',
                        zIndex: 0,
                        animation: 'auroraGlow 6s ease infinite alternate',
                        '@keyframes auroraGlow': {
                          '0%': {
                            transform: 'rotate(0deg) scale(0.9)',
                            backgroundPosition: '0% 50%',
                            opacity: 0.75,
                          },
                          '50%': {
                            transform: 'rotate(180deg) scale(1.1)',
                            backgroundPosition: '100% 50%',
                            opacity: 0.95,
                          },
                          '100%': {
                            transform: 'rotate(360deg) scale(0.9)',
                            backgroundPosition: '0% 50%',
                            opacity: 0.75,
                          }
                        }
                      }}
                    />

                    <Box
                      component="img"
                      src="1x/hero_logo.png"
                      alt="Logo"
                      sx={{
                        width: { xs: 220, md: 300 },
                        height: { xs: 220, md: 300 },
                        objectFit: 'contain',
                        position: 'relative',
                        zIndex: 1,
                        filter: `drop-shadow(0 20px 40px ${alpha(theme.palette.primary.main, 0.4)})`,
                      }}
                    />

                    {/* Beta Badge Overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: { xs: 10, md: 15 },
                        right: { xs: 10, md: 15 },
                        zIndex: 2,
                        background: 'linear-gradient(135deg, #ff6b00, #ea580c)',
                        color: '#ffffff',
                        fontSize: { xs: '0.6rem', md: '0.75rem' },
                        fontWeight: 900,
                        px: 1.8,
                        py: 0.5,
                        borderRadius: '20px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        boxShadow: `0 8px 20px ${alpha('#ff6b00', 0.4)}, inset 0 2px 4px rgba(255, 255, 255, 0.3)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: '"Outfit", sans-serif',
                        transform: 'rotate(5deg)',
                        pointerEvents: 'none',
                        animation: 'pulseBeta 2s ease infinite alternate',
                        '@keyframes pulseBeta': {
                          '0%': {
                            transform: 'rotate(5deg) scale(0.92)',
                            boxShadow: `0 6px 14px ${alpha('#ff6b00', 0.35)}, inset 0 2px 4px rgba(255, 255, 255, 0.3)`,
                          },
                          '100%': {
                            transform: 'rotate(5deg) scale(1.08)',
                            boxShadow: `0 12px 24px ${alpha('#ff6b00', 0.7)}, inset 0 2px 4px rgba(255, 255, 255, 0.5)`,
                          }
                        }
                      }}
                    >
                      Beta
                    </Box>
                  </motion.div>
                </Box>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Featured Projects Section */}
      <Box
        id="projects"
        onMouseMove={handleMouseMoveProjects}
        onMouseLeave={handleMouseLeaveProjects}
        sx={{
          py: 10,
          backgroundColor: theme.palette.background.paper,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: `radial-gradient(circle 600px at ${mousePosProj.x}px ${mousePosProj.y}px, ${alpha(theme.palette.primary.main, 0.15)}, transparent 80%)`,
            pointerEvents: 'none',
            zIndex: 0,
            transition: 'opacity 0.3s ease',
            opacity: mousePosProj.x === -1000 ? 0 : 1,
          }
        }}
      >
        <Container
          maxWidth="lg"
          component={motion.div}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          sx={{ position: 'relative', zIndex: 1 }}
        >
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant="h2" sx={{
              fontWeight: 950,
              fontFamily: '"Outfit", sans-serif',
              letterSpacing: -1,
              mb: 2,
              background: `linear-gradient(270deg, #ff6b00, #ff9f43, #ea580c, #ff6b00)`,
              backgroundSize: '400% 400%',
              animation: 'gradientShift 8s ease infinite',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Featured Projects
            </Typography>
            <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
              A selection of recent work
            </Typography>
          </Box>

          <Card sx={{
            minHeight: { xs: 400, md: 600 },
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            p: { xs: 2, md: 6 },
            borderRadius: 5,
            overflow: 'hidden',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.4 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              >
                <Box sx={{
                  width: '100%', height: '100%',
                  backgroundImage: `url(${projects[currentSlide]?.project_thumb})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} />
                <Box sx={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 100%)',
                }} />
              </motion.div>
            </AnimatePresence>

            <Box sx={{
              position: 'relative', zIndex: 1,
              width: '100%',
              maxWidth: { md: 520 },
              p: { xs: 3, md: 5 },
              borderRadius: 3,
              background: { md: alpha(theme.palette.background.paper, 0.1) },
              backdropFilter: { md: 'blur(16px)' },
              WebkitBackdropFilter: { md: 'blur(16px)' },
              border: { md: `1px solid ${alpha(theme.palette.common.white, 0.12)}` },
              boxShadow: { md: `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}` },
            }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography variant="h4" sx={{ color: '#fff', mb: 1, fontWeight: 600 }}>
                    {projects[currentSlide]?.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', mb: 3, lineHeight: 1.6 }}>
                    {projects[currentSlide]?.description}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <IconButton onClick={prevSlide} sx={{
                      border: '1px solid rgba(255,255,255,0.4)',
                      color: '#fff',
                      borderRadius: 2,
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                    }}>
                      <ChevronLeftIcon />
                    </IconButton>
                    <Button variant="contained" href={projects[currentSlide]?.link} sx={{ flex: 1 }}>
                      Open Project
                    </Button>
                    <IconButton onClick={nextSlide} sx={{
                      border: '1px solid rgba(255,255,255,0.4)',
                      color: '#fff',
                      borderRadius: 2,
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                    }}>
                      <ChevronRightIcon />
                    </IconButton>
                  </Box>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Card>
        </Container>
      </Box>
      <TechStacks />
    </Box>
  );
}

export default Content;