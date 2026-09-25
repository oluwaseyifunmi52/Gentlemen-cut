import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api, Barber } from "@/utils/api"

const FeaturedBarbers: React.FC = () => {
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const data = await api.barbers.list()
        setBarbers(data.filter((b) => b.active))
      } catch (err: unknown) {
        const apiError = err as { message?: string }
        setError(apiError.message || "Failed to load barbers")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBarbers()
  }, [])

  if (loading) {
    return (
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <div style={loadingStyle}>Loading barbers...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <div style={errorStyle}>{error}</div>
        </div>
      </section>
    )
  }

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <header style={headerStyle}>
          <span style={eyebrowStyle}>OUR BARBERS</span>
          <h2 style={titleStyle}>Masters of the Craft</h2>
          <p style={subtitleStyle}>
            Our team brings decades of combined experience and a shared dedication to excellence.
          </p>
        </header>

        <div style={gridStyle} className="featured-barbers-grid">
          {barbers.map((barber) => (
            <BarberProfile key={barber._id} barber={barber} />
          ))}
        </div>

        <div style={viewAllStyle}>
          <Link to="/about" style={viewAllLinkStyle}>
            MEET THE FULL TEAM
            <span style={{ marginLeft: "8px" }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

const BarberProfile: React.FC<{ barber: Barber }> = ({ barber }) => {
  return (
    <article style={cardStyle}>
      <div style={imageWrapperStyle}>
        <img
          src={barber.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'}
          alt={barber.name}
          style={imageStyle}
          loading="lazy"
        />
      </div>

      <div style={contentStyle}>
        <h3 style={nameStyle}>{barber.name}</h3>
        <p style={specialtyStyle}>{barber.specialty}</p>
        <p style={descStyle}>{barber.description || 'Expert barber with years of experience'}</p>

        <Link
          to={`/booking?barber=${barber._id}`}
          style={bookLinkStyle}
        >
          BOOK WITH {barber.name.split(" ")[0].toUpperCase()}
          <span style={{ marginLeft: "8px" }}>→</span>
        </Link>
      </div>
    </article>
  )
}

const loadingStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "30vh",
  fontFamily: "Inter, sans-serif",
  fontSize: "18px",
  color: "#77736D",
}

const errorStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "30vh",
  fontFamily: "Inter, sans-serif",
  fontSize: "18px",
  color: "#C0392B",
}

const sectionStyle: React.CSSProperties = {
  padding: "100px 40px",
  background: "#171717",
}

const containerStyle: React.CSSProperties = {
  maxWidth: "1140px",
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
  color: "#F5F2EC",
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
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "32px",
  marginBottom: "48px",
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
  color: "#F5F2EC",
  paddingBottom: "4px",
  borderBottom: "2px solid #B9924A",
  transition: "color 0.2s ease, border-color 0.2s ease",
}

const cardStyle: React.CSSProperties = {
  background: "#1F1F1F",
  border: "1px solid #2A211B",
  borderRadius: 4,
  overflow: "hidden",
  transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
}

const imageWrapperStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  aspectRatio: "3/4",
  overflow: "hidden",
}

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.5s ease",
}

const contentStyle: React.CSSProperties = {
  padding: "28px 24px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}

const nameStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "22px",
  fontWeight: 700,
  color: "#F5F2EC",
  margin: 0,
  lineHeight: 1.2,
  letterSpacing: "-0.01em",
}

const specialtyStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "13px",
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#B9924A",
  margin: 0,
}

const descStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  lineHeight: 1.65,
  color: "#77736D",
  margin: "8px 0 16px",
  fontWeight: 400,
}

const bookLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  marginTop: "auto",
  paddingTop: "12px",
  borderTop: "1px solid #2A211B",
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

export default FeaturedBarbers