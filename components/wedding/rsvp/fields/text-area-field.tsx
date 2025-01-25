import { Textarea } from "@/components/ui/textarea";

interface TextAreaFieldProps {
  readonly label: string;
  readonly name: string;
  readonly value: string;
  readonly onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readonly error?: string;
  readonly placeholder?: string;
}

export function TextAreaField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
}: TextAreaFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
