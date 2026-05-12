import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Navbar from './components/navbar';
import Content from './components/content';
import Projects from './components/projects/project';
import Contact from './components/Contact';
import Footer from './components/footer';
import Testimonial from './components/testimonials';
import LoadingScreen from './components/LoadingScreen';
import projectsData from './data/projects_page.json';

const slideInFromRight = {
  initial: { x: '100vw', opacity: 0 },
  in:      { x: 0, opacity: 1 },
  out:     { x: '-100vw', opacity: 0 },
};

const slideInFromLeft = {
  initial: { x: '-100vw', opacity: 0 },
  in:      { x: 0, opacity: 1 },
  out:     { x: '100vw', opacity: 0 },
};

const noTransition = {
  initial: { opacity: 1, x: 0 },
  in:      { opacity: 1, x: 0 },
  out:     { opacity: 1, x: 0 },
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

  useEffect(() => {
    prevPath.current = location.pathname;
  }, [location.pathname]);

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

  // Home: only animate if coming from /projects. Otherwise no animation.
  const homeVariants = isFromProjects ? slideInFromLeft : noTransition;

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
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={homeVariants}
                  transition={pageTransition}
                >
                  <Content />
                  <Testimonial />
                </motion.div>
              } />
              <Route path="/projects" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={slideInFromRight}
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
                  variants={slideInFromRight}
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
