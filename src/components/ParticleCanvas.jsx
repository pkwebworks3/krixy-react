import React, { useRef, useEffect, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../ThemeContext';

const ACCENT_PARTICLE_COLORS = {
  orange: ['#ff6b00', '#ff8500', '#ffa600', '#ea580c', '#ffb37c', '#ff7a59'],
  green:  ['#00ff66', '#33ff85', '#66ffa3', '#00c34e', '#99ffc2', '#1ae060'],
  cyan:   ['#00f0ff', '#33f3ff', '#66f6ff', '#00c3d9', '#99f9ff', '#1ad4e0'],
  purple: ['#bd00ff', '#ca33ff', '#d766ff', '#9600d9', '#f3e6ff', '#a81ae0'],
  pink:   ['#ff007f', '#ff3399', '#ff66b2', '#d9006b', '#ff99cc', '#e01a8d'],
};

const ACCENT_STAR_COLORS = {
  orange: '#ffb03a',
  green:  '#b3ffd1',
  cyan:   '#b3faff',
  purple: '#f0b3ff',
  pink:   '#ffb3d9',
};

const getHexVariations = (hex) => {
  let cleanHex = hex.replace(/^\s*#|\s*$/g, '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  const r = (num >> 16);
  const g = ((num >> 8) & 0x00FF);
  const b = (num & 0x0000FF);

  const variations = [];
  const mixFactors = [1, 0.85, 0.7, 0.55, 0.4, 0.25];
  mixFactors.forEach((factor) => {
    let vr = Math.max(0, Math.min(255, Math.round(r * factor + 50 * (1 - factor))));
    let vg = Math.max(0, Math.min(255, Math.round(g * factor + 50 * (1 - factor))));
    let vb = Math.max(0, Math.min(255, Math.round(b * factor + 50 * (1 - factor))));
    variations.push(`#${((1 << 24) + (vr << 16) + (vg << 8) + vb).toString(16).slice(1)}`);
  });
  return variations;
};

const lightenColor = (hex, percent = 30) => {
  let cleanHex = hex.replace(/^\s*#|\s*$/g, '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  let num = parseInt(cleanHex, 16);
  let r = (num >> 16) + Math.round(255 * (percent / 100));
  let g = ((num >> 8) & 0x00FF) + Math.round(255 * (percent / 100));
  let b = (num & 0x0000FF) + Math.round(255 * (percent / 100));
  
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const isHexColor = (str) => {
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(str);
};

const ParticleCanvas = ({ isMobile }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const accent = colorMode?.accent || 'orange';
  const isDarkMode = theme.palette.mode === 'dark';
  
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999, px: -999, py: -999, active: false, speed: 0 });
  const burstsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const COLORS = isHexColor(accent)
      ? getHexVariations(accent)
      : (ACCENT_PARTICLE_COLORS[accent] || ACCENT_PARTICLE_COLORS.orange);
    let flowers = [];
    const BLOOM_RADIUS = 150;
    const NUM_GROUPS = 12;

    const initGrid = () => {
      flowers = [];
      const width = canvas.offsetWidth || window.innerWidth;
      const height = canvas.offsetHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const spacing = 90; // Increased spacing to further reduce particle count for performance
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + (Math.random() - 0.5) * 40;
          const y = j * spacing + (Math.random() - 0.5) * 40;

          flowers.push({
            x, y,
            baseSize: Math.random() * 8 + 12,
            bloomLevel: 0,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.015,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            groupIndex: Math.floor(Math.random() * NUM_GROUPS),
          });
        }
      }
    };

    initGrid();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(initGrid, 200);
    };
    window.addEventListener('resize', handleResize);

    const getCanvasPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handlePointerMove = (e) => {
      if (isMobile) return;
      const { x, y } = getCanvasPos(e);
      if (x >= -50 && x <= canvas.width + 50 && y >= -50 && y <= canvas.height + 50) {
        mouseRef.current = { x, y, active: true };
      } else {
        mouseRef.current.active = false;
      }
    };

    const handlePointerDown = (e) => {
      if (!isMobile) return;
      const { x, y } = getCanvasPos(e);
      if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
        burstsRef.current.push({ x, y, time: performance.now() });
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);

    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mx, y: my, active: mActive } = mouseRef.current;

      flowers.forEach((f) => {
        // Base rotation always active
        f.rotation += f.rotSpeed;
        
        // Add additional rotation when hovered/bloomed (now for both stars and flowers)
        if (f.bloomLevel > 0.05) {
          f.rotation += f.bloomLevel * 0.02; // Smooth extra rotation proportional to bloom
        }

        let targetBloom = 0;

        if (mActive) {
          const dx = f.x - mx;
          const dy = f.y - my;
          const distSq = dx * dx + dy * dy;
          const radiusSq = BLOOM_RADIUS * BLOOM_RADIUS;
          if (distSq < radiusSq) {
            targetBloom = (1 - Math.sqrt(distSq) / BLOOM_RADIUS) * 1.5;
          }
        }

        if (burstsRef.current.length > 0) {
          burstsRef.current.forEach((b) => {
            const timeSince = now - b.time;
            if (timeSince < 1500) {
              const burstRadius = (timeSince / 1500) * 500;
              const dist = Math.hypot(f.x - b.x, f.y - b.y);
              if (Math.abs(dist - burstRadius) < 60) {
                const burstIntensity = 1 - Math.abs(dist - burstRadius) / 60;
                targetBloom = Math.max(targetBloom, burstIntensity * 1.2);
              }
            }
          });
        }

        // Faster blooming, slower fading for "bloom" feel
        if (f.bloomLevel < targetBloom) {
          f.bloomLevel += 0.04;
        } else {
          f.bloomLevel -= 0.01;
        }

        f.bloomLevel = Math.max(0, Math.min(1.5, f.bloomLevel));

        if (f.bloomLevel > 0.01) {
          const ease = Math.sin((Math.min(1, f.bloomLevel) * Math.PI) / 2);
          const currentSize = f.baseSize * ease;

          ctx.save();
          ctx.translate(f.x, f.y);
          ctx.rotate(f.rotation);

          if (isDarkMode) {
            // Constant Blinking/Twinkling logic for stars
            const blinkSpeed = 0.003 + (f.x % 0.005);
            const blink = 0.4 + Math.sin(now * blinkSpeed + f.x) * 0.6;
            const starColor = isHexColor(accent)
              ? lightenColor(accent, 20)
              : (ACCENT_STAR_COLORS[accent] || ACCENT_STAR_COLORS.orange);  

            ctx.globalAlpha = ease * blink;
            ctx.fillStyle = starColor;

            const points = 5;
            const sparkle = 1 + (Math.sin(now * 0.01 + f.y) * 0.1);
            const outerRadius = currentSize * 0.9 * sparkle;
            const innerRadius = currentSize * 0.4 * sparkle;

            ctx.beginPath();
            for (let i = 0; i < points * 2; i++) {
              const radius = i % 2 === 0 ? outerRadius : innerRadius;
              const angle = (Math.PI * i) / points - Math.PI / 2;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
          } else {
            // Blooming Flower Logic
            ctx.globalAlpha = ease;
            ctx.fillStyle = f.color;
            for (let i = 0; i < 5; i++) {
              ctx.beginPath();
              // Ellipse stretch for bloom effect
              ctx.ellipse(0, currentSize * 0.5, Math.max(0.1, currentSize * 0.35), Math.max(0.1, currentSize * 0.75), 0, 0, Math.PI * 2);
              ctx.fill();
              ctx.rotate((Math.PI * 2) / 5);
            }

            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(0, 0, Math.max(0.1, currentSize * 0.2), 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      clearTimeout(resizeTimeout);
    };
  }, [isMobile, theme.palette.mode, accent]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default ParticleCanvas;
