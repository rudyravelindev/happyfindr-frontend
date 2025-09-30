import { Link as ScrollLink } from 'react-scroll';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h2 className="footer__logo">
          Happy<span className="footer__logo--accent">Findr</span>
        </h2>

        <nav className="footer__nav">
          <ScrollLink
            to="hero"
            smooth={true}
            duration={500}
            className="footer__link"
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="howitworks"
            smooth={true}
            duration={500}
            className="footer__link"
          >
            How it works
          </ScrollLink>
          <ScrollLink
            to="testimonials"
            smooth={true}
            duration={500}
            className="footer__link"
          >
            Testimonials
          </ScrollLink>
        </nav>

        <div className="footer__right">
          <p className="footer__copyright">
            © 2025 HappyFindr. All rights reserved.
          </p>
          <p className="footer__tagline">
            Made with <span className="footer__heart">❤️</span> for travelers
            everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
