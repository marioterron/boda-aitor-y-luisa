import { Input } from "@/components/ui/input";

interface GuestsFieldProps {
  readonly value: number;
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly error?: string;
}

export function GuestsField({ value, onChange, error }: GuestsFieldProps) {
  return (
    <div>
      <label htmlFor="guests" className="text-white">
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
        className="bg-white text-gray-900 border-gray-200 focus:border-gray-400"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
