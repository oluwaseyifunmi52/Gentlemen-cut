import React from "react"

const WhyChooseUs: React.FC = () => {
  const values = [
    {
      number: "01",
      title: "Traditional Craft",
      description: "We honor the time-tested techniques of classic barbering — straight razor shaves, scissor-over-comb precision, and the patience that mastery requires.",
    },
    {
      number: "02",
      title: "Uncompromising Quality",
      description: "Every product on our shelves, every tool in our hands, is chosen for performance. No shortcuts. No mass-market compromises.",
    },
    {
      number: "03",
      title: "Personal Attention",
      description: "Your appointment is yours alone. No double-booking. No rushed finishes. Just focused, unhurried craftsmanship.",
    },
    {
      number: "04",
      title: "Atmosphere Matters",
      description: "The shop is an escape. Dark wood, warm light, good conversation — or comfortable silence. The environment is part of the service.",
    },
  ]

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <header style={headerStyle}>
          <span style={eyebrowStyle}>WHY CHOOSE US</span>
          <h2 style={titleStyle}>The Difference Is in the Details</h2>
        </header>

        <div style={gridStyle} className="whygrid">
          {values.map((value) => (
            <ValueItem key={value.number} value={value} />
          ))}
        </div>
      </div>
    </section>
  )
}

const ValueItem: React.FC<{ value: typeof values[0] }> = ({ value }) => {
  return (
    <article style={itemStyle}>
      <span style={numberStyle}>{value.number}</span>
      <h3 style={itemTitleStyle}>{value.title}</h3>
      <p style={descStyle}>{value.description}</p>
    </article>
  )
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
  marginBottom: "72px",
  maxWidth: "600px",
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
  margin: 0,
  letterSpacing: "-0.01em",
}

const gridStyle: React.CSSProperties = {
  display: "grid",
  gap: "24px",
  marginBottom: "32px",
}

const itemStyle: React.CSSProperties = {
  padding: "0 8px",
}

const numberStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "64px",
  fontWeight: 300,
  color: "rgba(185, 146, 74, 0.15)",
  lineHeight: 1,
  marginBottom: "16px",
  letterSpacing: "-0.02em",
}

const itemTitleStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "22px",
  fontWeight: 600,
  color: "#F5F2EC",
  margin: "0 0 12px",
  lineHeight: 1.3,
  letterSpacing: "-0.01em",
}

const descStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "15px",
  lineHeight: 1.7,
  color: "#77736D",
  margin: 0,
  fontWeight: 400,
}

export default WhyChooseUs