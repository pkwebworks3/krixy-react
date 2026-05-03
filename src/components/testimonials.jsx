import { useState } from 'react';
import { Box, Container, Typography, Card, Avatar, Rating, IconButton, useTheme, alpha } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const testimonials = [
  {
    id: 1,
    name: "Vignesh",
    role: "CEO, YellowFlash",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    comment: "Pawan transformed our online presence completely. His attention to detail and modern design approach took our website to the next level. Highly recommended!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager, StartupHub",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    comment: "Working with Pawan was seamless. He understood our vision immediately and delivered a stunning UI that our users love. Great communication throughout.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director, DigitalMax",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    comment: "The website Pawan built for us has increased our conversions by 40%. The design is beautiful, and the performance is incredible. Best investment we made!",
    rating: 5
  },
];

function Testimonials() {
  const theme = useTheme();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <Box sx={{ py: 12, backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 2 }}>
            Client Testimonials
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
            mb: 4
          }}>
            <FormatQuoteIcon sx={{ 
              position: 'absolute', 
              top: -20, 
              right: 40, 
              fontSize: 80, 
              color: alpha(theme.palette.primary.main, 0.2),
              transform: 'rotate(180deg)'
            }} />
            
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
                <Rating value={testimonials[currentTestimonial].rating} readOnly size="small" sx={{ color: theme.palette.primary.main }} />
              </Box>
            </Box>

            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontStyle: 'italic', lineHeight: 1.8, fontWeight: 400 }}>
              "{testimonials[currentTestimonial].comment}"
            </Typography>
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
            <IconButton onClick={prevTestimonial} sx={{ border: `1px solid ${theme.palette.primary.main}`, color: theme.palette.primary.main }}>
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
                    backgroundColor: index === currentTestimonial ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.3),
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                />
              ))}
            </Box>

            <IconButton onClick={nextTestimonial} sx={{ border: `1px solid ${theme.palette.primary.main}`, color: theme.palette.primary.main }}>
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Testimonials;