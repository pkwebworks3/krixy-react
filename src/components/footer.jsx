import './footer.css'

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">PK Webworks</h3>
          <p className="footer-description">
            Building creative web experiences with code & design. We transform ideas into beautiful, functional digital solutions.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-link" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="#" className="social-link" aria-label="GitHub">
              <i className="bi bi-github"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            <li><a href="#web-design">Web Design</a></li>
            <li><a href="#web-development">Web Development</a></li>
            <li><a href="#ui-ux">UI/UX Design</a></li>
            <li><a href="#consultation">Consultation</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact Info</h4>
          <div className="contact-info">
            <p>
              <i className="bi bi-envelope"></i>
              <a href="mailto:info@pkwebworks.com">info@pkwebworks.com</a>
            </p>
            <p>
              <i className="bi bi-telephone"></i>
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </p>
            <p>
              <i className="bi bi-geo-alt"></i>
              <span>123 Web Street, Digital City, DC 12345</span>
            </p>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {currentYear} PK Webworks. All rights reserved.
        </p>
        <div className="footer-bottom-links">
          <a href="#privacy">Privacy Policy</a>
          <span className="divider">|</span>
          <a href="#terms">Terms of Service</a>
          <span className="divider">|</span>
          <a href="#sitemap">Sitemap</a>
        </div>
      </div>

      <div className="footer-matrix">
        <canvas id="footer-matrix-canvas"></canvas>
      </div>
    </footer>
  );
}

export default Footer;