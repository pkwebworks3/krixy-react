import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, IconButton, Button, useTheme, Divider, alpha } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { motion } from 'framer-motion';

function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ bgcolor: theme.palette.background.paper, pt: 10, pb: 4, borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}` }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h5" sx={{ color: theme.palette.primary.main, fontWeight: 700, mb: 3 }}>
              PK Webworks
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3, lineHeight: 1.8 }}>
              Building creative web experiences with code & design. We transform ideas into beautiful, functional digital solutions.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton href="https://www.instagram.com/kirubha.exe/" target="_blank" sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}><InstagramIcon /></IconButton>
              <IconButton href="#" target="_blank" sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}><FacebookIcon /></IconButton>
              <IconButton href="https://github.com/pkwebworks3" target="_blank" sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}><GitHubIcon /></IconButton>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 3 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                component={Link}
                to="/"
                startIcon={<HomeIcon />}
                sx={{ justifyContent: 'flex-start', color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main }, px: 0 }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/about"
                startIcon={<PersonIcon />}
                sx={{ justifyContent: 'flex-start', color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main }, px: 0 }}
              >
                About
              </Button>
              <Button
                component={Link}
                to="/projects"
                startIcon={<DashboardIcon />}
                sx={{ justifyContent: 'flex-start', color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main }, px: 0 }}
              >
                Projects
              </Button>
              <Button
                component={Link}
                to="/contact"
                startIcon={<EmailIcon />}
                sx={{ justifyContent: 'flex-start', color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main }, px: 0 }}
              >
                Contact
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 3 }}>
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', color: theme.palette.text.secondary }}>
                <EmailIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
                <Typography component="a" href="mailto:pkwebworks3@gmail.com" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: theme.palette.primary.main } }}>
                  pkwebworks3@gmai.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.1), my: 4 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            &copy; {currentYear} PK Webworks. All rights reserved.
          </Typography>
        </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Footer;