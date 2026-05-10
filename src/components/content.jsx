import { useState, useEffect, useRef } from 'react';
import { Box, Container, Grid, Typography, Button, IconButton, Card, useTheme, useMediaQuery, alpha } from '@mui/material';
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

function ParticleCanvas({ isMobile }) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999, px: -999, py: -999, active: false, speed: 0 });
  const burstsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const COLORS = ['#7c3aed', '#a78bfa', '#c4b5fd', '#6d28d9', '#8b5cf6', '#ddd6fe'];
    let flowers = [];
    const startTime = performance.now();
    const BLOOM_RADIUS = 150;

    const NUM_GROUPS = 12;
    const CYCLE = 5000;

    const initGrid = () => {
      flowers = [];
      const width = canvas.offsetWidth || window.innerWidth;
      const height = canvas.offsetHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const spacing = 45;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + (Math.random() - 0.5) * 40;
          const y = j * spacing + (Math.random() - 0.5) * 40;

          flowers.push({
            x, y,
            baseSize: Math.random() * 8 + 12,
            bloomLevel: 0,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.015,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            groupIndex: Math.floor(Math.random() * NUM_GROUPS),
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

    const getCanvasPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handlePointerMove = (e) => {
      if (isMobile) return;
      const { x, y } = getCanvasPos(e);
      if (x >= -50 && x <= canvas.width + 50 && y >= -50 && y <= canvas.height + 50) {
        mouseRef.current = { x, y, active: true };
      } else {
        mouseRef.current.active = false;
      }
    };

    const handlePointerDown = (e) => {
      if (!isMobile) return;
      const { x, y } = getCanvasPos(e);
      if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
        burstsRef.current.push({ x, y, time: performance.now() });
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);

    const applyCircularBloom = (f, cx, cy, now) => {
      const dist = Math.hypot(f.x - cx, f.y - cy);
      if (dist < BLOOM_RADIUS) {
        const intensity = 1 - (dist / BLOOM_RADIUS);
        f.bloomLevel += 0.1 * (0.2 + 0.8 * intensity);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const m = mouseRef.current;
      const now = performance.now();

      burstsRef.current = burstsRef.current.filter(b => now - b.time < 2000);

      flowers.forEach((f) => {
        f.rotation += f.rotSpeed;

        if (isMobile) {
          const FADE_IN = 1000;
          const HOLD = 3000;
          const totalCycle = NUM_GROUPS * CYCLE;
          const groupStart = f.groupIndex * CYCLE;
          let raw = (now - startTime - groupStart) % totalCycle;
          if (raw < 0) raw += totalCycle;

          let base = 0;
          if (raw < FADE_IN) {
            const p = raw / FADE_IN;
            base = p * p;
          } else if (raw < FADE_IN + HOLD) {
            base = 1;
          } else if (raw < CYCLE) {
            const p = (raw - FADE_IN - HOLD) / (CYCLE - FADE_IN - HOLD);
            base = 1 - (p * p);
          }

          f.bloomLevel = base;

          burstsRef.current.forEach((burst) => {
            const dist = Math.hypot(f.x - burst.x, f.y - burst.y);
            if (dist < BLOOM_RADIUS) {
              const intensity = (1 - dist / BLOOM_RADIUS) * Math.max(0, 1 - (now - burst.time) / 2000);
              f.bloomLevel = Math.min(1, f.bloomLevel + intensity * 0.6);
            }
          });
        } else {
          if (m.active) {
            applyCircularBloom(f, m.x, m.y, now);
            f.bloomLevel -= 0.008;
          } else {
            f.bloomLevel -= 0.015;
          }
        }

        f.bloomLevel = Math.max(0, Math.min(1, f.bloomLevel));

        if (f.bloomLevel > 0.01) {
          const ease = Math.sin((f.bloomLevel * Math.PI) / 2);
          const currentSize = f.baseSize * ease;

          ctx.save();
          ctx.globalAlpha = ease;
          ctx.translate(f.x, f.y);
          ctx.rotate(f.rotation);

          if (isDarkMode) {
            // Draw Star with Sparkle Effect
            const sparkle = 1 + (Math.sin(now * 0.012 + f.x) * 0.2 * f.bloomLevel);
            const twinkle = 0.8 + (Math.random() * 0.4 * f.bloomLevel); // High freq twinkle

            ctx.globalAlpha = ease * twinkle;
            ctx.fillStyle = f.color;
            const points = 5;
            const outerRadius = currentSize * 1.1 * sparkle;
            const innerRadius = currentSize * 0.45 * sparkle;

            ctx.beginPath();
            for (let i = 0; i < points * 2; i++) {
              const radius = i % 2 === 0 ? outerRadius : innerRadius;
              const angle = (Math.PI * i) / points - Math.PI / 2;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();

            // Sparkling center for the star
            const corePulse = 0.8 + Math.sin(now * 0.02 + f.y) * 0.2;
            ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * corePulse})`;
            ctx.beginPath();
            ctx.arc(0, 0, Math.max(0.1, currentSize * 0.25 * sparkle), 0, Math.PI * 2);
            ctx.fill();

            // Dynamic outer glow
            ctx.shadowBlur = (15 + Math.sin(now * 0.01) * 5) * f.bloomLevel;
            ctx.shadowColor = f.color;
          } else {
            // Original Flower Logic
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
          }

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
      window.removeEventListener('pointerdown', handlePointerDown);
      clearTimeout(resizeTimeout);
    };
  }, [isMobile]);

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

const stacks = [
  { name: 'VS Code', img: '/ico/vscode.png' },
  { name: 'Antigravity', img: '/ico/antigravity.png' },
  { name: 'OpenCode', img: '/ico/opencode.png' },
  { name: 'GitHub', img: '/ico/github.png' },
  { name: 'Git', img: '/ico/git.png' },
  { name: 'Chrome', img: '/ico/chrome.png' },
  { name: 'ChatGPT', img: '/ico/chatgpt.png' },
  { name: 'Arc', img: '/ico/arc.png' },
  { name: 'Vercel', img: '/ico/vercel.png' },
  { name: 'Photoshop', img: '/ico/photoshop.png' },
  { name: 'Illustrator', img: '/ico/illustrator.png' },
];

function StackCard({ stack, index }) {
  const theme = useTheme();

  return (
    <Grid item xs={6} sm={4} md={3} lg={2.4}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            p: 3,
            height: '100%',
            borderRadius: 4,
            background: alpha(theme.palette.background.paper, 0.03),
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            backdropFilter: 'blur(10px)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            cursor: 'default',
            '&:hover': {
              transform: 'translateY(-8px)',
              background: alpha(theme.palette.background.paper, 0.08),
              borderColor: alpha(theme.palette.primary.main, 0.3),
              boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.2)}`,
              '& .glow': {
                opacity: 1,
                transform: 'translate(-50%, -50%) scale(1.5)',
              },
              '& img': {
                transform: 'scale(1.1) rotate(5deg)',
              }
            },
          }}
        >
          {/* Gradient Glow Effect */}
          <Box
            className="glow"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '140px',
              height: '140px',
              background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.25)} 0%, transparent 70%)`,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%) scale(0)',
              opacity: 0,
              transition: 'all 0.6s ease',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <Box
            component="img"
            src={stack.img}
            alt={stack.name}
            sx={{
              width: 52,
              height: 52,
              zIndex: 1,
              transition: 'transform 0.4s ease',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))'
            }}
          />

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: 0.5,
              zIndex: 1,
              textAlign: 'center'
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

        <Grid container spacing={4} justifyContent="center">
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
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.secondary.main, 0.06)} 50%, ${theme.palette.background.default} 100%)`
      }}>
        <ParticleCanvas isMobile={isMobile} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <style>{`@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}`}</style>
          <Box sx={{ textAlign: 'center', px: { xs: 2, md: 0 } }}>
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
              <Button variant="outlined" size="large" startIcon={<SendIcon />} href="#contact" sx={{
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
                { icon: <TwitterIcon />, href: '#' },
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