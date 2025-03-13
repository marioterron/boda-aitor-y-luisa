/**
 * Form data structure (client-side)
 */
export interface RsvpFormData {
  fullName: string;
  email: string;
  attendance: "attending" | "not-attending";
  guests: number;
  dietaryRequirements?: string;
  message?: string;
}

/**
 * API data structure (server-side)
 */
export interface RsvpApiData {
  full_name: string;
  email: string;
  attendance: "attending" | "not-attending";
  guests: number;
  dietary_requirements?: string;
  message?: string;
  created_at: string;
}
