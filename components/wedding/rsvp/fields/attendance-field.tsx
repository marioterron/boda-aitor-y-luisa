import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AttendanceFieldProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly error?: string;
}

export function AttendanceField({
  value,
  onChange,
  error,
}: AttendanceFieldProps) {
  return (
    <div>
      <label htmlFor="attendance" className="text-white mb-2 block">
        Will you be attending?
      </label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex flex-col space-y-2 mt-1"
      >
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="attending" id="attending" />
          <label htmlFor="attending" className="font-normal text-white">
            Joyfully Accepts
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="not-attending" id="not-attending" />
          <label htmlFor="not-attending" className="font-normal text-white">
            Regretfully Declines
          </label>
        </div>
      </RadioGroup>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
