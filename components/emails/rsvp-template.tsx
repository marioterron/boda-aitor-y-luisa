import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Link,
  Hr,
} from "@react-email/components";

interface RsvpEmailTemplateProps {
  name: string;
  isAttending: boolean;
  guestCount: number;
  dietaryRequirements?: string;
}

export default function RsvpEmailTemplate({
  name,
  isAttending,
  guestCount,
  dietaryRequirements,
}: RsvpEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {isAttending
          ? "Thank you for accepting our wedding invitation!"
          : "Thank you for your RSVP"}
      </Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <Text style={headerStyle}>Dear {name},</Text>

          {isAttending ? (
            <>
              <Text style={textStyle}>
                Thank you for accepting our wedding invitation! We're delighted
                that you'll be joining us on our special day.
              </Text>
              {guestCount > 0 && (
                <Text style={textStyle}>
                  We've noted that you'll be bringing {guestCount} additional{" "}
                  {guestCount === 1 ? "guest" : "guests"}.
                </Text>
              )}
              {dietaryRequirements && (
                <Text style={textStyle}>
                  We've recorded your dietary requirements:{" "}
                  {dietaryRequirements}
                </Text>
              )}
            </>
          ) : (
            <Text style={textStyle}>
              Thank you for letting us know that you won't be able to join us.
              While we'll miss your presence, we appreciate you taking the time
              to respond.
            </Text>
          )}

          <Hr style={hrStyle} />

          <Text style={footerStyle}>
            Best wishes,
            <br />
            Aitor & Luisa
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const mainStyle = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const containerStyle = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};

const headerStyle = {
  fontSize: "24px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const textStyle = {
  fontSize: "16px",
  lineHeight: "1.4",
  color: "#484848",
};

const hrStyle = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footerStyle = {
  fontSize: "16px",
  lineHeight: "1.4",
  color: "#484848",
  fontStyle: "italic",
};
