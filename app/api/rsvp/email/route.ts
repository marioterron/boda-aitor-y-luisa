import { Resend } from "resend";
import { NextResponse } from "next/server";
import RsvpEmailTemplate from "@/components/emails/rsvp-template";
import type { RsvpApiData } from "@/lib/types/rsvp";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const rsvpData: RsvpApiData = await request.json();
    const { full_name, email, attendance, guests, dietary_requirements } =
      rsvpData;

    const subject =
      attendance === "attending"
        ? "Thank you for accepting our wedding invitation!"
        : "Thank you for your RSVP";

    const data = await resend.emails.send({
      from: "Aitor & Luisa <wedding@yourdomain.com>",
      to: email,
      subject,
      react: RsvpEmailTemplate({
        name: full_name,
        isAttending: attendance === "attending",
        guestCount: guests,
        dietaryRequirements: dietary_requirements,
      }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
