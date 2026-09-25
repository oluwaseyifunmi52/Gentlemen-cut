import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BookNowButton } from "@/components/common/Button"
import { api, Service } from "@/utils/api"

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.services.list()
        setServices(data)
      } catch (err: unknown) {
        const apiError = err as { message?: string; status?: number }
        setError(apiError.message || "Failed to load services")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <main style={mainStyle}>
        <div style={loadingStyle}>Loading services...</div>
      </main>
    )
  }

  if (error) {
    return (
      <main style={mainStyle}>
        <div style={errorStyle}>{error}</div>
      </main>
    )
  }

  return (
    <main style={mainStyle}>
      <header style={heroStyle}>
        <div style={containerStyle}>
          <span style={eyebrowStyle}>OUR SERVICES</span>
          <h1 style={titleStyle}>Crafted for the Modern Gentleman</h1>
          <p style={subtitleStyle}>
            Each service is performed with precision and care, using only the finest tools and products.
          </p>
        </div>
      </header>

      <section style={servicesStyle}>
        <div style={containerStyle}>
          <div style={gridStyle} className="services-grid">
            {services.map((service, index) => (
              <ServiceCard key={service._id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section style={ctaStyle}>
        <div style={containerStyle}>
          <div style={ctaContentStyle}>
            <h2 style={ctaTitleStyle}>Not Sure Which Service?</h2>
            <p style={ctaDescStyle}>
              Our barbers are happy to recommend the right service during your consultation.
            </p>
            <BookNowButton to="/booking">BOOK A CONSULTATION</BookNowButton>
          </div>
        </div>
      </section>
    </main>
  )
}

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const isEven = index % 2 === 0

  // Map backend category to frontend image
  const getServiceImage = (service: Service) => {
    const imageMap: Record<string, string> = {
      'classic-gentlemans-cut': '/images/professional-barber-giving-a-taper-fade-haircut-in-modern-barbershop.webp',
      'skin-fade': '/images/professional-barber-giving-a-taper-fade-haircut-in-modern-barbershop.webp',
      'beard-trim-shape': '/images/straight-edge-barber-folding-shaving-razors-surgicalmart.webp',
      'cut-beard': 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=600&fit=crop',
      'full-gentleman-experience': '/images/Barbershop_Interior_Design_21_1024x1024.webp',
      'kids-cut': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      'low-mid-fade': '/images/professional-barber-giving-a-taper-fade-haircut-in-modern-barbershop.webp',
      'scissor-cut': '/images/professional-barber-giving-a-taper-fade-haircut-in-modern-barbershop.webp',
      'hot-towel-shave': '/images/straight-edge-barber-folding-shaving-razors-surgicalmart.webp',
    }
    return imageMap[service.slug] || '/images/professional-barber-giving-a-taper-fade-haircut-in-modern-barbershop.webp'
  }

  // Format price from cents/kobo to display
  const formatPrice = (price: number) => {
    // Assuming price is in smallest currency unit (kobo/cents), convert to display
    return `₦${(price / 100).toLocaleString()}`
  }

  // Format duration
  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`
    }
    return `${minutes} min`
  }

  return (
    <article style={cardStyle}>
      <div style={imageWrapperStyle}>
        <img
          src={getServiceImage(service)}
          alt={service.name}
          style={imageStyle}
          loading={index < 2 ? "eager" : "lazy"}
        />
        <div style={imageOverlayStyle} />
      </div>

      <div style={contentStyle}>
        <div style={metaStyle}>
          <span style={durationStyle}>{formatDuration(service.durationMinutes)}</span>
          <span style={priceStyle}>{formatPrice(service.price)}</span>
        </div>

        <h2 style={nameStyle}>{service.name}</h2>
        <p style={descStyle}>{service.description || 'Premium barbershop service'}</p>

        <Link
          to={`/booking?service=${service._id}`}
          style={bookLinkStyle}
        >
          BOOK THIS SERVICE
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
  minHeight: "50vh",
  fontFamily: "Inter, sans-serif",
  fontSize: "18px",
  color: "#77736D",
}

const errorStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "50vh",
  fontFamily: "Inter, sans-serif",
  fontSize: "18px",
  color: "#C0392B",
}

const mainStyle: React.CSSProperties = {
  background: "#F5F2EC",
  minHeight: "100vh",
}

const containerStyle: React.CSSProperties = {
  maxWidth: "1320px",
  margin: "0 auto",
  padding: "0 40px",
}

const heroStyle: React.CSSProperties = {
  padding: "160px 0 80px",
  borderBottom: "1px solid rgba(23, 23, 23, 0.06)",
  textAlign: "center",
  maxWidth: "720px",
  margin: "0 auto 80px",
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
  fontSize: "clamp(42px, 5.5vw, 72px)",
  fontWeight: 700,
  lineHeight: 1.1,
  color: "#171717",
  margin: "0 0 20px",
  letterSpacing: "-0.02em",
}

const subtitleStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "19px",
  lineHeight: 1.7,
  color: "#77736D",
  margin: 0,
  fontWeight: 400,
}

const servicesStyle: React.CSSProperties = {
  padding: "40px 0 80px",
}

const gridStyle: React.CSSProperties = {
  display: "grid",
  gap: "32px",
}

const cardStyle: React.CSSProperties = {
  position: "relative",
  borderRadius: 4,
  overflow: "hidden",
  background: "#171717",
  display: "flex",
  flexDirection: "column",
  minHeight: "500px",
}

const imageWrapperStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "55%",
  overflow: "hidden",
}

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.6s ease",
}

const imageOverlayStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "linear-gradient(180deg, transparent 40%, rgba(23, 23, 23, 0.7) 100%)",
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
  fontSize: "24px",
  fontWeight: 600,
  color: "#B9924A",
}

const nameStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "28px",
  fontWeight: 700,
  color: "#F5F2EC",
  margin: "8px 0 8px",
  lineHeight: 1.2,
  letterSpacing: "-0.01em",
}

const descStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  lineHeight: 1.6,
  color: "rgba(245, 242, 236, 0.75)",
  margin: 0,
  maxWidth: "340px",
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

const ctaStyle: React.CSSProperties = {
  padding: "80px 0 120px",
  borderTop: "1px solid rgba(23, 23, 23, 0.06)",
}

const ctaContentStyle: React.CSSProperties = {
  textAlign: "center",
  maxWidth: "560px",
  margin: "0 auto",
}

const ctaTitleStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "clamp(32px, 4vw, 44px)",
  fontWeight: 700,
  lineHeight: 1.2,
  color: "#171717",
  margin: "0 0 16px",
  letterSpacing: "-0.01em",
}

const ctaDescStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "17px",
  lineHeight: 1.7,
  color: "#77736D",
  margin: "0 0 32px",
  fontWeight: 400,
}

export default Services