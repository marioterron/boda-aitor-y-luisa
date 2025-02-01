import { Input } from "@/components/ui/input";

interface GuestsFieldProps {
  readonly value: number;
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly error?: string;
}

export function GuestsField({ value, onChange, error }: GuestsFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="guests" className="text-white block">
        Number of Additional Guests
      </label>
      <Input
        type="number"
        id="guests"
        name="guests"
        value={value}
        onChange={onChange}
        min={0}
        max={4}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
