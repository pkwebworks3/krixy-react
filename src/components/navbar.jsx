import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import EmailIcon from '@mui/icons-material/Email';
import { useTheme, alpha } from '@mui/material/styles';
import { ColorModeContext } from '../ThemeContext';
import { motion } from 'framer-motion';

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
  { title: 'Projects', path: '/projects', isLink: true, icon: <motion.div variants={iconVariants} animate="animate" style={{ display: 'flex' }}><DashboardIcon /></motion.div> },
  { title: 'Contact', path: '/contact', isLink: true, icon: <motion.div variants={iconVariants} animate="animate" style={{ display: 'flex' }}><EmailIcon /></motion.div> }
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

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
              <img src="1x/1x/Asset 2.png" alt="PK Webworks Logo" style={{ height: '30px' }} />
            </Link>
          </Box>
          {/* Mobile Logo */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img src="1x/1x/Asset 2.png" alt="PK Webworks Logo" style={{ height: '20px' }} />
            </Link>
          </Box>

          {/* Mobile Menu & Toggle */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <IconButton onClick={colorMode.toggleColorMode} sx={{ ml: 1, color: theme.palette.text.primary }}>
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: theme.palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  {page.isLink ? (
                    <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {page.icon} {page.title}
                    </Link>
                  ) : (
                    <a href={page.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {page.icon} {page.title}
                    </a>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Links */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center', mr: 2 }}>
            {pages.map((page) => (
              page.isLink ? (
                <Button
                  key={page.title}
                  component={Link}
                  to={page.path}
                  startIcon={page.icon}
                  sx={{ my: 2, color: theme.palette.text.primary, display: 'flex', '&:hover': { color: '#7c3aed' } }}
                >
                  {page.title}
                </Button>
              ) : (
                <Button
                  key={page.title}
                  href={page.path}
                  startIcon={page.icon}
                  sx={{ my: 2, color: theme.palette.text.primary, display: 'flex', '&:hover': { color: '#7c3aed' } }}
                >
                  {page.title}
                </Button>
              )
            ))}
          </Box>

          {/* Desktop Theme Toggle (Rightmost Corner) */}
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