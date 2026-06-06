import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#ff6b00',
    },
    secondary: {
      main: '#ea580c',
    },
    background: {
      default: mode === 'light' ? '#fafafa' : '#09090b',
      paper: mode === 'light' ? '#ffffff' : '#18181b',
    },
    text: {
      primary: mode === 'light' ? '#0f172a' : '#f8fafc',
      secondary: mode === 'light' ? '#475569' : '#a1a1aa',
    },
  },
  typography: {
    fontFamily: '"Inter", "Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 900,
    },
    h2: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 800,
    },
    h3: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 800,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          fontFamily: '"Outfit", sans-serif',
          fontWeight: 700,
          padding: '12px 32px',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 24px rgba(255, 107, 0, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          backgroundColor: 'rgba(20, 20, 25, 0.45)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 107, 0, 0.12)',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        },
      },
    },
  },
});
