import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Content from './components/content';
import Projects from './components/projects/project';
import Footer from './components/footer';
import Testimonial from './components/testimonials';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={
          <>
            <Content></Content>
            <Testimonial></Testimonial>
          </>
        } />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
