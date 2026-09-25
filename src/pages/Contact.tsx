import React from "react"
import { business } from "@/data/business"
import { BookNowButton } from "@/components/common/Button"

const Contact: React.FC = () => {
  return (
    <main style={mainStyle}>
      <header style={heroStyle}>
        <div style={containerStyle}>
          <span style={eyebrowStyle}>CONTACT</span>
          <h1 style={titleStyle}>Get in Touch</h1>
          <p style={subtitleStyle}>
            Have a question? Want to book a large group? We'd love to hear from you.
          </p>
        </div>
      </header>

      <section style={contentStyle}>
        <div style={containerStyle}>
          <div style={gridStyle} className="contact-grid">
            <div style={infoStyle}>
              <h2 style={sectionTitleStyle}>Visit Us</h2>
              <address style={addressStyle}>
                <p style={addressLineStyle}>
                  <strong style={addressLabelStyle}>ADDRESS</strong>
                  <span>{business.address}</span>
                </p>
                <p style={addressLineStyle}>
                  <strong style={addressLabelStyle}>PHONE</strong>
                  <a href={`tel:${business.phone.replace(/\D/g, "")}`} style={addressLinkStyle}>{business.phone}</a>
                </p>
                <p style={addressLineStyle}>
                  <strong style={addressLabelStyle}>EMAIL</strong>
                  <a href={`mailto:${business.email}`} style={addressLinkStyle}>{business.email}</a>
                </p>
              </address>

              <div style={hoursStyle}>
                <strong style={addressLabelStyle}>OPENING HOURS</strong>
                <pre style={hoursPreStyle}>{business.openingHours}</pre>
              </div>
            </div>

            <div style={ctaCardStyle}>
              <h2 style={sectionTitleStyle}>Book an Appointment</h2>
              <p style={ctaCardDescStyle}>
                The fastest way to secure your spot. Choose your service, barber, and time.
              </p>
              <BookNowButton to="/booking" style={{ width: "100%" }}>BOOK NOW</BookNowButton>
              <p style={ctaCardNoteStyle}>Or call us directly at <a href={`tel:${business.phone.replace(/\D/g, "")}`} style={addressLinkStyle}>{business.phone}</a></p>
            </div>
          </div>

          <div style={socialStyle}>
            <h2 style={sectionTitleStyle}>Follow Us</h2>
            <div style={socialLinksStyle}>
              <a
                href={business.socialLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                style={socialLinkStyle}
                aria-label="Instagram"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.207 0 3.584.012 4.85.047 3.337.148 4.794 1.603 4.942 4.942a11.76 11.76 0 0 1-.707 7.293 11.935 11.935 0 0 1-7.293-.707 11.734 11.734 0 0 1-4.942-4.942C2.163 13.808 2.154 13.164 2.163 12 2.163 8.163 3.171 7.35 4.238 6.718a11.926 11.926 0 0 1 7.755 2.163c3.583 0 4.388-.133 5.867-.388.518-.288.789-.7 1.018-1.123.097-.173.152-.355.195-.548a11.925 11.925 0 0 0 2.163-5.017 11.986 11.986 0 0 0-5.017-2.163c-.375 0-.738.045-.105.532.319.257.627.571.878.918.12.12.22.25.31.366.21.27.39.57.54.918.29.6.58 1.23.818 1.878.37.98.61 2.11.75 3.35.17 2.01.293 4.282.293 6.708 0 0-.308.018-.465.02-1.926 0-2.717-.578-3.496-1.65-.386-.365-.666-.785-.878-1.26a11.945 11.945 0 0 0-2.558-1.818 11.899 11.899 0 0 0-1.818-2.557 11.93 11.93 0 0 0-1.26-1.878c-.198-.31-.31-.67.31-.98.26-.89.58-1.93.75-3.08.236-1.586.353-3.288.353-5.16a13.985 13.985 0 0 0-1.566-3.673zM12 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z"/></svg>
              </a>
              <a
                href={business.socialLinks[1].url}
                target="_blank"
                rel="noopener noreferrer"
                style={socialLinkStyle}
                aria-label="Facebook"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3zM7 22h10v-1H7v-4h4V11a5 5 0 0 0-5-5H7a3 3 0 0 0-3 3v4h3v8z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

const mainStyle: React.CSSProperties = {
  background: "#F5F2EC",
  minHeight: "100vh",
}

const containerStyle: React.CSSProperties = {
  maxWidth: "1140px",
  margin: "0 auto",
  padding: "0 40px",
}

const heroStyle: React.CSSProperties = {
  padding: "160px 0 60px",
  borderBottom: "1px solid rgba(23, 23, 23, 0.06)",
  textAlign: "center",
  maxWidth: "720px",
  margin: "0 auto",
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

const contentStyle: React.CSSProperties = {
  padding: "80px 0 120px",
}

const gridStyle: React.CSSProperties = {
  display: "grid",
  gap: "24px",
  marginBottom: "32px",
}

const infoStyle: React.CSSProperties = {
  maxWidth: "560px",
}

const addressStyle: React.CSSProperties = {
  fontStyle: "normal",
  marginBottom: "40px",
}

const addressLineStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginBottom: "24px",
  fontFamily: "Inter, sans-serif",
  fontSize: "16px",
  lineHeight: 1.6,
  color: "#171717",
}

const addressLabelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "#B9924A",
}

const addressLinkStyle: React.CSSProperties = {
  color: "#171717",
  textDecoration: "none",
  transition: "color 0.2s ease",
}

const hoursStyle: React.CSSProperties = {
  marginTop: "16px",
}

const hoursPreStyle: React.CSSProperties = {
  margin: "8px 0 0",
  fontFamily: "Inter, sans-serif",
  fontSize: "15px",
  lineHeight: 1.8,
  color: "#77736D",
  whiteSpace: "pre-wrap",
  fontWeight: 400,
}

const ctaCardStyle: React.CSSProperties = {
  background: "#171717",
  borderRadius: 4,
  padding: "40px 32px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "fit-content",
  maxHeight: "320px",
}

const ctaCardDescStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "15px",
  lineHeight: 1.7,
  color: "#77736D",
  margin: "0 0 24px",
  fontWeight: 400,
}

const ctaCardNoteStyle: React.CSSProperties = {
  marginTop: "20px",
  paddingTop: "20px",
  borderTop: "1px solid #2A211B",
  fontFamily: "Inter, sans-serif",
  fontSize: "13px",
  color: "rgba(245, 242, 236, 0.6)",
  textAlign: "center",
}

const socialStyle: React.CSSProperties = {
  paddingTop: "40px",
  borderTop: "1px solid rgba(23, 23, 23, 0.08)",
  maxWidth: "560px",
}

const socialLinksStyle: React.CSSProperties = {
  display: "flex",
  gap: "16px",
  marginTop: "24px",
}

const socialLinkStyle: React.CSSProperties = {
  width: "48px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#171717",
  border: "1px solid rgba(245, 242, 236, 0.1)",
  borderRadius: 2,
  color: "#F5F2EC",
  textDecoration: "none",
  transition: "background 0.2s ease, border-color 0.2s ease, transform 0.15s ease",
}

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "28px",
  fontWeight: 700,
  color: "#171717",
  margin: "0 0 24px",
  lineHeight: 1.2,
}

export default Contact