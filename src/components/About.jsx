import React from 'react';
import { Box, Container, Typography, Grid, alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import BrushIcon from '@mui/icons-material/Brush';
import SpeedIcon from '@mui/icons-material/Speed';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PersonIcon from '@mui/icons-material/Person';
import { TechStacks } from './TechStacks';
import TiltCard from './TiltCard';
import Achievements from './Achievements';
import Timeline from './Timeline';
const About = () => {
  const theme = useTheme();

  const stats = [
    { label: 'Years Experience', value: '3+' },
    { label: 'Projects Completed', value: '10+' },
    { label: 'Happy Clients', value: '2' },
  ];

  return (
    <Box id="about" sx={{ minHeight: '100vh', pt: { xs: 12, md: 15 }, pb: 10, position: 'relative', overflow: 'hidden' }}>

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
            background: `linear-gradient(270deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.6)}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
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
              <Grid container spacing={{ xs: 2, md: 3 }} sx={{ justifyContent: 'center' }}>
                {stats.map((stat, i) => (
                  <Grid item xs={4} sm={4} key={i}>
                    <TiltCard maxTilt={15}>
                      <Box sx={{
                        p: { xs: 1.5, sm: 3 },
                        borderRadius: '24px',
                        background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.55)' : 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: `1px solid ${alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.25 : 0.18)}`,
                        boxShadow: theme.palette.mode === 'light'
                          ? '0 10px 30px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.8)'
                          : '0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.02)',
                        textAlign: 'center',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        cursor: 'pointer',
                        transformStyle: 'preserve-3d',
                        '&:hover': {
                          borderColor: 'primary.main',
                          background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.75)' : alpha(theme.palette.primary.main, 0.08),
                          boxShadow: theme.palette.mode === 'light'
                            ? `0 15px 35px rgba(0, 0, 0, 0.08), 0 0 15px ${alpha(theme.palette.primary.main, 0.2)}`
                            : `0 15px 35px ${alpha(theme.palette.primary.main, 0.25)}, 0 0 15px ${alpha(theme.palette.primary.main, 0.1)}`,
                          '& .stat-val': {
                            textShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.5)}`
                          }
                        }
                      }}>
                        <Typography className="stat-val" variant="h4" sx={{ fontWeight: 900, color: 'primary.main', fontFamily: '"Outfit", sans-serif', transition: 'all 0.3s', fontSize: { xs: '1.5rem', sm: '2.125rem', md: '2.25rem' }, transform: 'translateZ(20px)' }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: alpha(theme.palette.text.secondary, 0.8), fontWeight: 700, textTransform: 'uppercase', letterSpacing: { xs: 0.5, sm: 1 }, fontSize: { xs: '0.6rem', sm: '0.85rem' }, transform: 'translateZ(15px)' }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </TiltCard>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>
        </Grid>

        {/* Reverted Core Principles to Grid Layout */}
        <Grid id="principles" container spacing={{ xs: 4, md: 8 }} alignItems="flex-start" sx={{ mt: { xs: 8, md: 15 }, mb: 10 }}>
          {/* Left Side: Header */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              style={{ position: 'sticky', top: '150px' }}
            >
              <Typography variant="h3" sx={{
                fontSize: { xs: '3.5rem', md: '4.5rem' },
                mb: 3,
                fontWeight: 950,
                fontFamily: '"Outfit", sans-serif',
                lineHeight: 1.1,
                background: `linear-gradient(270deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.6)}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
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
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {[
                { title: 'Design First', icon: <BrushIcon sx={{ fontSize: 35 }} /> },
                { title: 'Performance', icon: <SpeedIcon sx={{ fontSize: 35 }} /> },
                { title: 'Innovation', icon: <AutoAwesomeIcon sx={{ fontSize: 35 }} /> },
                { title: 'User Centric', icon: <PersonIcon sx={{ fontSize: 35 }} /> }
              ].map((item, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Box sx={{
                      p: { xs: 2.5, md: 4.5 },
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: 'center',
                      textAlign: { xs: 'center', sm: 'left' },
                      gap: { xs: 2, sm: 3.5 },
                      borderRadius: { xs: '16px', md: '28px' },
                      background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(20, 20, 25, 0.35)',
                      border: `1px solid ${alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.22 : 0.15)}`,
                      backdropFilter: 'blur(30px)',
                      WebkitBackdropFilter: 'blur(30px)',
                      boxShadow: theme.palette.mode === 'light'
                        ? '0 15px 30px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.8)'
                        : '0 15px 35px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.03)',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': {
                        background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(25, 25, 30, 0.55)',
                        borderColor: 'primary.main',
                        boxShadow: theme.palette.mode === 'light'
                          ? `0 25px 45px rgba(0, 0, 0, 0.08), 0 0 25px ${alpha(theme.palette.primary.main, 0.25)}, inset 0 1px 1px rgba(255, 255, 255, 0.9)`
                          : `0 25px 50px rgba(0, 0, 0, 0.4), 0 0 25px ${alpha(theme.palette.primary.main, 0.25)}, inset 0 1px 1px rgba(255, 255, 255, 0.06)`,
                        '& .principle-icon': {
                          transform: 'scale(1.18) rotate(6deg)',
                          color: '#ffffff',
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                          boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.4)}`,
                          borderColor: 'primary.main'
                        }
                      }
                    }}>
                      <Box 
                        className="principle-icon"
                        sx={{ 
                          color: 'primary.main',
                          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                          display: 'flex',
                          p: 2,
                          borderRadius: '16px',
                          background: alpha(theme.palette.primary.main, 0.08),
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
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

        {/* Achievements Section */}
        <Achievements />

        {/* Timeline Section */}
        <Timeline />

        {/* Tech Stacks Section */}
        <Box id="tech-stacks">
          <TechStacks 
            title="Expertise" 
            subtitle="The professional toolkit I've mastered to build world-class digital products." 
          />
        </Box>
      </Container>
    </Box>
  );
};

export default About;
