const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const services = [
  {
    _id: "1",
    name: "Classic Haircut",
    slug: "classic-haircut",
    description: "A precise, traditional men's haircut with modern styling techniques.",
    category: "Haircut",
    price: 3500,
    durationMinutes: 45,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    name: "Skin Fade",
    slug: "skin-fade",
    description: "A clean, seamless fade from skin to desired length for a sharp look.",
    category: "Haircut",
    price: 4500,
    durationMinutes: 50,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    name: "Beard Trim",
    slug: "beard-trim",
    description: "Expert beard shaping and trimming for a well-groomed appearance.",
    category: "Beard",
    price: 2500,
    durationMinutes: 30,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "4",
    name: "Haircut + Beard",
    slug: "haircut-beard",
    description: "The complete grooming experience - haircut and beard trim combined.",
    category: "Package",
    price: 5500,
    durationMinutes: 75,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "5",
    name: "The Gentleman Package",
    slug: "gentleman-package",
    description: "Premium experience including haircut, beard trim, hot towel treatment, and scalp massage.",
    category: "Package",
    price: 8500,
    durationMinutes: 90,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "6",
    name: "Kids Cut",
    slug: "kids-cut",
    description: "Gentle, patient haircut for young gentlemen (ages 4-12).",
    category: "Haircut",
    price: 2000,
    durationMinutes: 30,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const barbers = [
  {
    _id: "1",
    name: "Marcus Johnson",
    role: "Senior Barber",
    specialty: "Classic Cuts & Fades",
    imageUrl: "/images/professional-barber-giving-a-taper-fade-haircut-in-modern-barbershop.webp",
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    name: "Daniel Cole",
    role: "Fade Specialist",
    specialty: "Modern Fades & Precision Cuts",
    imageUrl: "/OIP%20(1).webp",
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    name: "James Carter",
    role: "Grooming Specialist",
    specialty: "Beard Care & Hot Towel Treatments",
    imageUrl: "/images/straight-edge-barber-folding-shaving-razors-surgicalmart.webp",
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const bookings = [];

function generateTimeSlots(dateStr, serviceDuration, barberId) {
  const date = new Date(dateStr);
  const dayOfWeek = date.getDay();
  
  if (dayOfWeek === 0) return [];
  
  const slots = [];
  const startHour = 9;
  const endHour = 18;
  const interval = 30;
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const slotDate = new Date(date);
      slotDate.setHours(hour, minute, 0, 0);
      const endSlot = new Date(slotDate.getTime() + serviceDuration * 60000);
      
      if (endSlot.getHours() > endHour || (endSlot.getHours() === endHour && endSlot.getMinutes() > 0)) {
        continue;
      }
      
      const isBooked = bookings.some(b => 
        b.date === dateStr && 
        b.barberId === barberId &&
        b.startTime === timeStr
      );
      
      if (!isBooked) {
        slots.push(timeStr);
      }
    }
  }
  
  return slots;
}

app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok' });
});

app.get('/api/services', (req, res) => {
  res.json({ data: services });
});

app.get('/api/services/:slug', (req, res) => {
  const service = services.find(s => s.slug === req.params.slug);
  if (!service) {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Service not found' } });
  }
  res.json({ data: service });
});

app.get('/api/barbers', (req, res) => {
  res.json({ data: barbers });
});

app.get('/api/barbers/:id', (req, res) => {
  const barber = barbers.find(b => b._id === req.params.id);
  if (!barber) {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Barber not found' } });
  }
  res.json({ data: barber });
});

app.get('/api/availability', (req, res) => {
  const { date, serviceId, barberId } = req.query;
  
  if (!date) {
    return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Date is required' } });
  }
  
  const service = services.find(s => s._id === serviceId);
  if (!service) {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Service not found' } });
  }
  
  const targetBarberId = barberId || barbers[0]._id;
  const availableSlots = generateTimeSlots(date, service.durationMinutes, targetBarberId);
  
  const response = {
    date,
    service: {
      name: service.name,
      slug: service.slug,
      durationMinutes: service.durationMinutes,
    },
    barber: targetBarberId,
    availableSlots,
  };
  
  res.json({ data: response });
});

app.post('/api/bookings', (req, res) => {
  const { serviceId, barberId, date, startTime, customer } = req.body;
  
  if (!serviceId || !date || !startTime || !customer) {
    return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Missing required fields' } });
  }
  
  if (!customer.name || !customer.email || !customer.phone) {
    return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Name, email, and phone are required' } });
  }
  
  const service = services.find(s => s._id === serviceId);
  if (!service) {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Service not found' } });
  }
  
  const targetBarberId = barberId || barbers[0]._id;
  const barber = barbers.find(b => b._id === targetBarberId);
  if (!barber) {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Barber not found' } });
  }
  
  const isBooked = bookings.some(b => 
    b.date === date && 
    b.barberId === targetBarberId &&
    b.startTime === startTime
  );
  
  if (isBooked) {
    return res.status(409).json({ 
      error: { 
        code: 'CONFLICT', 
        message: 'This appointment time is no longer available. Please select another time.' 
      } 
    });
  }
  
  const start = new Date(`${date}T${startTime}`);
  const end = new Date(start.getTime() + service.durationMinutes * 60000);
  const endTime = `${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`;
  
  const reference = `GC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  
  const booking = {
    reference,
    serviceId,
    barberId: targetBarberId,
    date,
    startTime,
    endTime,
    customer,
    createdAt: new Date().toISOString(),
  };
  
  bookings.push(booking);
  
  const response = {
    reference,
    service: {
      name: service.name,
      price: service.price,
      durationMinutes: service.durationMinutes,
    },
    barber: {
      name: barber.name,
    },
    date,
    startTime,
    endTime,
    timezone: 'Africa/Johannesburg',
    customer,
  };
  
  res.status(201).json({ data: response });
});

app.get('/api/bookings/:reference', (req, res) => {
  const booking = bookings.find(b => b.reference === req.params.reference);
  if (!booking) {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Booking not found' } });
  }
  
  const service = services.find(s => s._id === booking.serviceId);
  const barber = barbers.find(b => b._id === booking.barberId);
  
  const response = {
    reference: booking.reference,
    service: {
      name: service?.name || '',
      price: service?.price || 0,
      durationMinutes: service?.durationMinutes || 0,
    },
    barber: {
      name: barber?.name || '',
    },
    date: booking.date,
    startTime: booking.startTime,
    endTime: booking.endTime,
    timezone: 'Africa/Johannesburg',
    customer: booking.customer,
  };
  
  res.json({ data: response });
});

app.patch('/api/bookings/:reference/cancel', (req, res) => {
  const index = bookings.findIndex(b => b.reference === req.params.reference);
  if (index === -1) {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Booking not found' } });
  }
  
  const booking = bookings[index];
  bookings.splice(index, 1);
  
  res.json({ 
    data: { 
      reference: booking.reference, 
      status: 'cancelled', 
      message: 'Booking cancelled successfully' 
    } 
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});