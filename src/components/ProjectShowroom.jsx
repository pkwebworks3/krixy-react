import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Tooltip, CircularProgress, useTheme, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RefreshIcon from '@mui/icons-material/Refresh';
import LaptopIcon from '@mui/icons-material/Laptop';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LockIcon from '@mui/icons-material/Lock';

const ProjectShowroom = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const previewUrl = searchParams.get('preview');
  const previewTitle = searchParams.get('title');

  const [device, setDevice] = useState('desktop'); // 'desktop', 'tablet', 'mobile'
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Reset loading state when the project URL changes or reload is clicked
  useEffect(() => {
    if (previewUrl) {
      setIsLoading(true);
    }
  }, [previewUrl, iframeKey]);

  if (!previewUrl) return null;

  const handleClose = () => {
    const newParams = new URLSearchParams(location.search);
    newParams.delete('preview');
    newParams.delete('title');
    const searchStr = newParams.toString();
    navigate(location.pathname + (searchStr ? `?${searchStr}` : ''));
  };

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  const getDeviceWidth = () => {
    if (device === 'mobile') return '375px';
    if (device === 'tablet') return '768px';
    return '100%';
  };

  return (
    <AnimatePresence>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(9, 9, 11, 0.85)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 1.5, sm: 3, md: 4 },
        }}
      >
        {/* Click outside to close (backdrop hit area) */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
          onClick={handleClose}
        />

        {/* Modal Window Container */}
        <Box
          component={motion.div}
          initial={{ scale: 0.93, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.93, y: 30, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: '1280px',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '24px',
            overflow: 'hidden',
            backgroundColor: 'rgba(20, 20, 25, 0.65)',
            border: '1.5px solid rgba(255, 107, 0, 0.3)',
            boxShadow: '0 40px 100px rgba(0, 0, 0, 0.8), 0 0 35px rgba(255, 107, 0, 0.15)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
          }}
        >
          {/* Header Bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              px: { xs: 2, md: 3 },
              py: 2,
              borderBottom: '1px solid rgba(255, 107, 0, 0.18)',
              bgcolor: 'rgba(15, 15, 20, 0.8)',
            }}
          >
            {/* Left side: OS window dots */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', width: { xs: 'auto', md: '120px' } }}>
              <Box
                onClick={handleClose}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: '#ff5f56',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  '&:hover': { opacity: 0.8 }
                }}
              />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e', opacity: 0.6 }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27c93f', opacity: 0.6 }} />
            </Box>

            {/* Center: Browser Address Bar */}
            <Box
              sx={{
                flex: 1,
                maxWidth: '600px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.8,
                borderRadius: '100px',
                bgcolor: 'rgba(9, 9, 11, 0.5)',
                border: '1px solid rgba(255, 107, 0, 0.12)',
              }}
            >
              <LockIcon sx={{ fontSize: 14, color: '#ff6b00' }} />
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 600,
                  fontSize: { xs: '0.75rem', sm: '0.85rem' },
                  fontFamily: '"Outfit", sans-serif',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {previewTitle || 'krix.dev/project'}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255, 255, 255, 0.3)',
                  display: { xs: 'none', sm: 'block' },
                  ml: 'auto',
                }}
              >
                (secure sandbox)
              </Typography>
            </Box>

            {/* Right side: Device switchers and browser action buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
              {/* Responsive Device Controls */}
              <Box
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  bgcolor: 'rgba(9, 9, 11, 0.4)',
                  p: 0.5,
                  borderRadius: '100px',
                  border: '1px solid rgba(255, 107, 0, 0.15)',
                }}
              >
                {[
                  { name: 'desktop', icon: <LaptopIcon fontSize="small" />, label: 'Desktop View' },
                  { name: 'tablet', icon: <TabletMacIcon fontSize="small" />, label: 'Tablet View' },
                  { name: 'mobile', icon: <SmartphoneIcon fontSize="small" />, label: 'Mobile View' },
                ].map((d) => (
                  <Tooltip key={d.name} title={d.label} arrow>
                    <IconButton
                      onClick={() => setDevice(d.name)}
                      sx={{
                        color: device === d.name ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                        bgcolor: device === d.name ? 'rgba(255, 107, 0, 0.8)' : 'transparent',
                        borderRadius: '50%',
                        p: 0.8,
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        '&:hover': {
                          bgcolor: device === d.name ? 'rgba(255, 107, 0, 0.9)' : 'rgba(255, 255, 255, 0.05)',
                          color: '#ffffff',
                        },
                      }}
                    >
                      {d.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Box>

              {/* Actions */}
              <Tooltip title="Reload Simulator" arrow>
                <IconButton
                  onClick={handleReload}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    border: '1px solid rgba(255, 107, 0, 0.15)',
                    '&:hover': { color: '#ff6b00', borderColor: '#ff6b00', bgcolor: 'rgba(255, 107, 0, 0.08)' }
                  }}
                >
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Open in new tab" arrow>
                <IconButton
                  href={previewUrl}
                  target="_blank"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    border: '1px solid rgba(255, 107, 0, 0.15)',
                    '&:hover': { color: '#ff6b00', borderColor: '#ff6b00', bgcolor: 'rgba(255, 107, 0, 0.08)' }
                  }}
                >
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <IconButton
                onClick={handleClose}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  '&:hover': { bgcolor: '#ff5f56', color: '#fff' }
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Iframe Viewport Area */}
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              width: '100%',
              bgcolor: '#0d0d0f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Loading Indicator */}
            {isLoading && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: '#0d0d0f',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  zIndex: 2,
                }}
              >
                <CircularProgress color="primary" size={50} />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontFamily: '"Outfit", sans-serif', letterSpacing: 1 }}>
                  LOADING SIMULATOR...
                </Typography>
              </Box>
            )}

            {/* Frame Container for Device width scaling */}
            <Box
              component={motion.div}
              animate={{ width: getDeviceWidth() }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              sx={{
                height: '100%',
                maxWidth: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: device !== 'desktop' ? '0 0 50px rgba(0, 0, 0, 0.8)' : 'none',
                borderLeft: device !== 'desktop' ? '1px solid rgba(255, 107, 0, 0.15)' : 'none',
                borderRight: device !== 'desktop' ? '1px solid rgba(255, 107, 0, 0.15)' : 'none',
              }}
            >
              <iframe
                key={iframeKey}
                src={previewUrl}
                title={previewTitle || 'Project Preview'}
                onLoad={() => setIsLoading(false)}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  backgroundColor: '#ffffff',
                }}
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </AnimatePresence>
  );
};

export default ProjectShowroom;
