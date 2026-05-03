import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Navbar from './components/navbar';
import Content from './components/content';
import Projects from './components/projects/project';
import Footer from './components/footer';
import Testimonial from './components/testimonials';

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

  // Track previous path BEFORE it changes
  const isFromProjects = prevPath.current === '/projects';
  const isProjects = location.pathname === '/projects';

  useEffect(() => {
    prevPath.current = location.pathname;
  }, [location.pathname]);

  // Home: only animate if coming from /projects. Otherwise no animation.
  const homeVariants = isFromProjects ? slideInFromLeft : noTransition;

  return (
    <>
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
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
