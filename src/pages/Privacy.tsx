import React from "react"

const Privacy: React.FC = () => {
  return (
    <main style={{
      padding: "60px 40px",
      background: "#F5F2EC",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "36px",
          fontWeight: 700,
          color: "#171717",
          textAlign: "center",
          marginBottom: "32px",
        }}>
          Privacy Policy
        </h2>

        <div style={{ lineHeight: "1.8", color: "#4A4A4A" }}>
          <p style={{ marginBottom: "24px" }}>
            Last updated: September 2026
          </p>

          <h3 style={{ color: "#171717", marginTop: "24px", fontSize: "18px" }}>
            Information We Collect
          </h3>
          <p>When you book an appointment or contact us through this website, we may collect the following information:</p>
          <ul style={{ marginBottom: "16px" }}>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Appointment details (service, date, time, barber)</li>
            <li>Booking preferences</li>
          </ul>

          <h3 style={{ color: "#171717", marginTop: "16px", fontSize: "18px" }}>
            How We Use Your Information
          </h3>
          <p>We use the information we collect for the following purposes:</p>
          <ul style={{ marginBottom: "16px" }}>
            <li>To process and confirm appointments</li>
            <li>To contact you regarding your appointment</li>
            <li>To improve our services and customer experience</li>
            <li>To send promotional offers and updates (if you opt-in)</li>
            <li>To fulfill our contractual obligations</li>
          </ul>

          <h3 style={{ color: "#171717", marginTop: "16px", fontSize: "18px" }}>
            Data Retention
          </h3>
          <p>We retain booking information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data by contacting us.</p>

          <h3 style={{ color: "#171717", marginTop: "16px", fontSize: "18px" }}>
            Cookies and Tracking
          </h3>
          <p>Our website may use cookies and similar tracking technologies to enhance your experience. You can disable cookies in your browser settings, though this may affect some website functionality.</p>

          <h3 style={{ color: "#171717", marginTop: "16px", fontSize: "18px" }}>
            Third-Party Links
          </h3>
          <p>Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of such sites. This privacy policy applies solely to information collected by this website.</p>

          <h3 style={{ color: "#171717", marginTop: "16px", fontSize: "18px" }}>
            User Rights
          </h3>
          <p>You have the right to:</p>
          <ul style={{ marginBottom: "16px" }}>
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
          </ul>

          <h3 style={{ color: "#171717", marginTop: "16px", fontSize: "18px" }}>
            Contact
          </h3>
          <p>If you have questions about this privacy policy, please contact us at info@thegentlemanscut.com.</p>
        </div>
      </div>
    </main>
  )
}

export default Privacy