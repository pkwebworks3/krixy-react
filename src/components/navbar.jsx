import { useState } from 'react';
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
  { title: 'Projects', path: '/projects', isLink: true, icon: <motion.div variants={iconVariants} animate="animate" style={{ display: 'flex' }}><DashboardIcon /></motion.div> }
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" sx={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(124, 58, 237, 0.1)', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img src="1x\Asset 87logowbg.png" alt="PK Webworks Logo" style={{ height: '30px' }} />
            </Link>
            <Box component="span" sx={{ fontSize: '0.6rem', fontWeight: 700, color: '#7c3aed', bgcolor: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '4px', px: '5px', py: '2px', letterSpacing: 1, textTransform: 'uppercase', lineHeight: 1 }}>
              beta
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img src="1x\Asset 87logowbg.png" alt="PK Webworks Logo" style={{ height: '24px' }} />
            </Link>
            <Box component="span" sx={{ fontSize: '0.55rem', fontWeight: 700, color: '#7c3aed', bgcolor: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '4px', px: '4px', py: '1px', letterSpacing: 1, textTransform: 'uppercase', lineHeight: 1 }}>
              beta
            </Box>
          </Box>
          
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: '#0f172a' }}
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

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {pages.map((page) => (
              page.isLink ? (
                <Button
                  key={page.title}
                  component={Link}
                  to={page.path}
                  startIcon={page.icon}
                  sx={{ my: 2, color: '#0f172a', display: 'flex', '&:hover': { color: '#7c3aed' } }}
                >
                  {page.title}
                </Button>
              ) : (
                <Button
                  key={page.title}
                  href={page.path}
                  startIcon={page.icon}
                  sx={{ my: 2, color: '#0f172a', display: 'flex', '&:hover': { color: '#7c3aed' } }}
                >
                  {page.title}
                </Button>
              )
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;