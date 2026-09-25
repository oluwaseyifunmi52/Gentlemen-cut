import React from "react"
import { Link } from "react-router-dom"
import { business } from "@/data/business"
import "./Footer.css"

const Footer: React.FC = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="The Gentleman's Cut - Home">
              <img
                src="/oip 2.webp"
                alt="The Gentleman's Cut logo"
                className="footer__logo-image"
              />
            </Link>
            <p className="footer__tagline">Sharp Cuts. Timeless Style.</p>
            <p className="footer__desc">
              Est. 2018 — Premium barbering for the modern gentleman.
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            <div className="footer__nav-column">
              <strong className="footer__nav-title">Shop</strong>
              <ul className="footer__nav-list">
                <li><Link to="/services" className="footer__nav-link">Services</Link></li>
                <li><Link to="/about" className="footer__nav-link">About</Link></li>
                <li><Link to="/booking" className="footer__nav-link">Book Appointment</Link></li>
              </ul>
            </div>
            <div className="footer__nav-column">
              <strong className="footer__nav-title">Info</strong>
              <ul className="footer__nav-list">
                <li><Link to="/terms" className="footer__nav-link">Terms</Link></li>
                <li><Link to="/privacy" className="footer__nav-link">Privacy</Link></li>
                <li><Link to="/contact" className="footer__nav-link">Contact</Link></li>
              </ul>
            </div>
          </nav>

          <div className="footer__contact">
            <strong className="footer__nav-title">Contact</strong>
            <address className="footer__address">
              <p className="footer__contact-line">
                <a href={`tel:${business.phone.replace(/\D/g, "")}`} className="footer__contact-link">
                  {business.phone}
                </a>
              </p>
              <p className="footer__contact-line">
                <a href={`mailto:${business.email}`} className="footer__contact-link">
                  {business.email}
                </a>
              </p>
              <p className="footer__contact-line">{business.address}</p>
            </address>
            <div className="footer__hours">
              <strong className="footer__hours-label">Hours</strong>
              <pre className="footer__hours-text">{business.openingHours}</pre>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__social">
            <a
              href={business.socialLinks[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.207 0 3.584.012 4.85.047 3.337.148 4.794 1.603 4.942 4.942a11.76 11.76 0 0 1-.707 7.293 11.935 11.935 0 0 1-7.293-.707 11.734 11.734 0 0 1-4.942-4.942C2.163 13.808 2.154 13.164 2.163 12 2.163 8.163 3.171 7.35 4.238 6.718a11.926 11.926 0 0 1 7.755 2.163c3.583 0 4.388-.133 5.867-.388.518-.288.789-.7 1.018-1.123.097-.173.152-.355.195-.548a11.925 11.925 0 0 0 2.163-5.017 11.986 11.986 0 0 0-5.017-2.163c-.375 0-.738.045-.105.532.319.257.627.571.878.918.12.12.22.25.31.366.21.27.39.57.54.918.29.6.58 1.23.818 1.878.37.98.61 2.11.75 3.35.17 2.01.293 4.282.293 6.708 0 0-.308.018-.465.02-1.926 0-2.717-.578-3.496-1.65-.386-.365-.666-.785-.878-1.26a11.945 11.945 0 0 0-2.558-1.818 11.899 11.899 0 0 0-1.818-2.557 11.93 11.93 0 0 0-1.26-1.878c-.198-.31-.31-.67.31-.98.26-.89.58-1.93.75-3.08.236-1.586.353-3.288.353-5.16a13.985 13.985 0 0 0-1.566-3.673zM12 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z"/></svg>
            </a>
            <a
              href={business.socialLinks[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3zM7 22h10v-1H7v-4h4V11a5 5 0 0 0-5-5H7a3 3 0 0 0-3 3v4h3v8z"/></svg>
            </a>
          </div>
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} The Gentleman's Cut. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer