export interface Rsvp {
  id: string;
  full_name: string;
  email: string;
  attendance: "attending" | "not-attending";
  guests: number;
  message?: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  totalGuests: number;
  attending: number;
  notAttending: number;
  totalResponses: number;
  attendanceRate: number;
  declineRate: number;
  companionRatio: number;
  rsvps: Rsvp[];
}
