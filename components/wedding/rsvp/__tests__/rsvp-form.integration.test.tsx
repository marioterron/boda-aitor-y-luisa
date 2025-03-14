import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Rsvp from "@/components/wedding/rsvp";
import { checkEmailExists, createRsvp, updateRsvp } from "@/lib/services/rsvp";
import { useToast } from "@/hooks/use-toast";

// Mock the services
jest.mock("@/lib/services/rsvp", () => ({
  checkEmailExists: jest.fn(),
  createRsvp: jest.fn(),
  updateRsvp: jest.fn(),
}));

// Mock the toast hook
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(),
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
      const user = userEvent.setup();
      render(<Rsvp />);

      // Fill out the form
      await user.type(screen.getByLabelText(/full name/i), "John Doe");
      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, "john@example.com");
      await user.tab(); // Trigger blur event to validate email

      // Wait for email check
      await waitFor(() => {
        expect(checkEmailExists).toHaveBeenCalledWith("john@example.com");
      });

      // Select attendance
      await user.click(screen.getByLabelText(/joyfully accepts/i));

      // Additional fields appear
      const guestsInput = screen.getByLabelText(/number of additional guests/i);
      const dietaryInput = screen.getByLabelText(/dietary requirements/i);

      await user.type(guestsInput, "2");
      await user.type(dietaryInput, "No nuts please");
      await user.type(
        screen.getByLabelText(/message/i),
        "Looking forward to it!"
      );

      // Submit form
      await user.click(screen.getByRole("button", { name: /submit rsvp/i }));

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
        title: "RSVP Submitted Successfully",
        description:
          "Thank you for accepting our invitation! We look forward to celebrating with you.",
        variant: "default",
      });
    });

    it("successfully submits a new RSVP for non-attending guest", async () => {
      const user = userEvent.setup();
      render(<Rsvp />);

      // Fill out the form
      await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, "jane@example.com");
      await user.tab(); // Trigger blur event

      // Wait for email check
      await waitFor(() => {
        expect(checkEmailExists).toHaveBeenCalledWith("jane@example.com");
      });

      // Select attendance
      await user.click(screen.getByLabelText(/regretfully declines/i));

      // Submit form with message
      await user.type(
        screen.getByLabelText(/message/i),
        "Sorry I can't make it"
      );
      await user.click(screen.getByRole("button", { name: /submit rsvp/i }));

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
        title: "RSVP Submitted Successfully",
        description: "Thank you for letting us know. We'll miss you!",
        variant: "default",
      });
    });

    it("handles validation errors appropriately", async () => {
      const user = userEvent.setup();
      render(<Rsvp />);

      // Submit without filling form
      await user.click(screen.getByRole("button", { name: /submit rsvp/i }));

      // Check validation errors
      expect(
        screen.getByText(/name must be at least 2 characters/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/please enter a valid email address/i)
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
      const user = userEvent.setup();
      render(<Rsvp />);

      // Fill out the form
      await user.type(screen.getByLabelText(/full name/i), "John Doe");
      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, "john@example.com");
      await user.tab(); // Trigger blur event

      // Wait for email check and notification
      await waitFor(() => {
        expect(checkEmailExists).toHaveBeenCalledWith("john@example.com");
        expect(mockToast).toHaveBeenCalledWith({
          title: "Email Already Registered",
          description:
            "This email has already submitted an RSVP. Submitting again will update your previous response.",
          variant: "default",
        });
      });

      // Update attendance
      await user.click(screen.getByLabelText(/regretfully declines/i));
      await user.type(
        screen.getByLabelText(/would you like to send a message/i),
        "Plans changed, sorry!"
      );

      // Submit update
      await user.click(screen.getByRole("button", { name: /update rsvp/i }));

      // Verify API calls
      expect(updateRsvp).toHaveBeenCalledWith("john@example.com", {
        full_name: "John Doe",
        email: "john@example.com",
        attendance: "not-attending",
        guests: 0,
        dietary_requirements: "",
        message: "Plans changed, sorry!",
        created_at: expect.any(String),
      });

      // Verify success notification
      expect(mockToast).toHaveBeenLastCalledWith({
        title: "RSVP Updated Successfully",
        description: "Thank you for letting us know. We'll miss you!",
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
      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, "error@example.com");
      await user.tab(); // Trigger blur event

      // Wait for error notification
      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith({
          title: "Error",
          description: "Failed to check email. Please try again.",
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
      await user.type(screen.getByLabelText(/full name/i), "John Doe");
      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, "john@example.com");
      await user.tab(); // Trigger blur event

      await user.click(screen.getByLabelText(/joyfully accepts/i));
      await user.click(screen.getByRole("button", { name: /submit rsvp/i }));

      // Verify error notification
      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith({
          title: "Submission Failed",
          description:
            "There was a problem submitting your RSVP. Please try again.",
          variant: "destructive",
        });
      });
    });
  });
});
