import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
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
          ? "Gracias por aceptar nuestra invitación a la boda!"
          : "Gracias por contestar a nuestra invitación"}
      </Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <Text style={headerStyle}>Hola {name},</Text>

          {isAttending ? (
            <>
              <Text style={textStyle}>
                Gracias por aceptar nuestra invitación a la boda! Estamos muy
                emocionados de que puedas estar con nosotros en este día tan
                especial.
              </Text>
              {guestCount > 0 && (
                <Text style={textStyle}>
                  Hemos apuntado que vas a traer {guestCount}{" "}
                  {guestCount === 1 ? "invitado" : "invitados"} adicionales.
                </Text>
              )}
              {dietaryRequirements && (
                <Text style={textStyle}>
                  Hemos anotado tus preferencias alimentarias:{" "}
                  {dietaryRequirements}
                </Text>
              )}
            </>
          ) : (
            <Text style={textStyle}>
              Gracias por avisarnos de que no podrás venir. Te echaremos de
              menos, pero agradecemos mucho que te hayas tomado el tiempo para
              responder
            </Text>
          )}

          <Hr style={hrStyle} />

          <Text style={footerStyle}>
            Saludos,
            <br />
            Aitor y Luisa
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
