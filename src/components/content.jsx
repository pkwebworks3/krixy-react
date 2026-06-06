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
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate, easeInOut } from 'framer-motion';

import { stacks } from '../data/stacks';

import { TechStacks } from './TechStacks';

function Content() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const { scrollY } = useScroll();
  const contentOpacityValue = useTransform(scrollY, [0, 400], [1, 0.5], { ease: easeInOut });

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
        pt: { xs: '120px', md: '140px' },
        pb: { xs: '60px', md: '80px' },
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent'
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ opacity: contentOpacityValue }}
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

            <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center" sx={{ py: { xs: 4, md: 8 } }}>
              {/* Left Column: Brand, Badges, Buttons, Socials */}
              <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } }}>

                <Typography variant="h1" sx={{
                  fontSize: { xs: '5rem', md: '8rem' },
                  lineHeight: 0.9,
                  fontWeight: 950,
                  fontFamily: '"Outfit", sans-serif',
                  letterSpacing: '-0.03em',
                  mb: 3,
                  background: `linear-gradient(270deg, #ff6b00, #ff9f43, #ea580c, #ff6b00)`,
                  backgroundSize: '400% 400%',
                  animation: 'gradientShift 6s ease infinite',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 4px 20px rgba(255, 107, 0, 0.15))'
                }}>
                  <TypeAnimation
                    sequence={['krix', 1000]}
                    wrapper="span"
                    speed={20}
                    cursor={true}
                  />
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 1.5, flexWrap: 'wrap', mb: 5 }}>
                  {/* Web Developing Box */}
                  <Typography variant="body2" sx={{
                    color: '#ffffff',
                    fontWeight: 800,
                    px: 3, py: 1,
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.2) 0%, rgba(234, 88, 12, 0.05) 100%)',
                    boxShadow: `0 8px 32px rgba(255, 107, 0, 0.15)`,
                    border: `1px solid rgba(255, 107, 0, 0.25)`,
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
                    background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.2) 0%, rgba(234, 88, 12, 0.05) 100%)',
                    boxShadow: `0 8px 32px rgba(255, 107, 0, 0.15)`,
                    border: `1px solid rgba(255, 107, 0, 0.25)`,
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

                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 2.5, flexWrap: 'wrap', mb: 8 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    href="#projects"
                    sx={{
                      px: 6, py: 2,
                      borderRadius: 100,
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      letterSpacing: '0.5px',
                      background: `linear-gradient(135deg, #ff6b00 0%, #ea580c 100%)`,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: `0 12px 35px ${alpha('#ff6b00', 0.45)}`,
                      color: '#ffffff',
                      '&:hover': {
                        background: `linear-gradient(135deg, #ea580c 0%, #ff6b00 100%)`,
                        transform: 'translateY(-3px) scale(1.03)',
                        boxShadow: `0 16px 45px ${alpha('#ff6b00', 0.65)}`,
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
                      px: 6, py: 2,
                      borderRadius: 100,
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      letterSpacing: '0.5px',
                      borderWidth: 2,
                      borderColor: 'rgba(255, 107, 0, 0.4)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      color: '#ffffff',
                      '&:hover': {
                        borderColor: '#ff6b00',
                        backgroundColor: 'rgba(255, 107, 0, 0.1)',
                        borderWidth: 2,
                        transform: 'translateY(-3px) scale(1.03)',
                        boxShadow: `0 12px 30px ${alpha('#ff6b00', 0.2)}`,
                      },
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    Get in Touch
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  {[
                    { icon: <InstagramIcon />, href: 'https://www.instagram.com/kirubha.exe/' },
                    { icon: <FacebookIcon />, href: '#' },
                    { icon: <GitHubIcon />, href: 'https://github.com/pkwebworks3' },
                  ].map((s, i) => (
                    <IconButton key={i} href={s.href} target="_blank" sx={{
                      border: `1px solid rgba(255, 107, 0, 0.15)`,
                      borderRadius: '50%',
                      color: alpha(theme.palette.text.secondary, 0.7),
                      p: 1.5,
                      background: 'rgba(255, 255, 255, 0.01)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': {
                        borderColor: '#ff6b00',
                        color: '#ffffff',
                        transform: 'translateY(-4px) scale(1.08)',
                        background: 'rgba(255, 107, 0, 0.12)',
                        boxShadow: `0 10px 24px rgba(255, 107, 0, 0.25)`,
                      },
                    }}>
                      {s.icon}
                    </IconButton>
                  ))}
                </Box>
              </Grid>

              {/* Right Column: Hero Logo with glowing background */}
              <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, alignItems: 'center' }}>
                <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
                    transition={{
                      scale: { duration: 0.6, type: "spring", stiffness: 100 },
                      y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }}
                    style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    {/* Glowing Animated Gradient Background behind the logo */}
                    <Box
                      sx={{
                        position: 'absolute',
                        width: { xs: 200, md: 280 },
                        height: { xs: 200, md: 280 },
                        borderRadius: '50%',
                        background: 'linear-gradient(45deg, #ff6b00, #ea580c, #ffaa00, #ff6b00)',
                        backgroundSize: '200% 200%',
                        filter: 'blur(60px)',
                        zIndex: 0,
                        animation: 'auroraGlow 6s ease infinite alternate',
                        '@keyframes auroraGlow': {
                          '0%': {
                            transform: 'rotate(0deg) scale(0.85)',
                            backgroundPosition: '0% 50%',
                            opacity: 0.7,
                          },
                          '50%': {
                            transform: 'rotate(180deg) scale(1.15)',
                            backgroundPosition: '100% 50%',
                            opacity: 0.95,
                          },
                          '100%': {
                            transform: 'rotate(360deg) scale(0.85)',
                            backgroundPosition: '0% 50%',
                            opacity: 0.7,
                          }
                        }
                      }}
                    />

                    <Box
                      component="img"
                      src="1x/hero_logo.png"
                      alt="Logo"
                      sx={{
                        width: { xs: 240, md: 340 },
                        height: { xs: 240, md: 340 },
                        objectFit: 'contain',
                        position: 'relative',
                        zIndex: 1,
                        filter: `drop-shadow(0 20px 50px rgba(255, 107, 0, 0.45))`,
                      }}
                    />

                    {/* Beta Badge Overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: { xs: 15, md: 25 },
                        right: { xs: 15, md: 25 },
                        zIndex: 2,
                        background: 'linear-gradient(135deg, #ff6b00, #ea580c)',
                        color: '#ffffff',
                        fontSize: { xs: '0.65rem', md: '0.8rem' },
                        fontWeight: 900,
                        px: 2,
                        py: 0.6,
                        borderRadius: '20px',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: `0 8px 24px rgba(255, 107, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3)`,
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
                            boxShadow: `0 6px 14px rgba(255, 107, 0, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.3)`,
                          },
                          '100%': {
                            transform: 'rotate(5deg) scale(1.08)',
                            boxShadow: `0 12px 28px rgba(255, 107, 0, 0.75), inset 0 2px 4px rgba(255, 255, 255, 0.5)`,
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

      <TechStacks />

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
          viewport={{ once: true, amount: 0.2 }}
          sx={{ position: 'relative', zIndex: 1 }}
        >
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant="h2" sx={{
              fontWeight: 950,
              fontFamily: '"Outfit", sans-serif',
              letterSpacing: -1.5,
              mb: 2,
              background: `linear-gradient(270deg, #ff6b00, #ff9f43, #ea580c, #ff6b00)`,
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

          <Card sx={{
            minHeight: { xs: 450, md: 650 },
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            p: { xs: 3, md: 8 },
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: 'rgba(20, 20, 25, 0.15)',
            backdropFilter: 'blur(35px)',
            WebkitBackdropFilter: 'blur(35px)',
            border: '1.5px solid rgba(255, 107, 0, 0.35)',
            boxShadow: '0 40px 100px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 107, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
          }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
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
                  background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 100%)',
                }} />
              </motion.div>
            </AnimatePresence>

            <Box sx={{
              position: 'relative', zIndex: 1,
              width: '100%',
              maxWidth: { md: 550 },
              p: { xs: 4, md: 5 },
              borderRadius: 6,
              background: 'rgba(20, 20, 25, 0.22)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(255, 107, 0, 0.35)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 107, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography variant="overline" sx={{ color: '#ff6b00', fontWeight: 900, letterSpacing: 3, mb: 1, display: 'block' }}>
                    FEATURED PROJECT
                  </Typography>
                  <Typography variant="h3" sx={{ color: '#fff', mb: 2, fontWeight: 900, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.5px' }}>
                    {projects[currentSlide]?.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, lineHeight: 1.7, fontWeight: 450 }}>
                    {projects[currentSlide]?.description}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
                    <IconButton
                      onClick={prevSlide}
                      sx={{
                        border: '1.5px solid rgba(255, 107, 0, 0.4)',
                        color: '#ff6b00',
                        borderRadius: '50%',
                        p: 1.5,
                        background: 'rgba(255, 107, 0, 0.05)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        '&:hover': {
                          borderColor: '#ff6b00',
                          background: 'rgba(255, 107, 0, 0.15)',
                          transform: 'translateX(-4px)',
                          boxShadow: '0 0 15px rgba(255, 107, 0, 0.25)'
                        }
                      }}
                    >
                      <ChevronLeftIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      href={projects[currentSlide]?.link}
                      target="_blank"
                      sx={{
                        flex: 1,
                        py: 1.8,
                        borderRadius: 100,
                        background: 'linear-gradient(45deg, #ff6b00 0%, #ea580c 100%)',
                        fontWeight: 800,
                        fontSize: '1rem',
                        boxShadow: '0 8px 24px rgba(255, 107, 0, 0.35)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #ea580c 0%, #ff6b00 100%)',
                          boxShadow: '0 12px 30px rgba(255, 107, 0, 0.55)',
                        }
                      }}
                    >
                      Open Project
                    </Button>
                    <IconButton
                      onClick={nextSlide}
                      sx={{
                        border: '1.5px solid rgba(255, 107, 0, 0.4)',
                        color: '#ff6b00',
                        borderRadius: '50%',
                        p: 1.5,
                        background: 'rgba(255, 107, 0, 0.05)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        '&:hover': {
                          borderColor: '#ff6b00',
                          background: 'rgba(255, 107, 0, 0.15)',
                          transform: 'translateX(4px)',
                          boxShadow: '0 0 15px rgba(255, 107, 0, 0.25)'
                        }
                      }}
                    >
                      <ChevronRightIcon />
                    </IconButton>
                  </Box>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

export default Content;