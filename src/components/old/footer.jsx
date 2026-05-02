import './footer.css';
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
function footer() {
    return (
        <>
        <footer className="footer">
  <div className="footer_container">

    <div className="footer_left">
      <h2>PK Webworks</h2>
      <p>Building creative web experiences with code & design.</p>
    </div>

    <div className="footer_links">
      <a href="#">Home</a>
      <a href="#">Projects</a>
      <a href="#">Contact</a>
    </div>

    <div className="footer_socials">
      <a href="#"><FaInstagram /></a>
      <a href="#"><FaGithub /></a>
      <a href="#"><FaLinkedin /></a>
    </div>

  </div>

  <div className="footer_bottom">
    <p>© 2026 PK Webworks. All rights reserved.</p>
  </div>
</footer>
        </>
    )
}

export default footer;