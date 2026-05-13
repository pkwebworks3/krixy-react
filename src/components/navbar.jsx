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
    '/': '#7c3aed',
    '/about': '#7c3aed',
    '/projects': '#7c3aed',
    '/contact': '#7c3aed'
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
        transform: isScrolled ? 'translateX(-50%)' : 'translateX(-50%)',
        px: { xs: 1.5, md: 3 },
        py: isScrolled ? 0.8 : 1.2,
        width: isScrolled ? '100%' : { xs: '92%', md: '85%' },
        maxWidth: isScrolled ? 'none' : '1200px',
        borderRadius: isScrolled ? 0 : { xs: '12px', md: '20px' },
        background: isScrolled
          ? (theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(15, 23, 42, 0.85)')
          : (theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(15, 23, 42, 0.15)'),
        backdropFilter: 'blur(20px)', // Consistent blur to differentiate from background particles
        borderBottom: isScrolled
          ? (theme.palette.mode === 'light' ? '1px solid rgba(124, 58, 237, 0.15)' : '1px solid rgba(124, 58, 237, 0.3)')
          : 'none',
        border: !isScrolled ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
        boxShadow: isScrolled ? `0 10px 40px ${alpha(theme.palette.common.black, 0.1)}` : 'none',
        transition: 'all 0.4s ease',
        overflow: 'hidden',
        zIndex: 1100,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.15), transparent 100%)`,
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
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img src="1x/1x/Asset 2.png" alt="PK Webworks Logo" style={{ height: '35px' }} />
            </Link>
          </Box>

          {/* Mobile Logo */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img src="1x/1x/Asset 2.png" alt="PK Webworks Logo" style={{ height: '28px' }} />
            </Link>
          </Box>

          {/* Mobile Menu & Toggle */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 0.5 }}>
            <IconButton onClick={colorMode.toggleColorMode} sx={{ color: theme.palette.text.primary }}>
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              sx={{ 
                color: theme.palette.text.primary,
                background: alpha('#7c3aed', 0.1),
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
                  border: `1px solid ${alpha('#7c3aed', 0.2)}`,
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
                    color: location.pathname === page.path ? '#7c3aed' : theme.palette.text.primary,
                    bgcolor: location.pathname === page.path ? alpha('#7c3aed', 0.08) : 'transparent',
                    '&:hover': {
                      bgcolor: alpha('#7c3aed', 0.05),
                    },
                    '& .MuiTypography-root': {
                      fontWeight: 700,
                      fontFamily: '"Outfit", sans-serif'
                    }
                  }}
                >
                  <Box sx={{ color: '#7c3aed', display: 'flex' }}>{page.icon}</Box>
                  <Typography>{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Links */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center', mr: 2 }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={Link}
                to={page.path}
                startIcon={page.icon}
                sx={{ 
                  my: 1, 
                  mx: 0.5,
                  color: location.pathname === page.path ? '#7c3aed' : theme.palette.text.primary, 
                  fontWeight: location.pathname === page.path ? 800 : 500,
                  fontSize: '0.95rem',
                  fontFamily: '"Outfit", sans-serif',
                  textTransform: 'none',
                  borderRadius: '100px',
                  px: 3,
                  py: 1,
                  display: 'flex',
                  transition: 'all 0.3s ease',
                  bgcolor: location.pathname === page.path ? alpha('#7c3aed', 0.1) : 'transparent',
                  border: `1px solid ${location.pathname === page.path ? alpha('#7c3aed', 0.2) : 'transparent'}`,
                  '&:hover': { 
                    color: '#7c3aed',
                    bgcolor: alpha('#7c3aed', 0.08),
                    transform: 'translateY(-2px)'
                  } 
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Desktop Theme Toggle */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <IconButton onClick={colorMode.toggleColorMode} sx={{ color: theme.palette.text.primary }}>
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;