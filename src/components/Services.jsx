import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Card, useTheme, alpha, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ConstructionIcon from '@mui/icons-material/Construction';
import TiltCard from './TiltCard';

// ---------------------------------------------------------
// WIDGET 1: IDE Preview (Frontend Development)
// ---------------------------------------------------------
const IdePreview = () => {
  const [activeTab, setActiveTab] = useState('App.jsx');
  const theme = useTheme();
  
  const files = {
    'App.jsx': `import React from 'react';
import { BentoGrid } from './components';

export default function App() {
  return (
    <main className="portfolio">
      <BentoGrid theme="ambient" />
    </main>
  );
}`,
    'Layout.css': `.portfolio {
  background: radial-gradient(circle, #ff6b001a, #000);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}`,
    'index.js': `// Entry Point
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);`
  };

  const renderLine = (text) => {
    const keywords = ['import', 'export', 'default', 'function', 'return', 'const', 'let', 'from'];
    let styled = text;
    // escape HTML
    styled = styled.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    // keywords
    keywords.forEach(kw => {
      const reg = new RegExp(`\\b${kw}\\b`, 'g');
      styled = styled.replace(reg, `<span style="color: #c678dd">${kw}</span>`);
    });
    
    // strings
    styled = styled.replace(/(".*?")/g, `<span style="color: #98c379">$1</span>`);
    styled = styled.replace(/('.*?')/g, `<span style="color: #98c379">$1</span>`);
    
    // comments
    styled = styled.replace(/(\/\/.*)$/g, `<span style="color: #5c6370">$1</span>`);
    
    return <span dangerouslySetInnerHTML={{ __html: styled }} />;
  };

  return (
    <Box sx={{
      width: '100%',
      bgcolor: '#0f0f11',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.06)',
      overflow: 'hidden',
      fontFamily: '"Fira Code", monospace',
      fontSize: '0.75rem',
      boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
      height: '100%',
      minHeight: '220px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Window Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, bgcolor: '#16161a', borderBottom: '1px solid rgba(255,255,255,0.06)', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 0.8 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ff5f56' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#27c93f' }} />
        </Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>IDE Preview</Typography>
        <Box sx={{ width: 30 }} />
      </Box>
      {/* File Tabs */}
      <Box sx={{ display: 'flex', bgcolor: '#121215', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        {Object.keys(files).map(filename => (
          <Box
            key={filename}
            onClick={() => setActiveTab(filename)}
            sx={{
              px: 2,
              py: 0.8,
              cursor: 'pointer',
              bgcolor: activeTab === filename ? '#0f0f11' : 'transparent',
              color: activeTab === filename ? theme.palette.primary.main : 'rgba(255,255,255,0.4)',
              borderBottom: activeTab === filename ? `2px solid ${theme.palette.primary.main}` : 'none',
              fontSize: '0.7rem',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              '&:hover': { color: theme.palette.primary.light }
            }}
          >
            {filename}
          </Box>
        ))}
      </Box>
      {/* Code Area */}
      <Box sx={{ p: 2, flexGrow: 1, textAlign: 'left', overflow: 'auto', whiteSpace: 'pre', color: '#e5c07b' }}>
        <code style={{ fontFamily: 'inherit', color: 'inherit' }}>
          {files[activeTab].split('\n').map((line, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '12px' }}>
              <span style={{ color: 'rgba(255,255,255,0.2)', width: '20px', textAlign: 'right', userSelect: 'none' }}>{idx + 1}</span>
              <span>{renderLine(line)}</span>
            </div>
          ))}
        </code>
      </Box>
    </Box>
  );
};

// ---------------------------------------------------------
// WIDGET 2: Responsive Viewport Resizer (Responsive UI/UX)
// ---------------------------------------------------------
const ResponsiveResizer = () => {
  const [device, setDevice] = useState('desktop');
  const theme = useTheme();
  
  const getWidth = () => {
    if (device === 'mobile') return '140px';
    if (device === 'tablet') return '230px';
    return '100%';
  };

  const getCols = () => {
    if (device === 'mobile') return '1fr';
    if (device === 'tablet') return '1fr 1fr';
    return '1fr 1fr 1fr';
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      {/* Device Selectors */}
      <Box sx={{ display: 'flex', gap: 0.5, bgcolor: 'rgba(255,255,255,0.03)', p: 0.5, borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
        {['desktop', 'tablet', 'mobile'].map(d => (
          <Button
            key={d}
            onClick={() => setDevice(d)}
            size="small"
            sx={{
              px: 1.5,
              py: 0.4,
              borderRadius: '15px',
              bgcolor: device === d ? theme.palette.primary.main : 'transparent',
              color: device === d ? '#ffffff' : 'rgba(255,255,255,0.6)',
              fontSize: '0.7rem',
              minWidth: 'auto',
              fontWeight: 700,
              height: '24px',
              boxShadow: device === d ? `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}` : 'none',
              '&:hover': {
                bgcolor: device === d ? theme.palette.primary.main : 'rgba(255,255,255,0.06)',
                transform: 'none'
              }
            }}
          >
            {d}
          </Button>
        ))}
      </Box>
      {/* Device Frame */}
      <Box sx={{
        width: '100%',
        height: '240px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(0,0,0,0.2)',
        borderRadius: '16px',
        p: 2,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        <Box
          component={motion.div}
          animate={{ width: getWidth() }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          sx={{
            height: '100%',
            bgcolor: '#121214',
            borderRadius: '12px',
            border: '2.5px solid rgba(255,255,255,0.12)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          {/* Mock Browser/Device Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, p: 0.8, bgcolor: '#0b0b0d', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#ef4444' }} />
            <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#f59e0b' }} />
            <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#10b981' }} />
            <Box sx={{ flexGrow: 1, bgcolor: 'rgba(255,255,255,0.04)', borderRadius: '4px', height: '8px', mx: 1 }} />
          </Box>
          {/* Mock Website content */}
          <Box sx={{ p: 1.2, flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 1 }}>
            {/* Headline */}
            <Box sx={{ height: 10, bgcolor: theme.palette.primary.main, borderRadius: '3px', width: '60%' }} />
            <Box sx={{ height: 6, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '2px', width: '80%' }} />
            
            {/* Grid Items */}
            <Box
              component={motion.div}
              layout
              style={{
                display: 'grid',
                gridTemplateColumns: getCols(),
                gap: '6px',
                marginTop: '6px'
              }}
            >
              {[1, 2, 3].map(id => (
                <Box
                  key={id}
                  component={motion.div}
                  layout
                  sx={{
                    height: '50px',
                    bgcolor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 0.6
                  }}
                >
                  <Box sx={{ width: '40%', height: 5, bgcolor: theme.palette.secondary.main, borderRadius: '2px' }} />
                  <Box sx={{ width: '90%', height: 4, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '1px' }} />
                  <Box sx={{ width: '70%', height: 4, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '1px' }} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// ---------------------------------------------------------
// WIDGET 3: Physics/Particle Sandbox (Creative Animations)
// ---------------------------------------------------------
const PhysicsSandbox = () => {
  const canvasRef = useRef(null);
  const theme = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    
    const spawnParticles = (x, y) => {
      for (let i = 0; i < 2; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 1.0, // drift up
          size: Math.random() * 4 + 2,
          alpha: 1,
          color: Math.random() > 0.5 ? theme.palette.primary.main : theme.palette.secondary.main,
          decay: 0.015 + Math.random() * 0.01
        });
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnParticles(x, y);
    };
    
    const handleTouchMove = (e) => {
      if (e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      spawnParticles(x, y);
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', resize);
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (particles.length === 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.font = '500 13px "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Hover or drag cursor here to play', canvas.width / 2, canvas.height / 2);
      }
      
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.size *= 0.98;
        
        if (p.alpha <= 0 || p.size <= 0.5) {
          particles.splice(idx, 1);
          return;
        }
        
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', resize);
    };
  }, [theme.palette.primary.main, theme.palette.secondary.main]);
  
  return (
    <Box sx={{
      width: '100%',
      height: '240px',
      position: 'relative',
      bgcolor: 'rgba(0,0,0,0.2)',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.05)',
      cursor: 'none'
    }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </Box>
  );
};

// ---------------------------------------------------------
// WIDGET 4: Mini Console/Checklist (Utility Apps)
// ---------------------------------------------------------
const UtilityConsole = () => {
  const [history, setHistory] = useState([
    { type: 'system', text: 'KRIX OS v2.0 LIVE TERMINAL' },
    { type: 'system', text: 'Type a command or click a suggestion below.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const historyContainerRef = useRef(null);
  const theme = useTheme();

  const commands = {
    '/help': 'Commands: /skills, /projects, /about, /clear',
    '/skills': 'Techs: React, ES6 JS, Vite, HTML5/CSS3, MUI, Framer Motion',
    '/projects': 'Portfolio projects count: 3 Featured, 8 total.',
    '/about': 'Krix: Creative developer specialized in clean, high-performance UI/UX.'
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    let newHistory = [...history, { type: 'user', text: trimmed }];

    if (trimmed.toLowerCase() === '/clear') {
      newHistory = [];
    } else if (commands[trimmed.toLowerCase()]) {
      newHistory.push({ type: 'system', text: commands[trimmed.toLowerCase()] });
    } else {
      newHistory.push({ type: 'system', text: `Command not found. Type /help` });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  useEffect(() => {
    if (historyContainerRef.current) {
      historyContainerRef.current.scrollTop = historyContainerRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <Box sx={{
      width: '100%',
      bgcolor: '#0a0a0d',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.06)',
      overflow: 'hidden',
      fontFamily: '"Fira Code", monospace',
      fontSize: '0.72rem',
      boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
      height: '100%',
      minHeight: '220px',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left'
    }}>
      {/* Console Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, bgcolor: '#121215', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Box sx={{ display: 'flex', gap: 0.8, mr: 2 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4ade80' }} />
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4ade80', opacity: 0.5 }} />
        </Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.62rem', letterSpacing: 0.5 }}>krix@utility-console:~</Typography>
      </Box>
      {/* Console History */}
      <Box 
        ref={historyContainerRef}
        sx={{ p: 2, flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1, maxHeight: '115px' }}
      >
        {history.map((h, i) => (
          <div key={i}>
            {h.type === 'user' ? (
              <span style={{ color: theme.palette.primary.main }}>$ {h.text}</span>
            ) : (
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>{h.text}</span>
            )}
          </div>
        ))}
      </Box>
      {/* Quick Suggestions */}
      <Box sx={{ px: 2, py: 0.8, display: 'flex', gap: 0.6, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.03)', bgcolor: '#0e0e11' }}>
        {Object.keys(commands).map(cmd => (
          <Box
            key={cmd}
            onClick={() => handleCommand(cmd)}
            sx={{
              px: 1.0,
              py: 0.2,
              borderRadius: '4px',
              bgcolor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              fontSize: '0.65rem',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.12),
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main
              }
            }}
          >
            {cmd}
          </Box>
        ))}
      </Box>
      {/* Console Input */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 0.8, borderTop: '1px solid rgba(255,255,255,0.05)', bgcolor: '#0a0a0d' }}>
        <span style={{ color: theme.palette.primary.main, marginRight: '6px', fontWeight: 'bold' }}>$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCommand(inputVal);
          }}
          placeholder="Type command..."
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#ffffff',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            width: '100%'
          }}
        />
      </Box>
    </Box>
  );
};

// ---------------------------------------------------------
// BENTO CARD WRAPPER
// ---------------------------------------------------------
const BentoCard = ({ service, index, children }) => {
  const theme = useTheme();
  
  const getGridSizes = (i) => {
    if (i === 0) return { xs: 12, md: 7, lg: 8 };
    if (i === 1) return { xs: 12, md: 5, lg: 4 };
    if (i === 2) return { xs: 12, md: 5, lg: 4 };
    return { xs: 12, md: 7, lg: 8 };
  };

  const sizes = getGridSizes(index);

  return (
    <Grid item {...sizes} sx={{ display: 'flex' }}>
      <TiltCard maxTilt={3} sx={{ width: '100%', display: 'flex' }}>
        <Card
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', lg: (index === 0 || index === 3) ? 'row' : 'column' },
            p: 0,
            borderRadius: '24px',
            background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.55)' : 'rgba(15, 15, 20, 0.35)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            border: `1.5px solid ${alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.15 : 0.08)}`,
            boxShadow: theme.palette.mode === 'light'
              ? '0 15px 35px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.8)'
              : `0 20px 45px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.02)`,
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(20, 20, 25, 0.55)',
              borderColor: theme.palette.primary.main,
              boxShadow: theme.palette.mode === 'light'
                ? `0 25px 55px rgba(0, 0, 0, 0.08), 0 0 25px ${alpha(theme.palette.primary.main, 0.25)}`
                : `0 35px 70px rgba(0, 0, 0, 0.55), 0 0 35px ${alpha(theme.palette.primary.main, 0.25)}`,
              '& .srv-icon-box': {
                transform: 'scale(1.1) rotate(5deg)',
                color: '#ffffff',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.4)}`,
                borderColor: 'primary.main'
              }
            }
          }}
        >
          {/* Text Content */}
          <Box sx={{
            p: { xs: 3, sm: 4 },
            flex: 1.1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'left'
          }}>
            {/* Monospace Micro Label */}
            <Typography
              variant="caption"
              sx={{
                fontFamily: '"Fira Code", monospace',
                color: theme.palette.primary.main,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: 'uppercase',
                mb: 1.5,
                display: 'block'
              }}
            >
              {`[ ${service.subtitle.replace(/\s+/g, '_').toUpperCase()} ]`}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box
                className="srv-icon-box"
                sx={{
                  color: 'primary.main',
                  display: 'inline-flex',
                  p: 1.5,
                  borderRadius: '12px',
                  background: alpha(theme.palette.primary.main, 0.08),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {service.icon}
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: theme.palette.text.primary,
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: { xs: '1.35rem', sm: '1.6rem' },
                  lineHeight: 1.2
                }}
              >
                {service.title}
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontFamily: '"Inter", sans-serif',
                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                lineHeight: 1.6,
                mb: 3
              }}
            >
              {service.description}
            </Typography>

            {/* Tech Badges */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {service.techs.map((tech, tIdx) => (
                <Typography
                  key={tIdx}
                  variant="caption"
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '50px',
                    border: `1.5px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                    background: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
                    color: theme.palette.text.secondary,
                    fontWeight: 600,
                    fontSize: '0.72rem',
                    fontFamily: '"Outfit", sans-serif'
                  }}
                >
                  {tech}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Interactive Preview Widget */}
          <Box sx={{
            p: { xs: 3, sm: 4 },
            flex: 0.9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: { xs: 'none', lg: (index === 0 || index === 3) ? '1px solid rgba(255,255,255,0.04)' : 'none' },
            borderTop: { xs: '1px solid rgba(255,255,255,0.04)', lg: (index === 0 || index === 3) ? 'none' : '1px solid rgba(255,255,255,0.04)' },
            alignSelf: 'stretch',
            bgcolor: 'rgba(0,0,0,0.08)'
          }}>
            {children}
          </Box>
        </Card>
      </TiltCard>
    </Grid>
  );
};

// ---------------------------------------------------------
// SERVICES LIST DEFINITION
// ---------------------------------------------------------
const servicesList = [
  {
    title: 'Frontend Development',
    subtitle: 'Code Craftsmanship',
    icon: <DeveloperModeIcon sx={{ fontSize: 32 }} />,
    description: 'Building clean, scalable web applications using React, Vite, and JavaScript. Focused on optimized performance, structured component design, and semantic HTML5/CSS3 standards.',
    techs: ['React', 'ES6 JS', 'Vite', 'HTML5/CSS3']
  },
  {
    title: 'Responsive UI/UX Design',
    subtitle: 'Adaptive Layouts',
    icon: <AspectRatioIcon sx={{ fontSize: 32 }} />,
    description: 'Designing interfaces that automatically adjust and feel premium on any device, from standard mobile screens up to widescreen 4K monitors. Prioritizing accessibility and user flow.',
    techs: ['Material UI', 'Flexbox/Grid', 'Media Queries', 'MUI Theme']
  },
  {
    title: 'Creative Web Animations',
    subtitle: 'Fluid Interactions',
    icon: <AutoAwesomeIcon sx={{ fontSize: 32 }} />,
    description: 'Crafting fluid page transitions, scroll-linked animations, hovering effects, and micro-interactions that engage users and make websites feel alive and professional.',
    techs: ['Framer Motion', 'CSS Keyframes', 'MUI Transitions']
  },
  {
    title: 'Interactive Utility Apps',
    subtitle: 'Functional Solutions',
    icon: <ConstructionIcon sx={{ fontSize: 32 }} />,
    description: 'Creating customized web tools, games, and applications like calculator systems, note checklists, comic readers, and quizzes with local storage integration.',
    techs: ['State Management', 'LocalStorage', 'Canvas API']
  }
];

// ---------------------------------------------------------
// MAIN SERVICES COMPONENT
// ---------------------------------------------------------
const Services = () => {
  const theme = useTheme();

  return (
    <Box
      id="services"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: { xs: 12, md: 16 },
        position: 'relative',
        background: 'transparent',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes driftGlow1 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(10vw, 5vh) scale(1.15); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes driftGlow2 {
          0% { transform: translate(0px, 0px) scale(1.1); }
          50% { transform: translate(-8vw, -6vh) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1.1); }
        }
      `}</style>

      {/* Ambient Glow Backdrops (Dark Mode 2.0) */}
      {theme.palette.mode === 'dark' && (
        <>
          <Box sx={{
            position: 'absolute',
            top: '20%',
            left: '-10%',
            width: '45vw',
            height: '45vw',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
            filter: 'blur(100px)',
            animation: 'driftGlow1 25s ease-in-out infinite',
            pointerEvents: 'none',
            zIndex: 0
          }} />
          <Box sx={{
            position: 'absolute',
            bottom: '10%',
            right: '-10%',
            width: '50vw',
            height: '50vw',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.06)} 0%, transparent 70%)`,
            filter: 'blur(120px)',
            animation: 'driftGlow2 30s ease-in-out infinite',
            pointerEvents: 'none',
            zIndex: 0
          }} />
        </>
      )}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header with Dynamic Typography */}
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >

            <Typography variant="h2" sx={{
              fontWeight: 950,
              fontFamily: '"Outfit", sans-serif',
              letterSpacing: -1.5,
              mb: 2.5,
              background: `linear-gradient(270deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.6)}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              backgroundSize: '400% 400%',
              animation: 'gradientShift 8s ease infinite',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }
            }}>
              What I Offer
            </Typography>
            
            <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, fontWeight: 550, maxWidth: '600px', mx: 'auto' }}>
              The core services and design-engineering philosophies that define my work, brought to life through interactive previews.
            </Typography>
          </motion.div>
        </Box>

        {/* Bento Grid */}
        <Grid container spacing={4}>
          <BentoCard service={servicesList[0]} index={0}>
            <IdePreview />
          </BentoCard>

          <BentoCard service={servicesList[1]} index={1}>
            <ResponsiveResizer />
          </BentoCard>

          <BentoCard service={servicesList[2]} index={2}>
            <PhysicsSandbox />
          </BentoCard>

          <BentoCard service={servicesList[3]} index={3}>
            <UtilityConsole />
          </BentoCard>
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
