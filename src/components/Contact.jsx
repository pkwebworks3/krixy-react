import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, IconButton, alpha, useTheme, Snackbar, Alert } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => {
  const theme = useTheme();
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScEhsojHcF2sIs2OmZ_2xVYV1m2dsO00z5B-jRJ7fBEBJnRuw/viewform?usp=publish-editor";
  const [openFbAlert, setOpenFbAlert] = useState(false);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      pt: { xs: 15, md: 20 }, 
      pb: 10,
      background: 'transparent',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Decorative Blobs */}
      <Box sx={{
        position: 'absolute',
        top: '10%',
        right: '-10%',
        width: '50vw',
        height: '50vw',
        background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 70%)`,
        filter: 'blur(100px)',
        zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" sx={{ 
              fontWeight: 950, 
              mb: 2,
              fontFamily: '"Outfit", sans-serif',
              background: (theme) => `linear-gradient(270deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.6)}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              backgroundSize: '400% 400%',
              animation: 'gradientShift 8s ease infinite',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
              letterSpacing: '-0.02em'
            }}>
              GET IN TOUCH.
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary, maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}>
              Have a project in mind or want to collaborate? I use Google Forms to manage my requests efficiently.
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {/* Main Action Card */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box sx={{ 
                p: { xs: 3, sm: 6, md: 8 }, 
                textAlign: 'center',
                borderRadius: 10, 
                backgroundColor: 'rgba(20, 20, 25, 0.35)',
                backdropFilter: 'blur(35px)',
                WebkitBackdropFilter: 'blur(35px)',
                border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                boxShadow: '0 40px 100px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
                  Ready to Start?
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 6, fontSize: '1.1rem' }}>
                  Click the button below to fill out my project inquiry form. This helps me understand your needs better and respond faster.
                </Typography>
                
                <Button 
                  component={Link}
                  to={`?preview=${encodeURIComponent(googleFormUrl)}&title=${encodeURIComponent("Project Inquiry Form")}`}
                  variant="contained" 
                  size="large" 
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    px: { xs: 4, sm: 6 },
                    py: { xs: 2, sm: 2.5 }, 
                    borderRadius: 100, 
                    fontSize: { xs: '0.95rem', sm: '1.15rem' }, 
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.4)}`,
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '&:hover': { 
                      background: `linear-gradient(45deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                      transform: 'translateY(-3px) scale(1.03)',
                      boxShadow: `0 16px 45px ${alpha(theme.palette.primary.main, 0.6)}`,
                    },
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  Open Inquiry Form
                </Button>

                <Box sx={{ mt: 8, pt: 6, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                  <Typography variant="subtitle2" sx={{ mb: 4, fontWeight: 700, opacity: 0.6, letterSpacing: 2 }}>OR CONNECT VIA</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, sm: 4 }, flexWrap: 'wrap' }}>
                    {[
                      { icon: <EmailIcon />, label: 'Email', href: 'mailto:hello@pkwebworks.com', onClick: null },
                      { icon: <InstagramIcon />, label: 'Instagram', href: 'https://www.instagram.com/madebykrix/', onClick: null },
                      { icon: <FacebookIcon />, label: 'Facebook', href: '#', onClick: (e) => { e.preventDefault(); setOpenFbAlert(true); } }
                    ].map((item, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <IconButton 
                          component={item.onClick ? 'button' : 'a'}
                          href={item.onClick ? undefined : item.href}
                          onClick={item.onClick || undefined}
                          target={item.onClick ? undefined : '_blank'}
                          sx={{ 
                            border: (theme) => `1.5px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                            color: 'primary.main',
                            p: { xs: 1.5, sm: 1.8 },
                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            '&:hover': { 
                              borderColor: 'primary.main',
                              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
                              color: '#fff',
                              transform: 'translateY(-4px) scale(1.08)',
                              boxShadow: (theme) => `0 8px 20px ${alpha(theme.palette.primary.main, 0.25)}`
                            }
                          }}
                        >
                          {item.icon}
                        </IconButton>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: 'rgba(255, 255, 255, 0.85)', display: { xs: 'none', sm: 'block' } }}>
                          {item.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

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
};

export default Contact;
