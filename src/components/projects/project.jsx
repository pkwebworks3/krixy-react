import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, Button, useTheme, alpha } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import projects from "../../data/projects_page.json";

function Projects() {
  const theme = useTheme();

  return (
    <Box id="projects-page" sx={{ 
      minHeight: '100vh', 
      pt: 15, 
      pb: 8, 
      background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 50%, ${theme.palette.background.default} 100%)`
    }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 2 }}>
            My Projects
          </Typography>
          <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
            A selection of my recent work
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, 
          gap: 4 
        }}>
          {projects.map((project, idx) => (
            <Card key={idx} sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              backgroundColor: theme.palette.background.paper,
              transition: 'transform 0.4s',
              '&:hover': {
                transform: 'translateY(-8px)',
                borderColor: alpha(theme.palette.primary.main, 0.6),
                boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.3)}`
              }
            }}>
              <Box sx={{ position: 'relative', height: 220, overflow: 'hidden', '&:hover .overlay': { opacity: 1 }, '&:hover .thumb': { transform: 'scale(1.08)' } }}>
                <CardMedia 
                  component="img" 
                  image={project.project_thumb} 
                  alt={project.title} 
                  className="thumb"
                  sx={{ height: '100%', transition: 'transform 0.6s' }} 
                />
                <Box className="overlay" sx={{ 
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                  bgcolor: alpha(theme.palette.background.paper, 0.8), 
                  backdropFilter: 'blur(4px)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  opacity: 0, transition: 'opacity 0.4s' 
                }}>
                  <Button variant="contained" href={project.link} target="_blank" endIcon={<OpenInNewIcon />}>
                    View Project
                  </Button>
                </Box>
              </Box>
              
              <CardContent sx={{ flexGrow: 1, p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 2, overflow: 'hidden', p: 1, border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                    <img src={project.project_ico} alt="icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                    {project.title}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.7 }}>
                  {project.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Projects;
