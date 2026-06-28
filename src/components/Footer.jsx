export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-column">
          <h3>Explore</h3>
          <ul>
            <li><a href="#">Latest Articles</a></li>
            <li><a href="#">Podcast Series</a></li>
            <li><a href="#">Tech Reports</a></li>
            <li><a href="#">Future Forecasts</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Topics</h3>
          <ul>
            <li><a href="#">Artificial Intelligence</a></li>
            <li><a href="#">Space Exploration</a></li>
            <li><a href="#">Biotechnology</a></li>
            <li><a href="#">Quantum Computing</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Advertise</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Connect</h3>
          <p>Follow us for the latest updates</p>
          <div className="social-links">
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter" /></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin" /></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube" /></a>
          </div>
        </div>
      </div>

      <div className="copyright">
        <p>© 2077 NEXUS FUTURE TECH. All rights reserved. Designed for the next generation.</p>
      </div>
    </footer>
  );
}

