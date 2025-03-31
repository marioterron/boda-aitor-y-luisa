import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "next-intl";

interface AttendanceFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function AttendanceField({
  value,
  onChange,
  error,
}: AttendanceFieldProps) {
  const t = useTranslations("rsvp.form.attendance");

  return (
    <div>
      <label htmlFor="attendance" className="mb-2 block text-white">
        {t("label")}
      </label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="mt-1 flex flex-col space-y-2"
      >
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="attending" id="attending" />
          <label htmlFor="attending" className="font-normal text-white">
            {t("options.attending")}
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="not-attending" id="not-attending" />
          <label htmlFor="not-attending" className="font-normal text-white">
            {t("options.notAttending")}
          </label>
        </div>
      </RadioGroup>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
