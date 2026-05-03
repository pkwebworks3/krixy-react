import { useState } from 'react';
import { Box, Container, Grid, Typography, Button, IconButton, Card, useTheme, alpha } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import projects from "../data/projects.json";

function Content() {
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

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
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 50%, ${theme.palette.background.default} 100%)`
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            {/* Hero Left Content */}
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography variant="subtitle1" sx={{ color: theme.palette.primary.main, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
                  Hey, I'm
                </Typography>
                
                <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4.5rem' }, color: theme.palette.text.primary, lineHeight: 1.1 }}>
                  Kirubhssss
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Typography variant="h6" sx={{ color: theme.palette.primary.main, px: 2, py: 1, border: `2px solid ${theme.palette.primary.main}`, borderRadius: 2, backgroundColor: alpha(theme.palette.primary.main, 0.08) }}>
                    Web Developer
                  </Typography>
                  <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>&</Typography>
                  <Typography variant="h6" sx={{ color: theme.palette.primary.main, px: 2, py: 1, border: `2px solid ${theme.palette.primary.main}`, borderRadius: 2, backgroundColor: alpha(theme.palette.primary.main, 0.08) }}>
                    UI Designer
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ color: theme.palette.text.secondary, fontSize: '1.125rem', lineHeight: 1.8, maxWidth: 500 }}>
                  I craft digital experiences that blend stunning design with clean, efficient code. Specializing in modern web technologies and user-centered design.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                  <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} href="#projects" sx={{ px: 4, py: 1.5 }}>
                    View My Work
                  </Button>
                  <Button variant="outlined" size="large" startIcon={<SendIcon />} href="#contact" sx={{ px: 4, py: 1.5, borderColor: theme.palette.primary.main, color: theme.palette.primary.main }}>
                    Get in Touch
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
                    Connect with me
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton href="https://github.com" target="_blank" sx={{ border: `2px solid ${theme.palette.primary.main}`, borderRadius: 2, color: theme.palette.primary.main }}>
                      <GitHubIcon />
                    </IconButton>
                    <IconButton href="https://linkedin.com" target="_blank" sx={{ border: `2px solid ${theme.palette.primary.main}`, borderRadius: 2, color: theme.palette.primary.main }}>
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton href="https://twitter.com" target="_blank" sx={{ border: `2px solid ${theme.palette.primary.main}`, borderRadius: 2, color: theme.palette.primary.main }}>
                      <TwitterIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Projects Section */}
      <Box id="projects" sx={{ py: 10, backgroundColor: theme.palette.background.paper }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant="h2" sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 2 }}>
              Featured Projects
            </Typography>
            <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
              A selection of recent work
            </Typography>
          </Box>

          <Card sx={{ 
            minHeight: 500, 
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            p: 4,
            backgroundImage: `url(${projects[currentSlide]?.project_thumb})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 4
          }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.2) 100%)', borderRadius: 4 }} />
            
            <Box sx={{ position: 'relative', zIndex: 1, ml: 'auto', maxWidth: 480, width: '100%' }}>
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
        </Container>
      </Box>
    </Box>
  );
}

export default Content;