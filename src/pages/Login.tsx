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
    <Grid container component="main" sx={{ minHeight: "100dvh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
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
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          backgroundColor: "background.default",
        }}
      >
        <Stack pt={14} px={10}>
          <Typography
            component="h1"
            variant="h2"
            fontWeight={2}
            textAlign="center"
            color={PRIMARYCOLOR}
            mb={2}
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
            // queryParams={{
            //   // access_type: "offline",
            //   display: "popup",
            //   prompt: "consent",
            //   hd: "localhost:5173/",
            // }}
            providers={["google", "github"]}
            supabaseClient={supabase}
          />
        </Stack>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
          }}
        ></Box>
      </Grid>
    </Grid>
  );
}

export default Login;
