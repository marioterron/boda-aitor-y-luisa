import { useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { checkEmailExists, createRsvp, updateRsvp } from "@/lib/services/rsvp";
import { createNotificationService } from "@/lib/utils/notifications";
import {
  RsvpFormValues,
  defaultRsvpValues,
  validateRsvpForm,
} from "@/lib/utils/validation";

export function useRsvpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof RsvpFormValues, string>>
  >({});

  const { toast } = useToast();
  const notifications = createNotificationService(toast);

  const [formData, setFormData] = useState<RsvpFormValues>(defaultRsvpValues);

  const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (email && email.includes("@")) {
      setIsChecking(true);
      try {
        const exists = await checkEmailExists(email);
        setEmailExists(exists);

        if (exists) {
          notifications.showEmailExistsNotification();
        }
      } catch (error) {
        console.error("Error checking email:", error);
        notifications.showEmailCheckError();
      } finally {
        setIsChecking(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = validateRsvpForm(formData);
    setErrors(validationResult.errors);
    if (!validationResult.isValid) return;

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

      notifications.showRsvpSuccess(
        emailExists,
        formData.attendance === "attending"
      );

      setFormData(defaultRsvpValues);
      setEmailExists(false);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      notifications.showRsvpError();
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
    defaultValues: defaultRsvpValues,
  };
}
