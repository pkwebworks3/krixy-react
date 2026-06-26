import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getDesignTokens } from './theme';

export const ColorModeContext = createContext({ 
  toggleColorMode: () => {},
  setAccentColor: () => {}
});

export const ColorModeProvider = ({ children }) => {
  const [mode] = useState('dark');
  const [accent, setAccent] = useState('orange');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        // Only dark mode is supported
      },
      setAccentColor: (color) => {
        setAccent(color);
      },
      mode: 'dark',
      accent,
    }),
    [accent]
  );

  const theme = useMemo(() => createTheme(getDesignTokens('dark', accent)), [accent]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
