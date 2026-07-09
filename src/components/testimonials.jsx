import { useState } from 'react';
import { Box, Container, Typography, Card, Avatar, Rating, IconButton, useTheme, alpha } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Vignesh",
    role: "CEO, YellowFlash",
    image: "/reviews_profile/vignesh.jpg",
    comment: "Working with PK Webworks was an excellent experience. Kirubha is a true professional who understands client requirements and delivers high-quality work. His attention to detail and commitment to excellence are commendable. Highly recommended!",
    rating: 5
  },
  {
    id: 2,
    name: "Prakash",
    role: "",
    image: "/reviews_profile/prakash.jpg",
    comment: "Working with Kirubha was seamless. He understood our vision immediately and delivered a stunning UI that our users love. Great communication throughout.",
    rating: 5
  }
];

function Testimonials() {
  const theme = useTheme();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

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

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <Box
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        py: 12,
        backgroundColor: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, ${alpha(theme.palette.primary.main, 0.08)}, transparent 80%)`,
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'opacity 0.3s ease',
          opacity: mousePos.x === -1000 ? 0 : 1,
        }
      }}
    >
      <Container
        maxWidth="lg"
        component={motion.div}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
        sx={{ position: 'relative', zIndex: 1 }}
      >
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ 
            fontWeight: 950, 
            fontFamily: '"Outfit", sans-serif',
            letterSpacing: -1, 
            mb: 2,
              background: (theme) => `linear-gradient(270deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.6)}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              backgroundSize: '400% 400%',
              animation: 'gradientShift 8s ease infinite',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
          }}>
            Client Reviews
          </Typography>
          <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
            What my clients say about working with me
          </Typography>
        </Box>

        <Box sx={{ maxWidth: 800, mx: 'auto', position: 'relative' }}>
          <Card sx={{
            p: { xs: 2.5, sm: 4, md: 6 },
            backgroundColor: 'rgba(20, 20, 25, 0.18)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            position: 'relative',
            overflow: 'visible',
            mb: 4,
            borderRadius: 8,
            border: (theme) => `1.5px solid ${alpha(theme.palette.primary.main, 0.35)}`,
            boxShadow: (theme) => `0 30px 60px rgba(0, 0, 0, 0.4), 0 0 25px ${alpha(theme.palette.primary.main, 0.15)}, inset 0 1px 1px rgba(255, 255, 255, 0.05)`,
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            '&:hover': {
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.65),
              boxShadow: (theme) => `0 40px 80px rgba(0, 0, 0, 0.5), 0 0 45px ${alpha(theme.palette.primary.main, 0.45)}, inset 0 1px 1px rgba(255, 255, 255, 0.08)`,
            }
          }}>
            <FormatQuoteIcon sx={{
              position: 'absolute',
              top: -20,
              right: 40,
              fontSize: 80,
              color: alpha(theme.palette.primary.main, 0.2),
              transform: 'rotate(180deg)'
            }} />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeIn" }}
              >
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', textAlign: { xs: 'center', sm: 'left' }, mb: 4, gap: { xs: 2, sm: 3 } }}>
                  <Avatar
                    src={testimonials[currentTestimonial].image ? import.meta.env.BASE_URL + testimonials[currentTestimonial].image.replace(/^\//, '') : ''}
                    alt={testimonials[currentTestimonial].name}
                    sx={{ width: { xs: 70, sm: 80 }, height: { xs: 70, sm: 80 }, border: `2px solid ${theme.palette.primary.main}` }}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' } }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {testimonials[currentTestimonial].name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                      {testimonials[currentTestimonial].role}
                    </Typography>
                    <Rating value={testimonials[currentTestimonial].rating} readOnly size="small" sx={{ color: '#ffb400' }} />
                  </Box>
                </Box>

                <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontStyle: 'italic', lineHeight: 1.8, fontWeight: 400, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                  "{testimonials[currentTestimonial].comment}"
                </Typography>
              </motion.div>
            </AnimatePresence>
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
            <IconButton onClick={prevTestimonial} sx={{ 
              border: `1px solid ${theme.palette.primary.main}`, 
              color: theme.palette.primary.main,
              transition: 'all 0.3s',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.2)}`
              }
            }}>
              <ChevronLeftIcon />
            </IconButton>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {testimonials.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  sx={{
                    width: index === currentTestimonial ? 24 : 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: index === currentTestimonial ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.2),
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Box>

            <IconButton onClick={nextTestimonial} sx={{ 
              border: `1px solid ${theme.palette.primary.main}`, 
              color: theme.palette.primary.main,
              transition: 'all 0.3s',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.2)}`
              }
            }}>
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Testimonials;