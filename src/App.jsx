import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material';
import Navbar from './components/navbar';
import Content from './components/content';
import Projects from './components/projects/project';
import Contact from './components/Contact';
import Footer from './components/footer';
import Testimonial from './components/testimonials';
import LoadingScreen from './components/LoadingScreen';
import ThemeAccents from './components/ThemeAccents';
import About from './components/About';
import projectsData from './data/projects_page.json';
import ProjectShowroom from './components/ProjectShowroom';
import DevTerminal from './components/DevTerminal';
import InteractiveCursor from './components/InteractiveCursor';
import ScrollProgress from './components/ScrollProgress';

const fadeAnimation = {
  initial: { opacity: 0 },
  in:      { opacity: 1 },
  out:     { opacity: 0 },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.4,
};

function App() {
  const location = useLocation();
  const prevPath = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Track previous path BEFORE it changes
  const isFromProjects = prevPath.current === '/projects';
  const isProjects = location.pathname === '/projects';

  const theme = useTheme();

  useEffect(() => {
    prevPath.current = location.pathname;
    window.scrollTo(0, 0);

    // Dynamic browser tab window title based on current page
    const routeTitles = {
      '/': 'Krix | Web Developer & Designer',
      '/about': 'About | Krix',
      '/projects': 'Projects | Krix',
      '/contact': 'Contact | Krix'
    };
    document.title = routeTitles[location.pathname] || 'Krix';

    // Update browser / mobile system status bar accent theme-color
    let themeMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeMeta) {
      themeMeta = document.createElement('meta');
      themeMeta.setAttribute('name', 'theme-color');
      document.head.appendChild(themeMeta);
    }
    themeMeta.setAttribute('content', theme.palette.background.default);
  }, [location.pathname, theme.palette.background.default]);

  useEffect(() => {
    const criticalImages = [
      '/reviews_profile/kirubha.jpg',
      '/1x/Asset 87logowbg.png',
      ...projectsData.map(p => p.project_thumb)
    ];

    const cacheImages = async (srcArray) => {
      let loaded = 0;
      const total = srcArray.length;

      const promises = srcArray.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loaded++;
            setProgress(Math.round((loaded / total) * 100));
            resolve();
          };
          img.onerror = () => {
            loaded++;
            setProgress(Math.round((loaded / total) * 100));
            resolve();
          };
        });
      });

      await Promise.all(promises);
      // Small delay for smooth exit
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    };

    cacheImages(criticalImages);
  }, []);

  // Using uniform fade transition

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ position: 'fixed', zIndex: 9999, width: '100%' }}
          >
            <LoadingScreen progress={progress} />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <InteractiveCursor />
          <ScrollProgress />
          <ThemeAccents />
          <Navbar />
          <ProjectShowroom />
          <DevTerminal />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={fadeAnimation}
                  transition={pageTransition}
                >
                  <Content />
                  <Testimonial />
                </motion.div>
              } />
              <Route path="/about" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={fadeAnimation}
                  transition={pageTransition}
                >
                  <About />
                </motion.div>
              } />
              <Route path="/projects" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={fadeAnimation}
                  transition={pageTransition}
                >
                  <Projects />
                </motion.div>
              } />
              <Route path="/contact" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={fadeAnimation}
                  transition={pageTransition}
                >
                  <Contact />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
