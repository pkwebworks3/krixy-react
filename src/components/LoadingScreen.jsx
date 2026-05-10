import { motion } from 'framer-motion';
import { Box, Typography, useTheme, alpha } from '@mui/material';

const LoadingScreen = ({ progress }) => {
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
      px: 3
    }}>
      <Box sx={{ position: 'relative', mb: 6 }}>
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            width: 120,
            height: 120,
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
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: theme.palette.primary.main,
              filter: 'blur(20px)',
            }}
          />
        </Box>
        
        {/* Progress Text in center */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <Typography sx={{ 
            fontSize: '1rem', 
            fontWeight: 900, 
            color: theme.palette.primary.main,
            fontFamily: '"Outfit", sans-serif'
          }}>
            {progress}%
          </Typography>
        </Box>
      </Box>

      {/* Loading Bar Container */}
      <Box sx={{ width: '100%', maxWidth: 300, position: 'relative' }}>
        <Box sx={{ 
          height: '6px', 
          width: '100%', 
          bgcolor: alpha(theme.palette.primary.main, 0.1), 
          borderRadius: 10,
          overflow: 'hidden',
          mb: 2
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: 10,
              boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.5)}`
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="overline" sx={{ 
            fontSize: '0.85rem', 
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
            loading..
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingScreen;
