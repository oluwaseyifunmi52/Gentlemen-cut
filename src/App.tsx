import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Services from "./pages/Services"
import About from "./pages/About"
import Booking from "./pages/Booking"
import Contact from "./pages/Contact"
import Terms from "./pages/Terms"
import Privacy from "./pages/Privacy"
import Footer from "./components/layout/Footer"
import Header from "./components/layout/Header"
import FirstVisitPopup from "./components/common/FirstVisitPopup"

import "./index.css"

const App: React.FC = () => {
  const [showFirstVisitPopup, setShowFirstVisitPopup] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem("firstVisitDismissed")
    if (!dismissed) {
      const timer = setTimeout(() => {
        setShowFirstVisitPopup(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
      <Footer />
      <FirstVisitPopup isOpen={showFirstVisitPopup} onClose={() => setShowFirstVisitPopup(false)} />
    </Router>
  )
}

export default App