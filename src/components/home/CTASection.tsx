import React from "react"
import { BookNowButton } from "../common/Button"

const CTASection: React.FC = () => {
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={contentStyle}>
          <h2 style={titleStyle}>Ready for a Fresh Look?</h2>
          <p style={subtitleStyle}>
            Book your appointment today and experience the difference of premium grooming.
          </p>
          <BookNowButton to="/booking">BOOK APPOINTMENT</BookNowButton>
        </div>
      </div>
    </section>
  )
}

const sectionStyle: React.CSSProperties = {
  padding: "100px 40px",
  background: "#171717",
}

const containerStyle: React.CSSProperties = {
  maxWidth: "720px",
  margin: "0 auto",
  textAlign: "center",
}

const contentStyle: React.CSSProperties = {
  position: "relative",
}

const titleStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "clamp(32px, 4.5vw, 48px)",
  fontWeight: 700,
  lineHeight: 1.2,
  color: "#F5F2EC",
  margin: "0 0 16px",
  letterSpacing: "-0.01em",
}

const subtitleStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "18px",
  lineHeight: 1.7,
  color: "#77736D",
  margin: "0 0 36px",
  fontWeight: 400,
  maxWidth: "520px",
  marginLeft: "auto",
  marginRight: "auto",
}

export default CTASection