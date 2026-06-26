import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, IconButton, Button, useTheme, Divider, alpha, Snackbar, Alert } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';

function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [openFbAlert, setOpenFbAlert] = useState(false);
  const [openEmailAlert, setOpenEmailAlert] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <Box
      component="footer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: theme.palette.mode === 'light' ? '#fafafa' : '#09090b',
        pt: { xs: 8, md: 10 },
        pb: 4,
        borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, ${alpha(theme.palette.primary.main, 0.08)}, transparent 100%)`,
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'opacity 0.5s ease',
          opacity: mousePos.x === -1000 ? 0 : 1,
        }
      }}
    >
      <Container disableGutters sx={{ width: { xs: '94%', md: '88%' }, maxWidth: '1300px !important', position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Grid container spacing={6}>
            {/* Column 1: Brand & Socials */}
            <Grid size={{ xs: 12, md: 4 }}>
              <motion.div variants={itemVariants}>
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                  <img src="1x/1x/Asset 2.png" alt="PK Webworks Logo" style={{ height: '35px' }} />
                  <Box
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      color: '#ffffff',
                      fontSize: '0.55rem',
                      fontWeight: 900,
                      px: 1,
                      py: 0.25,
                      borderRadius: '12px',
                      letterSpacing: '0.8px',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.35)}`,
                      fontFamily: '"Outfit", sans-serif',
                    }}
                  >
                    Beta
                  </Box>
                </Link>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3, lineHeight: 1.8, maxWidth: '340px' }}>
                  Building creative web experiences with code & design. We transform ideas into beautiful, functional digital solutions.
                </Typography>

                {/* Pulsing Availability Badge */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#10b981',
                      boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)',
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%': {
                          transform: 'scale(0.95)',
                          boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)',
                        },
                        '70%': {
                          transform: 'scale(1)',
                          boxShadow: '0 0 0 8px rgba(16, 185, 129, 0)',
                        },
                        '100%': {
                          transform: 'scale(0.95)',
                          boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)',
                        },
                      },
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                    Available for freelance work
                  </Typography>
                </Box>

                {/* Social Icon Row */}
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  {[
                    { icon: <InstagramIcon fontSize="small" />, url: 'https://www.instagram.com/madebykrix/', onClick: null },
                    { icon: <FacebookIcon fontSize="small" />, url: '#', onClick: (e) => { e.preventDefault(); setOpenFbAlert(true); } }
                  ].map((social, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.15, y: -3 }} whileTap={{ scale: 0.95 }}>
                      <IconButton
                        component={social.onClick ? 'button' : 'a'}
                        href={social.onClick ? undefined : social.url}
                        onClick={social.onClick || undefined}
                        target={social.onClick ? undefined : '_blank'}
                        sx={{
                          color: theme.palette.text.secondary,
                          bgcolor: alpha(theme.palette.text.primary, 0.04),
                          border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                          borderRadius: '12px',
                          p: 1.2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: theme.palette.primary.main,
                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                            borderColor: alpha(theme.palette.primary.main, 0.25),
                            boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.15)}`,
                          }
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            {/* Column 2: Sitemap Quick Links */}
            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 700, mb: 3, fontFamily: '"Outfit", sans-serif' }}>
                  Sitemap
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    { title: 'Home', path: '/', icon: <HomeIcon fontSize="inherit" /> },
                    { title: 'About', path: '/about', icon: <PersonIcon fontSize="inherit" /> },
                    { title: 'Projects', path: '/projects', icon: <DashboardIcon fontSize="inherit" /> },
                    { title: 'Contact', path: '/contact', icon: <EmailIcon fontSize="inherit" /> },
                  ].map((link, index) => (
                    <Box
                      key={index}
                      component={Link}
                      to={link.path}
                      sx={{
                        color: theme.palette.text.secondary,
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontFamily: '"Outfit", sans-serif',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        '&:hover': {
                          color: theme.palette.primary.main,
                          transform: 'translateX(6px)',
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', color: alpha(theme.palette.primary.main, 0.8), fontSize: '1rem' }}>
                        {link.icon}
                      </Box>
                      {link.title}
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            {/* Column 3: Featured Sub-Projects */}
            <Grid size={{ xs: 6, sm: 4, md: 3 }}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 700, mb: 3, fontFamily: '"Outfit", sans-serif' }}>
                  Featured Work
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    { title: 'Read My Comic', href: '/projects/readmycomic/index.html' },
                    { title: 'Switch Case Text', href: 'https://switchcase-pkww.vercel.app/' },
                    { title: 'Interactive To-Do', href: '/projects/todolist/index.html' },
                    { title: 'Rabbit Mash Game', href: '/projects/rabit%20mash/index.html' },
                  ].map((link, index) => (
                    <Box
                      key={index}
                      component="a"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: theme.palette.text.secondary,
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontFamily: '"Outfit", sans-serif',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        '&:hover': {
                          color: theme.palette.primary.main,
                          transform: 'translateX(6px)',
                        }
                      }}
                    >
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: alpha(theme.palette.primary.main, 0.6) }} />
                      {link.title}
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            {/* Column 4: Stay in Touch / Newsletter */}
            <Grid size={{ xs: 12, sm: 4, md: 3 }}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 700, mb: 3, fontFamily: '"Outfit", sans-serif' }}>
                  Stay in Touch
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2, lineHeight: 1.6 }}>
                  Subscribe to receive updates on new creative experiments and projects.
                </Typography>

                {isSubscribed ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 600, py: 1.5 }}>
                      ✓ Thank you! You've subscribed successfully.
                    </Typography>
                  </motion.div>
                ) : (
                  <Box
                    component="form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setOpenEmailAlert(true);
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: alpha(theme.palette.text.primary, 0.03),
                      border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                      borderRadius: '14px',
                      p: 0.6,
                      mb: 3,
                      '&:focus-within': {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 0 16px ${alpha(theme.palette.primary.main, 0.15)}`,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Box
                      component="input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onClick={() => setOpenEmailAlert(true)}
                      placeholder="Your email address"
                      required
                      sx={{
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        color: theme.palette.text.primary,
                        px: 1.5,
                        py: 0.8,
                        flexGrow: 1,
                        fontSize: '0.85rem',
                        width: '100%',
                        fontFamily: '"Inter", sans-serif',
                        '&::placeholder': {
                          color: theme.palette.text.secondary,
                          opacity: 0.6,
                        }
                      }}
                    />
                    <IconButton
                      type="submit"
                      size="small"
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: '#ffffff',
                        p: 1,
                        '&:hover': {
                          bgcolor: theme.palette.secondary.main,
                          transform: 'scale(1.05)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <SendIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}

                {/* Direct Email Link */}
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', color: theme.palette.text.secondary, mt: 1 }}>
                  <IconButton sx={{ color: theme.palette.primary.main, bgcolor: alpha(theme.palette.primary.main, 0.08), p: 1, '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.15) } }}>
                    <EmailIcon fontSize="small" />
                  </IconButton>
                  <Box>
                    <Typography variant="caption" display="block" sx={{ color: theme.palette.text.secondary, opacity: 0.7 }}>
                      Direct Email
                    </Typography>
                    <Typography
                      component="a"
                      href="mailto:pkwebworks3@gmail.com"
                      sx={{
                        color: theme.palette.text.primary,
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        fontFamily: '"Outfit", sans-serif',
                        '&:hover': { color: theme.palette.primary.main }
                      }}
                    >
                      pkwebworks3@gmail.com
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.1), my: 5 }} />

          {/* Bottom Bar */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontFamily: '"Outfit", sans-serif', order: { xs: 2, sm: 1 } }}>
              &copy; {currentYear} PK Webworks. All rights reserved.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, order: { xs: 1, sm: 2 } }}>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  startIcon={<KeyboardArrowUpIcon />}
                  sx={{
                    color: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                    borderRadius: '100px',
                    px: 3,
                    py: 1,
                    fontSize: '0.85rem',
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: theme.palette.primary.main,
                      color: '#ffffff',
                      boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
                    }
                  }}
                >
                  Back to top
                </Button>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
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

      <Snackbar
        open={openEmailAlert}
        autoHideDuration={4000}
        onClose={() => setOpenEmailAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenEmailAlert(false)}
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
          Email subscription is temporarily disabled. Please try again later.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Footer;