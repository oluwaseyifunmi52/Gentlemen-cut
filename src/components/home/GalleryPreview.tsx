import React from "react"
import { Link } from "react-router-dom"

const galleryImages = [
  {
    src: "/images/Barbershop_Interior_Design_21_1024x1024.webp",
    alt: "Barbershop interior",
    layout: "large",
  },
  {
    src: "/images/professional-barber-giving-a-taper-fade-haircut-in-modern-barbershop.webp",
    alt: "Barber at work",
    layout: "large",
  },
  {
    src: "/images/straight-edge-barber-folding-shaving-razors-surgicalmart.webp",
    alt: "Barber tools",
    layout: "small",
  },
  {
    src: "/images/b0937819899bdc179995f891bacdf8ec.jpg",
    alt: "Barbershop detail",
    layout: "small",
  },
]

const GalleryPreview: React.FC = () => {
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <header style={headerStyle}>
          <span style={eyebrowStyle}>GALLERY</span>
          <h2 style={titleStyle}>Inside The Shop</h2>
          <p style={subtitleStyle}>
            A glimpse of our space, our craft, and the gentlemen we serve.
          </p>
        </header>

        <div style={gridStyle} className="whygrid">
          {galleryImages.map((image, index) => (
            <GalleryItem key={index} image={image} index={index} />
          ))}
        </div>

        <div style={viewAllStyle}>
          <Link to="/gallery" style={viewAllLinkStyle}>
            VIEW FULL GALLERY
            <span style={{ marginLeft: "8px" }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

const GalleryItem: React.FC<{ image: typeof galleryImages[0]; index: number }> = ({ image, index }) => {
  const isLarge = image.layout === "large"

  const itemStyle: React.CSSProperties = {
    position: "relative",
    borderRadius: 4,
    overflow: "hidden",
    background: "#171717",
    aspectRatio: isLarge ? "4/5" : "1/1",
    ...(index === 0 ? { gridColumn: "span 2", gridRow: "span 2" } : {}),
    ...(index === 1 ? { gridColumn: "span 2", gridRow: "span 2" } : {}),
  }

  return (
    <article style={itemStyle}>
      <img
        src={image.src}
        alt={image.alt}
        style={imageStyle}
        loading={index < 2 ? "eager" : "lazy"}
      />
      <div style={overlayStyle} />
      <div style={captionStyle}>
        <span style={captionTextStyle}>{image.alt.toUpperCase()}</span>
      </div>
    </article>
  )
}

const sectionStyle: React.CSSProperties = {
  padding: "100px 40px",
  background: "#F5F2EC",
}

const containerStyle: React.CSSProperties = {
  maxWidth: "1320px",
  margin: "0 auto",
}

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "64px",
  maxWidth: "680px",
  marginLeft: "auto",
  marginRight: "auto",
}

const eyebrowStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "Inter, sans-serif",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "#B9924A",
  marginBottom: "16px",
}

const titleStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "clamp(36px, 4.5vw, 52px)",
  fontWeight: 700,
  lineHeight: 1.15,
  color: "#171717",
  margin: "0 0 16px",
  letterSpacing: "-0.01em",
}

const subtitleStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "17px",
  lineHeight: 1.7,
  color: "#77736D",
  margin: 0,
  fontWeight: 400,
}

const gridStyle: React.CSSProperties = {
  display: "grid",
  gap: "16px",
  marginBottom: "32px",
}

const viewAllStyle: React.CSSProperties = {
  textAlign: "center",
}

const viewAllLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  fontFamily: "Inter, sans-serif",
  fontSize: "13px",
  fontWeight: 600,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  textDecoration: "none",
  color: "#171717",
  paddingBottom: "4px",
  borderBottom: "2px solid #B9924A",
  transition: "color 0.2s ease, border-color 0.2s ease",
}

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.6s ease",
}

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "linear-gradient(180deg, transparent 50%, rgba(23, 23, 23, 0.5) 100%)",
  pointerEvents: "none",
  opacity: 0,
  transition: "opacity 0.3s ease",
}

const captionStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "24px",
  left: "24px",
  zIndex: 1,
}

const captionTextStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "#F5F2EC",
  opacity: 0.9,
}

export default GalleryPreview