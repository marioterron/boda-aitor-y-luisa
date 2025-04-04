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
  toast: ToastFunction,
  t: (key: string) => string
): NotificationService {
  return {
    showEmailExistsNotification: () => {
      toast({
        title: t("exists.title"),
        description: t("exists.description"),
        variant: "default",
      });
    },

    showEmailCheckError: () => {
      toast({
        title: t("error.emailCheck.title"),
        description: t("error.emailCheck.description"),
        variant: "destructive",
      });
    },

    showRsvpSuccess: (isUpdate: boolean, isAttending: boolean) => {
      toast({
        title: isUpdate ? t("update.title") : t("success.title"),
        description: isAttending
          ? t("success.description")
          : t("decline.description"),
        variant: "default",
      });
    },

    showRsvpError: () => {
      toast({
        title: t("error.submission.title"),
        description: t("error.submission.description"),
        variant: "destructive",
      });
    },
  };
}
