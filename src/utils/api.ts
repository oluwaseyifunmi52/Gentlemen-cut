const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '');

if (!API_BASE_URL) {
  throw new Error('VITE_API_URL is not configured. Set VITE_API_URL in your environment (e.g., https://your-backend-domain.com/api)');
}

class ApiError extends Error {
  constructor(public status: number, public code: string, message: string, public fields?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.error?.code || 'UNKNOWN_ERROR',
      data.error?.message || `HTTP ${response.status}: ${response.statusText}`,
      data.error?.fields
    );
  }

  // Handle different backend response structures
  // Expected: { data: [...] } or { success: true, data: [...] } or direct array
  if (data && typeof data === 'object' && 'data' in data) {
    return data.data as T;
  }
  
  // If response is already the array/data we need
  return data as T;
}

export interface Service {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  category: string;
  price: number;
  durationMinutes: number;
  imageUrl?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Barber {
  _id: string;
  name: string;
  role: string;
  specialty: string;
  imageUrl?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BookingCustomer {
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface BookingResponse {
  reference: string;
  service: {
    name: string;
    price: number;
    durationMinutes: number;
  };
  barber: {
    name: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  customer: BookingCustomer;
}

export interface AvailabilityResponse {
  date: string;
  service: {
    name: string;
    slug: string;
    durationMinutes: number;
  } | null;
  barber: string;
  availableSlots: string[];
  allSlots?: string[];
  availableSlots?: Record<string, string[]>;
}

export interface CreateBookingRequest {
  serviceId: string;
  barberId?: string;
  date: string;
  startTime: string;
  customer: BookingCustomer;
}

export const api = {
  health: {
    check: () => request<{ success: true; status: string }>('/health'),
  },

  services: {
    list: () => request<Service[]>('/services'),
    getBySlug: (slug: string) => request<Service>(`/services/${slug}`),
  },

  barbers: {
    list: () => request<Barber[]>('/barbers'),
    getById: (id: string) => request<Barber>(`/barbers/${id}`),
  },

  availability: {
    get: (params: { date: string; serviceId?: string; barberId?: string }) => {
      const searchParams = new URLSearchParams();
      searchParams.set('date', params.date);
      if (params.serviceId) searchParams.set('serviceId', params.serviceId);
      if (params.barberId) searchParams.set('barberId', params.barberId);
      return request<AvailabilityResponse>(`/availability?${searchParams.toString()}`);
    },
  },

  bookings: {
    create: (booking: CreateBookingRequest) => request<BookingResponse>('/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
    }),
    getByReference: (reference: string) => request<BookingResponse>(`/bookings/${reference}`),
    cancel: (reference: string) => request<{ reference: string; status: string; message: string }>(`/bookings/${reference}/cancel`, {
      method: 'PATCH',
    }),
  },
};

export { ApiError };
export default api;