import type { RsvpApiData } from "@/lib/types/rsvp";

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendRsvpConfirmation(
  rsvpData: RsvpApiData
): Promise<EmailResponse> {
  try {
    const response = await fetch("/api/rsvp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rsvpData),
    });

    const data: EmailResponse = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Failed to send email");
    }

    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
