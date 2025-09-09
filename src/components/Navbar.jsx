import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <h1 className="navbar__logo">
          Happy<span className="navbar__logo--accent">Findr</span>
        </h1>

        {/* Desktop Links */}
        <ul className="navbar__links">
          <li>
            <a href="#hero" className="navbar__link">
              Home
            </a>
          </li>
          <li>
            <a href="#howitworks" className="navbar__link">
              How it works
            </a>
          </li>
          <li>
            <a href="#cta" className="navbar__link">
              Get Started
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="navbar__menu" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        {/* Mobile Menu */}
        <div
          className={`navbar__mobile-links ${
            isOpen ? 'navbar__mobile-links--open' : ''
          }`}
        >
          <a
            href="#hero"
            className="navbar__mobile-link"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="#features"
            className="navbar__mobile-link"
            onClick={() => setIsOpen(false)}
          >
            Features
          </a>
          <a
            href="#cta"
            className="navbar__mobile-link"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
