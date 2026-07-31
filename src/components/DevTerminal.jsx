import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, IconButton, Tooltip, Zoom, useTheme, alpha, Avatar } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import ForumIcon from '@mui/icons-material/Forum';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import CalculateIcon from '@mui/icons-material/Calculate';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import projectsData from '../data/projects_page.json';
import { stacks } from '../data/stacks';
import { ColorModeContext } from '../ThemeContext';
import themePasswordData from '../data/theme_password.json';

// --- MATH SOLVER PARSER IMPLEMENTATION ---

const parseArithmetic = (str) => {
  let expr = str.toLowerCase()
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/plus/g, '+')
    .replace(/minus/g, '-')
    .replace(/multiplied\s*by/g, '*')
    .replace(/divided\s*by/g, '/')
    .replace(/power\s*of/g, '^')
    .replace(/squared/g, '^2')
    .replace(/\s+/g, ''); // strip all spaces

  let index = 0;

  const peek = () => expr[index];
  const get = () => expr[index++];

  const number = () => {
    let start = index;
    if (peek() === '-' || peek() === '+') {
      get();
    }
    while ((peek() >= '0' && peek() <= '9') || peek() === '.') {
      get();
    }
    const val = parseFloat(expr.slice(start, index));
    if (isNaN(val)) throw new Error("Expected a valid number");
    return val;
  };

  const factor = () => {
    let val;
    if (peek() === '(') {
      get(); // '('
      val = expression();
      if (get() !== ')') throw new Error("Expected closing parenthesis");
    } else if (expr.slice(index, index + 5) === 'sqrt(') {
      index += 5;
      val = Math.sqrt(expression());
      if (get() !== ')') throw new Error("Expected closing parenthesis");
    } else if (expr.slice(index, index + 4) === 'sin(') {
      index += 4;
      val = Math.sin(expression() * Math.PI / 180);
      if (get() !== ')') throw new Error("Expected closing parenthesis");
    } else if (expr.slice(index, index + 4) === 'cos(') {
      index += 4;
      val = Math.cos(expression() * Math.PI / 180);
      if (get() !== ')') throw new Error("Expected closing parenthesis");
    } else if (expr.slice(index, index + 4) === 'tan(') {
      index += 4;
      val = Math.tan(expression() * Math.PI / 180);
      if (get() !== ')') throw new Error("Expected closing parenthesis");
    } else if (expr.slice(index, index + 4) === 'log(') {
      index += 4;
      val = Math.log10(expression());
      if (get() !== ')') throw new Error("Expected closing parenthesis");
    } else if (expr.slice(index, index + 3) === 'ln(') {
      index += 3;
      val = Math.log(expression());
      if (get() !== ')') throw new Error("Expected closing parenthesis");
    } else if (expr.slice(index, index + 4) === 'abs(') {
      index += 4;
      val = Math.abs(expression());
      if (get() !== ')') throw new Error("Expected closing parenthesis");
    } else if (expr.slice(index, index + 2) === 'pi') {
      index += 2;
      val = Math.PI;
    } else if (peek() === 'e' && (expr[index+1] === undefined || !/[a-z]/i.test(expr[index+1]))) {
      index += 1;
      val = Math.E;
    } else {
      val = number();
    }

    if (peek() === '^') {
      get(); // '^'
      val = Math.pow(val, factor());
    }
    return val;
  };

  const term = () => {
    let val = factor();
    while (peek() === '*' || peek() === '/' || peek() === '%') {
      let op = get();
      let next = factor();
      if (op === '*') val *= next;
      else if (op === '/') {
        if (next === 0) throw new Error("Division by zero error");
        val /= next;
      }
      else val %= next;
    }
    return val;
  };

  const expression = () => {
    let val = term();
    while (peek() === '+' || peek() === '-') {
      let op = get();
      let next = term();
      if (op === '+') val += next;
      else val -= next;
    }
    return val;
  };

  try {
    const result = expression();
    if (index < expr.length) {
      return { success: false, error: "Syntax error in expression" };
    }
    return { success: true, result };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const solveLinearEquation = (eqStr) => {
  let eq = eqStr.toLowerCase().replace(/\s+/g, '');
  if (!eq.includes('x') || !eq.includes('=')) {
    return null;
  }
  
  const sides = eq.split('=');
  if (sides.length !== 2) return null;
  
  const parseSide = (sideStr) => {
    let s = sideStr;
    if (!s) return { xCoeff: 0, constant: 0 };
    if (s[0] !== '+' && s[0] !== '-') s = '+' + s;
    
    const terms = s.match(/[+-]?[^+-]+/g) || [];
    let xCoeff = 0;
    let constant = 0;
    
    for (let term of terms) {
      if (term.includes('x')) {
        let coeffStr = term.replace('x', '');
        if (coeffStr === '+' || coeffStr === '') {
          xCoeff += 1;
        } else if (coeffStr === '-') {
          xCoeff -= 1;
        } else {
          xCoeff += parseFloat(coeffStr);
        }
      } else {
        constant += parseFloat(term);
      }
    }
    return { xCoeff, constant };
  };
  
  try {
    const left = parseSide(sides[0]);
    const right = parseSide(sides[1]);
    
    const finalXCoeff = left.xCoeff - right.xCoeff;
    const finalConstant = right.constant - left.constant;
    
    if (finalXCoeff === 0) {
      if (finalConstant === 0) {
        return {
          success: true,
          isEquation: true,
          result: "Infinitely many solutions (x is any real number)",
          steps: [
            `Original Equation: ${eqStr}`,
            `Simplify LHS: ${left.xCoeff}x + ${left.constant}`,
            `Simplify RHS: ${right.xCoeff}x + ${right.constant}`,
            `Grouping terms yields: 0x = 0`,
            `The equation is an identity (always true).`
          ]
        };
      } else {
        return {
          success: false,
          isEquation: true,
          error: "No solution",
          steps: [
            `Original Equation: ${eqStr}`,
            `Simplify LHS: ${left.xCoeff}x + ${left.constant}`,
            `Simplify RHS: ${right.xCoeff}x + ${right.constant}`,
            `Grouping terms yields: 0x = ${finalConstant}`,
            `This statement is mathematically impossible (false).`
          ]
        };
      }
    }
    
    const solution = finalConstant / finalXCoeff;
    const cleanSol = Number(solution.toFixed(4));
    
    const steps = [
      `1. Simplify expression on each side:`,
      `   • LHS: ${left.xCoeff}x ${left.constant >= 0 ? '+' : ''} ${left.constant}`,
      `   • RHS: ${right.xCoeff}x ${right.constant >= 0 ? '+' : ''} ${right.constant}`,
      `2. Isolate variables (x) on LHS and constants on RHS:`,
      `   • Subtract ${right.xCoeff}x from LHS: (${left.xCoeff} - ${right.xCoeff})x = ${finalXCoeff}x`,
      `   • Subtract ${left.constant} from RHS: ${right.constant} - ${left.constant} = ${finalConstant}`,
      `3. Resolve simple equation:`,
      `   • ${finalXCoeff}x = ${finalConstant}`,
      `4. Divide by variable coefficient (${finalXCoeff}):`,
      `   • x = ${finalConstant} / ${finalXCoeff}`
    ];
    
    return {
      success: true,
      isEquation: true,
      result: `x = ${cleanSol}`,
      steps
    };
  } catch (e) {
    return { success: false, isEquation: true, error: "Calculation parsing error. Check equation structure." };
  }
};

const extractMathExpression = (str) => {
  return str.toLowerCase()
    .replace(/what is|calculate|solve|evaluate|evaluate the expression|compute|please/gi, '')
    .replace(/\?/g, '')
    .trim();
};

const isMathExpression = (str) => {
  const clean = extractMathExpression(str);
  if (!/\d|pi|e/i.test(clean)) return false;
  
  const mathChars = /^[\d\s\+\-\*\/\(\)\.\^%#,a-z]+$/i;
  if (!mathChars.test(clean)) return false;
  
  const hasMathOps = /[\+\-\*\/\^%]/;
  const hasMathFuncs = /(sqrt|sin|cos|tan|log|ln|abs)\s*\(/;
  const hasEquals = /=/;
  return hasMathOps.test(clean) || hasMathFuncs.test(clean) || hasEquals.test(clean);
};

// --- SCREENSAVER SCREEN ---

const HeroScreensaver = ({ onClose }) => {
  const theme = useTheme();
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const exitScreensaver = (e) => {
      if (e.key === 'Backspace') {
        onClose();
      }
    };
    window.addEventListener('keydown', exitScreensaver);

    return () => {
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

      {/* Rising Glow Accent */}
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
            '0%': { opacity: 0.7, height: '48vh' },
            '100%': { opacity: 1, height: '58vh' }
          }
        }}
      />

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

// --- MAIN AI CHAT BOT COMPONENT ---

const DevTerminal = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const colorMode = useContext(ColorModeContext);

  const [isOpen, setIsOpen] = useState(false);
  const [showScreensaver, setShowScreensaver] = useState(false);
  const [commandValue, setCommandValue] = useState('');
  const [gameState, setGameState] = useState('idle'); // 'idle', 'playing_guess', 'entering_password'
  const [pendingThemeColor, setPendingThemeColor] = useState(null);
  const [gameTarget, setGameTarget] = useState(0);
  const [gameGuesses, setGameGuesses] = useState(0);
  
  // Chat History state
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hi there! I am Byte, Krix's AI assistant. 🤖\n\nI can show you Krix's portfolio, check technical tools, solve mathematical calculations, or switch theme colors! How can I help you today? Type 'help' to see what I can do.",
      timestamp: new Date(),
      type: 'text'
    }
  ]);

  // Input history for command recall (ArrowUp / ArrowDown)
  const [inputHistory, setInputHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const outputEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (outputEndRef.current) {
      outputEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Autofocus input when terminal is clicked or opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard shortcut listener: backtick (`) to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
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
    let botReplyText = "";
    let replyType = "info";

    if (lower === 'exit' || lower === 'quit') {
      setGameState('idle');
      botReplyText = 'Game session terminated. Returned to chatbot assistant.';
      replyType = 'system';
    } else {
      const guess = parseInt(input, 10);
      if (isNaN(guess)) {
        botReplyText = 'Error: Please enter a valid number or type "exit" to quit.';
        replyType = 'error';
      } else {
        const nextGuesses = gameGuesses + 1;
        setGameGuesses(nextGuesses);
        if (guess === gameTarget) {
          setGameState('idle');
          botReplyText = `🎉 SUCCESS! You guessed the correct number (${gameTarget}) in ${nextGuesses} tries!`;
          replyType = 'success';
          
          // Show message and reset
          setGameGuesses(0);
        } else if (guess > gameTarget) {
          botReplyText = `Too high! Try a lower number. (Guesses: ${nextGuesses})`;
          replyType = 'info';
        } else {
          botReplyText = `Too low! Try a higher number. (Guesses: ${nextGuesses})`;
          replyType = 'info';
        }
      }
    }

    const botMsg = {
      id: Date.now().toString() + "-bot",
      sender: 'bot',
      text: botReplyText,
      timestamp: new Date(),
      type: replyType === 'success' ? 'success' : replyType === 'error' ? 'error' : 'game'
    };

    setMessages((prev) => [...prev, botMsg]);
  };

  const handlePasswordInput = (input) => {
    const trimmedInput = input.trim();
    let botReplyText = "";
    let replyType = "info";

    if (!trimmedInput || trimmedInput.toLowerCase() === 'exit' || trimmedInput.toLowerCase() === 'cancel') {
      setGameState('idle');
      setPendingThemeColor(null);
      botReplyText = 'Authentication cancelled. Returned to chatbot assistant.';
      replyType = 'system';
    } else {
      if (trimmedInput === themePasswordData.themePassword) {
        setGameState('idle');
        colorMode.setAccentColor(pendingThemeColor);
        botReplyText = `🎉 Access granted! Theme accent color updated to: "${pendingThemeColor}" successfully!`;
        replyType = 'success';
        setPendingThemeColor(null);
      } else {
        setGameState('idle');
        setPendingThemeColor(null);
        botReplyText = '❌ Access denied. Incorrect password.';
        replyType = 'error';
      }
    }

    const botMsg = {
      id: Date.now().toString() + "-bot",
      sender: 'bot',
      text: botReplyText,
      timestamp: new Date(),
      type: replyType
    };

    setMessages((prev) => [...prev, botMsg]);
  };

  const processChatMessage = (userText) => {
    const trimmed = userText.trim();
    if (!trimmed) return;

    // Append user message
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: trimmed,
      timestamp: new Date(),
      type: 'text'
    };
    setMessages((prev) => [...prev, userMsg]);

    // Save into prompt history
    setInputHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    // 1. Process inline games / passcodes first
    if (gameState === 'entering_password') {
      handlePasswordInput(trimmed);
      return;
    }

    if (gameState === 'playing_guess') {
      handleGuessInput(trimmed);
      return;
    }

    const lower = trimmed.toLowerCase();

    // 2. Parse math expressions (equations or arithmetic)
    if (isMathExpression(trimmed)) {
      const isEq = lower.includes('=') && lower.includes('x');
      const cleanExpr = extractMathExpression(trimmed);
      
      let mathResult = null;
      if (isEq) {
        mathResult = solveLinearEquation(cleanExpr);
      } else {
        const arithmeticRes = parseArithmetic(cleanExpr);
        if (arithmeticRes.success) {
          mathResult = {
            success: true,
            isEquation: false,
            result: arithmeticRes.result,
            steps: [
              `Input math: ${cleanExpr}`,
              `Parsed arithmetic tokens successfully.`,
              `Evaluated operators in algebraic order (PEMDAS/BODMAS).`
            ]
          };
        } else {
          mathResult = {
            success: false,
            error: arithmeticRes.error
          };
        }
      }

      if (mathResult && mathResult.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "-bot",
            sender: 'bot',
            text: isEq ? "I've solved the algebra equation for you! 🧠" : "Here is the calculation result: 📐",
            timestamp: new Date(),
            type: 'math_solved',
            data: {
              isEquation: mathResult.isEquation,
              expression: cleanExpr,
              result: mathResult.result,
              steps: mathResult.steps
            }
          }
        ]);
        return;
      } else if (mathResult && !mathResult.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "-bot",
            sender: 'bot',
            text: `⚠️ Math solver error: ${mathResult.error || "Could not resolve math format. Try simple sums like '2 + 5 * 10' or linear equations like '3x + 5 = 20'."}`,
            timestamp: new Date(),
            type: 'error'
          }
        ]);
        return;
      }
    }

    // 3. Command/conversational routers
    if (lower === 'help' || lower === 'commands' || lower.includes('what can you do') || lower.includes('how to use')) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-bot",
          sender: 'bot',
          text: "Here is a list of features I can assist you with:\n\n" +
                "• **Calculate Math**: Try asking 'what is 25 * 4 + 10' or 'calculate sqrt(144) + 5^2'\n" +
                "• **Solve Algebra**: Enter any simple linear equation like '3x - 10 = 20'\n" +
                "• **View Projects**: Type 'projects' to browse Krix's completed websites & tools\n" +
                "• **View Skills**: Type 'skills' or 'toolkit' to see developer tools\n" +
                "• **Theme Switch**: Type 'theme light' or 'theme dark' to switch modes\n" +
                "• **Theme Accent**: Type 'accent green' or 'accent cyan' (requires password validation)\n" +
                "• **Play Game**: Type 'play guess' to play the number guessing game\n" +
                "• **Screensaver**: Type 'screensaver' to run the screen background visualization\n" +
                "• **Clear Chat**: Type 'clear' or click the reset button to start fresh\n" +
                "• **Close Assistant**: Type 'exit' or click the close icon",
          timestamp: new Date(),
          type: 'text'
        }
      ]);
      return;
    }

    if (lower === 'about' || lower === 'bio' || lower.includes('who are you') || lower.includes('biography') || lower.includes('profile') || lower.includes('tell me about yourself')) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-bot",
          sender: 'bot',
          text: "👨‍💻 **Kirubha (aka Krix)**\n" +
                "• 15-year-old Front-end Developer & Graphic Designer.\n" +
                "• Creative builder passionate about design, UI/UX aesthetics, coding, and immersive web animations.\n\n" +
                "He combines coding technologies with graphic aesthetics to construct functional portfolios and applications.",
          timestamp: new Date(),
          type: 'text'
        }
      ]);
      return;
    }

    if (lower.startsWith('preview') || lower.startsWith('launch') || lower.startsWith('run project')) {
      const parts = lower.split(' ');
      const val = parts[parts.length - 1];
      const pid = parseInt(val, 10);
      
      let selectedProj = null;
      if (!isNaN(pid) && pid >= 1 && pid <= projectsData.length) {
        selectedProj = projectsData[pid - 1];
      } else {
        // Try to match by title
        const searchStr = parts.slice(1).join(' ').trim();
        selectedProj = projectsData.find(p => p.title.toLowerCase().includes(searchStr));
      }

      if (selectedProj) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "-bot",
            sender: 'bot',
            text: `🚀 Initializing project preview simulator for: "${selectedProj.title}"... Window closing.`,
            timestamp: new Date(),
            type: 'success'
          }
        ]);
        setTimeout(() => {
          navigate(`?preview=${encodeURIComponent(selectedProj.link)}&title=${encodeURIComponent(selectedProj.title)}`);
          setIsOpen(false);
        }, 800);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "-bot",
            sender: 'bot',
            text: `⚠️ Project not found. Type "projects" to view active portfolios with direct preview buttons.`,
            timestamp: new Date(),
            type: 'error'
          }
        ]);
      }
      return;
    }

    if (lower === 'projects' || lower === 'portfolio' || lower === 'work' || lower.includes('what have you built') || lower.includes('show projects')) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-bot",
          sender: 'bot',
          text: "Here is Krix's completed engineering & design portfolio. Tapping a card opens the iframe simulator directly! 📱",
          timestamp: new Date(),
          type: 'projects'
        }
      ]);
      return;
    }

    if (lower === 'skills' || lower === 'stacks' || lower.includes('toolkit') || lower.includes('languages') || lower.includes('technologies')) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-bot",
          sender: 'bot',
          text: "Here is the toolkit of active developer software and design stacks used in projects: 🛠️",
          timestamp: new Date(),
          type: 'skills'
        }
      ]);
      return;
    }

    if (lower === 'contact' || lower === 'socials' || lower.includes('reach you') || lower.includes('how to contact') || lower.includes('social profiles')) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-bot",
          sender: 'bot',
          text: "Connect with Krix through these quick access buttons or email: 📬",
          timestamp: new Date(),
          type: 'contact'
        }
      ]);
      return;
    }

    // Contact link shortcuts
    if (lower === 'contact mail' || lower === 'contact email' || lower === 'email krix' || lower === 'mail') {
      window.open('mailto:hello@pkwebworks.com');
      setMessages((prev) => [...prev, { id: Date.now().toString() + "-bot", sender: 'bot', text: 'Opening system mail client...', timestamp: new Date(), type: 'success' }]);
      return;
    }
    if (lower === 'contact insta' || lower === 'contact instagram' || lower === 'instagram') {
      window.open('https://www.instagram.com/madebykrix/', '_blank');
      setMessages((prev) => [...prev, { id: Date.now().toString() + "-bot", sender: 'bot', text: 'Opening Instagram profile in a new tab...', timestamp: new Date(), type: 'success' }]);
      return;
    }
    if (lower === 'contact github' || lower === 'github') {
      window.open('https://github.com/pkwebworks3', '_blank');
      setMessages((prev) => [...prev, { id: Date.now().toString() + "-bot", sender: 'bot', text: 'Opening GitHub profile in a new tab...', timestamp: new Date(), type: 'success' }]);
      return;
    }
    if (lower === 'contact form' || lower === 'inquiry form' || lower === 'inquiry') {
      const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScEhsojHcF2sIs2OmZ_2xVYV1m2dsO00z5B-jRJ7fBEBJnRuw/viewform?usp=publish-editor";
      setMessages((prev) => [...prev, { id: Date.now().toString() + "-bot", sender: 'bot', text: 'Opening inquiry form in the simulator viewport...', timestamp: new Date(), type: 'success' }]);
      setTimeout(() => {
        navigate(`?preview=${encodeURIComponent(googleFormUrl)}&title=${encodeURIComponent("Project Inquiry Form")}`);
        setIsOpen(false);
      }, 800);
      return;
    }

    if (lower.startsWith('theme') || lower.includes('light mode') || lower.includes('dark mode') || lower.includes('switch theme') || lower.includes('white theme')) {
      const isLight = lower.includes('white') || lower.includes('light') || lower.includes('light mode');
      const isDark = lower.includes('dark') || lower.includes('dark mode');
      
      if (isLight) {
        if (colorMode.mode === 'light') {
          setMessages((prev) => [...prev, { id: Date.now().toString() + "-bot", sender: 'bot', text: 'Theme display is already set to LIGHT mode. ☀️', timestamp: new Date(), type: 'info' }]);
        } else {
          colorMode.setColorMode('light');
          setMessages((prev) => [...prev, { id: Date.now().toString() + "-bot", sender: 'bot', text: '🎉 Switched to LIGHT display mode successfully.', timestamp: new Date(), type: 'success' }]);
        }
      } else if (isDark) {
        if (colorMode.mode === 'dark') {
          setMessages((prev) => [...prev, { id: Date.now().toString() + "-bot", sender: 'bot', text: 'Theme display is already set to DARK mode. 🌙', timestamp: new Date(), type: 'info' }]);
        } else {
          colorMode.setColorMode('dark');
          setMessages((prev) => [...prev, { id: Date.now().toString() + "-bot", sender: 'bot', text: '🎉 Switched to DARK display mode successfully.', timestamp: new Date(), type: 'success' }]);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "-bot",
            sender: 'bot',
            text: `Current theme configuration: Mode is **${colorMode.mode.toUpperCase()}** and Accent is **${colorMode.accent.toUpperCase()}**.\n\nType "theme light" or "theme dark" to toggle.`,
            timestamp: new Date(),
            type: 'info'
          }
        ]);
      }
      return;
    }

    if (lower.startsWith('accent') || lower.includes('change accent') || lower.includes('accent color')) {
      const colors = ['orange', 'green', 'cyan', 'purple', 'pink'];
      let targetColor = null;
      for (const col of colors) {
        if (lower.includes(col)) {
          targetColor = col;
          break;
        }
      }
      
      if (!targetColor) {
        const hexMatch = lower.match(/#([0-9a-f]{3,6})/);
        if (hexMatch) {
          targetColor = hexMatch[0];
        }
      }

      if (targetColor) {
        setPendingThemeColor(targetColor);
        setGameState('entering_password');
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "-bot",
            sender: 'bot',
            text: `🔒 Modifying site accent to "${targetColor}" requires authorization password.\n\nPlease enter the access password: (Hint: developer's name)`,
            timestamp: new Date(),
            type: 'system'
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "-bot",
            sender: 'bot',
            text: `Accent option not recognized. Supported presets:\n` +
                  `• orange | green | cyan | purple | pink\n\n` +
                  `Usage: 'accent green' or 'change accent to cyan'`,
            timestamp: new Date(),
            type: 'error'
          }
        ]);
      }
      return;
    }

    if (lower === 'guess' || lower === 'game' || lower.includes('play guess') || lower.includes('play game')) {
      const targetNum = Math.floor(Math.random() * 100) + 1;
      setGameTarget(targetNum);
      setGameGuesses(0);
      setGameState('playing_guess');
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-bot",
          sender: 'bot',
          text: "🎮 --- NUMBER GUESSING GAME ---\n" +
                "I am thinking of a random number between 1 and 100.\n\n" +
                "Can you guess what it is? (Type 'exit' to stop playing)",
          timestamp: new Date(),
          type: 'game'
        }
      ]);
      return;
    }

    if (lower === 'screensaver' || lower === 'matrix' || lower === 'animation') {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-bot",
          sender: 'bot',
          text: 'Entering fullscreen graphics screensaver... Press "Backspace" key to exit.',
          timestamp: new Date(),
          type: 'success'
        }
      ]);
      setTimeout(() => {
        setShowScreensaver(true);
      }, 500);
      return;
    }

    if (lower === 'clear' || lower === 'cls' || lower === 'reset') {
      setMessages([
        {
          id: 'welcome',
          sender: 'bot',
          text: "Chat database reset successfully. I am ready for new queries! 🤖",
          timestamp: new Date(),
          type: 'text'
        }
      ]);
      return;
    }

    if (lower === 'exit' || lower === 'close' || lower === 'quit') {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-bot",
          sender: 'bot',
          text: "Closing Byte AI session. Have a great day! 👋",
          timestamp: new Date(),
          type: 'system'
        }
      ]);
      setTimeout(() => {
        setIsOpen(false);
      }, 400);
      return;
    }

    // Fallback AI conversation reply
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString() + "-bot",
        sender: 'bot',
        text: `I'm Byte, Krix's AI assistant, and I'm not quite sure how to process that. 🤖\n\nI can solve math calculations (e.g. '2 + 5 * 10'), resolve algebra equations (e.g. '3x + 10 = 25'), list projects, change theme settings, or play guess games. Try typing **'help'** to see my available queries!`,
        timestamp: new Date(),
        type: 'text'
      }
    ]);
  };

  const handleSend = () => {
    if (commandValue.trim()) {
      processChatMessage(commandValue);
      setCommandValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (inputHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < inputHistory.length) {
          setHistoryIndex(nextIndex);
          setCommandValue(inputHistory[nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const prevIndex = historyIndex - 1;
      if (prevIndex >= 0) {
        setHistoryIndex(prevIndex);
        setCommandValue(inputHistory[prevIndex]);
      } else {
        setHistoryIndex(-1);
        setCommandValue('');
      }
    }
  };

  const handleChipClick = (query) => {
    processChatMessage(query);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: "Hi there! I am Byte, Krix's AI assistant. 🤖\n\nI can show you Krix's portfolio, check technical tools, solve mathematical calculations, or switch theme colors! How can I help you today? Type 'help' to see what I can do.",
        timestamp: new Date(),
        type: 'text'
      }
    ]);
    setGameState('idle');
    setPendingThemeColor(null);
  };

  // Predefined quick chip queries
  const suggestionChips = [
    { label: "📁 Projects", query: "projects" },
    { label: "🧮 Calculate 15*8", query: "calculate 15 * 8" },
    { label: "📐 Solve 3x+5=20", query: "solve 3x + 5 = 20" },
    { label: "🛠️ Stacks", query: "skills" },
    { label: "🎮 Play Game", query: "play guess game" },
    { label: "🎨 Switch Theme", query: "theme" },
    { label: "📞 Contact", query: "contact" },
    { label: "ℹ️ About Krix", query: "about" }
  ];

  return (
    <>
      {/* Floating Toggle Button with Glowing Pulse */}
      <Zoom in={!isOpen}>
        <Tooltip title="Talk to AI Assistant (Hotkey: `)" placement="left" arrow>
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
              animation: 'chatPulse 3s infinite',
              '@keyframes chatPulse': {
                '0%': { boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 0 ${alpha(theme.palette.primary.main, 0.65)}` },
                '70%': { boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 12px ${alpha(theme.palette.primary.main, 0)}` },
                '100%': { boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 0 ${alpha(theme.palette.primary.main, 0)}` }
              },
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.18),
                color: '#fff',
                borderColor: 'primary.main',
                transform: 'scale(1.1) rotate(5deg)',
                boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.5)}`,
              },
            }}
          >
            <ForumIcon />
          </IconButton>
        </Tooltip>
      </Zoom>

      {/* Screen Saver Backing */}
      {showScreensaver && <HeroScreensaver onClose={() => setShowScreensaver(false)} />}

      {/* AI Assistant Chatbot Overlay Frame */}
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
              width: { xs: 'calc(100vw - 32px)', sm: '480px', md: '550px' },
              height: { xs: '520px', sm: '560px', md: '600px' },
              borderRadius: '20px',
              border: '1.5px solid ' + alpha(theme.palette.primary.main, 0.45),
              boxShadow: `0 30px 90px rgba(0, 0, 0, 0.8), 0 0 30px ${alpha(theme.palette.primary.main, 0.15)}`,
              bgcolor: 'rgba(10, 10, 15, 0.94)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 9995,
              overflow: 'hidden',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {/* Window Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2.5,
                py: 2,
                bgcolor: 'rgba(20, 20, 25, 0.85)',
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                  }}
                >
                  <SmartToyIcon sx={{ color: theme.palette.primary.main, fontSize: '1.1rem' }} />
                  {/* Pulsing online status indicator */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#00ff66',
                      border: '1.5px solid #0a0a0f',
                      animation: 'pulseOnline 2s infinite alternate',
                      '@keyframes pulseOnline': {
                        '0%': { transform: 'scale(0.85)', opacity: 0.6 },
                        '100%': { transform: 'scale(1.2)', opacity: 1 }
                      }
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      letterSpacing: '0.5px',
                      fontFamily: '"Outfit", sans-serif',
                    }}
                  >
                    BYTE
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#00ff66',
                      fontWeight: 'bold',
                      fontSize: '0.65rem',
                      display: 'block',
                      fontFamily: 'monospace',
                    }}
                  >
                    ONLINE &bull; READY
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton onClick={handleResetChat} size="small" sx={{ color: 'rgba(255, 255, 255, 0.45)', '&:hover': { color: 'primary.main' } }} title="Reset Conversation">
                  <AutorenewIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => setIsOpen(false)} size="small" sx={{ color: 'rgba(255, 255, 255, 0.45)', '&:hover': { color: '#ff5f56' } }} title="Minimize">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Chat Messages Body Screen */}
            <Box
              sx={{
                flex: 1,
                p: 2.5,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: 'transparent',
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-track': { background: 'transparent' },
                '&::-webkit-scrollbar-thumb': {
                  background: alpha(theme.palette.primary.main, 0.25),
                  borderRadius: '3px',
                  '&:hover': { background: theme.palette.primary.main },
                },
              }}
            >
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <Box
                    key={msg.id}
                    component={motion.div}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    sx={{
                      display: 'flex',
                      gap: 1.5,
                      alignSelf: isUser ? 'flex-end' : 'flex-start',
                      flexDirection: isUser ? 'row-reverse' : 'row',
                      maxWidth: '85%',
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: isUser ? theme.palette.secondary.main : theme.palette.primary.main,
                        boxShadow: `0 0 8px ${alpha(isUser ? theme.palette.secondary.main : theme.palette.primary.main, 0.4)}`,
                        width: 32,
                        height: 32,
                      }}
                    >
                      {isUser ? <PersonIcon sx={{ fontSize: '1.1rem', color: '#fff' }} /> : <SmartToyIcon sx={{ fontSize: '1.1rem', color: '#fff' }} />}
                    </Avatar>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box
                        sx={{
                          bgcolor: isUser 
                            ? theme.palette.primary.main 
                            : (theme.palette.mode === 'dark' ? 'rgba(25, 25, 30, 0.65)' : 'rgba(240, 240, 245, 0.95)'),
                          backgroundImage: isUser 
                            ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)` 
                            : 'none',
                          color: isUser ? '#fff' : theme.palette.text.primary,
                          border: isUser ? 'none' : ('1px solid ' + (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)')),
                          px: 2,
                          py: 1.5,
                          borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          wordBreak: 'break-word',
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '0.85rem',
                            lineHeight: 1.5,
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {msg.text}
                        </Typography>

                        {/* Rendering special sub-components based on type */}

                        {msg.type === 'projects' && (
                          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {projectsData.slice(0, 4).map((proj, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  display: 'flex',
                                  gap: 1.5,
                                  p: 1.2,
                                  borderRadius: '10px',
                                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(20, 20, 25, 0.7)' : 'rgba(255,255,255,0.7)',
                                  border: '1px solid ' + (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'),
                                  transition: 'all 0.2s',
                                  '&:hover': {
                                    borderColor: theme.palette.primary.main,
                                    transform: 'scale(1.01)',
                                  }
                                }}
                              >
                                {proj.project_thumb && (
                                  <Box
                                    component="img"
                                    src={proj.project_thumb}
                                    alt={proj.title}
                                    sx={{
                                      width: 64,
                                      height: 48,
                                      borderRadius: '6px',
                                      objectFit: 'cover',
                                      border: '1px solid rgba(255,255,255,0.08)'
                                    }}
                                  />
                                )}
                                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                  <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.78rem', color: theme.palette.text.primary, lineHeight: 1.2 }}>
                                      {proj.title}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', mt: 0.3 }}>
                                      {proj.description}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.8 }}>
                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                      {proj.tags.slice(0, 2).map((t, tIdx) => (
                                        <Box
                                          key={tIdx}
                                          sx={{
                                            px: 0.8,
                                            py: 0.1,
                                            borderRadius: '100px',
                                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                                            color: theme.palette.primary.main,
                                            fontSize: '0.6rem',
                                            fontWeight: 'bold',
                                          }}
                                        >
                                          {t}
                                        </Box>
                                      ))}
                                    </Box>
                                    <Box
                                      onClick={() => {
                                        setIsOpen(false);
                                        navigate(`?preview=${encodeURIComponent(proj.link)}&title=${encodeURIComponent(proj.title)}`);
                                      }}
                                      sx={{
                                        px: 1.2,
                                        py: 0.3,
                                        borderRadius: '100px',
                                        bgcolor: theme.palette.primary.main,
                                        color: '#fff',
                                        fontSize: '0.65rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                          bgcolor: theme.palette.secondary.main,
                                        }
                                      }}
                                    >
                                      Preview
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        )}

                        {msg.type === 'skills' && (
                          <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                            {stacks.map((stack, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.8,
                                  px: 1.2,
                                  py: 0.5,
                                  borderRadius: '100px',
                                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 35, 0.7)' : '#fff',
                                  border: '1px solid ' + (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'),
                                }}
                              >
                                {stack.img && (
                                  <Box
                                    component="img"
                                    src={stack.img}
                                    alt={stack.name}
                                    sx={{ width: 12, height: 12, objectFit: 'contain' }}
                                  />
                                )}
                                <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.7rem', color: theme.palette.text.primary }}>
                                  {stack.name}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        )}

                        {msg.type === 'contact' && (
                          <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                            <Box
                              onClick={() => window.open('mailto:hello@pkwebworks.com')}
                              sx={{
                                p: 1,
                                borderRadius: '100px',
                                bgcolor: theme.palette.primary.main,
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: '0.72rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': { bgcolor: theme.palette.secondary.main }
                              }}
                            >
                              Email
                            </Box>
                            <Box
                              onClick={() => window.open('https://www.instagram.com/madebykrix/', '_blank')}
                              sx={{
                                p: 1,
                                borderRadius: '100px',
                                bgcolor: 'rgba(225, 48, 108, 0.12)',
                                border: '1px solid rgba(225, 48, 108, 0.3)',
                                color: '#e1306c',
                                fontWeight: 'bold',
                                fontSize: '0.72rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': { bgcolor: 'rgba(225, 48, 108, 0.2)' }
                              }}
                            >
                              Instagram
                            </Box>
                            <Box
                              onClick={() => window.open('https://github.com/pkwebworks3', '_blank')}
                              sx={{
                                p: 1,
                                borderRadius: '100px',
                                bgcolor: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: theme.palette.text.primary,
                                fontWeight: 'bold',
                                fontSize: '0.72rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' }
                              }}
                            >
                              GitHub
                            </Box>
                            <Box
                              onClick={() => {
                                setIsOpen(false);
                                const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScEhsojHcF2sIs2OmZ_2xVYV1m2dsO00z5B-jRJ7fBEBJnRuw/viewform?usp=publish-editor";
                                navigate(`?preview=${encodeURIComponent(googleFormUrl)}&title=${encodeURIComponent("Project Inquiry Form")}`);
                              }}
                              sx={{
                                p: 1,
                                borderRadius: '100px',
                                bgcolor: 'rgba(0, 240, 255, 0.12)',
                                border: '1px solid rgba(0, 240, 255, 0.3)',
                                color: '#00f0ff',
                                fontWeight: 'bold',
                                fontSize: '0.72rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': { bgcolor: 'rgba(0, 240, 255, 0.2)' }
                              }}
                            >
                              Inquiry Form
                            </Box>
                          </Box>
                        )}

                        {msg.type === 'math_solved' && msg.data && (
                          <Box
                            sx={{
                              mt: 2,
                              p: 1.5,
                              borderRadius: '10px',
                              bgcolor: theme.palette.mode === 'dark' ? 'rgba(15, 15, 20, 0.8)' : '#fff',
                              borderLeft: `4px solid ${theme.palette.primary.main}`,
                              borderTop: '1px solid ' + (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'),
                              borderRight: '1px solid ' + (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'),
                              borderBottom: '1px solid ' + (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'),
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1.2 }}>
                              <CalculateIcon sx={{ color: theme.palette.primary.main, fontSize: '1rem' }} />
                              <Typography variant="caption" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                                {msg.data.isEquation ? 'Equation Solver' : 'Arithmetic Result'}
                              </Typography>
                            </Box>
                            
                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mb: 0.3 }}>
                              Input:
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 'bold', bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)', p: 0.8, borderRadius: '4px', mb: 1.2, fontSize: '0.8rem' }}>
                              {msg.data.expression}
                            </Typography>

                            {msg.data.steps && msg.data.steps.length > 0 && (
                              <Box sx={{ mb: 1.2 }}>
                                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mb: 0.4 }}>
                                  Solution Steps:
                                </Typography>
                                <Box sx={{ pl: 1, display: 'flex', flexDirection: 'column', gap: 0.3, borderLeft: '1px dashed ' + (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)') }}>
                                  {msg.data.steps.map((step, sIdx) => (
                                    <Typography key={sIdx} variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem', display: 'block' }}>
                                      {step}
                                    </Typography>
                                  ))}
                                </Box>
                              </Box>
                            )}

                            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 1, borderTop: '1px solid ' + (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'), pt: 1 }}>
                              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                Solution:
                              </Typography>
                              <Typography variant="subtitle1" sx={{ fontWeight: 900, color: '#10b981', fontFamily: 'monospace' }}>
                                {msg.data.result}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Box>
                      
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.3)',
                          fontSize: '0.62rem',
                          alignSelf: isUser ? 'flex-end' : 'flex-start',
                          px: 0.5,
                        }}
                      >
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
              <div ref={outputEndRef} />
            </Box>

            {/* Quick Suggestion Chips Container */}
            <Box
              sx={{
                px: 2.5,
                py: 1,
                bgcolor: 'rgba(15, 15, 20, 0.4)',
                borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                display: 'flex',
                gap: 1,
                overflowX: 'auto',
                '&::-webkit-scrollbar': { display: 'none' }, // hide scrollbar
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              {suggestionChips.map((chip, idx) => (
                <Box
                  key={idx}
                  onClick={() => handleChipClick(chip.query)}
                  sx={{
                    whiteSpace: 'nowrap',
                    px: 1.5,
                    py: 0.6,
                    borderRadius: '100px',
                    bgcolor: 'rgba(255, 255, 255, 0.03)',
                    border: '1.2px solid ' + alpha(theme.palette.primary.main, 0.25),
                    color: theme.palette.text.primary,
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.12),
                      borderColor: theme.palette.primary.main,
                      transform: 'translateY(-1px)',
                    }
                  }}
                >
                  {chip.label}
                </Box>
              ))}
            </Box>

            {/* Interactive Chat Input Area */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2.5,
                py: 2,
                bgcolor: 'rgba(15, 15, 20, 0.95)',
                borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: gameState === 'playing_guess' 
                    ? '#ffbd2e' 
                    : gameState === 'entering_password'
                    ? '#f43f5e'
                    : 'primary.main',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                }}
              >
                {gameState === 'playing_guess' 
                  ? 'GUESS >' 
                  : gameState === 'entering_password'
                  ? 'PASSWD >'
                  : 'AI >'}
              </Typography>
              <input
                ref={inputRef}
                type={gameState === 'entering_password' ? 'password' : 'text'}
                value={commandValue}
                onChange={(e) => setCommandValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  gameState === 'entering_password' 
                    ? 'Enter accent authorization passcode...' 
                    : gameState === 'playing_guess'
                    ? 'Enter game number guess...'
                    : "Ask Byte or type math equation..."
                }
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#f8fafc',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '0.85rem',
                  caretColor: theme.palette.primary.main,
                }}
              />
              <IconButton
                onClick={handleSend}
                disabled={!commandValue.trim()}
                sx={{
                  color: commandValue.trim() ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.15)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    color: commandValue.trim() ? theme.palette.secondary.main : 'rgba(255, 255, 255, 0.15)',
                    transform: commandValue.trim() ? 'translateY(-1px) scale(1.05)' : 'none',
                  }
                }}
              >
                <SendIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
};

export default DevTerminal;
