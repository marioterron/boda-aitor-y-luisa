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
    <div>
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      <Input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-white text-gray-900 border-gray-200 focus:border-gray-400"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
