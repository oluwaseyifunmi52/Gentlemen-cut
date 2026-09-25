import React, { useEffect, useState } from "react"
import { BookNowButton } from "../common/Button"

interface FirstVisitPopupProps {
  isOpen: boolean
  onClose: () => void
}

const FirstVisitPopup: React.FC<FirstVisitPopupProps> = ({ isOpen, onClose }) => {
  const [showAgain, setShowAgain] = useState(true)

  useEffect(() => {
    if (isOpen) {
      const dismissed = localStorage.getItem("firstVisitDismissed")
      if (dismissed === "true") {
        onClose()
      }
    }
  }, [isOpen, onClose])

  const handleClose = () => {
    if (showAgain) {
      localStorage.setItem("firstVisitDismissed", "true")
    }
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleClose()
  }

  if (!isOpen) return null

  return (
    <div
      style={overlayStyle}
      onClick={handleClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} style={closeStyle} aria-label="Close popup">
          ✕
        </button>

        <img
          src="/oip 2.webp"
          alt="The Gentleman's Cut logo"
          style={logoStyle}
        />

        <h2 id="popup-title" style={titleStyle}>
          Welcome to The Gentleman's Cut
        </h2>

        <p style={taglineStyle}>
          SHARP CUTS. TIMELESS STYLE.
        </p>

        <p style={descriptionStyle}>
          Enjoy <strong>10% off</strong> your first appointment.
          Experience premium barbering in a relaxed, sophisticated atmosphere.
        </p>

        <div style={buttonStyle}>
          <BookNowButton to="/booking" style={{ width: "100%" }}>
            BOOK YOUR FIRST APPOINTMENT
          </BookNowButton>
        </div>

        <label style={checkboxStyle}>
          <input
            type="checkbox"
            checked={showAgain}
            onChange={(e) => setShowAgain(e.target.checked)}
            style={checkboxInputStyle}
          />
          <span style={checkboxLabelStyle}>Don't show this again</span>
        </label>
      </div>
    </div>
  )
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(23, 23, 23, 0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 3000,
  padding: "24px",
  animation: "fadeIn 0.3s ease",
}

const modalStyle: React.CSSProperties = {
  background: "#FFFFFF",
  borderRadius: "12px",
  padding: "40px 32px",
  maxWidth: "420px",
  width: "100%",
  boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
  position: "relative",
  textAlign: "center",
  animation: "slideUp 0.4s ease",
}

const closeStyle: React.CSSProperties = {
  position: "absolute",
  top: "16px",
  right: "16px",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  background: "rgba(23,23,23,0.05)",
  border: "none",
  color: "#77736D",
  fontSize: "20px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.2s ease, color 0.2s ease",
}

const logoStyle: React.CSSProperties = {
  width: "72px",
  height: "72px",
  borderRadius: "50%",
  objectFit: "cover",
  margin: "0 auto 20px",
  boxShadow: "0 4px 16px rgba(185, 146, 74, 0.3)",
}

const titleStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "28px",
  fontWeight: 700,
  color: "#171717",
  margin: "0 0 8px",
  letterSpacing: "-0.01em",
}

const taglineStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "18px",
  fontWeight: 400,
  fontStyle: "italic",
  color: "#B9924A",
  margin: "0 0 16px",
  lineHeight: 1.4,
}

const descriptionStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "16px",
  lineHeight: 1.7,
  color: "#77736D",
  margin: "0 0 28px",
  fontWeight: 400,
}

const buttonStyle: React.CSSProperties = {
  marginBottom: "20px",
}

const checkboxStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  cursor: "pointer",
}

const checkboxInputStyle: React.CSSProperties = {
  width: "18px",
  height: "18px",
  accentColor: "#B9924A",
  cursor: "pointer",
}

const checkboxLabelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "13px",
  color: "#77736D",
  cursor: "pointer",
}

export default FirstVisitPopup