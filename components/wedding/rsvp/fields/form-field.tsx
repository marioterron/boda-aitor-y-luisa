import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FormFieldProps {
  readonly label: string;
  readonly name: string;
  readonly value: string | number;
  readonly onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  readonly onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  readonly error?: string;
  readonly type?: string;
  readonly placeholder?: string;
  readonly isLoading?: boolean;
  readonly hint?: string;
}

export function FormField({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  placeholder,
  isLoading,
  hint,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      <div className="relative">
        <Input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className="bg-white text-gray-900 border-gray-200 focus:border-gray-400"
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {hint && <p className="text-blue-300 text-sm mt-1">{hint}</p>}
    </div>
  );
}
