import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Rsvp from "@/components/wedding/rsvp";
import { useToast } from "@/hooks/use-toast";
import { checkEmailExists, createRsvp, updateRsvp } from "@/lib/services/rsvp";
import type { RsvpFormData } from "@/lib/types/rsvp";
import messages from "@/messages/es.json";

jest.mock("@/lib/services/rsvp", () => ({
  checkEmailExists: jest.fn(),
  createRsvp: jest.fn(),
  updateRsvp: jest.fn(),
}));

// Mock the toast hook
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(),
}));

// Mock the notification service
jest.mock("@/lib/utils/notifications", () => ({
  createNotificationService: jest.fn().mockImplementation((toast) => ({
    showEmailExistsNotification: () => {
      toast({
        title: messages.notifications.rsvp.exists.title,
        description: messages.notifications.rsvp.exists.description,
        variant: "default",
      });
    },
    showEmailCheckError: () => {
      toast({
        title: messages.notifications.rsvp.error.title,
        description: messages.notifications.rsvp.error.emailCheck.description,
        variant: "destructive",
      });
    },
    showRsvpSuccess: (isUpdate: boolean, isAttending: boolean) => {
      toast({
        title: isUpdate
          ? messages.notifications.rsvp.update.title
          : messages.notifications.rsvp.success.title,
        description: isAttending
          ? messages.notifications.rsvp.success.description
          : messages.notifications.rsvp.decline.description,
        variant: "default",
      });
    },
    showRsvpError: () => {
      toast({
        title: messages.notifications.rsvp.error.title,
        description: messages.notifications.rsvp.error.submission.description,
        variant: "destructive",
      });
    },
  })),
}));

