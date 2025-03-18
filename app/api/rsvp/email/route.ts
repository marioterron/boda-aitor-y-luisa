import { Resend } from "resend";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import RsvpEmailTemplate from "@/components/emails/rsvp-template";
import type { RsvpApiData } from "@/lib/types/rsvp";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT_DURATION = 3600000; // 1 hour in milliseconds
const MAX_EMAILS_PER_HOUR = 5;
const emailLog = new Map<string, { count: number; timestamp: number }>();

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const log = emailLog.get(email);

  if (!log) {
    emailLog.set(email, { count: 1, timestamp: now });
    return false;
  }

  if (now - log.timestamp > RATE_LIMIT_DURATION) {
    emailLog.set(email, { count: 1, timestamp: now });
    return false;
  }

  if (log.count >= MAX_EMAILS_PER_HOUR) {
    return true;
  }

  log.count += 1;
  return false;
}

export async function POST(request: Request) {
  try {
    const rsvpData: RsvpApiData = await request.json();
    const { full_name, email, attendance, guests, dietary_requirements } =
      rsvpData;

    if (isRateLimited(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please try again later.",
        },
        { status: 429 }
      );
    }

    const subject =
      attendance === "attending"
        ? "Thank you for accepting our wedding invitation!"
        : "Thank you for your RSVP";

    const data = await resend.emails.send({
      from:
        process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL || "onboarding@resend.dev",
      replyTo: "aitorluisa@gmail.com",
      to: email,
      subject,
      react: RsvpEmailTemplate({
        name: full_name,
        isAttending: attendance === "attending",
        guestCount: guests,
        dietaryRequirements: dietary_requirements,
      }),
    });

    if (data.error) {
      throw new Error(data.error.message);
    }

    return NextResponse.json({
      success: true,
      messageId: data.data?.id,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 500 }
    );
  }
}
