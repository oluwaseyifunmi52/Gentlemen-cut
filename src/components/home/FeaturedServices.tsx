import React from "react"
import { Link } from "react-router-dom"
import { services } from "@/data/services"

const FeaturedServices: React.FC = () => {
  const featuredServices = services.slice(0, 3)

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <header style={headerStyle}>
          <span style={eyebrowStyle}>OUR SERVICES</span>
          <h2 style={titleStyle}>Crafted for the Modern Gentleman</h2>
          <p style={subtitleStyle}>
            Each service is performed with precision and care, using only the finest tools and products.
          </p>
        </header>

        <div style={gridStyle} className="featured-services-grid">
          {featuredServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div style={viewAllStyle}>
          <Link to="/services" style={viewAllLinkStyle}>
            VIEW ALL SERVICES
            <span style={{ marginLeft: "8px", transition: "transform 0.2s ease" }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

const ServiceCard: React.FC<{ service: typeof services[0]; index: number }> = ({ service, index }) => {
  const isFirst = index === 0

  const cardStyle: React.CSSProperties = {
    position: "relative",
    borderRadius: 4,
    overflow: "hidden",
    background: "#171717",
    display: "flex",
    flexDirection: "column",
    minHeight: isFirst ? "520px" : "380px",
    ...(isFirst ? { gridColumn: "span 2", gridRow: "span 2" } : {}),
  }

  const imageWrapperStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: isFirst ? "60%" : "55%",
    overflow: "hidden",
  }

  const nameStyle: React.CSSProperties = {
    fontFamily: "Cormorant Garamond, serif",
    fontSize: isFirst ? "32px" : "24px",
    fontWeight: 700,
    color: "#F5F2EC",
    margin: "4px 0 8px",
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
  }

  return (
    <article style={cardStyle}>
      <div style={imageWrapperStyle}>
        <img
          src={service.image}
          alt={service.name}
          style={imageStyle}
          loading={isFirst ? "eager" : "lazy"}
        />
        <div style={imageOverlayStyle} />
      </div>

      <div style={contentStyle}>
        <div style={metaStyle}>
          <span style={durationStyle}>{service.duration}</span>
          <span style={priceStyle}>{service.price}</span>
        </div>

        <h3 style={nameStyle}>{service.name}</h3>
        <p style={descStyle}>{service.description}</p>

        <Link
          to={`/booking?service=${service.id}`}
          style={bookLinkStyle}
        >
          BOOK THIS SERVICE
          <span style={{ marginLeft: "8px" }}>→</span>
        </Link>
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
  gap: "24px",
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
  transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
}

const imageOverlayStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "linear-gradient(180deg, transparent 40%, rgba(23, 23, 23, 0.6) 100%)",
  pointerEvents: "none",
}

const contentStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "32px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}

const metaStyle: React.CSSProperties = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
}

const durationStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(245, 242, 236, 0.7)",
}

const priceStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "20px",
  fontWeight: 600,
  color: "#B9924A",
}

const descStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  lineHeight: 1.6,
  color: "rgba(245, 242, 236, 0.75)",
  margin: 0,
  maxWidth: "320px",
}

const bookLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  marginTop: "8px",
  fontFamily: "Inter, sans-serif",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  textDecoration: "none",
  color: "#B9924A",
  transition: "color 0.2s ease",
  width: "fit-content",
}

export default FeaturedServices