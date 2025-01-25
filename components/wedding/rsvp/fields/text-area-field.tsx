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
    <div>
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-white text-gray-900 border-gray-200 focus:border-gray-400 min-h-[100px]"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
