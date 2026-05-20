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
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          backdropFilter: 'blur(20px)',
          border: mode === 'light' ? '1px solid rgba(255, 107, 0, 0.1)' : '1px solid rgba(255, 107, 0, 0.2)',
          boxShadow: mode === 'light' 
            ? '0 10px 40px rgba(255, 107, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
            : '0 10px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        },
      },
    },
  },
});
