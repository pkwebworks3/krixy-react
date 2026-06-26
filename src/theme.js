import { alpha } from '@mui/material/styles';

const ACCENT_COLORS = {
  orange: { primary: '#ff6b00', secondary: '#ea580c' },
  green:  { primary: '#00ff66', secondary: '#00c34e' },
  cyan:   { primary: '#00f0ff', secondary: '#00c3d9' },
  purple: { primary: '#bd00ff', secondary: '#9600d9' },
  pink:   { primary: '#ff007f', secondary: '#d9006b' },
};

const darkenColor = (hex, percent = 15) => {
  let cleanHex = hex.replace(/^\s*#|\s*$/g, '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  let num = parseInt(cleanHex, 16);
  let r = (num >> 16) - Math.round(255 * (percent / 100));
  let g = ((num >> 8) & 0x00FF) - Math.round(255 * (percent / 100));
  let b = (num & 0x0000FF) - Math.round(255 * (percent / 100));
  
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const getColors = (accent) => {
  if (ACCENT_COLORS[accent]) {
    return ACCENT_COLORS[accent];
  }
  const hexPattern = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  if (hexPattern.test(accent)) {
    const formattedHex = accent.startsWith('#') ? accent : `#${accent}`;
    return {
      primary: formattedHex,
      secondary: darkenColor(formattedHex, 15)
    };
  }
  return ACCENT_COLORS.orange;
};

export const getDesignTokens = (mode, accent = 'orange') => {
  const colors = getColors(accent);
  return {
    palette: {
      mode,
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: colors.secondary,
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
          root: ({ theme }) => ({
            borderRadius: 100,
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 700,
            padding: '12px 32px',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
            },
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 30,
            backgroundColor: 'rgba(20, 20, 25, 0.45)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }),
        },
      },
    },
  };
};
