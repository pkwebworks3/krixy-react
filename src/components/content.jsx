import { useState, useEffect, useRef } from 'react';
import { Box, Container, Grid, Typography, Button, IconButton, Card, useTheme, alpha } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import projects from "../data/projects.json";
import { TypeAnimation } from 'react-type-animation';
import { motion, AnimatePresence } from 'framer-motion';

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999, px: -999, py: -999, active: false, speed: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const COLORS = ['#7c3aed', '#a78bfa', '#c4b5fd', '#6d28d9', '#8b5cf6', '#ddd6fe'];
    let flowers = [];

    const initGrid = () => {
      flowers = [];
      const width = canvas.offsetWidth || window.innerWidth;
      const height = canvas.offsetHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const spacing = 45; // Distance between flowers
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          flowers.push({
            x: i * spacing + (Math.random() - 0.5) * 40,
            y: j * spacing + (Math.random() - 0.5) * 40,
            baseSize: Math.random() * 8 + 12,
            bloomLevel: 0,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.015,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
          });
        }
      }
    };

    initGrid();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(initGrid, 200);
    };
    window.addEventListener('resize', handleResize);

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (x >= -50 && x <= canvas.width + 50 && y >= -50 && y <= canvas.height + 50) {
        mouseRef.current = { x, y, active: true };
      } else {
        mouseRef.current.active = false;
      }
    };
    
    window.addEventListener('pointermove', handlePointerMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const m = mouseRef.current;

      flowers.forEach((f) => {
        f.rotation += f.rotSpeed;

        let dist = Infinity;
        if (m.active) {
          dist = Math.hypot(m.x - f.x, m.y - f.y);
        }

        if (dist < 120) {
          f.bloomLevel += 0.08;
        } else {
          f.bloomLevel -= 0.015;
        }

        f.bloomLevel = Math.max(0, Math.min(1, f.bloomLevel));

        if (f.bloomLevel > 0.01) {
          const ease = Math.sin((f.bloomLevel * Math.PI) / 2);
          const currentSize = f.baseSize * ease;

          ctx.save();
          ctx.globalAlpha = ease;
          ctx.translate(f.x, f.y);
          ctx.rotate(f.rotation);

          ctx.fillStyle = f.color;
          for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.ellipse(0, currentSize * 0.6, Math.max(0.1, currentSize * 0.3), Math.max(0.1, currentSize * 0.8), 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.rotate((Math.PI * 2) / 5);
          }
          
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.arc(0, 0, Math.max(0.1, currentSize * 0.25), 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

function Content() {
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
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
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box id="home" sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        pt: { xs: 12, md: 15 },
        pb: 8,
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 50%, ${theme.palette.background.default} 100%)`
      }}>
        <ParticleCanvas />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">
            {/* Hero Centered Content */}
            <Grid item xs={12} md={10} lg={8} sx={{ mx: 'auto' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 3 }}>
                <Typography variant="subtitle1" sx={{ color: theme.palette.primary.main, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>
                  Hey, I'm
                </Typography>
                
                <Typography variant="h1" sx={{ fontSize: { xs: '3.5rem', md: '5rem' }, color: theme.palette.text.primary, lineHeight: 1.1, fontWeight: 900, minHeight: { xs: '4rem', md: '5.5rem' } }}>
                  <TypeAnimation
                    sequence={[
                      'Kirubhssss',
                      1000,
                    ]}
                    wrapper="span"
                    speed={20}
                    cursor={true}
                  />
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mt: 1 }}>
                  <Typography variant="h6" sx={{ color: theme.palette.primary.main, px: 3, py: 1, border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`, borderRadius: 8, backgroundColor: alpha(theme.palette.primary.main, 0.05), fontWeight: 600 }}>
                    Web Developer
                  </Typography>
                  <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontWeight: 400 }}>&</Typography>
                  <Typography variant="h6" sx={{ color: theme.palette.primary.main, px: 3, py: 1, border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`, borderRadius: 8, backgroundColor: alpha(theme.palette.primary.main, 0.05), fontWeight: 600 }}>
                    UI Designer
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ color: theme.palette.text.secondary, fontSize: '1.2rem', lineHeight: 1.8, maxWidth: 650, mt: 2 }}>
                  I craft digital experiences that blend stunning design with clean, efficient code. Specializing in modern web technologies and user-centered design.
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4, flexWrap: 'wrap' }}>
                  <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} href="#projects" sx={{ px: 5, py: 1.5, borderRadius: 8, fontSize: '1.1rem', boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}` }}>
                    View My Work
                  </Button>
                  <Button variant="outlined" size="large" startIcon={<SendIcon />} href="#contact" sx={{ px: 5, py: 1.5, borderRadius: 8, fontSize: '1.1rem', borderColor: alpha(theme.palette.primary.main, 0.5), color: theme.palette.primary.main, '&:hover': { borderColor: theme.palette.primary.main, backgroundColor: alpha(theme.palette.primary.main, 0.05) } }}>
                    Get in Touch
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 6 }}>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 600 }}>
                    Connect with me
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton href="https://www.instagram.com/kirubha.exe/" target="_blank" sx={{ border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`, borderRadius: '50%', color: theme.palette.text.primary, p: 1.5, '&:hover': { borderColor: theme.palette.primary.main, color: theme.palette.primary.main, transform: 'translateY(-4px)' }, transition: 'all 0.3s' }}>
                      <InstagramIcon />
                    </IconButton>
                    <IconButton href="#" target="_blank" sx={{ border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`, borderRadius: '50%', color: theme.palette.text.primary, p: 1.5, '&:hover': { borderColor: theme.palette.primary.main, color: theme.palette.primary.main, transform: 'translateY(-4px)' }, transition: 'all 0.3s' }}>
                      <TwitterIcon />
                    </IconButton>
                    <IconButton href="https://github.com/pkwebworks3" target="_blank" sx={{ border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`, borderRadius: '50%', color: theme.palette.text.primary, p: 1.5, '&:hover': { borderColor: theme.palette.primary.main, color: theme.palette.primary.main, transform: 'translateY(-4px)' }, transition: 'all 0.3s' }}>
                      <GitHubIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
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

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
            >
              <Card sx={{ 
                minHeight: { xs: 'auto', md: 500 }, 
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                p: { xs: 2, md: 4 },
                backgroundImage: { xs: 'none', md: `url(${projects[currentSlide]?.project_thumb})` },
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 4,
                backgroundColor: theme.palette.background.paper,
              }}>
                {/* Gradient overlay — desktop only */}
                <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: theme.palette.mode === 'light' ? 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.2) 100%)' : 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.2) 100%)', borderRadius: 4 }} />
                
                <Box sx={{ position: 'relative', zIndex: 1, ml: { xs: 0, md: 'auto' }, maxWidth: { xs: '100%', md: 480 }, width: '100%' }}>
                  <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper, borderRadius: 2, boxShadow: theme.shadows[10] }}>
                    <Box sx={{ width: 80, height: 80, mb: 2, borderRadius: 2, overflow: 'hidden' }}>
                      <img src={projects[currentSlide]?.project_ico} alt="icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                    <Typography variant="h4" sx={{ color: theme.palette.text.primary, mb: 1, fontWeight: 500 }}>
                      {projects[currentSlide]?.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3, lineHeight: 1.6 }}>
                      {projects[currentSlide]?.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <IconButton onClick={prevSlide} sx={{ border: `1px solid ${theme.palette.primary.main}`, color: theme.palette.primary.main, borderRadius: 2 }}>
                        <ChevronLeftIcon />
                      </IconButton>
                      <Button variant="contained" href={projects[currentSlide]?.link} sx={{ flex: 1 }}>
                        Open Project
                      </Button>
                      <IconButton onClick={nextSlide} sx={{ border: `1px solid ${theme.palette.primary.main}`, color: theme.palette.primary.main, borderRadius: 2 }}>
                        <ChevronRightIcon />
                      </IconButton>
                    </Box>
                  </Card>
                </Box>
              </Card>
            </motion.div>
          </AnimatePresence>
        </Container>
      </Box>
    </Box>
  );
}

export default Content;