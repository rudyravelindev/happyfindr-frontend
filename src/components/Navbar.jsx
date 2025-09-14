import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { AiOutlineMenu } from 'react-icons/ai';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          Happy<span className="navbar__logo--accent">Findr</span>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar__links">
          <li>
            <a href="/" className="navbar__link">
              Home
            </a>
          </li>
          <li>
            <a href="#howitworks" className="navbar__link">
              How it works
            </a>
          </li>
          <li>
            <a href="#testimonials" className="navbar__link">
              Testimonials
            </a>
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
          <a
            href="/"
            className="navbar__mobile-link"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="#howitworks"
            className="navbar__mobile-link"
            onClick={() => setIsOpen(false)}
          >
            How it works
          </a>
          <a
            href="#testimonials"
            className="navbar__mobile-link"
            onClick={() => setIsOpen(false)}
          >
            Testimonials
          </a>
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
