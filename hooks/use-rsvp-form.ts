import { useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { checkEmailExists, createRsvp, updateRsvp } from "@/lib/services/rsvp";
import { createNotificationService } from "@/lib/utils/notifications";
import { defaultRsvpValues, validateRsvpForm } from "@/lib/utils/validation";
import { mapFormToApiData } from "@/lib/utils/mappers/rsvp";
import type { RsvpFormData } from "@/lib/types/rsvp";

export function useRsvpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof RsvpFormData, string>>
  >({});

  const { toast } = useToast();
  const notifications = createNotificationService(toast);

  const [formData, setFormData] = useState<RsvpFormData>(defaultRsvpValues);

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
      const rsvpData = mapFormToApiData(formData);

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
