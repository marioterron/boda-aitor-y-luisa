import { Textarea } from "@/components/ui/textarea";

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
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
        className="min-h-[100px] border-gray-200 bg-white text-gray-900 focus:border-gray-400"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
