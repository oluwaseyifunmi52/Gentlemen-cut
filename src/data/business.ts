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
  address: "123 Metro Avenue, Suite 101",
  phone: "(555) 123-4567",
  email: "info@thegentlemanscut.com",
  openingHours: "Monday - Friday: 9am - 7pm\nSaturday: 9am - 5pm\nSunday: Closed",
  socialLinks: [
    { name: "instagram", url: "https://instagram.com/thegentlemanscut" },
    { name: "facebook", url: "https://facebook.com/thegentlemanscut" },
  ],
}

export const openingHours: string = "Monday - Friday: 9am - 7pm\nSaturday: 9am - 5pm\nSunday: Closed"