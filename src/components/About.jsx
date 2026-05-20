import React from 'react';
import { Box, Container, Typography, Grid, alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import BrushIcon from '@mui/icons-material/Brush';
import SpeedIcon from '@mui/icons-material/Speed';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PersonIcon from '@mui/icons-material/Person';
import { TechStacks } from './TechStacks';
const About = () => {
  const theme = useTheme();

  const stats = [
    { label: 'Years Experience', value: '3+' },
    { label: 'Projects Completed', value: '10+' },
    { label: 'Happy Clients', value: '2' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 12, md: 15 }, pb: 10, position: 'relative', overflow: 'hidden' }}>

      <Container maxWidth="lg">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h1" sx={{
            fontSize: { xs: '3.5rem', md: '5.5rem' },
            fontWeight: 950,
            mb: 4,
            textAlign: 'center',
            fontFamily: '"Outfit", sans-serif',
            background: `linear-gradient(270deg, #ff6b00, #ff9f43, #ea580c, #ff6b00)`,
            backgroundSize: '400% 400%',
            animation: 'gradientShift 8s ease infinite',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            About Me
          </Typography>
        </motion.div>

        <Grid container spacing={4} sx={{ mt: 2, justifyContent: 'center' }}>
          {/* Bio Section */}
          <Grid item xs={12} md={10} lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography variant="h4" sx={{ 
                fontWeight: 800, 
                mb: 4, 
                color: theme.palette.text.primary,
                textAlign: 'center',
                fontFamily: '"Outfit", sans-serif'
              }}>
                The Story Behind The Code
              </Typography>
              
              <Box sx={{ mb: 6 }}>
                {[
                  "I’m a 15-year-old creator passionate about coding, design, and animation. I love combining technology and creativity to build projects that are both functional and visually engaging. Whether it’s developing websites, creating designs, or making animations, I enjoy bringing ideas to life through my skills and imagination.",
                  "Over the years, I’ve spent a lot of time learning, experimenting, and improving my craft. I’m always excited to explore new tools, trends, and creative techniques that help me grow as a developer and designer.",
                  "What drives me the most is the desire to keep improving and take on new challenges. I believe every project is a chance to learn something new and push my creativity further. My goal is to create meaningful digital experiences that inspire people and leave an impact.",
                  "Outside of my work, I enjoy exploring new technology, discovering creative ideas, and finding inspiration from the world around me. I’m always looking forward to new opportunities to innovate, create, and grow."
                ].map((para, i) => (
                  <Typography key={i} variant="body1" sx={{
                    fontSize: '1.15rem',
                    lineHeight: 1.8,
                    color: theme.palette.text.secondary,
                    mb: 3,
                    textAlign: 'center',
                    maxWidth: 800,
                    mx: 'auto'
                  }}>
                    {para}
                  </Typography>
                ))}
              </Box>

              {/* Stats Grid */}
              <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                {stats.map((stat, i) => (
                  <Grid item xs={6} sm={4} key={i}>
                    <Box sx={{
                      p: 3,
                      borderRadius: 4,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      textAlign: 'center',
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'translateY(-5px)' }
                    }}>
                      <Typography variant="h4" sx={{ fontWeight: 900, color: theme.palette.primary.main, fontFamily: '"Outfit", sans-serif' }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>
        </Grid>

        {/* Reverted Core Principles to Grid Layout */}
        <Grid container spacing={8} alignItems="flex-start" sx={{ mt: 15, mb: 10 }}>
          {/* Left Side: Header */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ position: 'sticky', top: '150px' }}
            >
              <Typography variant="h3" sx={{
                fontSize: { xs: '3rem', md: '4.5rem' },
                mb: 3,
                fontWeight: 950,
                fontFamily: '"Outfit", sans-serif',
                lineHeight: 1.1,
                background: `linear-gradient(270deg, #ff6b00, #ff9f43, #ea580c, #ff6b00)`,
                backgroundSize: '400% 400%',
                animation: 'gradientShift 8s ease infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Core Principles
              </Typography>
              <Typography variant="body1" sx={{ 
                color: theme.palette.text.secondary, 
                fontSize: '1.15rem',
                lineHeight: 1.8,
                opacity: 0.8,
                fontWeight: 500
              }}>
                The foundation of every line of code I write and every pixel I place.
              </Typography>
            </motion.div>
          </Grid>

          {/* Right Side: Principles */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {[
                { title: 'Design First', icon: <BrushIcon sx={{ fontSize: 35 }} /> },
                { title: 'Performance', icon: <SpeedIcon sx={{ fontSize: 35 }} /> },
                { title: 'Innovation', icon: <AutoAwesomeIcon sx={{ fontSize: 35 }} /> },
                { title: 'User Centric', icon: <PersonIcon sx={{ fontSize: 35 }} /> }
              ].map((item, i) => (
                <Grid item xs={6} key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Box
                      sx={{
                        p: { xs: 2.5, md: 4 },
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 2, md: 3 },
                        borderRadius: { xs: 4, md: 6 },
                        background: alpha(theme.palette.background.paper, 0.4),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                        backdropFilter: 'blur(20px)',
                        transition: 'all 0.4s ease',
                        '&:hover': {
                          background: alpha(theme.palette.primary.main, 0.08),
                          borderColor: theme.palette.primary.main,
                          boxShadow: `0 15px 35px ${alpha(theme.palette.primary.main, 0.1)}`,
                          '& .principle-icon': {
                            transform: 'scale(1.1) rotate(5deg)',
                            color: theme.palette.primary.main
                          }
                        }
                      }}
                    >
                      <Box 
                        className="principle-icon"
                        sx={{ 
                          color: alpha(theme.palette.primary.main, 0.8),
                          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                          display: 'flex'
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 800, 
                        color: theme.palette.text.primary, 
                        fontFamily: '"Outfit", sans-serif',
                        fontSize: { xs: '0.95rem', md: '1.25rem' },
                        lineHeight: 1.2
                      }}>
                        {item.title}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Tech Stacks Section */}
        <TechStacks 
          title="Expertise" 
          subtitle="The professional toolkit I've mastered to build world-class digital products." 
        />
      </Container>
    </Box>
  );
};

export default About;
