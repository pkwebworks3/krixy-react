import { useState } from 'react';
import { Box, Container, Typography, Card, CardMedia, CardContent, Button, useTheme, alpha, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import projects from "../../data/projects_page.json";

function Projects() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [warningOpen, setWarningOpen] = useState(true);

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
      background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 50%, ${theme.palette.background.default} 100%)`
    }}>
      <Container maxWidth="lg">
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
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={() => window.open(project.link, '_blank')}
              sx={{ 
                position: 'relative',
                cursor: 'pointer',
                p: { xs: 2, md: 4 },
                borderRadius: 8,
                transition: 'all 0.5s ease',
                '&:hover': {
                  bgcolor: alpha(theme.palette.background.paper, 0.1),
                  backdropFilter: 'blur(20px)',
                  boxShadow: `0 40px 100px ${alpha('#000', 0.3)}`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  '& .thumb': { transform: 'scale(1.05)' }
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
                borderRadius: 6,
                overflow: 'hidden',
                boxShadow: `0 30px 60px ${alpha('#000', 0.4)}`,
              }}>
                <Box
                  component="img"
                  src={project.project_thumb}
                  alt={project.title}
                  className="thumb"
                  sx={{ 
                    width: '100%', 
                    height: { xs: 300, md: 450 },
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
                  }}
                />
              </Box>

              {/* Project Info */}
              <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, position: 'relative', zIndex: 1 }}>
                <Typography variant="overline" sx={{ color: theme.palette.primary.main, fontWeight: 900, letterSpacing: 3 }}>
                  Project {idx + 1}
                </Typography>
                <Typography variant="h2" sx={{ 
                  fontWeight: 950, 
                  fontFamily: '"Outfit", sans-serif',
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  color: theme.palette.primary.main
                }}>
                  {project.title}
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: theme.palette.mode === 'light' ? theme.palette.text.secondary : alpha('#fff', 0.7), 
                  lineHeight: 1.8, 
                  fontSize: '1.1rem',
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
