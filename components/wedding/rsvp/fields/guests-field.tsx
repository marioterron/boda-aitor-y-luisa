import { Input } from "@/components/ui/input";

interface GuestsFieldProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
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
        className="border-gray-200 bg-white text-gray-900 focus:border-gray-400"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
