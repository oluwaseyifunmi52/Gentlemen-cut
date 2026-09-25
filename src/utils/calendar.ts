export type Booking = {
  id: string
  service: string
  barber: string
  date: string
  startTime: string
  endTime: string
  customerName: string
  customerEmail: string
  location: string
}

export const generateGoogleCalendarUrl = (booking: Booking): string => {
  const title = `${booking.service} with ${booking.barber}`
  const description = `Appointment at The Gentleman's Cut\nService: ${booking.service}\nBarber: ${booking.barber}\nDate: ${booking.date}\nTime: ${booking.startTime} - ${booking.endTime}`

  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)
  const encodedLocation = encodeURIComponent(booking.location)

  const baseUrl =
    "https://www.google.com/calendar/render?action=TEMPLATE&text=" +
    encodedTitle +
    "&dates="

  const startDate = new Date(booking.date + " " + booking.startTime)
  const endDate = new Date(booking.date + " " + booking.endTime)

  const startUtc = startDate.toISOString().replace("T", "").replace("Z", "")
  const endUtc = endDate.toISOString().replace("T", "").replace("Z", "")

  const url = baseUrl + startUtc + "/" + endUtc + "&details=" + encodedDescription + "&location=" + encodedLocation

  return url
}

export const generateICSFile = (booking: Booking): string => {
  const startDateTime = new Date(booking.date + " " + booking.startTime)
  const endDateTime = new Date(booking.date + " " + booking.endTime)

  const formatDate = (date: Date): string =>
    date.toISOString().replace("-", "").replace("-", "").replace(":", "").replace(":", "").replace(".", "")

  const start = formatDate(startDateTime)
  const end = formatDate(endDateTime)

  const summary = encodeURIComponent(booking.service + " with " + booking.barber)
  const description = encodeURIComponent(
    "Appointment at The Gentleman's Cut\nService: " + booking.service + "\nBarber: " + booking.barber + "\nDate: " + booking.date + "\nTime: " + booking.startTime + " - " + booking.endTime
  )
  const location = encodeURIComponent(booking.location)

  return (
    "BEGIN:VCALENDAR\n" +
    "VERSION:2.0\n" +
    "PRODID:-//The Gentleman's Cut//EN\n" +
    "BEGIN:VEVENT\n" +
    "UID:" +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    "\n" +
    "DTSTAMP:" +
    new Date().toISOString().replace("T", "").replace("Z", "") +
    "\n" +
    "DTSTART:" +
    start +
    "\n" +
    "DTEND:" +
    end +
    "\n" +
    "SUMMARY:" +
    summary +
    "\n" +
    "DESCRIPTION:" +
    description +
    "\n" +
    "LOCATION:" +
    location +
    "\n" +
    "END:VEVENT\n" +
    "END:VCALENDAR"
  )
}