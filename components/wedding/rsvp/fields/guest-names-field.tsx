import { useTranslations } from "next-intl";
import { FormField } from "./form-field";

interface GuestNamesFieldProps {
  guestCount: number;
  guestNames: string[];
  onChange: (guestNames: string[]) => void;
  errors?: Record<number, string>;
}

export function GuestNamesField({
  guestCount,
  guestNames,
  onChange,
  errors = {},
}: GuestNamesFieldProps) {
  const t = useTranslations("rsvp.form");

  const handleGuestNameChange = (index: number, value: string) => {
    const newGuestNames = [...guestNames];
    newGuestNames[index] = value;
    onChange(newGuestNames);
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: guestCount }, (_, index) => (
        <FormField
          key={index}
          label={t("guestNames.guestLabel", { number: index + 1 })}
          name={`guest-${index}`}
          value={guestNames[index] || ""}
          onChange={(e) => handleGuestNameChange(index, e.target.value)}
          error={errors[index]}
          placeholder={t("guestNames.placeholder")}
        />
      ))}
    </div>
  );
}
