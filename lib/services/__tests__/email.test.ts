import { sendRsvpConfirmation } from "@/lib/services/email";

// Mock fetch
global.fetch = jest.fn();

describe("Email Service", () => {
  const mockRsvpData = {
    full_name: "John Doe",
    email: "john@example.com",
    attendance: "attending" as const,
    guests: 2,
    dietary_requirements: "No nuts",
    message: "Looking forward to it!",
    created_at: new Date().toISOString(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully send email confirmation", async () => {
    const mockResponse = { success: true, messageId: "mock-id" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await sendRsvpConfirmation(mockRsvpData);

    expect(global.fetch).toHaveBeenCalledWith("/api/rsvp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockRsvpData),
    });
    expect(result).toEqual(mockResponse);
  });

  it("should handle API error response", async () => {
    const mockError = { success: false, error: "API Error" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve(mockError),
    });

    const result = await sendRsvpConfirmation(mockRsvpData);

    expect(result).toEqual({
      success: false,
      error: "API Error",
    });
  });

  it("should handle network errors", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    const result = await sendRsvpConfirmation(mockRsvpData);

    expect(result).toEqual({
      success: false,
      error: "Network error",
    });
  });

  it("should handle rate limit response", async () => {
    const mockError = {
      success: false,
      error: "Rate limit exceeded. Please try again later.",
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: () => Promise.resolve(mockError),
    });

    const result = await sendRsvpConfirmation(mockRsvpData);

    expect(result).toEqual(mockError);
  });
});
