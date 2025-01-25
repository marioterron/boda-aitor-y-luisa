import { Input } from "@/components/ui/input";

interface FormFieldProps {
  readonly label: string;
  readonly name: string;
  readonly value: string | number;
  readonly onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  readonly error?: string;
  readonly type?: string;
  readonly placeholder?: string;
}

export function FormField({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-white block">
        {label}
      </label>
      <Input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p className="text-red-500 text-sm" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
