import { Box, Container, Grid, Typography, IconButton, useTheme, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ bgcolor: theme.palette.background.paper, pt: 10, pb: 4, borderTop: `1px solid rgba(124, 58, 237, 0.1)` }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ color: theme.palette.primary.main, fontWeight: 700, mb: 3 }}>
              PK Webworks
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3, lineHeight: 1.8 }}>
              Building creative web experiences with code & design. We transform ideas into beautiful, functional digital solutions.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton href="#" sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}><FacebookIcon /></IconButton>
              <IconButton href="#" sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}><TwitterIcon /></IconButton>
              <IconButton href="#" sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}><LinkedInIcon /></IconButton>
              <IconButton href="#" sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}><GitHubIcon /></IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 3 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {['Home', 'Projects', 'About', 'Contact'].map((link) => (
                <Typography key={link} component="a" href={`#${link.toLowerCase()}`} sx={{ color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { color: theme.palette.primary.main } }}>
                  {link}
                </Typography>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 3 }}>
              Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {['Web Design', 'Web Development', 'UI/UX Design', 'Consultation'].map((service) => (
                <Typography key={service} component="a" href={`#${service.toLowerCase().replace('/', '-').replace(' ', '-')}`} sx={{ color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { color: theme.palette.primary.main } }}>
                  {service}
                </Typography>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 3 }}>
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', color: theme.palette.text.secondary }}>
                <EmailIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
                <Typography component="a" href="mailto:info@pkwebworks.com" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: theme.palette.primary.main } }}>
                  info@pkwebworks.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', color: theme.palette.text.secondary }}>
                <PhoneIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
                <Typography component="a" href="tel:+1234567890" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: theme.palette.primary.main } }}>
                  +1 (234) 567-890
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', color: theme.palette.text.secondary }}>
                <LocationOnIcon fontSize="small" sx={{ color: theme.palette.primary.main, mt: 0.5 }} />
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  123 Web Street, Digital City, DC 12345
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(124, 58, 237, 0.1)', my: 4 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            &copy; {currentYear} PK Webworks. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((link) => (
              <Typography key={link} component="a" href={`#${link.toLowerCase().replace(' ', '-')}`} variant="body2" sx={{ color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { color: theme.palette.text.primary } }}>
                {link}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;