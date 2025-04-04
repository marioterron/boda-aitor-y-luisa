import { z } from "zod";
import type { RsvpFormData } from "@/lib/types/rsvp";
import messages from "@/messages/es.json";

const validationMessages = messages.validation.rsvp;

export const rsvpSchema = z
  .object({
    fullName: z.string().min(2, validationMessages.errors.nameLength),
    email: z.string().email(validationMessages.errors.invalidEmail),
    attendance: z.enum(["attending", "not-attending"], {
      required_error: validationMessages.errors.attendanceRequired,
    }),
    guests: z.number().min(0).max(5, validationMessages.errors.maxGuests),
    guestNames: z.array(z.string()).optional(),
    dietaryRequirements: z.string().optional(),
    message: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.attendance === "attending" && data.guests > 0) {
        return (
          data.guestNames?.length === data.guests &&
          data.guestNames.every((name) => name.length >= 2)
        );
      }
      return true;
    },
    {
      message: validationMessages.errors.guestNamesRequired,
      path: ["guestNames"],
    }
  );

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
  guestNames: [],
  dietaryRequirements: "",
  message: "",
};
