// Типы для админ-панели
export interface AdminStats {
  totalGuests: number;
  activeGuests: number;
  pendingApplications: number;
  totalHotels: number;
  activeAssignments: number;
  completedReports: number;
  pendingReports: number;
  averageRating: number;
  totalEarnings: number;
  newUsersThisMonth: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  level: string;
  rating: number;
  totalReports: number;
  activeAssignments: number;
  joinDate: string;
  status: string;
  experience: string;
  specialties: string[];
  lastActivity: string;
  totalEarnings: number;
  completedAssignments: number;
  pendingReports: number;
}

export interface Application {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  experience: string;
  appliedDate: string;
  status: string;
  motivation: string;
  specialties: string[];
  documents: string[];
  priority: string;
}

export interface Report {
  id: number;
  guestId: number;
  guestName: string;
  hotelId: number;
  hotelName: string;
  city: string;
  submittedDate: string;
  rating: number;
  status: string;
  priority: string;
  assignmentId: number;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  photos: string[];
  comments: string;
  detailedRating: {
    cleanliness: number;
    service: number;
    location: number;
    amenities: number;
    value: number;
  };
  recommendations: string;
  issues: string[];
}

export interface Hotel {
  id: number;
  name: string;
  city: string;
  address: string;
  type: string;
  stars: number;
  rating: number;
  price_per_night: number;
  description: string;
  amenities: string[];
  photos: string[];
  contact_phone: string;
  contact_email: string;
  website: string;
  totalReports?: number;
  lastCheck?: string;
  needsCheck?: boolean;
  status?: string;
}

export interface Assignment {
  id: number;
  hotel_id: number;
  hotel_name: string;
  city: string;
  hotel_type: string;
  hotel_rating: number;
  title: string;
  description: string;
  priority: string;
  reward_type: string;
  reward_amount: number;
  reward_points: number;
  reward: string;
  check_in_date: string;
  check_out_date: string;
  deadline_date: string;
  room_type: string;
  amenities: string[];
  special_requirements: string[];
}
