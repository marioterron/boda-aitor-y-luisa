import type { RsvpFormData, RsvpApiData } from "@/lib/types/rsvp";

/**
 * Transform form data to API format
 */
export function mapFormToApiData(formData: RsvpFormData): RsvpApiData {
  return {
    full_name: formData.fullName,
    email: formData.email,
    attendance: formData.attendance,
    guests: formData.guests,
    dietary_requirements: formData.dietaryRequirements,
    message: formData.message,
    created_at: new Date().toISOString(),
  };
}

/**
 * Transform API data to form format
 */
export function mapApiToFormData(apiData: RsvpApiData): RsvpFormData {
  return {
    fullName: apiData.full_name,
    email: apiData.email,
    attendance: apiData.attendance,
    guests: apiData.guests,
    dietaryRequirements: apiData.dietary_requirements,
    message: apiData.message,
  };
}