describe("RSVP Form Integration", () => {
  const mockToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockImplementation(() => ({
      toast: mockToast,
      toasts: [],
      dismiss: jest.fn(),
    }));
  });

  describe("New RSVP Submission", () => {
    beforeEach(() => {
      (checkEmailExists as jest.Mock).mockResolvedValue(false);
      (createRsvp as jest.Mock).mockResolvedValue({ success: true });
    });

    it("successfully submits a new RSVP for attending guest", async () => {
      render(<Rsvp />);

      // Fill out the form
      await userEvent.type(
        screen.getByLabelText(messages.rsvp.form.fullName.label),
        "John Doe"
      );
      const emailInput = screen.getByLabelText(messages.rsvp.form.email.label);
      await userEvent.type(emailInput, "john@example.com");
      await userEvent.tab(); // Trigger blur event to validate email

      // Wait for email check
      await waitFor(() => {
        expect(checkEmailExists).toHaveBeenCalledWith("john@example.com");
      });

      // Select attendance
      await userEvent.click(
        screen.getByLabelText(messages.rsvp.form.attendance.options.attending)
      );

      // Additional fields appear
      const guestsInput = screen.getByLabelText(
        messages.rsvp.form.guests.label
      );
      const dietaryInput = screen.getByLabelText(
        messages.rsvp.form.dietary.label
      );

      await userEvent.type(guestsInput, "2");
      await userEvent.type(dietaryInput, "No nuts please");
      await userEvent.type(
        screen.getByLabelText(messages.rsvp.form.message.attending.label),
        "Looking forward to it!"
      );

      // Submit form
      await userEvent.click(
        screen.getByRole("button", { name: messages.rsvp.form.submit.new })
      );

      // Verify API calls
      expect(createRsvp).toHaveBeenCalledWith({
        full_name: "John Doe",
        email: "john@example.com",
        attendance: "attending",
        guests: 2,
        dietary_requirements: "No nuts please",
        message: "Looking forward to it!",
        created_at: expect.any(String),
      });

      // Verify success notification
      expect(mockToast).toHaveBeenCalledWith({
        title: messages.notifications.rsvp.success.title,
        description: messages.notifications.rsvp.success.description,
        variant: "default",
      });
    });

    it("successfully submits a new RSVP for non-attending guest", async () => {
      render(<Rsvp />);

      // Fill out the form
      await userEvent.type(
        screen.getByLabelText(messages.rsvp.form.fullName.label),
        "Jane Doe"
      );
      const emailInput = screen.getByLabelText(messages.rsvp.form.email.label);
      await userEvent.type(emailInput, "jane@example.com");
      await userEvent.tab(); // Trigger blur event

      // Wait for email check
      await waitFor(() => {
        expect(checkEmailExists).toHaveBeenCalledWith("jane@example.com");
      });

      // Select attendance
      await userEvent.click(
        screen.getByLabelText(
          messages.rsvp.form.attendance.options.notAttending
        )
      );

      // Submit form with message
      await userEvent.type(
        screen.getByLabelText(messages.rsvp.form.message.notAttending.label),
        "Sorry I can't make it"
      );
      await userEvent.click(
        screen.getByRole("button", { name: messages.rsvp.form.submit.new })
      );

      // Verify API calls
      expect(createRsvp).toHaveBeenCalledWith({
        full_name: "Jane Doe",
        email: "jane@example.com",
        attendance: "not-attending",
        guests: 0,
        dietary_requirements: "",
        message: "Sorry I can't make it",
        created_at: expect.any(String),
      });

      // Verify success notification
      expect(mockToast).toHaveBeenCalledWith({
        title: messages.notifications.rsvp.decline.title,
        description: messages.notifications.rsvp.decline.description,
        variant: "default",
      });
    });

    it("handles validation errors appropriately", async () => {
      render(<Rsvp />);

      // Submit without filling form
      await userEvent.click(
        screen.getByRole("button", { name: messages.rsvp.form.submit.new })
      );

      // Check validation errors
      expect(
        screen.getByText(messages.validation.rsvp.errors.nameLength)
      ).toBeInTheDocument();
      expect(
        screen.getByText(messages.validation.rsvp.errors.invalidEmail)
      ).toBeInTheDocument();

      // API should not be called
      expect(createRsvp).not.toHaveBeenCalled();
    });
  });

  describe("RSVP Update", () => {
    beforeEach(() => {
      (checkEmailExists as jest.Mock).mockResolvedValue(true);
      (updateRsvp as jest.Mock).mockResolvedValue({ success: true });
    });

    it("successfully updates an existing RSVP", async () => {
      render(<Rsvp />);

      // Fill out the form
      await userEvent.type(
        screen.getByLabelText(messages.rsvp.form.fullName.label),
        "John Doe"
      );
      const emailInput = screen.getByLabelText(messages.rsvp.form.email.label);
      await userEvent.type(emailInput, "john@example.com");
      await userEvent.tab(); // Trigger blur event

      // Wait for email check and notification
      await waitFor(() => {
        expect(checkEmailExists).toHaveBeenCalledWith("john@example.com");
        expect(mockToast).toHaveBeenCalledWith({
          title: messages.notifications.rsvp.exists.title,
          description: messages.notifications.rsvp.exists.description,
          variant: "default",
        });
      });

      // Update attendance
      await userEvent.click(
        screen.getByLabelText(
          messages.rsvp.form.attendance.options.notAttending
        )
      );
      await userEvent.type(
        screen.getByLabelText(messages.rsvp.form.message.notAttending.label),
        "Plans changed, sorry!"
      );

      // Submit update
      await userEvent.click(
        screen.getByRole("button", { name: messages.rsvp.form.submit.update })
      );

      const attendance = "not-attending";
      expect(updateRsvp).toHaveBeenCalledWith("john@example.com", {
        full_name: "John Doe",
        email: "john@example.com",
        attendance: attendance,
        guests: 0,
        dietary_requirements: "",
        message: "Plans changed, sorry!",
        created_at: expect.any(String),
      });

      // Verify success notification
      expect(mockToast).toHaveBeenLastCalledWith({
        title: messages.notifications.rsvp.update.title,
        description:
          attendance === "not-attending"
            ? messages.notifications.rsvp.decline.description
            : messages.notifications.rsvp.success.description,
        variant: "default",
      });
    });
  });

  describe("Error Handling", () => {
    it("handles API errors gracefully", async () => {
      const user = userEvent.setup();
      (checkEmailExists as jest.Mock).mockRejectedValue(new Error("API Error"));

      render(<Rsvp />);

      // Fill out email and trigger check
      const emailInput = screen.getByLabelText(messages.rsvp.form.email.label);
      await user.type(emailInput, "error@example.com");
      await user.tab(); // Trigger blur event

      // Wait for error notification
      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith({
          title: messages.notifications.rsvp.error.title,
          description: messages.notifications.rsvp.error.emailCheck.description,
          variant: "destructive",
        });
      });
    });

    it("handles submission errors gracefully", async () => {
      const user = userEvent.setup();
      (checkEmailExists as jest.Mock).mockResolvedValue(false);
      (createRsvp as jest.Mock).mockRejectedValue(
        new Error("Submission Error")
      );

      render(<Rsvp />);

      // Fill out form
      await user.type(
        screen.getByLabelText(messages.rsvp.form.fullName.label),
        "John Doe"
      );
      const emailInput = screen.getByLabelText(messages.rsvp.form.email.label);
      await user.type(emailInput, "john@example.com");
      await user.tab(); // Trigger blur event

      await user.click(
        screen.getByLabelText(messages.rsvp.form.attendance.options.attending)
      );
      await user.click(
        screen.getByRole("button", { name: messages.rsvp.form.submit.new })
      );

      // Verify error notification
      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith({
          title: messages.notifications.rsvp.error.title,
          description: messages.notifications.rsvp.error.submission.description,
          variant: "destructive",
        });
      });
    });
  });
});
