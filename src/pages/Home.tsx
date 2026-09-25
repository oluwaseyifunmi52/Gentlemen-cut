import React from "react"
import Hero from "../components/home/Hero"
import FeaturedServices from "../components/home/FeaturedServices"
import WhyChooseUs from "../components/home/WhyChooseUs"
import FeaturedBarbers from "../components/home/FeaturedBarbers"
import GalleryPreview from "../components/home/GalleryPreview"
import CTASection from "../components/home/CTASection"

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedServices />
      <WhyChooseUs />
      <FeaturedBarbers />
      <GalleryPreview />
      <CTASection />
    </div>
  )
}

export default Home