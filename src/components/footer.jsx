import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, IconButton, Button, useTheme, Divider } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';

function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ bgcolor: theme.palette.background.paper, pt: 10, pb: 4, borderTop: `1px solid rgba(124, 58, 237, 0.1)` }}>
      <Container maxWidth="lg">
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
              <IconButton href="#" target="_blank" sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}><TwitterIcon /></IconButton>
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
                to="/projects"
                startIcon={<DashboardIcon />}
                sx={{ justifyContent: 'flex-start', color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main }, px: 0 }}
              >
                Projects
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

        <Divider sx={{ borderColor: 'rgba(124, 58, 237, 0.1)', my: 4 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            &copy; {currentYear} PK Webworks. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;