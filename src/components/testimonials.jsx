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
        backgroundColor: theme.palette.background.default,
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
        viewport={{ once: true, amount: 0.2 }}
        sx={{ position: 'relative', zIndex: 1 }}
      >
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ 
            fontWeight: 950, 
            fontFamily: '"Outfit", sans-serif',
            letterSpacing: -1, 
            mb: 2,
            background: `linear-gradient(270deg, #ff6b00, #ff9f43, #ea580c, #ff6b00)`,
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
            p: { xs: 4, md: 6 },
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            overflow: 'visible',
            mb: 4,
            borderRadius: 6,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
            boxShadow: `0 20px 50px ${alpha(theme.palette.primary.main, 0.1)}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: alpha(theme.palette.primary.main, 0.3),
              boxShadow: `0 25px 60px ${alpha(theme.palette.primary.main, 0.15)}`,
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
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 3 }}>
                  <Avatar
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    sx={{ width: 80, height: 80, border: `2px solid ${theme.palette.primary.main}` }}
                  />
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {testimonials[currentTestimonial].name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                      {testimonials[currentTestimonial].role}
                    </Typography>
                    <Rating value={testimonials[currentTestimonial].rating} readOnly size="small" sx={{ color: '#ffb400' }} />
                  </Box>
                </Box>

                <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontStyle: 'italic', lineHeight: 1.8, fontWeight: 400 }}>
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