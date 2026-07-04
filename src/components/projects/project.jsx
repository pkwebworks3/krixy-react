import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Card, CardMedia, CardContent, Button, useTheme, alpha, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import EngineeringIcon from '@mui/icons-material/Engineering';
import projects from "../../data/projects_page.json";

const UNDER_MAINTENANCE = true;

// Custom SVG Gear component for maintenance page
const GearSVG = ({ size = 100, color, speed = 10, clockwise = true }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      animate={{ rotate: clockwise ? 360 : -360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      style={{ display: 'inline-block' }}
    >
      <circle cx="50" cy="50" r="30" fill="none" stroke={color} strokeWidth="6" strokeDasharray="6 4" />
      <circle cx="50" cy="50" r="20" fill="none" stroke={color} strokeWidth="3" />
      <circle cx="50" cy="50" r="8" fill={color} />
      {[...Array(8)].map((_, i) => {
        const angle = (i * 360) / 8;
        return (
          <rect
            key={i}
            x="46"
            y="10"
            width="8"
            height="15"
            rx="2"
            fill={color}
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}
    </motion.svg>
  );
};

function Projects() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [warningOpen, setWarningOpen] = useState(true);
  const navigate = useNavigate();

  if (UNDER_MAINTENANCE) {
    return (
      <Box 
        id="projects-maintenance-page"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 15,
          pb: 8,
          background: 'transparent',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box
              sx={{
                p: { xs: 4, sm: 6 },
                borderRadius: '32px',
                background: 'rgba(20, 20, 25, 0.45)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                boxShadow: `0 40px 100px rgba(0, 0, 0, 0.6), 0 0 40px ${alpha(theme.palette.primary.main, 0.05)}`,
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Pulsing Backlight / Glow effect */}
              <Box
                component={motion.div}
                animate={{
                  opacity: [0.15, 0.3, 0.15],
                  scale: [0.95, 1.05, 0.95]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                sx={{
                  position: 'absolute',
                  top: '-10%',
                  left: '-10%',
                  right: '-10%',
                  bottom: '-10%',
                  background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
                  zIndex: -1,
                  pointerEvents: 'none'
                }}
              />

              {/* Header Badge */}
              <Box 
                sx={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 1, 
                  px: 2, 
                  py: 0.75, 
                  borderRadius: 100, 
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                  mb: 4
                }}
              >
                <EngineeringIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
                <Typography variant="overline" sx={{ color: theme.palette.primary.main, fontWeight: 800, letterSpacing: 2, lineHeight: 1 }}>
                  SYSTEM UPGRADE
                </Typography>
              </Box>

              {/* Gear System Animation */}
              <Box sx={{ position: 'relative', width: 220, height: 160, mx: 'auto', mb: 3 }}>
                {/* Large Gear */}
                <Box sx={{ position: 'absolute', top: 10, left: 25 }}>
                  <GearSVG size={90} color={theme.palette.primary.main} speed={20} clockwise={true} />
                </Box>
                {/* Medium Gear */}
                <Box sx={{ position: 'absolute', top: 55, left: 95 }}>
                  <GearSVG size={65} color={theme.palette.secondary.main} speed={14} clockwise={false} />
                </Box>
                {/* Small Gear */}
                <Box sx={{ position: 'absolute', top: 20, left: 135 }}>
                  <GearSVG size={40} color={theme.palette.primary.main} speed={9} clockwise={true} />
                </Box>
              </Box>

              {/* Main Headline */}
              <Typography variant="h2" sx={{
                fontWeight: 950,
                fontFamily: '"Outfit", sans-serif',
                fontSize: { xs: '2.25rem', sm: '3rem' },
                mb: 2,
                background: `linear-gradient(270deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                backgroundSize: '200% auto',
                animation: 'gradientShift 6s linear infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Projects Under Construction
              </Typography>

              {/* Description */}
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.8, fontSize: '1.05rem', mb: 4, px: { xs: 0, sm: 2 } }}>
                The showroom is currently undergoing a planned redesign to showcase the latest creations with enhanced visuals and smoother performance. We'll be back shortly!
              </Typography>

              {/* Custom Progress Bar */}
              <Box sx={{ width: '100%', maxWidth: 320, mx: 'auto', mb: 5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, px: 0.5 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 1 }}>
                    OPTIMIZING CODEBASE
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontWeight: 800 }}>
                    ACTIVE
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', height: 4, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2, overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: "10%" }}
                    animate={{ width: ["15%", "45%", "45%", "78%", "95%", "95%", "15%"] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      boxShadow: `0 0 10px ${theme.palette.primary.main}`
                    }}
                  />
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/')}
                  startIcon={<HomeIcon />}
                  sx={{
                    borderRadius: '100px',
                    px: 3.5,
                    py: 1.5,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: '#ffffff',
                    fontWeight: 700,
                    boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.25)}`,
                    '&:hover': {
                      boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Return Home
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/contact')}
                  startIcon={<EmailIcon />}
                  sx={{
                    borderRadius: '100px',
                    px: 3.5,
                    py: 1.5,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                    color: theme.palette.text.primary,
                    fontWeight: 700,
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      border: `1px solid ${theme.palette.primary.main}`,
                      background: alpha(theme.palette.primary.main, 0.05),
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Get In Touch
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <>
      {/* Mobile Warning Dialog */}
      <Dialog
        open={isMobile && warningOpen}
        onClose={() => setWarningOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 1,
            border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
            boxShadow: `0 20px 60px ${alpha(theme.palette.warning.main, 0.15)}`,
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
          <WarningAmberIcon sx={{ color: theme.palette.warning.main, fontSize: 28 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Heads up!</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.7 }}>
            These projects are made for <strong>larger resolution screens</strong> and may not display correctly on your device.
            For the best experience, try viewing on a <strong>PC, Laptop, or Tablet</strong>.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            variant="contained"
            onClick={() => setWarningOpen(false)}
            sx={{ borderRadius: 8, px: 3, bgcolor: theme.palette.warning.main, '&:hover': { bgcolor: theme.palette.warning.dark } }}
          >
            Got it, close
          </Button>
        </DialogActions>
      </Dialog>
      <Box id="projects-page" sx={{ 
      minHeight: '100vh', 
      pt: 15, 
      pb: 8, 
      background: 'transparent'
    }}>
      <Container maxWidth="lg">
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
            My Projects
          </Typography>
          <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
            A selection of my recent work
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 8, md: 15 }, position: 'relative' }}>
          {projects.map((project, idx) => (
            <Box 
              key={idx} 
              component={motion.div}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              onClick={() => {
                if (isMobile) {
                  window.open(project.link, '_blank', 'noopener,noreferrer');
                } else {
                  navigate(`?preview=${encodeURIComponent(project.link)}&title=${encodeURIComponent(project.title)}`);
                }
              }}
              sx={{ 
                position: 'relative',
                cursor: 'pointer',
                p: { xs: 3, md: 5 },
                borderRadius: '30px',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                border: '1px solid transparent',
                '&:hover': {
                  background: 'rgba(20, 20, 25, 0.35)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  boxShadow: '0 40px 100px rgba(0, 0, 0, 0.5)',
                  border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                  '& .thumb': { transform: 'scale(1.06)' },
                  '& .proj-title': {
                    color: '#ffffff',
                    textShadow: (theme) => `0 0 12px ${alpha(theme.palette.primary.main, 0.45)}`
                  }
                },
                display: 'flex', 
                flexDirection: { xs: 'column', md: idx % 2 === 0 ? 'row' : 'row-reverse' },
                alignItems: 'center',
                gap: { xs: 4, md: 8 }
              }}
            >
              {/* Project Image */}
              <Box sx={{ 
                flex: 1.2, 
                width: '100%',
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
              }}>
                <Box
                  component="img"
                  src={project.project_thumb}
                  alt={project.title}
                  className="thumb"
                  sx={{ 
                    width: '100%', 
                    height: { xs: 200, sm: 320, md: 450 },
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
                  }}
                />
              </Box>

              {/* Project Info */}
              <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, position: 'relative', zIndex: 1 }}>
                <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: 3 }}>
                  Project {idx + 1}
                </Typography>
                <Typography className="proj-title" variant="h2" sx={{ 
                  fontWeight: 950, 
                  fontFamily: '"Outfit", sans-serif',
                  mb: 3,
                  fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
                  color: 'primary.main',
                  transition: 'all 0.4s ease'
                }}>
                  {project.title}
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: 'rgba(255, 255, 255, 0.75)', 
                  lineHeight: 1.8, 
                  fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.1rem' },
                  mb: 0,
                  maxWidth: 600
                }}>
                  {project.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
    </>
  );
}

export default Projects;
