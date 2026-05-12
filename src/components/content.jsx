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


const stacks = [
  { name: 'VS Code', img: '/ico/vscode.png' },
  { name: 'Antigravity', img: '/ico/antigravity.png' },
  { name: 'OpenCode', img: '/ico/opencode.png' },
  { name: 'GitHub', img: '/ico/github.png' },
  { name: 'Git', img: '/ico/git.png' },
  { name: 'Chrome', img: '/ico/chrome.png' },
  { name: 'ChatGPT', img: '/ico/chatgpt.png' },
  { name: 'Gemini', img: '/ico/gemini.png' },
  { name: 'Arc', img: '/ico/arc.png' },
  { name: 'Vercel', img: '/ico/vercel.png' },
  { name: 'Photoshop', img: '/ico/photoshop.png' },
  { name: 'Illustrator', img: '/ico/illustrator.png' },
];

function StackCard({ stack, index }) {
  const theme = useTheme();

  return (
    <Grid size={{ xs: 4, sm: 3, md: 2.4, lg: 2 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
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
            p: { xs: 2, md: 3 },
            height: '100%',
            borderRadius: { xs: 3, md: 4 },
            background: alpha(theme.palette.background.paper, 0.05),
            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
            backdropFilter: 'blur(12px)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            overflow: 'hidden',
            cursor: 'pointer',
            '&:hover': {
              transform: 'translateY(-10px) scale(1.05)',
              background: alpha(theme.palette.background.paper, 0.12),
              borderColor: alpha(theme.palette.primary.main, 0.4),
              boxShadow: `0 30px 60px ${alpha(theme.palette.common.black, 0.3)}`,
              '& .glow': {
                opacity: 0.8,
                transform: 'translate(-50%, -50%) scale(1.8)',
              },
              '& img': {
                transform: 'scale(1.2) rotate(8deg)',
                filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.4))'
              },
              '& .stack-name': {
                color: theme.palette.primary.main,
                transform: 'translateY(-2px)'
              }
            },
          }}
        >
          {/* Decorative Corner Glow */}
          <Box sx={{
            position: 'absolute',
            top: -10,
            right: -10,
            width: 40,
            height: 40,
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
            filter: 'blur(10px)',
            zIndex: 0
          }} />

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

function Stacks() {
  const theme = useTheme();

  return (
    <Box id="stacks" sx={{ py: 15, position: 'relative', backgroundColor: theme.palette.background.default }}>
      {/* Background Decorative Element */}
      <Box sx={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 70%)`,
        filter: 'blur(60px)',
        zIndex: 0,
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 10, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textTransform: 'uppercase',
              letterSpacing: 2,
              mb: 3,
              fontWeight: 900,
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              My Stacks
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary, maxWidth: 600, mx: 'auto', fontWeight: 400, opacity: 0.8 }}>
              A collection of tools and technologies I use to bring ideas to life.
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={{ xs: 2, md: 4 }} sx={{ justifyContent: 'center' }}>
          {stacks.map((stack, index) => (
            <StackCard key={stack.name} stack={stack} index={index} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

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
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <style>{`@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}`}</style>
          <Box sx={{ 
            textAlign: 'center', 
            px: { xs: 3, md: 8 }, 
            py: { xs: 6, md: 10 },
            borderRadius: { xs: 8, md: 12 },
            background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(15, 23, 42, 0.15)',
            backdropFilter: 'blur(20px)',
            // No border as requested
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 4, md: 5 },
              mb: 6,
              position: 'relative'
            }}>
              {/* Profile Avatar */}
              <Box sx={{ position: 'relative' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  style={{ position: 'relative' }}
                >

                  <Box
                    component="img"
                    src="/reviews_profile/kirubha.jpg"
                    alt="Kirubha"
                    sx={{
                      width: { xs: 150, md: 220 },
                      height: { xs: 150, md: 220 },
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: `4px solid #fff`,
                      boxShadow: `0 20px 50px ${alpha(theme.palette.primary.main, 0.25)}`,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                </motion.div>

                {/* Speech Bubble */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: '-40px', md: '20px' },
                  right: { xs: '50%', md: '-140px' },
                  transform: { xs: 'translateX(50%)', md: 'none' },
                  zIndex: 2
                }}>
                  <motion.div
                    initial={{ opacity: 0, x: 20, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Box sx={{
                      position: 'relative',
                      background: '#fff',
                      color: '#000',
                      borderRadius: '50px',
                      px: { xs: 3, md: 5 },
                      py: { xs: 1.5, md: 2.5 },
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(0,0,0,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      whiteSpace: 'nowrap',
                      // Bubble Tail
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        ...(isMobile ? {
                          bottom: '-12px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          borderLeft: '12px solid transparent',
                          borderRight: '12px solid transparent',
                          borderTop: '12px solid #fff',
                        } : {
                          left: '-15px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          borderTop: '10px solid transparent',
                          borderBottom: '10px solid transparent',
                          borderRight: '16px solid #fff',
                        })
                      }
                    }}>
                      <Typography variant="h5" sx={{
                        fontWeight: 600,
                        color: '#1a1a1a',
                        fontSize: { xs: '1.2rem', md: '1.8rem' },
                        fontFamily: '"Outfit", sans-serif'
                      }}>
                        Hey, I'm
                      </Typography>
                    </Box>
                  </motion.div>
                </Box>
              </Box>
            </Box>

            <Typography variant="h1" sx={{
              fontSize: { xs: '4rem', md: '6rem' },
              lineHeight: 1.05,
              fontWeight: 900,
              mb: 1.5,
              background: `linear-gradient(270deg, ${theme.palette.text.primary}, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main}, ${theme.palette.text.primary})`,
              backgroundSize: '400% 400%',
              animation: 'gradientShift 6s ease infinite',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              <TypeAnimation
                sequence={['Kirubhaa!', 1000]}
                wrapper="span"
                speed={20}
                cursor={true}
              />
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap', mb: 4 }}>
              {['Web Developer', 'UI Designer'].map((role, i) => (
                <Typography key={role} variant="body2" sx={{
                  color: i === 0 ? theme.palette.primary.main : theme.palette.text.secondary,
                  fontWeight: 600,
                  px: 2.5, py: 0.7,
                  borderRadius: 6,
                  background: i === 0 ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                  border: i === 0 ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}` : 'none',
                  fontSize: '0.9rem',
                }}>
                  {i === 1 && <>&nbsp;&</>} {role}
                </Typography>
              ))}
            </Box>

            <Typography variant="body1" sx={{
              color: alpha(theme.palette.text.secondary, 0.85),
              fontSize: { xs: '1rem', md: '1.15rem' },
              lineHeight: 1.8,
              maxWidth: 540,
              mx: 'auto',
              mb: 5,
            }}>
              Web Developer by Code, Designer by Passion, Animator by Craft!
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2.5, flexWrap: 'wrap', mb: 8 }}>
              <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} href="#projects" sx={{
                px: 5, py: 1.6,
                borderRadius: 8,
                fontSize: '1rem',
                fontWeight: 700,
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
                borderColor: alpha(theme.palette.primary.main, 0.3),
                color: theme.palette.primary.main,
                '&:hover': { borderColor: theme.palette.primary.main, backgroundColor: alpha(theme.palette.primary.main, 0.06) },
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
          </Box>
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
            <Typography variant="h2" sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 2 }}>
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
      <Stacks />
    </Box>
  );
}

export default Content;