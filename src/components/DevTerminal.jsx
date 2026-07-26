import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, IconButton, Tooltip, Zoom, useTheme, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalIcon from '@mui/icons-material/Terminal';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Remove';
import projectsData from '../data/projects_page.json';
import { stacks } from '../data/stacks';
import { ColorModeContext } from '../ThemeContext';
import themePasswordData from '../data/theme_password.json';

// Fullscreen screensaver matching hero background with center logo
const HeroScreensaver = ({ onClose }) => {
  const theme = useTheme();
  useEffect(() => {
    // Hide scrollbars on mount
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Only backspace key exits
    const exitScreensaver = (e) => {
      if (e.key === 'Backspace') {
        onClose();
      }
    };
    window.addEventListener('keydown', exitScreensaver);

    return () => {
      // Restore scrollbars on unmount
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', exitScreensaver);
    };
  }, [onClose]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        cursor: 'none',
        background: '#09090b',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Vertical Tech Lines */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'space-between',
          px: '3vw',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {[...Array(19)].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: '1px',
              height: '100%',
              background: `linear-gradient(to top, ${alpha(theme.palette.primary.main, 0.5)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 50%, transparent 100%)`,
              opacity: 0.4,
              animation: 'lineGlowWave 5s ease-in-out infinite',
              animationDelay: `${i * 0.15}s`,
              '@keyframes lineGlowWave': {
                '0%, 100%': {
                  opacity: 0.3,
                  background: `linear-gradient(to top, ${alpha(theme.palette.primary.main, 0.4)} 0%, ${alpha(theme.palette.primary.main, 0.08)} 50%, transparent 100%)`,
                },
                '50%': {
                  opacity: 1,
                  background: `linear-gradient(to top, ${alpha(theme.palette.primary.main, 0.75)} 0%, ${alpha(theme.palette.primary.main, 0.2)} 65%, transparent 100%)`,
                }
              }
            }}
          />
        ))}
      </Box>

      {/* Rising Glow Accent / Breathing effect */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '55vh',
          background: `linear-gradient(to top, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.primary.main, 0.06)} 45%, transparent 100%)`,
          zIndex: 1,
          pointerEvents: 'none',
          animation: 'glowBreath 7s ease-in-out infinite alternate',
          '@keyframes glowBreath': {
            '0%': {
              opacity: 0.7,
              height: '48vh',
            },
            '100%': {
              opacity: 1,
              height: '58vh',
            }
          }
        }}
      />

      {/* Central Pulsing / Glowing Logo */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Glowing Background Radial */}
        <Box
          sx={{
            position: 'absolute',
            width: '250px',
            height: '250px',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.2)} 0%, transparent 70%)`,
            filter: 'blur(20px)',
            animation: 'radialPulse 4s ease-in-out infinite alternate',
            '@keyframes radialPulse': {
              '0%': { transform: 'scale(0.8)', opacity: 0.5 },
              '100%': { transform: 'scale(1.2)', opacity: 1 }
            }
          }}
        />

        <Box
          component="img"
          src="1x/1x/Asset 2.png"
          alt="Krix Logo"
          sx={{
            height: { xs: '80px', sm: '120px', md: '150px' },
            width: 'auto',
            filter: `drop-shadow(0 0 25px ${alpha(theme.palette.primary.main, 0.6)})`,
            animation: 'logoFloat 4s ease-in-out infinite alternate',
            '@keyframes logoFloat': {
              '0%': { transform: 'translateY(0px)' },
              '100%': { transform: 'translateY(-15px)' }
            }
          }}
        />
        
        {/* Nice subtle caption */}
        <Typography
          variant="h6"
          sx={{
            mt: 3,
            color: 'rgba(255, 255, 255, 0.4)',
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 700,
            fontSize: '0.9rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            animation: 'textPulse 3s ease-in-out infinite alternate',
            '@keyframes textPulse': {
              '0%': { opacity: 0.3, letterSpacing: '2px' },
              '100%': { opacity: 0.7, letterSpacing: '4px' }
            }
          }}
        >
          Krix
        </Typography>
      </Box>
    </Box>
  );
};

const DevTerminal = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const colorMode = useContext(ColorModeContext);

  const [isOpen, setIsOpen] = useState(false);
  const [showScreensaver, setShowScreensaver] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandValue, setCommandValue] = useState('');
  const [gameState, setGameState] = useState('idle'); // 'idle', 'playing_guess', 'entering_password'
  const [pendingThemeColor, setPendingThemeColor] = useState(null);
  const [gameTarget, setGameTarget] = useState(0);
  const [gameGuesses, setGameGuesses] = useState(0);
  const [consoleLines, setConsoleLines] = useState([
    { text: 'KRIX DEVELOPER SHELL [Version 1.0.0]', type: 'system' },
    { text: '(c) 2026 Krix. All rights reserved.', type: 'system' },
    { text: 'Type "help" to see available commands.', type: 'system' },
    { text: '', type: 'empty' },
  ]);

  const outputEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (outputEndRef.current) {
      outputEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleLines, isOpen]);

  // Autofocus input when terminal is clicked or opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard shortcut listener: backtick (`) to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle terminal on Backtick click, or Ctrl + `
      if (e.key === '`') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleGuessInput = (input) => {
    const lower = input.toLowerCase().trim();
    let outputs = [{ text: `guess > ${input}`, type: 'command' }];

    if (lower === 'exit' || lower === 'quit') {
      setGameState('idle');
      outputs.push({ text: 'Game session terminated. Returned to standard shell.', type: 'system' });
    } else {
      const guess = parseInt(input, 10);
      if (isNaN(guess)) {
        outputs.push({ text: 'Error: Please enter a valid number or type "exit" to quit.', type: 'error' });
      } else {
        const nextGuesses = gameGuesses + 1;
        setGameGuesses(nextGuesses);
        if (guess === gameTarget) {
          setGameState('idle');
          outputs.push({ text: `🎉 SUCCESS! You guessed the correct number (${gameTarget}) in ${nextGuesses} tries!`, type: 'success' });
        } else if (guess > gameTarget) {
          outputs.push({ text: 'Too high! Try a lower number.', type: 'info' });
        } else {
          outputs.push({ text: 'Too low! Try a higher number.', type: 'info' });
        }
      }
    }
    setConsoleLines((prev) => [...prev, ...outputs, { text: '', type: 'empty' }]);
  };

  const handlePasswordInput = (input) => {
    const trimmedInput = input.trim();
    const outputs = [];

    if (!trimmedInput || trimmedInput.toLowerCase() === 'exit' || trimmedInput.toLowerCase() === 'cancel') {
      setGameState('idle');
      setPendingThemeColor(null);
      outputs.push(
        { text: 'password: ', type: 'command' },
        { text: 'Authentication cancelled. Returned to standard shell.', type: 'system' }
      );
    } else {
      outputs.push({ text: `password: ${'•'.repeat(trimmedInput.length)}`, type: 'command' });
      if (trimmedInput === themePasswordData.themePassword) {
        setGameState('idle');
        colorMode.setAccentColor(pendingThemeColor);
        outputs.push({ text: `🎉 Access granted. Theme accent color updated to: "${pendingThemeColor}" successfully!`, type: 'success' });
        setPendingThemeColor(null);
      } else {
        setGameState('idle');
        setPendingThemeColor(null);
        outputs.push({ text: '❌ Access denied. Incorrect password.', type: 'error' });
      }
    }

    setConsoleLines((prev) => [...prev, ...outputs, { text: '', type: 'empty' }]);
  };

  const processCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();

    if (gameState === 'entering_password') {
      handlePasswordInput(cmdStr);
      return;
    }

    if (!trimmed) {
      setConsoleLines((prev) => [...prev, { text: gameState === 'playing_guess' ? 'guess > ' : 'visitor@krix.dev:~$ ', type: 'prompt' }]);
      return;
    }

    // Save history
    setHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    if (gameState === 'playing_guess') {
      handleGuessInput(trimmed);
      return;
    }

    const args = trimmed.split(' ');
    const primaryCmd = args[0].toLowerCase();
    const subCmd = args[1] ? args[1].toLowerCase() : '';

    let outputs = [{ text: `visitor@krix.dev:~$ ${trimmed}`, type: 'command' }];

    switch (primaryCmd) {
      case 'clear':
      case 'cls':
        setConsoleLines([]);
        return;

      case 'help':
        outputs.push(
          { text: 'Available commands:', type: 'system' },
          { text: '  about      - Display Krix\'s biography', type: 'info' },
          { text: '  skills     - View professional developer tools & stacks', type: 'info' },
          { text: '  projects   - List completed engineering and design work', type: 'info' },
          { text: '  preview    - Test any project in the simulator (usage: preview [id])', type: 'info' },
          { text: '  contact    - Display social profiles and communication links', type: 'info' },
          { text: '  theme      - Toggle website display mode (usage: theme [dark|white])', type: 'info' },
          { text: '  guess      - Play an interactive number-guessing game', type: 'info' },
          { text: '  history    - Show list of entered commands', type: 'info' },
          { text: '  screensaver- Launch the fullscreen background animation screensaver', type: 'info' },
          { text: '  clear      - Clear terminal screen buffers', type: 'info' },
          { text: '  exit       - Close the developer terminal panel', type: 'info' }
        );
        break;

      case 'theme':
        const targetMode = subCmd;
        if (!targetMode) {
          outputs.push(
            { text: 'Usage: theme [dark|white]', type: 'system' },
            { text: `Current theme mode: ${colorMode.mode.toUpperCase()}`, type: 'info' }
          );
        } else if (targetMode === 'dark') {
          if (colorMode.mode === 'dark') {
            outputs.push({ text: 'System is already configured for DARK theme.', type: 'info' });
          } else {
            colorMode.setColorMode('dark');
            outputs.push({ text: '🎉 Switched to DARK theme mode successfully.', type: 'success' });
          }
        } else if (targetMode === 'white' || targetMode === 'light') {
          if (colorMode.mode === 'light') {
            outputs.push({ text: 'System is already configured for LIGHT/WHITE theme.', type: 'info' });
          } else {
            colorMode.setColorMode('light');
            outputs.push({ text: '🎉 Switched to LIGHT/WHITE theme mode successfully.', type: 'success' });
          }
        } else {
          outputs.push({ text: `Error: Unknown theme mode option "${targetMode}". Try "theme dark" or "theme white".`, type: 'error' });
        }
        break;

      case 'guess':
        const targetNum = Math.floor(Math.random() * 100) + 1;
        setGameTarget(targetNum);
        setGameGuesses(0);
        setGameState('playing_guess');
        outputs.push(
          { text: '--- NUMBER GUESSING GAME ---', type: 'separator' },
          { text: 'I am thinking of a random number between 1 and 100.', type: 'system' },
          { text: 'Can you guess what it is? (Type "exit" to stop playing)', type: 'system' }
        );
        break;

      case 'history':
        outputs.push({ text: '--- COMMAND HISTORY ---', type: 'separator' });
        if (history.length === 0) {
          outputs.push({ text: 'No history found.', type: 'info' });
        } else {
          const chronHistory = [...history].reverse();
          chronHistory.forEach((cmd, idx) => {
            outputs.push({ text: `  ${idx + 1}  ${cmd}`, type: 'info' });
          });
        }
        break;

      case 'about':
        outputs.push(
          { text: '    _  __    _', type: 'logo' },
          { text: '   | |/ /   (_)__ __', type: 'logo' },
          { text: '   | \' <   / / \\ \\ /', type: 'logo' },
          { text: '   |_|\\_\\_/_/_/_\\_\\  dev shell v1.0', type: 'logo' },
          { text: '---------------------------------------------------', type: 'separator' },
          { text: 'Name:       Kirubha (aka Krix)', type: 'system' },
          { text: 'Age:        15-years-old', type: 'system' },
          { text: 'Role:       Front-end Web Developer & Graphic Designer', type: 'system' },
          { text: 'Bio:', type: 'system' },
          { text: '  I am a creator passionate about coding, design, and animation.', type: 'info' },
          { text: '  I combine software technology with aesthetics to build projects', type: 'info' },
          { text: '  that are both highly functional and visually immersive.', type: 'info' }
        );
        break;

      case 'skills':
      case 'stacks':
        // Format skills output in terminal
        const tools = stacks.map(s => s.name);
        outputs.push(
          { text: '--- EXPERTISE TOOLKIT ---', type: 'separator' },
          { text: 'Active Stack:', type: 'system' },
          { text: `  ${tools.slice(0, 6).join('  |  ')}`, type: 'info' },
          { text: `  ${tools.slice(6).join('  |  ')}`, type: 'info' }
        );
        break;

      case 'projects':
        outputs.push(
          { text: '--- PROJECTS DIRECTORY ---', type: 'separator' },
          { text: 'ID   PROJECT NAME         DESCRIPTION', type: 'system' }
        );
        projectsData.forEach((p, idx) => {
          const id = String(idx + 1).padEnd(4, ' ');
          const name = p.title.padEnd(20, ' ');
          outputs.push({ text: `${id} ${name} ${p.description}`, type: 'info' });
        });
        outputs.push(
          { text: '---------------------------------------------------', type: 'separator' },
          { text: 'Type "preview [ID]" to launch a project in the simulator viewport!', type: 'system' }
        );
        break;

      case 'preview':
        const pid = parseInt(args[1], 10);
        if (isNaN(pid) || pid < 1 || pid > projectsData.length) {
          outputs.push({ text: 'Error: Please specify a valid project ID (e.g. preview 1). Type "projects" to see ID list.', type: 'error' });
        } else {
          const selectedProj = projectsData[pid - 1];
          outputs.push({ text: `Initializing iframe simulator frame for: "${selectedProj.title}"...`, type: 'success' });
          // Launch the preview showroom via query params
          setTimeout(() => {
            navigate(`?preview=${encodeURIComponent(selectedProj.link)}&title=${encodeURIComponent(selectedProj.title)}`);
            setIsOpen(false); // minimize terminal to show the viewport preview
          }, 600);
        }
        break;

      case 'contact':
        if (subCmd === 'mail' || subCmd === 'email') {
          outputs.push({ text: 'Opening system mail client...', type: 'success' });
          window.open('mailto:hello@pkwebworks.com');
        } else if (subCmd === 'insta' || subCmd === 'instagram') {
          outputs.push({ text: 'Opening Instagram profile in new tab...', type: 'success' });
          window.open('https://www.instagram.com/madebykrix/', '_blank');
        } else if (subCmd === 'fb' || subCmd === 'facebook') {
          outputs.push({ text: 'Facebook is temporarily unavailable. Please try again later.', type: 'error' });
        } else if (subCmd === 'git' || subCmd === 'github') {
          outputs.push({ text: 'Opening GitHub profile in new tab...', type: 'success' });
          window.open('https://github.com/pkwebworks3', '_blank');
        } else if (subCmd === 'form' || subCmd === 'inquiry') {
          outputs.push({ text: 'Opening inquiry form in simulator...', type: 'success' });
          const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScEhsojHcF2sIs2OmZ_2xVYV1m2dsO00z5B-jRJ7fBEBJnRuw/viewform?usp=publish-editor";
          setTimeout(() => {
            navigate(`?preview=${encodeURIComponent(googleFormUrl)}&title=${encodeURIComponent("Project Inquiry Form")}`);
            setIsOpen(false);
          }, 600);
        } else {
          outputs.push(
            { text: '--- CONTACT INFORMATION ---', type: 'separator' },
            { text: '  Email:     hello@pkwebworks.com', type: 'info' },
            { text: '  Instagram: @madebykrix', type: 'info' },
            { text: '  Facebook:  (Unavailable)', type: 'error' },
            { text: '  GitHub:    github.com/pkwebworks3', type: 'info' },
            { text: '---------------------------------------------------', type: 'separator' },
            { text: 'Shortcuts to open instantly:', type: 'system' },
            { text: '  contact mail   - Compose email', type: 'info' },
            { text: '  contact insta  - Open Instagram', type: 'info' },
            { text: '  contact fb     - Open Facebook', type: 'info' },
            { text: '  contact github - Open GitHub repo', type: 'info' },
            { text: '  contact form   - Open inquiry form in simulator', type: 'info' }
          );
        }
        break;

      case 'matrix':
      case 'screensaver':
        outputs.push({ text: 'Entering screensaver mode. Press any key to exit.', type: 'success' });
        setTimeout(() => {
          setShowScreensaver(true);
        }, 500);
        break;

      case 'exit':
        outputs.push({ text: 'Closing session shell...', type: 'system' });
        setTimeout(() => {
          setIsOpen(false);
        }, 300);
        break;

      default:
        outputs.push({ text: `Shell error: Command not found: "${primaryCmd}". Type "help" for a list of commands.`, type: 'error' });
    }

    setConsoleLines((prev) => [...prev, ...outputs, { text: '', type: 'empty' }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(commandValue);
      setCommandValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setCommandValue(history[nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const prevIndex = historyIndex - 1;
      if (prevIndex >= 0) {
        setHistoryIndex(prevIndex);
        setCommandValue(history[prevIndex]);
      } else {
        setHistoryIndex(-1);
        setCommandValue('');
      }
    }
  };

  const getLineColor = (type) => {
    switch (type) {
      case 'command':
        return '#f8fafc'; // white
      case 'prompt':
        return '#00ff66'; // green prompt
      case 'logo':
      case 'separator':
        return theme.palette.secondary.main; // dynamic secondary accent
      case 'system':
        return theme.palette.primary.main; // dynamic primary accent
      case 'error':
        return '#f43f5e'; // red
      case 'success':
        return '#10b981'; // emerald
      default:
        return '#a1a1aa'; // grey info
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <Zoom in={!isOpen}>
        <Tooltip title="Toggle Dev Terminal (Hotkey: `)" placement="left" arrow>
          <IconButton
            onClick={() => setIsOpen(true)}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 9990,
              width: 56,
              height: 56,
              bgcolor: 'rgba(20, 20, 25, 0.75)',
              color: 'primary.main',
              border: '2px solid ' + alpha(theme.palette.primary.main, 0.45),
              boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 15px ${alpha(theme.palette.primary.main, 0.25)}`,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.18),
                color: '#fff',
                borderColor: 'primary.main',
                transform: 'scale(1.1) rotate(5deg)',
                boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.5)}`,
              },
            }}
          >
            <TerminalIcon />
          </IconButton>
        </Tooltip>
      </Zoom>

      {/* Fullscreen Background Animation Screen Saver */}
      {showScreensaver && <HeroScreensaver onClose={() => setShowScreensaver(false)} />}

      {/* Dev Terminal Window Overlay */}
      <AnimatePresence>
        {isOpen && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            onClick={handleTerminalClick}
            sx={{
              position: 'fixed',
              bottom: { xs: 16, sm: 32, md: 40 },
              right: { xs: 16, sm: 32, md: 40 },
              width: { xs: 'calc(100vw - 32px)', sm: '520px', md: '650px' },
              height: { xs: '450px', sm: '480px', md: '520px' },
              borderRadius: '16px',
              border: '2px solid ' + alpha(theme.palette.primary.main, 0.45),
              boxShadow: `0 30px 90px rgba(0, 0, 0, 0.85), 0 0 40px ${alpha(theme.palette.primary.main, 0.2)}`,
              bgcolor: 'rgba(10, 10, 15, 0.93)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 9995,
              overflow: 'hidden',
              cursor: 'text',
              fontFamily: 'monospace',
            }}
          >
            {/* Window Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 1.5,
                bgcolor: 'rgba(25, 25, 30, 0.85)',
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
              }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box
                  onClick={() => setIsOpen(false)}
                  sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56', cursor: 'pointer' }}
                />
                <Box
                  onClick={() => setIsOpen(false)}
                  sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e', cursor: 'pointer' }}
                />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27c93f', opacity: 0.6 }} />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  letterSpacing: '1px',
                  fontFamily: 'monospace',
                }}
              >
                KRIX_DEV_SHELL.EXE
              </Typography>
              <IconButton onClick={() => setIsOpen(false)} size="small" sx={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Box>

            {/* Scrollable Output Screen Area */}
            <Box
              sx={{
                flex: 1,
                p: 3,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                bgcolor: 'transparent',
                // Custom thin scrollbar
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-track': { background: 'transparent' },
                '&::-webkit-scrollbar-thumb': {
                  background: alpha(theme.palette.primary.main, 0.25),
                  borderRadius: '3px',
                  '&:hover': { background: theme.palette.primary.main },
                },
              }}
            >
              {consoleLines.map((line, idx) => (
                <Typography
                  key={idx}
                  variant="body2"
                  sx={{
                    color: getLineColor(line.type),
                    fontFamily: 'monospace',
                    fontSize: { xs: '0.75rem', sm: '0.85rem' },
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                  }}
                >
                  {line.text}
                </Typography>
              ))}
              <div ref={outputEndRef} />
            </Box>

            {/* Interactive Terminal Prompt Input Area */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 3,
                py: 2,
                bgcolor: 'rgba(15, 15, 20, 0.8)',
                borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: gameState === 'playing_guess' 
                    ? '#ffbd2e' 
                    : gameState === 'entering_password'
                    ? '#f43f5e'
                    : '#00ff66',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  fontSize: { xs: '0.75rem', sm: '0.85rem' },
                }}
              >
                {gameState === 'playing_guess' 
                  ? 'guess >' 
                  : gameState === 'entering_password'
                  ? 'password:'
                  : 'visitor@krix.dev:~$'}
              </Typography>
              <input
                ref={inputRef}
                type={gameState === 'entering_password' ? 'password' : 'text'}
                value={commandValue}
                onChange={(e) => setCommandValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={gameState === 'entering_password' ? 'Enter password...' : "type 'help'..."}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#f8fafc',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  caretColor: theme.palette.primary.main, // blinking cursor in theme accent
                }}
              />
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
};

export default DevTerminal;
