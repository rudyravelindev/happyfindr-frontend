import './CTA.css';
import ctaImage from '../assets/images/cta-img.jpg';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CTA() {
  return (
    <section id="cta" className="cta">
      <div className="cta__container">
        <div className="cta__content">
          <h1 className="cta__title">Start Retrieving Your Items Today!</h1>

          <p className="cta__description">
            Join thousands of happy users who reunited with their lost items
            through HappyFindr&apos;s smart QR code system.
          </p>

          <Link to="/signup" className="cta__button">
            Get Started Now
          </Link>

          <div className="cta__footer">
            <p className="cta__footer-text">
              <strong>HappyFindr</strong> · Secure · Reliable · Trusted
            </p>
          </div>
        </div>

        <div className="cta__image-container">
          <img src={ctaImage} alt="Happy people" className="cta__image" />
        </div>
      </div>
    </section>
  );
}

CTA.propTypes = {};
