export type Role = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export type ActiveStatus = "ACTIVE" | "BANNED" | "INACTIVE";

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

export type WeekDay =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  role: Role;
  activeStatus: ActiveStatus;
  profilePhoto?: string | null;
  avatar?: string | null;
  createdAt?: string;
  updatedAt?: string;
  technicianProfile?: TechnicianProfile | null;
  
}

export interface TechnicianProfile {
  id: string;
  userId: string;
  bio?: string | null;
  skills: string[];
  experienceYears?: number | null;
  hourlyRate?: number | null;
  location?: string | null;
  isVerified: boolean;
  averageRating?: number | null;
  totalReviews?: number;
  user?: User;
  availability?: AvailabilitySlot[];
  services?: Service[];
}

export interface AvailabilitySlot {
  id?: string;
  dayOfWeek?: WeekDay;  // backend field
  day?: WeekDay;        // old alias
  startTime: string;
  endTime: string;
  isActive?: boolean;
  isAvailable?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  createdAt?: string;
  updatedAt?: string;
  _count?: { services?: number };
}

export interface Service {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  durationMinutes?: number | null;
  imageUrl?: string | null;
  categoryId: string;
  technicianId: string;
  isActive?: boolean;
  category?: Category;
  technician?: TechnicianProfile & { user?: User };
  createdAt?: string;
  updatedAt?: string;
}

export interface Booking {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  status: BookingStatus;
  scheduledAt: string;
  address: string;
  notes?: string | null;
  totalAmount?: number | null;
  customer?: User;
  technician?: TechnicianProfile & { user?: User };
  service?: Service;
  payment?: Payment | null;
  review?: Review | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  status: PaymentStatus;
  stripeSessionId?: string | null;
  stripePaymentIntentId?: string | null;
  booking?: Booking;
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
  rating: number;
  comment?: string | null;
  customer?: User;
  createdAt?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  errorDetails?: { path: string; message: string }[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
}

export interface AdminStats {
  totalUsers?: number;
  totalCustomers?: number;
  totalTechnicians?: number;
  totalBookings?: number;
  totalRevenue?: number;
  pendingBookings?: number;
  completedBookings?: number;
  activeServices?: number;
  [key: string]: number | undefined;
}

export interface CreateBookingPayload {
  serviceId: string;
  scheduledAt: string;
  address: string;
  notes?: string;
}

/** Backend only accepts bookingId; success/cancel URLs are set server-side from APP_URL */
export interface CreatePaymentPayload {
  bookingId: string;
}

export interface ConfirmPaymentPayload {
  sessionId: string;
}

export interface CreateReviewPayload {
  bookingId: string;
  rating: number;
  comment?: string;
}

export interface TechnicianProfileUpdate {
  bio?: string;
  skills?: string[];
  experienceYears?: number;
  hourlyRate?: number;
  location?: string;
}

export interface AvailabilityUpdate {
  slots: { day: WeekDay; startTime: string; endTime: string }[];
}

export interface TechnicianBookingAction {
  action: "accept" | "decline" | "start" | "complete";
}


