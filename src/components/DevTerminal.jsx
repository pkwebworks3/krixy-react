import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, IconButton, Tooltip, Zoom, useTheme, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalIcon from '@mui/icons-material/Terminal';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Remove';
import projectsData from '../data/projects_page.json';
import { stacks } from '../data/stacks';

// Matrix code rain screen-saver overlay
const MatrixRain = ({ onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Characters to drop (katakana, alphabets, numbers)
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    const charArr = chars.split('');

    const fontSize = 16;
    const columns = Math.ceil(canvas.width / fontSize);
    
    // Y-coordinate drop states
    const drops = Array(columns).fill(1);

    const draw = () => {
      // Semi-transparent black background to create trail effect
      ctx.fillStyle = 'rgba(9, 9, 11, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Neon orange text matching Krix's style
      ctx.fillStyle = '#ff6b00';
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw character
        ctx.fillText(text, x, y);

        // Reset or drop y coordinate
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    // Any keypress or click exits the screensaver
    const exitScreensaver = () => {
      onClose();
    };
    window.addEventListener('keydown', exitScreensaver);
    window.addEventListener('click', exitScreensaver);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', exitScreensaver);
      window.removeEventListener('click', exitScreensaver);
    };
  }, [onClose]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 10000,
        cursor: 'none',
        background: '#09090b',
      }}
    />
  );
};

const DevTerminal = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandValue, setCommandValue] = useState('');
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

  const processCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) {
      setConsoleLines((prev) => [...prev, { text: 'visitor@krix.dev:~$ ', type: 'prompt' }]);
      return;
    }

    // Save history
    setHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

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
          { text: '  matrix     - Launch the fullscreen neon-orange screensaver', type: 'info' },
          { text: '  clear      - Clear terminal screen buffers', type: 'info' },
          { text: '  exit       - Close the developer terminal panel', type: 'info' }
        );
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
          window.open('https://www.instagram.com/kirubha.exe/', '_blank');
        } else if (subCmd === 'git' || subCmd === 'github') {
          outputs.push({ text: 'Opening GitHub profile in new tab...', type: 'success' });
          window.open('https://github.com/pkwebworks3', '_blank');
        } else {
          outputs.push(
            { text: '--- CONTACT INFORMATION ---', type: 'separator' },
            { text: '  Email:     hello@pkwebworks.com', type: 'info' },
            { text: '  Instagram: @kirubha.exe', type: 'info' },
            { text: '  GitHub:    github.com/pkwebworks3', type: 'info' },
            { text: '---------------------------------------------------', type: 'separator' },
            { text: 'Shortcuts to open instantly:', type: 'system' },
            { text: '  contact mail   - Compose email', type: 'info' },
            { text: '  contact insta  - Open Instagram', type: 'info' },
            { text: '  contact github - Open GitHub repo', type: 'info' }
          );
        }
        break;

      case 'matrix':
        outputs.push({ text: 'Entering screensaver mode. Press any key to exit.', type: 'success' });
        setTimeout(() => {
          setShowMatrix(true);
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
        return '#ea580c'; // dark orange
      case 'system':
        return '#ff8500'; // light orange
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
              color: '#ff6b00',
              border: '2px solid rgba(255, 107, 0, 0.45)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 107, 0, 0.25)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              '&:hover': {
                bgcolor: 'rgba(255, 107, 0, 0.18)',
                color: '#fff',
                borderColor: '#ff6b00',
                transform: 'scale(1.1) rotate(5deg)',
                boxShadow: '0 12px 40px rgba(255, 107, 0, 0.5)',
              },
            }}
          >
            <TerminalIcon />
          </IconButton>
        </Tooltip>
      </Zoom>

      {/* Fullscreen Code Rain Screen Saver */}
      {showMatrix && <MatrixRain onClose={() => setShowMatrix(false)} />}

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
              border: '2px solid rgba(255, 107, 0, 0.45)',
              boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85), 0 0 40px rgba(255, 107, 0, 0.2)',
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
                borderBottom: '1px solid rgba(255, 107, 0, 0.15)',
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
                  background: 'rgba(255, 107, 0, 0.25)',
                  borderRadius: '3px',
                  '&:hover': { background: '#ff6b00' },
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
                borderTop: '1px solid rgba(255, 107, 0, 0.15)',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#00ff66',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  fontSize: { xs: '0.75rem', sm: '0.85rem' },
                }}
              >
                visitor@krix.dev:~$
              </Typography>
              <input
                ref={inputRef}
                type="text"
                value={commandValue}
                onChange={(e) => setCommandValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help'..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#f8fafc',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  caretColor: '#ff6b00', // blinking cursor in theme accent
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
