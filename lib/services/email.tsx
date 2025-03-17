import type { RsvpApiData } from "@/lib/types/rsvp";

export async function sendRsvpConfirmation(rsvpData: RsvpApiData) {
  try {
    const response = await fetch("/api/rsvp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rsvpData),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
