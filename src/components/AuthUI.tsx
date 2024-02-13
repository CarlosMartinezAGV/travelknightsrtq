import { supabase } from "../../supabase/main";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  ERRORCOLOR,
  PRIMARYCOLOR,
  QUATERNARYCOLOR,
  SECONDARYCOLOR,
  TERTIARYCOLOR,
} from "../components/styles/main";
import Typography from "@mui/material/Typography";

function AuthUI() {
  return (
    <>
      <Typography
        component="h1"
        variant="h1"
        fontWeight={2}
        textAlign="center"
        color={PRIMARYCOLOR}
        mb={2}
        flex={1}
      >
        TravelKnights
      </Typography>
      <Auth
        appearance={{
          theme: ThemeSupa,
          style: {
            container: {
              backgroundColor: SECONDARYCOLOR,
            },
            message: {
              borderWidth: "2px",
            },
          },
          variables: {
            default: {
              colors: {
                brand: PRIMARYCOLOR,
                brandAccent: TERTIARYCOLOR,
                inputBorder: PRIMARYCOLOR,
                inputLabelText: PRIMARYCOLOR,
                inputBorderFocus: TERTIARYCOLOR,
                dividerBackground: PRIMARYCOLOR,
                anchorTextColor: PRIMARYCOLOR,
                anchorTextHoverColor: TERTIARYCOLOR,
                defaultButtonBackground: PRIMARYCOLOR,
                defaultButtonText: SECONDARYCOLOR,
                defaultButtonBackgroundHover: TERTIARYCOLOR,
                messageBackground: QUATERNARYCOLOR,
                messageBackgroundDanger: QUATERNARYCOLOR,
                messageBorder: PRIMARYCOLOR,
                messageBorderDanger: ERRORCOLOR,
              },
              borderWidths: {
                inputBorderWidth: "2px",
              },
            },
          },
        }}
        localization={{
          variables: {
            sign_in: {
              email_input_placeholder: "Email address",
              password_label: "Password",
              password_input_placeholder: "Password",
            },
            sign_up: {
              email_input_placeholder: "Email address",
              password_input_placeholder: "Password",
            },
            forgotten_password: {
              email_input_placeholder: "Email address",
            },
          },
        }}
        providers={["google", "github"]}
        supabaseClient={supabase}
        socialLayout="horizontal"
      />
    </>
  );
}

export default AuthUI;
