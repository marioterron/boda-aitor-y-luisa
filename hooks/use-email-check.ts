import { useState } from "react";

interface EmailCheckState {
  isChecking: boolean;
  emailExists: boolean;
}

interface EmailCheckActions {
  setIsChecking: (isChecking: boolean) => void;
  setEmailExists: (exists: boolean) => void;
  reset: () => void;
}

/**
 * Hook for managing email check state
 * @returns Email check state and actions
 */
export function useEmailCheck(): EmailCheckState & EmailCheckActions {
  const [isChecking, setIsChecking] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const reset = () => {
    setIsChecking(false);
    setEmailExists(false);
  };

  return {
    // State
    isChecking,
    emailExists,

    // Actions
    setIsChecking,
    setEmailExists,
    reset,
  };
}
