import { z } from "zod";
import type { RsvpFormData } from "@/lib/types/rsvp";

export const rsvpSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  attendance: z.enum(["attending", "not-attending"], {
    required_error: "Please select your attendance status",
  }),
  guests: z.number().min(0).max(4, "Maximum 4 additional guests allowed"),
  dietaryRequirements: z.string().optional(),
  message: z.string().optional(),
});

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof RsvpFormData, string>>;
}

export function validateRsvpForm(formData: RsvpFormData): ValidationResult {
  try {
    rsvpSchema.parse(formData);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Partial<Record<keyof RsvpFormData, string>> = {};
      error.errors.forEach((err) => {
        errors[err.path[0] as keyof RsvpFormData] = err.message;
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: {} };
  }
}

export const defaultRsvpValues: RsvpFormData = {
  fullName: "",
  email: "",
  attendance: "attending",
  guests: 0,
  dietaryRequirements: "",
  message: "",
};
