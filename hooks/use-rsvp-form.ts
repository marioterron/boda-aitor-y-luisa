import { useState } from "react";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";
import { checkEmailExists, createRsvp, updateRsvp } from "@/lib/services/rsvp";

const rsvpSchema = z.object({
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

export function useRsvpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof RsvpFormValues, string>>
  >({});

  const { toast } = useToast();

  const defaultValues: RsvpFormValues = {
    fullName: "",
    email: "",
    attendance: "attending",
    guests: 0,
    dietaryRequirements: "",
    message: "",
  };

  const [formData, setFormData] = useState<RsvpFormValues>(defaultValues);

  const validateForm = () => {
    try {
      rsvpSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof RsvpFormValues, string>> = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0] as keyof RsvpFormValues] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (email && email.includes("@")) {
      setIsChecking(true);
      try {
        const exists = await checkEmailExists(email);
        setEmailExists(exists);

        if (exists) {
          toast({
            title: "Email Already Registered",
            description:
              "This email has already submitted an RSVP. Submitting again will update your previous response.",
            variant: "default",
          });
        }
      } catch (error) {
        console.error("Error checking email:", error);
        toast({
          title: "Error",
          description: "Failed to check email. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsChecking(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const rsvpData = {
        full_name: formData.fullName,
        email: formData.email,
        attendance: formData.attendance,
        guests: formData.guests,
        dietary_requirements: formData.dietaryRequirements,
        message: formData.message,
        created_at: new Date().toISOString(),
      };

      if (emailExists) {
        await updateRsvp(formData.email, rsvpData);
      } else {
        await createRsvp(rsvpData);
      }

      toast({
        title: emailExists
          ? "RSVP Updated Successfully"
          : "RSVP Submitted Successfully",
        description:
          formData.attendance === "attending"
            ? "Thank you for accepting our invitation! We look forward to celebrating with you."
            : "Thank you for letting us know. We'll miss you!",
        variant: "default",
      });

      setFormData(defaultValues);
      setEmailExists(false);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      toast({
        title: "Submission Failed",
        description:
          "There was a problem submitting your RSVP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    isSubmitting,
    isChecking,
    emailExists,
    handleSubmit,
    handleEmailBlur,
    defaultValues,
  };
}
