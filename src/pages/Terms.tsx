import React from "react"

const Terms: React.FC = () => {
  return (
    <main style={{ padding: "60px 40px", background: "#F5F2EC" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <h2 style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(32px, 5vw, 48px)",
          fontWeight: 700,
          color: "#171717",
          textAlign: "center",
          marginBottom: "32px",
        }}>
          Terms & Conditions
        </h2>

        <div style={{ lineHeight: "1.8", color: "#4A4A4A", maxWidth: "800px", margin: "0 auto" }}>
          <h3 style={{ color: "#171717", marginTop: "24px", fontSize: "clamp(20px, 3vw, 24px)" }}>
            Agreement to Terms
          </h3>
          <p style={{ fontSize: "clamp(16px, 1.5vw, 18px)" }}>
            By using this website and booking an appointment with The Gentleman's Cut, you agree to the following terms and conditions:
          </p>

          <h4 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", color: "#171717", marginTop: "32px" }}>
            Appointments
          </h4>
          <p>All appointments are subject to availability. We require at least 24 hours notice for cancellations or rescheduling.</p>

          <h4 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", color: "#171717", marginTop: "32px" }}>
            Cancellations
          </h4>
          <p>Cancellations made with less than 24 hours notice may be subject to a fee of 50% of the service cost. No-shows will be charged the full amount.</p>

          <h4 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", color: "#171717", marginTop: "32px" }}>
            Late Arrivals
          </h4>
          <p>Clients arriving more than 15 minutes late for their appointment may have their service rescheduled or shortened at the barber's discretion.</p>

          <h4 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", color: "#171717", marginTop: "32px" }}>
            Payment
          </h4>
          <p>Payment is due at the time of service. We accept cash, credit/debit cards, and mobile payment options.</p>

          <h4 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", color: "#171717", marginTop: "32px" }}>
            Services
          </h4>
          <p>Services and pricing are subject to change without notice. Please check our website or contact us for the most current information.</p>

          <h4 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", color: "#171717", marginTop: "32px" }}>
            Customer Responsibilities
          </h4>
          <p>Clients are responsible for providing accurate information when booking, including contact details and any relevant health information that may affect the service.</p>

          <h4 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", color: "#171717", marginTop: "32px" }}>
            Changes to Appointments
          </h4>
          <p>We strive to accommodate changes, but modifications are subject to availability and our 24-hour cancellation policy.</p>

          <h4 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", color: "#171717", marginTop: "32px" }}>
            Liability
          </h4>
          <p>The Gentleman's Cut is not responsible for personal items left on premises. While we take every precaution, we cannot be held responsible for allergic reactions to products.</p>

          <h4 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", color: "#171717", marginTop: "32px" }}>
            Contact Information
          </h4>
          <p>For any questions regarding these terms, please contact us at info@thegentlemanscut.com.</p>

          <h4 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", color: "#171717", marginTop: "32px" }}>
            Terms Updates
          </h4>
          <p>We reserve the right to update these terms at any time. Changes will be posted on this page and your continued use of the website constitutes acceptance of the modified terms.</p>
        </div>
      </div>
    </main>
  )
}

export default Terms