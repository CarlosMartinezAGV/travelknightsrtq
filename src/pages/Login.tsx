import {
  PRIMARYCOLOR,
  SECONDARYCOLOR,
  TERTIARYCOLOR,
} from "../components/styles/main";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/main";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useContext, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { AuthContext } from "../redux/slices/auth/AuthProvider";
import Copyright from "../components/Copyright";
function Login() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // If user exists, navigate to the map page
  useEffect(() => {
    if (user) {
      navigate("/map");
    }
  }, [user, navigate]);

  return (
    <Grid
      container
      component="main"
      sx={{ minHeight: "100dvh", minWidth: "100dvw" }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={false}
        md={false}
        lg={7}
        sx={{
          backgroundImage: "url('src/assets/images/knightonplane.webp')",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          backgroundColor: "background.default",
        }}
      >
        <Stack
          pt={10}
          px={{ xs: 2.4, sm: 0 }}
          maxWidth={{ xs: 350, sm: 400 }}
          margin="auto"
        >
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
                    messageBackground: SECONDARYCOLOR,
                    messageBackgroundDanger: SECONDARYCOLOR,
                  },
                  space: {},
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
            providerScopes={{
              google: "email",
              github: "repo",
            }}
          />
        </Stack>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
          }}
        >
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
