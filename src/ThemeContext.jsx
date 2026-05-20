import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getDesignTokens } from './theme';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ColorModeProvider = ({ children }) => {
  const [mode] = useState('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        // Only dark mode is supported
      },
      mode: 'dark',
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens('dark')), []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
