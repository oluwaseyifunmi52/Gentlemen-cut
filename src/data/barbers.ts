export type Barber = {
  id: string
  name: string
  speciality: string
  description: string
  image: string
  rating: number
  reviews: number
}

export const barbers: Barber[] = [
  {
    id: "1",
    name: "Marcus Johnson",
    speciality: "Senior Barber",
    description: "Over 10 years of experience in classic men's grooming and traditional barbering techniques. Specialist in fades and straight razor shaves.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    rating: 4.9,
    reviews: 142,
  },
  {
    id: "2",
    name: "Daniel Cole",
    speciality: "Fade Specialist",
    description: "Master of all fade techniques from skin to low fade. Known for precision and attention to detail. The go-to barber for modern precision cuts.",
    image: "/OIP%20(1).webp",
    rating: 4.8,
    reviews: 98,
  },
  {
    id: "3",
    name: "James Carter",
    speciality: "Grooming Specialist",
    description: "Expert in beard care, hot towel treatments, and grooming consultations. Provides a relaxing, luxurious experience for every client.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop",
    rating: 4.7,
    reviews: 76,
  },
]