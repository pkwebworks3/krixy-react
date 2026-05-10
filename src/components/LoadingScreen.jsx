import { motion } from 'framer-motion';
import { Box, Typography, useTheme, alpha } from '@mui/material';

const LoadingScreen = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      bgcolor: theme.palette.background.default,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <Box sx={{ position: 'relative', mb: 4 }}>
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            borderTop: `2px solid ${theme.palette.primary.main}`,
          }}
        />
        
        {/* Inner Pulsing Circle */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <motion.div
            animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: theme.palette.primary.main,
              filter: 'blur(15px)',
            }}
          />
        </Box>
        
        {/* Center Dot */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 12,
          height: 12,
          bgcolor: theme.palette.primary.main,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 15px ${theme.palette.primary.main}`,
        }} />
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Typography variant="overline" sx={{ 
          fontSize: '1rem', 
          fontWeight: 800, 
          letterSpacing: 4, 
          color: theme.palette.text.primary,
          background: `linear-gradient(90deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.text.primary} 100%)`,
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'shimmer 2s linear infinite',
          '@keyframes shimmer': {
            '0%': { backgroundPosition: '200% center' },
            '100%': { backgroundPosition: '0% center' },
          }
        }}>
          PREPARING EXPERIENCE
        </Typography>
      </motion.div>
    </Box>
  );
};

export default LoadingScreen;
