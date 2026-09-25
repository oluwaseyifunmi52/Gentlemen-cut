import React from "react"

type ButtonProps = {
  children: React.ReactNode
  to?: string
  type?: "button" | "submit" | "reset"
  styleOverride?: React.CSSProperties
  fullWidth?: boolean
}

const BookNowButton: React.FC<ButtonProps> = ({ children, to, type, styleOverride, fullWidth }) => {
  const baseStyles: React.CSSProperties = {
    display: fullWidth ? "flex" : "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: fullWidth ? "100%" : "auto",
    padding: "16px 36px",
    fontFamily: "Inter, sans-serif",
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    textDecoration: "none",
    color: "#171717",
    background: "#B9924A",
    border: "none",
    borderRadius: 2,
    cursor: "pointer",
    transition: "background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
    whiteSpace: "nowrap",
    boxShadow: "0 2px 8px rgba(185, 146, 74, 0.3)",
  }

  const linkStyles: React.CSSProperties = {
    textDecoration: "none",
  }

  const mergedStyles = { ...baseStyles, ...styleOverride }

  return (
    <div style={{ width: fullWidth ? "100%" : "auto" }}>
      {to ? (
        <a
          href={to}
          style={{
            ...mergedStyles,
            ...linkStyles,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#A0803E"
            e.currentTarget.style.transform = "translateY(-1px)"
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(185, 146, 74, 0.4)"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#B9924A"
            e.currentTarget.style.transform = "translateY(0)"
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(185, 146, 74, 0.3)"
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(0)"
          }}
        >
          {children}
        </a>
      ) : (
        <button
          type={type || "button"}
          style={mergedStyles}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#A0803E"
            e.currentTarget.style.transform = "translateY(-1px)"
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(185, 146, 74, 0.4)"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#B9924A"
            e.currentTarget.style.transform = "translateY(0)"
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(185, 146, 74, 0.3)"
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(0)"
          }}
        >
          {children}
        </button>
      )}
    </div>
  )
}

export default BookNowButton
export { BookNowButton }