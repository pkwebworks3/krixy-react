import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme, alpha } from '@mui/material/styles';
import { ColorModeContext } from '../ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';

const iconVariants = {
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const pages = [
  { title: 'Home', path: '/', isLink: true, icon: <motion.div variants={iconVariants} animate="animate" style={{ display: 'flex' }}><HomeIcon /></motion.div> },
  { title: 'About', path: '/about', isLink: true, icon: <motion.div variants={iconVariants} animate="animate" style={{ display: 'flex' }}><PersonIcon /></motion.div> },
  { title: 'Projects', path: '/projects', isLink: true, icon: <motion.div variants={iconVariants} animate="animate" style={{ display: 'flex' }}><DashboardIcon /></motion.div> },
  { title: 'Contact', path: '/contact', isLink: true, icon: <motion.div variants={iconVariants} animate="animate" style={{ display: 'flex' }}><EmailIcon /></motion.div> }
];

function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const routeColors = {
    '/': '#ff6b00',
    '/about': '#ff6b00',
    '/projects': '#ff6b00',
    '/contact': '#ff6b00'
  };

  const getPageColor = (path) => {
    return location.pathname === path ? routeColors[path] : 'inherit';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <AppBar
      position="fixed"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        top: isScrolled ? 0 : 20,
        left: '50%',
        transform: 'translateX(-50%)',
        px: { xs: 1.5, md: 3 },
        py: isScrolled ? 0.6 : 1.0,
        width: isScrolled ? '100%' : { xs: '94%', md: '88%' },
        maxWidth: isScrolled ? 'none' : '1300px',
        borderRadius: isScrolled ? 0 : { xs: '16px', md: '30px' },
        background: isScrolled
          ? 'rgba(10, 10, 12, 0.8)'
          : 'rgba(20, 20, 25, 0.35)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        borderBottom: isScrolled
          ? '1px solid rgba(255, 107, 0, 0.25)'
          : 'none',
        border: !isScrolled ? '1px solid rgba(255, 107, 0, 0.12)' : 'none',
        boxShadow: isScrolled 
          ? '0 20px 50px rgba(0, 0, 0, 0.5)' 
          : '0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
        zIndex: 1100,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 107, 0, 0.18), transparent 100%)`,
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'opacity 0.3s ease',
          opacity: mousePos.x === -1000 ? 0 : 1,
        }
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Toolbar disableGutters sx={{ minHeight: { xs: '48px', md: '56px' } }}>
          {/* Desktop Logo */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="1x/1x/Asset 2.png" alt="PK Webworks Logo" style={{ height: '35px' }} />
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #ff6b00, #ea580c)',
                  color: '#ffffff',
                  fontSize: '0.55rem',
                  fontWeight: 900,
                  px: 1,
                  py: 0.25,
                  borderRadius: '12px',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.35)}`,
                  fontFamily: '"Outfit", sans-serif',
                  pointerEvents: 'none',
                }}
              >
                Beta
              </Box>
            </Link>
          </Box>

          {/* Mobile Logo */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <img src="1x/1x/Asset 2.png" alt="PK Webworks Logo" style={{ height: '28px' }} />
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #ff6b00, #ea580c)',
                  color: '#ffffff',
                  fontSize: '0.5rem',
                  fontWeight: 900,
                  px: 0.8,
                  py: 0.2,
                  borderRadius: '10px',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.35)}`,
                  fontFamily: '"Outfit", sans-serif',
                  pointerEvents: 'none',
                }}
              >
                Beta
              </Box>
            </Link>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              sx={{ 
                color: theme.palette.text.primary,
                background: alpha(theme.palette.primary.main, 0.1),
                borderRadius: '10px'
              }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  p: 1,
                  minWidth: 200,
                  borderRadius: '20px',
                  bgcolor: alpha(theme.palette.background.default, 0.9),
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  boxShadow: `0 15px 35px ${alpha(theme.palette.common.black, 0.2)}`,
                  '& .MuiList-root': { p: 0 }
                }
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.title}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.path}
                  sx={{
                    borderRadius: '12px',
                    m: 0.5,
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    color: location.pathname === page.path ? theme.palette.primary.main : theme.palette.text.primary,
                    bgcolor: location.pathname === page.path ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    },
                    '& .MuiTypography-root': {
                      fontWeight: 700,
                      fontFamily: '"Outfit", sans-serif'
                    }
                  }}
                >
                  <Box sx={{ color: theme.palette.primary.main, display: 'flex' }}>{page.icon}</Box>
                  <Typography>{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Links */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, gap: 1.5, alignItems: 'center', mr: 2 }}>
            {pages.map((page) => {
              const isActive = location.pathname === page.path;
              return (
                <Button
                  key={page.title}
                  component={Link}
                  to={page.path}
                  startIcon={page.icon}
                  sx={{ 
                    my: 1, 
                    mx: 0.2,
                    color: isActive ? '#ffffff' : alpha(theme.palette.text.primary, 0.8), 
                    fontWeight: isActive ? 800 : 650,
                    fontSize: '0.95rem',
                    fontFamily: '"Outfit", sans-serif',
                    textTransform: 'none',
                    borderRadius: '100px',
                    px: 3.5,
                    py: 1.2,
                    display: 'flex',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    background: isActive 
                      ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.22)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)` 
                      : 'transparent',
                    border: '1px solid',
                    borderColor: isActive ? 'rgba(255, 107, 0, 0.35)' : 'transparent',
                    boxShadow: isActive ? `0 8px 20px ${alpha(theme.palette.primary.main, 0.15)}` : 'none',
                    textShadow: isActive ? '0 0 10px rgba(255, 107, 0, 0.4)' : 'none',
                    '&:hover': { 
                      color: '#ffffff',
                      borderColor: 'rgba(255, 107, 0, 0.4)',
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                      transform: 'translateY(-3px)',
                      boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                    } 
                  }}
                >
                  {page.title}
                </Button>
              );
            })}
          </Box>



        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;