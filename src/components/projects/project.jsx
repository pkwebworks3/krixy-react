import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Card, CardMedia, CardContent, Button, useTheme, alpha, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery, Chip, Tab, Tabs } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import projects from "../../data/projects_page.json";

const categories = ["All", "Calculators", "Utilities & Apps", "Games", "Forms"];

function Projects() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [warningOpen, setWarningOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

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
            bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(24, 24, 27, 0.9)',
            border: `1px solid ${alpha(theme.palette.warning.main, theme.palette.mode === 'light' ? 0.4 : 0.3)}`,
            boxShadow: `0 20px 60px ${alpha(theme.palette.warning.main, 0.15)}`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
          <WarningAmberIcon sx={{ color: theme.palette.warning.main, fontSize: 28 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: '"Outfit", sans-serif' }}>Heads up!</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.7, fontFamily: '"Inter", sans-serif' }}>
            These projects are designed for <strong>larger resolution screens</strong> and may not display correctly on your mobile device.
            For the best experience, try viewing them on a <strong>PC, Laptop, or Tablet</strong>.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            variant="contained"
            onClick={() => setWarningOpen(false)}
            sx={{
              borderRadius: 8,
              px: 3,
              bgcolor: theme.palette.warning.main,
              color: '#000',
              fontWeight: 800,
              fontFamily: '"Outfit", sans-serif',
              '&:hover': { bgcolor: theme.palette.warning.dark }
            }}
          >
            Got it, close
          </Button>
        </DialogActions>
      </Dialog>

      <Box id="projects-page" sx={{ 
        minHeight: '100vh', 
        pt: { xs: 15, md: 18 }, 
        pb: 12, 
        background: 'transparent',
        position: 'relative'
      }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
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
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }
              }}>
                My Projects
              </Typography>
              <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, fontWeight: 550, fontFamily: '"Outfit", sans-serif' }}>
                Explore a showcase of websites, games, and tools built with code
              </Typography>
            </motion.div>
          </Box>

          {/* Glassmorphic Category Selector */}
          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 8,
              flexWrap: 'wrap',
              gap: 1.5,
              p: 1.2,
              borderRadius: '50px',
              bgcolor: 'rgba(20, 20, 25, 0.25)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              maxWidth: 'fit-content',
              mx: 'auto',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
            }}
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <Box 
                  key={category} 
                  sx={{ position: 'relative' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '100px',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.4)}`,
                        zIndex: 0
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Button
                    onClick={() => setActiveCategory(category)}
                    sx={{ 
                      color: isActive ? '#ffffff' : alpha(theme.palette.text.primary, 0.65), 
                      fontWeight: isActive ? 800 : 600,
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      fontFamily: '"Outfit", sans-serif',
                      textTransform: 'none',
                      borderRadius: '100px',
                      px: { xs: 2, sm: 3 },
                      py: 1,
                      display: 'flex',
                      position: 'relative',
                      zIndex: 1,
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      background: 'transparent',
                      '&:hover': { 
                        color: '#ffffff',
                        background: isActive ? 'transparent' : 'rgba(255, 255, 255, 0.05)',
                      } 
                    }}
                  >
                    {category}
                  </Button>
                </Box>
              );
            })}
          </Box>

          {/* Grid Layout of filtered projects */}
          <motion.div layout>
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                  md: '1fr 1fr 1fr'
                },
                gap: 4,
                position: 'relative'
              }}
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <Box
                    key={project.title}
                    component={motion.div}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => {
                      if (isMobile) {
                        window.open(project.link, '_blank', 'noopener,noreferrer');
                      } else {
                        navigate(`?preview=${encodeURIComponent(project.link)}&title=${encodeURIComponent(project.title)}`);
                      }
                    }}
                    sx={{
                      cursor: 'pointer',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(20, 20, 25, 0.35)',
                      backdropFilter: 'blur(30px)',
                      WebkitBackdropFilter: 'blur(30px)',
                      border: `1px solid ${alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.18 : 0.12)}`,
                      boxShadow: theme.palette.mode === 'light'
                        ? '0 20px 40px rgba(0,0,0,0.04), inset 0 1px 1px rgba(255,255,255,0.8)'
                        : '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.03)',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        borderColor: 'primary.main',
                        background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(25, 25, 30, 0.55)',
                        boxShadow: (theme) => theme.palette.mode === 'light'
                          ? `0 30px 60px rgba(0, 0, 0, 0.08), 0 0 20px ${alpha(theme.palette.primary.main, 0.2)}`
                          : `0 30px 60px rgba(0, 0, 0, 0.5), 0 0 25px ${alpha(theme.palette.primary.main, 0.25)}`,
                        '& .thumb-img': {
                          transform: 'scale(1.08)',
                        },
                        '& .proj-btn': {
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                          boxShadow: `0 5px 15px ${alpha(theme.palette.primary.main, 0.45)}`,
                          color: '#ffffff'
                        }
                      }
                    }}
                  >
                    {/* Thumbnail */}
                    <Box sx={{ position: 'relative', height: 210, width: '100%', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        image={project.project_thumb ? import.meta.env.BASE_URL + project.project_thumb.replace(/^\//, '') : ''}
                        alt={project.title}
                        className="thumb-img"
                        sx={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                      {/* Overlay Glow on Card Top */}
                      <Box sx={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'linear-gradient(to top, rgba(9,9,11,0.85) 0%, rgba(9,9,11,0.1) 100%)',
                        zIndex: 1
                      }} />
                      
                      {/* Small category tag overlay */}
                      <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
                        <Chip
                          label={project.category}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(9, 9, 11, 0.8)',
                            color: theme.palette.primary.main,
                            fontWeight: 800,
                            fontSize: '0.65rem',
                            letterSpacing: '0.5px',
                            fontFamily: '"Outfit", sans-serif',
                            textTransform: 'uppercase',
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                            backdropFilter: 'blur(5px)',
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Content */}
                    <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 900, 
                          color: theme.palette.text.primary, 
                          fontFamily: '"Outfit", sans-serif',
                          mb: 1.5,
                          fontSize: '1.4rem'
                        }}
                      >
                        {project.title}
                      </Typography>
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
                        {project.description}
                      </Typography>

                      {/* Tags */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 3 }}>
                        {project.tags?.map(t => (
                          <Typography
                            key={t}
                            variant="caption"
                            sx={{
                              px: 1.2,
                              py: 0.4,
                              borderRadius: '4px',
                              bgcolor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.03)',
                              color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.55)' : 'rgba(255, 255, 255, 0.6)',
                              fontSize: '0.7rem',
                              fontWeight: 650,
                              fontFamily: '"Outfit", sans-serif',
                              border: theme.palette.mode === 'light' ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid rgba(255, 255, 255, 0.05)',
                            }}
                          >
                            {t}
                          </Typography>
                        ))}
                      </Box>

                      {/* Open Button */}
                      <Button
                        className="proj-btn"
                        fullWidth
                        endIcon={<OpenInNewIcon fontSize="small" />}
                        sx={{
                          borderRadius: '12px',
                          py: 1.2,
                          bgcolor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.03)',
                          border: `1px solid ${alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.25 : 0.2)}`,
                          color: theme.palette.primary.main,
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          fontFamily: '"Outfit", sans-serif',
                          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      >
                        {isMobile ? "Open Live Site" : "Open Simulator"}
                      </Button>
                    </CardContent>
                  </Box>
                ))}
              </AnimatePresence>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}

export default Projects;
