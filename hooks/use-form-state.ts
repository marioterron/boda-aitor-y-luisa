import { useState } from "react";

interface FormState<T> {
  formData: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isDirty: boolean;
}

interface FormStateActions<T> {
  setFormData: (data: T | ((prev: T) => T)) => void;
  setErrors: (errors: Partial<Record<keyof T, string>>) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
}

/**
 * A generic hook for managing form state
 * @param initialValues - The initial values for the form
 * @returns Form state and actions to update it
 */
export function useFormState<T extends Record<string, any>>(
  initialValues: T
): FormState<T> & FormStateActions<T> {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleSetFormData = (data: T | ((prev: T) => T)) => {
    setFormData(data);
    setIsDirty(true);
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
    setIsSubmitting(false);
    setIsDirty(false);
  };

  return {
    // State
    formData,
    errors,
    isSubmitting,
    isDirty,

    // Actions
    setFormData: handleSetFormData,
    setErrors,
    setIsSubmitting,
    resetForm,
  };
}
