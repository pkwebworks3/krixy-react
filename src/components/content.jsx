import './content.css'
import projects from "../data/projects.json";
import { useEffect, useState } from "react";
import Navbar from './navbar'

function Content() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.2 }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <>
      <Navbar />
      
      <div className="hero-section" id="home">
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-content">
              <span className="hero-greeting">Hey, I'm</span>
              <h1 className="hero-name">Kirubhananthan <span className="name-highlight"></span></h1>
              
              <div className="hero-role">
                <span className="role-text">Web Developer</span>
                <span className="role-divider">&</span>
                <span className="role-text">UI Designer</span>
              </div>

              <p className="hero-bio">
                I craft digital experiences that blend stunning design with clean, efficient code. 
                Specializing in modern web technologies and user-centered design.
              </p>

              <div className="hero-cta">
                <a href="#projects" className="cta-button primary">
                  <span>View My Work</span>
                  <i className="bi bi-arrow-right"></i>
                </a>
                <a href="#contact" className="cta-button secondary">
                  <i className="bi bi-send"></i>
                  <span>Get in Touch</span>
                </a>
              </div>

              <div className="hero-social">
                <span className="social-label">Connect with me</span>
                <div className="social-icons">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="bi bi-github"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="bi bi-dribbble"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="hero-stats-row">
              <div className="stat-box">
                <h3 className="stat-value">50+</h3>
                <p className="stat-name">Projects</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-box">
                <h3 className="stat-value">30+</h3>
                <p className="stat-name">Clients</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-box">
                <h3 className="stat-value">5+</h3>
                <p className="stat-name">Years</p>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-showcase">
              <div className="showcase-card skill-card-1">
                <div className="card-icon">
                  <i className="bi bi-lightning-charge"></i>
                </div>
                <h3>React</h3>
                <p>Modern UI Libraries</p>
              </div>

              <div className="showcase-card skill-card-2">
                <div className="card-icon">
                  <i className="bi bi-palette-fill"></i>
                </div>
                <h3>Design</h3>
                <p>UI/UX Focused</p>
              </div>

              <div className="showcase-card skill-card-3">
                <div className="card-icon">
                  <i className="bi bi-code-slash"></i>
                </div>
                <h3>JavaScript</h3>
                <p>Clean Code</p>
              </div>

              <div className="showcase-card skill-card-4">
                <div className="card-icon">
                  <i className="bi bi-rocket-fill"></i>
                </div>
                <h3>Performance</h3>
                <p>Speed Optimized</p>
              </div>

              <div className="floating-element element-1"></div>
              <div className="floating-element element-2"></div>
              <div className="floating-element element-3"></div>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <p>Scroll to explore</p>
          <div className="scroll-indicator">
            <span></span>
          </div>
        </div>
      </div>

      <div className="projects-section" id="projects">
        <div className="section-title">
          <h2>Featured Projects</h2>
          <p className="section-subtitle">A selection of recent work</p>
        </div>

        <div className="carousel-container reveal">
          <div 
            className="carousel-layout"
            style={{
              backgroundImage: `url(${projects[currentSlide]?.project_thumb})`,
            }}
          >
            {/* Details Card */}
            <div className="carousel-details-section">
              <div className="details-card">
                <div className="icon-container">
                  <img
                    src={projects[currentSlide]?.project_ico}
                    alt="icon"
                    className="icon-image"
                  />
                </div>

                <h3 className="project-name">
                  {projects[currentSlide]?.title}
                </h3>

                <p className="project-desc">
                  {projects[currentSlide]?.description}
                </p>

                <div className="action-buttons">
                  <button
                    className="icon-button"
                    onClick={prevSlide}
                    aria-label="Previous"
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>

                  <a
                    href={projects[currentSlide]?.link}
                    className="primary-button"
                  >
                    Open
                  </a>

                  <button
                    className="icon-button"
                    onClick={nextSlide}
                    aria-label="Next"
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>

                <div className="page-indicators">
                  {projects.map((_, idx) => (
                    <button
                      key={idx}
                      className={`page-dot ${idx === currentSlide ? "active" : ""}`}
                      onClick={() => setCurrentSlide(idx)}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script>{`
        const canvas = document.getElementById('matrix-canvas');
        if (canvas) {
          const ctx = canvas.getContext('2d');
          
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          
          const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
          const charArray = chars.split('');
          const fontSize = 20;
          const columns = canvas.width / fontSize;
          
          const drops = [];
          for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * canvas.height;
          }
          
          function draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#2702c2';
            ctx.font = fontSize + 'px monospace';
            ctx.fontWeight = '300';
            
            for (let i = 0; i < drops.length; i++) {
              const text = charArray[Math.floor(Math.random() * charArray.length)];
              ctx.fillText(text, i * fontSize, drops[i]);
              
              if (drops[i] * Math.random() > 0.975) {
                drops[i] = 0;
              }
              
              drops[i] += fontSize;
            }
          }
          
          function animate() {
            draw();
            requestAnimationFrame(animate);
          }
          
          animate();
          
          window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
          });
        }
      `}</script>
    </>
  );
}

export default Content;