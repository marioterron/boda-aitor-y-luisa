import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "w-full min-h-[100px] px-3 py-2 text-sm rounded-none" +
            " bg-white text-gray-900" +
            " border-b border-gray-200 focus:border-gray-400" +
            " placeholder:text-gray-400" +
            " focus:outline-none focus:ring-0" +
            " disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
