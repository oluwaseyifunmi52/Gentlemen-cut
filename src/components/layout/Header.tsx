import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Header.css"

type NavLink = {
  to: string
  label: string
}

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const mobileNavLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/booking", label: "Book" },
  ]

  const navLinks: NavLink[] = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/booking", label: "Book Now" },
  ]

  return (
    <header
      className={`header ${scrolled ? "header--scrolled" : ""}`}
      role="banner"
    >
      <div className="header__container container">
        <Link to="/" className="header__logo" aria-label="The Gentleman's Cut - Home">
          <img
            src="/oip 2.webp"
            alt="The Gentleman's Cut logo"
            className="header__logo-image"
          />
        </Link>

        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.to} className="header__nav-item">
                <Link
                  to={link.to}
                  className="header__nav-link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <button
            className="header__menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>

          <Link
            to="/booking"
            className="header__cta btn btn-primary"
          >
            Book Now
          </Link>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="header__mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="header__mobile-menu-content">
            <button
              className="header__mobile-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
            <nav className="header__mobile-nav" aria-label="Mobile navigation">
              <ul className="header__mobile-nav-list">
                {mobileNavLinks.map((link) => (
                  <li key={link.to} className="header__mobile-nav-item">
                    <Link
                      to={link.to}
                      className="header__mobile-nav-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              to="/booking"
              className="header__mobile-cta btn btn-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header