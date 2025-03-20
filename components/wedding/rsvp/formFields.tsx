import { useTranslations } from "next-intl";
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
  readonly emailExists: boolean;
}

export function RsvpFormFields({
  formData,
  handleInputChange,
  handleEmailBlur,
  handleAttendanceChange,
  errors,
  isChecking,
  emailExists,
}: RsvpFormFieldsProps) {
  const t = useTranslations("rsvp.form");
  const isAttending = formData.attendance === "attending";

  return (
    <>
      <FormField
        label={t("fullName.label")}
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        error={errors.fullName}
        placeholder={t("fullName.placeholder")}
      />

      <FormField
        label={t("email.label")}
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        onBlur={handleEmailBlur}
        error={errors.email}
        placeholder={t("email.placeholder")}
        isLoading={isChecking}
        hint={emailExists ? t("email.exists") : undefined}
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
            label={t("dietary.label")}
            name="dietaryRequirements"
            value={formData.dietaryRequirements ?? ""}
            onChange={handleInputChange}
            error={errors.dietaryRequirements}
            placeholder={t("dietary.placeholder")}
          />
        </>
      )}

      <TextAreaField
        label={
          isAttending
            ? t("message.attending.label")
            : t("message.notAttending.label")
        }
        name="message"
        value={formData.message ?? ""}
        onChange={handleInputChange}
        error={errors.message}
        placeholder={
          isAttending
            ? t("message.attending.placeholder")
            : t("message.notAttending.placeholder")
        }
      />
    </>
  );
}
