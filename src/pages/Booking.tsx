import React, { useState, useEffect, useCallback } from "react"
import { api, Service, Barber, AvailabilityResponse, CreateBookingRequest, BookingResponse } from "@/utils/api"
import { BookNowButton } from "@/components/common/Button"
import { generateGoogleCalendarUrl, generateICSFile, Booking as CalendarBooking } from "@/utils/calendar"

type BookingStep = "service" | "barber" | "datetime" | "customer" | "confirmation"

const Booking: React.FC = () => {
  const [step, setStep] = useState<BookingStep>("service")
  const [services, setServices] = useState<Service[]>([])
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmation, setConfirmation] = useState<BookingResponse | null>(null)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [customer, setCustomer] = useState<CreateBookingRequest["customer"]>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  const serviceIdFromUrl = new URLSearchParams(window.location.search).get("service")
  const barberIdFromUrl = new URLSearchParams(window.location.search).get("barber")

  const fetchServices = useCallback(async () => {
    try {
      const data = await api.services.list()
      setServices(data.filter((s) => s.active))
    } catch (err: unknown) {
      const apiError = err as { message?: string; status?: number }
      setError(apiError.message || "Failed to load services")
      console.error(err)
    }
  }, [])

  const fetchBarbers = useCallback(async () => {
    try {
      const data = await api.barbers.list()
      setBarbers(data.filter((b) => b.active))
    } catch (err: unknown) {
      const apiError = err as { message?: string; status?: number }
      setError(apiError.message || "Failed to load barbers")
      console.error(err)
    }
  }, [])

  useEffect(() => {
    fetchServices()
    fetchBarbers()
  }, [fetchServices, fetchBarbers])

  useEffect(() => {
    if (serviceIdFromUrl && services.length > 0) {
      const svc = services.find((s) => s._id === serviceIdFromUrl)
      if (svc) setSelectedService(svc)
    }
  }, [serviceIdFromUrl, services])

  useEffect(() => {
    if (barberIdFromUrl && barbers.length > 0) {
      const brb = barbers.find((b) => b._id === barberIdFromUrl)
      if (brb) setSelectedBarber(brb)
    }
  }, [barberIdFromUrl, barbers])

  const fetchAvailability = useCallback(async () => {
    if (!selectedDate || !selectedService) return
    try {
      setLoading(true)
      const data = await api.availability.get({
        date: selectedDate,
        serviceId: selectedService._id,
        barberId: selectedBarber?._id,
      })
      setAvailability(data)
    } catch (err) {
      setError("Failed to load available times")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [selectedDate, selectedService, selectedBarber])

  useEffect(() => {
    if (step === "datetime") {
      fetchAvailability()
    }
  }, [step, fetchAvailability])

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setSelectedBarber(null)
    setStep("barber")
  }

  const handleBarberSelect = (barber: Barber) => {
    setSelectedBarber(barber)
    setSelectedDate("")
    setSelectedTime("")
    setAvailability(null)
    setStep("datetime")
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedTime("")
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCustomerChange = (field: keyof CreateBookingRequest["customer"], value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }))
  }

  const validateCustomer = () => {
    if (!customer.name.trim()) return "Name is required"
    if (!customer.email.trim()) return "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) return "Invalid email format"
    if (!customer.phone.trim()) return "Phone is required"
    return null
  }

  const formatPrice = (price: number) => `₦${(price / 100).toLocaleString()}`

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`
    }
    return `${minutes} min`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validateCustomer()
    if (validationError) {
      setError(validationError)
      return
    }
    if (!selectedService || !selectedDate || !selectedTime) {
      setError("Please complete all steps")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const bookingData: CreateBookingRequest = {
        serviceId: selectedService._id,
        barberId: selectedBarber?._id,
        date: selectedDate,
        startTime: selectedTime,
        customer,
      }
      const response = await api.bookings.create(bookingData)
      setConfirmation(response)
      setShowConfirmationModal(true)
    } catch (err: unknown) {
      const apiError = err as { code?: string; message?: string }
      setError(apiError.message || "Booking failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleNewBooking = () => {
    setSelectedService(null)
    setSelectedBarber(null)
    setSelectedDate("")
    setSelectedTime("")
    setAvailability(null)
    setCustomer({ name: "", email: "", phone: "", notes: "" })
    setConfirmation(null)
    setShowConfirmationModal(false)
    setStep("service")
  }

  const downloadICS = () => {
    if (!confirmation) return
    const calendarBooking: CalendarBooking = {
      id: confirmation.reference,
      service: confirmation.service.name,
      barber: confirmation.barber.name,
      date: confirmation.date,
      startTime: confirmation.startTime,
      endTime: confirmation.endTime,
      customerName: confirmation.customer.name,
      customerEmail: confirmation.customer.email,
      location: "The Gentleman's Cut, 123 Metro Avenue, Suite 101",
    }
    const icsContent = generateICSFile(calendarBooking)
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `appointment-${confirmation.reference}.ics`
    link.click()
  }

  const getGoogleCalendarUrl = () => {
    if (!confirmation) return "#"
    const calendarBooking: CalendarBooking = {
      id: confirmation.reference,
      service: confirmation.service.name,
      barber: confirmation.barber.name,
      date: confirmation.date,
      startTime: confirmation.startTime,
      endTime: confirmation.endTime,
      customerName: confirmation.customer.name,
      customerEmail: confirmation.customer.email,
      location: "The Gentleman's Cut, 123 Metro Avenue, Suite 101",
    }
    return generateGoogleCalendarUrl(calendarBooking)
  }

  const getTimeSlots = () => {
    if (!availability) return []
    if (availability.availableSlots && typeof availability.availableSlots === "object" && !Array.isArray(availability.availableSlots)) {
      return availability.availableSlots[selectedBarber?._id || ""] || []
    }
    return availability.availableSlots || []
  }

  const isTimeAvailable = (time: string) => getTimeSlots().includes(time)

  const progressSteps = [
    { key: "service", label: "Service" },
    { key: "barber", label: "Barber" },
    { key: "datetime", label: "Date & Time" },
    { key: "customer", label: "Details" },
  ]

  const currentStepIndex = progressSteps.findIndex((s) => s.key === step)

  return (
    <main style={mainStyle}>
      <header style={headerStyle}>
        <div style={containerStyle}>
          <div style={progressStyle}>
            {progressSteps.map((s, i) => (
              <div key={s.key} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div
                  style={{
                    ...progressCircleStyle,
                    background: i < currentStepIndex ? "#B9924A" : i === currentStepIndex ? "#B9924A" : "#E8E0D1",
                    color: i <= currentStepIndex ? "#171717" : "#77736D",
                  }}
                >
                  {i + 1}
                </div>
                <span style={{ ...progressLabelStyle, color: i <= currentStepIndex ? "#171717" : "#77736D" }}>
                  {s.label}
                </span>
                {i < progressSteps.length - 1 && (
                  <div style={{ ...progressLineStyle, background: i < currentStepIndex ? "#B9924A" : "#E8E0D1" }} />
                )}
              </div>
            ))}
          </div>

          <h1 style={titleStyle}>Book Your Appointment</h1>
          <p style={subtitleStyle}>
            Select your service, barber, preferred time, and provide your details.
          </p>
        </div>
      </header>

      <section style={contentStyle}>
        <div style={containerStyle}>
          {error && <div style={errorStyle}>{error}</div>}

          {step === "service" && (
            <div style={gridStyle}>
              {services.map((service) => (
                <button
                  key={service._id}
                  onClick={() => handleServiceSelect(service)}
                  disabled={loading}
                  style={{
                    ...cardStyle,
                    border: selectedService?._id === service._id ? "2px solid #B9924A" : "1px solid rgba(23,23,23,0.06)",
                    background: selectedService?._id === service._id ? "rgba(185,146,74,0.05)" : "#FFFFFF",
                  }}
                >
                  <h3 style={cardTitleStyle}>{service.name}</h3>
                  <p style={cardDescStyle}>{service.description}</p>
                  <div style={cardMetaStyle}>
                    <span>{formatDuration(service.durationMinutes)}</span>
                    <span>{formatPrice(service.price)}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === "barber" && (
            <>
              <p style={subStepStyle}>Selected: {selectedService?.name}</p>
              <div style={gridStyle}>
                {barbers.map((barber) => (
                  <button
                    key={barber._id}
                    onClick={() => handleBarberSelect(barber)}
                    disabled={loading}
                    style={{
                      ...barberCardStyle,
                      border: selectedBarber?._id === barber._id ? "2px solid #B9924A" : "1px solid rgba(23,23,23,0.06)",
                      background: selectedBarber?._id === barber._id ? "rgba(185,146,74,0.05)" : "#FFFFFF",
                    }}
                  >
                    <div style={barberImageStyle}>
                      <img src={barber.imageUrl || "/images/professional-barber-giving-a-taper-fade-haircut-in-modern-barbershop.webp"} alt={barber.name} style={barberImageStyle} loading="lazy" />
                    </div>
                    <h3 style={barberNameStyle}>{barber.name}</h3>
                    <p style={barberSpecialtyStyle}>{barber.specialty}</p>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === "datetime" && (
            <>
              <p style={subStepStyle}>
                {selectedService?.name} {selectedBarber ? `with ${selectedBarber.name}` : ""}
              </p>
              <div style={datePickerStyle}>
                <label style={labelStyle}>Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateSelect(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  max={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                  disabled={loading}
                  style={inputStyle}
                />
              </div>
              {selectedDate && (
                <div style={timeSlotsStyle}>
                  <label style={labelStyle}>
                    Available Times {loading && <span style={{ color: "#B9924A", marginLeft: "8px" }}>Loading...</span>}
                  </label>
                  <div style={timeGridStyle}>
                    {getTimeSlots().length === 0 ? (
                      <p style={noSlotsStyle}>No available slots for this date. Please choose another date.</p>
                    ) : (
                      getTimeSlots().map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          disabled={loading || selectedTime === time}
                          style={{
                            ...timeButtonStyle,
                            background: selectedTime === time ? "#B9924A" : "#FFFFFF",
                            color: selectedTime === time ? "#171717" : "#171717",
                            border: selectedTime === time ? "2px solid #B9924A" : "1px solid #E8E0D1",
                          }}
                        >
                          {time}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {step === "customer" && (
            <form onSubmit={handleSubmit} style={formStyle}>
              <p style={subStepStyle}>
                {selectedService?.name} on {selectedDate} at {selectedTime} {selectedBarber ? `with ${selectedBarber.name}` : ""}
              </p>
              <div style={formGridStyle} className="booking-form-grid">
                <div style={formFieldStyle}>
                  <label style={labelStyle} htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    value={customer.name}
                    onChange={(e) => handleCustomerChange("name", e.target.value)}
                    required
                    style={inputStyle}
                  />
                </div>
                <div style={formFieldStyle}>
                  <label style={labelStyle} htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    value={customer.email}
                    onChange={(e) => handleCustomerChange("email", e.target.value)}
                    required
                    style={inputStyle}
                  />
                </div>
                <div style={formFieldStyle}>
                  <label style={labelStyle} htmlFor="phone">Phone *</label>
                  <input
                    id="phone"
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => handleCustomerChange("phone", e.target.value)}
                    required
                    style={inputStyle}
                  />
                </div>
                <div style={formFieldStyle}>
                  <label style={labelStyle} htmlFor="notes">Notes (optional)</label>
                  <textarea
                    id="notes"
                    value={customer.notes}
                    onChange={(e) => handleCustomerChange("notes", e.target.value)}
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
              </div>
              <div style={summaryStyle}>
                <h3 style={summaryTitleStyle}>Booking Summary</h3>
                <div style={summaryRowStyle}>
                  <span>Service:</span>
                  <span>{selectedService?.name}</span>
                </div>
                <div style={summaryRowStyle}>
                  <span>Barber:</span>
                  <span>{selectedBarber?.name || "Any available"}</span>
                </div>
                <div style={summaryRowStyle}>
                  <span>Date & Time:</span>
                  <span>{selectedDate} at {selectedTime}</span>
                </div>
                <div style={summaryRowStyle}>
                  <span>Duration:</span>
                  <span>{selectedService ? formatDuration(selectedService.durationMinutes) : "-"}</span>
                </div>
                <div style={summaryRowStyle}>
                  <span>Price:</span>
                  <span>{selectedService ? formatPrice(selectedService.price) : "-"}</span>
                </div>
              </div>
              <div style={submitStyle}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    ...submitButtonStyle,
                    background: loading ? "#E8E0D1" : "#B9924A",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Booking..." : "Confirm Appointment"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {showConfirmationModal && confirmation && (
        <div style={modalOverlayStyle} onClick={() => setShowConfirmationModal(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowConfirmationModal(false)} style={modalCloseStyle}>✕</button>
            <div style={modalIconStyle}>✓</div>
            <h2 style={modalTitleStyle}>Appointment Confirmed!</h2>
            <p style={modalRefStyle}>Reference: <strong>{confirmation.reference}</strong></p>

            <div style={modalDetailsStyle}>
              <div style={modalDetailRowStyle}>
                <span>Service:</span>
                <span>{confirmation.service.name}</span>
              </div>
              <div style={modalDetailRowStyle}>
                <span>Barber:</span>
                <span>{confirmation.barber.name}</span>
              </div>
              <div style={modalDetailRowStyle}>
                <span>Date:</span>
                <span>{confirmation.date}</span>
              </div>
              <div style={modalDetailRowStyle}>
                <span>Time:</span>
                <span>{confirmation.startTime} – {confirmation.endTime}</span>
              </div>
              <div style={modalDetailRowStyle}>
                <span>Price:</span>
                <span>₦{(confirmation.service.price / 100).toLocaleString()}</span>
              </div>
            </div>

            <p style={modalNoteStyle}>Add to your calendar:</p>
            <div style={modalCalendarButtonsStyle}>
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                style={modalCalendarButtonStyle}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
                </svg>
                Google Calendar
              </a>
              <button
                onClick={downloadICS}
                style={{ ...modalCalendarButtonStyle, background: "#171717", border: "1px solid #E8E0D1" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
                Apple Calendar (.ics)
              </button>
            </div>

            <button onClick={handleNewBooking} style={modalNewBookingStyle}>
              Book Another Appointment
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

const mainStyle: React.CSSProperties = {
  background: "#F5F2EC",
  minHeight: "100vh",
  paddingTop: "80px",
}

const containerStyle: React.CSSProperties = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "0 24px",
}

const headerStyle: React.CSSProperties = {
  padding: "60px 0 40px",
  borderBottom: "1px solid rgba(23, 23, 23, 0.06)",
}

const progressStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  marginBottom: "32px",
  flexWrap: "wrap",
}

const progressCircleStyle: React.CSSProperties = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  fontWeight: 700,
  flexShrink: 0,
  transition: "all 0.3s ease",
}

const progressLabelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  marginLeft: "8px",
  whiteSpace: "nowrap",
}

const progressLineStyle: React.CSSProperties = {
  flex: 1,
  height: "2px",
  maxWidth: "80px",
  marginLeft: "8px",
  transition: "all 0.3s ease",
}

const titleStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "clamp(32px, 4vw, 44px)",
  fontWeight: 700,
  lineHeight: 1.2,
  color: "#171717",
  margin: "0 0 12px",
  textAlign: "center",
  letterSpacing: "-0.01em",
}

const subtitleStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "17px",
  lineHeight: 1.6,
  color: "#77736D",
  margin: "0 0 40px",
  textAlign: "center",
  fontWeight: 400,
}

const contentStyle: React.CSSProperties = {
  padding: "40px 0 80px",
}

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "24px",
  marginTop: "24px",
}

const cardStyle: React.CSSProperties = {
  padding: "28px 24px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
  minHeight: "200px",
}

const cardTitleStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "22px",
  fontWeight: 700,
  color: "#171717",
  margin: "0 0 12px",
}

const cardDescStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "15px",
  lineHeight: 1.6,
  color: "#77736D",
  margin: "0 0 20px",
  flex: 1,
}

const cardMetaStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontFamily: "Inter, sans-serif",
  fontSize: "13px",
  color: "#77736D",
  fontWeight: 500,
}

const subStepStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "15px",
  color: "#77736D",
  marginBottom: "24px",
  textAlign: "center",
}

const barberCardStyle: React.CSSProperties = {
  padding: "24px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  textAlign: "center",
  minHeight: "320px",
  display: "flex",
  flexDirection: "column",
}

const barberImageStyle: React.CSSProperties = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  objectFit: "cover",
  margin: "0 auto 16px",
  border: "3px solid #F5F2EC",
}

const barberNameStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "20px",
  fontWeight: 700,
  color: "#171717",
  margin: "0 0 4px",
}

const barberSpecialtyStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  color: "#B9924A",
  fontWeight: 500,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  margin: "0",
}

const datePickerStyle: React.CSSProperties = {
  marginBottom: "32px",
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "Inter, sans-serif",
  fontSize: "13px",
  fontWeight: 600,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  color: "#B9924A",
  marginBottom: "8px",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  fontFamily: "Inter, sans-serif",
  fontSize: "15px",
  color: "#171717",
  background: "#FFFFFF",
  border: "1px solid #E8E0D1",
  borderRadius: "4px",
  outline: "none",
  transition: "border 0.2s ease, box-shadow 0.2s ease",
  boxSizing: "border-box",
}

const timeSlotsStyle: React.CSSProperties = {
  marginTop: "24px",
}

const timeGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
  gap: "12px",
  marginTop: "12px",
}

const timeButtonStyle: React.CSSProperties = {
  padding: "14px 16px",
  fontFamily: "Inter, sans-serif",
  fontSize: "15px",
  fontWeight: 500,
  color: "#171717",
  background: "#FFFFFF",
  border: "1px solid #E8E0D1",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "all 0.2s ease",
}

const noSlotsStyle: React.CSSProperties = {
  padding: "32px",
  textAlign: "center",
  fontFamily: "Inter, sans-serif",
  fontSize: "15px",
  color: "#77736D",
}

const formStyle: React.CSSProperties = {
  maxWidth: "720px",
  margin: "0 auto",
}

const formGridStyle: React.CSSProperties = {
  display: "grid",
  gap: "24px",
  marginBottom: "32px",
}

const formFieldStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
}

const summaryStyle: React.CSSProperties = {
  background: "#171717",
  borderRadius: "8px",
  padding: "28px 24px",
  marginBottom: "32px",
  color: "#F5F2EC",
}

const summaryTitleStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "22px",
  fontWeight: 700,
  margin: "0 0 20px",
  color: "#F5F2EC",
}

const summaryRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  borderBottom: "1px solid rgba(245,242,236,0.1)",
  fontFamily: "Inter, sans-serif",
  fontSize: "15px",
}

const submitStyle: React.CSSProperties = {
  marginTop: "24px",
}

const submitButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px 32px",
  fontFamily: "Inter, sans-serif",
  fontSize: "15px",
  fontWeight: 600,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  color: "#171717",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background 0.2s ease",
}

const errorStyle: React.CSSProperties = {
  background: "#FDEDEC",
  border: "1px solid #F5C6CB",
  color: "#C0392B",
  padding: "14px 16px",
  borderRadius: "4px",
  marginBottom: "24px",
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
}

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(23, 23, 23, 0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000,
  padding: "24px",
}

const modalStyle: React.CSSProperties = {
  background: "#FFFFFF",
  borderRadius: "12px",
  padding: "40px 32px",
  maxWidth: "440px",
  width: "100%",
  maxHeight: "90vh",
  overflowY: "auto",
  boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  position: "relative",
}

const modalCloseStyle: React.CSSProperties = {
  position: "absolute",
  top: "16px",
  right: "16px",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  background: "rgba(23,23,23,0.05)",
  border: "none",
  color: "#77736D",
  fontSize: "20px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.2s ease, color 0.2s ease",
}

const modalIconStyle: React.CSSProperties = {
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  background: "rgba(185, 146, 74, 0.15)",
  color: "#B9924A",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "32px",
  fontWeight: 700,
  margin: "0 auto 24px",
}

const modalTitleStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "28px",
  fontWeight: 700,
  color: "#171717",
  margin: "0 0 8px",
  textAlign: "center",
}

const modalRefStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  color: "#77736D",
  textAlign: "center",
  marginBottom: "24px",
}

const modalDetailsStyle: React.CSSProperties = {
  background: "#F5F2EC",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "24px",
}

const modalDetailRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid rgba(23,23,23,0.06)",
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
}

const modalNoteStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: "#77736D",
  margin: "0 0 16px",
  textAlign: "center",
}

const modalCalendarButtonsStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginBottom: "24px",
}

const modalCalendarButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  padding: "14px 24px",
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  fontWeight: 600,
  color: "#171717",
  background: "#B9924A",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  textDecoration: "none",
  textAlign: "center",
  transition: "background 0.2s ease",
}

const modalNewBookingStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 24px",
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  fontWeight: 600,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  color: "#B9924A",
  background: "transparent",
  border: "2px solid #B9924A",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "all 0.2s ease",
}

export default Booking