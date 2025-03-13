import { z } from "zod";

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

export type RsvpFormValues = z.infer<typeof rsvpSchema>;

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof RsvpFormValues, string>>;
}

export function validateRsvpForm(formData: RsvpFormValues): ValidationResult {
  try {
    rsvpSchema.parse(formData);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Partial<Record<keyof RsvpFormValues, string>> = {};
      error.errors.forEach((err) => {
        errors[err.path[0] as keyof RsvpFormValues] = err.message;
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: {} };
  }
}

export const defaultRsvpValues: RsvpFormValues = {
  fullName: "",
  email: "",
  attendance: "attending",
  guests: 0,
  dietaryRequirements: "",
  message: "",
};
