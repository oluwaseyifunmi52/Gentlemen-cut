import React from "react"
import { Link } from "react-router-dom"
import { barbers } from "@/data/barbers"
import { BookNowButton } from "@/components/common/Button"

const About: React.FC = () => {
  return (
    <main style={mainStyle}>
      <section style={heroStyle}>
        <div style={containerStyle}>
          <header style={headerStyle}>
            <span style={eyebrowStyle}>ABOUT US</span>
            <h1 style={titleStyle}>Our Story</h1>
            <p style={subtitleStyle}>
              Founded in 2018, The Gentleman's Cut was born from a simple belief: 
              every man deserves a barber who respects his time, understands his style, 
              and takes pride in the craft.
            </p>
          </header>
        </div>
      </section>

      <section style={storyStyle}>
        <div style={containerStyle}>
          <div style={storyGridStyle} className="about-story-grid">
            <div style={storyTextStyle}>
              <h2 style={storyTitleStyle}>THE CRAFT OF A GREAT CUT</h2>
              <p style={storyDescStyle}>
                We started with one chair and a waiting list. 
                Six years later, the shop has grown — but the philosophy hasn't changed.
                A great cut isn't about trends. It's about understanding face shape, 
                hair texture, and how a man wants to present himself to the world.
              </p>
              <p style={storyDescStyle}>
                Our barbers don't just follow a chart. They consult. They listen. 
                They execute with the precision that only comes from thousands of hours 
                behind the chair. Whether it's a skin fade that disappears into the skin 
                or a classic scissor cut with perfect weight distribution — the standard 
                is the same.
              </p>
            </div>
            <div style={storyImageStyle}>
              <img
                src="/images/Barbershop_Interior_Design_21_1024x1024.webp"
                alt="The Gentleman's Cut interior"
                style={storyImgStyle}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <section style={philosophyStyle}>
        <div style={containerStyle}>
          <div style={philosophyGridStyle} className="about-philosophy-grid">
            <div style={philosophyImageStyle}>
              <img
                src="/images/professional-barber-giving-a-taper-fade-haircut-in-modern-barbershop.webp"
                alt="Barber at work"
                style={philosophyImgStyle}
              />
            </div>
            <div style={philosophyTextStyle}>
              <span style={eyebrowStyle}>OUR PHILOSOPHY</span>
              <h2 style={philosophyTitleStyle}>More Than a Haircut</h2>
              <p style={philosophyDescStyle}>
                We believe grooming is a ritual of self-respect. 
                The hot towel. The straight razor. The precise line-up. 
                The conversation — or the comfortable silence. 
                These aren't add-ons. They're the service.
              </p>
              <p style={philosophyDescStyle}>
                Walk in rushed, leave reset. That's the promise.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={teamStyle}>
        <div style={containerStyle}>
          <header style={headerStyle}>
            <span style={eyebrowStyle}>THE TEAM</span>
            <h2 style={titleStyle}>Masters of the Craft</h2>
          </header>

          <div style={teamGridStyle} className="about-team-grid">
            {barbers.map((barber) => (
              <BarberCard key={barber.id} barber={barber} />
            ))}
          </div>

          <div style={viewAllStyle}>
            <Link to="/booking" style={viewAllLinkStyle}>
              BOOK WITH A BARBER
              <span style={{ marginLeft: "8px" }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section style={ctaStyle}>
        <div style={containerStyle}>
          <div style={ctaContentStyle}>
            <h2 style={ctaTitleStyle}>Experience It Yourself</h2>
            <p style={ctaDescStyle}>
              Book your first appointment and see why our clients return.
            </p>
            <BookNowButton to="/booking">BOOK AN APPOINTMENT</BookNowButton>
          </div>
        </div>
      </section>
    </main>
  )
}

const BarberCard: React.FC<{ barber: typeof barbers[0] }> = ({ barber }) => {
  return (
    <article style={cardStyle}>
      <div style={imageWrapperStyle}>
        <img
          src={barber.image}
          alt={barber.name}
          style={imageStyle}
          loading="lazy"
        />
      </div>
      <div style={contentStyle}>
        <h3 style={nameStyle}>{barber.name}</h3>
        <p style={specialtyStyle}>{barber.speciality}</p>
        <p style={descStyle}>{barber.description}</p>
        <Link
          to={`/booking?service=2&barber=${barber.id}`}
          style={bookLinkStyle}
        >
          BOOK WITH {barber.name.split(" ")[0].toUpperCase()}
          <span style={{ marginLeft: "8px" }}>→</span>
        </Link>
      </div>
    </article>
  )
}

const mainStyle: React.CSSProperties = {
  background: "#F5F2EC",
}

const containerStyle: React.CSSProperties = {
  maxWidth: "1320px",
  margin: "0 auto",
  padding: "0 40px",
}

const heroStyle: React.CSSProperties = {
  padding: "160px 0 80px",
  borderBottom: "1px solid rgba(23, 23, 23, 0.06)",
}

const headerStyle: React.CSSProperties = {
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

const storyStyle: React.CSSProperties = {
  padding: "100px 0",
  borderBottom: "1px solid rgba(23, 23, 23, 0.06)",
}

const storyGridStyle: React.CSSProperties = {
  display: "grid",
  gap: "80px",
  alignItems: "center",
}

const storyTextStyle: React.CSSProperties = {
  maxWidth: "560px",
}

const storyTitleStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "clamp(32px, 4vw, 44px)",
  fontWeight: 700,
  lineHeight: 1.2,
  color: "#171717",
  margin: "0 0 24px",
  letterSpacing: "-0.01em",
}

const storyDescStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "17px",
  lineHeight: 1.8,
  color: "#77736D",
  margin: "0 0 20px",
  fontWeight: 400,
}

const storyImageStyle: React.CSSProperties = {
  borderRadius: 4,
  overflow: "hidden",
  aspectRatio: "1/1",
}

const storyImgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
}

const philosophyStyle: React.CSSProperties = {
  padding: "100px 0",
  borderBottom: "1px solid rgba(23, 23, 23, 0.06)",
}

const philosophyGridStyle: React.CSSProperties = {
  display: "grid",
  gap: "80px",
  alignItems: "center",
}

const philosophyImageStyle: React.CSSProperties = {
  borderRadius: 4,
  overflow: "hidden",
  aspectRatio: "3/4",
}

const philosophyImgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
}

const philosophyTextStyle: React.CSSProperties = {
  maxWidth: "520px",
}

const philosophyTitleStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "clamp(32px, 4vw, 44px)",
  fontWeight: 700,
  lineHeight: 1.2,
  color: "#171717",
  margin: "16px 0 24px",
  letterSpacing: "-0.01em",
}

const philosophyDescStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "17px",
  lineHeight: 1.8,
  color: "#77736D",
  margin: "0 0 20px",
  fontWeight: 400,
}

const teamStyle: React.CSSProperties = {
  padding: "100px 0",
  borderBottom: "1px solid rgba(23, 23, 23, 0.06)",
}

const teamGridStyle: React.CSSProperties = {
  display: "grid",
  gap: "32px",
  marginTop: "56px",
  marginBottom: "56px",
}

const cardStyle: React.CSSProperties = {
  background: "#FFFFFF",
  borderRadius: 4,
  overflow: "hidden",
  border: "1px solid rgba(23, 23, 23, 0.06)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
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
  color: "#171717",
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
  paddingTop: "16px",
  borderTop: "1px solid rgba(23, 23, 23, 0.08)",
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

const viewAllStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "24px",
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

const ctaStyle: React.CSSProperties = {
  padding: "100px 0",
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

export default About