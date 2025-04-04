import { screen } from "@testing-library/react";
import { render } from "@/lib/utils/test-utils";
import userEvent from "@testing-library/user-event";
import Rsvp from "@/components/wedding/rsvp";
import { useRsvpForm } from "@/hooks/use-rsvp-form";
import messages from "@/messages/es.json";
import "@testing-library/jest-dom";

// Mock the useRsvpForm hook
jest.mock("@/hooks/use-rsvp-form", () => ({
  useRsvpForm: jest.fn(),
}));

describe("RSVP Form", () => {
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());
  const mockHandleEmailBlur = jest.fn();
  const mockSetFormData = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup default mock implementation
    (useRsvpForm as jest.Mock).mockImplementation(() => ({
      formData: {
        fullName: "",
        email: "",
        attendance: "",
        guests: 0,
        dietaryRequirements: "",
        message: "",
      },
      setFormData: mockSetFormData,
      errors: {},
      isSubmitting: false,
      isChecking: false,
      emailExists: false,
      handleSubmit: mockHandleSubmit,
      handleEmailBlur: mockHandleEmailBlur,
    }));
  });

  it("renders all form fields correctly", () => {
    render(<Rsvp />);

    // Check for required form fields
    expect(
      screen.getByLabelText(messages.rsvp.form.fullName.label)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(messages.rsvp.form.email.label)
    ).toBeInTheDocument();
    expect(
      screen.getByText(messages.rsvp.form.attendance.label)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: messages.rsvp.form.submit.new })
    ).toBeInTheDocument();
  });

  it("shows additional fields when attending is selected", async () => {
    // Mock the form data with attendance set to "attending"
    (useRsvpForm as jest.Mock).mockImplementation(() => ({
      formData: {
        fullName: "",
        email: "",
        attendance: "attending",
        guests: 0,
        dietaryRequirements: "",
        message: "",
      },
      setFormData: mockSetFormData,
      errors: {},
      isSubmitting: false,
      isChecking: false,
      emailExists: false,
      handleSubmit: mockHandleSubmit,
      handleEmailBlur: mockHandleEmailBlur,
    }));

    render(<Rsvp />);

    // Additional fields should be visible since attendance is "attending"
    expect(
      screen.getByLabelText(messages.rsvp.form.guests.label)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(messages.rsvp.form.dietary.label)
    ).toBeInTheDocument();
  });

  it("handles form submission correctly", async () => {
    render(<Rsvp />);

    // Fill out the form
    await userEvent.type(
      screen.getByLabelText(messages.rsvp.form.fullName.label),
      "John Doe"
    );
    await userEvent.type(
      screen.getByLabelText(messages.rsvp.form.email.label),
      "john@example.com"
    );
    await userEvent.click(
      screen.getByRole("radio", {
        name: messages.rsvp.form.attendance.options.attending,
      })
    );

    // Submit the form
    await userEvent.click(
      screen.getByRole("button", { name: messages.rsvp.form.submit.new })
    );

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("shows loading state during submission", () => {
    (useRsvpForm as jest.Mock).mockImplementation(() => ({
      formData: {
        fullName: "John Doe",
        email: "john@example.com",
        attendance: "attending",
        guests: 0,
        dietaryRequirements: "",
        message: "",
      },
      setFormData: mockSetFormData,
      errors: {},
      isSubmitting: true,
      isChecking: false,
      emailExists: false,
      handleSubmit: mockHandleSubmit,
      handleEmailBlur: mockHandleEmailBlur,
    }));

    render(<Rsvp />);

    expect(
      screen.getByText(messages.rsvp.form.submit.submitting)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: messages.rsvp.form.submit.submitting })
    ).toBeDisabled();
  });

  it("shows email exists message when email is already registered", async () => {
    (useRsvpForm as jest.Mock).mockImplementation(() => ({
      formData: {
        fullName: "John Doe",
        email: "john@example.com",
        attendance: "attending",
        guests: 0,
        dietaryRequirements: "",
        message: "",
      },
      setFormData: mockSetFormData,
      errors: {},
      isSubmitting: false,
      isChecking: false,
      emailExists: true,
      handleSubmit: mockHandleSubmit,
      handleEmailBlur: mockHandleEmailBlur,
    }));

    render(<Rsvp />);

    expect(
      screen.getByText(messages.rsvp.form.email.exists)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: messages.rsvp.form.submit.update })
    ).toBeInTheDocument();
  });

  it("displays validation errors", () => {
    (useRsvpForm as jest.Mock).mockImplementation(() => ({
      formData: {
        fullName: "",
        email: "invalid-email",
        attendance: "",
        guests: 0,
        dietaryRequirements: "",
        message: "",
      },
      setFormData: mockSetFormData,
      errors: {
        fullName: "Full name is required",
        email: "Please enter a valid email address",
        attendance: "Please select whether you will attend",
      },
      isSubmitting: false,
      isChecking: false,
      emailExists: false,
      handleSubmit: mockHandleSubmit,
      handleEmailBlur: mockHandleEmailBlur,
    }));

    render(<Rsvp />);

    expect(
      screen.getByText(messages.validation.rsvp.errors.nameLength)
    ).toBeInTheDocument();
    expect(
      screen.getByText(messages.validation.rsvp.errors.invalidEmail)
    ).toBeInTheDocument();
    expect(
      screen.getByText(messages.validation.rsvp.errors.attendanceRequired)
    ).toBeInTheDocument();
  });
});
