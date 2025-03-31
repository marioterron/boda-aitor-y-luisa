import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FormFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  isLoading?: boolean;
  hint?: string;
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
          className="border-gray-200 bg-white text-gray-900 focus:border-gray-400"
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {hint && <p className="mt-1 text-sm text-blue-300">{hint}</p>}
    </div>
  );
}
