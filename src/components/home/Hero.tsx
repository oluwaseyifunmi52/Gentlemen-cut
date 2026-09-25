import React from "react"
import { BookNowButton } from "../common/Button"
import { Link } from "react-router-dom"
import "./Hero.css"

const Hero: React.FC = () => {
  return (
    <section className="hero" role="banner">
      <video
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/professional-barber-giving-a-taper-fade-haircut-in-modern-barbershop.webp"
      >
        <source src="/images/mixkit-barber-equipment-271-hd-ready.mp4" type="video/mp4" />
      </video>

      <div className="hero__overlay" />

      <div className="hero__content-wrapper">
        <div className="hero__content">
          <span className="hero__eyebrow">THE GENTLEMAN'S CUT</span>
          <h1 className="hero__headline">
            SHARP CUTS.<br />
            <span className="hero__headline-accent">TIMELESS STYLE.</span>
          </h1>
          <p className="hero__subheadline">
            Established 2018. Premium barbering for the modern gentleman.
          </p>
          <div className="hero__cta-group">
            <BookNowButton to="/booking">BOOK AN APPOINTMENT</BookNowButton>
            <Link to="/services" className="hero__secondary-cta btn btn-secondary">
              EXPLORE SERVICES
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero