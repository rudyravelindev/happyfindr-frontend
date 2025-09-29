import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import './Navbar.css';
import { AiOutlineMenu } from 'react-icons/ai';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo" onClick={() => setIsOpen(false)}>
          Happy<span className="navbar__logo--accent">Findr</span>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar__links">
          <li>
            <Link to="/" className="navbar__link">
              Home
            </Link>
          </li>
          <li>
            <li>
              <HashLink
                smooth
                to="/#howitworks"
                className="navbar__link navbar__link--button"
                onClick={() => setIsOpen(false)}
              >
                How it works
              </HashLink>
            </li>
            <li>
              <HashLink
                smooth
                to="/#testimonials"
                className="navbar__link navbar__link--button"
                onClick={() => setIsOpen(false)}
              >
                Testimonials
              </HashLink>
            </li>
          </li>
          <li>
            <Link to="/signup" className="navbar__link">
              Get Started
            </Link>
          </li>
          <li>
            <Link to="/login" className="navbar__link navbar__link--login">
              Log In
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="navbar__menu" onClick={() => setIsOpen(!isOpen)}>
          <AiOutlineMenu />
        </button>

        {/* Mobile Menu */}
        <div
          className={`navbar__mobile-links ${
            isOpen ? 'navbar__mobile-links--open' : ''
          }`}
        >
          <Link
            to="/"
            className="navbar__mobile-link"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <HashLink
            smooth
            to="/#howitworks"
            className="navbar__mobile-link navbar__link--button"
            onClick={() => setIsOpen(false)}
          >
            How it works
          </HashLink>

          <HashLink
            smooth
            to="/#testimonials"
            className="navbar__mobile-link navbar__link--button"
            onClick={() => setIsOpen(false)}
          >
            Testimonials
          </HashLink>
          <Link
            to="/signup"
            className="navbar__mobile-link"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="navbar__mobile-link"
            onClick={() => setIsOpen(false)}
          >
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
}
