import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getDesignTokens } from './theme';

export const ColorModeContext = createContext({ 
  toggleColorMode: () => {},
  setAccentColor: () => {}
});

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('themeMode');
    // Default to 'light' as requested, otherwise use saved mode
    return saved === 'dark' ? 'dark' : 'light';
  });
  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('themeAccent') || 'orange';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('themeAccent', accent);
  }, [accent]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      setAccentColor: (color) => {
        setAccent(color);
      },
      mode,
      accent,
    }),
    [mode, accent]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode, accent)), [mode, accent]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
