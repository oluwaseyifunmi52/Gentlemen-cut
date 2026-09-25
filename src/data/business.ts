export type Business = {
  name: string
  tagline: string
  address: string
  phone: string
  email: string
  openingHours: string
  socialLinks: SocialLink[]
}

export type SocialLink = {
  name: string
  url: string
}

export const business: Business = {
  name: "The Gentleman's Cut",
  tagline: "Sharp Cuts. Timeless Style.",
  address: "123 Main Road, Sea Point, Cape Town, 8005",
  phone: "+27 21 434 5678",
  email: "info@thegentlemanscut.co.za",
  openingHours: "Monday - Friday: 09:00 - 19:00\nSaturday: 09:00 - 17:00\nSunday: Closed",
  socialLinks: [
    { name: "instagram", url: "https://instagram.com/thegentlemanscut" },
    { name: "facebook", url: "https://facebook.com/thegentlemanscut" },
  ],
}

export const openingHours: string = "Monday - Friday: 09:00 - 19:00\nSaturday: 09:00 - 17:00\nSunday: Closed"