type ToastFunction = {
  (props: {
    title: string;
    description: string;
    variant?: "default" | "destructive";
  }): void;
};

interface NotificationService {
  showEmailExistsNotification: () => void;
  showEmailCheckError: () => void;
  showRsvpSuccess: (isUpdate: boolean, isAttending: boolean) => void;
  showRsvpError: () => void;
}

export function createNotificationService(
  toast: ToastFunction
): NotificationService {
  return {
    showEmailExistsNotification: () => {
      toast({
        title: "Email Already Registered",
        description:
          "This email has already submitted an RSVP. Submitting again will update your previous response.",
        variant: "default",
      });
    },

    showEmailCheckError: () => {
      toast({
        title: "Error",
        description: "Failed to check email. Please try again.",
        variant: "destructive",
      });
    },

    showRsvpSuccess: (isUpdate: boolean, isAttending: boolean) => {
      toast({
        title: isUpdate
          ? "RSVP Updated Successfully"
          : "RSVP Submitted Successfully",
        description: isAttending
          ? "Thank you for accepting our invitation! We look forward to celebrating with you."
          : "Thank you for letting us know. We'll miss you!",
        variant: "default",
      });
    },

    showRsvpError: () => {
      toast({
        title: "Submission Failed",
        description:
          "There was a problem submitting your RSVP. Please try again.",
        variant: "destructive",
      });
    },
  };
}
