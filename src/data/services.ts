export type Service = {
  id: string
  name: string
  description: string
  duration: string
  price: string
  image: string
}

export const services: Service[] = [
  {
    id: "1",
    name: "Classic Haircut",
    description: "A precise, traditional men's haircut with modern styling techniques.",
    duration: "45 min",
    price: "$35",
    image: "/images/professional-barber-giving-a-taper-fade-haircut-in-modern-barbershop.webp",
  },
  {
    id: "2",
    name: "Skin Fade",
    description: "A clean, seamless fade from skin to desired length for a sharp look.",
    duration: "50 min",
    price: "$45",
    image: "/images/professional-barber-giving-a-taper-fade-haircut-in-modern-barbershop.webp",
  },
  {
    id: "3",
    name: "Beard Trim",
    description: "Expert beard shaping and trimming for a well-groomed appearance.",
    duration: "30 min",
    price: "$25",
    image: "/images/straight-edge-barber-folding-shaving-razors-surgicalmart.webp",
  },
  {
    id: "4",
    name: "Haircut + Beard",
    description: "The complete grooming experience - haircut and beard trim combined.",
    duration: "75 min",
    price: "$55",
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=600&fit=crop",
  },
  {
    id: "5",
    name: "The Gentleman Package",
    description: "Premium experience including haircut, beard trim, hot towel treatment, and scalp massage.",
    duration: "90 min",
    price: "$85",
    image: "/images/Barbershop_Interior_Design_21_1024x1024.webp",
  },
  {
    id: "6",
    name: "Kids Cut",
    description: "Gentle, patient haircut for young gentlemen (ages 4-12).",
    duration: "30 min",
    price: "$20",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
  },
]