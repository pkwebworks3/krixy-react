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

const pages = [
  { title: 'Home', path: '/', isLink: true },
  { title: 'Projects', path: '/projects', isLink: true },
  { title: 'About', path: '/#about', isLink: false },
  { title: 'Contact', path: '/#contact', isLink: false }
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img src="1x\Asset 87logowbg.png" alt="PK Webworks Logo" style={{ height: '30px' }} />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img src="1x\Asset 87logowbg.png" alt="PK Webworks Logo" style={{ height: '24px' }} />
            </Link>
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
                    <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>{page.title}</Link>
                  ) : (
                    <a href={page.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>{page.title}</a>
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
                  sx={{ my: 2, color: '#0f172a', display: 'block', '&:hover': { color: '#7c3aed' } }}
                >
                  {page.title}
                </Button>
              ) : (
                <Button
                  key={page.title}
                  href={page.path}
                  sx={{ my: 2, color: '#0f172a', display: 'block', '&:hover': { color: '#7c3aed' } }}
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