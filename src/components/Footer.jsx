import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h2 className="footer__logo">
          Happy<span className="footer__logo--accent">Findr</span>
        </h2>

        <div className="footer__links">
          <a href="#hero" className="footer__link">
            Home
          </a>
          <a href="#howitworks" className="footer__link">
            How it works
          </a>
          <a href="#testimonials" className="footer__link">
            Testimonials
          </a>
          <a href="#cta" className="footer__link">
            Get Started
          </a>
        </div>

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
