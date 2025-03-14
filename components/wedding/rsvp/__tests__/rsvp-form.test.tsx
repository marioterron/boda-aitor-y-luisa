import { screen, fireEvent, waitFor } from "@testing-library/react";
import { render } from "@/lib/utils/test-utils";
import userEvent from "@testing-library/user-event";
import Rsvp from "@/components/wedding/rsvp";
import { useRsvpForm } from "@/hooks/use-rsvp-form";
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
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/will you be attending\?/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit rsvp/i })
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
      screen.getByLabelText(/number of additional guests/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/dietary requirements/i)).toBeInTheDocument();
  });

  it("handles form submission correctly", async () => {
    render(<Rsvp />);

    // Fill out the form
    await userEvent.type(screen.getByLabelText(/full name/i), "John Doe");
    await userEvent.type(screen.getByLabelText(/email/i), "john@example.com");
    await userEvent.click(
      screen.getByRole("radio", { name: /joyfully accepts/i })
    );

    // Submit the form
    await userEvent.click(screen.getByRole("button", { name: /submit rsvp/i }));

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

    expect(screen.getByText(/submitting/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submitting/i })).toBeDisabled();
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
      screen.getByText(/this email has already submitted an rsvp/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /update rsvp/i })
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

    expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/please enter a valid email address/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/please select whether you will attend/i)
    ).toBeInTheDocument();
  });
});
