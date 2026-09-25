import React, { useState } from "react"
import { Link } from "react-router-dom"

const MobileMenu: React.FC = ({ isOpen, onClose, onNavigate }: { isOpen: boolean; onClose: () => void; onNavigate: (to: string) => void }) => {
  const menuLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/booking", label: "Book Now" },
  ]

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#171717",
        zIndex: 999,
        padding: "80px 40px 40px",
        transform: `translateX(${isOpen ? "0" : "100%"})`,
        transition: "transform 0.3s ease-in-out",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: "24px",
      }}
    >
      <button
        onClick={onClose
        style={{
          position: "absolute",
          top: 24,
          right: 40,
          background: "none",
          border: "none",
          color: "#F5F2EC",
          fontSize: 24,
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      <ul style={{ listStyle: "none", padding: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
        {menuLinks.map((link) => (
          <li key={link.to}>
            <button
              onClick={() => { onNavigate(link.to); onClose() }}
              style={{
                width: "100%",
                padding: "12px 0",
                background: "none",
                border: "none",
                color: "#F5F2EC",
                fontFamily: "Inter, sans-serif",
                fontSize: 18,
                fontWeight: 500,
                textAlign: "left",
                cursor: "pointer",
                borderBottom: "1px solid #2A211B",
              }}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MobileMenu