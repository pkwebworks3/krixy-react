import { motion } from 'framer-motion';
import { Box, Container, Typography, Button, Grid, IconButton, alpha, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => {
  const theme = useTheme();
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScEhsojHcF2sIs2OmZ_2xVYV1m2dsO00z5B-jRJ7fBEBJnRuw/viewform?usp=publish-editor";

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      pt: { xs: 15, md: 20 }, 
      pb: 10,
      background: theme.palette.mode === 'light' ? '#fafafa' : '#000000',
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
              background: `linear-gradient(270deg, #ff6b00, #ff9f43, #ea580c, #ff6b00)`,
              backgroundSize: '400% 400%',
              animation: 'gradientShift 8s ease infinite',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '3rem', md: '5rem' },
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
                p: { xs: 4, md: 8 }, 
                textAlign: 'center',
                borderRadius: 10, 
                bgcolor: alpha(theme.palette.background.paper, 0.4),
                backdropFilter: 'blur(30px)',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: `0 30px 60px ${alpha(theme.palette.common.black, 0.15)}`,
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
                  href={googleFormUrl}
                  target="_blank"
                  variant="contained" 
                  size="large" 
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    px: 6,
                    py: 2.5, 
                    borderRadius: 100, 
                    fontSize: '1.2rem', 
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.3)}`,
                    '&:hover': { 
                      transform: 'scale(1.05)',
                      boxShadow: `0 25px 50px ${alpha(theme.palette.primary.main, 0.4)}`,
                    },
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  Open Inquiry Form
                </Button>

                <Box sx={{ mt: 8, pt: 6, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                  <Typography variant="subtitle2" sx={{ mb: 4, fontWeight: 700, opacity: 0.6, letterSpacing: 2 }}>OR CONNECT VIA</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, md: 4 }, flexWrap: 'wrap' }}>
                    {[
                      { icon: <EmailIcon />, label: 'Email', value: 'hello@pkwebworks.com' },
                      { icon: <InstagramIcon />, label: 'Instagram', href: 'https://www.instagram.com/kirubha.exe/' },
                      { icon: <GitHubIcon />, label: 'GitHub', href: 'https://github.com/pkwebworks3' },
                    ].map((item, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <IconButton 
                          href={item.href}
                          target="_blank"
                          sx={{ 
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            '&:hover': { bgcolor: theme.palette.primary.main, color: '#fff' }
                          }}
                        >
                          {item.icon}
                        </IconButton>
                        <Typography variant="body2" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
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
    </Box>
  );
};

export default Contact;
