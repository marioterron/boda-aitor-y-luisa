"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ className, children, isOpen, onClose, title, ...props }, ref) => {
    if (!isOpen) return null;

    return (
      <div ref={ref} className="fixed inset-0 z-50" {...props}>
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4">
          <div
            className={cn(
              "relative bg-white p-6 shadow-lg rounded-lg w-full mx-4 max-h-[90vh] overflow-y-auto",
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
            {children}
          </div>
        </div>
      </div>
    );
  }
);
Modal.displayName = "Modal";

export { Modal };
