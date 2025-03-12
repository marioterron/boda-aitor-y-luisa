import type { RsvpFormValues } from "@/hooks/use-rsvp-form";

import { AttendanceField } from "./fields/attendance-field";
import { FormField } from "./fields/form-field";
import { GuestsField } from "./fields/guests-field";
import { TextAreaField } from "./fields/text-area-field";

interface RsvpFormFieldsProps {
  readonly formData: RsvpFormValues;
  readonly handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  readonly handleEmailBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  readonly handleAttendanceChange: (value: string) => void;
  readonly errors: Partial<Record<keyof RsvpFormValues, string>>;
  readonly isChecking: boolean;
  readonly existingRsvp: RsvpFormValues | null;
}

export function RsvpFormFields({
  formData,
  handleInputChange,
  handleEmailBlur,
  handleAttendanceChange,
  errors,
  isChecking,
  existingRsvp,
}: RsvpFormFieldsProps) {
  const isAttending = formData.attendance === "attending";

  return (
    <>
      <FormField
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        error={errors.fullName}
        placeholder="Enter your full name"
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        onBlur={handleEmailBlur}
        error={errors.email}
        placeholder="Enter your email"
        isLoading={isChecking}
        hint={
          existingRsvp
            ? "We found your previous RSVP. You can update it."
            : undefined
        }
      />

      <AttendanceField
        value={formData.attendance}
        onChange={handleAttendanceChange}
        error={errors.attendance}
      />

      {isAttending && (
        <>
          <GuestsField
            value={formData.guests}
            onChange={handleInputChange}
            error={errors.guests}
          />
          <TextAreaField
            label="Dietary Requirements"
            name="dietaryRequirements"
            value={formData.dietaryRequirements ?? ""}
            onChange={handleInputChange}
            error={errors.dietaryRequirements}
            placeholder="Please let us know of any dietary requirements"
          />
        </>
      )}

      <TextAreaField
        label={
          isAttending
            ? "Message (Optional)"
            : "Would you like to send a message?"
        }
        name="message"
        value={formData.message ?? ""}
        onChange={handleInputChange}
        error={errors.message}
        placeholder={
          isAttending
            ? "Leave a message for the couple"
            : "We'll miss you! Feel free to leave a message for the couple"
        }
      />
    </>
  );
}
